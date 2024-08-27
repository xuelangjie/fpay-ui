<script setup>
import jsPreviewExcel from "@js-preview/excel";
import { onMounted, onUnmounted } from "vue";
const props = defineProps({
    fileUrl: {
        type: String,
        required: true
    }
});
let previewer = '';
onMounted(() => { 
    // setup下先再获取到dom节点之后再进行挂载
    previewer = jsPreviewExcel.init(document.getElementById('pdf'));
    previewer.preview(props.fileUrl);
});
onUnmounted(() => {
    if (previewer != '') {
        previewer.destroy();
    }
});
</script>
<template>
   <div id="excel"></div>
</template>
<style lang="scss" scoped></style>