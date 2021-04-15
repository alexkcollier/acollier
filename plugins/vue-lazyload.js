import Vue from 'vue';
import VLazyLoad from 'vue-lazyload';

Vue.use(VLazyLoad, {
  lazyComponent: true,
  observer: true,
});
