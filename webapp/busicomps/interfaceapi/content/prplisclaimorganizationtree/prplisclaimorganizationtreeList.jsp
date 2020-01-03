 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisclaimorganizationtree/prplisclaimorganizationtreeList.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisClaimOrganizationTreeService.js?version=${resourceVersion}'></script>



<div class="container-fluid app-container fullheight">
	<div class="app-content fullheight">
		<div class="panel panel-default fixed no-footer fullheight">
			<div class="panel-heading clearfix">
				<div class="panel-title pull-left">查询信息</div>
				<div class="panel-toolbar pull-right">
					<div class="form-inline">
						<input class="form-control" type="text" placeholder="搜索：id"
						data-url="/rest/interfaceapi/PrpLisClaimOrganizationTreeService/query?queryName=queryList&filterQuery=true&queryType=page&id="
						onKeyUp="DataTablesUtil.event.search(this, event, 'PrpLisClaimOrganizationTreegrid')"/>
						<button class="btn btn-info " type="button"
							data-url="/interfaceapi/PrpLisClaimOrganizationTreeService/add"
							data-id="PrpLisClaimOrganizationTreegrid" onclick="add(this,'form','xxxxx')">
						    新增
						</button>
						<button class="btn btn-danger form-control" type="button"
							data-url="/rest/interfaceapi/PrpLisClaimOrganizationTreeService?multi=true"
							onclick="del(this,'table')"
							data-id="PrpLisClaimOrganizationTreegrid">
							删除
						</button>
					</div>
				</div>
			</div>

			<div class="panel-content">
				<table cellpadding="0" cellspacing="0" border="0"
					class="table table-striped table-bordered parent-fixed"
					id="PrpLisClaimOrganizationTreegrid" data-page-length="25" data-selection="multiple"
					data-pk-column="id"
					data-url="/rest/interfaceapi/PrpLisClaimOrganizationTreeService/query?queryName=queryList&filterQuery=true&queryType=page">
					<thead>
						<tr>
							<th data-column="_v_seq" width="30px" class="text-center">序号</th>
							<th data-column="id"   data-orderable="false" class="text-center"
								width="80px">
							       ID      
							 </th> 
							<th data-column="comcode"   data-orderable="false" class="text-center"
								width="80px" data-link='/interfaceapi/PrpLisClaimOrganizationTreeService/id/' data-link-params='id' >
							       COMCODE      
							 </th> 
							<th data-column="comname"   data-orderable="false" class="text-center"
								width="80px">
							       COMNAME      
							 </th> 
							<th data-column="uppercomcode"   data-orderable="false" class="text-center"
								width="80px">
							       UPPERCOMCODE      
							 </th> 
							<th data-column="comlevel"   data-orderable="false" class="text-center"
								width="80px">
							       COMLEVEL      
							 </th> 
							<th data-column="comcode1"   data-orderable="false" class="text-center"
								width="80px">
							       COMCODE1      
							 </th> 
							<th data-column="comcode2"   data-orderable="false" class="text-center"
								width="80px">
							       COMCODE2      
							 </th> 
							<th data-column="comcode3"   data-orderable="false" class="text-center"
								width="80px">
							       COMCODE3      
							 </th> 
							<th data-column="comcode4"   data-orderable="false" class="text-center"
								width="80px">
							       COMCODE4      
							 </th> 
							<th data-column="acomcode"   data-orderable="false" class="text-center"
								width="80px">
							       ACOMCODE      
							 </th> 
							<th data-column="acomname"   data-orderable="false" class="text-center"
								width="80px">
							       ACOMNAME      
							 </th> 
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    DataTablesUtil.loadAjaxTable("PrpLisClaimOrganizationTreegrid");
</script>




