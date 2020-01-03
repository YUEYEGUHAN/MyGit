 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisclaimorganizationtree/prplisclaimorganizationtreeForm.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisClaimOrganizationTreeService.js?version=${resourceVersion}'></script>




  <div class="container-fluid app-container fixed no-header">
    <div class="app-content">
        <div class="panel panel-default fixed no-footer">
            <div class="panel-heading clearfix">
                <!-- 可以任意调整和删除的部分 begin-->
                <div class="panel-title pull-left">
                    <!-- 标题放这里-->信息
                </div>
                <div class="panel-toolbar pull-right">
 
		<button class="btn m-b-xs w-xs btn-info" onclick="interfaceapiPrpLisClaimOrganizationTreeVueForm.save(this,'/interfaceapi/PrpLisClaimOrganizationTreeService/', 'id')">
		 	<i class=" fa fa-save"></i>保存
		</button>
   		<button class="btn m-b-xs w-xs btn-default" data-url="/interfaceapi/PrpLisClaimOrganizationTreeService/prplisclaimorganizationtreeListPage"
										onclick="redirectDataUrl(this)">
			<i class="fa fa-rotate-left"></i>返回
   		</button>
                </div>
                <!-- 可以任意调整和删除的部分 end-->
            </div>
            <div class="panel-content">
                <form name='interfaceapiPrpLisClaimOrganizationTreeForm' id='interfaceapiPrpLisClaimOrganizationTreeForm' method="post" action="/interfaceapi/PrpLisClaimOrganizationTreeService" class="form-horizontal row">
			       <input name="bean_status" type="hidden" id="bean_status" v-model="bean_status" value="${bean_status}">

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="id" name="id" v-model="id" class="form-control" value="${PrpLisClaimOrganizationTree.id}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">COMCODE</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcode" name="comcode" v-model="comcode" class="form-control" value="${PrpLisClaimOrganizationTree.comcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">COMNAME</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comname" name="comname" v-model="comname" class="form-control" value="${PrpLisClaimOrganizationTree.comname}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">UPPERCOMCODE</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="uppercomcode" name="uppercomcode" v-model="uppercomcode" class="form-control" value="${PrpLisClaimOrganizationTree.uppercomcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">COMLEVEL</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comlevel" name="comlevel" v-model="comlevel" class="form-control" value="${PrpLisClaimOrganizationTree.comlevel}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">COMCODE1</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcode1" name="comcode1" v-model="comcode1" class="form-control" value="${PrpLisClaimOrganizationTree.comcode1}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">COMCODE2</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcode2" name="comcode2" v-model="comcode2" class="form-control" value="${PrpLisClaimOrganizationTree.comcode2}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">COMCODE3</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcode3" name="comcode3" v-model="comcode3" class="form-control" value="${PrpLisClaimOrganizationTree.comcode3}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">COMCODE4</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcode4" name="comcode4" v-model="comcode4" class="form-control" value="${PrpLisClaimOrganizationTree.comcode4}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">ACOMCODE</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="acomcode" name="acomcode" v-model="acomcode" class="form-control" value="${PrpLisClaimOrganizationTree.acomcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">ACOMNAME</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="acomname" name="acomname" v-model="acomname" class="form-control" value="${PrpLisClaimOrganizationTree.acomname}"/>

       </div> 
    </div> 
</div> 
			    </form>
            </div>
        </div>
    </div>
</div>

<script language="JavaScript">  
    var interfaceapiPrpLisClaimOrganizationTreeFormConfig = {};
    var interfaceapiPrpLisClaimOrganizationTreeVueForm;
    $(function () {
        interfaceapiPrpLisClaimOrganizationTreeVueForm = new VueForm("interfaceapiPrpLisClaimOrganizationTreeForm", interfaceapiPrpLisClaimOrganizationTreeFormConfig);
    });
</script>




