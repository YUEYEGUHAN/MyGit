var PrpLisSurveyPhotoService={};
/*重定向页面
*PrpLisSurveyPhoto列表
*/
PrpLisSurveyPhotoService.prplissurveyphotoListPage='/interfaceapi/PrpLisSurveyPhotoService/prplissurveyphotoListPage';
/*重定向页面
*PrpLisSurveyPhoto表单
*/
PrpLisSurveyPhotoService.prplissurveyphotoFormPage='/interfaceapi/PrpLisSurveyPhotoService/prplissurveyphotoFormPage';

/*
*modifySurveyPhtotoInfo
*/
PrpLisSurveyPhotoService.modifySurveyPhtotoInfo=function(callback){	
	var url="/rest/interfaceapi/PrpLisSurveyPhotoService/modifySurveyPhtotoInfo"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSurveyPhotoService.modifySurveyPhtotoInfo.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSurveyPhotoService/modifySurveyPhtotoInfo";

