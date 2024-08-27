<script setup lang="ts">
import { computed, ref, type PropType, watchEffect, onMounted } from 'vue';
import FpIcon from '../../FpIcon';
import FpSelect from '../../FpSelect'

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 10
    },
    total: {
        type: Number,
        default: 0
    },
    pagerCount: {
        type: Number,
        default: 7,
    },
    pageSizes: {
        type: Array as PropType<Number[]>,
        default: () => ([10, 20, 30, 40, 50, 100] as const),
    },
    zIndex: {
        type: Number,
        default: 2000
    }
});
const emits = defineEmits(['sizeChange', 'currentChange']);
const isAbsent = (v: unknown): v is undefined => typeof v !== 'number';
const innerPageSize = ref(10);
const innerCurrentPage = ref(1);
const showPrevMore = ref(false);
const showNextMore = ref(false);
const prevMorePage = ref(0);
const nextMorePage = ref(0);
const selectSizes = ref<SelectOptionType[]>([]);

const pagers = computed(() => {
    const pagerCount = props.pagerCount;
    const halfPagerCount = (pagerCount - 1) / 2;
    const pageCount = pageCountBridge.value;
    const currentPage = currentPageBridge.value;
    let showPrevMore = false;
    let showNextMore = false;
    
    if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
            showPrevMore = true
        }
        if (currentPage < pageCount - halfPagerCount) { 
            showNextMore = true
        }
    }
    
    const array: number[] = [];
    if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i <= pageCount; i++) {
            array.push(i)
        }
    } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
            array.push(i)
        }
    } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            array.push(i)
        }
    } else {
        for (let i = 2; i <= pageCount; i++) {
            array.push(i)
        }
    }
    return array;
});

// 每页展示条数
const pageSizeBridge = computed({
    get() {
        return isAbsent(props.pageSize) ? 10 : props.pageSize
    },
    set(v: number) {
        if (isAbsent(props.pageSize)) {
            innerPageSize.value = v
        }
        emits('sizeChange', v);
    },
});

// 总页数
const pageCountBridge = computed<number>(() => {
    return Math.max(1, Math.ceil(props.total / pageSizeBridge.value))
});

// 当前页计算
const currentPageBridge = computed<number>({
    get() {
        return isAbsent(props.currentPage)
            ? innerCurrentPage.value
            : props.currentPage
    },
    set(v) {
        let newCurrentPage = v;
        if (v < 1) {
            newCurrentPage = 1;
        } else if (v > pageCountBridge.value) {
            newCurrentPage = pageCountBridge.value;
        }
        if (isAbsent(props.currentPage)) {
            innerCurrentPage.value = newCurrentPage;
        }
        emits('currentChange', newCurrentPage);
    },
});

watchEffect(() => {
    const halfPagerCount = (props.pagerCount - 1) / 2;
    showPrevMore.value = false;
    showNextMore.value = false;
    const pageCount = pageCountBridge.value;
    const currentPage = currentPageBridge.value;

    if (pageCount > props.pagerCount) {
        if (props.currentPage > props.pagerCount - halfPagerCount) {
            showPrevMore.value = true;
        }
        if (props.currentPage < pageCount - halfPagerCount) {
            showNextMore.value = true;
        }
    }
    let num = 100;
    if (props.pageSize >= 50) {
        num = 20;
    }
    if (pageCount < num) {
        nextMorePage.value = 0;
        prevMorePage.value = 0;
        return;
    }
    let prevMore = Math.floor(currentPage/num) * num;
    let nextMore = Math.ceil(currentPage/num) * num;
    if (currentPage + halfPagerCount >= pageCount) {
        nextMorePage.value = 0;
    } else if (currentPage + halfPagerCount < nextMore) {
        if (nextMore > pageCount) {
            nextMorePage.value = pageCount;
        } else {
            nextMorePage.value = nextMore;
        }
    } else{
        if (nextMore + num >= pageCount) {
            nextMorePage.value = pageCount;
        } else {
            nextMorePage.value = nextMore + num;
        }
    }
    if (prevMore > currentPage - halfPagerCount && prevMore - num > 0) {
        prevMorePage.value = prevMore - num;
    } else if(prevMore > currentPage - halfPagerCount){
        prevMorePage.value = 0;
    } else {
        prevMorePage.value = prevMore;
    }
});

