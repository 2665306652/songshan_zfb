<!-- 文化嵩山 -->
<template>
	<view>
		<crosswiseTab :tabList="categories" :tabIndex="cateCurrentIndex" @tabSelect="tabSelect"></crosswiseTab>
		
		<culture :itemList="artList"></culture>
	</view>
</template>
<script>
	var page = 1,
		cate = 0;
	import crosswiseTab from '@/components/crosswiseTab';//tab栏组件
	import culture from '@/components/culture/culture-item';//item组件（组件共用，为了避免后期可以拆离出来）
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';

	export default {
		components: {
			crosswiseTab,
			culture,
		},
		data() {
			return {
				top: 0,
				//分类信息
				categories: [],
				// 当前选择的分类
				cateCurrentIndex: 0,
				// 演示文章数据
				artList: [],
				getid: 0
			};
		},
		
		onLoad: function(option) {
			// #ifdef H5
			this.top = '44px';
			// #endif
			page = 1;
			artList: [];
			let _this=this
			this.cateCurrentIndex=option.index;
			this.getid = option.id;
			console.log(option)
			uniRequest.post('/articlecategory/getarticlecategorylistbytitle', {		//景区文化
			title:'嵩山文化',
			limit:5
			}).then(function(res) {
				_this.categories = res.data.data;
				console.log(res.data.data);
			}).catch(function(error) {
				console.log(error);
			});
			
		},
		
		
		/*
		* onPullDownRefresh()   下拉刷新
		* onReachBottom()      加载更多
		* */
		// onPullDownRefresh: function() {
		// 	// 重置分页及数据
		// 	page = 1;
		// 	this.artList = [];
		// 	this.getNewsList();
		// },
		// onReachBottom: function() {
		// 	this.getNewsList();
		// },
		
		onShow(){
			let _this = this;
			if(this.getid){
				_this.getlistS();
			}
		},
		methods: {
			getlistS(){
				let _this = this;
				uniRequest.post('/article/getarticlelistbyarticlecategoryidnopage', { 
					articleCategoryId:_this.getid
						}).then(function (res) {
							// console.log(res.data.data);
							_this.artList=res.data.data.list
						}).catch(function (error) {
							console.log(error);
						});	
			},
			
			/*
			* 数据请求的方法
			* getTabList（横向tab导航栏数据请求（或者可以直接写死，做预备））
			* getNewsList（item数据请求）
			* 
			* * 组件中的方法
			* tabSelect(索引，id)   tab栏方法
			* artList（索引）  item详情方法（及其数据的请求跳转的路径）
			* */
			
// 			
// 			getTabList:function(){
// 				// uni.request({
// 				// 	url: ""
// 				// 	method: '',
// 				// 	data: {},
// 				// 	success: res => {
// 				// 		this.categories = res.data.data
// 				// 		uni.hideLoading();
// 				// 	},
// 				// 	complete: res => {
// 				// 		uni.hideLoading();
// 				// 		uni.stopPullDownRefresh();
// 				// 	}
// 				// });
// 				this.categories = data.culture
// 			},
// 
// 			getNewsList: function() {
// 				// uni.showLoading({});
// 				// 假设已经到底，实际根据api接口返回值判断
// 				// if (page >= 3) {
// 				// 	uni.showToast({
// 				// 		"title": "已经加载全部",
// 				// 		icon: "none"
// 				// 	});
// 				// 	return;
// 				// }
// 				// 接口
// 				// uni.request({
// 				// 	url: 'https://www.easy-mock.com/mock/5cb9655c01e2e57715d324b0/example/imgnewlist?page=' + page +
// 				// 		'#!method=get&cate=' + cate?cate:0,
// 				// 	method: 'GET',
// 				// 	data: {},
// 				// 	success: res => {
// 				// 		console.log(res.data,111)
// 				// 		var newsList = res.data.data;
// 				// 		this.artList = this.artList.concat(newsList);
// 				// 		uni.hideLoading();
// 				// 		page++;
// 				// 	},
// 				// 	complete: res => {
// 				// 		uni.hideLoading();
// 				// 		uni.stopPullDownRefresh();
// 				// 	}
// 				// });
// 				
// 				this.artList= data.cultureData.data
// 				console.log(this.artList,1111)
// 			},
			
			tabSelect(index, cateid) {
				// 选中的索引
				var index = index;
				// 具体的分类id
				// console.log(index,cateid)
				this.getid = cateid;
				this.cateCurrentIndex = index;
				// 动态替换内容
				this.content = this.categories[index].name;
				// 读取分类数据
				// this.cate = cateid; //把分类信息发送给api接口即可读取对应分类的数据
				// // 重置分页及数据 
				// page = 1;
				// this.artList = [];
				// // 加载对应分类数据覆盖上一个分类的展示数据 加载更多是继续使用这个分类
				// this.getNewsList();
				let _this=this
					uniRequest.post('/article/getarticlelistbyarticlecategoryidnopage', { 
					articleCategoryId: _this.getid
						}).then(function (res) {
							console.log(res.data.data);
							_this.artList=res.data.data.list
						}).catch(function (error) {
							console.log(error);
						});
			},
			
		}
	}
</script>
<style>
	
</style>
