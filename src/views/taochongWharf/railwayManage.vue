<template>
  <section class="container">
    <div class="tool-bar">
      <!-- <a-date-picker
        size="large"
        @change="dateChange"
        placeholder="请选择日期"
        :disabledDate="disabledDate"
        :showToday="false"
      />-->
      <div class="tool-bar-button-group">
        <!-- <el-button icon="el-icon-search" type="primary">查询</el-button> -->
        <el-button icon="el-icon-plus" type="warning" @click="addRow">新增</el-button>
        <el-button icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </div>
    </div>
    <div class="page-content">
      <!-- :defaultExpandedRowKeys="defaultExpandedRowKeys" defaultExpandAllRows :expandedRowKeys="expandedRowKeys"  :expandRowByClick="true" :pagination="pagination" -->
      <!-- @expandedRowsChange="expandedRowsChange"
      :expandedRowRender="expandedRowRender"-->
      <a-table
        :columns="columns"
        :dataSource="data"
        :loading="loading"
        class="components-table-demo-nested"
        bordered
        @expand="expand"
        :expandedRowKeys="expandedRowKeys"
        @expandedRowsChange="expandedRowsChange"
        :pagination="false"
        :locale="locale"
      >
        <span slot="isCompleted" slot-scope="text, record, index, expanded">
          <el-tag
          v-if="record.isCompleted"
            type="success"
            plain
            size="mini"
          >是</el-tag>
          <el-tag v-else-if="!record.isCompleted"
            type="danger"
            plain
            size="mini"
          >否</el-tag>
        </span>
        <span slot="operation" slot-scope="text, record, index, expanded" class="table-operation">
          <el-button
            type="warning"
            @click="() => {addData(text, record, index, expanded)}"
            plain
            size="mini"
            icon="el-icon-plus"
            @expand="expand"
          >新增</el-button>
          <el-button
            type="primary"
            @click="() => {editRow(record, index)}"
            plain
            size="mini"
            icon="el-icon-edit"
          >编辑</el-button>
          <a-popconfirm
            title="确定要删除这条纪录么?"
            @confirm="confirmDeleteRow(record, index)"
            okText="是"
            cancelText="否"
          >
            <el-button type="danger" size="mini" plain icon="el-icon-delete">删除</el-button>
          </a-popconfirm>
        </span>
        <a-table
          slot="expandedRowRender"
          slot-scope="record, index, indent, expanded"
          :columns="innerColumns"
          :dataSource="record.innerData"
          :pagination="false"
          :locale="locale"
        >
          <span slot="operation" slot-scope="text, record, index" class="table-operation">
            <el-button
              type="primary"
              @click="() => { editData(record, index) }"
              plain
              size="mini"
              icon="el-icon-edit"
            >编辑</el-button>
            <a-popconfirm
              title="确定要删除这条纪录么?"
              @confirm="confirmDeleteData(record, index)"
              okText="是"
              cancelText="否"
            >
              <el-button type="danger" size="mini" plain icon="el-icon-delete">删除</el-button>
            </a-popconfirm>
          </span>
        </a-table>
      </a-table>
      <a-pagination
        :showTotal="total => `共 ${total} 条`"
        size="small"
        :total="total"
        v-model="current"
        :pageSize.sync="pageSize"
        @change="handleCurrentChange"
      />
    </div>
    <railway-add-edit
      :modalVisible="addDataVisible"
      :missionId="missionId"
      :keyName="key"
      :isEdit="isEdit"
      :index="index"
      :innerDataIndex="innerDataIndex"
      :recordData="recordData"
      @changeAddDataVisile="changeAddDataVisible"
      @expandRow="expandRow"
    ></railway-add-edit>
    <row-add :modalVisible="addRowVisible" @changeAddRowVisible="changeAddRowVisible"></row-add>
    <row-edit
      :modalVisible="editRowVisible"
      :missionId="missionId"
      :index="rowIndex"
      :rowData="rowData"
      @changeEditRowVisible="changeEditRowVisible"
    ></row-edit>
  </section>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { eventBus, notifyOffset } from '@/utils/eventBus';
import { isPlainObject } from '@/utils';
import railwayAddEdit from './railwayAddEdit.vue';
import rowEdit from './rowEdit.vue';
import rowAdd from './rowAdd.vue';

const columns = [
  { title: '船号', dataIndex: 'shipCode', key: 'shipCode' },
  { title: '车数', dataIndex: 'truckCount', key: 'truckCount' },
  { title: '计划发运量(t)', dataIndex: 'totalAmount', key: 'totalAmount' },
  {
    title: '铁矿石规格',
    dataIndex: 'transportationPlan.cargoSpecification',
    key: 'transportationPlan.cargoSpecification'
  },
  { title: '回收重量(t)', dataIndex: 'recoveryAmount', key: 'recoveryAmount' },
  {
    title: '平均水尺(m)',
    dataIndex: 'avgWaterGauge',
    key: 'avgWaterGauge'
  },
  // { title: '任务是否完成', dataIndex: 'isCompleted', key: 'isCompleted' },
  // { title: '折重量(t)', dataIndex: 'actualAmount', key: 'actualAmount' },
  {
    title: '计划是否完成',
    key: 'isCompleted',
    scopedSlots: { customRender: 'isCompleted' }
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
];
const innerColumns = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '司机', dataIndex: 'trainDriver', key: 'trainDriver' },
  { title: '班次', dataIndex: 'shift', key: 'shift' },
  // {
  //   title: '铁矿石规格',
  //   dataIndex: 'cargoSpecification',
  //   key: 'cargoSpecification'
  // },
  { title: '车数', dataIndex: 'carriageNumber', key: 'carriageNumber' },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
];

