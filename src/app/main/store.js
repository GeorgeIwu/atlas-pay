// Customers Component Vuex Module
// import api from '../utils/auth/api'
// import { toaster } from '../utils/helper'

const getDefaultState = () => ({
    layout: {
        navPos: 'left', //top, bottom, left, right, false
        toolbar: 'top', //top, bottom, false
        footer: true, //above, below, false
        boxed: false, //true, false
        roundedCorners: false, //true, false
        viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
    },
    splashScreen: true,
    logged: true    
})

const state = getDefaultState();

const mutations = {
    resetState (state) {
        Object.assign(state, getDefaultState())
    },
    setLayout(state, payload) {
        if(payload && payload.navPos !== undefined)
            state.layout.navPos = payload.navPos

        if(payload && payload.toolbar !== undefined)
            state.layout.toolbar = payload.toolbar
            
        if(payload && payload.footer !== undefined)
            state.layout.footer = payload.footer
    
        if(payload && payload.boxed !== undefined)
            state.layout.boxed = payload.boxed

        if(payload && payload.roundedCorners !== undefined)
            state.layout.roundedCorners = payload.roundedCorners

        if(payload && payload.viewAnimation !== undefined)
            state.layout.viewAnimation = payload.viewAnimation
    },
    setLogin(state) {
        state.logged = true
    },
    setLogout(state) {
        state.layout.navPos = null
        state.layout.toolbar = null
        state.logged = false
    },
    setSplashScreen(state, payload) {
        state.splashScreen = payload
    }
};

const actions = {
    
}

const getters = {
    layout(state) {
        return state.layout
    },
    navPos(state) {
        return state.layout.navPos
    },
    toolbar(state) {
        return state.layout.toolbar
    },
    footer(state) {
        return state.layout.footer
    },
    boxed(state) {
        return state.layout.boxed
    },
    roundedCorners(state) {
        return state.layout.roundedCorners
    },
    viewAnimation(state) {
        return state.layout.viewAnimation
    },
    isLogged(state) {
        return state.logged
    },
    splashScreen(state) {
        return state.splashScreen
    }    
};


export default {
    state,
    getters,
    mutations,
    actions
}