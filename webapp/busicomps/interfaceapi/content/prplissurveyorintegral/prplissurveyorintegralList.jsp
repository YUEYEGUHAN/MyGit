 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplissurveyorintegral/prplissurveyorintegralList.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisSurveyOrIntegralService.js?version=${resourceVersion}'></script>



<div class="container-fluid app-container fullheight">
	<div class="app-content fullheight">
		<div class="panel panel-default fixed no-footer fullheight">
			<div class="panel-heading clearfix">
				<div class="panel-title pull-left">查询信息</div>
				<div class="panel-toolbar pull-right">
					<div class="form-inline">
						<input class="form-control" type="text" placeholder="搜索：id"
						data-url="/rest/interfaceapi/PrpLisSurveyOrIntegralService/query?queryName=queryList&filterQuery=true&queryType=page&id="
						onKeyUp="DataTablesUtil.event.search(this, event, 'PrpLisSurveyOrIntegralgrid')"/>
						<button class="btn btn-info " type="button"
							data-url="/interfaceapi/PrpLisSurveyOrIntegralService/add"
							data-id="PrpLisSurveyOrIntegralgrid" onclick="add(this,'form','xxxxx')">
						    新增
						</button>
						<button class="btn btn-danger form-control" type="button"
							data-url="/rest/interfaceapi/PrpLisSurveyOrIntegralService?multi=true"
							onclick="del(this,'table')"
							data-id="PrpLisSurveyOrIntegralgrid">
							删除
						</button>
					</div>
				</div>
			</div>

			<div class="panel-content">
				<table cellpadding="0" cellspacing="0" border="0"
					class="table table-striped table-bordered parent-fixed"
					id="PrpLisSurveyOrIntegralgrid" data-page-length="25" data-selection="multiple"
					data-pk-column="id"
					data-url="/rest/interfaceapi/PrpLisSurveyOrIntegralService/query?queryName=queryList&filterQuery=true&queryType=page">
					<thead>
						<tr>
							<th data-column="_v_seq" width="30px" class="text-center">序号</th>
							<th data-column="id"   data-orderable="false" class="text-center"
								width="80px">
							       周表ID      
							 </th> 
							<th data-column="userid"   data-orderable="false" class="text-center"
								width="80px" data-link='/interfaceapi/PrpLisSurveyOrIntegralService/id/' data-link-params='id' >
							       用户      
							 </th> 
							<th data-column="nickname"   data-orderable="false" class="text-center"
								width="80px">
							       昵称      
							 </th> 
							<th data-column="comcode"   data-orderable="false" class="text-center"
								width="80px">
							       机构编码      
							 </th> 
							<th data-column="comcname"   data-orderable="false" class="text-center"
								width="80px">
							       机构名称      
							 </th> 
							<th data-column="comlevel"   data-orderable="false" class="text-center"
								width="80px">
							       机构等级      
							 </th> 
							<th data-column="headportrait"   data-orderable="false" class="text-center"
								width="80px">
							       头像地址      
							 </th> 
							<th data-column="totalscore"   data-orderable="false" class="text-center"
								width="80px">
							       总分      
							 </th> 
							<th data-column="surveyscore"   data-orderable="false" class="text-center"
								width="80px">
							       查勘分数      
							 </th> 
							<th data-column="lossscore"   data-orderable="false" class="text-center"
								width="80px">
							       定损分数      
							 </th> 
							<th data-column="signinscore"   data-orderable="false" class="text-center"
								width="80px">
							       签到分数      
							 </th> 
							<th data-column="evaluationscore"   data-orderable="false" class="text-center"
								width="80px">
							       客户评价分数      
							 </th> 
							<th data-column="recommendscore"   data-orderable="false" class="text-center"
								width="80px">
							       推荐分数      
							 </th> 
							<th data-column="ranking"   data-orderable="false" class="text-center"
								width="80px">
							       排名      
							 </th> 
							<th data-column="rankflag"   data-orderable="false" class="text-center"
								width="80px">
							       排名上升标识      
							 </th> 
							<th data-column="operatetimeforhis"   data-orderable="false" class="text-center"
								width="80px">
							       修改时间      
							 </th> 
							<th data-column="inserttimeforhis"   data-orderable="false" class="text-center"
								width="80px">
							       入库时间      
							 </th> 
							<th data-column="username"   data-orderable="false" class="text-center"
								width="80px">
							       用户姓名      
							 </th> 
							<th data-column="provincecomcode"   data-orderable="false" class="text-center"
								width="80px">
							       机构编码-省级      
							 </th> 
							<th data-column="citycomcode"   data-orderable="false" class="text-center"
								width="80px">
							       机构编码-市级      
							 </th> 
							<th data-column="provinceflag"   data-orderable="false" class="text-center"
								width="80px">
							       排名上升标识-省级      
							 </th> 
							<th data-column="cityflag"   data-orderable="false" class="text-center"
								width="80px">
							       排名上升标识-市级      
							 </th> 
							<th data-column="provinceranking"   data-orderable="false" class="text-center"
								width="80px">
							       排名-省级      
							 </th> 
							<th data-column="cityranking"   data-orderable="false" class="text-center"
								width="80px">
							       排名-市级      
							 </th> 
							<th data-column="fastclaimscore"   data-orderable="false" class="text-center"
								width="80px">
							       极速理赔分数      
							 </th> 
							<th data-column="year"   data-orderable="false" class="text-center"
								width="80px">
							       年      
							 </th> 
							<th data-column="week"   data-orderable="false" class="text-center"
								width="80px">
							       周      
							 </th> 
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    DataTablesUtil.loadAjaxTable("PrpLisSurveyOrIntegralgrid");
</script>




