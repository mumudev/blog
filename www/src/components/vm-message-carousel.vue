<template>
  <Carousel v-model="value" dots="none" class="vm-message-carousel" :autoplay="autoplay">
    <Carousel-item v-for="item in data" :key="item.id">
      <div class="item vm-panel">
        <div class="main">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
        <div class="from">
          <img :src="item.photo" alt="">
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </Carousel-item>
  </Carousel>
</template>
<script>
export default {
  name: 'VmMesageCarousel',
  props: {
    data: {
      type: Array,
      default() {
        return [
          {
            title: 'Tilte',
            content: 'VmMesageCarousel Content',
            photo: '@/assets/img/photo.jpg',
            name: 'Jesse Luo',
          },
        ];
      },
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: 0,
    };
  },
};
</script>
