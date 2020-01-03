var PrpLisDispatchSurveyLogService={};

/*
*test
*/
PrpLisDispatchSurveyLogService.queryOvertimeSurvey=function(comCode,callback){	
	var url="/rest/interfaceapi/PrpLisDispatchSurveyLogService/queryOvertimeSurvey"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comCode=comCode;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisDispatchSurveyLogService.queryOvertimeSurvey.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisDispatchSurveyLogService/queryOvertimeSurvey";
/*
*sendSMS
*/
PrpLisDispatchSurveyLogService.sendSMS=function(callback){	
	var url="/rest/interfaceapi/PrpLisDispatchSurveyLogService/sendSMS"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisDispatchSurveyLogService.sendSMS.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisDispatchSurveyLogService/sendSMS";

