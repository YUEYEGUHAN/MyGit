// var comcodeS = "00000000";
// var url="http://10.10.1.117:7003/surveyplatform/service/DispatchServlet"; //singweb 請求組織機構url
var url="/surveyplatform/service/DispatchServlet"; //singweb 請求組織機構url //
// var url="http://10.133.216.177:7003/surveyplatform/service/DispatchServlet";//server 請求組織機構url
$(function() {
	// var comcodeS = "32000000,33000000";
	/**
	 * 加载级联下拉框
	 */
	setOrgans(comcodeS);

	//初始化时间控件
	dateS();
	/**
	 * 省级下拉框选中事件
	 */
	$(".province").change(function(){
		var code = $(".province").val();
		if(code == "00000000"){
			setOrgans(code);
		}else{
			setOrgBychildren(code,'3');
		}
	});
	/**
	 * 市级下拉框选中事件
	 */
	$(".city").change(function(){
		var code = $(".city").val();
		if(code != ""){
			setOrgBychildren(code,'4');
		}else{
		    $(".comlevel").val("2");
			$(".county").empty();
			$(".county").append("<option value=''>全部</option>");
		}
	});
	/**
	 * 县级下拉框选中事件
	 */
	$(".county").change(function(){
		if($(".county").val() != ""){
			$(".comlevel").val("4");
		}else{
			$(".comlevel").val("3");
		}
	});
	
	/**
	 * 加载i8状态选项
	 */
	$.ajax({
		url : "/surveyplatform/rest/interfaceapi/PrplisieightstateService/findI8value",
		data : {id : ""},
		type : 'post',
		dataType : 'json',
		success : function(data) {
			var i8state = $(".i8state");
			i8state.empty();
			i8state.append("<option value=''>全部</option>");
			if(data != null && data.length>0){
				for(var i=0;i<data.length;i++){
					i8state.append("<option value='"+data[i].id+"'>"
							+ data[i].i8name+"</option>");
				}
			}
		}
	});
	
	
	/**
	 * 加载客户群
	 */
	$.ajax({
		url : "/surveyplatform/rest/interfaceapi/PrpLisCustomerTypeService/findCustomerType",
		data : {id : ""},
		type : 'post',
		dataType : 'json',
		async:false,
		success : function(data) {
			var customerType = $(".customerType");
			customerType.empty();
			customerType.append("<option value=''>全部</option>");
			if(data != null && data.length>0){
				for(var i=0;i<data.length;i++){
					customerType.append("<option value='"+data[i].id+"'>"
								+ data[i].customertype+"</option>");
				}
			}
		}
	});
	
	/**
	 * 加载通赔类型
	 */
	$(".lflag").change(function(){
		var value = $(".lflag").val();
		var lflagType = $(".lflagType");
		lflagType.empty();
		if(value ==""){
			lflagType.append("<option value=''>全部</option>");
		}
		else if(value == "S" || value == "T"){
			lflagType.append("<option value='1'>本代外</option>");
			lflagType.append("<option value='2'>外代本</option>");
		}else if(value == "L"){
			lflagType.append("<option value=''>自赔不选</option>");
		}

	});
	/**
	 * 如果选择i8state 为1 2 3 则清空立案时间，并做不可选择
	 */
	$(".i8state").change(function(){
		var value = $(".i8state").val();
		var i8state = $(".i8state");
		if(value == 1 || value ==3){
			$("#datepicker3").attr("disabled", true);
			$("#datepicker4").attr("disabled", true);
			 $("#datepicker3").css("background-color","gray");
			 $("#datepicker4").css("background-color","gray");
		}else{
			$("#datepicker3").attr("disabled", false);
			$("#datepicker4").attr("disabled", false);	
			$("#datepicker3").css("background-color","");
			$("#datepicker4").css("background-color","");
	}

});
	
	

	initTable();
});
//初始化时间控件
function dateS(){
    var date = new Date();//将当前的日期转换成系统格式的日期
    var preDate = new Date(date.getTime() - 24*60*60*1000); //前一天
	 
	$("#datepicker1").datepicker({
		language: "zh-CN",
		weekStart: 1,           // 起始周
		autoclose: true,
		format: "yyyy/mm/dd",
		endDate: new Date(), //设置结束时间 
		clearBtn: true
	}).on('changeDate', function () {
        // <---------时间控件触发的事件写这里 ------------>
    });
	
	$("#datepicker3").datepicker({
		language: "zh-CN",
		weekStart: 1,           // 起始周
		autoclose: true,
		format: "yyyy/mm/dd",
		endDate: new Date(), //设置结束时间 
		clearBtn: true
	}).on('changeDate', function () {
        // <---------时间控件触发的事件写这里 ------------>
    });
	$("#datepicker5").datepicker({
		language: "zh-CN",
		weekStart: 1,           // 起始周
		autoclose: true,
		format: "yyyy/mm/dd",
		endDate: new Date(), //设置结束时间 
		clearBtn: true
	});
	//默认前天时间
	$('#datepicker1').datepicker('setDate', preDate);
	$('#datepicker3').datepicker('setDate', preDate);
	$('#datepicker5').datepicker('setDate', preDate);

	$("#datepicker2").datepicker({
		language: "zh-CN",
		weekStart: 1,           // 起始周
		autoclose: true,
		format: "yyyy/mm/dd",
		// endDate: new Date(), //设置结束时间
		clearBtn: true
	}).on('changeDate', function () {
		// <---------时间控件触发的事件写这里 ------------>
		let ddds = $('#datepicker2').val();
		$('#datepicker1').datepicker('setEndDate', ddds);
		let kaishi = $('#datepicker1').val();
		let oDate1 = new Date(kaishi);
		let oDate2 = new Date(ddds);
		if(oDate1.getTime() > oDate2.getTime()){
			alert("出险起止日期 开始时间不能大于结束时间！");
			$('#datepicker1').val(ddds);
		}
    });
	$("#datepicker4").datepicker({
		language: "zh-CN",
		weekStart: 1,           // 起始周
		autoclose: true,
		format: "yyyy/mm/dd",
		// endDate: new Date(), //设置结束时间 
		clearBtn: true
	}).on('changeDate', function () {
		// <---------时间控件触发的事件写这里 ------------>
		let ddds = $('#datepicker4').val();
		$('#datepicker3').datepicker('setEndDate', ddds);
		let kaishi = $('#datepicker3').val();
		let oDate1 = new Date(kaishi);
		let oDate2 = new Date(ddds);
		if(oDate1.getTime() > oDate2.getTime()){
			alert("立案起止日期 开始时间不能大于结束时间！");
			$('#datepicker3').val(ddds);
		}
	});
	//
	$("#datepicker6").datepicker({
		language: "zh-CN",
		weekStart: 1,           // 起始周
		autoclose: true,
		format: "yyyy/mm/dd",
		// endDate: new Date(), //设置结束时间 
		clearBtn: true
	}).on('changeDate', function () {
		// <---------时间控件触发的事件写这里 ------------>
		let ddds = $('#datepicker6').val();
		$('#datepicker5').datepicker('setEndDate', ddds);
		let kaishi = $('#datepicker5').val();
		let oDate1 = new Date(kaishi);
		let oDate2 = new Date(ddds);
		if(oDate1.getTime() > oDate2.getTime()){
			alert("报案起止日期 开始时间不能大于结束时间！");
			$('#datepicker5').val(ddds);
		}
    });
	
	//默认当前时间 控件默认传值
	$('#datepicker2').datepicker('setDate', new Date());
	$('#datepicker4').datepicker('setDate', new Date());
	$('#datepicker6').datepicker('setDate', new Date());
	//控件限制时间
	$('#datepicker2').datepicker('setEndDate', new Date());
	$('#datepicker4').datepicker('setEndDate', new Date());
	$('#datepicker6').datepicker('setEndDate', new Date());
};

