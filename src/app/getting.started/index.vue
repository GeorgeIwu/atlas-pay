<template>
	<div class="page-contacts flex column" id="page-contacts">
		<resize-observer @notify="__resizeHanlder" />
		
		<div class="contacts-root box grow flex gaps justify-center" :class="contactsClass">
			<div class="card-base card-shadow--small search-card row gaps">
				<h1 class="mt-2">Business</h1>
				
				<small>The ENIAC programmers included a number of women: Jean Bartik,  story in 1985.</small>

				
				<a href="#" @click="openDialog({})"><i class="mdi mdi-plus"></i> create a business</a>
			</div>
			<div class="card-base card-shadow--small search-card ml-2 row gaps">
				<h1 class="mt-0">Payments</h1>
				
				<small>The ENIAC programmers included a number of women: Jean Bartik,  story in 1985.</small>

				
				<a href="#" @click="openDialog({})"><i class="mdi mdi-plus"></i> create a payment page</a>
			</div>
			<div class="card-base card-shadow--small search-card ml-2 row gaps">
				<h1 class="mt-0">Team</h1>
				
				<small>The ENIAC programmers included a number of women: Jean Bartik,  story in 1985.</small>

				
				<a href="#" @click="openDialog({})"><i class="mdi mdi-plus"></i> create a team member</a>
			</div>
			
		</div>

		<!--<div class="search-wrap flex align-center">
			<div><i class="mdi mdi-magnify"></i></div>
			<input v-model="search" placeholder="Search a contact" class="box grow"/>
			<div class="contacts-tot">{{contactsFiltered.length}} contacts</div>
			<el-button icon="mdi mdi-account-plus" circle @click="openDialog({})"></el-button>
		</div>-->
		

		<user-dialog :dialogvisible.sync="dialogvisible" :userdata="userdata"></user-dialog>
	</div>
</template>

<script>
import UserDialog from '@/components/UserDialog'
import Contacts from '@/assets/data/CONTACTS_MOCK_DATA.json'

export default {
	name: 'Contacts',
	data() {
		return {
			search: '',
			dialogvisible: false,
			pageWidth: 0,
			userdata: {},
			contacts: Contacts.slice(0, 30)
		}
	},
	computed: {
		contactsFiltered() {
			return this.contacts.filter(({full_name, email, phone}) => (full_name+email+phone).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
		},
		contactsClass() {
			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
		}
	},
	methods: {
		openDialog(data) {
			this.userdata = data
			this.dialogvisible = true
		},
		setPageWidth() {
			this.pageWidth = document.getElementById('page-contacts').offsetWidth
		},
		__resizeHanlder: _.throttle(function (e) {
			this.setPageWidth()
		}, 700)
	},
	mounted() {
		this.setPageWidth()
	},
	components: {
		UserDialog
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-contacts {
	height: 100%;
	margin: 0 !important;
	padding: 20px;
	padding-bottom: 10px;
	box-sizing: border-box;

	.search-card {
		padding: 50px;
		max-width: 350px;
		max-height: 520px;
		box-sizing: border-box;
		margin-bottom: 15px; 

		.el-input, .el-button {
			width: 100%;
		}
	}

	.search-wrap {
		margin: 0 auto;
		margin-bottom: 10px;
		padding: 0px 30px;
		box-sizing: border-box;
		width: 100%;
		max-width: 600px;

		i {
			display: inline-block;
			width: 22px;
		}

		input {
			outline: none;
			background: transparent;
			border: none;
			font-size: 15px;
			position: relative;
			top: -2px;
			width: 100%;
			padding: 0;
			color: $text-color;
		}

		.contacts-tot {
			margin-right: 20px;
			margin-left: 10px;
		}

		a {
			border-bottom: 1px solid;
			text-decoration: none;
			color: $text-color;

			&:hover {
				opacity: .6;
			}
		}
	}

	.contacts-root {
		max-height: 100%;
	}

	.contacts-list {
		//margin: 0 auto;
		width: 100%;
		max-width: 965px;
		padding: 0px 30px;
		box-sizing: border-box;

		.contact {
			margin: 10px 0;
			padding: 5px;
			box-sizing: border-box;
			cursor: pointer;
			transition: all .5s .25s;

			.star {
				.mdi-star {
					color: #ffd730;
				}
				.mdi-star-outline {
					opacity: .5;
				}
			}

			.avatar {
				width: 60px;
				transition: all .5s .25s;

				img {
					border: 1px solid transparentize($text-color, .9);
					box-sizing: border-box;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					transition: all .5s .25s;
				}
			}

			.info {
				word-break: break-word;

				.name {
					
					//.fullname {}

					.email {
						opacity: 0;
						line-height: 0;
						transition: all .5s .25s;
					}

					.phone {
						display: none;
					}
				}

				//.phone {}
			}

			&:hover {
				margin: 15px -20px;
				padding: 10px;
				background-color: lighten($background-color, 20%);
				border-radius: 5px;
				box-shadow: 0 8px 16px 0 rgba(40,40,90,.09),0 3px 6px 0 rgba(0,0,0,.065);

				.avatar {
					width: 90px;

					img {
						width: 90px;
						height: 90px;
					}
				}
				
				.info {
					.name {
						.email {
							opacity: 1;
							line-height: 1.4;
						}
					}
				}
			}
		}
	}

	.contacts-root {
		&.medium {
			.search-card {
				padding: 20px;
				max-width: 260px;
				max-height: 260px;
			}
		}
		&.small {
			overflow-y: auto;
			display: block;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			padding: 5px;

			.search-card {
				padding: 20px;
				max-width: 100%;
				width: 100%;
				//max-height: 240px;
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
			
			.contacts-list {
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
		}
	}
}

@media (max-width: 768px) {
	.page-contacts {
		.search-wrap {
			padding: 0;
		}
		.contacts-list {
			padding: 0px;

			.contact { 
				.avatar {
					width: 40px;

					img {
						width: 40px;
						height: 40px;
					}
				}

				.info {
					.phone {
						display: none;
					}

					.name {
						.phone {
							display: block;
						}
					}
				}

				&:hover {
					margin: 15px 0px;

					.avatar {
						width: 60px;

						img {
							width: 60px;
							height: 60px;
						}
					}
				}
			}
		}

		.contacts-root {
			&.medium {
				.contacts-list {
					padding: 0 30px;
				}
			}
			&.small {
				.contacts-list {
					padding: 8px;
				}
			}
		}
	}
}
</style>

