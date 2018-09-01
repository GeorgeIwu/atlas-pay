import Vue from 'vue'
import Router from 'vue-router'

//landing
import Landing from '../app/landing/index.vue'

//apps
import Dashboard from '../app/dashboard/index.vue'
import GettingStarted from '../app/getting.started/index.vue'
import Transactions from '../app/transactions/index.vue'
import Balance from '../app/balance/index.vue'
import Customers from '../app/customers/index.vue'
import Plans from '../app/plans/index.vue'
import Subscriptions from '../app/subscriptions/index.vue'
import PaymentPages from '../app/payment.pages/index.vue'
import Profile from '../app/profile/index.vue'

//developers
import Developers from '../app/developers/index.vue'
import APIs from '../app/developers/APIs.vue'
import Documentation from '../app/developers/Documentation.vue'

//Business
import Business from '../app/business/index.vue'
import Preferences from '../app/business/Preferences.vue'
import BusinessProfile from '../app/business/Profile.vue'
import Team from '../app/business/Team.vue'

//pages
import Login from '../app/main/Login.vue'
import Register from '../app/main/Register.vue'
import ForgotPassword from '../app/main/ForgotPassword.vue'
import NotFound from '../app/main/NotFound.vue'


import layouts from '../layout'
import store from '../store'

Vue.use(Router)


const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: '/landing',
			name: 'landing',
			component: Landing,
			meta: {
				layout: layouts.landing,
			}
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/getting-started',
			name: 'getting-started',
			component: GettingStarted,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/transactions',
			name: 'transactions',
			component: Transactions,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/balance',
			name: 'balance',
			component: Balance,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/customers',
			name: 'customers',
			component: Customers,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/plans',
			name: 'plans',
			component: Plans,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Typography',
				tags: ['ui']
			}
		},
		{
			path: '/subscriptions',
			name: 'subscriptions',
			component: Subscriptions,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['ui', 'translate']
			}
		},
		{
			path: '/payment-pages',
			name: 'payment-pages',
			component: PaymentPages,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['ui']
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/developers',
			name: 'developers',
			component: Developers,
			meta: {
				auth: true,
				layout: layouts.navLeft
			},
			children: [
				{
					path: 'apis',
					name: 'apis',
					component: APIs,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Material Design Icons',
						tags: ['material design']
					}
				},
				{
					path: 'documentation',
					name: 'documentation',
					component: Documentation,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Flag Icons',
						tags: ['list', 'ui']
					}
				}
			]
		},
		{
			path: '/business',
			name: 'business',
			component: Business,
			meta: {
				auth: true,
				layout: layouts.navLeft
			},
			children: [
				{
					path: 'profile',
					name: 'business-profile',
					component: BusinessProfile,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Material Design Icons',
						tags: ['material design']
					}
				},
				{
					path: 'team',
					name: 'team',
					component: Team,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Flag Icons',
						tags: ['list', 'ui']
					}
				},
				{
					path: 'preferences',
					name: 'preferences',
					component: Preferences,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Flag Icons',
						tags: ['list', 'ui']
					}
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.getToken
	},
	logout() {
		store.commit('resetState')
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth) {authrequired = true}

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				window.location.href = '/'
				return false
			} else { 
				next()
			}
		} else {
			if(to.name !== 'login'){
				window.location.href = '/login'
				return false
			}
			next()
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			window.location.href = '/'
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router