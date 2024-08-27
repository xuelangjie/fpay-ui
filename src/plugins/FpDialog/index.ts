import FpDialog from './src/index.vue';

FpDialog.install = (Vue: any) => {
    Vue.component(FpDialog.name, FpDialog);
}
export default FpDialog;