<template>
	<el-menu 
		:default-active.sync="activeLink" 
		:mode="mode" 
		@select="goto" 
		:collapse="isCollapse" 
		:unique-opened="true"
		background-color="transparent"
		class="main-navigation-menu"
		:class="{'nav-collapsed':isCollapse}"
	>
		<el-menu-item index="/dashboard">
			<i class="mdi mdi-home"></i><span slot="title">Home</span>
		</el-menu-item>
		<el-menu-item index="/getting-started">
			<i class="mdi mdi-check"></i><span slot="title">Getting Started</span>
		</el-menu-item>
		
		<div class="el-menu-item-group__title"><span></span></div>
		<el-menu-item index="/transactions">
			<i class="mdi mdi-swap-horizontal"></i><span slot="title">Transactions</span>
		</el-menu-item>
		<el-menu-item index="/balance">
			<i class="mdi mdi-cash-multiple"></i><span slot="title">Balance</span>
		</el-menu-item>
		<el-menu-item index="/customers">
			<i class="mdi mdi-account-circle"></i><span slot="title">Customers</span>
		</el-menu-item>
		
		<div class="el-menu-item-group__title"><span></span></div>
		<el-menu-item index="/plans">
			<i class="mdi mdi-black-mesa"></i><span slot="title">Plans</span>
		</el-menu-item>
		<el-menu-item index="/subscriptions">
			<i class="mdi mdi-cast"></i><span slot="title">Subscriptions</span>
		</el-menu-item>
		<el-menu-item index="/payment-pages">
			<!-- <i class="mdi mdi-credit-card-multiple"></i><span slot="title">Payment Pages</span> -->
			<i class="mdi mdi-newspaper"></i><span slot="title">Payment Pages</span>
		</el-menu-item>
		
		
		<div class="el-menu-item-group__title"><span></span></div>
		<div class="el-menu-item-group__title"><span></span></div>
		<el-submenu index="developers" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-console"></i><span>Developers</span>
			</template>
			<el-menu-item index="/developers/apis">
				<span slot="title">API keys/Webhooks</span>
			</el-menu-item>
			<el-menu-item index="/developers/documentation">
				<span slot="title">Documentation</span>
			</el-menu-item>
		</el-submenu>


		<div class="el-menu-item-group__title"><span></span></div>
		<el-submenu index="business" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-store"></i><span>Business settings</span>
			</template>
			<el-menu-item index="/business/profile">
				<span slot="title">Profile</span>
			</el-menu-item>
			<el-menu-item index="/business/team">
				<span slot="title">Team</span>
			</el-menu-item>
			<el-menu-item index="/business/preferences">
				<span slot="title">Preferences</span>
			</el-menu-item>
		</el-submenu>

		

	</el-menu>	
</template>


<script>
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'Nav',
	props: ['mode', 'isCollapse'],
	data() {
		return {
			isIe: true,
			isEdge: true,
			activeLink: null
		}
	},
	methods: {
		goto(index, indexPath) {
			if(index.charAt(0) === '/') {
				this.$router.push(index)
				this.$emit('push-page', {page:index})
			}

		},
		setLink(path) {
			this.activeLink = path
		}
	},
	created() {
		if(browser.name !== 'ie') this.isIe = false
		if(browser.name !== 'edge') this.isEdge = false

		this.setLink(this.$router.currentRoute.path)
		this.$router.afterEach((to, from) => {
			this.setLink(this.$router.currentRoute.path)
			//console.log('afterEach', to, from)
		})
		//console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
	},
	mounted() {
		//console.log('nav component mounted')				
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';

.el-menu {
	border: none;
}
.el-menu::before, .el-menu::after {
	display: none;
}
.el-submenu, .el-menu-item {
	.mdi {
		vertical-align: middle;
		margin-right: 5px;
		display: inline-block;
		width: 24px;
		text-align: center;
		font-size: 18px;
	}
}
</style>

<style lang="scss">
@import '../assets/scss/_variables';

.main-navigation-menu {
	transition: width .5s;

	&:not(.el-menu--collapse) {
		.el-submenu__title, .el-menu-item {
			height: 40px;
			line-height: 40px;
			background-color: transparent !important;
		}

		&:not(.el-menu--horizontal) {
			.el-menu-item, .el-submenu {
				position: relative;
				
				&::before {
					content: '';
					display: block;
					width: 0px;
					height: 1px;
					position: absolute;
					bottom: 10px;
					left: 30px;
					background: $text-color;
					z-index: 1;
					opacity: 0;
					transition: all .7s cubic-bezier(.55,0,.1,1);
				}
				&:hover {
					&::before {
						width: 100px;
						opacity: 1;
						//left: 50px;
						transform: translate(20px, 0);
					}
				}

				&.is-active {
					&::before {
						background: $text-color-accent;
					}
				}
			}
		}

		.el-submenu.is-opened {
			//background: #edf1f6 !important;
			//background: rgba(223, 228, 234, 0.38) !important;
			position: relative;

			&::after {
				content: '';
				display: block;
				width: 2px;
				position: absolute;
				top: 40px;
				bottom: 10px;
				left: 31px;
				background: $text-color;
				z-index: 1;
			}

			&::before {
				display: none;
			}

			.el-menu-item, .el-submenu {
				&::before, &::after {
					display: none;
				}
			}
		}

		.el-menu-item-group__title {
			padding: 15px 0 0px 20px;
			color: transparentize($text-color, 0.65);
		}
	}

	.el-submenu__title, .el-menu-item:not(.is-active) {
		color: $text-color;
		
		i {		
			color: $text-color;
		}
	}

	&.el-menu--collapse {
		.el-menu-item-group__title {
			padding: 15px 0 0px 0px;
			width: 100%;
			text-align: center;
		}

		.el-submenu__title:hover, .el-menu-item:hover {
			background-color: rgba(0, 0, 0, 0.05) !important;
		}
	}

	&.el-menu--horizontal {
		white-space: nowrap;
		/*width: fit-content;
		width: max-content;*/
		overflow: hidden;
		display: table;

		& > * {
			float: inherit !important;
			display: inline-block;
		}
	}

	&.nav-collapsed {
		.el-menu-item,.el-submenu__title {
			& > span {
				display: none;
			}
		}
	}
}

.main-navigation-submenu { 
	.el-menu {
		background: #fff !important;

		.el-menu-item:not(.is-active) {
			color: $text-color;
		}
		.el-menu-item:hover {
			background-color: transparentize($background-color, 0.3) !important;
		}
	}
}
</style>
