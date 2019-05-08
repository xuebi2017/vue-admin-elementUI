<template>
  <a-modal
    :title="modalTitle"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :width="800"
  >
    <a-form :form="form">
      <a-row :gutter="30">
        <a-col :span="12">
          <a-form-item label="时间" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-date-picker
              placeholder="请选择日期"
              :disabledDate="disabledDate"
              :showToday="false"
              v-decorator="[
              'date',
              { initialValue: moment(recordData.date) || moment(), rules: [{ required: true, message: '请输入时间!' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="班次" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-select
              v-decorator="[
          'shift',
          {initialValue: recordData.shift, rules: [{ required: true, message: '请选择班次!' }]}
        ]"
              placeholder="请选择班次"
              @change="handleSelectChange"
            >
              <a-select-option
                v-for="item in schedules"
                :key="item.id"
                :value="item.value"
              >{{item.value}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="30">
        <a-col :span="12">
          <a-form-item label="车数" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input-number
              style="width:100%"
              placeholder="请输入车数"
              v-decorator="[
              'carriageNumber',
              {initialValue: recordData.carriageNumber, rules: [{ required: true, message: '请输入车数!' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="规格" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-select
              v-decorator="[
          'cargoSpecification',
          {initialValue: recordData.cargoSpecification, rules: [{ required: true, message: '请选择规格!' }]}
        ]"
              placeholder="请选择规格"
              @change="handleSelectChange"
            >
              <a-select-option
                v-for="item in ronOreSpecifications"
                :key="item.value"
                :value="item.label"
              >{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>-->
        <a-col :span="12">
          <a-form-item label="司机" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input
              placeholder="请输入司机姓名"
              v-decorator="[
          'trainDriver',
          {initialValue: recordData.trainDriver, rules: [{ required: true, message: '请输入司机姓名!',}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="30">
        <a-col :span="24">
          <a-form-item label="备注" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
            <a-textarea
              placeholder="请输入备注"
              :autosize="{ minRows: 1, maxRows: 6 }"
              v-decorator="['remark',{initialValue: recordData.remark}]"
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
import moment from 'moment';
import { disabledBeforeToday } from '@/utils';
import { ronOreSpecifications, schedules } from '../data';
export default {
  name: 'railway-add-edit',
  data() {
    return {
      schedules,
      ronOreSpecifications,
      visible: this.modalVisible,
      confirmLoading: false,
      form: this.$form.createForm(this),
      modalTitle: '新增'
    };
  },
  props: [
    'modalVisible',
    'missionId',
    'keyName',
    'isEdit',
    'index',
    'recordData',
    'innerDataIndex'
  ],
  watch: {
    modalVisible(val) {
      this.visible = val;
    },
    recordData: {
      handler(val) {
        if (Object.keys(val).length !== 0) {
          this.modalTitle = '编辑';
        } else {
          this.modalTitle = '新增';
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    moment,
    disabledDate: disabledBeforeToday,
    handleCancel() {
      this.visible = false;
      this.$emit('changeAddDataVisile', this.visible);
    },
    handleSelectChange() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let addData = values;
          addData.date = values.date.format('YYYY-MM-DD');
          addData.oreType = '铁矿石';
          addData.missionId = this.missionId;
          addData.index = this.index;
          //添加
          if (!this.isEdit) {
            this.$store.dispatch('railwayManage/addSubTableData', addData);
            this.$emit('expandRow', this.missionId);
          }
          //编辑
          else {
            addData.key = this.recordData.recordId;
            addData.innerDataIndex = this.innerDataIndex;
            addData.recordId = this.recordData.recordId;
            console.log('addData--->', addData);
            this.$store.dispatch('railwayManage/updateSubTableData', addData);
          }
          //重置表单
          this.form.resetFields();
          this.visible = false;
          this.$emit('changeAddDataVisile', this.visible);
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.ant-calendar-picker {
  width: 100%;
}
</style>
