var PrpLisSurveyorsService={};
/*重定向页面
*查勘员表列表
*/
PrpLisSurveyorsService.prplissurveyorsListPage='/interfaceapi/PrpLisSurveyorsService/prplissurveyorsListPage';
/*重定向页面
*查勘员表表单
*/
PrpLisSurveyorsService.prplissurveyorsFormPage='/interfaceapi/PrpLisSurveyorsService/prplissurveyorsFormPage';

/*
*findSurveyorByParam
*/
PrpLisSurveyorsService.findSurveyorByParam=function(comCode,level,callback){	
	var url="/rest/interfaceapi/PrpLisSurveyorsService/findSurveyorByParam"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comCode=comCode;
	data.level=level;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSurveyorsService.findSurveyorByParam.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSurveyorsService/findSurveyorByParam";
/*
*findTimeOutClaimsByParam
*/
PrpLisSurveyorsService.findTimeOutClaimsByParam=function(userCode,time,callback){	
	var url="/rest/interfaceapi/PrpLisSurveyorsService/findTimeOutClaimsByParam"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.userCode=userCode;
	data.time=time;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSurveyorsService.findTimeOutClaimsByParam.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSurveyorsService/findTimeOutClaimsByParam";

