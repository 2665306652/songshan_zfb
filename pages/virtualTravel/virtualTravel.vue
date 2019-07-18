<!-- 虚拟旅游 需要根据ID作曲跳转页面-->
<template>
	<view>
		<publicDetails :itemList="artList"></publicDetails>
	</view>
</template>
<script>
	var page = 1;
	import publicDetails from '@/components/virtualTravel/virtualTravel';//item组件
	export default {
		components: {
			publicDetails,
		},
		data() {
			return {
				top: 0,
				// 演示文章数据
				artList: []
			};
		},
		
		onLoad: function() {
			// #ifdef H5
			this.top = '44px';
			// #endif
			page = 1;
			artList: [];
			this.getNewsList();
		},
		
		
		/*
		* onPullDownRefresh()   下拉刷新
		* onReachBottom()      加载更多
		* */
		onPullDownRefresh: function() {
			// 重置分页及数据
			page = 1;
			this.artList = [];
			this.getNewsList();
		},
		onReachBottom: function() {
			this.getNewsList();
		},
		
		
		methods: {
			
			
			/*
			* 数据请求的方法
			* getNewsList（item数据请求）
			* 
			* * 组件中的方法
			* artList（索引）  item详情方法（及其数据的请求跳转的路径）
			* */
			

			getNewsList: function() {
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
				
				this.artList= data.virtualTravel
				console.log('yes',this.artList)
			},
			
		}
	}
</script>
<style>
</style>
