var PrpLisFindPhotoService={};
/*重定向页面
*PrpLisFindPhoto列表
*/
PrpLisFindPhotoService.prplisfindphotoListPage='/interfaceapi/PrpLisFindPhotoService/prplisfindphotoListPage';
/*重定向页面
*PrpLisFindPhoto表单
*/
PrpLisFindPhotoService.prplisfindphotoFormPage='/interfaceapi/PrpLisFindPhotoService/prplisfindphotoFormPage';

/*
*fingSurveyPhoto
*/
PrpLisFindPhotoService.fingSurveyPhoto=function(psncode,callback){	
	var url="/rest/interfaceapi/PrpLisFindPhotoService/fingSurveyPhoto"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.psncode=psncode;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisFindPhotoService.fingSurveyPhoto.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisFindPhotoService/fingSurveyPhoto";

