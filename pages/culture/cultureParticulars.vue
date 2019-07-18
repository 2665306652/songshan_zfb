
<!--  这里是针对于详情页面，consultParticulars（可以考虑使用一个 模板）=》当前为了方便理解暂时不使用-->
<template>
	
	<view class="particulars">
		<view class="title">{{article.title}}</view>
		<view class="record">
			<view class="titleText">{{article.articlecategorytitle}}</view>
			<view class="recordText addStyle">{{article.gmtcreate}}</view>
			<view class="recordText">浏览 {{article.viewcount}} 次</view>
		</view>
		<view class="center30">
			 <u-parse :content="article.content"></u-parse>
		</view>
		<!-- <view class="logoParent ">
			<image :src="article.logo"  class="item-logo"></image>
		</view>
		<view class="item-text">{{article.introduce}}</view>
		<view class="logoParent">
			<image :src="article.extendImg" class="item-logo"></image>
		</view> -->
		
	</view>
		
</template>
<script>
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	import uParse from '@/components/gaoyia-parse/parse.vue'
export default {
	components: {
		 uParse
	},
	data() {
		return {
			article:[]
		}
	},
	onLoad(option) {
		let _this = this;
		
		// 当前点击的id值
		let id=option.id
		// 加载文章详情
		// uni.showLoading({});
		
		uniRequest.post('/article/getarticleinfobyid', { 
					id:option.id
				}).then(function (res) {
					console.log(res.data.data);
					_this.article=res.data.data		
				}).catch(function (error) {
					console.log(error);
				});
	
	},
	methods: {

	}
}
</script>
<style  lang="less" scoped>
	.particulars {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.title {
		width: 100%;
		line-height: 53upx;
		margin-top: 36upx;
		margin-bottom: 51upx;
		font-size: 38upx;
		color: #333333;
		text-align: center;
	}
	.record {
		width: 100%;
		height: 32upx;
		overflow: hidden;
		display: flex;
		justify-content: center;
		.titleText {
			padding: 2upx 10upx;
			height: 32upx;
			background: #FE9053;
			border-radius: 6upx;
			font-size: 20upx;
			color: #FFFFFF;
			line-height: 32upx;
			text-align: center;
		}
		.recordText {
			height:32upx;
			line-height:32upx;
			font-size: 23upx;
			color: #999999;
		}
		.addStyle {
			margin: 0 48upx;
		}
	}
	</style>