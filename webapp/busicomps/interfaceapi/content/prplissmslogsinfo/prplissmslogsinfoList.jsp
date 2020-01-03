 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplissmslogsinfo/prplissmslogsinfoList.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisSmsLogsInfoService.js?version=${resourceVersion}'></script>



<div class="container-fluid app-container fullheight">
	<div class="app-content fullheight">
		<div class="panel panel-default fixed no-footer fullheight">
			<div class="panel-heading clearfix">
				<div class="panel-title pull-left">查询信息</div>
				<div class="panel-toolbar pull-right">
					<div class="form-inline">
						<input class="form-control" type="text" placeholder="搜索：id"
						data-url="/rest/interfaceapi/PrpLisSmsLogsInfoService/query?queryName=queryList&filterQuery=true&queryType=page&id="
						onKeyUp="DataTablesUtil.event.search(this, event, 'PrpLisSmsLogsInfogrid')"/>
						<button class="btn btn-info " type="button"
							data-url="/interfaceapi/PrpLisSmsLogsInfoService/add"
							data-id="PrpLisSmsLogsInfogrid" onclick="add(this,'form','xxxxx')">
						    新增
						</button>
						<button class="btn btn-danger form-control" type="button"
							data-url="/rest/interfaceapi/PrpLisSmsLogsInfoService?multi=true"
							onclick="del(this,'table')"
							data-id="PrpLisSmsLogsInfogrid">
							删除
						</button>
					</div>
				</div>
			</div>

			<div class="panel-content">
				<table cellpadding="0" cellspacing="0" border="0"
					class="table table-striped table-bordered parent-fixed"
					id="PrpLisSmsLogsInfogrid" data-page-length="25" data-selection="multiple"
					data-pk-column="id"
					data-url="/rest/interfaceapi/PrpLisSmsLogsInfoService/query?queryName=queryList&filterQuery=true&queryType=page">
					<thead>
						<tr>
							<th data-column="_v_seq" width="30px" class="text-center">序号</th>
							<th data-column="id"   data-orderable="false" class="text-center"
								width="80px">
							       ID      
							 </th> 
							<th data-column="comcode"   data-orderable="false" class="text-center"
								width="80px" data-link='/interfaceapi/PrpLisSmsLogsInfoService/id/' data-link-params='id' >
							       组织机构编码      
							 </th> 
							<th data-column="comname"   data-orderable="false" class="text-center"
								width="80px">
							       组织机构名称      
							 </th> 
							<th data-column="personcode"   data-orderable="false" class="text-center"
								width="80px">
							       通知人工号      
							 </th> 
							<th data-column="personname"   data-orderable="false" class="text-center"
								width="80px">
							       通知人姓名      
							 </th> 
							<th data-column="telephon"   data-orderable="false" class="text-center"
								width="80px">
							       通知人电话      
							 </th> 
							<th data-column="content"   data-orderable="false" class="text-center"
								width="80px">
							       短信内容      
							 </th> 
							<th data-column="levels"   data-orderable="false" class="text-center"
								width="80px">
							       通知级别      
							 </th> 
							<th data-column="inserttimeforhis"   data-orderable="false" class="text-center"
								width="80px">
							       插入时间      
							 </th> 
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    DataTablesUtil.loadAjaxTable("PrpLisSmsLogsInfogrid");
</script>



