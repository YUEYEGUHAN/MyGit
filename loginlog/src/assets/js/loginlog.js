var curpage=1; var rows=10; var pageCount=1;
var tree;
var LogListComcode; //日志树
var loginComcode; //登录树
var downloadComcode; //下载树
var clickComcode; //点击树
var SurveyComcode; //查勘车 树
var personnelComcode; //人员上线率 树
var OpeningProgressComcode; //服务记录仪开通进度 树
var surveyTimeoutComcode; //查勘超时率 树
var LoginAmountComcode; //登录量
////////////////////////////////////
var LogListParams; //排序 日志
var loginParams; //排序 登录
var downloadParams; //排序 下载
var clickParams; //排序 点击
var personnelParams; //排序 人员上线率
var SurveyParams; //排序 查勘车
var https = "";
var https = "http://10.133.216.177:7003"; //生产地址
//在文档加载后激活函数，初始化加载
$(document).ready(function(){

    //检测页面是否登录
    if(sessionStorage.length == 0){
        //获取 URL 的主机部分
        var host = window.location.host;
        //跳转登录页面
       window.location.href = 'http://'+host+'/PICCCSOPlatform/manage/Login.html';
    }else{
        // 表单切换 ,tab页面切换
        $(".tab-header li").on("click",function(e){
            e.preventDefault();
            let i=$(this).index();
            $(".tab-header li").removeClass("active").eq(i).addClass("active"),
            $(".piccCenter .m-box").removeClass("active").eq(i).addClass("active")
        });

        // 登录日志 ,tab页面切换
        $(".LogList_system li").on("click",function(e){
            e.preventDefault();
            let i=$(this).index();
            $(".LogList_system li").removeClass("active").eq(i).addClass("active"),
            $(".MainCenter .LoginLog-box").removeClass("active").eq(i).addClass("active")
        });

        // 系统操作日志统计 表单2切换 ,tab页面切换
        $(".tab-system li").on("click",function(e){
            e.preventDefault();
            let i=$(this).index();
            $(".tab-system li").removeClass("active").eq(i).addClass("active"),
            $(".system_con .system-box").removeClass("active").eq(i).addClass("active")
        });

        //通报数据 表单切换 ,tab页面切换
        $(".tab_Bulletin li").on("click",function(e){
            e.preventDefault();
            let i=$(this).index();
            $(".tab_Bulletin li").removeClass("active").eq(i).addClass("active"),
            $(".system_Bulletin .system-box").removeClass("active").eq(i).addClass("active")
        });
        //获取登录人的comcode
        var comcodeS = sessionStorage.getItem("cOMCODE");
        comcodeS = '00000000';
        dataControl(); //时间控件 尽量往前放，不然别的方法内可能获取不到时间
        queryComInfo(comcodeS); //查询组织机构数 查全部
        queryComInfo2(comcodeS); //查询组织机构数 到省 
        queryComInfo3(comcodeS); //查询组织机构数 到市

        // downloadTablefun(); //下载次数
        // clickTablefun(); //点击的表
        // SurveyTablefun(); //查勘车的表

        //超时跳转
        $.ajaxSetup({
            url: "loginlog.html" , // 默认URL
            aysnc: false , // 默认同步加载
            type: "POST" , // 默认使用POST方式
            dataType: "json",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            complete : function(XMLHttpRequest, textStatus) {             
                // 通过XMLHttpRequest取得响应头，REDIRECT      
                var redirect = XMLHttpRequest.getResponseHeader("REDIRECT");//若HEADER中含有REDIRECT说明后端想重定向    
                console.log(XMLHttpRequest);
                if (redirect == "REDIRECT") {  
                    var win = window;      
                    while (win != win.top){    
                        win = win.top;    
                    }  
                    win.location.href= XMLHttpRequest.getResponseHeader("CONTEXTPATH");
                }  
            }

        });

        //页面加载中效果
        $(document).bind("ajaxSend",function() {
            $("#loadingS").show();
        }).bind("ajaxComplete", function () {
            $("#loadingS").hide();
        });
    }
 
});

//查询组织机构数 全
function queryComInfo(comcode){
    let token = sessionStorage.getItem("token");
    $.ajax({
        type: 'POST',
        url: https+"/surveyplatform/rest/interfaceapi/OrganizationTreeService/findOrgListByParam2",
        async: false ,
        data: {
            'comcode':comcode,
            'token':token
        },
        success: function(data){
            findAreaTreeLogList(data);
            findAreaTreeLogin(data);
            findAreaTreeDownload(data);
            findAreaTreeClick(data);
            
        },
        error:findAreaTreeError,
        dataType: 'json' 
    });
}

//查询组织机构数 到省级
function queryComInfo2(comcode){
    let token = sessionStorage.getItem("token");
    $.ajax({
        type: 'POST',
        url: https+"/surveyplatform/rest/interfaceapi/OrganizationTreeService/findOrgListByParam2",
        async: false ,
        data: {
            'comcode':comcode,
            'comlevel':2,
            'token':token
        },
        success: function(data){
            findAreaTreeSurvey(data); //查勘车上线率的
            findAreaTreeOpeningProgress(data); //服务记录仪开通进度的
        },
        error:findAreaTreeError,
        dataType: 'json' 
    });
}

//查询组织机构数 到市级
function queryComInfo3(comcode){
    let token = sessionStorage.getItem("token");
    $.ajax({
        type: 'POST',
        url: https+"/surveyplatform/rest/interfaceapi/OrganizationTreeService/findOrgListByParam2",
        async: false ,
        data: {
            'comcode':comcode,
            'comlevel':3,
            'token':token
        },
        success: function(data){
            findAreaTreePersonnel(data); //人员上线率
            // findAreaTreeServeEecord(data); //服务记录仪上线率的 暂时不用
            findAreaTreeSurveyTimeout(data); //查勘超时率
            findAreaTreeLoginAmount(data);
        },
        error:findAreaTreeError,
        dataType: 'json' 
    });
}

function findAreaTreeError()
{
	alert("组织机构数,ajax请求失败！");
}


//找到树的数据 登录日志列表
function findAreaTreeLogList(data)
{
    var setting = {
        view: {     
            // showLine: false,//不显示连接线，默认值true  
            // showIcon:true ,  //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
            showLine: false,
            showIcon: false,
            selectedMulti: false,
            dblClickExpand: false,
            // addDiyDom: this.addDiyDom
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null){
                    return;
                }
                // pageCount = 1; curpage = 1;//点击组织机构更新table页码
                LogListComcode  = treeNode;
                console.log(LogListComcode);
                $(".comTree_LogListSapn").html(LogListComcode.name);
                $("#Level_LogList").val(LogListComcode.type);
                selectLevel_LogList(LogListComcode);
                InitMainTable();
                // beforeClick(treeId,treeNode); //点击时有下级机构就会自动展开
            }

        }
    };
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    // 初始化树
    tree = $.fn.zTree.init($("#comTree_LogList"), setting, dataNode);
    $("#comTree_LogList").addClass("showIcon");
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        LogListComcode = firstNode;
        $(".comTree_LogListSapn").html(LogListComcode.name);
        $("#Level_LogList").val(LogListComcode.type);
        selectLevel_LogList(LogListComcode);
        InitMainTable(); //表单的方法
        
    }
   
}

// 设置 控件的树状图 的配置
function addDiyDom(treeId, treeNode) {
    var spaceWidth = 5;
    var switchObj = $("#" + treeNode.tId + "_switch"),
    icoObj = $("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);

    if (treeNode.level > 1) {
        var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
        switchObj.before(spaceStr);
    }
}
//设置 点击展开
function beforeClick(treeId, treeNode) {
    console.log(treeId,treeNode);
    if (treeNode.children != [] ) {
        var zTree = $.fn.zTree.getZTreeObj(treeId);
        zTree.expandNode(treeNode);
        // return false;
    }
    return true;
}



// 根据组织机构级别,显示下拉框，有几个级别  --------- 登录日志列表
function selectLevel_LogList(selectedNode){
    if(selectedNode.type == 1){
       $("#selectOne_LogList").show();
       $("#selectTwo_LogList").show();
       $("#selectThree_LogList").show();
   }else if(selectedNode.type == 2){
       $("#selectOne_LogList").hide();
       $("#selectTwo_LogList").show();
       $("#selectThree_LogList").show();
   }else if(selectedNode.type == 3){
       $("#selectOne_LogList").hide();
       $("#selectTwo_LogList").hide();
       $("#selectThree_LogList").show();
   }else if(selectedNode.type == 4){
       $("#selectOne_LogList").hide();
       $("#selectTwo_LogList").hide();
       $("#selectThree_LogList").hide();
   }
}

//找到树的数据 登录
function findAreaTreeLogin(data)
{
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                loginComcode  = treeNode;
                $("#noticeLevel").val(loginComcode.type);
                $(".comTreetSapn").html(loginComcode.name);
                selectLevel_Login(loginComcode);
                LoginTablefun();
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTree"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        loginComcode = firstNode;
        $("#noticeLevel").val(loginComcode.type);
        $(".comTreetSapn").html(loginComcode.name);
        selectLevel_Login(loginComcode);
        LoginTablefun(); //登录次数的表单
    }
   
}

