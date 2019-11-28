import Vue from 'vue'
import { 
  Notification,
  Timeline,
  TimelineItem,
  Header,
  Container,
  Aside,
  Main,
  Footer,
  Card,
  Tabs,
  TabPane,
  Button,
  Icon
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.prototype.$notify = Notification

Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(Icon)

new Vue({
  el: '#app',
  render: h => h(App)
})
