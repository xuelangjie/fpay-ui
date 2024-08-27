<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
const locale = zhCn;

const emits = defineEmits(['change']);
const props = defineProps({
    modelWidth: {
        type: String,
        default: '100%'
    },
    startDate: {
        type: String,
        default: ''
    },
    endDate: {
        type: String,
        default: ''
    },
    sText: {
        type: String,
        default: '开始日期'
    },
    eText: {
        type: String,
        default: '结束日期'
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isClear: {
        type: Boolean,
        default: false
    },
    // zIndex: {
    //     type: Number,
    //     defalut: 2000
    // }
});

const sDate = ref<String>(props.startDate);
const eDate = ref<String>(props.endDate);

watch(()=> props.startDate, (newVal) => {
    sDate.value = newVal;
});
watch(()=> props.endDate, (newVal) => {
    eDate.value = newVal;
});

const handleStartDate = (val: string) => {
    emits('change', {startDate: val, endDate: eDate.value});
}
const handleEndDate = (val: string) => {
    emits('change', {startDate: sDate.value, endDate: val});
}

const disabledStartDate = (time: Date) => {
    if (!props.isDisabled) {
        return false;
    }
    const today = new Date();
    let sDay = new Date(today.setFullYear(today.getFullYear() - 1));
    if (eDate.value) {
        const endDay = new Date(eDate.value.toString());
        sDay = new Date(endDay.setFullYear(endDay.getFullYear() - 1));
    }
    return time<sDay;
}
const disabledEndDate = (time: Date) => {
    if (!props.isDisabled) {
        return false;
    }
    if (sDate.value) {
        const startDay = new Date(sDate.value.toString());
        const eDay = new Date(startDay.setFullYear(startDay.getFullYear() + 1));
        return time>eDay;
    } else {
        return false;
    }
}

</script>
<script lang="ts">
export default {
  name: "FpDaterange",
};
</script>
<template>
    <el-config-provider :locale="locale">
        <div class="fp-daterange" :style="{width: modelWidth}">
            <el-date-picker class="fp-date" v-model="sDate" type="date" @change="handleStartDate" :disabled-date="disabledStartDate" :clearable="isClear" :placeholder="sText" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
            <div class="range">至</div>
            <el-date-picker class="fp-date" v-model="eDate" type="date" @change="handleEndDate" :disabled-date="disabledEndDate" :clearable="isClear" :placeholder="eText" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
        </div>
    </el-config-provider>
</template>
<style lang="scss" scoped>
.fp-daterange {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .fp-date {
        width: calc(50% - 20px);
    }
    .range {
        width: 30px;
        text-align: center;
        padding: 0 5px;
        box-sizing: border-box;
        font-size: var(--el-form-label-font-size);
        color: var(--el-text-color-regular);
    }
}
</style>