// 根据组织机构级别,显示下拉框，有几个级别  --------- 登录的
function selectLevel_Login(selectedNode){
    if(selectedNode.type == 1){
       $("#selectOne_Login").show();
       $("#selectTwo_Login").show();
       $("#selectThree_Login").show();
   }else if(selectedNode.type == 2){
       $("#selectOne_Login").hide();
       $("#selectTwo_Login").show();
       $("#selectThree_Login").show();
   }else if(selectedNode.type == 3){
       $("#selectOne_Login").hide();
       $("#selectTwo_Login").hide();
       $("#selectThree_Login").show();
   }else if(selectedNode.type == 4){
       $("#selectOne_Login").hide();
       $("#selectTwo_Login").hide();
       $("#selectThree_Login").hide();
   }
}


//找到树的数据 下载
function findAreaTreeDownload(data)
{
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                downloadComcode  = treeNode;
                $("#downloadLevel").val(downloadComcode.type);
                $(".comTree_downloadSpan").html(downloadComcode.name);
                selectLevel_download(downloadComcode);
                downloadTablefun(); //下载次数
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTree_download"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        downloadComcode = firstNode;
        $("#downloadLevel").val(downloadComcode.type);
        $(".comTree_downloadSpan").html(downloadComcode.name);
        selectLevel_download(downloadComcode);
        downloadTablefun(); //下载次数
    }
   
}

// 根据组织机构级别,显示下拉框，有几个级别  --------- 下载的
function selectLevel_download(selectedNode){
    if(selectedNode.type == 1){
       $("#selectOne_download").show();
       $("#selectTwo_download").show();
       $("#selectThree_download").show();
   }else if(selectedNode.type == 2){
       $("#selectOne_download").hide();
       $("#selectTwo_download").show();
       $("#selectThree_download").show();
   }else if(selectedNode.type == 3){
       $("#selectOne_download").hide();
       $("#selectTwo_download").hide();
       $("#selectThree_download").show();
   }else if(selectedNode.type == 4){
       $("#selectOne_download").hide();
       $("#selectTwo_download").hide();
       $("#selectThree_download").hide();
   }
}

//找到树的数据 点击
function findAreaTreeClick(data){
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                clickComcode  = treeNode;
                $("#clickLevel").val(clickComcode.type);
                $(".comTree_clickSpan").html(clickComcode.name);
                selectLevel_click(clickComcode);
                clickTablefun(); //点击的表
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTree_click"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        clickComcode = firstNode;
        $("#clickLevel").val(clickComcode.type);
        $(".comTree_clickSpan").html(clickComcode.name);
        selectLevel_click(clickComcode);
        clickTablefun(); //点击的表
    }
   
}
// 根据组织机构级别,显示下拉框，有几个级别  --------- 下载的
function selectLevel_click(selectedNode){
    if(selectedNode.type == 1){
       $("#selectOne_click").show();
       $("#selectTwo_click").show();
       $("#selectThree_click").show();
   }else if(selectedNode.type == 2){
       $("#selectOne_click").hide();
       $("#selectTwo_click").show();
       $("#selectThree_click").show();
   }else if(selectedNode.type == 3){
       $("#selectOne_click").hide();
       $("#selectTwo_click").hide();
       $("#selectThree_click").show();
   }else if(selectedNode.type == 4){
       $("#selectOne_click").hide();
       $("#selectTwo_click").hide();
       $("#selectThree_click").hide();
   }
}
//找到树的数据 人员上线率
function findAreaTreePersonnel(data)
{
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                personnelComcode = treeNode;
                $(".comTreePersonnelSpan").html(personnelComcode.name);
                personnelTablefun();
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTreePersonnel"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        personnelComcode = firstNode;
        $(".comTreePersonnelSpan").html(personnelComcode.name);
        personnelTablefun(); //人员上线率的表
    }
   
}
//找到树的数据 查勘车上线率的
function findAreaTreeSurvey(data)
{
    // JosnArrfun(data);
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                SurveyComcode  = treeNode;
                $(".comTreeSurveySpan").html(SurveyComcode.name);
                SurveyTablefun();
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTreeSurvey"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        SurveyComcode = firstNode;
        $(".comTreeSurveySpan").html(SurveyComcode.name);
        SurveyTablefun();
    }
   
}
//找到树的数据  服务记录仪上线率的 暂时用不到
// function findAreaTreeServeEecord(data)
// {
//     // console.log(data);
//     // JosnArrfun(data);
//     var setting = {
//         view: {     
//             showLine: false,//不显示连接线，默认值true  
//             showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
//         }, 
//         callback:{
//             onClick:function(event,treeId,treeNode)
//             {
//                 if(treeNode == null)
//                  return;
//                 pageCount = 1; curpage = 1;//点击组织机构更新table页码
//                 // SurveyComcode  = treeNode;
//             }
//         }
//     };
//     // 初始化树
//     let dataNode = data; 
//     if(data.flag == true){
//         dataNode = data.node;
//     }
//     tree = $.fn.zTree.init($("#comTreeServeEecord"), setting, dataNode);
//     //默认选中第一个节点 
//     var firstNode =tree.getNodes()[0];
//     	tree.selectNode(firstNode);
//     if(firstNode!=undefined){
//         // SurveyComcode = firstNode;
//     }
// }

//查勘超时率 树
function findAreaTreeSurveyTimeout(data)
{
    // console.log(data);
    // JosnArrfun(data);
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                surveyTimeoutComcode  = treeNode;
                $(".comTreeSurveyTimeoutSpan").html(surveyTimeoutComcode.name);
                surveyTimeoutTableFun();
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTreeSurveyTimeout"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        surveyTimeoutComcode = firstNode;
        $(".comTreeSurveyTimeoutSpan").html(surveyTimeoutComcode.name);
        surveyTimeoutTableFun();
    }
    
   
}

//登录 树
function findAreaTreeLoginAmount(data)
{
    // console.log(data);
    // JosnArrfun(data);
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                LoginAmountComcode  = treeNode;
                $(".comTreeLoginAmountSpan").html(LoginAmountComcode.name);
                LoginAmountfun();
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTreeLoginAmount"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        LoginAmountComcode = firstNode;
        $(".comTreeLoginAmountSpan").html(LoginAmountComcode.name);
        LoginAmountfun();
    }
   
}

