<template>
	<vue-scroll class="page-dashboard">
		
		<resize-observer @notify="__resizeHanlder" />

		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium bg-accent p-20" style="height:250px" v-loading="!asyncChart1">
					<div class="flex justify-space-between">
						<!-- <h1 class="white-text mv-0 animated fadeInDown">Statistics</h1> -->
						<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Today</h3>
						<el-select v-model="value" placeholder="Select">
							<el-option
							v-for="item in [{label: 'Revenue'}, {label: 'Payments'}]"
							:key="item.label"
							:label="item.label"
							:value="item.label">
							</el-option>
						</el-select>
					</div>
					<div id="chart1" style="height:180px; width:100%"></div>
				</div>
			</el-col>
		</el-row>

		<el-row class="mt-30" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium p-20 mb-30" style="height:250px">
					<div class="flex justify-space-between">
						<div>
							<h2 class="mv-0 animated fadeInDown">Report</h2>
							<!-- <h4 class="mt-5 mb-40 o-050 animated slideInUp">This week</h4> -->
						</div>
						<div class="radio-switcher">
							<el-radio-group v-model="radio2">
								<el-radio-button label="Day"></el-radio-button>
								<el-radio-button label="Week"></el-radio-button>
								<el-radio-button label="Month"></el-radio-button>
							</el-radio-group>
						</div>
					</div>

					<h4 class="mb-0 mt-0">New Users</h4>
					<el-progress :percentage="100" status="success"></el-progress>
					<h4 class="mb-0">Views</h4>
					<el-progress :percentage="70"></el-progress>
					<h4 class="mb-0">Conversions</h4>
					<el-progress :percentage="20" status="exception"></el-progress>
				</div>
			</el-col>
		</el-row>
		
	
	</vue-scroll>
</template>

<script>
import echarts from 'echarts'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
	name: 'Dashboard',
	data () {
		return {
			asyncComponent: 'peity',
			value: 'Revenue',
			asyncChart1: true,
			asyncChart2: true,
			chart1: null,
			chart2: null,
			resized: false,
			list: [
				{"activity":111, "progress": 70, "status":"active", "id":1,"first_name":"Fidela","last_name":"MacLaverty","email":"fmaclaverty0@scribd.com","gender":"Female","ip_address":"165.9.197.163"},
				{"activity":111, "progress": 55, "status":"intermediary", "id":2,"first_name":"Garrard","last_name":"Inge","email":"ginge1@51.la","gender":"Male","ip_address":"138.87.225.97"},
				{"activity":111, "progress": 100, "status":"positive", "id":3,"first_name":"Clayborn","last_name":"Blencoe","email":"cblencoe2@cbc.ca","gender":"Male","ip_address":"237.146.154.222"},
				{"activity":111, "progress": 12, "status":"negative", "id":6,"first_name":"Elna","last_name":"Deboick","email":"edeboick5@4shared.com","gender":"Female","ip_address":"53.209.210.199"},
				{"activity":111, "progress": 0, "status":"", "id":8,"first_name":"Sheffie","last_name":"Fellgett","email":"sfellgett7@ow.ly","gender":"Male","ip_address":"219.29.191.217"},
				//{"activity":111, "progress": 68, "status":"active", "id":4,"first_name":"Reinaldos","last_name":"Briiginshaw","email":"rbriiginshaw3@mashable.com","gender":"Male","ip_address":"35.148.222.21"},
				//{"activity":111, "progress": 43, "status":"intermediary", "id":5,"first_name":"Abigael","last_name":"Richmond","email":"arichmond4@shinystat.com","gender":"Female","ip_address":"135.221.192.85"},
				//{"activity":111, "progress": 100, "status":"positive", "id":7,"first_name":"Lanna","last_name":"Prentice","email":"lprentice6@oracle.com","gender":"Female","ip_address":"198.34.29.215"},
				//{"activity":111, "progress": 88, "status":"active", "id":9,"first_name":"Mamie","last_name":"Calkin","email":"mcalkin8@oakley.com","gender":"Female","ip_address":"69.0.235.44"},
				//{"activity":111, "progress": 9, "status":"negative", "id":10,"first_name":"Saudra","last_name":"Dunniom","email":"sdunniom9@ameblo.jp","gender":"Female","ip_address":"182.157.218.101"}
			],
			radio1: 'Month',
			radio2: 'Week',
			data3: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
				datasets: [{
					label: 'Visitors',
					backgroundColor: '#fff',
					stack: 'Stack 0',
					data: [
						23,
						41,
						34,
						62,
						46,
						57,
						68
					]
				}]
            },
            options3: {
				maintainAspectRatio: false,
                title: {
					display: false,
					text: 'Chart.js Bar Chart - Stacked'
				},
				legend: {
					display: false
				},
				tooltips: {
					mode: 'index',
					intersect: false
				},
				responsive: true,
				scales: {
					xAxes: [{
						stacked: true,
						gridLines: {
							display:false,
							drawBorder: false,
						},
						ticks: {
							fontColor: "#fff",
						}
					}],
					yAxes: [{
						stacked: true,
						gridLines: {
							display:false,
							drawBorder: false,
						},
						ticks: {
							display: false
						}
					}]
				}
            },
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	methods: {
		__resizeHanlder: _.throttle(function (e) {
			if(this.resized) {			

				this.asyncComponent = null
				this.removePeity()
				setTimeout(()=>{this.asyncComponent = 'peity'}, 1000)
		
				this.asyncChart1 = false
				setTimeout(()=>{this.asyncChart1 = true; this.resizeChart1()}, 1000)
			}
			this.resized = true
		}, 700),
		removePeity() {
			const peityEl = document.querySelectorAll('.widget .peity')//.forEach((el)=>{el.remove()})
			//ie fix
			for(let i=0; i<peityEl.length; i++) {peityEl[i].parentNode.removeChild(peityEl[i])}
		},
		initChart1() {
			this.chart1 = echarts.init(document.getElementById('chart1'))

			// Generate data
			let category = [];
			let dottedBase = +new Date();
			let lineData = [];
			let barData = [];

			for (let i = 0; i < 6; i++) {
				let date = new Date(dottedBase += 3600 * 24 * 1000);
				category.push([
					date.getFullYear(),
					date.getMonth() + 1,
					date.getDate()
				].join('-'));
				let b = Math.random() * 200;
				let d = Math.random() * 200;
				barData.push(parseInt(b))
				lineData.push(parseInt(d + b));
			}


			this.chart1.setOption({
				//backgroundColor: '#0f375f',
				grid: {
					show: false,
					left: '20px',
					right: '50px',
					bottom: '20px',
					top: '20px',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					show: false,
					data: ['line', 'bar'],
					textStyle: {
						color: '#ccc'
					}
				},
				xAxis: {
					data: category,
					boundaryGap : false,
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.5)'
						}
					}
				},
				yAxis: {
					splitLine: {show: false},
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.5)'
						}
					}
				},
				series: [
					{
						name: 'Data A',
						type: 'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff', 
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
						data: lineData
					}, 
					{
						name: 'Data B',
						type: 'bar',
						barWidth: 10,
						itemStyle: {
							normal: {
								barBorderRadius: 5,
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#fff'},
										{offset: 1, color: 'rgba(255,255,255,0)'}
									]
								)
							}
						},
						data: barData
					},
					/* {
						name: 'line',
						type: 'bar',
						barGap: '-100%',
						barWidth: 10,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: 'rgba(20,200,212,0.5)'},
										{offset: 0.2, color: 'rgba(20,200,212,0.2)'},
										{offset: 1, color: 'rgba(20,200,212,0)'}
									]
								)
							}
						},
						z: -12,
						data: lineData
					},*/ 
					{
						name: 'Data C',
						type: 'pictorialBar',
						symbol: 'rect',
						itemStyle: {
							normal: {
								color: 'rgba(255,255,255,0.1)'
							}
						},
						symbolRepeat: true,
						symbolSize: [12, 4],
						symbolMargin: 1,
						z: -10,
						data: lineData
					}
				]
			})
		},
		destroyChart1() {
			if(this.chart1) {
				this.chart1.dispose()
				this.chart1 = null
			}
		},
		resizeChart1() {
			if (this.chart1) {
				this.chart1.resize()
			}
		},		
	},
	mounted() {
		this.initChart1()
	},
	beforeDestroy() {
		this.destroyChart1()
	},
	components: {
		Timeline,
		TimelineItem,
		TimelineTitle
	}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/_variables';

