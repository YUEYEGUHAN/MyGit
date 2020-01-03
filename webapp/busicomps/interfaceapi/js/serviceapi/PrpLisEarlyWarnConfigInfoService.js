var PrpLisEarlyWarnConfigInfoService={};
/*重定向页面
*负责人预警配置表列表
*/
PrpLisEarlyWarnConfigInfoService.prplisearlywarnconfiginfoListPage='/interfaceapi/PrpLisEarlyWarnConfigInfoService/prplisearlywarnconfiginfoListPage';
/*重定向页面
*负责人预警配置表表单
*/
PrpLisEarlyWarnConfigInfoService.prplisearlywarnconfiginfoFormPage='/interfaceapi/PrpLisEarlyWarnConfigInfoService/prplisearlywarnconfiginfoFormPage';

/*
*addPrpLisEarlyWarnConfig
*/
PrpLisEarlyWarnConfigInfoService.addPrpLisEarlyWarnConfig=function(organcode,organname,personcode,personname,telephone,overtime,callback){	
	var url="/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/addPrpLisEarlyWarnConfig"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.organcode=organcode;
	data.organname=organname;
	data.personcode=personcode;
	data.personname=personname;
	data.telephone=telephone;
	data.overtime=overtime;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisEarlyWarnConfigInfoService.addPrpLisEarlyWarnConfig.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/addPrpLisEarlyWarnConfig";
/*
*findPrpLisEarlyWarnConfigPersonInfo
*/
PrpLisEarlyWarnConfigInfoService.findPrpLisEarlyWarnConfigPersonInfo=function(organcode,callback){	
	var url="/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/findPrpLisEarlyWarnConfigPersonInfo"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.organcode=organcode;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisEarlyWarnConfigInfoService.findPrpLisEarlyWarnConfigPersonInfo.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/findPrpLisEarlyWarnConfigPersonInfo";
/*
*findEarlyWarnConfig
*/
PrpLisEarlyWarnConfigInfoService.findEarlyWarnConfig=function(callback){	
	var url="/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/findEarlyWarnConfig"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisEarlyWarnConfigInfoService.findEarlyWarnConfig.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/findEarlyWarnConfig";

