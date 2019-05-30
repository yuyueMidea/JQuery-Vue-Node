import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import message from './modules/message'
import resources from './modules/resources'
import navTabs from './modules/navTabs'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  /* strict: true,*/
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    message,
    navTabs,
    resources
  },
  getters
})

export default store
