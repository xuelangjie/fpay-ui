<script setup>
import jsPreviewPdf from "@js-preview/pdf";
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
    previewer = jsPreviewPdf.init(document.getElementById('pdf'));
    previewer.preview(props.fileUrl);
});
onUnmounted(() => {
    if (previewer != '') {
        previewer.destroy();
    }
});
</script>
<template>
   <div id="pdf"></div>
</template>
<style lang="scss" scoped></style>