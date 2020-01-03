var PrpLisReportDateService={};
/*重定向页面
*报表日期统计表列表
*/
PrpLisReportDateService.prplisreportdateListPage='/interfaceapi/PrpLisReportDateService/prplisreportdateListPage';
/*重定向页面
*报表日期统计表表单
*/
PrpLisReportDateService.prplisreportdateFormPage='/interfaceapi/PrpLisReportDateService/prplisreportdateFormPage';

/*
*findDateControl
*/
PrpLisReportDateService.findDateControl=function(year,date,callback){	
	var url="/rest/interfaceapi/PrpLisReportDateService/findDateControl"; 
	var data=new Object();
	var httpMethod='get';
	data.format='json';
	data.year=year;
	data.date=date;
	BOMF.server.ajax(httpMethod,url,data,callback);
}	 	
PrpLisReportDateService.findDateControl.jsonUrl=BOMF.CONST.WEB_APP_NAME+"/rest/interfaceapi/PrpLisReportDateService/findDateControl";

