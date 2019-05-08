<template>
  <a-modal
    title="新增"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :width="width"
  ></a-modal>
</template>
<script>
export default {
  name: 'add-modal',
  data() {
    return {
      visible: this.modalVisible,
      confirmLoading: false
    }
  },
  props: ['modalVisible', 'width'],
  computed: {},
  watch: {
    modalVisible(val) {
      this.visible = val
    }
  },
  methods: {
    handleCancel() {
      this.visible = false
      this.$emit('changeAddDataVisile', this.visible)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
