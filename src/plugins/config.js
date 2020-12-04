import config from "../config";

export default {
    install: function (Vue) {
        Object.defineProperty(Vue.prototype, '$localConfig', { value: config });
    }
};