 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.dstech.net/dssp' prefix='dssp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/content/prplissurveyorintegral/prplissurveyorintegralForm.js?version=${resourceVersion}'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/interfaceapi/js/serviceapi/PrpLisSurveyOrIntegralService.js?version=${resourceVersion}'></script>




  <div class="container-fluid app-container fixed no-header">
    <div class="app-content">
        <div class="panel panel-default fixed no-footer">
            <div class="panel-heading clearfix">
                <!-- 可以任意调整和删除的部分 begin-->
                <div class="panel-title pull-left">
                    <!-- 标题放这里-->信息
                </div>
                <div class="panel-toolbar pull-right">
 
		<button class="btn m-b-xs w-xs btn-info" onclick="interfaceapiPrpLisSurveyOrIntegralVueForm.save(this,'/interfaceapi/PrpLisSurveyOrIntegralService/', 'id')">
		 	<i class=" fa fa-save"></i>保存
		</button>
   		<button class="btn m-b-xs w-xs btn-default" data-url="/interfaceapi/PrpLisSurveyOrIntegralService/prplissurveyorintegralListPage"
										onclick="redirectDataUrl(this)">
			<i class="fa fa-rotate-left"></i>返回
   		</button>
                </div>
                <!-- 可以任意调整和删除的部分 end-->
            </div>
            <div class="panel-content">
                <form name='interfaceapiPrpLisSurveyOrIntegralForm' id='interfaceapiPrpLisSurveyOrIntegralForm' method="post" action="/interfaceapi/PrpLisSurveyOrIntegralService" class="form-horizontal row">
			       <input name="bean_status" type="hidden" id="bean_status" v-model="bean_status" value="${bean_status}">

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">周表ID</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="id" name="id" v-model="id" class="form-control" value="${PrpLisSurveyOrIntegral.id}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">用户</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="userid" name="userid" v-model="userid" class="form-control" value="${PrpLisSurveyOrIntegral.userid}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">昵称</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="nickname" name="nickname" v-model="nickname" class="form-control" value="${PrpLisSurveyOrIntegral.nickname}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">机构编码</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcode" name="comcode" v-model="comcode" class="form-control" value="${PrpLisSurveyOrIntegral.comcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">机构名称</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comcname" name="comcname" v-model="comcname" class="form-control" value="${PrpLisSurveyOrIntegral.comcname}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">机构等级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="comlevel" name="comlevel" v-model="comlevel" class="form-control" value="${PrpLisSurveyOrIntegral.comlevel}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">头像地址</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="headportrait" name="headportrait" v-model="headportrait" class="form-control" value="${PrpLisSurveyOrIntegral.headportrait}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">总分</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="totalscore" name="totalscore" v-model="totalscore" class="form-control" value="${PrpLisSurveyOrIntegral.totalscore}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">查勘分数</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="surveyscore" name="surveyscore" v-model="surveyscore" class="form-control" value="${PrpLisSurveyOrIntegral.surveyscore}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">定损分数</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="lossscore" name="lossscore" v-model="lossscore" class="form-control" value="${PrpLisSurveyOrIntegral.lossscore}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">签到分数</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="signinscore" name="signinscore" v-model="signinscore" class="form-control" value="${PrpLisSurveyOrIntegral.signinscore}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">客户评价分数</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="evaluationscore" name="evaluationscore" v-model="evaluationscore" class="form-control" value="${PrpLisSurveyOrIntegral.evaluationscore}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">推荐分数</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="recommendscore" name="recommendscore" v-model="recommendscore" class="form-control" value="${PrpLisSurveyOrIntegral.recommendscore}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">排名</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="ranking" name="ranking" v-model="ranking" class="form-control" value="${PrpLisSurveyOrIntegral.ranking}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">排名上升标识</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="rankflag" name="rankflag" v-model="rankflag" class="form-control" value="${PrpLisSurveyOrIntegral.rankflag}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">修改时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="operatetimeforhis" name="operatetimeforhis"  v-model="operatetimeforhis"  value="${PrpLisSurveyOrIntegral.operatetimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
				<div class="input-group-btn">
					<button class="btn btn-pick btnDatepicker" onclick="WdatePicker({el:$dp.$('operatetimeforhis'),dateFmt:'yyyy-MM-dd HH:mm:ss'})" type="button">
						<i class="fa fa-calendar"> </i>
					</button> 
				</div> 
			</div> 
       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">入库时间</label>
       <div class="col-sm-8 col-xs-12">
           			<div class="input-group">
				<input type="text" id="inserttimeforhis" name="inserttimeforhis"  v-model="inserttimeforhis"  value="${PrpLisSurveyOrIntegral.inserttimeforhis}" class="form-control datetime"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
				<div class="input-group-btn">
					<button class="btn btn-pick btnDatepicker" onclick="WdatePicker({el:$dp.$('inserttimeforhis'),dateFmt:'yyyy-MM-dd HH:mm:ss'})" type="button">
						<i class="fa fa-calendar"> </i>
					</button> 
				</div> 
			</div> 
       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">用户姓名</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="username" name="username" v-model="username" class="form-control" value="${PrpLisSurveyOrIntegral.username}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">机构编码-省级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="provincecomcode" name="provincecomcode" v-model="provincecomcode" class="form-control" value="${PrpLisSurveyOrIntegral.provincecomcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">机构编码-市级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="citycomcode" name="citycomcode" v-model="citycomcode" class="form-control" value="${PrpLisSurveyOrIntegral.citycomcode}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">排名上升标识-省级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="provinceflag" name="provinceflag" v-model="provinceflag" class="form-control" value="${PrpLisSurveyOrIntegral.provinceflag}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">排名上升标识-市级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="cityflag" name="cityflag" v-model="cityflag" class="form-control" value="${PrpLisSurveyOrIntegral.cityflag}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">排名-省级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="provinceranking" name="provinceranking" v-model="provinceranking" class="form-control" value="${PrpLisSurveyOrIntegral.provinceranking}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">排名-市级</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="cityranking" name="cityranking" v-model="cityranking" class="form-control" value="${PrpLisSurveyOrIntegral.cityranking}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">极速理赔分数</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="fastclaimscore" name="fastclaimscore" v-model="fastclaimscore" class="form-control" value="${PrpLisSurveyOrIntegral.fastclaimscore}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">年</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="year" name="year" v-model="year" class="form-control" value="${PrpLisSurveyOrIntegral.year}"/>

       </div> 
    </div> 
</div> 

<div class="col-sm-6 col-xs-12">
	<div class="form-group">
       <label class="control-label col-sm-4 col-xs-12">周</label>
       <div class="col-sm-8 col-xs-12">
           
<input type="text" id="week" name="week" v-model="week" class="form-control" value="${PrpLisSurveyOrIntegral.week}"/>

       </div> 
    </div> 
</div> 
			    </form>
            </div>
        </div>
    </div>
</div>

<script language="JavaScript">  
    var interfaceapiPrpLisSurveyOrIntegralFormConfig = {};
    var interfaceapiPrpLisSurveyOrIntegralVueForm;
    $(function () {
        interfaceapiPrpLisSurveyOrIntegralVueForm = new VueForm("interfaceapiPrpLisSurveyOrIntegralForm", interfaceapiPrpLisSurveyOrIntegralFormConfig);
    });
</script>




