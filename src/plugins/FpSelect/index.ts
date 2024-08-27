import FpSelect from './src/index.vue';

FpSelect.install = (Vue: any) => {
    Vue.component(FpSelect.name, FpSelect);
}
export default FpSelect;