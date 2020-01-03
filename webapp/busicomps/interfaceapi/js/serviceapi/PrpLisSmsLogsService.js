var PrpLisSmsLogsService={};
/*重定向页面
*发送短信记录表列表
*/
PrpLisSmsLogsService.prplissmslogsListPage='/interfaceapi/PrpLisSmsLogsService/prplissmslogsListPage';
/*重定向页面
*发送短信记录表表单
*/
PrpLisSmsLogsService.prplissmslogsFormPage='/interfaceapi/PrpLisSmsLogsService/prplissmslogsFormPage';

/*
*findPrpLisSmsLogs
*/
PrpLisSmsLogsService.findPrpLisSmsLogs=function(comcode,personname,personcode,levels,callback){	
	var url="/rest/interfaceapi/PrpLisSmsLogsService/findPrpLisSmsLogs"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comcode=comcode;
	data.personname=personname;
	data.personcode=personcode;
	data.levels=levels;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSmsLogsService.findPrpLisSmsLogs.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSmsLogsService/findPrpLisSmsLogs";
/*
*saveSmsLogs
*/
PrpLisSmsLogsService.saveSmsLogs=function(comcode,comname,personcode,personname,telephon,content,levels,callback){	
	var url="/rest/interfaceapi/PrpLisSmsLogsService/saveSmsLogs"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comcode=comcode;
	data.comname=comname;
	data.personcode=personcode;
	data.personname=personname;
	data.telephon=telephon;
	data.content=content;
	data.levels=levels;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSmsLogsService.saveSmsLogs.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSmsLogsService/saveSmsLogs";

