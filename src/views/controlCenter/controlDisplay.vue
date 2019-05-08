<template>
  <section class="container">
    <div class="tool-bar">
      <a-date-picker
        size="large"
        @change="dateChange"
        placeholder="请选择日期"
        :disabledDate="disabledDate"
        :showToday="false"
        :defaultValue="moment()"
      />
      <div class="tool-bar-button-group">
        <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <div class="page-content" style="margin-top: -16px;">
      <el-tag size="small" style="margin-bottom: 6px;float: right;margin-right: 1%">日期：{{queryParams.date}}</el-tag>
      <el-table
        :data="displayData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="oreType" label="矿石种类" width="180"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="dayPlan" label="日计划" align="right"></el-table-column>
        <el-table-column prop="dayCompletion" label="日完成" align="right"></el-table-column>
        <el-table-column prop="dayDifference" label="日超差" align="right"></el-table-column>
        <el-table-column prop="totalPlan" label="累计计划" align="right"></el-table-column>
        <el-table-column prop="totalCompletion" label="累计完成" align="right"></el-table-column>
        <el-table-column prop="totalDifference" label="累计超差" align="right"></el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { eventBus, notifyOffset } from '@/utils/eventBus';
import { disabledFromToday, isPlainObject } from '@/utils';
const queryParams = {
  date: moment().format('YYYY-MM-DD')
};
export default {
  meta: {
    can: 'view 桃冲矿调度数据'
  },
  name: 'control-display',
  data() {
    return {
      title: '调度信息管理',
      queryParams,
      loading: false
    };
  },
  props: {},
  computed: {
    ...mapState({
      displayData: state => state.controlDisplay.displayData
    })
  },
  mounted() {
    this.getData();
    eventBus.$on('notify', ({ title, message, type }) => {
      this.notifyInstance = this.$notify[type]({
        title,
        message,
        offset: notifyOffset
      });
    });
  },
  beforeDestory() {
    !isPlainObject(this.notifyInstance) && this.notifyInstance.close();
    eventBus.$off('notify');
  },
  methods: {
    moment,
    disabledDate: disabledFromToday,
    getData() {
      this.loading = true;
      this.$store
        .dispatch('controlDisplay/getDisplayData', this.queryParams)
        .then(() => {
          this.loading = false;
        });
    },
    dateChange(date, dateStr) {
      this.queryParams.date = dateStr;
    },
    search() {
      this.getData();
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 9,
            colspan: 1
          };
        } else if (rowIndex === 9) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>
<style lang='scss' scoped>
</style>
