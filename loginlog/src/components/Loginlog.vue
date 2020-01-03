<template>
  <div class="loginlog">
    <div class="leftTop">
        <div class="picc-leftdiv">
            <span>PICC 理赔运营指挥平台</span>
        </div>
        <ul class="tab-header">
            <li class="first-li active"><span>操作日志</span></li>
            <li class="second-li"><span>系统操作日志统计</span></li>
            <li class="thirdiy-li"><span>通报数据</span></li>
        </ul> 
        <!-- 返回 -->
        <div class="ReturnBtn">
            <span class="iconfont iconfanhui1 Returnimg"></span>返回
        </div>
    </div>
    <!-- 内容存放的 -->
     <div class="piccCenter">
        <!-- tab页  登录日志 -->
        <div class="m-box first-content active">
            <!-- 切换 -->
            <ul class="LogList_system">
                <li class="LoginLog-li active">
                    <span class="iconfont icondenglurizhi icon_Li"></span>
                    <span class="Iconli_text">登录日志</span>
                </li>
                <!-- 暂时隐藏 -->
                <!-- <li class="systemLog-li">
                    <span class="iconfont iconxitongcaozuorizhi icon_Lix1"></span>
                    <span class="Iconli_text">系统操作日志</span>
                </li> -->
            </ul>
            <!-- tab页  登录日志 内容存放 -->
            <div class="MainCenter">
                <img src="../assets/img/UpperLeft.png" class="UpperLeftImg">
                <img src="../assets/img/UpperRight.png" class="UpperRightImg">
                <img src="../assets/img/LowerLeft.png" class="LowerLeftImg">
                <img src="../assets/img/lowerRight.png" class="lowerRightIMg">
                <div class="LoginLog-box LoginLog_content active">
                    <!-- 中部左 -->
                    <div class="leftCenter">
                        <div class="listLeftCenter">
                            <div class="comTree_mechanism"><span class="mechanism_span comTree_LogListSapn">总公司</span></div>
                            <!-- 树状图 -->
                            <ul id="comTree_LogList" class="ztree" ></ul>
                        </div>
                    </div>
                    <div class="LogList">
                        <div class="LogList_X2">
                            <div class="inputCollection">
                                <span class="Tozhi-centerSpan" style="margin-top: 0px;">机构级别</span>
                                <select class="TozhiText TozhiSelect" style="margin-top: 0px;" id="Level_LogList" onchange="InitMainTable()">
                                    <option id="selectOne_LogList" value="1">总公司</option>
                                    <option id="selectTwo_LogList" value="2">省公司</option>
                                    <option id="selectThree_LogList" value="3">市公司</option>
                                    <option value="4">县机构</option>
                                </select> 
                                <!-- <div class="DIV-TozhiSelect"></div> -->
                            </div> 
                            <div class="inputCollection1">
                                <span class="dataSpan Tozhi-centerSpan">操作时间</span>
                                <div class="input-group date datepicker dataDiv datepRz" >
                                    <input type="text" id="fontData" class="form-control fontData background_addon">
                                    <div class="input-group-addon background_addon">
                                        <img src="./lib/img/data.png" style="width:19px; margin-top: 2px;">
                                    </div>
                                </div>
                                <span class="dataSpan Tozhi-centerSpan">&nbsp;-</span>
                                <div class="input-group date datepicker dataDiv datepRz">
                                    <input type="text" id="fontData2" class="form-control fontData background_addon">
                                    <div class="input-group-addon background_addon">
                                        <img src="./lib/img/data.png" style="width:19px; margin-top: 2px;">
                                    </div>
                                </div>
                            </div>
                            <div class="inputCollection">
                                <span class="Tozhi-centerSpan">操作类型</span>
                                <select  id="mainSelect" name="mainSelect" class="mainSelect caozuoleixing">
                                    <option value="0">全部</option>
                                    <option value="1">登录</option>
                                    <option value="2">登出</option>  
                                </select>
                            </div>
                            <div class="LogListBtn">
                                <span class="iconfont iconsousuo icostyle" onclick="InitMainTable()"></span>
                                <!-- <button class="BtnClass" onclick="InitMainTable()">查询</button> -->
                            </div>
                        </div>
                        <div class="LogList_X2">
                            <div class="inputCollection">
                                <span class="Tozhi-centerSpan">用户工号</span>
                                <input type="text" class="mainInput" name="" id="usercode">
                            </div>
                            <div class="inputCollection">
                                <span class="Tozhi-centerSpan">用户姓名</span>
                                <input type="text" class="mainInput" name="" id="username">
                            </div>
                            <div class="LogListBtn">
                                <span class="iconfont icondaochu icostyle" id="exportBtn"></span>
                                <!-- <button class="BtnClass exportBtn" id="exportBtn">导出</button> -->
                            </div>
                        </div>
                    </div>
                    <div class="TableDiv">
                        <table id="piccTable" class="table table-bordered center" style='table-layout:fixed;'></table>
                    </div>
                </div>
                <div class="LoginLog-box systemLog_content">系统操作日志</div>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Loginlog',
  data () {
    return {
    
    }
  }
}
</script>
<style scoped>
/* css 很多 采用 引入css文件的方式 不然vue看起来有些乱 */
  @import '/lib/loginlog.css';
</style>