const handlePrev = () => {
    if (currentPageBridge.value == 1) {
        return;
    }
    currentPageBridge.value -= 1;
    // emits('currentChange', currentPageBridge.value);
}
const handleNext = () => {
    if (currentPageBridge.value == pageCountBridge.value) {
        return;
    }
    currentPageBridge.value += 1;
}
const handlePagerChange = (val: number) => {
    if (currentPageBridge.value == val) {
        return;
    }
    currentPageBridge.value = val;
}
const handleSizeChange = (val:number) => {
    if (val == pageSizeBridge.value){
        return;
    }
    pageSizeBridge.value = val;
}

onMounted(() => {
    innerPageSize.value = isAbsent(props.pageSize) ? 10 : props.pageSize;
    let sizes:SelectOptionType[] = []
    props.pageSizes.forEach(item=> {
        sizes.push({value: item.valueOf(), label: `${item}条/页`});
    });
    selectSizes.value = sizes;
});

</script>

<script lang="ts">
export default {
  name: "FpPagination",
};
</script>
<template>
    <div class="fp-pagination">
        <div class="pages">共{{ total }}条</div>
        <!-- <div class="pages">共{{ pageCountBridge }}页</div> -->
        <div class="sizes" v-if="selectSizes.length > 0">
            <fp-select :select-items="selectSizes" :value="innerPageSize" :z-index="zIndex" @change="handleSizeChange" />
            <!-- <el-select v-model="innerPageSize" @change="handleSizeChange">
                <el-option v-for="item in pageSizes" :key="item" :value="item" :label="item+'条/页'"></el-option>
            </el-select> -->
        </div>
        <div class="prev" :class="currentPageBridge == 1?'disabled':''" @click="handlePrev"><fp-icon icon-name="fp-zuo" /></div>
        <div class="pager">
            <div class="number" :class="currentPageBridge == 1?'is-active':''"  @click="handlePagerChange(1)">1</div>
            <div class="more" v-if="showPrevMore"><fp-icon icon-name="fp-more" /></div>
            <template v-if="prevMorePage > 0">
                <div class="number" @click="handlePagerChange(prevMorePage)">{{ prevMorePage }}</div>
                <div class="more"><fp-icon icon-name="fp-more" /></div>
            </template>
            <div class="number" :class="currentPageBridge == pager?'is-active':''" v-for="pager in pagers" :key="pager" @click="handlePagerChange(pager)">{{ pager }}</div>
            <div class="more" v-if="showNextMore"><fp-icon icon-name="fp-more" /></div>
            <template v-if="nextMorePage > 0">
                <div class="number" @click="handlePagerChange(nextMorePage)">{{ nextMorePage }}</div>
                <div class="more" v-if="nextMorePage != pageCountBridge"><fp-icon icon-name="fp-more" /></div>
            </template>
        </div>
        <div class="next" :class="currentPageBridge == pageCountBridge?'disabled':''" @click="handleNext"><fp-icon icon-name="fp-you" /></div>
    </div>
</template>
<style lang="scss" scoped>
.fp-pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 10px;
    box-sizing: border-box;
    .pages {
        font-size: 14px;
        color: #606266;
        margin-right: 10px;
    }
    .sizes {
        width: 120px;
    }
    .pager {
        display: flex;
        flex-direction: row;
        align-items: center;
        .number {
            font-size: 14px;
            color: #301330;
            padding: 0 4px;
            min-width: 32px;
            cursor: pointer;
            display: flex;
            justify-content: center;
        }
        .is-active {
            color: #FF6413;
        }
    }
    .prev {
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .next {
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .disabled {
        cursor: not-allowed;
        color: #a8abb2;
    }
    .more {
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>