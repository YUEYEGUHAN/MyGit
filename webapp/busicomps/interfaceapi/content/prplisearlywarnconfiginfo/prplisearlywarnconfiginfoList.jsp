 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplisearlywarnconfiginfo/prplisearlywarnconfiginfoList.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisEarlyWarnConfigInfoService.js?version=${resourceVersion}'></script>



<div class="container-fluid app-container fullheight">
	<div class="app-content fullheight">
		<div class="panel panel-default fixed no-footer fullheight">
			<div class="panel-heading clearfix">
				<div class="panel-title pull-left">查询信息</div>
				<div class="panel-toolbar pull-right">
					<div class="form-inline">
						<input class="form-control" type="text" placeholder="搜索：id"
						data-url="/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/query?queryName=queryList&filterQuery=true&queryType=page&id="
						onKeyUp="DataTablesUtil.event.search(this, event, 'PrpLisEarlyWarnConfigInfogrid')"/>
						<button class="btn btn-info " type="button"
							data-url="/interfaceapi/PrpLisEarlyWarnConfigInfoService/add"
							data-id="PrpLisEarlyWarnConfigInfogrid" onclick="add(this,'form','xxxxx')">
						    新增
						</button>
						<button class="btn btn-danger form-control" type="button"
							data-url="/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService?multi=true"
							onclick="del(this,'table')"
							data-id="PrpLisEarlyWarnConfigInfogrid">
							删除
						</button>
					</div>
				</div>
			</div>

			<div class="panel-content">
				<table cellpadding="0" cellspacing="0" border="0"
					class="table table-striped table-bordered parent-fixed"
					id="PrpLisEarlyWarnConfigInfogrid" data-page-length="25" data-selection="multiple"
					data-pk-column="id"
					data-url="/rest/interfaceapi/PrpLisEarlyWarnConfigInfoService/query?queryName=queryList&filterQuery=true&queryType=page">
					<thead>
						<tr>
							<th data-column="_v_seq" width="30px" class="text-center">序号</th>
							<th data-column="id"   data-orderable="false" class="text-center"
								width="80px">
							       ID      
							 </th> 
							<th data-column="organcode"   data-orderable="false" class="text-center"
								width="80px" data-link='/interfaceapi/PrpLisEarlyWarnConfigInfoService/id/' data-link-params='id' >
							       机构编码      
							 </th> 
							<th data-column="personcode"   data-orderable="false" class="text-center"
								width="80px">
							       工号      
							 </th> 
							<th data-column="personname"   data-orderable="false" class="text-center"
								width="80px">
							       姓名      
							 </th> 
							<th data-column="telephone"   data-orderable="false" class="text-center"
								width="80px">
							       电话      
							 </th> 
							<th data-column="overtime"   data-orderable="false" class="text-center"
								width="80px">
							       超时时效      
							 </th> 
							<th data-column="levels"   data-orderable="false" class="text-center"
								width="80px">
							       机构级别      
							 </th> 
							<th data-column="inserttimeforhis"   data-orderable="false" class="text-center"
								width="80px">
							       插入时间      
							 </th> 
							<th data-column="operatetimeforhis"   data-orderable="false" class="text-center"
								width="80px">
							       更新时间      
							 </th> 
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    DataTablesUtil.loadAjaxTable("PrpLisEarlyWarnConfigInfogrid");
</script>




