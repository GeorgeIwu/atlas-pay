<template>
	<div class="search-box">
		<el-autocomplete
		class="search-input"
		popper-class="search-box-popper card-base card-shadow--small"
		v-model="search"
		:fetch-suggestions="querySearch"
		placeholder="Search..."
		:trigger-on-focus="true"
		clearable
		prefix-icon="el-icon-search"
		size="small"
		@select="handleSelect"
		>
			<template slot-scope="props">
				<span class="value">{{ props.item.value }}</span>
				<span class="tags">{{ props.item.tags }}</span>
			</template>
			<template slot="suffix">
				<i class="el-input__icon el-icon-circle-close-outline" @click="search=''" v-if="search"></i>
			</template>
		</el-autocomplete>
	</div>
</template>

<script>
export default {
	name: 'Search',
	data() {
		return {
			search: '',
			list: []
		}
	},
	methods: {
		querySearch(queryString, cb) {
			var list = this.list;
			var results = queryString ? list.filter(this.createFilter(queryString)) : list
			// call callback function to return suggestions
			cb(results);
		},
		createFilter(queryString) {
			return (link) => {
				return (link.meta.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
			};
		},
		handleSelect(item) {
			this.goto(item.name)
		},
		flattenObject(object) {
			let obj = {};
			Object.keys(object).forEach(key => {
				if (typeof object[key] !== 'object') {
					obj[key] = object[key];
				} else {
					obj = { ...obj, ...this.flattenObject(object[key]) };
				}
			});
			return obj;
		},
		flatten(list, key, cb) {
			let newList = []

			for(let k in list) {
				let temp = Object.assign({}, list[k])
				if(temp[key] && temp[key].length)
					delete temp[key]

				newList.push(temp)

				if(list[k][key] && list[k][key].length){
					newList = newList.concat(list[k][key])
				}
			}

			let check = false
			for(let i in newList){
				if(newList[i][key] && newList[i][key].length)
					check = true
			}

			if(check)
				this.flatten(newList, key, cb)
			else
				cb(newList)				

			return true
		},
		parseList(list) {
			let parsed = []

			for(let k in list) {
				if(list[k].name && list[k].meta && list[k].meta.searchable) {
					let name = list[k].name
					let value = list[k].meta.title || name || ''
					let tags = ''
					if(list[k].meta.tags && list[k].meta.tags.length)
						tags = list[k].meta.tags.join(', ')
					
					let meta = name+value+tags

					if(value) {
						parsed.push({
							value,
							tags,
							name,
							meta
						})
					}
				}
			}

			return parsed
		},
		goto(name) {
			this.$router.push({name})
		}
    },
    mounted() {
		//console.log(this.$router.options.routes)
		this.flatten(this.$router.options.routes, 'children', (data)=>{
			this.list = this.parseList(data)
		})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/_variables';
@import '../assets/scss/card-shadow';

.search-box {
	max-width: 300px;
	width: 100%;

	.search-input {
		overflow: hidden;
		transition: all .5s;
		background: transparent;

		&:hover, &:active, &:focus {
			@extend .card-base;
			@extend .card-shadow--small;
		}
	}
}
</style>

<style lang="scss">
@import '../assets/scss/_variables';

.search-box {
	.el-autocomplete {
		width: 100%;

		input {
			border-color: transparent;
			border-radius: 0px;
			background-color: transparent;
			line-height: 33px;
			border-bottom-color: transparentize($text-color-accent, .8);
			transition: all .5s;
			border-radius: 5px;
				background-color: #fff;
			
			&:hover {
				border-color: transparent;
			}
			&:focus {
				border-color: $text-color-accent; 
			}
			&:hover, &:active, &:focus {
				// border-radius: 5px;
				// background-color: #fff;
			}
		}

		.el-input__suffix {
			cursor: pointer;
		}
	}
}

.search-box-popper {
	margin-top: 2px !important;
	border-radius: 5px;
	overflow: hidden;

	.el-scrollbar__wrap {
		border: none;
		max-height: 240px;
	}

	.value {
		color: $text-color-accent;
		font-weight: bold;
		margin-right: 10px;
		text-transform: capitalize;
	}
	.tags {
		opacity: .5;
		text-transform: lowercase;
	}

	.popper__arrow {
		display: none;
	}
}
</style>

