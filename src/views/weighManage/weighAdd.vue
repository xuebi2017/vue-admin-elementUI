<template>
  <section class="container-no-bg">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form label-suffix="：" label-width="120px" :model="formData" ref="formData">
        <el-row>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="计划编号" required>
              <filterable-select
                :placeholder="palceholder[0]"
                :options="options.planNum"
                @optionChange="planNumChange()"
              ></filterable-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="货物规格" required>
              <filterable-select
                :placeholder="palceholder[1]"
                :options="options.cargoSpecifications"
                @optionChange="cargoSpecificationsChange()"
              ></filterable-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="收货单位" required>
              <filterable-select
                :placeholder="palceholder[3]"
                :options="options.receivingUnit"
                @optionChange="receivingUnitChange()"
              ></filterable-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="运输方式" required>
              <filterable-select
                :placeholder="palceholder[2]"
                :options="options.logisticsMode"
                @optionChange="logisticsModeChange()"
              ></filterable-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="车号" required>
              <el-input v-model="formData.basicInfo.carNum" placeholder="请输入车号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="毛重" required>
              <el-input v-model="formData.basicInfo.roughWeight" placeholder="请输入毛重"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="皮重" required>
              <el-input v-model="formData.basicInfo.tareWeight" placeholder="请输入皮重"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="净重" required>
              <el-input v-model="formData.basicInfo.netWeight" placeholder="请输入净重"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="另扣">
              <el-input v-model="formData.basicInfo.additionalBuckle" placeholder="请输入另扣重量"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="另扣">
              <el-input v-model="formData.basicInfo.additionalBuckle" placeholder="请输入另扣重量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="扣率">
              <el-input v-model="formData.basicInfo.deductionRate" placeholder="请输入扣率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <el-form-item label="备注">
              <el-input v-model="formData.basicInfo.remarks" placeholder="请输入备注信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :xs="12" :sm="6" :md="6" :lg="6">
            <el-form-item label="运输方式" required>
              <filterable-select
                :placeholder="palceholder[2]"
                :options="formData.basicInfo.logisticsMode"
                @optionChange="logisticsModeChange()"
              ></filterable-select>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </el-card>
  </section>
</template>
<script>
import filterableSelect from '@/components/common/filterableSelect.vue'
import {
  weighingClerk,
  carNum,
  planNum,
  cargoSpecifications,
  logisticsMode,
  receivingUnit
} from './data'
export default {
  name: 'weigh-add',
  data() {
    return {
      title: '新增',
      palceholder: [
        '请选择计划编号',
        '请选择货物规格',
        '请选择物流方式',
        '请选择收货单位'
      ],
      options: {
        planNum: planNum,
        cargoSpecifications: cargoSpecifications,
        logisticsMode: logisticsMode,
        receivingUnit: receivingUnit
      },
      formData: {
        basicInfo: {
          planNum: '',
          cargoSpecifications: '',
          roughWeight: '',
          tareWeight: '',
          netWeight: '',
          additionalBuckle: '',
          deductionRate: '',
          remarks: '',
          logisticsMode: '',
          receivingUnit: '',
          carNum: ''
        }
      }
    }
  },
  components: {
    filterableSelect
  },
  props: {},
  computed: {},
  methods: {
    planNumChange(data) {
      this.formData.basicInfo.planNum = data
    },
    cargoSpecificationsChange(data) {
      this.formData.basicInfo.cargoSpecifications = data
    },
    logisticsModeChange(data) {
      this.formData.basicInfo.logisticsMode = data
    },
    receivingUnitChange(data) {
      this.formData.basicInfo.receivingUnit = data
    }
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
