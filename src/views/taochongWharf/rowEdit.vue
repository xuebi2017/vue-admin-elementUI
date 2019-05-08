<template>
  <a-modal
    title="编辑"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :width="800"
  >
    <a-form :form="form">
      <a-row :gutter="30">
        <a-col :span="24">
          <a-form-item
            label="水尺(m)"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 21 }"
            style="border: 1px solid #ddd;border-radius: 4px;width: 92%;padding-top:2%;margin-left: 4%;"
          >
            <a-row>
              <a-col :span="8">
                <a-form-item label="艏左" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-input-number
                    v-decorator="['fontLeftDegree', {initialValue: rowData.fontLeftDegree || 0, rules: [{ required: true, message: '请输入艏左刻度!' }]}]"
                    :min="0"
                    :max="100"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="舯左" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-input-number
                    v-decorator="['middleLeftDegree', { initialValue: rowData.middleLeftDegree || 0, rules: [{ required: true, message: '请输入舯左刻度!' }] }]"
                    :min="0"
                    :max="100"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="艉左" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-input-number
                    v-decorator="['endLeftDegree', { initialValue: rowData.endLeftDegree || 0, rules: [{ required: true, message: '请输入艉左刻度!' }] }]"
                    :min="0"
                    :max="100"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="艏右" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-input-number
                    v-decorator="['fontRightDegree', { initialValue: rowData.fontRightDegree || 0, rules: [{ required: true, message: '请输入艏右刻度!' }] }]"
                    :min="0"
                    :max="100"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="舯右" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-input-number
                    v-decorator="['middleRightDegree', { initialValue: rowData.middleRightDegree || 0, rules: [{ required: true, message: '请输入舯右刻度!' }] }]"
                    :min="0"
                    :max="100"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="艉右" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-input-number
                    v-decorator="['endRightDegree', { initialValue: rowData.endRightDegree || 0, rules: [{ required: true, message: '请输入艉右刻度!' }] }]"
                    :min="0"
                    :max="100"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="30">
        <a-col :span="12">
          <a-form-item label="回收重量(t)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input-number
              style="width:100%"
              placeholder="请输入回收重量"
              v-decorator="['recoveryAmount',{ initialValue: rowData.recoveryAmount || 0}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="任务是否完成" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
            <a-select
              v-decorator="[
          'isCompleted',
          {initialValue: isCompletedFormat(rowData.isCompleted)}
        ]"
              placeholder="任务是否完成"
            >
              <a-select-option
                :key="0"
                :value="0"
              >否</a-select-option>
              <a-select-option
                :key="1"
                :value="1"
              >是</a-select-option>
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
export default {
  name: 'row-add',
  data() {
    return {
      visible: this.modalVisible,
      confirmLoading: false,
      form: this.$form.createForm(this)
    };
  },
  props: ['modalVisible', 'missionId', 'rowData', 'index'],
  watch: {
    modalVisible(val) {
      this.visible = val;
    }
  },
  computed: {},
  methods: {
    isCompletedFormat(val) {
      if(val) {
        return 1
      }else {
        return 0
      }
    },
    handleCancel() {
      this.visible = false;
      this.$emit('changeEditRowVisible', this.visible);
    },
    handleSelectChange() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          let editData = values;
          editData.missionId = this.missionId;
          editData.index = this.index;
          if(values.isCompleted) {
            editData.isCompleted = true
          }else {
            editData.isCompleted = false
          }
          console.log('editData--->', editData)
          this.$store.dispatch('railwayManage/updateRow', editData);
          this.form.resetFields();
          this.visible = false;
          this.$emit('changeEditRowVisible', this.visible);
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.ant-modal-body {
  padding: 16px !important;
}
</style>
