<template>
	<view class="hotel-detail-wrap">
		<image v-if="params.img" :src="params.img" class="detail-banner"></image>
		<view class="main-wrap">
			<view class="msg-wrap">
				<view class="msg">
					<view class="title">{{ params.title || '' }}</view>
					<view class="address">
						<text class="iconfont icon-address">&#xe601;</text>
						{{ params.address || '' }}
					</view>
				</view>
				
				<!-- <view class="line"></view>
				<view class="call" @tap="handleShowPopup()">
					<text class="iconfont icon-phone">&#xe6ef;</text>
					电话
				</view> -->
			</view>
				<view class="detail-wrap">
					 <u-parse :content="params.content"></u-parse>
				</view>
			<view class="bottom-wrap">
				<view class="address">地址： {{ params.address || '' }}</view>
				<view class="hot-line">热线： {{ params.phone || '' }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	import uParse from '@/components/gaoyia-parse/parse.vue'

	export default {
		data() {
			return {
				id : '',
				params: {}
			}
		},
		components: {
			uParse
		
		},
		onLoad(option) {
			this.id = option.id || '';
			this.id && this.getDetailData();
		},
		methods: {
			getDetailData() {
				uniRequest.post('/shopping/getbyidshoppinginfo', {
					id: this.id
				}).then(res => {
					if(res.data.code == '000000') {
						this.params = {...res.data.data}
					} else {
						uni.showToast({
							title: res.data.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hotel-detail-wrap {
		.detail-banner {
			width: 100%;
		}
		.main-wrap {
			padding: 30upx;
			.msg-wrap {
				display: flex;
				.msg {
					flex: 1;
					.title {
						font-size: 30upx;
						color: #333333;
						line-height: 42upx;
						font-weight: bold;
						margin-bottom: 10upx;
					
					}
					
					.address {
						font-size: 22upx;
						color: #999999;
						margin-bottom: 15upx;
						line-height: 20upx;
						.icon-address {
							vertical-align: top;
							color: $theme-dark-orange;
						}
					}
				}
				
				
			}
			.detail-wrap {
				margin-top: 20upx;
				image {
					width: 100%;
					margin: 8upx 0;
				}
				text {
					font-size: 25upx;
					color: #666666;
					line-height: 50upx;
				}
			}
			.bottom-wrap {
				margin-top: 20upx;
				view {
					font-size: 25upx;
					color: #666666;
					line-height: 50upx;
				}
			}
		}
	}
</style>
