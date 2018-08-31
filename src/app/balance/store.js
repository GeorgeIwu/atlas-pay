// // Customers Component Vuex Module
// import api from '../utils/auth/api'
// import { toaster } from '../utils/helper'

// const getDefaultState = () => ({
//     transactions: [],
//     transaction: {}    
// })

// const state = getDefaultState();

// const mutations = {
//     resetState (state) {
//         Object.assign(state, getDefaultState())
//     },
//     set_transactions (state, payload) {
//         state.transactions = payload
//         state.transaction ? state.transaction = payload[0] : state.transaction;
//     },
//     set_transaction (state, payload) {
//         const hasRecord = state.transactions.filter((transaction, i) => transaction.id === payload.id)
//         state.transaction = payload        
//         hasRecord[0] ? state.transactions = [ ...state.transactions, ...payload  ] : state.transactions
//     },
// };

// const actions = {
//     fetchTransactions ({commit}, payload) {
//         // toaster('Fetching Transactions Data');
//         api.get(`/merchants/${payload.merchantUUID}/transactions?live_mode=test`,  {}, 'auth')
//         .then(res => {
//             const transactions = res.data.data
//             commit('set_transactions', transactions);
//             // toaster('Transactions data', 'Fetched Successfuly', 'success'); 
//         })
//         .catch(error => {
//             toaster('Error', 'Sorry, there was an error, pls try again later', 'error'); 
//         });
//     },
//     fetchTransaction ({commit}, payload) {
//         // toaster('Fetching Transaction Data'); 
//         commit('set_transaction', payload);
//         api.get(`/merchants/${payload.merchantUUID}/transactions/${payload.transactionID}?live_mode=test`, {}, 'auth')
//         .then(res => {
//             // dispatch('actGetCustomerDetails', { customer: customerID, merchantToken: payload.merchantToken })    
//             const { metadata, ...rest } = res.data.data
//             commit('set_transaction', { metadata, ...rest });
//             // toaster('Transaction data', 'Fetched Successfuly', 'success'); 
//         })
//         .catch(error => {
//             toaster('Error', 'Sorry, there was an error, pls try again later', 'error'); 
//         });
//     }
// }

// const getters = {
//     getTransactions: (state) => {
//         return state.transactions
//     },
//     getTransaction: (state) => {
//         return state.transaction
//     }    
// };


// export default {
//     state,
//     getters,
//     mutations,
//     actions
// }