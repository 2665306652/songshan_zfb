<!-- 导游 -->
<template>
	<view>
		<!-- 还需要一个下拉组件 -->
		<sort-tab class="sort-tab-wrap fixed" :sortTabList="tourTabData" @selectcancel="selectcancel" @chooseItem="chooseItem"
		 @complexChooseItem="complexChooseItem"></sort-tab>
		<!-- 数据组件 -->
		<tourGuide :itemList="artList"></tourGuide>
	</view>
</template>
<script>
	var page = 1;
	import tourGuide from '@/components/tourGuide/tourGuide'; //item组件
	import SortTab from '@/components/common/pulldown/pulldown';
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	export default {
		components: {
			tourGuide,
			SortTab
		},
		data() {
			return {
				top: 0,
				// 演示文章数据
				artList: [],
				tourTabData:[
					{
					"name":"性别/年龄",
					"val":"select",
					"subTab":[
						
						{
							"title":"性别",
							"data":[
								{"name":"不限","val":""},
								{"name":"男","val":"1"},
								{"name":"女","val":"2"},
							]
							},
						{
							"title":"年龄",
							"data":[
								{"name":"不限","val":""},
								{"name":"90后","val":"1"},
								{"name":"80后","val":"2"},
								{"name":"70后","val":"3"},
								{"name":"60后","val":"4"},
							]
						},
						]
					},
					{
					"name":"综合排序",
					"val":"sort",
					"subTab":[
						{"name": '综合排序', "val": ''}, 
						{"name": '已服务次数由高到底', val: '1'},
						// {"name": '评价重多到少', "val": '2'},
						{"name": '评分由高到低', "val": '3'},
						]
					}			 
				],
				sex:'',
				age:'',
				synthesis:''
			};
		},
		onShow() {
			let _this=this;
			uniRequest.post('/tourguide/gethometourguidelist', { 
					sex:_this.sex,
					age:_this.age,
					synthesis:_this.synthesis
					}).then(function (res) {
						_this.artList=res.data.data
					}).catch(function (error) {
						console.log(error);
					});
		},
		onLoad: function() {
			// #ifdef H5
			this.top = '44px';
			// #endif
			page = 1;
			// this.getNewsList();
			// this.getTabDates();
			
		},


		/*
		 * onPullDownRefresh()   下拉刷新
		 * onReachBottom()      加载更多
		 * */
// 		onPullDownRefresh: function() {
// 			// 重置分页及数据
// 			page = 1;
// 			this.artList = [];
// 			this.getNewsList();
// 		},
// 		onReachBottom: function() {
// 			this.getNewsList();
// 		},
// 

		methods: {


			/*
			 * 数据请求的方法
			 * getNewsList（item数据请求）
			 * getTabDates(tab数据请求)
			 * * 组件中的方法
			 * artList（索引）  item详情方法（及其数据的请求跳转的路径）
			 * */


			// getNewsList: function() {
				// uni.showLoading({});
				// 假设已经到底，实际根据api接口返回值判断
				// if (page >= 3) {
				// 	uni.showToast({
				// 		"title": "已经加载全部",
				// 		icon: "none"
				// 	});
				// 	return;
				// }
				// 接口
				// uni.request({
				// 	url: 'https://www.easy-mock.com/mock/5cb9655c01e2e57715d324b0/example/imgnewlist?page=' + page +
				// 		'#!method=get&cate=' + cate?cate:0,
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		console.log(res.data,111)
				// 		var newsList = res.data.data;
				// 		this.artList = this.artList.concat(newsList);
				// 		uni.hideLoading();
				// 		page++;
				// 	},
				// 	complete: res => {
				// 		uni.hideLoading();
				// 		uni.stopPullDownRefresh();
				// 	}
				// });

				// this.artList = data.tourGuide

			// },
			// getTabDates() {
			// 	// uni.request({
			// 	// 	url: 'https://www.easy-mock.com/mock/5cb9655c01e2e57715d324b0/example/imgnewlist?page=' + page +
			// 	// 		'#!method=get&cate=' + cate?cate:0,
			// 	// 	method: 'GET',
			// 	// 	data: {},
			// 	// 	success: res => {
			// 	// 		console.log(res.data,111)
			// 	// 		var newsList = res.data.data;
			// 	// 		this.artList = this.artList.concat(newsList);
			// 	// 		uni.hideLoading();
			// 	// 		page++;
			// 	// 	},
			// 	// 	complete: res => {
			// 	// 		uni.hideLoading();
			// 	// 		uni.stopPullDownRefresh();
			// 	// 	}
			// 	// });
			// 	this.tourTabData = data.tourTabData
			// 	console.log(this.tourTabData, 1111)
			// },
			// 普通选择下拉
			chooseItem(search) {
				// 数据请求,传值后台,search为数据,需要简单处理
				let a=search[0]
				if(a){
					this.synthesis=a
					let _this=this;
				uniRequest.post('/tourguide/gethometourguidelist', { 
						sex:_this.sex.sex,
						age:_this.age.age,
						synthesis:_this.synthesis
						}).then(function (res) {
							_this.artList=res.data.data
						}).catch(function (error) {
							console.log(error);
						});
				}
				
			},
			// 特殊选择下拉
			complexChooseItem(search) {
				this.sex=search[0]
				this.age=search[1]
				// 数据请求,传值后台,search为数据,需要简单处理
				let _this=this;
				uniRequest.post('/tourguide/gethometourguidelist', { 
						sex:_this.sex.sex,
						age:_this.age.age,
						synthesis:_this.synthesis
						}).then(function (res) {
							_this.artList=res.data.data
						}).catch(function (error) {
							console.log(error);
						});
				
			},
			// 重置
			selectcancel(search) {
					let _this=this;
				uniRequest.post('/tourguide/gethometourguidelist', { 
					synthesis:_this.synthesis
						}).then(function (res) {
							// console.log(res.data.data);
							_this.artList=res.data.data
						}).catch(function (error) {
							console.log(error);
						});
				
				// 数据请求,传值后台,search为数据,需要简单处理
			}
		}
	}
</script>
<style>

</style>
