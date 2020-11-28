import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // form
  // popup
  // scroll
  Loading,
  ImagePreview,
  Dialog,
  Upload,
  Scroll,
  Swipe,
  IndexList
} from 'cube-ui'

Vue.use(Scroll)
Vue.use(Swipe)
Vue.use(IndexList)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(ImagePreview)
Vue.use(Loading)
