 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisearlywarnconfig/prplisearlywarnconfigForm.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisEarlyWarnConfigService.js?version=${resourceVersion}'></script>




  <div class="container-fluid app-container fixed no-header">
    <div class="app-content">
        <div class="panel panel-default fixed no-footer">
            <div class="panel-heading clearfix">
                <!-- 可以任意调整和删除的部分 begin-->
                <div class="panel-title pull-left">
                    <!-- 标题放这里-->信息
                </div>
                <div class="panel-toolbar pull-right">
 
		<button class="btn m-b-xs w-xs btn-info" onclick="interfaceapiPrpLisEarlyWarnConfigVueForm.save(this,'/interfaceapi/PrpLisEarlyWarnConfigService/', 'id')">
		 	<i class=" fa fa-save"></i>保存
		</button>
   		<button class="btn m-b-xs w-xs btn-default" data-url="/interfaceapi/PrpLisEarlyWarnConfigService/prplisearlywarnconfigListPage"
										onclick="redirectDataUrl(this)">
			<i class="fa fa-rotate-left"></i>返回
   		</button>
                </div>
                <!-- 可以任意调整和删除的部分 end-->
            </div>
            <div class="panel-content">
                <form name='interfaceapiPrpLisEarlyWarnConfigForm' id='interfaceapiPrpLisEarlyWarnConfigForm' method="post" action="/interfaceapi/PrpLisEarlyWarnConfigService" class="form-horizontal row">
			       <input name="bean_status" type="hidden" id="bean_status" v-model="bean_status" value="${bean_status}">

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="id" name="id" v-model="id" class="form-control" value="${PrpLisEarlyWarnConfig.id}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">机构编码</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="organcode" name="organcode" v-model="organcode" class="form-control" value="${PrpLisEarlyWarnConfig.organcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">工号</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="personcode" name="personcode" v-model="personcode" class="form-control" value="${PrpLisEarlyWarnConfig.personcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">姓名</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="personname" name="personname" v-model="personname" class="form-control" value="${PrpLisEarlyWarnConfig.personname}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">电话</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="telephone" name="telephone" v-model="telephone" class="form-control" value="${PrpLisEarlyWarnConfig.telephone}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">超时时效</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="overtime" name="overtime" v-model="overtime" class="form-control" value="${PrpLisEarlyWarnConfig.overtime}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">机构级别</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="level" name="level" v-model="level" class="form-control" value="${PrpLisEarlyWarnConfig.level}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">插入时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="inserttimeforhis" name="inserttimeforhis"  v-model="inserttimeforhis"  value="${PrpLisEarlyWarnConfig.inserttimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
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
       <label class="control-label col-sm-4 col-xs-12">更新时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="operatetimeforhis" name="operatetimeforhis"  v-model="operatetimeforhis"  value="${PrpLisEarlyWarnConfig.operatetimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
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
    var interfaceapiPrpLisEarlyWarnConfigFormConfig = {};
    var interfaceapiPrpLisEarlyWarnConfigVueForm;
    $(function () {
        interfaceapiPrpLisEarlyWarnConfigVueForm = new VueForm("interfaceapiPrpLisEarlyWarnConfigForm", interfaceapiPrpLisEarlyWarnConfigFormConfig);
    });
</script>