.widget {
	height: 200px;
	position: relative;

	.widget-header {

		.widget-icon-box {
			background: rgba(0, 0, 0, .02);
			border: 1px solid rgba(0, 0, 0, .02);
			border-radius: 4px;
			text-align: center;
			width: 60px;
			padding: 5px;
		}

		.widget-title {
			font-weight: bold;
		}
	}



	.badge-box {
		.badge {
			//background: rgba(0, 0, 0, .02);
			display: inline-block;
			//padding: 2px 5px;
			//border: 1px solid rgba(0, 0, 0, .02);
			border-radius: 4px;
			font-size: 80%;
		}
	}
}


/*@media (max-width: 768px) {
	.el-row {
		//margin-left: 0 !important;
		//margin-right: 0 !important;

		.el-col-24 {
			//padding-left: 0 !important;
			//padding-right: 0 !important;
		}
	}
}*/

.timeline {
	max-width: 1200px;
	margin: 6px;
}
.timeline, .timeline-title {
	color: $text-color;
	line-height: 1.4;
	cursor: default;
	font-family: inherit;
}


/*@media (min-width: 1200px) and (max-width: 1850px) {
	.widget {
		.widget-header {
			.widget-icon-box {
				display: none;
			}
		}
	}
}*/
@media (min-width: 768px) and (max-width: 1040px) {
	.radio-switcher {
		display: none;
	}

	.widget {
		.widget-header {
			.widget-icon-box {
				display: none;
			}
		}
	}
}
@media (max-width: 420px) {
	.radio-switcher {
		display: none;
	}
}
</style>

<style lang="scss">
.page-dashboard {

	.widget {
		.peity {
			position: absolute;
			bottom: -1px;
			left: 0;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	table.styled {
		.peity {
			margin-right: 10px;
		}
	}

	.vb-content {
		padding: 0 20px;
		box-sizing: border-box !important;
		margin-top: -5px;
		margin-left: -20px;
		margin-right: -20px;
		height: calc(100% + 15px) !important;
		width: calc(100% + 40px) !important;
	}
}

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
}
</style>


