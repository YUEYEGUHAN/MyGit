//获取登录人的comcode
var comcodeS = sessionStorage.getItem("cOMCODE");
var rows=10;
window.onload=function (ev) {
    // initECharts('chart1','未决存量指数');
    // initECharts('chart2','万元以下赔案理赔周期');
    // initECharts('chart3','强制立案率');
    // initECharts('chart4','未决存量指数');
    // initECharts('chart5','万元以下赔案理赔周期');
    // initECharts('chart6','强制立案率');
    //     $("#datepicker1").datepicker({
    //         language: "zh-CN",
    //         weekStart: 1,           // 起始周
    //         autoclose: true,
    //         format: "yyyy/mm/dd",
    //         clearBtn: true
    //     });
    //     $("#datepicker2").datepicker({
    //         language: "zh-CN",
    //         weekStart: 1,           // 起始周
    //         autoclose: true,
    //        format: "yyyy/mm/dd",
    //        clearBtn: true
    //     });
    //     $("#datepicker3").datepicker({
    //         language: "zh-CN",
    //         weekStart: 1,           // 起始周
    //         autoclose: true,
    //        format: "yyyy/mm/dd",
    //        clearBtn: true
    //     });
    //     $("#datepicker4").datepicker({
    //         language: "zh-CN",
    //         weekStart: 1,           // 起始周
    //         autoclose: true,
    //         format: "yyyy/mm/dd",
    //         clearBtn: true
    //     });
    //      $("#datepicker5").datepicker({
    //         language: "zh-CN",
    //         weekStart: 1,           // 起始周
    //         autoclose: true,
    //         format: "yyyy/mm/dd",
    //         clearBtn: true
    //     });
    // 	 $("#datepicker6").datepicker({
    //         language: "zh-CN",
    //         weekStart: 1,           // 起始周
    //         autoclose: true,
    //         format: "yyyy/mm/dd",
    //         clearBtn: true
    //     });

};

//加载echarts图标
// function initECharts(id,title) {
//     var chart1 = echarts.init(document.getElementById(id));
//     var option = {
//         title: {
//             text: title,
//             x:-5,
//             y:0,
//             textStyle : {
//                 fontSize : 12 ,
//                 fontWeight:200,
//                 color:'#4FD7DC'
//             }
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: "{b}: {c} ({d}%)",
//             position: ['10%', '0%']
//         },
//         color:['#008A9C', '#8FDBDD'],
//         series: [
//             {
//                 name:'访问来源',
//                 type:'pie',
//                 center : ['35%', '65%'],
//                 radius: ['40%', '55%'],
//                 label:{            //饼图图形上的文本标签
//                     normal:{
//                         show:false,
//                         textStyle : {
//                             fontWeight : 200 ,
//                             fontSize : 12 ,
//                             color:'#fff'
//                         },
//                         formatter:'{d}%'
//                     }
//                 },
//                 labelLine: {
//                     normal: {
//                         smooth: 0.2,
//                         length: 10,
//                         length2: 0
//                     }
//                 },
//                 data:[
//                     {value:123, name:'直接访问'},
//                     {value:310, name:'邮件营销'}
//                 ]
//             }, {
//                 name:'访问来源',
//                 type:'pie',
//                 center : ['85%', '65%'],
//                 radius: ['40%', '55%'],
//                 label:{            //饼图图形上的文本标签
//                     normal:{
//                         show:false,
//                         textStyle : {
//                             fontWeight : 200 ,
//                             fontSize : 12 ,
//                             color:'#fff'
//                         },
//                         formatter:'{d}%'
//                     }
//                 },
//                 labelLine: {
//                     normal: {
//                         smooth: 0.2,
//                         length: 5,
//                         length2: 0
//                     }
//                 },
//                 data:[
//                     {value:335, name:'直接访问'},
//                     {value:110, name:'邮件营销'}

