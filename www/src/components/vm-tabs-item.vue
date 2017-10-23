<template>
  <li v-show="show">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'VmTabsItem',
  props: ['name', 'label'],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    updateShow() {
      if (this.$parent.activeName === this.name) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
  updated() {
    this.updateShow();
  },
  mounted() {
    this.updateShow();
  },
};
</script>
