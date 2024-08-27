import FpPagination from './FpPagination';
import FpIcon from './FpIcon';
import FpDaterange from './FpDaterange';
import FpPreviewFile from './FpPreviewFile';
import FpSelect from './FpSelect';
import FpDialog from './FpDialog';

const componentList = [FpPagination, FpIcon, FpDaterange, FpPreviewFile, FpSelect, FpDialog];

const install = (Vue: any) => {
    componentList.forEach(com => {
        Vue.component(com.name, com)
    });
}
export {
    FpPagination, FpIcon, FpDaterange, FpPreviewFile, FpSelect
}
export default {install};

