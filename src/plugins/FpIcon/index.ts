import FpIcon from './src/index.vue';

FpIcon.install = (Vue: any) => {
    Vue.component(FpIcon.name, FpIcon);
}
export default FpIcon;