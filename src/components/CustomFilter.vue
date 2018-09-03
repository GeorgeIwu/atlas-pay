<template>
	<div class="row flex">
		<el-dropdown class="box left">
			<el-button >Filter<i class="el-icon-arrow-down el-icon--right"></i></el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>Date</el-dropdown-item>
				<el-dropdown-item>Amount</el-dropdown-item>
				<el-dropdown-item>Status</el-dropdown-item>
				<!-- <el-dropdown-item>Date: <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker></el-dropdown-item>
				<el-dropdown-item>Action 2</el-dropdown-item>
				<el-dropdown-item>Action 3</el-dropdown-item>
				<el-dropdown-item>Action 4</el-dropdown-item> -->
				<el-dropdown-item><el-button class="right" type="primary" >Done</el-button></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<div class="box right">
			<el-button class="ml-1" type="primary" icon="el-icon-plus" @click="firstButtonAction" >{{ firstButtonName }}</el-button>
			<el-button type="info" icon="el-icon-download" @click="secondButtonAction" >{{ secondButtonName }}</el-button>
		</div>
	</div>
</template>

<script>


export default {
	name: 'TableElement',
	data() {
      	return {
      	}
    },
    props: {
        firstButtonName: {
            type: String,
            default: 'Add'
        },
        firstButtonAction: {
            type: Function,
            default: () => {}
		},
		secondButtonName: {
            type: String,
            default: 'Export'
        },
        secondButtonAction: {
            type: Function,
            default: () => {}
		},
		onSearch: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
		
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';

.table-box {
	overflow: auto;
}

.pagination {
	height: 55px; 
	text-align: right;
	background-color: rgba(243,247,250,.5);
	border-top-left-radius: 0px;
	border-top-right-radius: 0px;
}

.el-pager li { 
	background-color: transparent;
}

// .el-pagination .el-pager li { 
// 	background-color: transparent;
// }

</style>

