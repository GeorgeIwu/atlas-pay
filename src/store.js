import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import main from './app/main/store'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	plugins: [createPersistedState({paths: ['layout']})],
	modules: {
        main,
    },
	strict: debug
})
