<template>
  <a-modal
    title="新增"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :width="500"
  >
    <a-form :form="form" ref="addRowForm">
      <a-row>
        <a-col :span="24">
          <a-form-item label="运输计划:" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-select
              :placeholder="palceholder[0]"
              v-decorator="['transportationPlanId',{ rules: [{ required: true, message: '请选择运输计划!' }] }]"
              @dropdownVisibleChange="dropdownVisibleChange"
            >
              <a-select-option
                v-for="planNum in transportPlanList"
                :value="planNum.planId"
                :key="planNum.planId"
              >{{planNum.planName}}</a-select-option>
            </a-select>
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
import { mapState } from 'vuex';
export default {
  name: 'row-add',
  data() {
    return {
      visible: this.modalVisible,
      confirmLoading: false,
      form: this.$form.createForm(this),
      palceholder: ['选择运输计划'],
    };
  },
  props: ['modalVisible'],
  watch: {
    modalVisible(val) {
      this.visible = val;
    },
  },
  mounted() {},
  components: {},
  computed: {
    ...mapState({
      transportPlanList: state => state.transportPlanList
    })
  },
  methods: {
    dropdownVisibleChange(open) {
      open && this.$store.dispatch('getTransportPlans');
    },
    handleCancel() {
      this.visible = false;
      this.$emit('changeAddRowVisible', this.visible);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$store.dispatch('weighManage/addDeliveryRecords', values);
          this.form.resetFields();
          this.visible = false;
          this.$emit('changeAddRowVisible', this.visible);
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
