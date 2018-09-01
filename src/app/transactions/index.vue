<template>
	<div class="page-table ">
		<div class="page-header card-base card-shadow--small" style="padding-top: 10px; padding-bottom: 10px; margin-bottom: 10px ">
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
					<el-button class="ml-1" type="primary" icon="el-icon-plus">New</el-button>
					<el-button type="info" icon="el-icon-download">Export</el-button>
				</div>
			</div>	
		</div>

		<div class="table-box card-base card-shadow--medium">
			<el-table :data="tableData" style="width: 100%;" height="513">
				<el-table-column
					prop="date"
					label="Date"
					sortable
					width="180"
					:filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
					:filter-method="filterHandler"></el-table-column>
				<el-table-column
					prop="name"
					label="Name"
					width="180"></el-table-column>
				<el-table-column
					prop="address"
					label="Address"
					:formatter="formatter"></el-table-column>
				<el-table-column
					prop="tag"
					label="Tag"
					width="100"
					:filters="[{ text: 'Home', value: 'Home' }, { text: 'Office', value: 'Office' }]"
					:filter-method="filterTag"
					filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag
						:type="scope.row.tag === 'Home' ? 'primary' : 'success'"
						close-transition>{{scope.row.tag}}</el-tag>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination flex justify-flex-end"
				layout="prev, pager, next"
				:page-size="20"
				:pager-count="11"
				:total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>


export default {
	name: 'TableElement',
	data() {
      	return {
        	tableData: [
				{ date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Home' },
				{ date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Home' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Home' },
				{ date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Home' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' },
				{ date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'Office' }
			]
      	}
    },
    methods: {
		formatter(row, column) {
        	return row.address;
		},
		filterTag(value, row) {
        	return row.tag === value;
		},
		filterHandler(value, row, column) {
        	const property = column['property'];
        	return row[property] === value;
      	}
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

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

