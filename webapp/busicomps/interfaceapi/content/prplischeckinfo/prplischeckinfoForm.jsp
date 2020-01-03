 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplischeckinfo/prplischeckinfoForm.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisCheckInfoService.js?version=${resourceVersion}'></script>




  <div class="container-fluid app-container fixed no-header">
    <div class="app-content">
        <div class="panel panel-default fixed no-footer">
            <div class="panel-heading clearfix">
                <!-- 可以任意调整和删除的部分 begin-->
                <div class="panel-title pull-left">
                    <!-- 标题放这里-->信息
                </div>
                <div class="panel-toolbar pull-right">
 
		<button class="btn m-b-xs w-xs btn-info" onclick="interfaceapiPrpLisCheckInfoVueForm.save(this,'/interfaceapi/PrpLisCheckInfoService/', 'id')">
		 	<i class=" fa fa-save"></i>保存
		</button>
   		<button class="btn m-b-xs w-xs btn-default" data-url="/interfaceapi/PrpLisCheckInfoService/prplischeckinfoListPage"
										onclick="redirectDataUrl(this)">
			<i class="fa fa-rotate-left"></i>返回
   		</button>
                </div>
                <!-- 可以任意调整和删除的部分 end-->
            </div>
            <div class="panel-content">
                <form name='interfaceapiPrpLisCheckInfoForm' id='interfaceapiPrpLisCheckInfoForm' method="post" action="/interfaceapi/PrpLisCheckInfoService" class="form-horizontal row">
			       <input name="bean_status" type="hidden" id="bean_status" v-model="bean_status" value="${bean_status}">

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="id" name="id" v-model="id" class="form-control" value="${PrpLisCheckInfo.id}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">关联主表ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="riskinfoid" name="riskinfoid" v-model="riskinfoid" class="form-control" value="${PrpLisCheckInfo.riskinfoid}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">核查事项</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="checkriskname" name="checkriskname" v-model="checkriskname" class="form-control" value="${PrpLisCheckInfo.checkriskname}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">核查事项代码</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="checkriskcode" name="checkriskcode" v-model="checkriskcode" class="form-control" value="${PrpLisCheckInfo.checkriskcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">调查结果</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="result" name="result" v-model="result" class="form-control" value="${PrpLisCheckInfo.result}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">创建时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="inserttimeforhis" name="inserttimeforhis"  v-model="inserttimeforhis"  value="${PrpLisCheckInfo.inserttimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
				<div class="input-group-btn">
					<button class="btn btn-pick btnDatepicker" onclick="WdatePicker({el:$dp.$('inserttimeforhis'),dateFmt:'yyyy-MM-dd HH:mm:ss'})" type="button">
						<i class="fa fa-calendar"> </i>
					</button> 
				</div> 
			</div> 
       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">操作时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="operatetimeforhis" name="operatetimeforhis"  v-model="operatetimeforhis"  value="${PrpLisCheckInfo.operatetimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
				<div class="input-group-btn">
					<button class="btn btn-pick btnDatepicker" onclick="WdatePicker({el:$dp.$('operatetimeforhis'),dateFmt:'yyyy-MM-dd HH:mm:ss'})" type="button">
						<i class="fa fa-calendar"> </i>
					</button> 
				</div> 
			</div> 
       </div> 
    </div> 
</div> 
			    </form>
            </div>
        </div>
    </div>
</div>

<script language="JavaScript">  
    var interfaceapiPrpLisCheckInfoFormConfig = {};
    var interfaceapiPrpLisCheckInfoVueForm;
    $(function () {
        interfaceapiPrpLisCheckInfoVueForm = new VueForm("interfaceapiPrpLisCheckInfoForm", interfaceapiPrpLisCheckInfoFormConfig);
    });
</script>




