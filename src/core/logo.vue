<template>
	<div class="box-logo flex align-center" :class="{'nav-collapsed':collapseNav, [mode]:true}">
		<!--<div class="letter-logo">P</div>-->
		<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
		<div class="app-name" @click="goto('/')">
			<!-- <span style="color: #5f8fdf">Atlas</span>
			<span style="color: light-grey">Pay</span> -->
			<!-- <el-select style="background-color: transparent;" v-model="merchant.name" placeholder="Select">
				<el-option
					style="background-color: transparent;"
					v-for="item in [{ label: 'Unnamed account'}]"
					:key="item.label"
					:label="item.label"
					:value="item.label">
				</el-option>
			</el-select> -->
			
			<el-select style="background-color: transparent;" @change="fetchBusiness"  v-model="business" placeholder="Select" :default-first-option="true" >
                <el-option
                    style="background-color: transparent;"
                    v-for="item in (getBusinesses.length > 0 ? getBusinesses : [{company_name: 'Unnamed account', uuid: 0}])"
                    :key="item.uuid"
                    :label="item.company_name"
                    :value="item.uuid">
                </el-option>
            </el-select>
			<!-- {{ 'business' }} -->
			<!-- {{ business }} -->
		</div>
		<button class="collapse-nav" @click="collapseNavToggle">
			<i class="mdi mdi-menu"></i>
		</button>
	</div>	
</template>


<script>
import { mapGetters, mapActions } from "vuex"

export default {
	name: 'Logo',
	props: ['collapseNav', 'mode'],
	data() {
		return {
			business: {}
		}
	},
	methods: {
		...mapActions([
			'fetchBusinesses',
            'fetchBusiness',
            'createBusiness',
        ]),
		collapseNavToggle() {
			this.$emit('collapse-nav-toggle')
		},
		goto(index, indexPath) {
			this.$router.push(index)
		}
	},
	computed: {
		 ...mapGetters([ 
            'getBusinesses',
            'getBusiness'
        ]),
	},
	mounted() {
		this.fetchBusinesses()
  		this.business = this.getBusiness;
  	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';

.box-logo {
	height: 60px;
	padding: 0 20px;
	box-sizing: border-box;
	font-size: 20px;
	font-weight: bold;
	position: relative;
	@include text-bordered-shadow();

	.letter-logo {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: $text-color;
		color: $text-color-accent;
		border-radius: 5px;
		margin-right: 10px;
		font-weight: bolder;
		font-size: 20px;
	}

	.image-logo {
		width: 30px;
		height: 30px;
		margin-right: 10px;
		filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
	}

	.el-select-dropdown__item {
		border: 1px solid transparent;
		background-color: transparent !important;
	}

	.el-input__inner {
		border: 1px solid transparent;
		background-color: transparent !important;
		width: 170px;
	}

	.app-name {
		cursor: pointer;
	}

	.collapse-nav {
		position: absolute;
		top: 50%;
		left: 10px;
		height: 30px;
		width: 30px;
		margin-top: -15px;
		opacity: 0;
		box-shadow: 0px 0px 20px 10px $background-color;
		cursor: pointer;
		border: 1px solid $text-color-accent;
		border-radius: 50%;
		color: $text-color-accent;
		outline: none;
		background: $background-color;
		transition: all .5s;
	}

	&:hover {
		.collapse-nav {
			opacity: 1;
			left: 20px;
		}
	}


	&.nav-collapsed {
		.app-name {
			display: none;
		}
	}

	&.horizontal {
		height: 100%;

		.collapse-nav {
			display: none;
		}
	}
}


@media (max-width: 768px) {
	.box-logo {
		.collapse-nav {
			display: none;
		}

		&.horizontal {
			padding: 0 10px;

			.app-name {
				display: none;
			}
		}
	}

}
</style>
