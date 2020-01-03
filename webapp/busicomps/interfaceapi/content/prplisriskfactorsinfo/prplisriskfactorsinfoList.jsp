 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisriskfactorsinfo/prplisriskfactorsinfoList.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisRiskFactorsInfoService.js?version=${resourceVersion}'></script>



<div class="container-fluid app-container fullheight">
	<div class="app-content fullheight">
		<div class="panel panel-default fixed no-footer fullheight">
			<div class="panel-heading clearfix">
				<div class="panel-title pull-left">查询信息</div>
				<div class="panel-toolbar pull-right">
					<div class="form-inline">
						<input class="form-control" type="text" placeholder="搜索：id"
						data-url="/rest/interfaceapi/PrpLisRiskFactorsInfoService/query?queryName=queryList&filterQuery=true&queryType=page&id="
						onKeyUp="DataTablesUtil.event.search(this, event, 'PrpLisRiskFactorsInfogrid')"/>
						<button class="btn btn-info " type="button"
							data-url="/interfaceapi/PrpLisRiskFactorsInfoService/add"
							data-id="PrpLisRiskFactorsInfogrid" onclick="add(this,'form','xxxxx')">
						    新增
						</button>
						<button class="btn btn-danger form-control" type="button"
							data-url="/rest/interfaceapi/PrpLisRiskFactorsInfoService?multi=true"
							onclick="del(this,'table')"
							data-id="PrpLisRiskFactorsInfogrid">
							删除
						</button>
					</div>
				</div>
			</div>

			<div class="panel-content">
				<table cellpadding="0" cellspacing="0" border="0"
					class="table table-striped table-bordered parent-fixed"
					id="PrpLisRiskFactorsInfogrid" data-page-length="25" data-selection="multiple"
					data-pk-column="id"
					data-url="/rest/interfaceapi/PrpLisRiskFactorsInfoService/query?queryName=queryList&filterQuery=true&queryType=page">
					<thead>
						<tr>
							<th data-column="_v_seq" width="30px" class="text-center">序号</th>
							<th data-column="id"   data-orderable="false" class="text-center"
								width="80px">
							       ID      
							 </th> 
							<th data-column="riskinfoid"   data-orderable="false" class="text-center"
								width="80px" data-link='/interfaceapi/PrpLisRiskFactorsInfoService/id/' data-link-params='id' >
							       关联主表id      
							 </th> 
							<th data-column="riskfactorsname"   data-orderable="false" class="text-center"
								width="80px">
							       涉及风险因子      
							 </th> 
							<th data-column="riskfactorscode"   data-orderable="false" class="text-center"
								width="80px">
							       风险因子代码      
							 </th> 
							<th data-column="inserttimeforhis"   data-orderable="false" class="text-center"
								width="80px">
							       创建时间      
							 </th> 
							<th data-column="operatetimeforhis"   data-orderable="false" class="text-center"
								width="80px">
							       操作时间      
							 </th> 
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    DataTablesUtil.loadAjaxTable("PrpLisRiskFactorsInfogrid");
</script>