//                 ]
//             }
//         ]
//     };
//     chart1.setOption(option);
// }
//展示流程图的方法
function showReportLCT(comcode,registno){
//console.log(comcode,registno);
$.ajax({
		url:'/surveyplatform/service/DispatchServlet?requestType=T0000023&comcode='+comcode,
		type:"get",
		dataType:"json",
		success:function(data){
			if(data != null){
				//console.log(data.result[0].configvalue);
				window.open(data.result[0].configvalue+"?registNo="+registno+"&identify=jzbaadmin","流程图","height=500,width=950,top=100,left=200,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=yes, status=yes");
			}else{
				alert("未查询到机构详情");
			}
		}

});
}
function initTable() {

    var usercode = $(".usercode").val();
    var orderBy = $(".orderBy").val();
    var registno = $(".registno").val();
    if(usercode == ""&& registno ==""){
        var comcode = ($(".county").val() != ""?$(".county").val() : ($(".city").val() != ""?$(".city").val() : $(".province").val()));
        if (comcode == null || comcode == ""){ comcode = comcodeS; }
        var lflag = $(".lflag").val(); 				//通赔类型1
        var lflagType = $(".lflagType").val();		//通赔类型2
        var datepicker1 = $("#datepicker1").val(); 	//时间控件1
        var datepicker2 = $("#datepicker2").val();	//时间控件2
        var datepicker3 = $("#datepicker3").val();	//时间控件3
        var datepicker4 = $("#datepicker4").val();	//时间控件4
        var datepicker5 = $("#datepicker5").val();	//时间控件4
        var datepicker6 = $("#datepicker6").val();	//时间控件4
        var i8Value = $(".i8state").val();			//案件状态
        var personTraceFlag = $(".personTraceFlag").val(); //是否涉及人伤
        var customerType = $(".customerType").val();	//客户群分类
        var operator = $(".operator").val(); 		//估损金额  符号
        var money = $(".money").val();				//估损金额 钱数
        var comlevel = $(".comlevel").val();
        if(i8Value == 1 ||i8Value ==3){
        	datepicker3="";
        	datepicker4="";
        }
    }



    //记录页面bootstrap-table全局变量$table，方便应用
    $("#table").bootstrapTable('destroy');
    $("#table").bootstrapTable({ // 对应table标签的id
        sortName: 'id', // 要排序的字段
        sortOrder: 'desc', // 排序规则
        url: '/surveyplatform/rest/interfaceapi/PrpLoutstandingCaseService/findCaseIEightstatu',    //请求后台的URL（*）
        // url:'data1.json',
        method: 'GET',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        pageSize: rows,                     //每页的记录行数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageList: [10, 20, 50 , 100],        //可供选择的每页的行数（*）
        minimumCountColumns: 2,             //最少允许的列数
//         smartDisplay:false,
        //得到查询的参数
        queryParams : function (params) {
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                comcode:comcode,
                lflag:lflag,
                lflagType:lflagType,
                damageStartDate:datepicker1,
                damageEndDate:datepicker2,
                claimStartDate:datepicker3,
                claimEndDate:datepicker4,
                i8Value:i8Value,
                personTraceFlag:personTraceFlag,
                customerType:customerType,
                operator:operator,
                money:money,
                comlevel:comlevel,
                usercode:usercode,
                orderBy:orderBy,
                rows: params.limit,                        //显示的行数
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,        //排序列名
                sortOrder: params.order,  //排位命令（desc，asc）
                reportStartDate:datepicker5,
                reportEndDate:datepicker6,
                registno:registno
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: false     //是否显示复选框
        },{
            field: 'registno', // 返回json数据中的name
            title: '报案号', // 表格表头显示文字
            align: 'center', // 左右居中
            valign: 'middle', // 上下居中
            // width:'80px',
            formatter: function (value, row, index) {
                return '<span class="contentSpan" title="'+value+'" onclick="showReportLCT(\''+row.makecom+'\',\''+row.registno+'\')">'+ value +'</span>';
            }
        }, {
            field: 'claimno',
            title: '立案号',
            align: 'center',
            valign: 'middle',
            // width:'80px',
            formatter: function (value, row, index) {
            if(value == null){
                        value = "-";
                    }
                return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
            }
        }, {
            field: 'sumclaim',
            title: '估损金额',
            align: 'center', 
            valign: 'middle'
        },{
            field: 'zltime',
            title: '滞留时间',
            align: 'center', 
            valign: 'middle'
        },
        	{
            field: 'damagedate',
            title: '出险时间',
            align: 'center', 
            valign: 'middle'
        },
            {
                field: 'comcname',
                title: '承保地',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                if(value == null){
                        value = "-";
                    }
                    return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
                }
            }, {
                field: 'comcnameM',
                title: '出险地',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                if(value == null){
                        value = "-";
                    }
                    return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
                }
            }, {
                field: 'nodecname',
                title: '滞留环节',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                if(value == null){
                        value = "-";
                    }
                    return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
                }
            }, {
                field: 'usercode',
                title: '工号',
                align: 'center',
                valign: 'middle',
                // width:'70px',
                formatter: function (value, row, index) {
                    if(value == null){
                        value = "-";
                    }
                    return '<span class="contentSpan" title="'+value+'" >'+ value +'</span>';
                }
            }, {
                field: 'context',
                title: '滞留环节留言',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                if(value == null){
                        value = "-";
                    }
                    return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
                }
            }, {
                field: 'username',//phonenumber手机号
                title: '滞留人员和手机号',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if(value == null){
                        value = "-";
                    }
                    if(row.phonenumber == null){
                        row.phonenumber = "-";
                    }
                    return '<span>'+ value +'</span></br><span class="contentSpan">'+ row.phonenumber +'</span>';
                }
            },
            {
                field: 'usernameT',
                title: '通赔岗人员和手机号',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if(value == null){
                        value = "-";
                    }
                    if(row.phonenumberT == null){
                        row.phonenumberT = "-";
                    }
                    return '<span>'+ value +'</span></br><span class="contentSpan">'+ row.phonenumberT +'</span>';
                }
            },
            {
                field: 'reportorname',//reportornumber 手机号
                title: '报案人和手机号',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if(value == null){
                        value = "-";
                    }
                    if(row.reportornumber == null){
                        row.reportornumber = "-";
                    }
                    return '<span>'+ value +'</span></br><span class="contentSpan">'+ row.reportornumber +'</span>';
                }
            }, {
                field: 'thirdcarlinker',//thirdcarlinker thirdcarlinkernumber
                title: '三者车联系人和手机号',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if(value == null){
                        value = "-";
                    }
                    return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
                }
            },{
                field: 'i8name',
                title: '案件状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
                }
            }, {
                field: 'i8causation',
                title: 'I8案件状态数值',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return '<span class="contentSpan" title="'+value+'">'+ value +'</span>';
                }
            }
        ],
        onLoadSuccess: function(){  //加载成功时执行
            console.info("加载成功");
//            alert(1);
        },
        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
