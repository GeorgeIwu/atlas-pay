<template>
	<div class="page-table ">
		<div class="page-header card-base card-shadow--small" style="padding-top: 10px; padding-bottom: 10px; margin-bottom: 10px ">
			<custom-filter first-button-name="Add" second-button-name="Download" />	
		</div>

		<custom-table :table-data="tableData" />
	</div>
</template>

<script>

import CustomTable from '@/components/CustomTable.vue'
import CustomFilter from '@/components/CustomFilter.vue'

export default {
	name: 'TableElement',
	components: {
		CustomTable,
		CustomFilter
	},
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

</style>

