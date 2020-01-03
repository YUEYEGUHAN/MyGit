 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplissurveyphoto/prplissurveyphotoList.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisSurveyPhotoService.js?version=${resourceVersion}'></script>



<div class="container-fluid app-container fullheight">
	<div class="app-content fullheight">
		<div class="panel panel-default fixed no-footer fullheight">
			<div class="panel-heading clearfix">
				<div class="panel-title pull-left">查询信息</div>
				<div class="panel-toolbar pull-right">
					<div class="form-inline">
						<input class="form-control" type="text" placeholder="搜索："
						data-url="/rest/interfaceapi/PrpLisSurveyPhotoService/query?queryName=queryList&filterQuery=true&queryType=page&="
						onKeyUp="DataTablesUtil.event.search(this, event, 'PrpLisSurveyPhotogrid')"/>
						<button class="btn btn-info " type="button"
							data-url="/interfaceapi/PrpLisSurveyPhotoService/add"
							data-id="PrpLisSurveyPhotogrid" onclick="add(this,'form','xxxxx')">
						    新增
						</button>
						<button class="btn btn-danger form-control" type="button"
							data-url="/rest/interfaceapi/PrpLisSurveyPhotoService?multi=true"
							onclick="del(this,'table')"
							data-id="PrpLisSurveyPhotogrid">
							删除
						</button>
					</div>
				</div>
			</div>

			<div class="panel-content">
				<table cellpadding="0" cellspacing="0" border="0"
					class="table table-striped table-bordered parent-fixed"
					id="PrpLisSurveyPhotogrid" data-page-length="25" data-selection="multiple"
					data-pk-column="psncode"
					data-url="/rest/interfaceapi/PrpLisSurveyPhotoService/query?queryName=queryList&filterQuery=true&queryType=page">
					<thead>
						<tr>
							<th data-column="_v_seq" width="30px" class="text-center">序号</th>
							<th data-column="psncode"   data-orderable="false" class="text-center"
								width="80px">
							       PSNCODE      
							 </th> 
							<th data-column="photo"   data-orderable="false" class="text-center"
								width="80px" data-link='/interfaceapi/PrpLisSurveyPhotoService/id/' data-link-params='psncode' >
							       PHOTO      
							 </th> 
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    DataTablesUtil.loadAjaxTable("PrpLisSurveyPhotogrid");
</script>




