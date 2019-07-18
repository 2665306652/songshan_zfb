<template>
	<view class="special-detail-wrap">
		<image :src="params.img" class="detail-banner"></image>
		<view class="main-wrap">
			<view class="msg-wrap">
				<view class="msg">
					<view class="title">{{ params.title }}</view>
					<text class="consume">{{ params.percapita }}人均</text>
					<text class="tag" v-for="item in labelList" :key="item">{{ item }}</text>
				</view>
				<view class="line"></view>
				<view class="call" @tap="handleShowPopup()">
					<text class="iconfont icon-phone">&#xe6ef;</text>
					电话
				</view>
			</view>
				<view class="detail-wrap">
					 <u-parse :content="params.content"></u-parse>
			</view>
			<view class="bottom-wrap">
				<view class="address">地址： {{ params.address }}</view>
				<view class="hot-line">热线： {{ params.phone }}</view>
			</view>
			
			
		</view>
		<uni-popup :show="showPopup" position="bottom" @hidePopup="hidePopup">
			<view class="bottom-content">
				<view class="call-btn" @tap="handleCall(params.phone)">呼叫 {{ params.phone }}</view>
				<view class="bottom-btn" @tap="hidePopup">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../../components/common/uni-popup/uni-popup.vue'
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	import uParse from '@/components/gaoyia-parse/parse.vue'


	export default {
		data() {
			return {
				showPopup: false,
				id: '',
				params: {},
				labelList: []
			}
		},
		components: {
			uniPopup,
			uParse

		},
		onLoad(option) {
			this.id = option.id
			this.getDetailData()
		},
		methods: {
			getDetailData() {
				uniRequest.post('/food/getbyidfoodinfo', {
					id: this.id
				}).then(res => {
					if(res.data.code == '000000') {
						this.params = {...res.data.data}
						this.formatLabel(this.params.label)
					} else {
						uni.showToast({
							title: res.data.message
						})
					}
				})
			},
			formatLabel(val) {
				this.labelList = val.split('，')
			},
 			handleShowPopup() {
				this.showPopup = !this.showPopup
			},
			hidePopup() {
				this.showPopup = !this.showPopup
			},
			handleCall(number) {
				uni.makePhoneCall({
					phoneNumber: number
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.special-detail-wrap {
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
					
					.tag {
						color: $theme-light-orange;
						font-size: 20upx;
						line-height: 32upx;
						display: inline-block;
						border: 1px solid $theme-light-orange;
						border-radius: 4px;
						padding: 2upx 10upx;
						margin-right: 10upx;
					}
					
					.consume {
						font-size: 25upx;
						color: $theme-dark-orange;
						margin-right: 10upx;
					}
				}
				.line {
					width: 1px;
					height: 80upx;
					background-color: #eee;
					opacity: 0.5;
					position: relative;
					left: -30upx;
					top: 20upx;
				}
				.call {
					width: 100upx;
					color: #999999;
					font-size: 20upx;
					margin-top: 15upx;
					.icon-phone {
						display: block;
						font-size: 45upx;
						color: $theme-dark-orange;
					}
				}
			}
			.detail-wrap {
				margin-top: 20upx;
				// image {
				// 	width: 100%;
				// 	margin: 8upx 0;
				// }
				// text {
				// 	font-size: 25upx;
				// 	color: #666666;
				// 	line-height: 50upx;
				// }
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
					
					.tag {
						color: $theme-light-orange;
						font-size: 20upx;
						line-height: 32upx;
						display: inline-block;
						border: 1px solid $theme-light-orange;
						border-radius: 4px;
						padding: 2upx 10upx;
					}
					
					.address {
						font-size: 22upx;
						color: #999999;
						margin-bottom: 15upx;
						line-height: 20upx;
						.icon-address {
							vertical-align: top
						}
					}
				}
				.line {
					width: 1px;
					height: 80upx;
					background-color: #eee;
					opacity: 0.5;
					position: relative;
					left: -30upx;
					top: 20upx;
				}
				.call {
					width: 100upx;
					color: #999999;
					font-size: 20upx;
					margin-top: 15upx;
					.icon-phone {
						display: block;
						font-size: 45upx;
						color: $theme-dark-orange;
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
		}
	}
</style>
