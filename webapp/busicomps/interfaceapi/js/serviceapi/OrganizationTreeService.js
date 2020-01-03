var OrganizationTreeService={};
/*重定向页面
*OrganizationTree列表
*/
OrganizationTreeService.organizationtreeListPage='/interfaceapi/OrganizationTreeService/organizationtreeListPage';
/*重定向页面
*OrganizationTree表单
*/
OrganizationTreeService.organizationtreeFormPage='/interfaceapi/OrganizationTreeService/organizationtreeFormPage';

/*
*findOrgListByParam
*/
OrganizationTreeService.findOrgListByParam=function(comcode,callback){	
	var url="/rest/interfaceapi/OrganizationTreeService/findOrgListByParam"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comcode=comcode;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
OrganizationTreeService.findOrgListByParam.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/OrganizationTreeService/findOrgListByParam";

