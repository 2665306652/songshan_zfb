<template>
	<view class="grace-news-list">


		<!-- 针对于通用文本 -->
		<block v-if="itemList">
			<!-- 	<view class="itemList_introduce " data="itemList">
				<view class="introduce">
					<view class="commonalityIcon"></view>
					<view class="introduce_title">{{itemList.title}}</view>
				</view>
				<view class="introduce_text">
					{{itemList.introduce}}
				</view>
			</view> -->

			<view class="itemNews" v-for="(item, index) in itemList" :key="index" @click="artList(item.id)" v-if="idx!==4">
				<view class="itemLogo">
					<image :src="item.topimg" mode="widthFix" class="item-logo"></image>
				</view>

				<view class="grace-news-title">
					<view class="item-introduce">
						<view class="item-commonalityIcon"></view>
						<view class="item-introduce_title">{{item.title}}</view>
					</view>
					<view class="item-addmore">更多<text class="iconfont iconjiantou">&#xe64e;</text></view>
					<view class="date">

					</view>
				</view>

				<view class="item-text">{{item.introduction}}</view>
			</view>
		</block>
		<!-- 针对视频 -->
		<block v-if="idx==4"> 
			<view class="videoContent" v-for="(videoitem, index) in itemList" :key="index">
				<video :src="videoitem.videourl" @error="videoErrorCallback" controls class="video" :poster="videoitem.topimg"></video>

				<view class="grace-news-title">
					<view class="item-introduce">
						<view class="item-commonalityIcon"></view>
						<view class="item-introduce_title">{{videoitem.title}}</view>
					</view>
					<view class="item-addmore">{{videoitem.gmtcreate}}</view>
				</view>
			</view>
		</block>
		<!-- 针对于有视频的文本 -->


	</view>
</template>

<script>
	export default {
		props: {
			itemList: {
				type: Array,
				default: function(e) {
					return {}
				}
			},
			idx: {
				type: Number
			}

		},
		data() {
			return {};
		},
		methods: {
			artList(id) {
				var id = id
				uni.navigateTo({
					url: `scenicareaParticulars?id=${id}`
				});
			},

			videoErrorCallback: function(e) {
				console.log('视频错误信息:')
				console.log(e)
				console.log(e.target.errMsg)
			},
		}
	};
</script>

<style lang="less" scoped>
	// 矢量图标
	.iconjiantou {
		font-size: 20upx;
	}

	.grace-news-list {
		width: 100%;
		overflow: hidden;
	}

	.itemList_introduce {
		padding: 0 30upx;
		width: 100%;
		box-sizing: border-box;
	}

	// 标题样式
	.introduce {
		height: 94upx;
		display: flex;
		flex-direction: row;

		.commonalityIcon {
			background: #CE9D6D;
			width: 4upx;
			height: 28upx;
			margin-top: 32upx;
			margin-right: 14upx;
		}

		.introduce_title {
			line-height: 94upx;
			font-size: 36upx;
			color: #000000;
			font-weight: bold;
			letter-spacing: 0;
			text-align: left;
		}
	}

	// 文本样式
	.introduce_text {
		padding-top: 24upx;
		text-indent: 56upx;
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
		box-sizing: border-box;
	}

	// 图片样式
	.itemLogo {
		background: #D8D8D8;
		border-radius: 10px;
		width: 690upx;
		height: 240upx;
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

			.item-commonalityIcon {
				background: #CE9D6D;
				width: 4upx;
				height: 28upx;
				margin-top: 32upx;
				margin-right: 14upx;
			}

			.item-introduce_title {
				line-height: 94upx;
				font-size: 36upx;
				color: #000000;
				font-weight: bold;
				letter-spacing: 0;
				text-align: left;
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

	// 视频
	.videoContent {
		padding: 0 30upx;
		box-sizing: border-box;
		overflow: hidden;
		border-bottom: 1upx solid #EEEEEE;
		width: 100%;

		.video {
			width: 100%;
		}

		.videoelement {
			width: 100%;
		}

		.grace-news-title {
			display: flex;
			justify-content: space-between;

			.item-introduce {
				flex: 1;
				height: 94upx;
				display: flex;
				flex-direction: row;

				.item-commonalityIcon {
					background: #CE9D6D;
					width: 4upx;
					height: 28upx;
					margin-top: 32upx;
					margin-right: 14upx;
				}

				.item-introduce_title {
					line-height: 94upx;
					font-size: 36upx;
					color: #000000;
					font-weight: bold;
					letter-spacing: 0;
					text-align: left;
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
	}
</style>
