<template>
  <a-modal
    :title="modalTitle"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :width="800"
  >
    <a-form :form="form">
      <a-row>
        <a-col :span="12">
          <a-form-item label="计划时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker
              placeholder="请选择日期"
              :disabledDate="disabledDate"
              :showToday="false"
              v-decorator="[
              'date',
              { initialValue: moment(rowData.date) || moment(), rules: [{ required: true, message: '请输入计划时间!' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="矿石种类/规格" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-cascader
              :options="oreTypeAndSpecifications"
              placeholder="请选择矿石种类/规格"
              changeOnSelect
              v-decorator="[
              'oreTypeAndSpecifications',
              { initialValue: rowData.oreTypeAndSpecifications, rules: [{ required: true, message: '请输入矿石种类!' }]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="发货总量(t)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input-number
              style="width:100%"
              placeholder="请输入发货总量"
              v-decorator="[
              'shippingAmount',
              {initialValue: rowData.shippingAmount, rules: [{ required: true, message: '请输入发货总量!' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="运输方式" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select
              placeholder="请选择运输方式"
              v-decorator="[
          'transportationType',
          {initialValue: rowData.transportationType, rules: [{ required: true, message: '请选择运输方式!' }]}
        ]"
            >
              <a-select-option
                v-for="item in transportationType"
                :key="item.value"
                :value="item.label"
              >{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="收货单位" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-auto-complete
              :dataSource="receivingCompany"
              placeholder="请输入收货单位"
              :filterOption="filterOption"
              v-decorator="[
              'receivingCompany',{ initialValue: rowData.receivingCompany,rules: [{ required: true, message: '请输入收货单位!' }] }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="船号" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-auto-complete
              :dataSource="shipCodes"
              placeholder="请输入船号"
              :filterOption="filterOption"
              v-decorator="[
              'shipCode',{ initialValue: rowData.shipCode }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">确定</a-button>
    </template>
  </a-modal>
</template>
<script>
import {
  receivingCompany,
  shipCodes,
  oreTypeAndSpecifications,
  transportationType
} from '../data';
import moment from 'moment';
import { disabledBeforeToday } from '@/utils';
export default {
  name: 'delivery-edit',
  data() {
    return {
      shipCodes,
      receivingCompany,
      transportationType,
      oreTypeAndSpecifications,
      visible: this.modalVisible,
      confirmLoading: false,
      form: this.$form.createForm(this),
      modalTitle: '编辑'
    };
  },
  props: ['modalVisible', 'rowData', 'isEdit', 'index'],
  watch: {
    modalVisible(val) {
      this.visible = val;
    },
  },
  computed: {},
  components: {},
  methods: {
    moment,
    disabledDate: disabledBeforeToday,
    handleCancel() {
      this.visible = false;
      this.$emit('changeEditDataVisible', this.visible);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = values;
          data.date = values.date.format('YYYY-MM-DD');
          data.oreType = values.oreTypeAndSpecifications[0];
          data.cargoSpecification = values.oreTypeAndSpecifications[1];
          if (!this.isEdit) {
            this.$store.dispatch('salesPlanManage/addSalesPlanData', data);
          } else {
            data.index = this.index;
            data.planId = this.rowData.planId;
            this.$store.dispatch('salesPlanManage/updateSalesPlanData', data);
          }
          this.form.resetFields();
          this.visible = false;
          this.$emit('changeAddDataVisile', this.visible);
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>
<style lang='scss' scoped>
.ant-calendar-picker {
  width: 100%;
}
</style>
