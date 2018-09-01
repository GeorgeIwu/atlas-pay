<template>
	<div class="page-table ">
		<div class="card-base card-shadow--medium p-5">
			<el-tabs>
				<el-tab-pane label="Current" class="scrollable">
					<div class="flex center demo-box">
						<div class="left-box">big header 1</div>
						<div class="right-box box grow"><h1 class="h-big">Lorem ipsum dolor sit amet</h1></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">big header 2</div>
						<div class="right-box box grow"><h2 class="h-big">Lorem ipsum dolor sit amet</h2></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">big header 3</div>
						<div class="right-box box grow"><h3 class="h-big">Lorem ipsum dolor sit amet</h3></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 1</div>
						<div class="right-box box grow"><h1>Lorem ipsum dolor sit amet</h1></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 2</div>
						<div class="right-box box grow"><h2>Lorem ipsum dolor sit amet</h2></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 2</div>
						<div class="right-box box grow"><h2>Lorem ipsum dolor sit amet</h2></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Bank" class="scrollable">
					<div class="flex center demo-box">
						<div class="left-box">big header 1</div>
						<div class="right-box box grow"><h1 class="h-big">Lorem ipsum dolor sit amet</h1></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">big header 2</div>
						<div class="right-box box grow"><h2 class="h-big">Lorem ipsum dolor sit amet</h2></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">big header 3</div>
						<div class="right-box box grow"><h3 class="h-big">Lorem ipsum dolor sit amet</h3></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 1</div>
						<div class="right-box box grow"><h1>Lorem ipsum dolor sit amet</h1></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 2</div>
						<div class="right-box box grow"><h2>Lorem ipsum dolor sit amet</h2></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 2</div>
						<div class="right-box box grow"><h2>Lorem ipsum dolor sit amet</h2></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Payouts" class="scrollable">
					<div class="flex center demo-box">
						<div class="left-box">big header 1</div>
						<div class="right-box box grow"><h1 class="h-big">Lorem ipsum dolor sit amet</h1></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">big header 2</div>
						<div class="right-box box grow"><h2 class="h-big">Lorem ipsum dolor sit amet</h2></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">big header 3</div>
						<div class="right-box box grow"><h3 class="h-big">Lorem ipsum dolor sit amet</h3></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 1</div>
						<div class="right-box box grow"><h1>Lorem ipsum dolor sit amet</h1></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 2</div>
						<div class="right-box box grow"><h2>Lorem ipsum dolor sit amet</h2></div>
					</div>
					<div class="flex center demo-box">
						<div class="left-box">header 2</div>
						<div class="right-box box grow"><h2>Lorem ipsum dolor sit amet</h2></div>
					</div>
				</el-tab-pane>
			</el-tabs>		
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

