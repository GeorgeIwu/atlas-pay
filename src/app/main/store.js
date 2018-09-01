import api from '../../utils/auth/api'

const getDefaultState = () => ({
    loading: false,
    error: '',
    user: {},
    logged: false,
    token: '',
    isActive: false,
    splashScreen: true,
    layout: {
        navPos: null, //top, bottom, left, right, false
        toolbar: null, //top, bottom, false
        footer: true, //above, below, false
        boxed: false, //true, false
        roundedCorners: false, //true, false
        viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
    },
})

const state = getDefaultState();

const mutations = {
    resetState(state) { Object.assign(state, getDefaultState()) },
    set_main_loading(state, payload) { state.loading = payload },
    set_main_error(state, payload) { state.error = payload },
    setSplashScreen(state, payload) { state.splashScreen = payload },
    set_is_active(state, payload) { state.isActive = payload },
    set_user_token(state, payload) { state.token = payload },
    set_user(state, payload) { state.user = { ...state.user, ...payload } },
    setLogin(state, payload) {
        state.layout.navPos = payload ? 'left' : null
        state.layout.toolbar = payload ? 'top' : null
        state.logged = payload
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
};

const actions = {
    createUser({commit}, { email, password, firstname, lastname, phonenumber }) {
        commit('set_main_loading', true);
        api.post(`/auth/register`, { email, password, first_name: firstname, last_name: lastname, phone_number: phonenumber })
        .then(({ token, uuid, email, first_name, last_name, phone_number, address, country }) => {
            commit('set_main_loading', false);
            commit('set_user_token', { token });
            commit('set_user', { token, uuid, email, first_name, last_name, phone_number, address, country });
        })
        .catch( () => {
            commit('set_main_loading', false);
            commit('set_main_error', 'Sorry, there was an error, pls try again later'); 
        })     
    },
    activateUser ({commit}, { token }) {
        commit('set_main_loading', true);
        api.post(`/auth/activate`, { token })
        .then(() => {
            commit('set_main_loading', false);
        })
        .catch(() => {
            commit('set_main_loading', false);
            commit('set_main_error', 'Sorry, there was an error, pls try again later'); 
        })
    },
    resendActivation ({commit}, { email }) {
        commit('set_main_loading', true);
        api.post(`/auth/resend/activation_mail`, { email })
        .then(() => {
            commit('set_main_loading', false);
        })
        .catch(() => {
            commit('set_main_loading', false);
            commit('set_main_error', 'Sorry, there was an error, pls try again later'); 
        })
    },
    loginUser ({commit}, { email, password }) {
        commit('set_main_loading', true);
        api.post('/auth/login', { email, password  })
        .then(res => {
            commit('set_main_loading', false);
            if (typeof res.data.data == 'string' && res.data.data.includes('has not been verified')){
                commit('set_is_active', 'NO');
            } else {
                const { token, uuid, email, first_name, last_name, phone_number, address, country } = res.data.data;
                commit('set_user', { token, uuid, email, first_name, last_name, phone_number, address, country });
                commit('set_user_token', token)
                commit('setLogin', true)
            }
        })
        .catch(() => {
            commit('set_main_loading', false);
            commit('set_main_error', 'Sorry, there was an error, pls try again later'); 
        })
    },
    logoutUser ({commit}) {
        commit('setLogin', false)
    },
    resetPassword ({commit}, { email }) {
        commit('set_main_loading', true);
        api.post(`/auth/reset_password`, { email })
        .then(() => {
            commit('set_main_loading', false);
        })
        .catch(() => {
            commit('set_main_loading', false);
        })
    },
    authorizePassword ({commit}, { token, password, confirm_password }) {
        commit('set_main_loading', true);
        api.put(`/auth/reset_password/authorize`, { token, password, confirm_password })
        .then(() => {
            commit('set_main_loading', false);
        })
        .catch(() => {
            commit('set_main_loading', false);
        })
    },    
}

const getters = {
    layout(state) { return state.layout },
    navPos(state) { return state.layout.navPos },
    toolbar(state) { return state.layout.toolbar },
    footer(state) { return state.layout.footer },
    boxed(state) { return state.layout.boxed },
    roundedCorners(state) { return state.layout.roundedCorners },
    viewAnimation(state) { return state.layout.viewAnimation },
    isLogged(state) { return state.logged },
    splashScreen(state) { return state.splashScreen },
    getToken(state) { return state.token },
    getIsActive(state) { return state.isActive },
    getUser(state) { return state.user },    
};


export default {
    state,
    getters,
    mutations,
    actions
}