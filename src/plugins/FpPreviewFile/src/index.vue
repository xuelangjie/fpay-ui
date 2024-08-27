<script setup lang="ts">
import PdfView from './pdfView.vue';
import WordView from './wordView.vue';
import ExcelView from './excelView.vue';
import FpIcon from '../../FpIcon';
import { onMounted, ref } from 'vue';
const emits = defineEmits(['download']);
const props = defineProps({
    fileUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    }
});
const fileType = ref('');

const handleDown = () => {
    emits('download', props.fileUrl);
}

onMounted(() => {
    let filePath = props.fileUrl;
    if (props.fileUrl.indexOf('?') > -1) {
        filePath = props.fileUrl.substring(0, props.fileUrl.indexOf('?'));
    }
    fileType.value = filePath.substring(filePath.lastIndexOf('.') + 1);
    if (!['pdf', 'docx', 'xlsx','xls'].includes(fileType.value)) {
        emits('download', props.fileUrl);
        window.close();
    }
});
</script>
<script lang="ts">
    export default {
        name: "FpPreviewFile",
    };
</script>
<template>
    <div class="app-container">
        <slot name="header">
            <div class="con-head">
                <div class="title">{{ title }}</div>
                <div class="h-right">
                    <el-button plain @click="handleDown"><fp-icon icon-name="fp-xiazai" size="14px" style="margin-right: 10px;"></fp-icon>下载</el-button>
                </div>
            </div>
        </slot>
        <div class="con-info">
            <PdfView :fileUrl="fileUrl" v-if="fileType == 'pdf'" />
            <WordView :src="fileUrl" v-else-if="fileType == 'docx'" />
            <ExcelView :src="fileUrl" v-else-if="['xlsx', 'xls'].includes(fileType)" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.app-container {
    width: 100%;
    .con-head {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 0 30px;
        box-sizing: border-box;
        .title {
            font-size: 32rpx;
            color: #333333;
        }
    }
    .con-info {
        width: 100%;
    }
}
</style>