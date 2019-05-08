<template>
  <section class="container">
    <div class="tool-bar">
      <!-- <el-select v-model="value1" filterable placeholder="选择司磅员">
        <el-option
          v-for="item in weighingClerk"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <a-date-picker
        size="large"
        @change="dateChange"
        placeholder="请选择日期"
        :disabledDate="disabledDate"
        :showToday="false"
      />
      <!-- <el-select v-model="value2" filterable placeholder="选择车号">
        <el-option v-for="item in carNum" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <filterable-select
        :placeholder="palceholder[0]"
        :options="planNum"
        @optionChange="optionChange1()"
      ></filterable-select>-->
      <div class="tool-bar-button-group">
        <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
        <!-- <el-button v-can:edit="'地磅数据'" icon="el-icon-plus" type="warning" @click="weighAdd">新增</el-button> -->
      </div>
    </div>
    <div class="page-content">
      <el-table
        border
        ref="multipleTable"
        :data="weighData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column label="过磅日期" align="center">
          <template slot-scope="scope">{{ scope.row.shippingTime }}</template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="司磅员" align="center"></el-table-column> -->
        <!-- <el-table-column label="运输方式" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" disable-transitions>{{scope.row.transportationType}}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="carCode" label="车号" align="center"></el-table-column>
        <el-table-column prop="cargoSpecifications" label="矿石规格" align="center"></el-table-column>
        <el-table-column prop="grossWeight" label="毛重" align="center"></el-table-column>
        <el-table-column prop="tare" label="皮重" align="center"></el-table-column>
        <el-table-column prop="netWeight" label="净重" align="center"></el-table-column>
        <el-table-column prop="receivingCompany" label="收货单位" align="center"></el-table-column>
        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain>详细</el-button>
          </template>
        </el-table-column>-->
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
  </section>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { eventBus, notifyOffset } from '@/utils/eventBus';
import { disabledFromToday, isPlainObject } from '@/utils';
import filterableSelect from '@/components/common/filterableSelect.vue';
import { weighingClerk, carNum, planNum } from './data';

const queryParams = {
  limit: 10,
  pageIndex: 1,
  date: ''
};

export default {
  name: 'weigh-query',
  meta: {
    can: 'view 老虎垅磅房数据'
  },
  data() {
    return {
      title: '过磅数据管理',
      palceholder: ['选择计划编号'],
      weighingClerk: weighingClerk,
      carNum: carNum,
      planNum: planNum,
      value1: '',
      value2: '',
      value3: '',
      multipleSelection: '',
      queryParams: queryParams,
      notifyInstance: {},
      loading: false
    };
  },
  components: {
    filterableSelect
  },
  computed: {
    ...mapState({
      weighData: state => state.weighManage.WeighRecords,
      total: state => state.weighManage.weighRecordsTotal
    })
  },
  mounted() {
    this.getPageData();
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
        .dispatch('weighManage/getWeighRecords', this.queryParams)
        .then(() => {
          this.loading = false;
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    search() {
      this.getPageData()
    },
    dateChange(val) {
      if (val) {
        this.queryParams.date = val.format('YYYY-MM-DD');
      } else {
        this.queryParams.date = '';
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    optionChange1(data) {
      this.value3 = data;
    },
    weighAdd() {
      let weighAddUrl = '/weighManage/weighAdd';
      this.$router.push({
        path: weighAddUrl
      });
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

<style scoped>
</style>