//服务记录仪开通进度
function findAreaTreeOpeningProgress(data)
{
    // console.log(data);
    // JosnArrfun(data);
    var setting = {
        view: {     
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null)
                 return;
                pageCount = 1; curpage = 1;//点击组织机构更新table页码
                OpeningProgressComcode  = treeNode;
                $(".comTreeOpeningProgressSpan").html(OpeningProgressComcode.name);
                openingProgressTfun(); //记录仪开通记度
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree = $.fn.zTree.init($("#comTreeOpeningProgress"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree.getNodes()[0];
    	tree.selectNode(firstNode);
    if(firstNode!=undefined){
        OpeningProgressComcode = firstNode;
        $(".comTreeOpeningProgressSpan").html(OpeningProgressComcode.name);
        openingProgressTfun(); ////记录仪开通记度
    }
   
}

//josn 过滤
function JosnArrfun(data){
    console.log(data);
    data.children.forEach((item)=>{
        item.children=[];
    })
    console.log(data);
    // return data;
}


$('.ReturnBtn').click(function () {
    //获取 URL 的主机部分
    var host = window.location.host;
    //跳转卡片页面
    window.location.href = 'http://'+host+'/PICCCSOPlatform/manage/Potal.html';
});


//时间控件
function dataControl() {
    //初始化时间控件 当前时间的
    $('.datepRz').datepicker({
        language: 'zh-CN',      //设置语言
        weekStart: 1,           // 起始周
        autoclose: true,        //选中之后自动隐藏日期选择框
        format: "yyyy/mm/dd",   //日期格式
        // todayBtn: "linked",             //今天按钮
        // clearBtn: true              //清除按钮
    }).on('changeDate', function () {
        // <---------时间控件触发的事件写这里 ------------>
    });
    //默认当前时间
    $('.datepRz').datepicker('setDate', new Date());


    //初始化时间控件 显示上个月的
    let time = new Date();
    let year = time.getFullYear();//获取当前年份
    let month = time.getMonth(); //获取当前月份（0-11）
    let time2 = new Date(year,month,0); //设置0天 返回上个月份
    $('.dateTime').datepicker({
        language: "zh-CN",
        format: 'yyyy-mm',
        changeMonth: true,
        changeYear: true,
        autoclose:true,
        endDate: time2, //设置结束时间
        keyboardNavigation: true,
        minViewMode: 1,
        maxViewMode: 4
    }).on('changeDate', function (e) {
        // <---------时间控件触发的事件写这里 ------------>
    });
     //默认当前时间
     $('.dateTime').datepicker('setDate', time2);

    //初始化时间控件 昨天的时间
    $('.yesterdayTime').datepicker({
        language: 'zh-CN',      //设置语言
        weekStart: 1,           // 起始周
        autoclose: true,        //选中之后自动隐藏日期选择框
        endDate: new Date(), //设置结束时间 
        format: "yyyy/mm/dd"   //日期格式 
    }).on('changeDate',function(){
        // <---------时间控件触发的事件写这里 ------------>
    });
    var date = new Date();//将当前的日期转换成系统格式的日期
    var preDate = new Date(date.getTime() - 24*60*60*1000); //前一天
    $('.yesterdayTime').datepicker('setDate', preDate);
}



function InitMainTable() {
    let userCode = $("#usercode").val(); //用户工号
    let userName = $("#username").val();  //用户姓名
    let operationtime = $("#fontData").val(); //拿到操作时间
    let operationtime2 = $("#fontData2").val(); //拿到操作时间
    let loginType = $("#mainSelect option:selected").val();    //操作类型的下标 value
    let comLevel = $("#Level_LogList option:selected").val();    //操作类型的下标 value
    let token = sessionStorage.getItem("token");//登录令牌
    let rows = 10; //每页的记录行数
    // let paramSK;
    $("#piccTable").bootstrapTable('destroy');
    $('#piccTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/rest/queryloginLogServlet',    //请求后台的URL（*）
        //测试
        //  url:'./data1.json',
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            LogListParams = params;
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode: LogListComcode.id,  //组织机构的编号 <------- 入参的参数
                username: userName,          //通知人姓名
                usercode: userCode,    //通知人工号
                logintype: loginType,             //登录类型
                operationtime: operationtime,           //时间1
                operationtime2: operationtime2,         //时间2
                comLevel:comLevel,              //j
                rows: params.limit,                        //显示的行数
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,        //排序列名
                sortOrder: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{  
		    title: '序号',  
            field: '', 
            width:70,
		    formatter: function (value, row, index) {  
		       return index+1;  
		    }  
		} ,{
            checkbox: true,
            visible: false     //是否显示复选框
        },{
            field: 'comcode',
            title: '机构编码',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcname',
            title: '机构名称',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },  {
            field: 'usercode',
            title: '用户工号',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'username',
            title: '用户姓名',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'operationtime',
            title: '操作时间',
            formatter: function (value, row, index) {
                return '<span >' + value + '</span>';
            }
        }, {
            field: 'logintype',
            title: '操作类型',
            formatter: function (value, row, index) {
                let valss = '登录'
                if (value == 1) {
                    valss = '登录'
                } else {
                    valss = '登出'
                }
                return '<span>' + valss + '</span>';
            }
        }, {
            field: 'status',
            title: '结果',
            formatter: function (value, row, index) {
                let valss = '成功'
                if (value == 1) {
                    valss = '成功'
                } else {
                    valss = '失败'
                }
                return '<span>' + valss + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            // console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}


//登录次数的查询
function LoginTablefun() {
    let querycomlevel = $("#noticeLevel option:selected").val();    //机构级别
    let operationtime = $("#logonTime").val(); //统计时间：
    let token = sessionStorage.getItem("token");//登录令牌
    // console.log(comcode, querycomcode, querycomcname, operationtime, loginType)
    let rows = 10; //每页的记录行数
    $("#logonTable").bootstrapTable('destroy');
    $('#logonTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/rest/countLogin/queryCountLoginPage',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            console.log(params);
            loginParams = params;
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode: loginComcode.id,          //组织机构的编号 <------- 入参的参数
                // querycomcode: querycomcode,       //查询的机构编码
                // querycomcname: querycomcname,       //
                querycomlevel: querycomlevel,             //通知级别
                operationtime: operationtime,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //页码
                sortfile: params.sort,        //排序列名
                sort: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcode',
            title: '机构编码',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcname',
            title: '机构名称',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comlevel',
            title: '机构级别',
            formatter: function (value, row, index) {
                let values = '总公司';
                if(value == 1){
                    values = '总公司';
                }else if(value == 2){
                    values = '省公司';
                }else if(value == 3){
                    values = '市公司';
                }else if(value == 4){
                    values = '县机构';
                }
                return '<span>' + values + '</span>';
            }
        }, {
            field: 'querytime',
            title: '统计时间',
            formatter: function (value, row, index) {

                return '<span>' + value + '</span>';
            }
        }, {
            field: 'numnew',
            title: '登录人次',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'huanbi',
            title: '环比上月增长量',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            // console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}




//下载次数的查询
function downloadTablefun() {
    let querycomlevel = $("#downloadLevel option:selected").val();    //机构级别
    let operationtime = $("#downloadTime").val(); //统计时间：
    let modulename = $("#modulename").val(); //模块名称
    let token = sessionStorage.getItem("token");//登录令牌
    let rows = 10; //每页的记录行数
    $("#downloadTable").bootstrapTable('destroy');
    $('#downloadTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/downloadStatistic',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            console.log(params);
            downloadParams = params;
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode: downloadComcode.id,          //组织机构的编号 <------- 入参的参数
                // querycomcode: querycomcode,       //查询的机构编码
                // querycomcname: querycomcname,       // 机构名称
                querycomlevel: querycomlevel,             //通知级别
                operationtime: operationtime,           //时间
                modulename: modulename,         //模块名称
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //页码
                sortfile: params.sort,        //排序列名
                sort: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcode',
            title: '机构编码',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcname',
            title: '机构名称',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comlevel',
            title: '机构级别',
            formatter: function (value, row, index) {
                let values = '总公司';
                if(value == 1){
                    values = '总公司';
                }else if(value == 2){
                    values = '省公司';
                }else if(value == 3){
                    values = '市公司';
                }else if(value == 4){
                    values = '县机构';
                }
                return '<span>' + values + '</span>';
            }
        }, {
            field: 'statistime',
            title: '统计时间',
            formatter: function (value, row, index) {

                return '<span>' + value + '</span>';
            }
        }, {
            field: 'modulename',
            title: '模块名称',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'downnum',
            title: '下载次数',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'increasenum',
            title: '环比上月增长量',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            // console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}

//点击次数的查询
function clickTablefun() {
    let querycomlevel = $("#clickLevel option:selected").val();    //机构级别
    let operationtime = $("#clickTime").val(); //统计时间：
    let pagename = $("#pagename").val(); //模块名称
    let token = sessionStorage.getItem("token");//登录令牌
    let rows = 10; //每页的记录行数
    $("#clickTable").bootstrapTable('destroy');
    $('#clickTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/clickStatistic',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            console.log(params);
            clickParams = params;
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode: clickComcode.id,          //组织机构的编号 <------- 入参的参数
                querycomlevel: querycomlevel,             //通知级别
                operationtime: operationtime,           //时间
                pagename: pagename,         //页面名称
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //页码
                sortfile: params.sort,        //排序列名
                sort: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcode',
            title: '机构编码',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcname',
            title: '机构名称',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comlevel',
            title: '机构级别',
            formatter: function (value, row, index) {
                let values = '总公司';
                if(value == 1){
                    values = '总公司';
                }else if(value == 2){
                    values = '省公司';
                }else if(value == 3){
                    values = '市公司';
                }else if(value == 4){
                    values = '县机构';
                }
                return '<span>' + values + '</span>';
            }
        }, {
            field: 'statistime',
            title: '统计时间',
            formatter: function (value, row, index) {

                return '<span>' + value + '</span>';
            }
        }, {
            field: 'pagename',
            title: '页面名称',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'clicknum',
            title: '点击次数',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'increasenum',
            title: '环比上月增长量',
            formatter: function (value, row, index) {
                
                return '<span>' + value + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            // console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}

//人员表单 的查询
function personnelTablefun() {
    let insertTime = $("#personnelTime").val(); //统计时间：
    let token = sessionStorage.getItem("token");//登录令牌
    let rows = 10; //每页的记录行数
    $("#personnelTable").bootstrapTable('destroy');
    $('#personnelTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getSurveyorOnlineRate',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            console.log(params);
            personnelParams = params;
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode: personnelComcode.id,          //组织机构的编号 <------- 入参的参数
                querydate: insertTime,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcname',
            title: '机构名称',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcode',
            title: '机构编码',
            sortable: true,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },{
            field: 'querydate',
            title: '统计时间',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'surveyornum',
            title: '用户系统人数',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span class="cursor" comcode="'+row.comcode+'" name="'+row.comcname+'" onclick="surveyornumFun(this)"><u>' + value + '</u></span>';
            }
        }, {
            field: 'surveyorroundnum',
            title: '用户系统环比增加',
            width:100,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'onlinenum',
            title: '上线人数',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span class="cursor" comcode="'+row.comcode+'" name="'+row.comcname+'" onclick="onlinenumFun(this)"><u>' + value + '</u></span>';
            }
        },{
            field: 'onlineroundnum',
            title: '人员上线量环比增加',
            width:100,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'onlinerate',
            title: '人员上线率',
            valign:'middle',
            align:'center',
            sortable: true,
            formatter: function (value, row, index) {
                let vall = "0";
                if(value != undefined && value != ""){
                    vall = value+"%";
                }
                return '<span>' + vall + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            // console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}



//查勘车表单 的查询
function SurveyTablefun() {
    let insertTime = $("#SurveyTime").val(); //统计时间：
    let token = sessionStorage.getItem("token");//登录令牌
    let rows = 10; //每页的记录行数
    $("#SurveyTable").bootstrapTable('destroy');
    $('#SurveyTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/rest/countCar',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            SurveyParams = params;
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: SurveyComcode.id,          //组织机构的编号 <------- 入参的参数
                insertTime: insertTime,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcname',
            title: '机构名称',
            width: 160,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcode',
            title: '机构编码',
            sortable: true,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comlevel',
            title: '机构级别',
            width: 80,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                let values = '总公司';
                if(value == 1){
                    values = '总公司';
                }else if(value == 2){
                    values = '省公司';
                }else if(value == 3){
                    values = '市公司';
                }else if(value == 4){
                    values = '县机构';
                }
                return '<span>' + values + '</span>';
            }
        }, {
            field: 'inserttime',
            title: '统计时间',
            width: 80,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'amount',
            title: '平台已维护车辆数量',
            width: 100,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span class="cursor" comcode="'+row.comcode+'" name="'+row.comcname+'" onclick="countCarListFun(this)"><u>' + value + '</u></span>';
            }
        }, {
            field: 'inpremonthnum',
            title: '环比上月增加量',
            width: 100,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },{
            field: 'defaultamount',
            title: '固定资产车辆数量',
            width: 100,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'elscrapnum',
            title: '已剔除的报废车数量',
            width: 100,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },{
            field: 'elelectricnum',
            title: '已剔除的电动车数量',
            width: "100",
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },{
            field: 'rate',
            title: '查勘车上线率',
            sortable: true,
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                let vall = "0";
                if(value != undefined && value != "" && value != null){
                    vall = value+"%";
                }
                return '<span>' + vall + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            // console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}

//用户系统人员清单 弹出框
function surveyornumFun(data){
    let comcode;
    let querydate = $("#personnelTime").val(); //统计时间
    let token = sessionStorage.getItem("token");//登录令牌
    let source;
    let name = personnelComcode.name;
    if(data == 1){
        comcode = personnelComcode.id;
        source = true;
        name = personnelComcode.name;
        querydate = "";
        $('#myModalLabel b').html(name+"用户系统人员清单(实时)");
    }else{
        comcode = $(data).attr('comcode');
        name = $(data).attr('name');
        source = false;
        $('#myModalLabel b').html(name+"用户系统人员清单");
    }
    // console.log(personnelComcode);
    
    $('#myModalLabel').attr('Judgment',"1"); //判断下载  用户系统人数
    $('#currencyImg').attr('comcode',comcode);
    $('#currencyImg').attr('comcname',name);
    $('#currencyImg').attr('source',source);
    
    // console.log(comcode,querydate,source);
    let rows = 10; //每页的记录行数
    $("#currencyTable").bootstrapTable('destroy');
    $('#currencyTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getHRSurveyorsByPage',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                   //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode: comcode,          //组织机构的编号 <------- 入参的参数
                querydate: querydate,           //时间
                source:source,              //true 是查询昨天的 ，flase 是查询整月的
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                // sortfile: params.sort,        //排序列名
                // sort: params.order  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{  
		    title: '序号',  
            field: '', 
            width:70,
		    formatter: function (value, row, index) { 
                let pageSize = $('#currencyTable').bootstrapTable('getOptions').pageSize; //通过table的id 得到每页多少条
                let pageNumber = $('#currencyTable').bootstrapTable('getOptions').pageNumber; //通过table的id 得到当前第几页
                // console.log(pageSize);
		       return pageSize * (pageNumber - 1) + index + 1;
		    }
		} ,{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcname',
            title: '机构名称',
            width: 190,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcode',
            title: '机构编码',
            // sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'surveyorcode',
            title: '查勘员编码',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'surveyorname',
            title: '查勘员名称',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'power',
            title: '权限',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'querydate',
            title: '数据获取时间',
            width: 180,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },],
        onLoadSuccess: function (data) {//接口返回
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
  
   $('#myModal').modal('show');
}


//获取上线人数人员清单 弹出框
function onlinenumFun(data){  
    let querydate = $("#personnelTime").val(); //统计时间
    let token = sessionStorage.getItem("token");//登录令牌
    let source = false;
    let comcode = personnelComcode.id;;
    let name = personnelComcode.name;
    if(data == 1){
        comcode = personnelComcode.id;
        source = true;
        name = personnelComcode.name;
        querydate = "";
        $('#myModalLabel b').html(name+"上线人员清单(实时)");
    }else{
        comcode = $(data).attr('comcode');
        name = $(data).attr('name');
        source = false;
        $('#myModalLabel b').html(name+"上线人员清单");
    }


    $('#currencyImg').attr('comcode',comcode);
    $('#currencyImg').attr('comcname',name);
    $('#currencyImg').attr('sourcery',source);
    // $('#myModalLabel b').html(name+"上线人员清单");

    $('#myModalLabel').attr('Judgment',"2"); //判断下载  上线人数人员清单
    
    console.log(comcode,querydate);
    let rows = 10; //每页的记录行数
    $("#currencyTable").bootstrapTable('destroy');
    $('#currencyTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getDDSurveyorsByPage',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode: comcode,          //组织机构的编号 <------- 入参的参数
                querydate: querydate,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                // sortfile: params.sort,        //排序列名
                // sort: params.order  //排位命令（desc，asc）
                source:source,
                token:token
            };
            return temp;
        },
        columns: [{  
		    title: '序号',  
            field: '', 
            width:70,
		    formatter: function (value, row, index) { 
                let pageSize = $('#currencyTable').bootstrapTable('getOptions').pageSize; //通过table的id 得到每页多少条
                let pageNumber = $('#currencyTable').bootstrapTable('getOptions').pageNumber; //通过table的id 得到当前第几页
		       return pageSize * (pageNumber - 1) + index + 1;
		    } 
		} ,{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcname',
            title: '机构名称',
            width: 190,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcode',
            title: '机构编码',
            // sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'surveyorcode',
            title: '查勘员编码',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'surveyorname',
            title: '查勘员名称',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'querydate',
            title: '数据获取时间',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },],
        onLoadSuccess: function (data) {//接口返回
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
  
   $('#myModal').modal('show');
}

//查勘车统计详细清单 平台已维护车辆数量 弹窗
function countCarListFun(data){
    let comcode = $(data).attr('comcode'); 
    let name = $(data).attr('name');
    let insertTime = $("#SurveyTime").val(); //统计时间：
    let token = sessionStorage.getItem("token");//登录令牌
    let rows = 10; //每页的记录行数
    $('#SurveyModalLabel b').html(name+"平台已维护车辆清单");
    $('#SurveyCurrencyImg').attr('comcode',comcode); //查勘车弹窗导出的 赋值
    $('#SurveyCurrencyImg').attr('comcname',name);
    $('#SurveyModalLabel').attr('Judgment',"1"); //判断下载  查勘车统计详细清单
    $("#SurveycurrencyTable").bootstrapTable('destroy');
    $('#SurveycurrencyTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/rest/countCarList',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: comcode,          //组织机构的编号 <------- 入参的参数
                insertTime: insertTime,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {  
		    title: '序号',  
            field: '', 
            width:70,
            formatter: function (value, row, index) { 
                let pageSize = $('#SurveycurrencyTable').bootstrapTable('getOptions').pageSize; //通过table的id 得到每页多少条
                let pageNumber = $('#SurveycurrencyTable').bootstrapTable('getOptions').pageNumber; //通过table的id 得到当前第几页
		       return pageSize * (pageNumber - 1) + index + 1;
		    }
		} ,{
            field: 'comcname',
            title: '机构名称',
            width: 190,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcode',
            title: '机构编码',
            // sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'inserttime',
            title: '统计时间',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'carno',
            title: '车牌号',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'eqcode',
            title: '设备编码',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },],
        onLoadSuccess: function (data) {//接口返回
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
    $('#SurveyModal').modal('show');
}

// 实时查勘车统计详细清单 查勘车
function countCarListRealfun(){
    let insertTime = $("#SurveyTime").val(); //统计时间：
    let token = sessionStorage.getItem("token");//登录令牌
    let rows = 10; //每页的记录行数
    $('#SurveyModalLabel b').html(SurveyComcode.name+"平台已维护车辆实时清单");
    $('#SurveyCurrencyImg').attr('comcode',SurveyComcode.id); //查勘车弹窗导出的 赋值
    $('#SurveyCurrencyImg').attr('comcname',SurveyComcode.name);

    $('#SurveyModalLabel').attr('Judgment',"2"); //判断下载  实时查勘车
    $("#SurveycurrencyTable").bootstrapTable('destroy');
    $('#SurveycurrencyTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/rest/countCarListRealTime',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: SurveyComcode.id,          //组织机构的编号 <------- 入参的参数
                insertTime: insertTime,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: params.order , //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {  
		    title: '序号',  
            field: '', 
            width:70,
		    formatter: function (value, row, index) { 
                let pageSize = $('#SurveycurrencyTable').bootstrapTable('getOptions').pageSize; //通过table的id 得到每页多少条
                let pageNumber = $('#SurveycurrencyTable').bootstrapTable('getOptions').pageNumber; //通过table的id 得到当前第几页
		       return pageSize * (pageNumber - 1) + index + 1;
		    }  
		} ,{
            field: 'comcname',
            title: '机构名称',
            width: 190,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'comcode',
            title: '机构编码',
            // sortable: true,
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'inserttime',
            title: '统计时间',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'carno',
            title: '车牌号',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'eqcode',
            title: '设备编码',
            formatter: function (value, row, index) {
                return '<span>' + value + '</span>';
            }
        },],
        onLoadSuccess: function (data) {//接口返回
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
    $('#SurveyModal').modal('show');
}


// 开通进度 记录仪
function openingProgressTfun(){
    let rows = 50; //每页的记录行数
    let token = sessionStorage.getItem("token");//登录令牌
    $("#openingProgressTable").bootstrapTable('destroy');
    $('#openingProgressTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getRecorderConnectProgress',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: OpeningProgressComcode.id,          //组织机构的编号 <------- 入参的参数
                // insertTime: insertTime,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: params.order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        },{
            field: 'serialnumber',
            title: '序号',
            valign:'middle',
            align:'center',
            width:60,
            formatter: function (value, row, index) {
                // console.log(row);
                let vlass = index + 1;
                return '<span>' + vlass + '</span>';
            }
        }, {
            field: 'comname',
            title: '机构名称',
            valign:'middle',
            align:'center',
            width:100,
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'status',
            valign:'middle',
            align:'center',
            title: '是否已经与理赔平台联通',
            width:150,
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'progress',
            title: '服务记录仪联通进展',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'company',
            title: '负责厂商',
            valign:'middle',
            align:'center',
            width:120,
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'updatedate',
            title: '修改日期',
            valign:'middle',
            align:'center',
            width:170,
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}


//通报数据  分公司查勘超时率 
function surveyTimeoutTableFun(){
    let queryDate = $("#surveyTimeout").val(); //统计时间：
    let token = sessionStorage.getItem("token");
    let datearr = queryDate.split("-"); //分割 年月 
    $('#staffSurveyDate').datepicker('setDate', queryDate); //同步 人员的时间
    $('#touchPoliceIMG').attr('date',queryDate); //传入时间
    $('#Title_mechanism').html(datearr[0]+"年"+datearr[1]+"月 "+surveyTimeoutComcode.name+"查勘超时率");
    let rows = 10; //每页的记录行数
    let order = "desc";
    $("#surveyTimeoutTable").bootstrapTable('destroy');
    $('#surveyTimeoutTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getMonthOverTimeRate',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            if(params.sort){
                order = params.order;
            }
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: surveyTimeoutComcode.id,          //组织机构的编号 <------- 入参的参数
                queryDate: queryDate,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: order , //排位命令（desc，asc）
                token:token //登录令牌
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'comcname',
            title: '分公司',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                return '<span class="cursor" comcode="'+row.comcode+'" comcname="'+row.comcname+'"  onclick="staffSurveyTimeoutTableFun(this)"><u>' + value + '</u></span>';
            }
        },{
            field: 'comcode',
            title: '机构代码',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'overnum',
            title: '第一级总触警案件量',
            valign:'middle',
            align:'center',
            width:150,
            formatter: function (value, row, index) {
                if(row.comcode == '00000000'){
                    return '<span title = "暂不支持查看总公司数据清单！">' + value + '</span>';
                }else{
                    return '<span class="cursor" comcode="'+row.comcode+'" comcname="'+row.comcname+'"  onclick="touchPoliceFun(this)"><u>' + value + '</u></span>';
                }
                
            }
        }, {
            field: 'casenum',
            title: '现场查勘总数',
            valign:'middle',
            align:'center',
                formatter: function (value, row, index) {
                    if(row.comcode == '00000000'){
                        return '<span title = "暂不支持查看总公司数据清单！">' + value + '</span>';
                    }else{
                        return '<span class="cursor" comcode="'+row.comcode+'" comcname="'+row.comcname+'"  onclick="SceneCaseFun(this)"><u>' + value + '</u></span>';
                    }
                    
                }
        }, {
            field: 'countyrate',
            title: '县级触警率',
            valign:'middle',
            align:'center',
            sortable: true,
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }, {
            field: 'cityrate',
            title: '地市级触警率',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }, {
            field: 'provincerate',
            title: '省级触警率',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }, {
            field: 'zongrate',
            title: '总公司触警率',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            TimeoutReturnfun(2);
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}


//通报数据 人员维度查勘超时率
function staffSurveyTimeoutTableFun(data){
    let comCodes = $(data).attr('comcode');
    let comcname = $(data).attr('comcname');
    let queryDate = $("#personnelSurveyTimeout").val(); //统计时间
    let datearr = queryDate.split("-"); //分割 年月 
    let token = sessionStorage.getItem("token");//登录令牌
    let order = "desc";
    if(!data){ //反用
        comCodes = $('#exportStaffSurveyTimeout').attr('comCodes');
        comcname = $('#exportStaffSurveyTimeout').attr('comcname');
    }
    $('#exportStaffSurveyTimeout').attr('comCodes',comCodes);
    $('#exportStaffSurveyTimeout').attr('comcname',comcname);
    $('#Title_staff').html(datearr[0]+"年"+datearr[1]+"月 "+comcname+"查勘超时率");
    let rows = 10; //每页的记录行数
    $("#personnelSurveyTimeoutTable").bootstrapTable('destroy');
    $('#personnelSurveyTimeoutTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getPersonOverTimeRate',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            if(params.sort){
                order = params.order;
            }
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: comCodes,          //组织机构的编号 <------- 入参的参数
                queryDate: queryDate,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: order , //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'surveyorname',
            title: '查勘员姓名',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'surveyorcode',
            title: '查勘员工号',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'comcname',
            title: '人员所属地市',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'overnum',
            title: '第一级总触警案件量',
            valign:'middle',
            align:'center',
            width:150,
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'casenum',
            title: '现场查勘总量',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'countyrate',
            title: '县级触警率',
            valign:'middle',
            align:'center',
            sortable: true,
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }, {
            field: 'cityrate',
            title: '地市级触警率',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }, {
            field: 'provincerate',
            title: '省级触警率',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }, {
            field: 'zongrate',
            title: '总公司触警率',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(value == null){
                    value = "";
                }
                return '<span>' + value + '%</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            TimeoutReturnfun(1);
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}

//通报数据 分公司登录量列表
function LoginAmountfun(){
    let token = sessionStorage.getItem("token");//登录令牌
    let queryDate = $("#LoginAmountTime").val(); //统计时间
    let datearr = queryDate.split("-"); //分割 年月 
    let order = "desc"; //排位命令（desc，asc）
    $('#staffLoginDate').datepicker('setDate', queryDate); //同步 人员的时间
    $('#StaffLoginIMG').attr('date',queryDate); //传入时间
    $('#login_homepage').html(datearr[0]+"年"+datearr[1]+"月 "+LoginAmountComcode.name+"登录量");
    let rows = 10; //每页的记录行数
    $("#LoginAmountTable").bootstrapTable('destroy');
    $('#LoginAmountTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/queryLoginCountForOrg',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            if(params.sort){
                order = params.order;
            }
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: LoginAmountComcode.id,          //组织机构的编号 <------- 入参的参数
                queryDate: queryDate,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [
        [
            {
                field: 'comcname',
                title: '分公司',
                valign:'middle',
                align:'center',
                rowspan: 2,
                formatter: function (value, row, index) {
                    return '<span class="cursor" comcode="'+row.comcode+'" comcname="'+row.comcname+'" flag="'+row.flag+'" onclick="staffLoginAmountfun(this)"><u>' + value + '</u></span>';
                }
            },{
                field: 'comcode',
                title: '机构代码',
                valign:'middle',
                align:'center',
                rowspan: 2,
                formatter: function (value, row, index) {
                    if(!value){
                        value = "";
                    }
                    return '<span>' + value + '</span>';
                }
            },{
                title: '登录次数',
                valign:'middle',
                align:'center',
                colspan: 6,
                rowspan: 1
            },{
                field: 'downcount',
                title: '数据下载次数',
                valign:'middle',
                align:'center',
                rowspan: 2,
                formatter: function (value, row, index) {
                    if(!value){
                        value = "0";
                    }
                    return '<span>' + value + '</span>';
                }
            }
        ],[ {
            field: 'logincount',
            title: '登录总次数',
            valign:'middle',
            align:'center',
            sortable: true, //排序的
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'lpzyfb',
            title: '资源调度区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'zbjk',
            title: '指标监控区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'scyj',
            title: '时触预警区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'wjgzt',
            title: '未决案件管理区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'zdzdbg',
            title: '诊断报告区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }]],
        onLoadSuccess: function (data) {//接口返回
            $("#LoginAmountTable .no-records-found td").attr("colspan",9); //自己动态改变内容的格数
            LoginSwitchingFun(2);
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}


//通报数据 人员登录量列表
function staffLoginAmountfun(data){
    let token = sessionStorage.getItem("token");//登录令牌
    let comCodes = $(data).attr('comcode');
    let comcname = $(data).attr('comcname');
    let order = "desc";
    let flag = $(data).attr('flag');
    let queryDate = $("#LoginAmountTime").val(); //统计时间
    let datearr = queryDate.split("-"); //分割 年月
    let rows = 10; //每页的记录行数
    if(!data){ //反用
        comCodes = $('#exportStafflogin').attr('comCodes');
        comcname = $('#exportStafflogin').attr('comcname');
        flag = $('#exportStafflogin').attr('flag');
    }
    $('#exportStafflogin').attr('comCodes',comCodes);
    $('#exportStafflogin').attr('comcname',comcname);
    $('#exportStafflogin').attr('flag',flag);
    $('#login_subpage').html(datearr[0]+"年"+datearr[1]+"月 "+ comcname +"登录量");
    $("#staffLoginAmountTable").bootstrapTable('destroy');
    $('#staffLoginAmountTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/queryLoginCountForPerson',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            if(params.sort){
                order = params.order;
            }
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: comCodes,          //组织机构的编号 <------- 入参的参数
                queryDate: queryDate,           //时间
                flag:flag, //判断只查本级或者本级加下级
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort:order, //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [
            [
                {
                    field: 'username',
                    title: '姓名',
                    valign:'middle',
                    align:'center',
                    rowspan: 2,
                    formatter: function (value, row, index) {
                        if(!value){
                            value = "";
                        }
                        return '<span>' + value + '</span>';
                    }
                },{
                    field: 'usercode',
                    title: '人员工号',
                    valign:'middle',
                    align:'center',
                    rowspan: 2,
                    formatter: function (value, row, index) {
                        if(!value){
                            value = "";
                        }
                        return '<span>' + value + '</span>';
                    }
                },{
                    field: 'comcname',
                    title: '归属地市',
                    valign:'middle',
                    align:'center',
                    rowspan: 2,
                    formatter: function (value, row, index) {
                        if(!value){
                            value = "0";
                        }
                        return '<span>' + value + '</span>';
                    }
                },{
                    title: '登录次数',
                    valign:'middle',
                    align:'center',
                    colspan: 6,
                    rowspan: 1
                },{
                    field: 'downcount',
                    title: '数据下载次数',
                    valign:'middle',
                    align:'center',
                    rowspan: 2,
                    formatter: function (value, row, index) {
                        if(!value){
                            value = "0";
                        }
                        return '<span>' + value + '</span>';
                    }
                }
            
        ],
        [ {
            field: 'logincount',
            title: '登录总次数',
            valign:'middle',
            align:'center',
            sortable: true, //排序的
            formatter: function (value, row, index) {
                return '<span class="cursor" useCode="'+row.usercode+'" comcname="'+row.comcname+'"  onclick="StaffLoginFun(this)"><u>' + value + '</u></span>';
            }
        }, {
            field: 'lpzyfb',
            title: '资源调度区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'zbjk',
            title: '指标监控区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'scyj',
            title: '时触预警区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'wjgzt',
            title: '未决案件管理区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'zdzdbg',
            title: '诊断报告区',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }]
        ],
        onLoadSuccess: function (data) {//接口返回
            $("#staffLoginAmountTable .no-records-found td").attr("colspan",10); //自己动态改变内容的格数
            LoginSwitchingFun(1);
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
        }
    });
}



///touchPoliceModal 第一级总触警案件量清单
function touchPoliceFun(data){
    let token = sessionStorage.getItem("token");//登录令牌
    let comCodes = $(data).attr('comcode');
    let comcname = $(data).attr('comcname');
    let queryDate = $('#touchPoliceIMG').attr('date'); //时间
    let rows = 10; //每页的记录行数
    let datearr = queryDate.split("-"); //分割 年月
    $('#touchPoliceModalLabel b').html(datearr[0]+"年"+datearr[1]+"月 "+comcname+"触警清单");
    $('#touchPoliceIMG').attr('comcode',comCodes);
    $('#touchPoliceIMG').attr('switchs',1); //第一级总触警案件量清单 1 下载判断
    $("#touchPoliceTable").bootstrapTable('destroy');
    $('#touchPoliceTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getCaseOverTime',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: comCodes,          //组织机构的编号 <------- 入参的参数
                queryDate: queryDate,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: params.order , //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'serialnumber',
            title: '序号',
            valign:'middle',
            align:'center',
            width:60,
            formatter: function (value, row, index) {
                // console.log(row);
                let vlass = index + 1;
                return '<span>' + vlass + '</span>';
            }
        },{
            field: 'surveyorcode',
            title: '查勘员工号',
            valign:'middle',
            align:'center',
            sortable: true, //排序的
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'surveyorname',
            title: '查勘员名称',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'comcname',
            title: '人员所属地市',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'registno',
            title: '报案号',
            valign:'middle',
            align:'center',
            width:160,
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'dispatchdate',
            title: '调度时间',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'arrivaldate',
            title: '到达现场或完成时间',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'overtime',
            title: '超时时长',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'level',
            title: '触警级别',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            $('#touchPoliceModal').modal('show');
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
            alert("该机构无返回数据！");
        }
    });
    
}


///SceneCase 现场案件列表
function SceneCaseFun(data){
    let token = sessionStorage.getItem("token");//登录令牌
    let comCodes = $(data).attr('comcode');
    let comcname = $(data).attr('comcname');
    let queryDate = $('#touchPoliceIMG').attr('date'); //时间
    let rows = 10; //每页的记录行数
    let datearr = queryDate.split("-"); //分割 年月
    $('#touchPoliceModalLabel b').html(datearr[0]+"年"+datearr[1]+"月 "+comcname+"现场案件列表");
    $('#touchPoliceIMG').attr('comcode',comCodes);
    $('#touchPoliceIMG').attr('switchs',2); //现场案件列表 2 下载判断
    $("#touchPoliceTable").bootstrapTable('destroy');
    $('#touchPoliceTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/rest/getAllCaseTable',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comCode: comCodes,          //组织机构的编号 <------- 入参的参数
                queryDate: queryDate,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: params.order , //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        }, {
            field: 'serialnumber',
            title: '序号',
            valign:'middle',
            align:'center',
            width:60,
            formatter: function (value, row, index) {
                // console.log(row);
                let vlass = index + 1;
                return '<span>' + vlass + '</span>';
            }
        },{
            field: 'surveyorcode',
            title: '查勘员工号',
            valign:'middle',
            align:'center',
            sortable: true, //排序的
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'surveyorname',
            title: '查勘员名称',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'comcname',
            title: '人员所属地市',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'registno',
            title: '报案号',
            valign:'middle',
            align:'center',
            width:160,
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'dispatchdate',
            title: '调度时间',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'arrivaldate',
            title: '到达现场或完成时间',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'overtime',
            title: '超时时长',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'level',
            title: '触警级别',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            $('#touchPoliceModal').modal('show');
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
            alert("该机构无返回数据！");
        }
    }); 
}



///弹出 人员登录量列表清单
function StaffLoginFun(data){
    let token = sessionStorage.getItem("token");//登录令牌
    let useCode = $(data).attr('useCode');
    let comcname = $(data).attr('comcname');
    let queryDate = $('#StaffLoginIMG').attr('date'); //时间
    let rows = 10; //每页的记录行数
    let order = "desc";
    let datearr = queryDate.split("-"); //分割 年月
    $('#StaffLoginModalLabel b').html(datearr[0]+"年"+datearr[1]+"月 "+comcname+"人员登录记录");
    $('#StaffLoginIMG').attr('useCode',useCode);

    $("#StaffLoginTable").bootstrapTable('destroy');
    $('#StaffLoginTable').bootstrapTable({
        //正式
        url: https+'/surveyplatform/service/queryLoginlogList',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
        //得到查询的参数
        queryParams: function (params) {
            // console.log(params);
             // console.log(params);
             if(params.sort){
                order = params.order;
            }
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                useCode: useCode,          //组织机构的编号 <------- 入参的参数
                queryDate: queryDate,           //时间
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //当前页码
                sortfile: params.sort,        //排序列名
                sort: order,  //排位命令（desc，asc）
                token:token
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        },{
            field: 'username',
            title: '姓名',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'usercode',
            title: '工号',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        },{
            field: 'comcname',
            title: '所属地市',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "0";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'inserttimeforhis',
            title: '登录时间',
            valign:'middle',
            align:'center',
            sortable: true, //排序的
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }, {
            field: 'loginouttimeforhis',
            title: '登出时间',
            valign:'middle',
            align:'center',
            formatter: function (value, row, index) {
                if(!value){
                    value = "";
                }
                return '<span>' + value + '</span>';
            }
        }],
        onLoadSuccess: function (data) {//接口返回
            $('#StaffLoginModal').modal('show');
            console.log(data);
        },
        onLoadError: function (e) {//接口报错的提示
            console.log(e)
            alert("接口无返回数据！");
        }
    });
    
}


function  RealTiMyFun(){
    $('#RealTiMyModal').modal('show');
}

//--------------- 导出 -----------------
$('#exportBtn').click(function(){
    var value=exportParam();

    console.log(https+"/surveyplatform/rest/exportloginLogServlet"+"?"+value);
    window.open(https+"/surveyplatform/rest/exportloginLogServlet"+"?"+value);
    operateRecordFun(44,2); //记录接口
});

// 导出加入参数  日志列表
function exportParam() {
    let comcode = LogListComcode.id;
    let userCode = $("#usercode").val(); //用户工号
    let userName = $("#username").val();  //用户姓名
    var operationtime = $("#fontData").val(); //拿到操作时间
    var operationtime2 = $("#fontData2").val(); //拿到操作时间
    var loginType = $("#mainSelect option:selected").val();    //操作类型的下标 value
    let comLevel = $("#Level_LogList option:selected").val();    //操作类型的下标 value
    let token = sessionStorage.getItem("token");//登录令牌
    // let usercode = sessionStorage.getItem("usercode");//登录人 code
    // let username = sessionStorage.getItem("username");//登录人 名称
     if(LogListParams.sort == undefined){
        LogListParams.sort = '';
    }
    return "comLevel="+ comLevel +"&comcode=" + comcode + "&userCode=" + userCode + "&userName=" + userName + "&operationtime=" + operationtime + "&operationtime2=" + operationtime2 + "&loginType=" + loginType + "&sortOrder=" + LogListParams.order +"&sort="+LogListParams.sort+"&token="+token;
    
}

//月登录人次数的导出
function exportLoginFun(){
    let querycomlevel = $("#noticeLevel option:selected").val();    //机构级别
    let operationtime = $("#logonTime").val(); //统计时间：

    if(loginParams.sort == undefined){
        loginParams.sort = '';
    }
    let value = "comcode=" + loginComcode.id +"&querycomlevel=" + querycomlevel + "&operationtime=" + operationtime + "&sort=" + loginParams.order +"&sortfile="+loginParams.sort;
    window.open(https+"/surveyplatform/rest/countLogin/exportCountLogin"+"?"+value); 
    operateRecordFun(45,2); //记录接口
}


//月数据下载次数的导出
function exportdownloadFun(){
    let querycomlevel = $("#downloadLevel option:selected").val();    //机构级别
    let operationtime = $("#downloadTime").val(); //统计时间：
    let modulename = $("#modulename").val(); //模块名称

    if(downloadParams.sort == undefined){
        downloadParams.sort = '';
    }
    let value = "comcode=" + downloadComcode.id + "&querycomlevel=" + querycomlevel + "&operationtime=" + operationtime + "&modulename="+ modulename +"&sort=" + downloadParams.order +"&sortfile="+downloadParams.sort;
    window.open(https+"/surveyplatform/service/rest/exDownloadStatistic"+"?"+value); 
    operateRecordFun(46,2); //记录接口
}


//月页面点击次数的导出
function exportClickFun(){
    let querycomlevel = $("#clickLevel option:selected").val();    //机构级别
    let operationtime = $("#clickTime").val(); //统计时间：
    let pagename = $("#pagename").val(); //模块名称

    if(clickParams.sort == undefined){
        clickParams.sort = '';
    }
    let value = "comcode=" + clickComcode.id + "&querycomlevel=" + querycomlevel + "&operationtime=" + operationtime + "&pagename="+ pagename + "&sort=" + clickParams.order +"&sortfile="+clickParams.sort;
    window.open(https+"/surveyplatform/service/rest/exClickStatistic"+"?"+value); 
    operateRecordFun(47,2); //记录接口
}


//查勘车上线率的导出
function exportSurveyfun(){//personnelParams
    let insertTime = $("#SurveyTime").val(); //统计时间：
    if(SurveyParams.sort == undefined){
        SurveyParams.sort = '';
    }
    
    let value = "comCode=" + SurveyComcode.id + "&insertTime=" + insertTime + "&sort=" + SurveyParams.order +"&sortfile="+SurveyParams.sort;
    console.log(https+"/surveyplatform/rest/countCarToExport"+"?"+value); 
    window.open(https+"/surveyplatform/rest/countCarToExport"+"?"+value); 
    operateRecordFun(52,2); //记录接口
}

//人员上线率的导出
function exportPersonnelfun(){
    let insertTime = $("#personnelTime").val(); //统计时间：
    if(personnelParams.sort == undefined){
        personnelParams.sort = '';
    }
    let value = "comcode=" + personnelComcode.id + "&querydate=" + insertTime + "&sort=" + personnelParams.order +"&sortfile="+personnelParams.sort;
    // console.log(https+"/surveyplatform/service/rest/exportSurveyorOnlineRate"+"?"+value); 
    window.open(https+"/surveyplatform/service/rest/exportSurveyorOnlineRate"+"?"+value); 
    operateRecordFun(48,2); //记录接口
}

//用户系统人员清单 & 上线人数导出  导出
function exportCurrency(data){
    let Judgment = $('#myModalLabel').attr('Judgment'); //判断下载  用户系统人数 //判断  1是用户系统人员 &  2 是 上线人员
    let querydate = $("#personnelTime").val(); //统计时间
    let comcode = $(data).attr('comcode'); //组织机构编码
    let  name = $('#currencyImg').attr('comcname');
    // let source = $(data).attr('source'); //true 是查询昨天的 ，flase 是查询整月的
    console.log(Judgment);
    let value = "";
    if(Judgment == 1){ //用户系统人员清单
        let source = $(data).attr('source'); //true 是查询昨天的 ，flase 是查询整月的
        if(source == "true"){
            value = "comcode=" + comcode + "&source=" + source + "&comcname=" + name;
            operateRecordFun(51,2); //记录接口
        }else{ 
            value = "comcode=" + comcode + "&querydate=" + querydate + "&source=" + source + "&comcname=" + name;
            operateRecordFun(49,2); //记录接口
        }
        
        window.open(https+"/surveyplatform/service/rest/exportHRSurveyors"+"?"+value); 
    }else{  //人员上线率列表
        let source = $(data).attr('sourcery'); //true 是查询昨天的 ，flase 是查询整月的
        if(source == "true"){
            value = "comcode=" + comcode + "&comcname=" + name + "&source=" + source;
        }else{ 
            value = "comcode=" + comcode + "&querydate=" + querydate + "&comcname=" + name + "&source=" + source;
        }
        window.open(https+"/surveyplatform/service/rest/exportDDSurveyors"+"?"+value);
        operateRecordFun(50,2); //记录接口 
    }

}

//查勘车页 弹窗导出
function SurveyExportC(data){
    let comcode = $(data).attr('comcode'); //组织机构编码
    let insertTime = $("#SurveyTime").val(); //统计时间：
    let Judgment = $('#SurveyModalLabel').attr('Judgment'); //判断下载
    let  name = $('#SurveyCurrencyImg').attr('comcname');
    let value = "comCode=" + comcode + "&insertTime=" + insertTime + "&comcname=" + name;
    // console.log(value);
    if(Judgment == 1){
        //平台已维护车辆数量 导出
        // console.log(https+"/surveyplatform/rest/countCarListToExport"+"?"+value); 
        window.open(https+"/surveyplatform/rest/countCarListToExport"+"?"+value);
        operateRecordFun(54,2); //记录接口 
    }else{
        // 实时车辆清单 导出
        // console.log(https+"/surveyplatform/rest/countCarListToExportRealTime"+"?"+value); 
        window.open(https+"/surveyplatform/rest/countCarListToExportRealTime"+"?"+value);
        operateRecordFun(53,2); //记录接口 
    }
}


//人员服务记录仪上线率 相互切换 服务记录仪上线率
function serveRecordChangeFun(data){
    if(data == 1){
        $('.serveRecord_accessory').hide(); //人员服务记录仪上线率 隐藏
        $('.serveRecord_main').show(); //服务记录仪上线率 显示
    }else{
        $('.serveRecord_accessory').show(); //人员服务记录仪上线率 显示
        $('.serveRecord_main').hide(); //服务记录仪上线率 隐藏
    }
    
}

//记录仪开通进度 的导出
function exportOpeningProgressfun(){
    let value = "comCode=" + OpeningProgressComcode.id;
    window.open(https+"/surveyplatform/service/rest/exportRecorderConnectProgress"+"?"+value);
    operateRecordFun(55,2); //记录接口 
}

//查勘超时率 导出
function exportSurveyTimeoutfun(){
    let queryDate = $("#surveyTimeout").val(); //统计时间：
    let value = "comCode=" + surveyTimeoutComcode.id+ "&queryDate="+ queryDate;

    window.open(https+"/surveyplatform/service/rest/exportMonthOverTimeRate"+"?"+value); 
    operateRecordFun(56,2); //记录接口
}

//人员维度查勘超时率 导出
function exportStaffSurveyTimeoutfun(){
    let comCodes = $('#exportStaffSurveyTimeout').attr('comCodes');
    let queryDate = $("#personnelSurveyTimeout").val(); //统计时间：
    let value = "comCode=" + comCodes + "&queryDate="+ queryDate;
    // console.log(https+"/surveyplatform/service/rest/exportPersonOverTimeRate"+"?"+value);
    window.open(https+"/surveyplatform/service/rest/exportPersonOverTimeRate"+"?"+value); 
    operateRecordFun(62,2); //记录接口
}

//1.2.导出 分公司登录量列表
function exportLoginAmountfun(){
    let queryDate = $("#LoginAmountTime").val(); //统计时间：
    let value = "comCode=" + LoginAmountComcode.id+ "&queryDate="+ queryDate;
    // console.log(https+"/surveyplatform/service/exportLoginCountForOrg"+"?"+value);
    window.open(https+"/surveyplatform/service/exportLoginCountForOrg"+"?"+value); 
    operateRecordFun(59,2); //记录接口
}
// 导出 人员登录量列表清单
function exportStaffLoginAmountfun(){
    let comCodes = $('#exportStafflogin').attr('comCodes');
    let queryDate = $("#LoginAmountTime").val(); //统计时间：
    let flag = $('#exportStafflogin').attr('flag');
    let value = "comCode=" + comCodes + "&queryDate="+ queryDate +"&flag=" + flag ;
    // console.log(https+"/surveyplatform/service/exportLoginCountForPerson"+"?"+value);
    window.open(https+"/surveyplatform/service/exportLoginCountForPerson"+"?"+value); 
    operateRecordFun(60,2); //记录接口
}


//第一级总触警案件量清单 导出
function touchPoliceExportC(){
    let comCodes = $('#touchPoliceIMG').attr('comcode');
    let queryDate = $("#touchPoliceIMG").attr('date'); //统计时间：
    let switchs = $('#touchPoliceIMG').attr('switchs');
    let value = "comCode=" + comCodes + "&queryDate="+ queryDate;
    if(switchs == 1){ //第一级总触警案件量清单
        window.open(https+"/surveyplatform/service/rest/exportCaseOverTime"+"?"+value); 
        operateRecordFun(57,2); //记录接口
    }else{//现场案件列表
        window.open(https+"/surveyplatform/service/rest/exportAllCaseTable"+"?"+value); 
        operateRecordFun(58,2); //记录接口
    }
    
}

//. 导出 人员登录量列表清单 弹框
function StaffLoginExportC(){
    let useCode = $('#StaffLoginIMG').attr('useCode');
    let queryDate = $("#StaffLoginIMG").attr('date'); //统计时间：
    let value = "useCode=" + useCode + "&queryDate="+ queryDate;
    // console.log(https+"/surveyplatform/service/exportLoginlogList"+"?"+value);
    window.open(https+"/surveyplatform/service/exportLoginlogList"+"?"+value);
    operateRecordFun(61,2); //记录接口 登录总次数（点击人员维度中的登录总次数）
}


function Bangzhu(){ //触警级别时间规范说明
    $('#BangzhuModal').modal('show');
}


//////////////////////
//查勘超时率页 表切换
function TimeoutReturnfun(data){ // 1 分公司点击的  2 人员返回的
    if(data == 1){ 
        $('.homepage_survey').hide();
        $('.Subpage_survey').show();
    }else{
        $('.homepage_survey').show();
        $('.Subpage_survey').hide();
    }
}

//登录量页 表切换的
function LoginSwitchingFun(data){// 1 分公司点击的  2 人员返回的
    if(data == 1){ 
        $('.homepage_login').hide();
        $('.Subpage_login').show();
    }else{
        $('.homepage_login').show();
        $('.Subpage_login').hide();
    }
}


//功能使用记录及下载记录接口
function operateRecordFun(modulecode,type){
    //获取登录人的comcode
    let comcode = sessionStorage.getItem("cOMCODE");
    //获取登录人的username
    let username = sessionStorage.getItem("username");
    //获取登录人的usercode
    let usercode = sessionStorage.getItem("usercode");
    console.log(comcode,username,usercode,modulecode,type);
    $.ajax({
        type: "GET",
        url: https+"/surveyplatform/service/rest/operateRecord",
        data: {
            comcode:comcode,
            username:username,
            usercode:usercode,
            modulecode:modulecode,
            type:type
        },
        dataType: "json",
        success: function(data){
            console.log(data);
        },
        error:function(e){
            console.log(e);
        }
    });
}