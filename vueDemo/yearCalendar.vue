<template>
  <el-container class="the_yearCalendar" direction="vertical" v-midea-autoheight="{
    tabs:true}">
    <el-main>
      <main-header>
        <template slot="left">{{$t('yearCalendar.title')}}</template>
        <template slot="right">
          <el-button type="primary" size="mini" @click="getYear">{{$t('common.search')}}</el-button>
          <el-button type="primary" size="mini" @click="onSubmit">休日设定</el-button>
        </template>
      </main-header>
      <el-row>
        <el-col :span="6">
          <el-select v-model="whichYear" placeholder="请选择対象年" @change="getYear">
            <el-option
              v-for="item in yearList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <p><span style="background: #f43;"> [星] </span>表示星期日(SUN)---<span style="background: lightblue;"> [节] </span>表示节假日（HOLIDAY）----<span style="background: pink;"> [休] </span>表示休息日（REST）</p>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>

      <hr>
      <div id="showCalendar">
        <div class="wraper" v-for="(tabItem,tabKey) in 12" :key="tabKey"><span>{{whichYear}}年{{tabItem}}月</span><table><thead>
        <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
        </thead><tbody class="contextFull">
        <tr v-for="(trItem,trKey) in 6" :key="trKey">
          <td v-for="(tdItem,tdKey) in 7" :key="tdKey" >
            <span class="showIcon1" v-if="(tdItem%7===0||tdItem%7===1)&&(((((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay()))>0 && (((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay())) <=(new Date(whichYear, tabItem, 0).getDate()) ))">星</span>
            <span class="showDate">{{ ((((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay()))>0 && (((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay())) <=(new Date(whichYear, tabItem, 0).getDate()) ) ? (((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay())) :''}}</span>
            <el-select v-if="(((((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay()))>0 && (((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay())) <=(new Date(whichYear, tabItem, 0).getDate()) ))"
                       v-model="dayCalendarType[`${whichYear}-${tabItem}-${((((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay())))}`]" placeholder=""
                       @change="getDaysCalendarType(`${whichYear}-${tabItem}-${((((trItem-1)*7 + tdItem) -(new Date(whichYear, tabItem-1, 1).getDay())))}`)">
              <el-option
                v-for="item in calendarTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
        </tbody></table></div>
      </div>

      <hr>


    </el-main>
  </el-container>

</template>

<script>
  import {http, local} from '@/portal/utils/http'
  import MainHeader from "@/portal/components/MainHeader"

  /**
   * 分装的方法---获取生成table日历表格
   */
  ////获取一个月的一号是周几？？
  function getFirstDayOFMonth(yyyy,mm){
    return new Date(yyyy, mm-1, 1).getDay()
  }

  //获取一个月有几天？
  function mGetDate(year, month){
    let d = new Date(year, month, 0);
    return d.getDate();
  }


  export default {
    name: "yearCalendar",
    components:{
      MainHeader,
    },
    data(){
      let emptyYearList =[], thisYYYY = new Date().getFullYear();
      for(let i=-5;i<5;i++){
        emptyYearList.push({
          label: thisYYYY +i,value: thisYYYY +i
        })
      }
      return{
        whichYear:'2019',
        yearList: emptyYearList,
        yearCalendarList:'',
        calendarType: '',
        dayCalendarType: {},
        calendarTypeList:'',
        dataTypeList:[],

        daysunList:[],
        dayrestList:[],
        dayholidayList:[]

      }
    },
    methods:{
      onSubmit(){
        if(!this.dataTypeList.length) return;
        debugger
        // return
        http({      //保存方法
          url: "/isales-mst/mstCommonCalendar/save",
          method: 'post',
          data: {
            "updateList": this.dataTypeList
          }
        }).then(data => {
          console.log(data);
        }).catch(err => {
          console.log(err);
        });

      },

      getYear(){
        if(!this.whichYear){
          this.$mideaMessage({
            type:'info',
            message: `请选择年!`
          });
          return;
        }
        http({      //查询年休日list
          url: "/isales-mst/mstCommonCalendar/queryList",
          method: 'post',
          data: {
            "yearVal": this.whichYear
          }
        }).then(data => {
          /**
           * 过滤出休日的数据，星期日的数据
           */
          let sunList = data.filter(v=>(v.dateType=='SUN'));        //SUN----星期日
          let restList = data.filter(v=>(v.dateType=='REST'));       //REST---休息日
          let holidayList = data.filter(v=>(v.dateType=='HOLIDAY'));//HOLIDAY---节假日
          //
          this.daysunList = sunList.map(v=>(v.calendarDate.slice(0,10)));
          this.dayrestList = restList.map(v=>(v.calendarDate.slice(0,10)));
          this.dayholidayList = holidayList.map(v=>(v.calendarDate.slice(0,10)));
          this.yearCalendarList = data.slice(0);
          debugger
        }).catch(err => {
          console.log(err);
        });

      },
      getDaysCalendarType(whichDay){
        this.dataTypeList =[];
        Object.keys( this.dayCalendarType).forEach(v=>{
          this.dataTypeList.push({
            dateType: this.dayCalendarType[v],
            calendarDate: v
          });
        });
        // debugger
      },
    },
    //加载国际化语言
    beforeCreate(){
      const lang = this.$i18n.locale
      const locals = require(`./locals/${this.$options.name}_${lang}`).default
      this.$i18n.mergeLocaleMessage(lang, locals);
      this.$getLovValues('CALENDAR_TYPE').then((data)=> {
        this.calendarTypeList = data.CALENDAR_TYPE.slice(0);
        this.calendarTypeList.push({label:'无',value:'1'});
      });
    },
    created(){

    }
  }
</script>
<style scoped lang="scss">
.the_yearCalendar /deep/{
  #showCalendar{
    width: 100%;
    min-width: 1450px;
    overflow: auto;
    margin: 0 auto;
  }
  .el-input{
    width: 150px;
  }
  .el-textarea__inner{
    width: 380px;
  }
  .wraper{
    float: left; padding: 3px;text-align: center;
  }
  .wraper  table {
    margin: 0 auto;border-collapse: collapse;
  }
  .wraper  table th,
  .wraper  table td {
    border: 1px solid #409EFF;
    width: 50px;text-align: center;
  }
  .wraper  table td:hover{
    background: #fb0;
  }
  .wraper  table th {
    height: 40px;
    background: #ccc;
  }
  .wraper  table td {
    height: 50px;font-size: 12px;
    position: relative;
  }

  .wraper  table .bgPink {
    background: pink;
  }
  .wraper  table .bgLightblue {
     background: lightblue;
  }
  .wraper  table .bgGreen {
      background: #409EFF;
  }

  .wraper table td .showIcon1{
    position: absolute;top: 0;left: 0;display: block;
    width: 15px; height:15px;
    background: #f43;
    color: #fff;
  }
  .wraper table td .showDate{
    font-size: 14px;line-height: 26px;
  }
  .wraper table .bgGreen span{
    position: absolute;top: 0;left: 0;display: block;
    width: 15px; height:15px;
    background: #969799;
    color: #fff;
  }

  .wraper table td .el-input{
    width: 40px;
  }
  .wraper table td .el-input .el-input__inner{
    padding-right: 15px;height: 20px;
  }
  .wraper table td .el-input .el-input__suffix{
    right: 0;
  }
  .wraper table td .el-input .el-input__suffix .el-input__icon{
    line-height: 20px;
   }
}
</style>