const queryParams = {
  limit: 10,
  pageIndex: 1
};

export default {
  meta: {
    can: 'view 荻港码头数据'
  },
  name: 'railwaydata-manage',
  inject: ['reload'],
  data() {
    return {
      title: '铁运数据管理',
      columns,
      innerColumns,
      addDataVisible: false,
      editRowVisible: false,
      addRowVisible: false,
      missionId: 0,
      key: 0,
      rowIndex: 0,
      isEdit: false,
      index: 0,
      innerDataIndex: 0,
      expandRowId: 0,
      expandedRowKeys: [],
      recordData: {},
      rowData: {},
      queryParams: queryParams,
      current: queryParams.pageIndex,
      pageSize: queryParams.limit,
      locale: { emptyText: '暂无数据' },
      notifyInstance: {},
      loading: false
    };
  },
  props: {},
  components: {
    railwayAddEdit,
    rowEdit,
    rowAdd
  },
  mounted() {
    this.getPageData();
    eventBus.$on('notify', notification => {
      this.notifyInstance = this.$notify[notification.type]({
        title: notification.title,
        message: notification.message,
        offset: notifyOffset
      });
    });
  },
  beforeDestroy() {
    !isPlainObject(this.notifyInstance) && this.notifyInstance.close();
    eventBus.$off('notify');
  },
  computed: {
    ...mapState({
      data: state => state.railwayManage.railwayData,
      total: state => state.railwayManage.railwayDataTotal
    })
  },
  methods: {
    moment,
    getPageData(currentPage) {
      this.loading = true;
      this.queryParams.pageIndex = currentPage || this.queryParams.pageIndex;
      this.$store
        .dispatch('railwayManage/getRailwayData', this.queryParams)
        .then(() => {
          this.loading = false;
        });
    },
    dateChange() {},
    disabledDate(current) {
      return current && current > moment().endOf('day');
    },
    addData(text, record, index, expanded) {
      this.isEdit = false;
      this.expandRowId = index;
      this.index = index;
      this.missionId = record.missionId;
      this.recordData = {};
      this.addDataVisible = true;
    },
    editData(record, index) {
      this.isEdit = true;
      this.innerDataIndex = index;
      this.index = this.getCurExpandId(record);
      this.missionId = record.missionId;
      this.recordData = record;
      this.addDataVisible = true;
    },
    addRow() {
      this.addRowVisible = true;
    },
    editRow(record, index) {
      console.log('record--->',record)
      this.missionId = record.missionId;
      this.rowIndex = index;
      this.rowData = record;
      this.editRowVisible = true;
    },
    deleteRow() {},
    changeAddDataVisible(val) {
      this.addDataVisible = val;
    },
    changeEditRowVisible(val) {
      this.editRowVisible = val;
    },
    changeAddRowVisible(val) {
      this.addRowVisible = val;
    },
    refresh() {
      this.queryParams.date = '';
      this.queryParams.pageIndex = 1;
      // this.getPageData();
      this.reload();
    },
    expandRow(expandRowId) {
      this.expandedRowKeys.push(expandRowId);
    },
    //点击加减号返回对应的expand属性和record数据
    expand(expanded, record) {
      this.getCurExpandId(record);
      let params = { index: this.expandRowId, missionId: record.missionId };
      if (expanded) {
        this.$store.dispatch('railwayManage/getSubTableData', params);
      }
    },
    //获取展开的行index
    getCurExpandId(record) {
      let data = this.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].missionId === record.missionId) {
          this.expandRowId = i;
          return i;
        }
      }
    },
    // getCurMissionIndex(record) {
    //   let data = this.data;
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].missionId === record.missionId) {
    //       return i;
    //       break;
    //     }
    //   }
    // },
    expandedRowsChange(expandedRows) {
      this.expandedRowKeys = [...expandedRows];
    },
    confirmDeleteRow(record, index) {
      let deleteRow = {};
      deleteRow.index = index;
      deleteRow.missionId = record.missionId;
      this.$store.dispatch('railwayManage/deleteRow', deleteRow);
    },
    confirmDeleteData(record, index) {
      let deleteData = {};
      deleteData.innerDataIndex = index;
      deleteData.index = this.getCurExpandId(record);
      deleteData.missionId = record.missionId;
      deleteData.recordId = record.recordId;
      this.$store.dispatch('railwayManage/deleteSubTableData', deleteData);
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
