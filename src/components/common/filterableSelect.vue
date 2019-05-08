<template>
  <el-select v-model="value" filterable :placeholder="placeholder" @change="optionChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
</template>
<script>
export default {
  name: 'filterable-select',
  data() {
    return {
      value: '',
    }
  },
  props: [
    'placeholder',
    'options'
  ],
  computed: {
    
  },
  methods: {
    optionChange(value) {
      this.$emit('optionChange', value)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
