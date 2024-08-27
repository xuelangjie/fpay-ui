<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import FpIcon from '../../FpIcon';
    const emits = defineEmits(['change']);
    const props = defineProps({
        selectItems: {
            type: Array as PropType<SelectOptionType[]>,
            default: () => [],
        },
        value: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        zIndex: {
            type: Number,
            defalut: 2000
        }
    });
    const selectTitle = ref(props.placeholder);
    const isOpen = ref(false);
    const tooltipRef = ref();
    const selectValue = ref(props.value);
    const handleSelectClick = (value: string | number) => {
        selectValue.value = value;
        initPageData();
        emits('change', value);
        tooltipRef.value.hide();
    }
    const handleTooltipOpen = () => {
        isOpen.value = true;
    }
    const handleTooltipHide = () => {
        isOpen.value = false;
    }
    const initPageData = () => {
        props.selectItems.forEach(item => {
            if (selectValue.value == item.value) {
                selectTitle.value = item.label;
                return;
            }
        });
    }
    onMounted(() => {
        initPageData();
    });
    
</script>
<script lang="ts">
    export default {
        name: "FpSelect",
    };
</script>
<template>
    <el-config-provider :z-index="zIndex">
        <div class="fp-select">
            <el-tooltip ref="tooltipRef" popper-class="fp-select-popper" placement="bottom" trigger="click" effect="light" @hide="handleTooltipHide">
                <template #default>
                    <div class="title" @click.prevent="handleTooltipOpen">
                        <div class="str">{{ selectTitle }}</div>
                        <fp-icon :icon-name="isOpen?'fp-up':'fp-down'" />
                    </div>
                </template>
                <template #content>
                    <div class="fp-select-items">
                        <div class="fp-select-item" :class="item.value == selectValue ? 'active' : ''" v-for="item in selectItems" :key="item.value" @click="handleSelectClick(item.value)"> {{ item.label }}</div>
                    </div>
                </template>
            </el-tooltip>
        </div>
    </el-config-provider>
</template>
<style lang="scss" scoped>
.fp-select {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    &:hover {
        border-color: #c0c4cc;
    }
    .title {
        width: 100%;
        min-height: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 4px 12px;
        box-sizing: border-box;
        cursor: pointer;
        .str {
            font-size: 14px;
            color: #606266;
        }
    } 
}
.fp-select-popper {
    padding: 0;
    box-sizing: border-box;
    .fp-select-items {
        width: 100%;
        padding: 6px 2px;
        box-sizing: border-box;
        min-width: 120px;
        .fp-select-item {
            width: 100%;
            height: 34px;
            line-height: 34px;
            text-align: left;
            font-size: 14px;
            color: #606266;
            padding: 0 20px 0 20px;
            box-sizing: border-box;
            cursor: pointer;
            &.active {
                color: #409eff;
                background-color: #f5f7fa;
            }
        }
    }
}

</style>