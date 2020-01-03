var PrpLisEarlyWarnConfigService={};
/*重定向页面
*负责人预警配置表列表
*/
PrpLisEarlyWarnConfigService.prplisearlywarnconfigListPage='/interfaceapi/PrpLisEarlyWarnConfigService/prplisearlywarnconfigListPage';
/*重定向页面
*负责人预警配置表表单
*/
PrpLisEarlyWarnConfigService.prplisearlywarnconfigFormPage='/interfaceapi/PrpLisEarlyWarnConfigService/prplisearlywarnconfigFormPage';

/*
*addPrpLisEarlyWarnConfig
*/
PrpLisEarlyWarnConfigService.addPrpLisEarlyWarnConfig=function(organcode,personcode,personname,telephone,overtime,callback){	
	var url="/rest/interfaceapi/PrpLisEarlyWarnConfigService/addPrpLisEarlyWarnConfig"; 
	var data=new Object();
	var httpMethod='post';
	data.format='json';
	data.organcode=organcode;
	data.personcode=personcode;
	data.personname=personname;
	data.telephone=telephone;
	data.overtime=overtime;
	BOMF.server.post(url,data,null,callback);
}	 	
PrpLisEarlyWarnConfigService.addPrpLisEarlyWarnConfig.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisEarlyWarnConfigService/addPrpLisEarlyWarnConfig";
/*
*findEarlyWarnConfig
*/
PrpLisEarlyWarnConfigService.findEarlyWarnConfig=function(callback){	
	var url="/rest/interfaceapi/PrpLisEarlyWarnConfigService/findEarlyWarnConfig"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisEarlyWarnConfigService.findEarlyWarnConfig.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisEarlyWarnConfigService/findEarlyWarnConfig";

