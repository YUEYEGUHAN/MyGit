 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplissmslogsinfo/prplissmslogsinfoForm.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisSmsLogsInfoService.js?version=${resourceVersion}'></script>




  <div class="container-fluid app-container fixed no-header">
    <div class="app-content">
        <div class="panel panel-default fixed no-footer">
            <div class="panel-heading clearfix">
                <!-- 可以任意调整和删除的部分 begin-->
                <div class="panel-title pull-left">
                    <!-- 标题放这里-->信息
                </div>
                <div class="panel-toolbar pull-right">
 
		<button class="btn m-b-xs w-xs btn-info" onclick="interfaceapiPrpLisSmsLogsInfoVueForm.save(this,'/interfaceapi/PrpLisSmsLogsInfoService/', 'id')">
		 	<i class=" fa fa-save"></i>保存
		</button>
   		<button class="btn m-b-xs w-xs btn-default" data-url="/interfaceapi/PrpLisSmsLogsInfoService/prplissmslogsinfoListPage"
										onclick="redirectDataUrl(this)">
			<i class="fa fa-rotate-left"></i>返回
   		</button>
                </div>
                <!-- 可以任意调整和删除的部分 end-->
            </div>
            <div class="panel-content">
                <form name='interfaceapiPrpLisSmsLogsInfoForm' id='interfaceapiPrpLisSmsLogsInfoForm' method="post" action="/interfaceapi/PrpLisSmsLogsInfoService" class="form-horizontal row">
			       <input name="bean_status" type="hidden" id="bean_status" v-model="bean_status" value="${bean_status}">

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="id" name="id" v-model="id" class="form-control" value="${PrpLisSmsLogsInfo.id}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">组织机构编码</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcode" name="comcode" v-model="comcode" class="form-control" value="${PrpLisSmsLogsInfo.comcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">组织机构名称</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comname" name="comname" v-model="comname" class="form-control" value="${PrpLisSmsLogsInfo.comname}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">通知人工号</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="personcode" name="personcode" v-model="personcode" class="form-control" value="${PrpLisSmsLogsInfo.personcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">通知人姓名</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="personname" name="personname" v-model="personname" class="form-control" value="${PrpLisSmsLogsInfo.personname}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">通知人电话</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="telephon" name="telephon" v-model="telephon" class="form-control" value="${PrpLisSmsLogsInfo.telephon}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">短信内容</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="content" name="content" v-model="content" class="form-control" value="${PrpLisSmsLogsInfo.content}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">通知级别</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="levels" name="levels" v-model="levels" class="form-control" value="${PrpLisSmsLogsInfo.levels}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">插入时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="inserttimeforhis" name="inserttimeforhis"  v-model="inserttimeforhis"  value="${PrpLisSmsLogsInfo.inserttimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
				<div class="input-group-btn">
					<button class="btn btn-pick btnDatepicker" onclick="WdatePicker({el:$dp.$('inserttimeforhis'),dateFmt:'yyyy-MM-dd HH:mm:ss'})" type="button">
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
    var interfaceapiPrpLisSmsLogsInfoFormConfig = {};
    var interfaceapiPrpLisSmsLogsInfoVueForm;
    $(function () {
        interfaceapiPrpLisSmsLogsInfoVueForm = new VueForm("interfaceapiPrpLisSmsLogsInfoForm", interfaceapiPrpLisSmsLogsInfoFormConfig);
    });
</script>




