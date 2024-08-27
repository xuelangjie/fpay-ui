<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ width: size,height: size, fill: color}">
      <use :xlink:href="iconClassName" />
  </svg>

</template>

<script setup lang="ts">
import '@/assets/icon/icon.js'
import { computed } from 'vue';

const props = defineProps({
  iconName: {
      type: String,
      required: true
  },
  className: {
      type: String,
      default: ''
  },
  color: {
      type: String,
      default: '#666666'
  },
  size: {
    type: String,
    default: "1em",
  },
});

// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
})

// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
      return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>

<script lang="ts">
export default {
  name: "FpIcon",
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  /* fill: currentColor; */
  vertical-align: -2px;
}

</style>