 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisriskinfo/prplisriskinfoForm.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisRiskInfoService.js?version=${resourceVersion}'></script>




  <div class="container-fluid app-container fixed no-header">
    <div class="app-content">
        <div class="panel panel-default fixed no-footer">
            <div class="panel-heading clearfix">
                <!-- 可以任意调整和删除的部分 begin-->
                <div class="panel-title pull-left">
                    <!-- 标题放这里-->信息
                </div>
                <div class="panel-toolbar pull-right">
 
		<button class="btn m-b-xs w-xs btn-info" onclick="interfaceapiPrpLisRiskInfoVueForm.save(this,'/interfaceapi/PrpLisRiskInfoService/', 'id')">
		 	<i class=" fa fa-save"></i>保存
		</button>
   		<button class="btn m-b-xs w-xs btn-default" data-url="/interfaceapi/PrpLisRiskInfoService/prplisriskinfoListPage"
										onclick="redirectDataUrl(this)">
			<i class="fa fa-rotate-left"></i>返回
   		</button>
                </div>
                <!-- 可以任意调整和删除的部分 end-->
            </div>
            <div class="panel-content">
                <form name='interfaceapiPrpLisRiskInfoForm' id='interfaceapiPrpLisRiskInfoForm' method="post" action="/interfaceapi/PrpLisRiskInfoService" class="form-horizontal row">
			       <input name="bean_status" type="hidden" id="bean_status" v-model="bean_status" value="${bean_status}">

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="id" name="id" v-model="id" class="form-control" value="${PrpLisRiskInfo.id}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">风险等级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="risklevel" name="risklevel" v-model="risklevel" class="form-control" value="${PrpLisRiskInfo.risklevel}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">报案号</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="registno" name="registno" v-model="registno" class="form-control" value="${PrpLisRiskInfo.registno}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">业务号</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="businessno" name="businessno" v-model="businessno" class="form-control" value="${PrpLisRiskInfo.businessno}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">上一环节业务主表ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="businessid" name="businessid" v-model="businessid" class="form-control" value="${PrpLisRiskInfo.businessid}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">01报案02查勘03立案04定损05核损06人伤跟踪07费用审核08理算99结案</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="nodeid" name="nodeid" v-model="nodeid" class="form-control" value="${PrpLisRiskInfo.nodeid}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">是否预警标识</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="warnflag" name="warnflag" v-model="warnflag" class="form-control" value="${PrpLisRiskInfo.warnflag}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">地域风险等级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="regionalrisklevel" name="regionalrisklevel" v-model="regionalrisklevel" class="form-control" value="${PrpLisRiskInfo.regionalrisklevel}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">地域风险预警</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="regionalriskflag" name="regionalriskflag" v-model="regionalriskflag" class="form-control" value="${PrpLisRiskInfo.regionalriskflag}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">地域风险代码</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="regionalriskcode" name="regionalriskcode" v-model="regionalriskcode" class="form-control" value="${PrpLisRiskInfo.regionalriskcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">创建时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="inserttimeforhis" name="inserttimeforhis"  v-model="inserttimeforhis"  value="${PrpLisRiskInfo.inserttimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
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
				<input type="text" id="operatetimeforhis" name="operatetimeforhis"  v-model="operatetimeforhis"  value="${PrpLisRiskInfo.operatetimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
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
    var interfaceapiPrpLisRiskInfoFormConfig = {};
    var interfaceapiPrpLisRiskInfoVueForm;
    $(function () {
        interfaceapiPrpLisRiskInfoVueForm = new VueForm("interfaceapiPrpLisRiskInfoForm", interfaceapiPrpLisRiskInfoFormConfig);
    });
</script>




