<!-- 导游 -->
<template>
	<view class="grace-news-list">

		 <!-- 针对于通用文本 -->
		<block v-if="itemList">
			
			<view class="itemNews" v-for="(item, index) in itemList" :key="index"  @click="artList(item.id)">
				<view class="item_picture">
					<image :src="item.img" mode="scaleToFill" class="picture"></image>
				</view>
				
				<view class="item_details">
					<view class="details_identity">
						<view class="details_name">{{item.name}}</view>
						<view class="details_service">{{item.level}}</view>
						<view class="details_age">{{item.newAge}}</view>
					</view>
					<view class="details_manifestation">
						<view class="manifestation_grade">{{item.score}}分</view>
						<view class="manifestation_serveNumber">{{item.servicetimes}}次服务</view>
						<view class="manifestation_comment">({{item.commentnumber}}条点评)</view>
					</view>
					
					<view class="item_tagline">{{item.comments}}</view>
				</view>
			</view>
		</block>
		<block v-if="itemList.length<=0">
			暂时没有数据
		</block>
		
	</view>
</template>

<script>
	import uniRequest from 'uni-request';

	export default {
		props: {
			itemList: {
				type: Array,
				default: function(e){
					return {}
				}
			},
			
		},
		data() {
			return {};
		},
		onLoad() {
			let _this=this;
			uniRequest.post('/tourguide/gethometourguidelist', { 
					}).then(function (res) {
						console.log(res.data.data);
						_this.artList=res.data.data
					}).catch(function (error) {
						console.log(error);
					});
		},
		methods: {
			artList(id){
				var id  = id
				uni.navigateTo({
					url: `tourGuideParticulars?id=${id}`
				});
			},
		}
	};
	
</script>

<style  lang="less" scoped>
	.grace-news-list {
		width:100%;
		overflow:hidden;
		margin-top:100upx;
	}
	// 列表样式
	.itemNews {
		height: 280upx;
		width: 100%;
		padding: 30upx;
		border-bottom: 1upx solid #EEEEEE;
		box-sizing:border-box;
		display: flex;
	}
	// 相片
	.item_picture {
		width: 200upx;
		height: 220upx;
		background: #D8D8D8;
		border-radius: 10upx;
		overflow: hidden;
		.picture {
			width: 200upx;
			height: 220upx;
		}
	}
	// 个人介绍
	.item_details {
		flex: 1;
		padding-left: 30upx;
		box-sizing:border-box;
		overflow: hidden;
		
		.details_identity {
			display: flex;
			flex-wrap: nowrap;
			height: 62upx;
			padding: 10upx 0;
			box-sizing: border-box;
			align-items: center;
			.details_name {
				font-size: 30upx;
				color: #333333;
				line-height: 50upx;
			}
			.details_service {
				width: 100upx;
				height: 32upx;
				background: #FE9053;
				border-radius: 6upx;
				font-size: 20upx;
				color: #FFFFFF;
				text-align: center;
				line-height: 32upx;
				margin-left: 24upx;
				margin-right: 12upx;
			}
			.details_age {
				border: 1upx solid #FE9053;
				border-radius: 6upx;
				height: 32upx;
				width: 68upx;
				color: #FE9053;
				font-size: 20upx;
				line-height: 32upx;
				text-align: center;
				box-sizing: border-box;
			}
			
		}
		
		.details_manifestation {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			height: 40upx;
			box-sizing: border-box;
			line-height: 40upx;
			.manifestation_grade {
				font-size: 28upx;
				color: #FE9053;
			}
			.manifestation_serveNumber ,.manifestation_comment{
				font-size: 22upx;
				color: #999999;
				margin-left: 20upx;
				box-sizing: border-box;
			}
			.manifestation_comment {
				margin-left: 12upx;
			}
		}
		
		.item_tagline {
			font-size: 24upx;
			width: 100%;
			color: #666666;
			letter-spacing: 0;
			line-height: 34upx;
			margin-top: 34upx;
			-webkit-box-orient: vertical;
			-webkit-line-clamp:2;
			overflow: hidden;
			text-overflow:ellipsis;
			display: -webkit-box; 
		
		}
	}
	
</style>
