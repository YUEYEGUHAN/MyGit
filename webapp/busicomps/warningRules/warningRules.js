var curpage=1; var rows=10; var pageCount=1;
var tree; var selectedNode = 0;
var tree_shixiao; 
var selectedNode_shixiao ;
var selectedNode_case;
var selectedNode_CaseOvertime;
var selectedNode_Proportion;
var selectedNode_Report;
var params_case= {sort:'',order:''};
var params_CaseOvertime = {sort:'overcaseproportion',order:'desc'}; //存放 排序的
var params_Proportion = {sort:'',order:''};
var params_Report = {sort:'',order:''};
var Timepd = 0;
var paramSK;
var rowslength = 0;
var case_length = 0;
var CaseOvertime_length = 0;
var Proportion_length = 0;
var Report_length = 0;
var CaseOvertimeLevel;
var ProportionLevel;
var ReportLevel;

//在文档加载后激活函数，初始化加载
$(document).ready(function(){
    //检测页面是否登录
    if(sessionStorage.length == 0){
        //获取 URL 的主机部分
        var host = window.location.host;
        //跳转登录页面
       window.location.href = 'http://'+host+'/PICCCSOPlatform/manage/Login.html';
    }else{

        //获取登录人的comcode
        var comcodeS = sessionStorage.getItem("cOMCODE");
        // comcodeS = '00000000'
        //初始化查询列表
        queryComInfo(comcodeS);

        var iWinWidth =$(window).width(); //获取当前屏幕分辨率
        if(iWinWidth >= 1920){
            $(".content").css("height","88%");
            $(".content2").css("height","88%");
            $(".leftCenter").css("height","99%");
            $(".Tozhi-table").css("height","84%");
        }       
        
        // 一级菜单表单切换 ,tab页面切换
        $(".short_ul li").on("click",function(e){
            e.preventDefault();
            var i=$(this).index();
            $(".short_ul li").removeClass("active").eq(i).addClass("active"),
            $(".population .m_boxContent").removeClass("active").eq(i).addClass("active")
        });

        // 二级菜单表单切换 ,tab页面切换
        $(".tab-header li").on("click",function(e){
            e.preventDefault();
            var i=$(this).index();
            $(".tab-header li").removeClass("active").eq(i).addClass("active"),
            $(".content .m-box").removeClass("active").eq(i).addClass("active")
        });
        
        $(".tab-header2 li").on("click",function(e){
            e.preventDefault();
            var i=$(this).index();
            $(".tab-header2 li").removeClass("active").eq(i).addClass("active"),
            $(".content2 .m-box").removeClass("active").eq(i).addClass("active")
        });
        

        //超时跳转
        $.ajaxSetup({
            url: "warningRules.html" , // 默认URL
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
    $("#comTree").scrollTop(0);




}); 

//查询组织机构数
function queryComInfo(comcode){
    $.ajax({
        type: 'POST',
        url: "/surveyplatform/rest/interfaceapi/OrganizationTreeService/findOrgListByParam2" ,
        async: false ,
        data: {'comcode':comcode},
        success: function(data){
            $("#comcodeName").text(data.name);
            $("#comcodeName").attr("data-comcode",data.id);
            findAreaTree(data); //已通知短信列表树
            findAreaTree_shixaio(data); //预警配置树
            findAreaTree_case(data);
            findAreaTree_CaseOvertime(data);
            findAreaTree_Proportion(data);
            findAreaTree_Report(data);
            dataControl(); //时间
            InitMainTable(); //短信的表单
            InitMainTable_case(); //案件的表单
            findOvertimeRate(); //案件超时率日统计
            query_Proportion(); //超时时长占比统计
            query_Report(); //超时上报上级率日统计
            
        },
        error:findAreaTreeError,
        dataType: 'json' 
    });
}

//找到树的数据 已通知短信列表
function findAreaTree(data)
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
                selectedNode  = treeNode;
                // console.log(selectedNode,"1322465")
                $("#noticeLevel").val(selectedNode.type);
                // 根据组织机构级别,显示下拉框，有几个级别
                selectLevel(selectedNode);
                $("#comcodeName").text(selectedNode.name);
                $("#comcodeName").attr("data-comcode",selectedNode.id);
                //初始化查询
                $("#noticeName").val("");
                $("#noticeWorknumber").val("");
                $('.datepickerK').datepicker('setDate', new Date());
                InitMainTable();
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
         selectedNode = firstNode;
         $("#noticeLevel").val(selectedNode.type);
         selectLevel(selectedNode);
    }
   
}
//预警配置树
function findAreaTree_shixaio(data){
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
		                selectedNode_shixiao = treeNode;
		                queryRuleInfo();
		                queryRuleInfoForPersonHurt();
		                queryRuleInfoForLossAssessment();
                        $("#level_p").html(treeNode.name);
                        $("#level_p").attr("data-type",treeNode.type);
                        console.log(selectedNode_shixiao)
                        //判断
                        if(selectedNode_shixiao.type == 4){
                            $(".radioShow").hide();
                         }else{
                            $(".radioShow").show();
                         }
		            }
		        }
		    };
         // 初始化树
         let dataNode = data; 
         if(data.flag == true){
             dataNode = data.node;
         }
	    tree_shixiao = $.fn.zTree.init($("#comTree_shixiao"), setting, dataNode);
	    //默认选中第一个节点 
	    var firstNode =tree_shixiao.getNodes()[0];
	    	tree_shixiao.selectNode(firstNode);
	    if(firstNode!=undefined){
	    	 selectedNode_shixiao = firstNode;
             $("#level_p").html(firstNode.name);
             $("#level_p").attr("data-type",firstNode.type);
             console.log('树',selectedNode_shixiao.type)
             if(selectedNode_shixiao.type == 4){
                $(".radioShow").hide();
             }else{
                $(".radioShow").show();
             }
             //初始化预警规则配置页
             queryRuleInfo();
             queryRuleInfoForPersonHurt();
             queryRuleInfoForLossAssessment();
	    }
}
//找到树的数据 已通知案件列表
function findAreaTree_case(data){
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
                selectedNode_case  = treeNode;
                $("#levels").val(selectedNode_case.type);
                // 根据组织机构级别,显示下拉框，有几个级别
                selectLevel_case(selectedNode_case);
                $("#comcodeName_case").text(selectedNode_case.name);
                $("#comcodeName_case").attr("data-comcode",selectedNode_case.id);
                //初始化查询
                $('.datepickerK2').datepicker('setDate', new Date());
                InitMainTable_case();
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree_shixiao = $.fn.zTree.init($("#comTree_case"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree_shixiao.getNodes()[0];
        tree_shixiao.selectNode(firstNode);
    if(firstNode!=undefined){
         selectedNode_case = firstNode;
         $("#level_p").html(firstNode.name);
         $("#level_p").attr("data-type",firstNode.type);

    }
}
//找到树的数据 案件超时率日统计
function findAreaTree_CaseOvertime(data){
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
                selectedNode_CaseOvertime  = treeNode;
                var date = new Date();//将当前的日期转换成系统格式的日期
                var preDate = new Date(date.getTime() - 24*60*60*1000); //前一天
                $('.datepickerXS').datepicker('setDate', preDate);
                findOvertimeRate();
                if(selectedNode_CaseOvertime.type == 1){
                    CaseOvertimeLevel = '省公司';
                }else if(selectedNode_CaseOvertime.type == 2){
                    CaseOvertimeLevel = '市公司';
                }else if(selectedNode_CaseOvertime.type == 3){
                    CaseOvertimeLevel = '县机构';
                }else{
                    CaseOvertimeLevel = '县机构';
                }
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree_case = $.fn.zTree.init($("#comTree_CaseOvertime"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree_case.getNodes()[0];
    tree_case.selectNode(firstNode);
    if(firstNode!=undefined){
        selectedNode_CaseOvertime = firstNode;
        // findOvertimeRate()
        if(selectedNode_CaseOvertime.type == 1){
            CaseOvertimeLevel = '省公司';
        }else if(selectedNode_CaseOvertime.type == 2){
            CaseOvertimeLevel = '市公司';
        }else if(selectedNode_CaseOvertime.type == 3){
            CaseOvertimeLevel = '县机构';
        }else{
            CaseOvertimeLevel = '县机构';
        }
    }
}

//找到树的数据 超时时长占比统计
function findAreaTree_Proportion(data){
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
                selectedNode_Proportion  = treeNode;
                var date = new Date();//将当前的日期转换成系统格式的日期
                var preDate = new Date(date.getTime() - 24*60*60*1000); //前一天
                $('.datepickerXS').datepicker('setDate', preDate);
                query_Proportion();
                if(selectedNode_Proportion.type == 1){
                    ProportionLevel = '省公司';
                }else if(selectedNode_Proportion.type == 2){
                    ProportionLevel = '市公司';
                }else if(selectedNode_Proportion.type == 3){
                    ProportionLevel = '县机构';
                }else{
                    ProportionLevel = '县机构';
                }
            }
        }
    };
    // 初始化树
    let dataNode = data; 
    if(data.flag == true){
        dataNode = data.node;
    }
    tree_case = $.fn.zTree.init($("#comTree_Proportion"), setting, dataNode);
    //默认选中第一个节点 
    var firstNode =tree_case.getNodes()[0];
    tree_case.selectNode(firstNode);
    if(firstNode!=undefined){
        selectedNode_Proportion = firstNode;
        if(selectedNode_Proportion.type == 1){
            ProportionLevel = '省公司';
        }else if(selectedNode_Proportion.type == 2){
            ProportionLevel = '市公司';
        }else if(selectedNode_Proportion.type == 3){
            ProportionLevel = '县机构';
        }else{
            ProportionLevel = '县机构';
        }
    }
}

//找到树的数据 超时上报上级率日统计
function findAreaTree_Report(data){
    // console.log('超时上报上级率日统计',data)
    var setting = {
        view: {  
            showLine: false,//不显示连接线，默认值true  
            showIcon:true   //是否显示节点的图标(包括父级的文件夹图标子级的文件图标都不显示)，默认值true  
        }, 
        callback:{
            onClick:function(event,treeId,treeNode)
            {
                if(treeNode == null){
                    return;
                }
                pageCount = 1; curpage = 1;//点击组织机构更新table页码

                selectedNode_Report  = treeNode;
                var date = new Date();//将当前的日期转换成系统格式的日期
                var preDate = new Date(date.getTime() - 24*60*60*1000); //前一天
                $('.datepickerXS').datepicker('setDate', preDate);
                query_Report();
                if(selectedNode_Report.type == 1){
                    ReportLevel = '省公司';
                }else if(selectedNode_Report.type == 2){
                    ReportLevel = '市公司';
                }else if(selectedNode_Report.type == 3){
                    ReportLevel = '县机构';
                }else{
                    ReportLevel = '县机构';
                }
            }
        }
    };
    
    console.log(data,'初始化树')
    let datas = data
    if(data.type == 1){
        datas = data.children
    }
    if(data.flag == true){
        datas = data.node;
    }
    // 初始化树
    tree_case = $.fn.zTree.init($("#comTree_Report"), setting, datas);

    //默认选中第一个节点 
    var firstNode =tree_case.getNodes()[0];
    tree_case.selectNode(firstNode);
    if(firstNode!=undefined){
        selectedNode_Report = firstNode;
        if(selectedNode_Report.type == 1){
            ReportLevel = '省公司';
        }else if(selectedNode_Report.type == 2){
            ReportLevel = '市公司';
        }else if(selectedNode_Report.type == 3){
            ReportLevel = '县机构';
        }else{
            ReportLevel = '县机构';
        }
    }
}

function findAreaTreeError(){
	alert("ajax请求失败！");
}

//初始化bootstrap-table的内容 查询按钮
function InitMainTable() {
    NotificationDS();
    if(Timepd == 0){
        var comcode = selectedNode.id;                          //组织机构的编号
        var name = $("#noticeName").val();                      //通知人姓名
        var Worknumber = $("#noticeWorknumber").val();          //通知人工号
        var Level = $("#noticeLevel option:selected").val();    //通知级别
        var Time1 = $("#timestart").val();                        //时间
		 var Time2 = $("#timeend").val();                        //时间
        var token = sessionStorage.getItem("token");
        //记录页面bootstrap-table全局变量$table，方便应用
        $("#tableWR").bootstrapTable('destroy');
        $('#tableWR').bootstrapTable({
            url: '/surveyplatform/rest/interfaceapi/PrpLisSmsLogsInfoService/findPrpLisSmsLogs?queryType=page',    //请求后台的URL（*）
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
            queryParams : function (params) {
                // console.log(params);
                $("#loadingS").show();
                paramSK = params;
                //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
                var temp = { 
                    comcode:comcode,          //组织机构的编号
                    personname:name,          //通知人姓名
                    personcode:Worknumber,    //通知人工号
                    levels:Level,             //通知级别
                    queryTimeStart:Time1,           //时间
                    queryTimeEnd:Time2,           //时间
                    rows: params.limit,                        //显示的行数
                    page: (params.offset / params.limit) + 1,   //页码
                    sort: params.sort,        //排序列名  
                    sortOrder: params.order  //排位命令（desc，asc） 
                    // token:token
                };
                return temp;
            },
            columns: [{
                checkbox: true,  
                visible: false     //是否显示复选框  
            }, {
                field: 'comcode',
                title: '组织机构编码',
                sortable: true
            }, {
                field: 'comname',
                title: '组织机构名称',
                sortable: true
            }, {
                field: 'personcode',
                title: '通知人工号',
                sortable: true
            }, {
                field: 'personname',
                title: '通知人姓名',
                sortable: true
            }, {
                field: 'telephon',
                title: '通知人电话',
                sortable: true
            }, {
                field: 'inserttimeforhis',
                title: '通知时间',
                sortable: true,
                width:'162px'
            }, {
                field: 'content',
                title: '短信内容',
                width:'170px',
                formatter: function (value, row, index) {
                    return '<span class="contentSpan" onclick="contenFun(this)">'+ value +'</span>';
                    }
            }, {
                field: 'levels',
                title: '通知级别'
            }],
            
            onLoadSuccess: function (data) {
                console.log(data);
                rowslength = data.rows.length;
                // console.log(paramSK);
            },
            onLoadError: function () {
        
            }
        });
    }
    
};
//初始化bootstrap-table的内容 查询按钮
function InitMainTable_case() {
        var comcode = selectedNode_case.id;                     //组织机构的编号
        var registno = $("#registno").val();                    //报案号
        var surveyorcode = $("#surveyorcode").val();            //查勘员工号
        var personcode = $("#personcode").val();                //通知人工号
        var surveyorname = $("#surveyorname").val();            //查勘员姓名
        var personname = $("#personname").val();                //通知人姓名
        var Levels = $("#levels option:selected").val();        //通知级别
        var Time1 = $("#startTime").val();                      //开始时间
        var Time2 = $("#endTime").val();                        //结束时间
        // 记录页面bootstrap-table全局变量$table，方便应用
        $("#table_case").bootstrapTable('destroy');
        $('#table_case').bootstrapTable({
            url: '/surveyplatform/service/rest/sms/findSmsList',    //请求后台的URL（*）
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
            queryParams : function (params) {
                // console.log(params);
                params_case = params;
                $("#loadingS").show();
                //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
                var temp = { 
                    codes:comcode,          //组织机构的编号
                    registno:registno,          //报案号
                    surveyorcode:surveyorcode,    //查勘员工号
                    personcode:personcode,        //通知人工号
                    surveyorname:surveyorname,      //查勘员姓名
                    personname:personname,       //通知人姓名
                    Levels:Levels,              //通知级别
                    startTime:Time1,           //时间
                    endTime:Time2,           //时间
                    pageSize: params.limit,                        //显示的行数
                    pageNumber: (params.offset / params.limit) + 1,   //页码
                    sortfile: params.sort,        //排序列名  
                    sort: params.order  //排位命令（desc，asc） 
                };
                return temp;
            },
            columns: [{
                checkbox: true,  
                visible: false     //是否显示复选框  
            }, {
                field: 'registno',
                title: '报案号',
                width: 115,
                formatter: function (value, row, index) {
                    return '<span class="registnoSpan">'+ value +'</span>';
                    },
                sortable: true
            }, {
                field: 'surveyorcode',
                title: '查勘员工号',
                sortable: true
            }, {
                field: 'surveyorname',
                title: '查勘员姓名',
                sortable: true
            }, {
                field: 'surveyorphone',
                title: '查勘员电话',
                sortable: true,
                width: 100
            }, {
                field: 'inserttimeforhis',
                title: '通知时间',
                sortable: true
            }, {
                field: 'personcode',
                title: '通知人工号',
                sortable: true,
                width: 100
            }, {
                field: 'personname',
                title: '通知人姓名',
                sortable: true
            }, {
                field: 'personphone',
                title: '通知人电话',
                width: 100,
                sortable: true
            }, {
                field: 'comcname',
                title: '机构名称',
                width: 100,
                sortable: true
            }, {
                field: 'levels',
                title: '通知级别',
                formatter: function (value, row, index) {
                    let valueNmae = ''
                    if(value == 1){
                        valueNmae = '总公司';
                    }else if(value == 2){
                        valueNmae = '省公司';
                    }else if(value == 3){
                        valueNmae = '市公司';
                    }else if(value == 4){
                        valueNmae = '县机构';
                    }
                    return '<span>'+ valueNmae +'</span>';
                    }
            }, {
                field: 'orvertime',
                title: '预警时效',
                width: 75
            }],
            onLoadSuccess: function (data) {
                // console.log(data);
     
                case_length = data.rows.length;
            },
            onLoadError: function () {
        
            }
        });
};
// 短信内容的方法
function contenFun(data) {
    var s = $(data).text();
    // console.log(s);
    //触发拟态窗
    $(".messageSpan").scrollTop(0); //滚动条回到最上面
    $(".messageSpan").text(s);
    $('#messageModal').modal('show');
}



// 验证组织机构有没有数据的方法
function loadingData() { 
    var Time1 = $("#timestart").val();                        //时间
	var Time2 = $("#timeend").val();                        //时间
    var Level = $("#noticeLevel option:selected").val();   //通知级别
    var name = $("#comcodeName").text();                   //组织机构名字
    var comcode = $("#comcodeName").attr("data-comcode");  //组织机构编码
    var token = sessionStorage.getItem("token");
    $.ajax({
        url: "/surveyplatform/rest/interfaceapi/PrpLisSmsLogsInfoService/findPrpLisSmsLogs",
        data: {
            'queryType':'page',
            'comcode':comcode,     //组织机构的编号    
            'personname':'',       //通知人姓名
            'personcode':'',       //通知人工号
            'levels':Level,        //通知级别
            'queryTimeStart':Time1,      //时间
            'queryTimeEnd':Time2,      //时间
            'rows': 10,            //显示的行数
            'page':1  ,            //页码
            'token':token
        } ,
        type:'get',
        dataType:'json',
        success: function(datas){
            if(datas.rows == null || datas.rows.length == 0){
                $('.OrganizationSpan').text(name+"暂无数据！");
                $('#OrganizationModal').modal('show');
            }
        }
    });
    $("#loadingS").show();
}

//保存按钮
$(".buttonOk").click(function(){
		//查勘员
        var overtime = $("#overtime").val();     //超时时效
        var personname = $("#leadership").val(); //姓名
        var personcode = $("#workNumber").val(); //工号
        var telephone = $("#Telephone").val();   //电话
        var radioSwitch = $('input[name="radioSwitch"]:checked').val(); //发送短信开关 true / false
        //人伤
        var personnameForPersonHurt = $("#leadershipForPersonHurt").val(); //姓名
        var personcodeForPersonHurt = $("#workNumberForPersonHurt").val(); //工号
        var telephoneForPersonHurt = $("#TelephoneForPersonHurt").val();   //电话
        //定损
        var personnameForLossAssessment = $("#leadershipForLossAssessment").val(); //姓名
        var personcodeForLossAssessment = $("#workNumberForLossAssessment").val(); //工号
        var telephoneForLossAssessment = $("#TelephoneForLossAssessment").val();   //电话
        if(overtime == ""){
            document.getElementById("modalImgID").src = "lib/images/fail.png";
        	$(".modalSpan").text("超时时效不能为空！");
            $('#myModal').modal('show');
        }else if(personname == "" ){
            document.getElementById("modalImgID").src = "lib/images/fail.png";
        	$(".modalSpan").text("通知人姓名不能为空！");
            $('#myModal').modal('show');
        }else if(personcode == ""){
            document.getElementById("modalImgID").src = "lib/images/fail.png";
        	$(".modalSpan").text("通知人工号不能为空！");
            $('#myModal').modal('show');
        }else if(telephone == ""){
            document.getElementById("modalImgID").src = "lib/images/fail.png";
        	$(".modalSpan").text("通知人电话不能为空！");
            $('#myModal').modal('show');
        }else{
            //时效判断
            Timejudgement();
            if(Timepd == 0){
                var token = sessionStorage.getItem("token");
                $.ajax({
                    url:'/surveyplatform/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/addPrpLisEarlyWarnConfigMain',
                    data:{
                        'organcode':selectedNode_shixiao.id,    //组织机构编号
                        'organname':selectedNode_shixiao.name,     //组织机构名称
                        'personcode':personcode, //工号
                        'personname':personname, //姓名
                        'telephone':telephone,   //电话
                        'overtime':overtime ,     //超时时效
                        'personcodeForPersonHurt':personcodeForPersonHurt,
                        'personnameForPersonHurt':personnameForPersonHurt,
                        'telephoneForPersonHurt':telephoneForPersonHurt,
                        'personcodeForLossAssessment':personcodeForLossAssessment,
                        'personnameForLossAssessment':personnameForLossAssessment,
                        'telephoneForLossAssessment':telephoneForLossAssessment,
                        'configvalue':radioSwitch,
                        'token':token
                    },
                    type:'post',
                    dataType:'json',
                    success:function(data){
                        if(data > 0){
                            document.getElementById("modalImgID").src = "lib/images/Success.png";
                            $(".modalSpan").text("保存成功！");
                        }else{
                            document.getElementById("modalImgID").src = "lib/images/fail.png";    
                            $(".modalSpan").text("修改失败,部分内容未发生变化！");
                        }
                        //触发拟态窗
                        $('#myModal').modal('show');
                    }
                });
        

            }
           
        }
});
 //查询预警规则配置页
function queryRuleInfo(){
    var token = sessionStorage.getItem("token");
    $.ajax({
        url:'/surveyplatform/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/findPrpLisEarlyWarnConfigPersonInfo',
        data:{
            'organcode':selectedNode_shixiao.id ,  //组织机构编号
            'token':token
        },
        type:'post',
        dataType:'json',
        success:function(data){  	
        	if(data.length>0){
        		$("#overtime").val(data[0].overtime);     //超时时效
                $("#leadership").val(data[0].personname); //姓名
                $("#workNumber").val(data[0].personcode); //工号
                $("#Telephone").val(data[0].telephone);   //电话
        	}else{
        		$("#overtime").val("");     //超时时效
                $("#leadership").val(""); //姓名
                $("#workNumber").val(""); //工号
                $("#Telephone").val("");   //电话
        	}
        }
    });
    $.ajax({
        url:'/surveyplatform/service/rest/sms/findSmsSwitch',
        data:{
            'comcode':selectedNode_shixiao.id  //组织机构编号
        },
        type:'get',
        dataType:'json',
        success:function(data){  	
            // console.log(data,'返回',data.status,data.result.msg)
            if(data.status == 1){
                if(data.result.msg == true){
                    console.log(data.result.msg)
                    $("input[type='radio'][name='radioSwitch'][value='true']").prop("checked",true);
                }else{
                    console.log(data.result.msg)
                    $("input[type='radio'][name='radioSwitch'][value='false']").prop("checked",true);
                }

            }
            
        }
    });

}
function queryRuleInfoForPersonHurt()
{
	var token = sessionStorage.getItem("token");
    $.ajax({
        url:'/surveyplatform/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/findPrpLisEarlyWarnConfigPersonInfoForPersonHurt',
        data:{
            'organcode':selectedNode_shixiao.id ,  //组织机构编号
            'token':token
        },
        type:'post',
        dataType:'json',
        success:function(data){  	
        	if(data.length>0){
                $("#leadershipForPersonHurt").val(data[0].personname); //姓名
                $("#workNumberForPersonHurt").val(data[0].personcode); //工号
                $("#TelephoneForPersonHurt").val(data[0].telephone);   //电话
        	}else{
                $("#leadershipForPersonHurt").val(""); //姓名
                $("#workNumberForPersonHurt").val(""); //工号
                $("#TelephoneForPersonHurt").val("");   //电话
        	}
        }
    });
}
function queryRuleInfoForLossAssessment()
{
	var token = sessionStorage.getItem("token");
    $.ajax({
        url:'/surveyplatform/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/findPrpLisEarlyWarnConfigPersonInfoForLossAssessment',
        data:{
            'organcode':selectedNode_shixiao.id ,  //组织机构编号
            'token':token
        },
        type:'post',
        dataType:'json',
        success:function(data){  	
        	if(data.length>0){
                $("#leadershipForLossAssessment").val(data[0].personname); //姓名
                $("#workNumberForLossAssessment").val(data[0].personcode); //工号
                $("#TelephoneForLossAssessment").val(data[0].telephone);   //电话
        	}else{
                $("#leadershipForLossAssessment").val(""); //姓名
                $("#workNumberForLossAssessment").val(""); //工号
                $("#TelephoneForLossAssessment").val("");   //电话
        	}
        }
    });

}
//时效判断
function Timejudgement(){
    var p = $("#level_p").attr("data-type");
    var sun = $("#overtime").val(); //时效判断
    var personname = $("#leadership").val(); //姓名
    var personcode = $("#workNumber").val(); //工号
    var telephone = $("#Telephone").val();   //电话
    Timepd = 0 ;
    var number = new RegExp(/^[1-9][0-9]*$/); //数字验证
    var number2 = new RegExp(/^[a-zA-Z0-9]*$/); //工号验证
    var nameS = new RegExp(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/); //中文、数字、字母验证

    if(p == 1){
        if(sun > 225 || sun <= 0){
            Timepd = 1 ;
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("总公司级别超时时效的有效范围：0 ~ 225分钟");
            $('#myModal').modal('show');
        }
    }else if(p == 2){
        if(sun > 105 || sun <= 0){
            Timepd = 1 ;
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("省公司级别超时时效的有效范围：0 ~ 105分钟");
            $('#myModal').modal('show');
        }
    }else if(p == 3){
        if(sun > 45 || sun <= 0){
            Timepd = 1 ;
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("市公司级别超时时效的有效范围：0 ~ 45分钟");
            $('#myModal').modal('show');
        }
    }else if(p == 4){
        if(sun > 40 || sun <= 0){
            Timepd = 1 ;
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("县公司级别超时时效的有效范围：0 ~ 40分钟");
            $('#myModal').modal('show');
        }
    }
    if(Timepd != 1){
        if(!number.test(sun)){ //时效
                Timepd = 1 ;
                document.getElementById("modalImgID").src = "lib/images/fail.png";  
                $(".modalSpan").text("超时时效只能输入数字并且开头不能为0！");
                $('#myModal').modal('show');
        }else if(!number2.test(personcode)){ //工号
                Timepd = 1 ;
                document.getElementById("modalImgID").src = "lib/images/fail.png";  
                $(".modalSpan").text("通知人工号只能输入数字并且开头不能为0！");
                $('#myModal').modal('show');
        }else if(!number.test(telephone)){ //电话
                Timepd = 1 ;
                document.getElementById("modalImgID").src = "lib/images/fail.png";  
                $(".modalSpan").text("通知人电话只能输入数字并且开头不能为0！");
                $('#myModal').modal('show');
        }else if(!nameS.test(personname)){ //通知人名字
            Timepd = 1 ;
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("通知人名字只能输入中文、英文和数字！");
            $('#myModal').modal('show');
        }
    }
    
        
}
//时间控件
function dataControl(){
    //初始化时间控件
    $('.datepicker').datepicker({
        language: 'zh-CN',      //设置语言
        weekStart: 1,           // 起始周
        autoclose: true,        //选中之后自动隐藏日期选择框    
        format: "yyyy-mm-dd"   //日期格式 
    }).on('changeDate',function(){
        // loadingData();
        // InitMainTable();
    });
  
    //默认当前时间
    $('.datepicker').datepicker('setDate', new Date());
    var date = new Date();//将当前的日期转换成系统格式的日期
    var preDate = new Date(date.getTime() - 24*60*60*1000); //前一天
    $('.datepickerXS').datepicker('setDate', preDate);
}



//返回卡片页面
function PotalS(){
    //获取 URL 的主机部分
    var host = window.location.host;
    //跳转卡片页面
    window.location.href = 'http://'+host+'/PICCCSOPlatform/manage/Potal.html';
}

// 根据组织机构级别,显示下拉框，有几个级别
function selectLevel(selectedNode){
     if(selectedNode.type == 1){
        $("#selectOne").show();
        $("#selectTwo").show();
        $("#selectThree").show();
    }else if(selectedNode.type == 2){
        $("#selectOne").hide();
        $("#selectTwo").show();
        $("#selectThree").show();
    }else if(selectedNode.type == 3){
        $("#selectOne").hide();
        $("#selectTwo").hide();
        $("#selectThree").show();
    }else if(selectedNode.type == 4){
        $("#selectOne").hide();
        $("#selectTwo").hide();
        $("#selectThree").hide();
    }
}

function selectLevel_case(selectedNode){
    // console.log(selectedNode)
    if(selectedNode.type == 1){
       $("#selectOne_case").show();
       $("#selectTwo_case").show();
       $("#selectThree_case").show();
   }else if(selectedNode.type == 2){
       $("#selectOne_case").hide();
       $("#selectTwo_case").show();
       $("#selectThree_case").show();
   }else if(selectedNode.type == 3){
       $("#selectOne_case").hide();
       $("#selectTwo_case").hide();
       $("#selectThree_case").show();
   }else if(selectedNode.type == 4){
       $("#selectOne_case").hide();
       $("#selectTwo_case").hide();
       $("#selectThree_case").hide();
   }
}

//判断已通知列表 的文本框
function NotificationDS(){
    var personname = $("#noticeName").val();                //通知人姓名
    var personcode = $("#noticeWorknumber").val();          //通知人工号
    var number = new RegExp(/^[1-9][0-9]*$/); //数字验证
    var number2 = new RegExp(/^[a-zA-Z0-9]*$/); //工号验证
    var nameS = new RegExp(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/); //中文、数字、字母验证
    Timepd = 0;
    if(personcode != ""){
        if(!number2.test(personcode)){ //工号
            Timepd = 1 ;
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("通知人工号只能输入数字并且开头不能为0！");
            $('#myModal').modal('show');
        }
    }
    if(Timepd != 1){
        if(personname != ""){
            if(!nameS.test(personname)){ //通知人名字
                Timepd = 1 ;
                document.getElementById("modalImgID").src = "lib/images/fail.png";  
                $(".modalSpan").text("通知人名字只能输入中文、英文和数字！");
                $('#myModal').modal('show');
            }
        }
    }
    
     
}
//
function switch_tableOne(){
    let span = $("#case_tableSpan").html();
    // console.log(span);
    if(span == 1){
        $('#case_switch').attr('src','lib/images/formT.png');
        $(".table_one").hide();
        $(".chart_one").show();
        $("#case_tableSpan").html("2");
    }else{
        $('#case_switch').attr('src','lib/images/echartsT.png');
        $(".table_one").show();
        $(".chart_one").hide();
        $("#case_tableSpan").html("1");
    }
}

function switch_tableTwo(){
    let span = $("#case_tableSpan2").html();
    // console.log(span);
    if(span == 1){
        $('#Proportion_switch').attr('src','lib/images/formT.png');
        $(".table_P").hide();
        $(".echarts_P").show();
        $("#case_tableSpan2").html("2");
    }else{
        $('#Proportion_switch').attr('src','lib/images/echartsT.png');
        $(".table_P").show();
        $(".echarts_P").hide();
        $("#case_tableSpan2").html("1");
    }
}

function switch_tableThree(){
    let span = $("#case_tableSpan3").html();
    // console.log(span);
    if(span == 1){
        $('#Report_switch').attr('src','lib/images/formT.png');
        $(".table_R").hide();
        $(".echarts_R").show();
        $("#case_tableSpan3").html("2");
    }else{
        $('#Report_switch').attr('src','lib/images/echartsT.png');
        $(".table_R").show();
        $(".echarts_R").hide();
        $("#case_tableSpan3").html("1");
    }
}

//案件超时率日统计报表
function findOvertimeRate(){
    var comcode = selectedNode_CaseOvertime.id;              //组织机构的编号
    var noticecode = $("#noticecode").val();                //通知人工号
    var noticename = $("#noticename").val();                //通知人姓名
    var inserttime = $("#inserttime").val();                //开始时间
    // 记录页面bootstrap-table全局变量$table，方便应用
    $("#table_CaseOvertime").bootstrapTable('destroy');
    $('#table_CaseOvertime').bootstrapTable({
        url: '/surveyplatform/service/rest/sms/findOvertimeRatePage',    //请求后台的URL（*）
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
        queryParams : function (params) {
            console.log(params);
            if(params.sort != undefined){
                params_CaseOvertime = params;
            }else{
                params_CaseOvertime.sort = 'overcaseproportion';
                params_CaseOvertime.order = 'desc';
            }
            $("#loadingS").show();
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = { 
                comcode:comcode,          //组织机构的编号
                noticecode:noticecode,
                noticename:noticename,
                inserttime:inserttime,
                pageSize: params.limit,                        //显示的行数
                pageNumber: (params.offset / params.limit) + 1,   //页码
                sortfile: params_CaseOvertime.sort,        //排序列名  
                sort: params_CaseOvertime.order  //排位命令（desc，asc） 
            };
            return temp;
        },
        columns: [{
            checkbox: true,  
            visible: false     //是否显示复选框  
        }, {
            field: 'organcode',
            title: '机构编码',
            sortable: true
        }, {
            field: 'organname',
            title: '机构名称',
            sortable: true
        }, {
            field: 'inserttime',
            title: '时间'
        }, {
            field: 'personcode',
            title: '通知人工号',
            sortable: true
        }, {
            field: 'personname',
            title: '通知人姓名',
            sortable: true
        }, {
            field: 'telephone',
            title: '通知人电话',
            width: 110,
            sortable: true
        }, {
            field: 'levels',
            title: '通知级别',
            formatter: function (value, row, index) {
                let valueNmae = ''
                if(value == 1){
                    valueNmae = '总公司';
                }else if(value == 2){
                    valueNmae = '省公司';
                }else if(value == 3){
                    valueNmae = '市公司';
                }else if(value == 4){
                    valueNmae = '县机构';
                }
                return '<span>'+ valueNmae +'</span>';
            }
            
        }, {
            field: 'overtime',
            title: '预警时效',
            width: 80
        }, {
            field: 'casenum',
            title: '现场总案件数',
            width: 110
        }, {
            field: 'overcasenum',
            title: '超时案件',
            width: 80
        }, {
            field: 'overcaseproportion',
            title: '超时率',
            width: 75,
            formatter: function (value, row, index) {
                let vlas = '-'
                if(value != null){
                    vlas = value + '%';
                }
               
                return '<span>'+ vlas +'</span>';
            },
            sortable: true
        }],
        onLoadSuccess: function (data) {
            // console.log(data);
            CaseOvertime_length = data.rows.length;
        },
        onLoadError: function () {
    
        }
    });

    $.ajax({
        url:'/surveyplatform/service/rest/sms/findOvertimeRate',
        data:{
            'comcode':comcode,          //组织机构的编号
            'noticecode':noticecode,
            'noticename':noticename,
            'inserttime':inserttime,
        },
        type:'get',
        dataType:'json',
        success:function(data){
            let overcaseproportionArr = []
            let comcnameArr = []
            if(data.status == 1){
                // console.log(data,'图表');
                // console.log(data.rows)
                
                // console.log(data.rows[].comcname)
                let overcaseproportion = 0;
                if(data.rows.length > 0){
                    for(let i = 0; data.rows.length > i ; i++){
                        // console.log(data.rows[i])
                        overcaseproportion = data.rows[i].overcaseproportion
                        if(data.rows[i].overcaseproportion == null){
                            overcaseproportion = 0;
                        }
                        overcaseproportionArr.push(overcaseproportion);
                        comcnameArr.push(data.rows[i].organname)
                    }
                }
            }

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echarts_one'));

            // 指定图表的配置项和数据
            var option = {
                color:['#5B9DFB'],
                title: {
                    text: '案件超时率日统计',
                    textStyle:{
                        color:'#ffffff'
                    }
                },
                tooltip: {
                     //此为提示配置项
                     trigger: 'axis',
                     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                     },
                     formatter:'{b}<br />\
                         <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#5B9DFB"></span>\
                         {a0}：{c0}%<br />'
                },
                grid: {
                    left: '1%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    name: CaseOvertimeLevel,
                    data: comcnameArr,
                    axisTick: {
                        alignWithLabel: true
                      },
                    axisLabel: {
                        lineStyle:{
                            color:'#ffffff'
                        },
                        color:'#ffffff',
                        interval:0,
                        rotate:45//角度顺时针计算的
                    },
                    nameTextStyle:{
                        color:'#ffffff'
                    }
                }],
                yAxis: [{
                    type : 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} %',
                        color:'#ffffff'
                    },
                    show: true,
                    splitLine:{
                        show:false
                    }
                }],
                series: [{
                    name: '案件超时率日统计',
                    type: 'bar',
                    barMaxWidth: '100',
                    data: overcaseproportionArr
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);           
        }
    });


}