// 省级的
function setOrgans(comcode){
	$.ajax({
		url:url,
		type:"get",
		data : {
			"requestType" : "R0020",
			"queryType" : "myself",
			"comcode" : comcode
		},
		
		dataType:"json",
		async:false,
		success:function(data){
			if(data != null){
				$(".province").empty();
				$(".city").empty();
				$(".county").empty();
				var organ = data.result;
				let level = organ[0].comlevel;
				let comcodeO =  organ[0].comcode;
				let ppdd = 0;
				if(organ.length > 1){

					level = organ[0].comlevel;
					comcodeO = organ[0].comcode;
					ppdd = 1;
					// console.log(organ[0].comcode,22222);
				}
				$(".comlevel").val(level);
				if(level == '1'){
					if(ppdd == 1){
						for(var i=0;i<organ.length;i++){
							$(".province").append("<option value='"+organ[i].comcode+"'>"+organ[i].comname+"</option>");
						}
					}else{
						$(".province").append("<option value='"+organ[0].comcode+"'>"+organ[0].comname+"</option>");
					}					
					$(".city").append("<option value=''>全部</option>");
					$(".county").append("<option value=''>全部</option>");
					setOrgBychildren(comcodeO,'2');
				}else if(level == '2'){
					if(ppdd == 1){
						for(var i=0;i<organ.length;i++){
							$(".province").append("<option value='"+organ[i].comcode+"'>"+organ[i].comname+"</option>");
						}
					}else{
						$(".province").append("<option value='"+organ[0].comcode+"'>"+organ[0].comname+"</option>");
					}
					// $(".province").append("<option value='"+organ.comcode+"'>"+organ.comname+"</option>");
					$(".city").append("<option value=''>全部</option>");
					$(".county").append("<option value=''>全部</option>");
					setOrgBychildren(comcodeO,'3');
				}else if(level == '3'){
					if(ppdd == 1){
						for(var i=0;i<organ.length;i++){
							$(".city").append("<option value='"+organ[i].comcode+"'>"+organ[i].comname+"</option>");
						}
					}else{
						$(".city").append("<option value='"+organ[0].comcode+"'>"+organ[0].comname+"</option>");
					}
					// $(".city").append("<option value='"+organ.comcode+"'>"+organ.comname+"</option>");
					$(".county").append("<option value=''>全部</option>");
					setOrgByParent(comcodeO,'2');
					setOrgBychildren(comcodeO,'4');
				}else if(level == '4'){
					if(ppdd == 1){
						for(var i=0;i<organ.length;i++){
							$(".county").append("<option value='"+organ[i].comcode+"'>"+organ[i].comname+"</option>");
						}
					}else{
						$(".county").append("<option value='"+organ[0].comcode+"'>"+organ[0].comname+"</option>");
					}
					// $(".county").append("<option value='"+organ.comcode+"'>"+organ.comname+"</option>");
					setOrgByParent(comcodeO,'3');
				}
			}else{
				alert("未查询到机构详情");
			}
		}
	});
}
// 市级的
function setOrgBychildren(comcode,level){
	$.ajax({
		url:url,
		data : {
			"requestType" : "R0020",
			"comlevel" : level,
			"comcode" : comcode
		},
		type:"get",
		dataType:"json",
		success:function(data){
			$(".comlevel").val(level-1);
			if(data.status == 1){
				if(level == '2'){
					var organs = data.result;
					for(var i=0;i<organs.length;i++){
						$(".province").append("<option value='"+organs[i].comcode+"'>"+organs[i].comname+"</option>");
					}
				}else if(level == '3'){
					var organs = data.result;
					$(".city").empty();
					$(".city").append("<option value=''>全部</option>");
					for(var i=0;i<organs.length;i++){
						$(".city").append("<option value='"+organs[i].comcode+"'>"+organs[i].comname+"</option>");
					}
				}else if(level == '4'){
					var organs = data.result;
					$(".county").empty();
					$(".county").append("<option value=''>全部</option>");
					for(var i=0;i<organs.length;i++){
						$(".county").append("<option value='"+organs[i].comcode+"'>"+organs[i].comname+"</option>");
					}
				}
			}else{
				// alert("未查询到机构详情");
				console.log("未查询到下级机构");
			}
		}
	});
}

// 县级的
function setOrgByParent(comcode,level){
	$.ajax({
		url:url,
		data : {
			"requestType" : "R0020",
			"queryType" : "parent",
			"comcode" : comcode
		},
		type:"get",
		dataType:"json",
		success:function(data){
			if(data.status == 1){
				var organ = data.result;
				if(level == '2'){
					$(".province").append("<option value='"+organ.comcode+"'>"+organ.comname+"</option>");
				}else if(level == '3'){
					$(".city").append("<option value='"+organ.comcode+"'>"+organ.comname+"</option>");
					setOrgByParent(organ.comcode,'2')
				}
			}else{
				// alert("未查询到机构详情");
				console.log("未查询到下级机构");
			}
		}
	});
}

//返回卡片页面
function ReturnUpperLevel(){
	//获取 URL 的主机部分
    var host = window.location.host;
    //跳转卡片页面
    window.location.href = 'http://'+host+'/PICCCSOPlatform/manage/Potal.html';
}

function AusercodeFun(){
	//获取登录人的username
	var usercode = sessionStorage.getItem("usercode");
	window.open("http://10.133.217.37:9001/piccClaim/login/loginDownLoad?usercode="+usercode);
}
