var PrpLisSmsLogsInfoService={};
/*重定向页面
*发送短信记录表列表
*/
PrpLisSmsLogsInfoService.prplissmslogsinfoListPage='/interfaceapi/PrpLisSmsLogsInfoService/prplissmslogsinfoListPage';
/*重定向页面
*发送短信记录表表单
*/
PrpLisSmsLogsInfoService.prplissmslogsinfoFormPage='/interfaceapi/PrpLisSmsLogsInfoService/prplissmslogsinfoFormPage';

/*
*findPrpLisSmsLogs
*/
PrpLisSmsLogsInfoService.findPrpLisSmsLogs=function(comcode,personname,personcode,levels,page,rows,sort,sortOrder,queryTime,callback){	
	var url="/rest/interfaceapi/PrpLisSmsLogsInfoService/findPrpLisSmsLogs"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comcode=comcode;
	data.personname=personname;
	data.personcode=personcode;
	data.levels=levels;
	data.page=page;
	data.rows=rows;
	data.sort=sort;
	data.sortOrder=sortOrder;
	data.queryTime=queryTime;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSmsLogsInfoService.findPrpLisSmsLogs.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSmsLogsInfoService/findPrpLisSmsLogs";
/*
*saveSmsLogs
*/
PrpLisSmsLogsInfoService.saveSmsLogs=function(levels,callback){	
	var url="/rest/interfaceapi/PrpLisSmsLogsInfoService/saveSmsLogs"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.levels=levels;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSmsLogsInfoService.saveSmsLogs.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSmsLogsInfoService/saveSmsLogs";
/*
*downSmsLogs
*/
PrpLisSmsLogsInfoService.downSmsLogs=function(comcode,queryTime,personname,personcode,levels,callback){	
	var url="/rest/interfaceapi/PrpLisSmsLogsInfoService/downSmsLogs"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.comcode=comcode;
	data.queryTime=queryTime;
	data.personname=personname;
	data.personcode=personcode;
	data.levels=levels;
	data.sort=sort;
	data.sortOrder=sortOrder;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisSmsLogsInfoService.downSmsLogs.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisSmsLogsInfoService/downSmsLogs";

