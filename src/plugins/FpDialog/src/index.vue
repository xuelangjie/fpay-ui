<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import FpIcon from '../../FpIcon';

const emits = defineEmits(["cancel", "confirm"]);
const props = defineProps({
    modelClose: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ''
    },
    subtitle:{
        type: String,
        default: ''
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    confirmText: {
        type: String,
        default: '保存'
    },
    modelWidth: {
        type: String,
        default: '50%'
    },
    // formModel: {
    //     type: Object,
    //     default: () => ({})
    // },
    // initFormModel: {
    //     type: Object,
    //     default: () => ({})
    // },
    showCancel: {
        type: Boolean,
        default: true
    },
    showConfirm: {
        type: Boolean,
        default: true
    },
    // btnType: {
    //     type: String,
    //     default: 'form'
    // },
    showFooter: {
        type: Boolean,
        default: true
    },
    btnLoading: {
        type: Boolean,
        default: false
    },
    modelTop: {
        type: Number,
        default: 15
    },
    zIndex: {
        type: Number,
        default: 2000
    }
});
const dialogShow  = ref(true);
const isRoll = ref(false);
const dialogContent = ref<HTMLElement | null>(null);
const dialogHeight = ref(0);
const visibleHeight = ref(window.innerHeight);
const height = ref(0);
const checkDialogHeight = () => {
    if (dialogContent.value) {
        dialogHeight.value = dialogContent.value.scrollHeight;
        const mtop = visibleHeight.value *(props.modelTop/100);
        let num = 138;
        if (props.showFooter) {
            num = num + 78;
        }
        // console.warn('dialogHeight', dialogHeight.value);
        // console.warn('mtop', mtop);
        // console.warn('visibleHeight', visibleHeight.value);

        if(dialogHeight.value > 0 && dialogHeight.value > (visibleHeight.value - num - (mtop*2))) {
            isRoll.value = true;
            height.value = visibleHeight.value - (mtop*2);
        } else if (isRoll.value) {
            isRoll.value = false;
            height.value = 0;
        }
        // console.warn('height', height.value);
    }
};
// 初始测量
nextTick(checkDialogHeight);
const handleClose = () => {
    // if (props.modelClose || Object.keys(props.formModel).length == 0) {
    //     emits('cancel');
    // } else {
    //     let isFormChanged = false;
    //     Object.keys(props.formModel).forEach(key => {
    //         if (props.formModel[key] != '' || (props.initFormModel[key] != undefined && props.formModel[key] == '')) {
    //             if (props.formModel[key] !== props.initFormModel[key]) {
    //                 isFormChanged = true;
    //             }
    //         }
    //     });
    //     if (!isFormChanged) {
    //         emits('cancel');
    //         return;
    //     }
    //     ElMessageBox.confirm(
    //         '表单数据未保存，关闭后数据会丢失，确定关闭吗？',
    //         '提示',
    //         {
    //             cancelButtonText: '取消',
    //             confirmButtonText: '确定',
    //             // type: 'warning'
    //         }
    //     ).then((action) => {
    //         if (action == 'confirm') {
    //             emits('cancel');
    //         }
    //     }).catch(()=>{});
    // }
    emits("cancel");
}
const handleConfirm = () => {
    emits("confirm");
}
let observer: MutationObserver | null = null;
const initObserver = () =>{
    if (dialogContent.value) {
        observer = new MutationObserver(checkDialogHeight);
        observer.observe(dialogContent.value as HTMLElement, { childList: true, subtree: true });
    } else {
        setTimeout(()=>{
            initObserver();
        }, 100);
    }
}
const updateDimensions = () => {
    visibleHeight.value = window.innerHeight;
    if(dialogHeight.value > 0 && dialogHeight.value>(visibleHeight.value * 0.75)) {
    isRoll.value = true;
    } else if(isRoll.value) {
    isRoll.value = false;
    }
};

// const handleScroll = (res:any) => {
//     console.warn(res);
// }

onMounted(() => {
    window.addEventListener('resize', updateDimensions);
    initObserver();
});
onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions);
    if (observer!=null) {
        observer.disconnect();
    }
});
</script>
<script lang="ts">
    export default {
        name: "FpDialog",
    };
</script>
<template>
    <el-dialog :z-index="zIndex" class="fp-dialog" :class="showFooter?'fp-dialog-foot':''" :style="isRoll?{ height: height+'px' }: ''" v-model="dialogShow" :show-close="false" :width="modelWidth" :top="isRoll?modelTop+'vh':''" append-to-body @close="handleClose" :close-on-click-modal="modelClose" :close-on-press-escape="modelClose">
        <template #header>
            <slot name="fpdHeader">
                <div class="fp-header">
                    <div class="title">{{ title }}</div>
                    <div class="subtitle" v-if="subtitle != ''">{{ subtitle }}</div>
                    <div class="close" @click="handleClose">
                        <fp-icon icon-name="fp-close" size="20px" />
                    </div>
                </div>
            </slot>
        </template>
        <div class="d-comtent" ref="dialogContent">
            <slot></slot>
        </div>
        <template #footer v-if="showFooter">
            <slot name="fpdFooter">
                <div class="fp-footer">
                    <el-button class="mr-10" @click="handleClose" v-if="showCancel">{{ cancelText }}</el-button>
                    <el-button :loading="btnLoading" class="nb-button-primary" type="primary" @click="handleConfirm" v-if="showConfirm">{{ confirmText }}</el-button>
                </div>
            </slot>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
.d-comtent {
    padding: 30px 25px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
}
:global(.fp-dialog) {
    // height: 75%;
    overflow: hidden;
    border-radius: 15px;
    padding: 0 !important;
}
:global(.el-dialog__body){
    height: calc(100% - 98px);
}
:global(.fp-dialog-foot .el-dialog__body) {
    height: calc(100% - 156px);
}
:global(.el-dialog__header){
    margin: 0;
    padding: 0 !important;
}
:global(.el-dialog__footer){
    margin: 0;
    padding: 0 !important;
}
.fp-header {
    height: 78px;
    padding: 0 50px 0 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    .title {
        font-size: 20px;
        color: #333333;
        font-weight: bold;
        // margin-bottom: 5px;
    }
    .subtitle {
        font-size: 16px;
        color: #666;
    }
    .close {
        position: absolute;
        width: 20px;
        height: 20px;
        cursor: pointer;
        right: 20px;
    }
}
.fp-footer {
    height: 78px;
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #eeeeee;
    .mr-10{
        margin-right: 10px;
    }
}
</style>