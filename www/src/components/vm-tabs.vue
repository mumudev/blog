<template>
  <div class="vm-tabs vm-panel">
    <div class="heading">
      <span class="icon">
        <i :class="icon"></i>
      </span>
      <span class="title">
        {{ title }}
      </span>
    </div>
    <div class="body" :style="{ height: contentHeight }">
      <ul>
        <slot></slot>
      </ul>
    </div>
    <div class="footer">
      <ul>
        <li v-for="(item, index) in navList" @click="getActiveName(index)" :class="{ active: item.active }" :key="item.id"> {{ item.label }} </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VmTabs',
  props: ['icon', 'title', 'contentHeight'],
  data() {
    return {
      navList: [],
      activeName: String,
    };
  },
  methods: {
    getActiveName(index) {
      this.activeName = this.navList[index].name;
    },
    updateNavList() {
      this.navList = [];
      const itemList = this.$children;
      itemList.forEach((item) => {
        const obj = {};
        obj.label = item.label;
        obj.name = item.name;
        obj.active = this.activeName === item.name;
        this.navList.push(obj);
      });
    },
  },
  watch: {
    activeName() {
      this.updateNavList();
    },
  },
  mounted() {
    this.activeName = this.$children[0].name;
    this.updateNavList();
  },
};
</script>
