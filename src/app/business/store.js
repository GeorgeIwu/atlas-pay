// Customers Component Vuex Module
import api from '../../utils/auth/api'

const getDefaultState = () => ({
    loading: false,
    error: '',
    businesses: [],
    business: {},
    team: [],
    teamMember: {},
    tokens: {},
    preferences: {},
    webhooks: {},
})

const state = getDefaultState();

const mutations = {
    resetState (state) {
        Object.assign(state, getDefaultState())
    },
    set_business_loading (state, payload) {
        state.loading = payload
    },
    set_business_error (state, payload) {
        state.error = payload
    },
    set_businesses (state, payload) {
        state.businesses = payload
    },
    set_business (state, payload) {
        state.business = payload;
    },
    set_team (state, payload) {
        state.team = payload
    },
    set_team_member (state, {key, ...payload}) {
        state.team.members[key] = payload
    },
    set_tokens (state, payload) {
        state.tokens = payload
    },
    set_preferences (state, payload) {
        payload.callback ? state.preferences.callback = payload.callback : payload.callback

        payload.webhook ? state.preferences.webhook = payload.webhook : payload.webhook

        payload.charge_user_for_transaction ? state.preferences.charge_user_for_transaction = payload.charge_user_for_transaction : payload.charge_user_for_transaction

        payload.email_user_for_transaction ? state.preferences.email_user_for_transaction = payload.email_user_for_transaction : payload.email_user_for_transaction

        payload.email_customer_for_transaction ? state.preferences.email_customer_for_transaction  = payload.email_customer_for_transaction : payload.email_customer_for_transaction
    },
};

const actions = {
    fetchBusinesses ({commit}) {
        commit('set_business_loading', true)
        api.get(`/merchants`, {}, 'auth')
        .then(res => {
            commit('set_business_loading', false)
            commit('set_businesses', res.data.data);
            commit('set_business', state.business.uuid ? state.business : res.data.data[0]);
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
    fetchBusiness ({commit}, payload) {
        commit('set_business_loading', true)
        api.get(`/merchants/${payload}`, {}, 'auth')
            .then(res => {
                commit('set_business_loading', false)
                commit('set_business', res.data.data);
                // commit('set_businesses', res.data.data);
            })
            .catch(() => {
                commit('set_business_loading', false)
                commit('set_business_error', 'Error')
            });
    },
    createBusiness ({commit, dispatch}, { records }) {
        commit('set_business_loading', true)
        api.post(`/merchants`, records, 'auth')
        .then(res => {
            commit('set_business_loading', false)
            commit('set_business', res.data.data);
            dispatch('fetchBusinesses'); //some requests do not return the created object or may be created from another place 
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
    updateBusiness ({commit, dispatch}, { uuid, ...params }) {
        commit('set_business_loading', true)
        api.put(`/merchants/${uuid}`, params, 'auth')
        .then(() => {
            commit('set_business_loading', false)
            commit('set_business', { uuid, ...params });
            dispatch('fetchBusinesses'); //some requests do not return the created object or may be created from another place
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
    updateBusinessLogo ({commit}, payload) {
        commit('set_business_loading', true)
        api.put(`/merchants/${payload.merchant}/logo`, payload, 'auth')
        .then(() => {
            commit('set_business_loading', false)
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
    fetchTokens ({commit}, payload) {
        commit('set_business_loading', true)
        api.get(`/merchants/${payload.uuid}/tokens`, {}, 'auth')
            .then(res => {
                commit('set_business_loading', false)
                commit('set_tokens', res.data.data);
            })
            .catch(() => {
                commit('set_business_loading', false)
                commit('set_business_error', 'Error')
            });
    },
    fetchTeam ({commit}, payload) {
        commit('set_business_loading', true)
        api.get(`/merchants/${payload.uuid}/users`, {}, 'auth')
            .then(res => {
                commit('set_business_loading', false)
                commit('set_team', res.data.data);
            })
            .catch(() => {
                commit('set_business_loading', false)
                commit('set_business_error', 'Error')
            });
    },
    createTeamMember ({commit}, payload) {
        commit('set_business_loading', true)
        api.post(`/merchants/${payload.merchant}/users`, payload.records, 'auth')
        .then(() => {
            commit('set_business_loading', false)
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
    deleteTeamMember ({commit}, payload) {
        commit('set_business_loading', true)
        api.put(`/teams/${state.user.userId}`, payload, 'auth')
        .then(() => {
            commit('set_business_loading', false)
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
    updateTeamMember ({commit}, payload) {
        commit('set_business_loading', true)
        api.put(`/teams/${state.user.userId}`, payload, 'auth')
        .then(() => {
            commit('set_business_loading', false)
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
    fetchPreferences ({commit}, payload) {
        commit('set_business_loading', true)
        api.get(`/merchants/${payload.uuid}/preferences`, {}, 'auth')
            .then(() => {
                commit('set_business_loading', false)
            })
            .catch(() => {
                commit('set_business_loading', false)
                commit('set_business_error', 'Error')
            });
    },
    updatePreferences ({commit}, payload) {
        commit('set_business_loading', true)
        api.put(`/merchants/${payload.merchant_id}/preferences/${payload.uuid}`, payload, 'auth')
        .then(() => {
            commit('set_business_loading', false)
            commit('set_preferences', payload)
        })
        .catch(() => {
            commit('set_business_loading', false)
            commit('set_business_error', 'Error')
        });
    },
}

const getters = {
    getBusinesses: (state) => {
        return state.businesses
    },
    getBusiness: (state) => {
        return state.business
    },
    getBusinessTokens: (state) => {
        return state.tokens
    },
    getTeam: (state) => {
        return state.team
    },
    getTeamMember: (state) => {
        return state.teamMember
    },
    getPreferences: (state) => {
        return state.preferences
    },
};


export default {
    state,
    getters,
    mutations,
    actions
}