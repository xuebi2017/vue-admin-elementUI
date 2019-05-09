<template>
  <section class="container">
    <div class="tool-bar">
      <!-- <filterable-select
        :placeholder="placeholder[0]"
        :options="planNum"
        @optionChange="planNumChange()"
      ></filterable-select>-->
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
    <div class="page-content">
      <el-table
        ref="multipleTable"
        :data="deliveryStateData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column label="创建时间" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.creationTime }}</template>
        </el-table-column>
        <!-- <el-table-column label="计划编号" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.planId }}</template>
        </el-table-column> -->
        <el-table-column label="发货状态" align="center">
          <el-table-column prop="deliveryStates.cargoSpecifications" label="货物规格" align="center"></el-table-column>
          <el-table-column label="运输方式" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" size="small" plain>{{scope.row.deliveryStates.logisticsMode}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="deliveryStates.hasDelivered" label="已发(吨)" align="right"></el-table-column>
          <el-table-column prop="deliveryStates.noDelivered" label="未发(吨)" align="right">
            <template slot-scope="scope">{{scope.row.deliveryStates.noDelivered}}</template>
          </el-table-column>
        </el-table-column>

        <el-table-column prop="receivingUnit" label="收货单位" align="center"></el-table-column>
        <el-table-column label="计划是否完成" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.ifComplete == 0" disable-transitions>否</el-tag>
            <el-tag type="success" v-if="scope.row.ifComplete == 1" disable-transitions>是</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="record">
            <!-- <el-button type="primary" size="small" plain @click="editRow(record)">编辑</el-button> -->
            <a-popconfirm title="确定要将这条纪录设为已完成吗?" @confirm="confirmComplete(record)" @cancel="cancelComplete(record)" okText="是" cancelText="否">
              <el-button type="warning" size="small" plain>完成</el-button>
            </a-popconfirm>
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
        :total="5"
      ></el-pagination>
    </div>
    <row-add :modalVisible="addRowVisible" @changeAddRowVisible="changeAddRowVisible"></row-add>
    <!-- <delivery-edit
      :modalVisible="editDataVisible"
      :rowData="rowData"
      :index="index"
      @changeEditDataVisible="changeEditDataVisible"
    ></delivery-edit> -->
  </section>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { eventBus, notifyOffset } from '@/utils/eventBus';
import { disabledFromToday, isPlainObject } from '@/utils';
import { deliveryStateData, planNum } from './data';
import rowAdd from './rowAdd.vue';
import deliveryEdit from './deliveryEdit.vue';

const queryParams = {
  limit: 10,
  pageIndex: 1,
  date: ''
};

export default {
  meta: {
    can: 'view 老虎垅磅房数据'
  },
  // inject: ['reload'],
  data() {
    return {
      deliveryStateData,
      title: '发货状态管理',
      placeholder: ['选择计划编号'],
      planNum: planNum,
      addRowVisible: false,
      editDataVisible: false,
      queryParams,
      notifyInstance: {},
      loading: false,
      rowData: {},
      index: 0
    };
  },
  components: {
    rowAdd,
    deliveryEdit
  },
  computed: {
    ...mapState({
      // deliveryRecords: state => state.weighManage.deliveryRecords,
      // total: state => state.weighManage.deliveryRecordsTotal
    })
  },
  mounted() {
    // this.getPageData();
    eventBus.$on('notify', ({ title, message, type }) => {
      this.notifyInstance = this.$notify[type]({
        title,
        message,
        offset: notifyOffset
      });
    });
  },
  beforeDestroy() {
    !isPlainObject(this.notifyInstance) && this.notifyInstance.close();
    eventBus.$off('notify');
  },
  methods: {
    moment,
    disabledDate: disabledFromToday,
    getPageData(currentPage) {
      this.loading = true;
      this.queryParams.pageIndex = currentPage || this.queryParams.pageIndex;
      this.$store
        .dispatch('weighManage/getDeliveryRecords', this.queryParams)
        .then(() => {
          this.loading = false;
        });
    },
    dateChange(val) {
      if (val) {
        this.queryParams.date = val.format('YYYY-MM-DD');
      } else {
        this.queryParams.date = '';
      }
    },
    planNumChange() {},
    handleSelectionChange() {},
    addRow() {
      this.addRowVisible = true;
    },
    search() {
      this.getPageData();
    },
    refresh() {
      this.queryParams.date = '';
      this.queryParams.pageIndex = 1;
      // this.reload();
    },
    // editRow(record) {
    //   this.rowData = record;
    //   this.index = record.$index
    //   this.editDataVisible = true;
    // },
    confirm(record) {
      console.log('record1111', record);
      let deleteData = {};
      deleteData.missionId = record.row.missionId;
      deleteData.index = record.$index;
      this.$store.dispatch('weighManage/deleteDeliveryRecords', deleteData);
    },
    confirmComplete(record) {
      console.log('record---->',record)
      let editData = {missionId: record.row.missionId, isCompleted: true, index: record.$index}
      this.$store.dispatch('weighManage/updateDeliveryRecords', editData)
    },
    cancelComplete(record) {
      let editData = {missionId: record.row.missionId, isCompleted: false, index: record.$index}      
      this.$store.dispatch('weighManage/updateDeliveryRecords', editData)
    },
    changeAddRowVisible(val) {
      this.addRowVisible = val;
    },
    changeEditDataVisible(val) {
      this.editDataVisible = val;
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
