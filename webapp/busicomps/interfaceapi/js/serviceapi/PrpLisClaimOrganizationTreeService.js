var PrpLisClaimOrganizationTreeService={};
/*重定向页面
*PrpLisClaimOrganizationTree列表
*/
PrpLisClaimOrganizationTreeService.prplisclaimorganizationtreeListPage='/interfaceapi/PrpLisClaimOrganizationTreeService/prplisclaimorganizationtreeListPage';
/*重定向页面
*PrpLisClaimOrganizationTree表单
*/
PrpLisClaimOrganizationTreeService.prplisclaimorganizationtreeFormPage='/interfaceapi/PrpLisClaimOrganizationTreeService/prplisclaimorganizationtreeFormPage';

/*
*findPrpLisClaimOrganizationTree
*/
PrpLisClaimOrganizationTreeService.findPrpLisClaimOrganizationTree=function(comcode,callback){	
	var url="/rest/interfaceapi/PrpLisClaimOrganizationTreeService/findPrpLisClaimOrganizationTree"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comcode=comcode;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisClaimOrganizationTreeService.findPrpLisClaimOrganizationTree.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisClaimOrganizationTreeService/findPrpLisClaimOrganizationTree";

