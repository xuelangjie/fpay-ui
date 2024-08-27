<script setup lang="ts">
import FpPagination from '@/plugins/FpPagination/src/index.vue';
import FpPreviewFile from '@/plugins/FpPreviewFile/src/index.vue';
import FpDaterange from '@/plugins/FpDaterange/src/index.vue';
import FpDialog from '@/plugins/FpDialog/src/index.vue'
import { ref } from 'vue';
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
  pageSize.value = val;
}
const handleCurrentChange = (val: number) => {
  console.warn(val);
}

const handleDownload = () => {
  console.warn('下载');
}
</script>

<template>
  <div class="container">
    <FpDaterange />
    <FpPagination :current-page="1" :page-size="pageSize" :total="100" :page-sizes="[10, 20, 50, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <!-- <FpPreviewFile file-url="https://fpay-files-test.obs.cn-east-3.myhuaweicloud.com/general/document/20240815/008fhVW578sGNJ6Wuf7rJ4rAo4tt8uZC7W5cVqb4r5YMWebvj.pdf?AccessKeyId=LN25N0JUHYXUY4L5VX0V&Expires=1723778519&Signature=Sb6YdW2t6rJt1dqzeHmQXh%2FuKDY%3D" @download="handleDownload" /> -->
     <FpDialog title="测试测试" subtitle="测试都是风水大师范德萨穿搭" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>
