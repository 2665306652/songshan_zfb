<!-- 嵩山咨询 -->
<template>
	<view>
		<crosswiseTab :tabList="categories" :tabIndex="cateCurrentIndex" @tabSelect="tabSelect"></crosswiseTab>

		<consult :itemList="artList"></consult>
	</view>
</template>
<script>
	var page = 1,
		cate = 0;
	import crosswiseTab from '@/components/crosswiseTab';//tab栏组件
	import consult from '@/components/consult/consult-item';//item组件
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';

	export default {
		components: {
			crosswiseTab,
			consult,
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
				id:2
			};
		},
		
		onLoad: function() {
			// #ifdef H5
			this.top = '44px';
			// #endif
			page = 1;
			artList: [];
			// this.getNewsList();
			// this.getTabList();
			
			
		},
		onShow() {
			let _this=this;
			uniRequest.post('/article/getarticlelistbyarticlecategoryidnopage', { 
				articleCategoryId:_this.id
					}).then(function (res) {
						console.log(res.data.data.list);
						_this.artList=res.data.data.list
					}).catch(function (error) {
						console.log(error);
					});
			
			uniRequest.post('/articlecategory/getarticlecategorylistbytitle', { 
				title:'嵩山资讯',
				limit:3
					}).then(function (res) {
						// console.log(res.data.data);
						_this.categories=res.data.data
					}).catch(function (error) {
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
		
		
		methods: {
			
			
			/*
			* 数据请求的方法
			* getTabList（横向tab导航栏数据请求（或者可以直接写死，做预备））
			* getNewsList（item数据请求）
			* 
			* * 组件中的方法
			* artList（索引）  item详情方法（及其数据的请求跳转的路径）
			* */
			// tabSelect(index,id){
			// 	this.id=id
			// 	console.log(this.id)
			   //tab栏方法

			
			// getTabList:function(){
				// uni.request({ 
					
					
				// 	url: ""
				// 	method: '',
				// 	data: {},
				// 	success: res => {
				// 		this.categories = res.data.data
				// 		uni.hideLoading();
				// 	},
				// 	complete: res => {
				// 		uni.hideLoading();
				// 		uni.stopPullDownRefresh();
				// 	}
				// });
			// 	this.categories = data.consult
			// },

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
				
				// this.artList= data.consultData.data
				// console.log(this.artList,1111)
			// },
			
			tabSelect(index, cateid) {
				// 选中的索引
				this.id=cateid;
				var index = index;
				// 具体的分类id
				var cateid = cateid;
				this.cateCurrentIndex = index;
				// 动态替换内容
				this.content = this.categories[index].name;
				let _this=this;
				uniRequest.post('/article/getarticlelistbyarticlecategoryidnopage', { 
					articleCategoryId:cateid
						}).then(function (res) {
							console.log(res.data.data.list);
							_this.artList=res.data.data.list
						}).catch(function (error) {
							console.log(error);
						});
				// 读取分类数据
				// this.cate = cateid; //把分类信息发送给api接口即可读取对应分类的数据
				// 重置分页及数据 
				// page = 1;
				// this.artList = [];
				// 加载对应分类数据覆盖上一个分类的展示数据 加载更多是继续使用这个分类
				// this.getNewsList();
				// console.log(this.id)
			},
			
		}
	}
</script>
<style>
	
</style>