//            alert(2);
        }

    });

}
$('#registnoBtn').click(function(){
	$(".usercode").val("");
    initTable();
});
$('#DetainedBtn').click(function(){
	$(".registno").val("");
    initTable();
});
$('.queryBty').click(function(){
   // $(".usercode").val("");
   // $(".registno").val("");
    initTable();
});
$('.excportBty').click(function(){
    // let comcode = ($(".county").val() != ""?$(".county").val() : ($(".city").val() != ""?$(".city").val() : $(".province").val()));
  //   if(comcode == '00000000'){
   //      return
   //  }
    var value=exportParam();
    window.open("/surveyplatform/rest/interfaceapi/PrpLoutstandingCaseService/exportCaseIEightstatu"+"?"+value);
    operateRecordFun(11,2);
});

$('.registno').focus(function(){ 
	$('.closes').show();
});  
$('.registno').blur(function(){  
    if($(this).val()=='')  
    {  
        $('.closes').hide();
    }  
}); 
$('.closes').click(function(){
    $(".registno").val("");
    $(this).hide();
})

$('.usercode').focus(function(){  
    $('.closes1').show();
});  
$('.usercode').blur(function(){  
    if($(this).val()=='')  
    {  
        $('.closes1').hide();
    }  
}); 
$('.closes1').click(function(){
    $(".usercode").val("");
    $(this).hide();
})

function exportParam(){
    var usercode=$(".usercode").val();
    var orderBy = $(".orderBy").val();
    var registno = $(".registno").val();
    if(usercode != "" && usercode != null && usercode != "" && registno != null){
        return "orderBy="+orderBy+"&usercode="+usercode+"&registno="+registno;
    }
    if(usercode != "" && usercode != null){
        return "orderBy="+orderBy+"&usercode="+usercode;
    }
    if(registno != "" && registno != null){
        return "orderBy="+orderBy+"&registno="+registno;
    }
    var comcode = ($(".county").val() != ""?$(".county").val() : ($(".city").val() != ""?$(".city").val() : $(".province").val()));
    var lflag = $(".lflag").val(); 				//通赔类型1
    var lflagType = $(".lflagType").val();		//通赔类型2
    var damageStartDate = $("#datepicker1").val(); 	//时间控件1
    var damageEndDate = $("#datepicker2").val();	//时间控件2
    var claimStartDate = $("#datepicker3").val();	//时间控件3
    var claimEndDate = $("#datepicker4").val();	//时间控件4
    var reportStartDate = $("#datepicker5").val();	//时间控件5
    var reportEndDate = $("#datepicker6").val();	//时间控件6
    var i8Value = $(".i8state").val();			//案件状态
    var personTraceFlag = $(".personTraceFlag").val(); //是否涉及人伤
    var customerType = $(".customerType").val();	//客户群分类
    var operator = $(".operator").val(); 		//估损金额  符号
    var money = $(".money").val();				//估损金额 钱数
    var comlevel = $(".comlevel").val();
    return "orderBy="+orderBy+"&comcode="+comcode+"&lflag="+lflag+"&lflagType="+lflagType+"&damageStartDate="+damageStartDate
        +"&damageEndDate="+damageEndDate+"&claimStartDate="+claimStartDate+"&claimEndDate="+claimEndDate
        +"&i8Value="+i8Value+"&personTraceFlag="+personTraceFlag+"&customerType="+customerType
        +"&operator="+operator+"&money="+money+"&comlevel="+comlevel+"&reportStartDate="+reportStartDate+"&reportEndDate="+reportEndDate;
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