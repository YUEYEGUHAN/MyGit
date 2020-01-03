 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisfindphoto/prplisfindphotoForm.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisFindPhotoService.js?version=${resourceVersion}'></script>




  <div class="container-fluid app-container fixed no-header">
    <div class="app-content">
        <div class="panel panel-default fixed no-footer">
            <div class="panel-heading clearfix">
                <!-- 可以任意调整和删除的部分 begin-->
                <div class="panel-title pull-left">
                    <!-- 标题放这里-->信息
                </div>
                <div class="panel-toolbar pull-right">
 
		<button class="btn m-b-xs w-xs btn-info" onclick="interfaceapiPrpLisFindPhotoVueForm.save(this,'/interfaceapi/PrpLisFindPhotoService/', 'psncode')">
		 	<i class=" fa fa-save"></i>保存
		</button>
   		<button class="btn m-b-xs w-xs btn-default" data-url="/interfaceapi/PrpLisFindPhotoService/prplisfindphotoListPage"
										onclick="redirectDataUrl(this)">
			<i class="fa fa-rotate-left"></i>返回
   		</button>
                </div>
                <!-- 可以任意调整和删除的部分 end-->
            </div>
            <div class="panel-content">
                <form name='interfaceapiPrpLisFindPhotoForm' id='interfaceapiPrpLisFindPhotoForm' method="post" action="/interfaceapi/PrpLisFindPhotoService" class="form-horizontal row">
			       <input name="bean_status" type="hidden" id="bean_status" v-model="bean_status" value="${bean_status}">

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">PSNCODE</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="psncode" name="psncode" v-model="psncode" class="form-control" value="${PrpLisFindPhoto.psncode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">PHOTO</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="photo" name="photo" v-model="photo" class="form-control" value="${PrpLisFindPhoto.photo}"/>

       </div> 
    </div> 
</div> 
			    </form>
            </div>
        </div>
    </div>
</div>

<script language="JavaScript">  
    var interfaceapiPrpLisFindPhotoFormConfig = {};
    var interfaceapiPrpLisFindPhotoVueForm;
    $(function () {
        interfaceapiPrpLisFindPhotoVueForm = new VueForm("interfaceapiPrpLisFindPhotoForm", interfaceapiPrpLisFindPhotoFormConfig);
    });
</script>




