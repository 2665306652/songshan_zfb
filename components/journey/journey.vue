
<!-- 公共详情页  嵩山行程||虚拟旅游 -->
<template>
	<view class="grace-news-list">

		 <!-- 针对于通用文本 -->
		<block v-if="itemList">
			<view class="itemNews" v-for="(item, index) in itemList" :key="index"  @click="artList(item.id)">
				<view class="itemLogo">
					<image :src="item.topimg" mode="widthFix" class="item-logo"></image>
				</view>
				
				<view class="grace-news-title">
					<view class="item-introduce">
						<view class="item-commonalityIcon"></view>
						<view class="item-introduce_title">{{item.title}}</view>
					</view>
					<view class="item-addmore">更多<text class="iconfont iconjiantou">&#xe64e;</text></view>
				</view>
				
				<view class="item-text">{{item.introduction}}</view>
			</view>
		</block>
		
		
	</view>
</template>

<script>
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
		methods: {
			artList(id){
				var id  = id
				uni.navigateTo({
					url: `journeyParticulars?id=${id}`
				});
			},
		}
	};
	
</script>

<style  lang="less" scoped>
	// 矢量图标
	.iconjiantou {
		font-size:20upx;
		color:#BEBEBE;
		font-weight:normal;
	}
	
	.grace-news-list {
		width:100%;
		overflow:hidden;
	}
	// 文本样式
	.introduce_text {
		padding-top: 24upx;
		text-indent:56upx;
		font-size: 28upx;
		color: #000000;
		letter-spacing: 0;
		text-align: left;
		line-height: 50upx;
		margin-bottom: 30upx;
	}
	// 列表样式
	.itemNews {
		margin-top: 60upx;
		width: 100%;
		padding: 0 30upx;
		padding-bottom: 12upx;
		border-bottom: 1upx solid #EEEEEE;
		box-sizing:border-box;
	}
	// 图片样式
	.itemLogo {
		background: #D8D8D8;
		border-radius: 10px;
		width: 690upx;
		height: 298upx;
		overflow: hidden;
		.item-logo {
			width: 690upx;
			height: 240upx;
		}
	}
	// 列表标题
	.grace-news-title {
		display: flex;
		justify-content: space-between;
		.item-introduce {
			flex: 1;
			height: 94upx;
			display: flex;
			flex-direction: row;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			.item-commonalityIcon {
				background: #CE9D6D;
				width: 4upx;
				height: 28upx;
				margin-top: 32upx;
				margin-right:14upx ;
			}
			.item-introduce_title {
				line-height: 94upx;
				font-size: 36upx;
				color: #000000;
				font-weight: bold;
				letter-spacing: 0;
				text-align: left;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
		.item-addmore {
			line-height: 94upx;
			font-size: 24upx;
			color: #999999;
			letter-spacing: 0;
			text-align: right;
		}
		
	}
	.item-text {
		font-size: 28upx;
		color: #000000;
		letter-spacing: 0;
		text-align: left;
		line-height: 50upx;
	}
	
	
</style>
