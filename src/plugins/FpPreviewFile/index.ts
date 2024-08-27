import FpPreviewFile from './src/index.vue';

FpPreviewFile.install = (Vue: any) => {
    Vue.component(FpPreviewFile.name, FpPreviewFile);
}
export default FpPreviewFile;