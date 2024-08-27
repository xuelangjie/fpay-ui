import FpPagination from './src/index.vue';

FpPagination.install = (Vue: any) => {
    Vue.component(FpPagination.name, FpPagination);
}
export default FpPagination;