//超时时长占比统计 查询按钮
function query_Proportion(){
        var comcode = selectedNode_Proportion.id;
        var noticecode = $("#noticecode_Proportion").val();                //通知人工号
        var noticename = $("#noticename_Proportion").val();                //通知人姓名
        var inserttime = $("#inserttime_Proportion").val();                //开始时间
      // 记录页面bootstrap-table全局变量$table，方便应用
      $("#table_Proportion").bootstrapTable('destroy');
      $('#table_Proportion').bootstrapTable({
          url: '/surveyplatform/service/rest/sms/findOverTimeProportionPage',    //请求后台的URL（*）
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
          queryParams : function (params) {
            //   console.log(params);
            params_Proportion = params;
              $("#loadingS").show();
              //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
              var temp = { 
                  comcode:comcode,          //组织机构的编号
                  noticecode:noticecode,
                  noticename:noticename,
                  inserttime:inserttime,
                  pageSize: params.limit,                        //显示的行数
                  pageNumber: (params.offset / params.limit) + 1,   //页码
                  sortfile: params.sort,        //排序列名  
                  sort: params.order  //排位命令（desc，asc） 
              };
              return temp;
          },
          columns: [{
              checkbox: true,  
              visible: false     //是否显示复选框  
          }, {
              field: 'organcode',
              title: '机构编码',
              sortable: true,
              width: 80
          }, {
              field: 'organname',
              title: '机构名称',
              sortable: true
          }, {
              field: 'inserttime',
              title: '时间'
          }, {
              field: 'personcode',
              title: '通知人工号',
               width: 110,
              sortable: true
          }, {
              field: 'personname',
              title: '通知人姓名',
              sortable: true
          }, {
              field: 'telephone',
              title: '通知人电话',
              width: 110,
              sortable: true
          }, {
              field: 'overtime',
              title: '预警时效',
              width: 80
          }, {
              field: 'overcasenum',
              title: '超时案件数',
              width: 95,
              sortable: true
          }, {
              field: 'overtimeproportion1',
              title: '超时15分钟</br>内案件占比',
              valign: 'middle',
              sortable: true,
              formatter: function (value, row, index) {
                  let vlas = '-'
                  if(value != null){
                    vlas = value + '%';
                  }
                return '<span>'+ vlas +'</span>';
            },
              width:110
          }, {
              field: 'overtimeproportion2',
              title: '超时15至60分</br>钟案件占比',
            //   align: 'center',
              valign: 'middle',
              sortable: true,
              formatter: function (value, row, index) {
                let vlas = '-'
                if(value != null){
                  vlas = value + '%';
                }
              return '<span>'+ vlas +'</span>';
            },
              width:110
          }, {
              field: 'overtimeproportion3',
              title: '超时60分钟以</br>上案件占比',
              valign: 'middle',
              sortable: true,
              formatter: function (value, row, index) {
                    let vlas = '-'
                    if(value != null){
                        vlas = value + '%';
                    }
                return '<span>'+ vlas +'</span>';
                },
              width:110
          }],
          onLoadSuccess: function (data) {
            //   console.log(data);
            Proportion_length = data.rows.length;
          },
          onLoadError: function () {
      
          }
      });
      ////////////2222222222
      $.ajax({
        url:'/surveyplatform/service/rest/sms/findOverTimeProportion',
        data:{
            'comcode':comcode,          //组织机构的编号
            'noticecode':noticecode,
            'noticename':noticename,
            'inserttime':inserttime,
        },
        type:'get',
        dataType:'json',
        success:function(data){
            let overtimeproportion1arr = []
            let overtimeproportion2arr = []
            let overtimeproportion3arr = []
            let comcnameArr = []
            if(data.status == 1){    
                if(data.rows.length > 0){
                    for(let i = 0; data.rows.length > i ; i++){
                        // console.log(data.rows[i])
                        overtimeproportion1arr.push(data.rows[i].overtimeproportion1);
                        overtimeproportion2arr.push(data.rows[i].overtimeproportion2);
                        overtimeproportion3arr.push(data.rows[i].overtimeproportion3);
                        comcnameArr.push(data.rows[i].organname)
                    }
                }
                // console.log(overcaseproportionArr,comcnameArr)
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echarts_two'));
            // 指定图表的配置项和数据
            var option = {
                color:['#58FFFF','#5B9DFB','#FFFF93'],
                title: {
                    text: '超时时长占比统计',
                    textStyle:{
                        color:'#ffffff'
                    }
                },
                tooltip: {
                    //此为提示配置项
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params, ticket, callback) {
                        let dataA = '';
                        let dataB = '';
                        let dataC = '';
                        let values = '0';
                        for(let i = 0; i < params.length; i++){
                            if(params[i].value != undefined){
                                values = params[i].value;
                            }
                            if(params[i].seriesIndex == 0){
                                dataA = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#58FFFF"></span>\
                                '+params[i].seriesName+'：'+values+'%<br />';
                            }else if(params[i].seriesIndex == 1){
                                dataB = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#5B9DFB"></span>\
                                '+params[i].seriesName+'：'+values+'%<br />';
                            }else if(params[i].seriesIndex == 2){
                                dataC = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FFFF93"></span>\
                                '+params[i].seriesName+'：'+values+'%<br />';
                            }
                        }
                        
                        return params[0].name+'<br /><div style="text-align: left;">'+dataA+''+dataB+''+dataC+'</div>';
                    }
                },
                legend: {
                    data:['超时时长<=15分钟比率','超时时长 15 -60分钟比率','超时时长>60分钟比率'],
                    right:'100px',
                    textStyle: {
                        color:'#eee'
                    }
                },
                grid: {
                    left: '1%',
                    right: '5%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    name: ProportionLevel,
                    data: comcnameArr,
                    axisLabel: {
                        lineStyle:{
                            color:'#ffffff'
                        },
                        color:'#ffffff',
                        interval:0,
                        rotate:45//角度顺时针计算的
                    },
                    nameTextStyle:{
                        color:'#ffffff'
                    }
                },
                yAxis: {
                    type : 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} %',
                        color:'#ffffff'
                    },
                    show: true,
                    splitLine:{
                        show:false
                    }
                },
                series: [{
                    name: '超时时长<=15分钟比率',
                    type: 'bar',
                    barMaxWidth: '100',
                    data: overtimeproportion1arr
                },{
                    name: '超时时长 15 -60分钟比率',
                    type: 'bar',
                    barMaxWidth: '100',
                    data: overtimeproportion2arr
                },{
                    name: '超时时长>60分钟比率',
                    type: 'bar',
                    barMaxWidth: '100',
                    data: overtimeproportion3arr
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
           
        }
    });

      
}

//查询超时上报上级率
function query_Report(){
    var comcode = selectedNode_Report.id;
    var noticecode = $("#noticecode_Report").val();                //通知人工号
    var noticename = $("#noticename_Report").val();                //通知人姓名
    var inserttime = $("#inserttime_Report").val();                //开始时间
  // 记录页面bootstrap-table全局变量$table，方便应用
  $("#table_Report").bootstrapTable('destroy');
  $('#table_Report').bootstrapTable({
      url: '/surveyplatform/service/rest/sms/findNoticeUpperPage',    //请求后台的URL（*）
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
      queryParams : function (params) {
        //   console.log('排位命令（desc，asc）', params);
          params_Report = params;
          if(params.sort != undefined){
                params_Report = params;
            }else{
                params_Report.sort = 'noticeupperproportion';
                params_Report.order = 'desc';
            }
          $("#loadingS").show();
          //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
          var temp = { 
              comcode:comcode,          //组织机构的编号
              noticecode:noticecode,
              noticename:noticename,
              inserttime:inserttime,
              pageSize: params.limit,                        //显示的行数
              pageNumber: (params.offset / params.limit) + 1,   //页码
              sortfile: params.sort,        //排序列名  
              sort: params.order  //排位命令（desc，asc） 
          };
          return temp;
      },
      columns: [{
          checkbox: true,  
          visible: false     //是否显示复选框  
      }, {
          field: 'organcode',
          title: '机构编码',
          sortable: true
      }, {
          field: 'organname',
          title: '机构名称',
          sortable: true
      }, {
          field: 'inserttime',
          title: '时间'
      }, {
          field: 'personcode',
          title: '通知人工号',
          sortable: true
      }, {
          field: 'personname',
          title: '通知人姓名',
          sortable: true
      }, {
          field: 'telephone',
          title: '通知人电话',
          width:110,
          sortable: true
      }, {
          field: 'levels',
          title: '通知级别',
          formatter: function (value, row, index) {
            let valueNmae = ''
            if(value == 1){
                valueNmae = '总公司';
            }else if(value == 2){
                valueNmae = '省公司';
            }else if(value == 3){
                valueNmae = '市公司';
            }else if(value == 4){
                valueNmae = '县机构';
            }
                return '<span>'+ valueNmae +'</span>';
            }
            
      }, {
          field: 'overtime',
          title: '预警时效'
      }, {
          field: 'overcasenum',
          title: '现场总</br>案件数',
          sortable: true,
          width:100
      }, {
          field: 'noticeuppersum',
          title: '上报上</br>级数量',
          sortable: true,
          width:100
      }, {
          field: 'noticeupperproportion',
          title: '上报上级率',
          formatter: function (value, row, index) {
            let vlas = '-'
            if(value != null){
              vlas = value + '%';
            }
          return '<span>'+ vlas +'</span>';
      },
          sortable: true
      }],
      onLoadSuccess: function (data) {
        console.log(data);
        Report_length = data.rows.length;
      },
      onLoadError: function () {
  
      }
  });

    ////////////3333333
    $.ajax({
        url:'/surveyplatform/service/rest/sms/findNoticeUpper',
        data:{
            'comcode':comcode,          //组织机构的编号
            'noticecode':noticecode,
            'noticename':noticename,
            'inserttime':inserttime
        },
        type:'get',
        dataType:'json',
        success:function(data){
            let noticeupperproportionArr = []
            let comcnameArr = []
            if(data.status == 1){          
                if(data.rows.length > 0){
                    for(let i = 0; data.rows.length > i ; i++){
                        noticeupperproportionArr.push(data.rows[i].noticeupperproportion);
                        comcnameArr.push(data.rows[i].organname)
                    }
                }
                // console.log(noticeupperproportionArr,comcnameArr)
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echarts_three'));
            // 指定图表的配置项和数据
            var option = {
                color:['#5B9DFB'],
                title: {
                    text: '超时上报上级率日统计',
                    textStyle:{
                        color:'#ffffff'
                    }
                },
                tooltip: {
                          //此为提示配置项
                          trigger: 'axis',
                          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                          },
                          formatter:'{b}<br />\
                              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#5B9DFB"></span>\
                              {a0}：{c0}%<br />'
                },
                grid: {
                    left: '1%',
                    right: '5%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    name: ReportLevel,
                    data: comcnameArr,
                    axisLabel: {
                        lineStyle:{
                            color:'#ffffff'
                        },
                        color:'#ffffff',
                        interval:0,
                        rotate:45//角度顺时针计算的
                    },
                    nameTextStyle:{
                        color:'#ffffff'
                    }
                },
                yAxis: {
                    type : 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} %',
                        color:'#ffffff'
                    },
                    show: true,
                    splitLine:{
                        show:false
                    }
                },
                series: [{
                    name: '案件超时率日统计',
                    type: 'bar',
                    barMaxWidth: '100',
                    data: noticeupperproportionArr
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            
        }
    });
}

//导出按钮 已通知短信列表
function downSmsLogs(){
    NotificationDS();
    if(Timepd == 0){
        var comcode = selectedNode.id; //组织机构编号
        var personname = $("#noticeName").val();                      //通知人姓名
        var personcode = $("#noticeWorknumber").val();          //通知人工号
         var Time1 = $("#timestart").val();                        //时间
		 var Time2 = $("#timeend").val();                        //时间
        if(rowslength == 0){
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("无数据信息，无法导出！");
            $('#myModal').modal('show');
        }else{
            window.open("/surveyplatform/rest/interfaceapi/PrpLisSmsLogsInfoService/downSmsLogs?comcode="+comcode+"&queryTimeStart="+Time1+"&queryTimeEnd="+Time2+"&personcode="+personcode+"&personname="+personname+"&sortOrder="+paramSK.order+"&sort="+paramSK.sort);
            operateRecordFun(10,2);    
        }
    }
    
}

//已通知案件列表 导出
function exportSmsList_case(){
    var comcode = selectedNode_case.id;                     //组织机构的编号
    var registno = $("#registno").val();                    //报案号
    var surveyorcode = $("#surveyorcode").val();            //查勘员工号
    var personcode = $("#personcode").val();                //通知人工号
    var surveyorname = $("#surveyorname").val();            //查勘员姓名
    var personname = $("#personname").val();                //通知人姓名
    var Levels = $("#levels option:selected").val();        //通知级别
    var Time1 = $("#startTime").val();                      //开始时间
    var Time2 = $("#endTime").val();                        //结束时间
    // params_case
    if(case_length == 0){
        document.getElementById("modalImgID").src = "lib/images/fail.png";  
        $(".modalSpan").text("无数据信息，无法导出！");
        $('#myModal').modal('show');
    }else{
        console.log('导出已通知案件列表')
        console.log("/surveyplatform/service/rest/sms/exportSmsList?codes="+comcode+"&registno="+registno+"&surveyorcode="+surveyorcode+"&surveyorname="+surveyorname+"&personcode="+personcode+"&personname="+personname+"&levels="+Levels+"&startTime="+Time1+"&endTime="+Time2);
        window.open("/surveyplatform/service/rest/sms/exportSmsList?codes="+comcode+"&registno="+registno+"&surveyorcode="+surveyorcode+"&surveyorname="+surveyorname+"&personcode="+personcode+"&personname="+personname+"&levels="+Levels+"&startTime="+Time1+"&endTime="+Time2);
        operateRecordFun(32,2);
    }

}

//2.7.导出案件超时率日统计报表
function exportOvertimeRate(){
    var comcode = selectedNode_CaseOvertime.id;              //组织机构的编号
    var noticecode = $("#noticecode").val();                //通知人工号
    var noticename = $("#noticename").val();                //通知人姓名
    var inserttime = $("#inserttime").val();                //开始时间
    if(comcode.length > 0){
        console.log('导出案件超时率日统计报表');
        // console.log(params_CaseOvertime)
        if(params_CaseOvertime.sort == undefined){
            params_CaseOvertime.sort = ''
        }
        if(CaseOvertime_length == 0){
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("无数据信息，无法导出！");
            $('#myModal').modal('show');
        }else{
            window.open("/surveyplatform/service/rest/sms/exportOvertimeRate?comcode="+comcode+"&noticecode="+noticecode+"&noticename="+noticename+"&inserttime="+inserttime+"&sortfile="+params_CaseOvertime.sort+"&sort="+params_CaseOvertime.order);
            operateRecordFun(33,2);
        }
        // console.log("/surveyplatform/service/rest/sms/exportOvertimeRate?comcode="+comcode+"&noticecode="+noticecode+"&noticename="+noticename+"&inserttime="+inserttime+"&sortfile="+params_CaseOvertime.sort+"&sort="+params_CaseOvertime.order);
       
    }

}

//超时时长占比统计 导出
function exportOverTimeProportionFun(){
    var comcode = selectedNode_Proportion.id;
    var noticecode = $("#noticecode_Proportion").val();                //通知人工号
    var noticename = $("#noticename_Proportion").val();                //通知人姓名
    var inserttime = $("#inserttime_Proportion").val();                //开始时间
    if(comcode.length > 0){
        console.log('导出案件超时率日统计报表');
        if(params_Proportion.sort == undefined){
            params_Proportion.sort = ''
        }
        if(Proportion_length == 0){
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("无数据信息，无法导出！");
            $('#myModal').modal('show');
        }else{
            window.open("/surveyplatform/service/rest/sms/exportOverTimeProportion?comcode="+comcode+"&noticecode="+noticecode+"&noticename="+noticename+"&inserttime="+inserttime+"&sortfile="+params_Proportion.sort+"&sort="+params_Proportion.order);
            operateRecordFun(34,2);
        }
        // console.log("/surveyplatform/service/rest/sms/exportOverTimeProportion?comcode="+comcode+"&noticecode="+noticecode+"&noticename="+noticename+"&inserttime="+inserttime+"&sortfile="+params_Proportion.sort+"&sort="+params_Proportion.order);
        
    }

}

//超时上报上级率日统计 导出
function exportNoticeUpperFun(){
    var comcode = selectedNode_Report.id;
    var noticecode = $("#noticecode_Report").val();                //通知人工号
    var noticename = $("#noticename_Report").val();                //通知人姓名
    var inserttime = $("#inserttime_Report").val();                //开始时间
    if(comcode.length > 0){
        console.log('导出案件超时率日统计报表');
        if(params_Report.sort == undefined){
            params_Report.sort = ''
        }
        if(Report_length == 0){
            document.getElementById("modalImgID").src = "lib/images/fail.png";  
            $(".modalSpan").text("无数据信息，无法导出！");
            $('#myModal').modal('show');
        }else{
            window.open("/surveyplatform/service/rest/sms/exportNoticeUpper?comcode="+comcode+"&noticecode="+noticecode+"&noticename="+noticename+"&inserttime="+inserttime+"&sortfile="+params_Report.sort+"&sort="+params_Report.order);
            operateRecordFun(35,2);
        }
        // console.log("/surveyplatform/service/rest/sms/exportNoticeUpper?comcode="+comcode+"&noticecode="+noticecode+"&noticename="+noticename+"&inserttime="+inserttime+"&sortfile="+params_Report.sort+"&sort="+params_Report.order);
       
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
        url: "/surveyplatform/service/rest/operateRecord",
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