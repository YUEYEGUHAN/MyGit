 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisriskinfo/prplisriskinfoList.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisRiskInfoService.js?version=${resourceVersion}'></script>



<div class="container-fluid app-container fullheight">
	<div class="app-content fullheight">
		<div class="panel panel-default fixed no-footer fullheight">
			<div class="panel-heading clearfix">
				<div class="panel-title pull-left">查询信息</div>
				<div class="panel-toolbar pull-right">
					<div class="form-inline">
						<input class="form-control" type="text" placeholder="搜索：id"
						data-url="/rest/interfaceapi/PrpLisRiskInfoService/query?queryName=queryList&filterQuery=true&queryType=page&id="
						onKeyUp="DataTablesUtil.event.search(this, event, 'PrpLisRiskInfogrid')"/>
						<button class="btn btn-info " type="button"
							data-url="/interfaceapi/PrpLisRiskInfoService/add"
							data-id="PrpLisRiskInfogrid" onclick="add(this,'form','xxxxx')">
						    新增
						</button>
						<button class="btn btn-danger form-control" type="button"
							data-url="/rest/interfaceapi/PrpLisRiskInfoService?multi=true"
							onclick="del(this,'table')"
							data-id="PrpLisRiskInfogrid">
							删除
						</button>
					</div>
				</div>
			</div>

			<div class="panel-content">
				<table cellpadding="0" cellspacing="0" border="0"
					class="table table-striped table-bordered parent-fixed"
					id="PrpLisRiskInfogrid" data-page-length="25" data-selection="multiple"
					data-pk-column="id"
					data-url="/rest/interfaceapi/PrpLisRiskInfoService/query?queryName=queryList&filterQuery=true&queryType=page">
					<thead>
						<tr>
							<th data-column="_v_seq" width="30px" class="text-center">序号</th>
							<th data-column="id"   data-orderable="false" class="text-center"
								width="80px">
							       ID      
							 </th> 
							<th data-column="risklevel"   data-orderable="false" class="text-center"
								width="80px" data-link='/interfaceapi/PrpLisRiskInfoService/id/' data-link-params='id' >
							       风险等级      
							 </th> 
							<th data-column="registno"   data-orderable="false" class="text-center"
								width="80px">
							       报案号      
							 </th> 
							<th data-column="businessno"   data-orderable="false" class="text-center"
								width="80px">
							       业务号      
							 </th> 
							<th data-column="businessid"   data-orderable="false" class="text-center"
								width="80px">
							       上一环节业务主表ID      
							 </th> 
							<th data-column="nodeid"   data-orderable="false" class="text-center"
								width="80px">
							       01报案02查勘03立案04定损05核损06人伤跟踪07费用审核08理算99结案      
							 </th> 
							<th data-column="warnflag"   data-orderable="false" class="text-center"
								width="80px">
							       是否预警标识      
							 </th> 
							<th data-column="regionalrisklevel"   data-orderable="false" class="text-center"
								width="80px">
							       地域风险等级      
							 </th> 
							<th data-column="regionalriskflag"   data-orderable="false" class="text-center"
								width="80px">
							       地域风险预警      
							 </th> 
							<th data-column="regionalriskcode"   data-orderable="false" class="text-center"
								width="80px">
							       地域风险代码      
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
    DataTablesUtil.loadAjaxTable("PrpLisRiskInfogrid");
</script>




