var PrpLisSendClaimLogsService={};
/*重定向页面
*发送案件日志表列表
*/
PrpLisSendClaimLogsService.prplissendclaimlogsListPage='/interfaceapi/PrpLisSendClaimLogsService/prplissendclaimlogsListPage';
/*重定向页面
*发送案件日志表表单
*/
PrpLisSendClaimLogsService.prplissendclaimlogsFormPage='/interfaceapi/PrpLisSendClaimLogsService/prplissendclaimlogsFormPage';

/*
*findSendClaimLogsByParam
*/
PrpLisSendClaimLogsService.findSendClaimLogsByParam=function(registno,callback){	
	var url="/rest/interfaceapi/PrpLisSendClaimLogsService/findSendClaimLogsByParam"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.registno=registno;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSendClaimLogsService.findSendClaimLogsByParam.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSendClaimLogsService/findSendClaimLogsByParam";
/*
*updateSendClaimLogsByParam
*/
PrpLisSendClaimLogsService.updateSendClaimLogsByParam=function(registno,codes,callback){	
	var url="/rest/interfaceapi/PrpLisSendClaimLogsService/updateSendClaimLogsByParam"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.registno=registno;
	data.codes=codes;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSendClaimLogsService.updateSendClaimLogsByParam.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSendClaimLogsService/updateSendClaimLogsByParam";
/*
*saveSendClaimLogsByParam
*/
PrpLisSendClaimLogsService.saveSendClaimLogsByParam=function(levels,callback){	
	var url="/rest/interfaceapi/PrpLisSendClaimLogsService/saveSendClaimLogsByParam"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.levels=levels;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSendClaimLogsService.saveSendClaimLogsByParam.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSendClaimLogsService/saveSendClaimLogsByParam";

