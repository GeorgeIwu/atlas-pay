<template>
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
</template>

<script>


export default {
	name: 'TableElement',
	data() {
      	return {
      	}
    },
    props: {
        tableData: {
            type: Object,
            default: () => {}
        },
        onSelectPage: {
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

