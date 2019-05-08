<template>
  <section class="container">
    <div class="tool-bar">
      <a-month-picker
        size="large"
        @change="dateChange"
        placeholder="请选择日期"
        :disabledDate="disabledDate"
      />
      <div class="tool-bar-button-group">
        <el-button icon="el-icon-search" type="primary">查询</el-button>
      </div>
    </div>
    <div class="page-content">
      <el-table :data="tableData" border show-summary style="width: 100%">
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="date" label="时间" width="150"></el-table-column>
        <el-table-column prop="shippingNum" label="船号" width="180"></el-table-column>
        <el-table-column prop="shippingTon" label="吨位" align="right"></el-table-column>
        <el-table-column label="矿石发运" width="800" align="center">
          <el-table-column prop="lumpOre" sortable label="块矿" align="right"></el-table-column>
          <el-table-column prop="concentrateOre" sortable label="精矿" align="right"></el-table-column>
          <el-table-column prop="fineOre" sortable label="粉矿" align="right"></el-table-column>
        </el-table-column>
        <el-table-column prop="TycarNums" sortable label="桃运车数" align="right"></el-table-column>
        <el-table-column prop="recoveryWeight" sortable label="回收吨位" align="right"></el-table-column>
        <el-table-column prop="stowWeight" sortable label="堆装吨位" align="right"></el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
import moment from 'moment'
export default {
  meta: {
    can: 'view 荻港码头数据'
  },
  name: 'shipping-data',
  data() {
    return {
      title: '船舶动态数据',
      tableData: [
        {
          id: '1',
          date: '2019-03-05',
          shippingNum: '宣城货3690',
          shippingTon: '2443',
          lumpOre: '',
          concentrateOre: '',
          fineOre: '2443',
          TycarNums: '113',
          recoveryWeight: '50',
          stowWeight: ''
        },
        {
          id: '2',
          date: '2019-03-08',
          shippingNum: '江海通278',
          shippingTon: '1778',
          lumpOre: '',
          concentrateOre: '',
          fineOre: '1778',
          TycarNums: '85',
          recoveryWeight: '80',
          stowWeight: ''
        },
        {
          id: '3',
          date: '2019-03-10',
          shippingNum: '宣城货3469',
          shippingTon: '2719',
          lumpOre: '',
          concentrateOre: '2719',
          fineOre: '',
          TycarNums: '132',
          recoveryWeight: '150',
          stowWeight: ''
        },
        {
          id: '4',
          date: '2019-03-13',
          shippingNum: '宣城货3690',
          shippingTon: '2443',
          lumpOre: '',
          concentrateOre: '2443',
          fineOre: '',
          TycarNums: '88',
          recoveryWeight: '140',
          stowWeight: ''
        },
        {
          id: '5',
          date: '2019-03-15',
          shippingNum: '鸿达3468',
          shippingTon: '2848',
          lumpOre: '',
          concentrateOre: '',
          fineOre: '2848',
          TycarNums: '108',
          recoveryWeight: '80',
          stowWeight: ''
        }
      ]
    }
  },
  props: {},
  computed: {},
  methods: {
    moment,
    disabledDate(current) {
      return current && current > moment().endOf('day')
    },
    dateChange() {}
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
