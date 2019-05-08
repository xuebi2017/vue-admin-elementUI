<template>
  <section class="container">
    <div class="tool-bar">
      <a-date-picker
        size="large"
        @change="dateChange"
        placeholder="请选择日期"
        :disabledDate="disabledDate"
        :showToday="false"
      />
      <div class="tool-bar-button-group">
        <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
        <el-button icon="el-icon-plus" type="warning" @click="addRow">新增</el-button>
        <el-button icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </div>
    </div>
    <!-- element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"-->
    <div class="page-content">
      <el-table :data="planData" style="width: 100%" border v-loading="loading">
        <el-table-column label="时间" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="planId" label="计划编号" align="center"></el-table-column>
        <el-table-column prop="oreType" label="矿石种类" align="center"></el-table-column>
        <el-table-column prop="cargoSpecification" label="矿石规格" align="center"></el-table-column>
        <el-table-column prop="receivingCompany" label="收货单位" align="center"></el-table-column>
        <el-table-column prop="shippingAmount" label="发货总量(t)" align="center"></el-table-column>
        <el-table-column label="运输方式" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" disable-transitions>{{scope.row.transportationType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="shipCode" label="船号" align="center"></el-table-column>
        <el-table-column label="计划是否已完成" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isCompleted" type="success" size="small" plain>是</el-tag>
            <el-tag  v-else-if="!scope.row.isCompleted" type="danger" size="small" plain>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="record">
            <el-button type="primary" size="small" plain @click="editRow(record)">编辑</el-button>
            <a-popconfirm title="确定要删除这条纪录么?" @confirm="confirm(record)" okText="是" cancelText="否">
              <el-button type="danger" size="small" plain>删除</el-button>
            </a-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageIndex"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="queryParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <sales-plan-add-edit
      :modalVisible="addDataVisible"
      :rowData="rowData"
      :isEdit="isEdit"
      :index="index"
      @changeAddDataVisile="changeAddDataVisible"
    ></sales-plan-add-edit>
  </section>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { eventBus, notifyOffset } from '@/utils/eventBus';
import { disabledFromToday, isPlainObject } from '@/utils';
import salesPlanAddEdit from './salesPlanAddEdit.vue';

const queryParams = {
  limit: 10,
  pageIndex: 1,
  date: ''
};

export default {
  meta: {
    can: 'view 桃冲矿销售数据'
  },
  name: 'sales-plan-manage',
  inject: ['reload'],
  data() {
    return {
      title: '销售计划管理',
      addDataVisible: false,
      rowData: {},
      queryParams: queryParams,
      loading: false,
      isEdit: false,
      index: 0,
      notifyInstance: {},
    };
  },
  props: {},
  components: {
    salesPlanAddEdit
  },
  computed: {
    ...mapState({
      planData: state => state.salesPlanManage.salesPlanData,
      total: state => state.salesPlanManage.total
    })
  },
  mounted() {
    this.getPageData();
    eventBus.$on('notify', ({title, message, type}) => {
      this.notifyInstance = this.$notify[type]({
        title,
        message,
        offset: notifyOffset
      })
    })
  },
  beforeDestory() {
    !isPlainObject(this.notifyInstance) && this.notifyInstance.close();
    eventBus.$off('notify')
  },
  methods: {
    moment,
    disabledDate: disabledFromToday,
    getPageData(currentPage) {
      this.loading = true;
      this.queryParams.pageIndex = currentPage || this.queryParams.pageIndex;
      this.$store
        .dispatch('salesPlanManage/getSalesPlanData', this.queryParams)
        .then(() => {
          this.loading = false;
        });
    },
    search() {
      this.getPageData();
    },
    addRow() {
      this.isEdit = false;
      this.rowData = {};
      this.addDataVisible = true;
    },
    editRow(record) {
      this.isEdit = true;
      this.index = record.$index;
      this.rowData = record.row;
      this.rowData.oreTypeAndSpecifications = [
        record.row.oreType,
        record.row.cargoSpecification
      ];
      this.addDataVisible = true;
    },
    dateChange(val) {
      if (val) {
        this.queryParams.date = val.format('YYYY-MM-DD');
      } else {
        this.queryParams.date = '';
      }
    },
    changeAddDataVisible(val) {
      this.addDataVisible = val;
    },
    refresh() {
      this.queryParams.date = '';
      this.queryParams.pageIndex = 1;
      // this.getPageData();
      this.reload();
    },
    confirm(record) {
      let delData = {};
      delData.planId = record.row.planId;
      delData.index = record.$index;
      this.$store.dispatch('salesPlanManage/deleteSalesPlanData', delData);
    },
    handleSizeChange(val) {
      this.queryParams.limit = val;
      this.getPageData();
    },
    handleCurrentChange(val) {
      this.queryParams.pageIndex = val;
      this.getPageData(val);
    }
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>
<style lang='scss'>
</style>
