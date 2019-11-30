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
  Icon,
  Avatar,
  Divider,
  Backtop,
  Input,
  Rate,
  Popover,
  Image
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
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Backtop)
Vue.use(Input)
Vue.use(Rate)
Vue.use(Popover)
Vue.use(Image)

new Vue({
  el: '#app',
  render: h => h(App)
})
