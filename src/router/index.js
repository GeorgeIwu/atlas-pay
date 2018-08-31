import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/dashboard/index.vue'
import GettingStarted from '../views/apps/getting.started/index.vue'
import Transactions from '../views/apps/transactions/index.vue'
import Balance from '../views/apps/balance/index.vue'
import Customers from '../views/apps/customers/index.vue'
import Plans from '../views/apps/plans/index.vue'
import Subscriptions from '../views/apps/subscriptions/index.vue'
import PaymentPages from '../views/apps/payment.pages/index.vue'
import Profile from '../views/apps/profile/index.vue'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import NotFound from '../views/pages/NotFound.vue'

//ui
import Icons from '../views/ui/Icons/Icons.vue'
import MdIcons from '../views/ui/Icons/MdIcons.vue'
import FlagIcons from '../views/ui/Icons/FlagIcons.vue'

import layouts from '../layout'
import store from '../store'

Vue.use(Router)


const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: '/dashboard',
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
			path: '/icons',
			name: 'icons',
			component: Icons,
			meta: {
				auth: true,
				layout: layouts.navLeft
			},
			children: [
				{
					path: 'md-icons',
					name: 'md-icons',
					component: MdIcons,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Material Design Icons',
						tags: ['material design']
					}
				},
				{
					path: 'flag-icons',
					name: 'flag-icons',
					component: FlagIcons,
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
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true

	//console.log('authrequired', authrequired, to.name)

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