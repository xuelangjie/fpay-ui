import FpDaterange from './src/index.vue';

FpDaterange.install = (Vue: any) => {
    Vue.component(FpDaterange.name, FpDaterange);
}
export default FpDaterange;