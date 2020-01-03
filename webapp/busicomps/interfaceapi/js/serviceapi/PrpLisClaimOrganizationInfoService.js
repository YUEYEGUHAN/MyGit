var PrpLisClaimOrganizationInfoService={};
/*重定向页面
*PrpLisClaimOrganizationInfo列表
*/
PrpLisClaimOrganizationInfoService.prplisclaimorganizationinfoListPage='/interfaceapi/PrpLisClaimOrganizationInfoService/prplisclaimorganizationinfoListPage';
/*重定向页面
*PrpLisClaimOrganizationInfo表单
*/
PrpLisClaimOrganizationInfoService.prplisclaimorganizationinfoFormPage='/interfaceapi/PrpLisClaimOrganizationInfoService/prplisclaimorganizationinfoFormPage';

/*
*findPrpLisClaimOrganizationInfo
*/
PrpLisClaimOrganizationInfoService.findPrpLisClaimOrganizationInfo=function(comcode,callback){	
	var url="/rest/interfaceapi/PrpLisClaimOrganizationInfoService/findPrpLisClaimOrganizationInfo"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comcode=comcode;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisClaimOrganizationInfoService.findPrpLisClaimOrganizationInfo.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisClaimOrganizationInfoService/findPrpLisClaimOrganizationInfo";

