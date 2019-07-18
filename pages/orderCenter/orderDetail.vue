<template>
	<view class="main">
		<view class="main-wrap" v-if="params.status">
			<scroll-view scroll-y="true" class="scroll-wrap" :style="isIphoneX?'margin-top: 2.0rem':'margin-top: 1.60rem'">
				<view class="order-detail-wrap" :style="params.status == 1 ? paddingBottomCss : ''">
					<view class="order-detail-title">
						<text class="status">{{statusType(params.status)}}</text>
						<view class="price" v-if="params.status == 1 || params.status == 5|| params.status == 10">
							<text class="amount">&yen;{{params.orderPrice.amount}}</text>
						</view>
					</view>
					<view class="bg-wrap" :style="params.status == 1 ? 'padding-bottom: 2.8rem;' : 'padding-bottom: 1.8rem;'">
						<view class="main-container">
							<view class="scenic-spot-wrap" v-if="params.status !== 5 && params.status !== 10">
								<view class="content-wrap content-wrap-top">
									<view class="title-wrap" @tap="toticket()">
										<view class="title">{{params.productName}}</view>
										<image src="../../static/assents/order/right-icon.png" class="right-icon"></image>
									</view>
									<image :src="params.imgUrl" class="order-img"></image>
								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">使用日期：</view>
									<view class="content-wrap-desc">{{params.comeDate}}</view>
								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">使用方法：</view>
									<view class="content-wrap-desc">{{comeWayType(params.comeWay)}}</view>
								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">入园时间：</view>
									<view class="content-wrap-desc" v-show="params.openDate?1:0">{{params.openDate}}</view>
									<view class="content-wrap-desc" v-show="params.openDate?0:1">9:00-15:30</view>

								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">入园地址：</view>
									<view class="content-wrap-desc">{{params.address}}</view>
								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">购买数量：</view>
									<view class="content-wrap-desc">{{params.count}}张</view>
								</view>
								<view class="content-wrap content-wrap2" v-show="params.rule.length>0?1:0">
									<view class="content-wrap-name">退改规则：</view>
									<view class="content-wrap-desc content-wrap-desc2">
										<view v-if="params.rule" class="rule" v-for="item in params.rule" :key="item">
											<view>{{item.value}}</view>
										</view>
										<view class="rule" v-else>
											<view>暂无</view>
										</view>
									</view>
								</view>
								<!-- <view class="circle-left circle"></view>
								<view class="circle-right circle"></view> -->
							</view>
							<view class="scenic-spot-wrap" v-if="params.status == 5 || params.status == 10">
								<view class="content-wrap">
									<view class="title-wrap" @tap="toticket()">
										<view class="title">{{params.productName}}</view>
										<image src="../../static/assents/order/right-icon.png" class="right-icon"></image>
									</view>
									<image :src="params.imgUrl" class="order-img"></image>
								</view>
								<view class="refund">
									<view class="refund-text" v-if="params.status == 5">请联系客服申请退款</view>
									<view class="refund-text" v-if="params.status == 10">订单已超过可支付时间，请重新购买</view>

									<view class="phone-wrap" @click="callRefund">
										<view class="iconfont icon-phone">&#xe6ef;</view>
										<view class="phone">电话</view>
									</view>
								</view>
							</view>
							<view class="top-border">

							</view>
							<view class="code-wrap" v-if="params.status == 2 || params.status == 3">
								<view class="title-wrap code-title">
									<text class="title">入园二维码</text>
								</view>
								<view v-if="qrCodeOne">
									<view class="img-wrap" :style="params.status == 3 ? 'opacity: 0.2' : ''">
										<image :src="params.transactionCodeUrl" class="code-img"></image>
									</view>
									<view class="code-name">
										{{comeWayType(params.comeWay)}}
									</view>
								</view>
								<view v-else class="qrCode-wrap" v-for="item in params.transactionCodeUrl">
									<view class="img-wrap" :style="params.status == 3 ? 'opacity: 0.2' : ''">
										<image :src="item" class="code-img"></image>
									</view>
									<view class="code-name">
										{{comeWayType(params.comeWay)}}
									</view>
								</view>
							</view>
							<view v-if="params.status == 2 || params.status == 3" class="border1">
							</view>
							<view class="order-wrap">
								<view class="title-wrap order-title">
									<text class="title">订单信息</text>
								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">游客信息：</view>
									<view class="content-wrap-desc">
										<view class="user" v-for="user in params.userVoList" :key="user">
											<view class="user-name">{{user.name}}</view>
											<view class="user-detail user-phone">
												<text class="user-title">手机号</text>
												<text class="user-desc">{{user.phone}}</text>
											</view>
											<view class="user-detail user-idCard">
												<text class="user-title">身份证</text>
												<text class="user-desc">{{user.idCard}}</text>
											</view>
										</view>
									</view>
								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">订单编号：</view>
									<view class="content-wrap-desc content-wrap-desc1" style="width: 440upx;">{{params.subOrderNo}}</view>
								</view>
								<view class="content-wrap">
									<view class="content-wrap-name">下单时间：</view>
									<view class="content-wrap-desc">{{params.createTime}}</view>
								</view>
								<view class="content-wrap" v-show="params.payTime" v-if="params.status == 2 || params.status == 3 || params.status == 5|| params.status == 10">
									<view class="content-wrap-name">支付时间：</view>
									<view class="content-wrap-desc">{{params.payTime}}</view>
								</view>
								<view class="content-wrap" v-if="params.status == 2 || params.status == 3 || params.status == 5|| params.status == 10">
									<view class="content-wrap-name">支付方式：</view>
									<view class="content-wrap-desc">{{paymentType(params.payment)}}</view>
								</view>
								<view class="content-wrap" v-if="params.status == 3">
									<view class="content-wrap-name">使用时间：</view>
									<view class="content-wrap-desc">{{params.useTime}}</view>
								</view>
							</view>
							<view class="border1" v-if="params.status !== 5 ||( params.status !== 10)">
							</view>
							<view class="call-wrap" v-if="params.status !== 5||( params.status !== 10)">
								<view class="address">
									<view class="distance" v-if="Number(params.distance)!==null">
										距离景区{{params.distance}}km
									</view>
									<view class="distance" v-else>
										{{params.distance}}
									</view>
								</view>
								<view class="call" @click="callTaxi">
									<image src="../../static/assents/order/3.png" class="car-icon"></image>
									<view class="call-name">
										呼我打车
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="pay-wrap" :style="isIphoneX?'padding-bottom:.5rem':''" v-if="params.status == 1">
				<view class="payment">总计&yen;{{params.orderPrice.amount}}</view>
				<view class="pay" @click="continuePayment">继续支付</view>
			</view>
		</view>
		<view class="nothing-wrap" v-else>

		</view>
	</view>

</template>

<script>
	import {
		requestWB as uniRequest,
		requestZT as ztRequest
	} from 'uni-request';


	export default {
		data() {
			return {
				longitude: '',
				latitude: '',
				orderNo: '',
				params: {},
				id: '',
				isIphoneX: false,
				qrCodeOne: false,
			}
		},
		components: {

		},
		onLoad(option) {
			this._isIphoneX();
			this.getAddress(option);
			this.id = option.id
		},
		methods: {
			_isIphoneX() {
				uni.getSystemInfo({
					success: res => {
						// console.log('手机信息res'+res.model)
						let modelmes = res.model;
						if (modelmes.search('iPhone X') != -1) {
							this.isIphoneX = true;
						}
					},
				})
			},
			toticket() {
				let id = this.id
				console.log(id, '详情页')
				uni.reLaunch({
					url: '/pages/ticket/feizhuticket?id=' + id
				})
			},
			getAddress(option) {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						console.log(res);

						this.longitude = res.longitude;
						this.latitude = res.latitude;
						this.orderNo = option.orderNo || '';
						this.orderNo && this.getDetailData();
					},
					fail: (err) => {
						this.orderNo = option.orderNo || '';
						this.orderNo && this.getDetailData();
					}
				})


			},
			// 通过orderNo获取订单信息
			getDetailData() {
				uni.showLoading({
					title: '加载中'
				});
				ztRequest.post('/api/public/order/getOrderDetails', this.longitude ? {
					orderNo: this.orderNo,
					longitude: this.longitude,
					latitude: this.latitude
				} : {
					orderNo: this.orderNo
				}).then(res => {
					console.log(res)
					this.params = { ...res.data.content
					}
					
					if(res.data.content.transactionCodeUrl){
						if(res.data.content.transactionCodeUrl.indexOf(',')!==-1){
							this.params.transactionCodeUrl = res.data.content.transactionCodeUrl.split(',');
						} else {
							this.qrCodeOne = true
						}
					} 
					uni.hideLoading()
				});


			},
			statusType(status) { //状态0-取消 1-待支付 2-已支付 3-完结'
				switch (status) {
					case 0: //取消订单
						return '';
					case 1: //未支付
						return '待付款'
					case 2: //待使用
						return '待使用';
					case 3: //已使用
						return '已使用';
					case 5: //已使用
						return '订单失败';
					case 10: //已使用
						return '已关闭';
					default:
						return ''
				}
			},
			comeWayType(comeWay) { // 0 取票入园 1 电子票入园 2 身份证入园 3 优惠核销（整单优 惠)
				switch (comeWay) {
					case 0:
						return '取票入园'
					case 1:
						return '电子票入园'
					case 2:
						return '身份证入园'
					case 3:
						return '优惠核销（整单优惠)'
					default:
						return ''
				}
			},
			paymentType(payment) { // 支付方式  1-支付宝    2-微信
				switch (payment) {
					case 1:
						return '支付宝'
					case 2:
						return '微信'
					default:
						return ''
				}
			},
			
			ruleType(rule) {
				//console.log(rule)
				console.log(rule)
				// if(rule && !rule.length) {
				// 	return '暂无'
				// } else {
				// 	let ruleStr = '';
				// 	for(var i in rule) {
				// 		ruleStr+=rule[i].value;
				// 	}
				// 	if(i == rule.length - 1){
				// 		return ruleStr
				// 	}
				// }
			},
			// 唤起支付
			continuePayment() {
				let orderNo = this.orderNo
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: this.params.outerId, //微信、支付宝订单数据
					success: function(res) {
						// console.log('success:' + JSON.stringify(res));
						uni.reLaunch({
							url: `/pages/orderCenter/orderDetail?orderNo=${orderNo}`
						})
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			// 唤起呼我打车
			callTaxi() {
				// 跳转小程序
				/* uni.navigateToMiniProgram({
					appId: '2018122862752160',
					extraData: {
						'origin': this.longitude + ',' + this.latitude,
						'destination': this.params.longitude + ',' + this.params.latitude,

						'serviceType': 0
					},
					success: res => {
						// 打开成功
						// console.log(JSON.stringify(res));
					},
					fail: res => {
						// 打开失败
						console.log(JSON.stringify(res));
					}
				}) */
				
				// 跳转页面
				uni.navigateTo({
					url: `/pages/nothing/huerNothing`
				})
			},
			// 唤起电话退款
			callRefund() {
				uni.makePhoneCall({
					phoneNumber: this.params.servicePhone
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background: #ffffff;

	}

	.main-wrap {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: url('../../static/assents/order/2.png') no-repeat;
		background-size: 100% 80%;
		position: relative;
	}

	.scroll-wrap {
		height: 100%;
		//margin-top: 128upx;
	}

	.order-detail-wrap {
		width: 100%;
		// margin-top: 128upx;
		height: 100%;

		.bg-wrap {
			width: 100%;
			//background-image: linear-gradient(-180deg, #EE7D31 0%, #EE7D31 22%, #FFFFFF 75%);
		}

		.order-detail-title {
			padding-left: 28upx;
			padding-right: 28upx;
			//padding-top: 30upx;
			margin-bottom: 36upx;
			color: #ffffff;
			font-size: 38upx;
			height: 53upx;
			line-height: 53upx;
			display: flex;
			justify-content: space-between;

			.amount {
				font-size: 38upx;
				color: #FFFFFF;
				line-height: 45upx;
			}

		}

		.main-container {
			width: 638upx;
			min-height: 900upx;
			margin: 0 auto;
			padding: 32upx;
			background: #ffffff;
			border-radius: 16upx;
			box-shadow: 0px 4px 4px #D8D8D8;
			margin-bottom: 56upx;

			.border1 {
				width: 638upx;
				height: 1upx;
				background: rgba(51, 51, 51, 0.10);
				margin-top: 57upx;
				margin-bottom: 56upx;
			}

			.top-border {
				width: 638upx;
				height: 1upx;
				position: relative;
				background: rgba(51, 51, 51, 0.10);
				margin-top: 1upx;
				margin-bottom: 56upx;
			}

			.scenic-spot-wrap {
				padding-bottom: 32upx;
				position: relative;

				.circle {
					width: 16upx;
					height: 32upx;
					position: absolute;
					bottom: -16upx;
					background: #D8D8D8;
					//border: 1upx solid #979797;
				}

				.circle-left {
					border-radius: 0 16upx 16upx 0;
					left: -32upx;
				}

				.circle-right {

					border-radius: 16upx 0 0 16upx;
					right: -32upx;
				}
			}

			.refund {
				display: flex;
				height: 70upx;
				justify-content: space-between;
				align-items: center;

				.refund-text {
					font-size: 28upx;
					color: #333333;
				}

				.phone {
					font-size: 20upx;
					color: #5D636F;
				}

				.phone-wrap {
					width: 100upx;
					//margin-right: 27upx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.icon-phone {
						width: 32upx;
						height: 32upx;
						margin-bottom: 4upx;
					}

					.phone {
						font-size: 20upx;
						color: #5D636F;
					}
				}
			}

			.content-wrap-top {
				margin-top: 24upx;
				margin-bottom: 0;
			}

			.title-wrap {
				flex: 1;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				font-size: 32upx;
				color: #333333;

				.title {
					font-size: 32upx;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					max-width: 500upx;
				}

				.right-icon {
					width: 12upx;
					height: 12upx;
					margin-left: 16upx;
					margin-top: 14upx;

				}
			}

			.content-wrap {
				display: flex;
				margin-bottom: 24upx;

				.order-img {
					width: 114upx;
					height: 86upx;
					border-radius: 4upx;
				}

				.content-wrap-name {
					font-size: 28upx;
					color: #999999;
					width: 140upx;
					height: 40upx;
					line-height: 40upx;
					margin-right: 16upx;
				}

				.content-wrap-desc1 {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.content-wrap-desc {
					font-size: 28upx;
					width: 420upx;
					line-height: 40upx;
					color: #333333;

					.user-detail {
						width: 420upx;
						display: flex;
						color: #666666;
						font-size: 24upx;

						.user-title {
							width: 80upx;
							height: 33upx;
							line-height: 33upx;
							margin-right: 30upx;
						}

						.user-desc {
							flex: 1;
						}
					}
				}

				.content-wrap-desc2 {
					font-size: 28upx;
					width: 420upx;
					line-height: 40upx;
					color: #333333;
					display: block;

				}
			}

			.content-wrap2 {
				display: flex;

				.content-wrap-desc2 {
					.rule {
						width: 470upx;
					}
				}

			}

			.content-wrap-top {
				margin-top: 24upx;
				margin-bottom: 0;
			}

			.code-wrap {
				.code-title {
					margin-top: 56upx;
					margin-bottom: 56upx;
				}

				.img-wrap {
					width: 100%;
					display: flex;
					justify-content: center;
				}

				.code-img {
					width: 300upx;
					height: 300upx;
					margin: 0 auto;
					display: inline-block;
					text-align: center;
				}

				.code-name {
					font-size: 24upx;
					color: #666666;
					line-height: 33upx;
					text-align: center;

				}
			}

			.order-wrap {
				.order-title {
					margin-bottom: 40upx;
				}
			}

			.call-wrap {
				display: flex;

				.address {
					width: 512upx;
					display: flex;
					align-items: center;

					.distance {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap
					}
				}

				.call {
					width: 100upx;
					//margin-right: 27upx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.car-icon {
						width: 40upx;
						height: 41upx;
						margin-bottom: 8upx;
					}

					.call-name {
						font-size: 22upx;
						color: #5D636F;

					}
				}

			}
		}

	}

	.pay-wrap {
		width: 100%;
		height: 114upx;
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		//margin-top: 164upx;
		background: #000000;
		box-shadow: 0 -4px 7px 0 rgba(0, 0, 0, 0.05);
		display: flex;
		justify-content: space-between;

		.payment {
			color: #ffffff;
			font-size: 36upx;
			margin-left: 32upx;
			flex: 1;
			margin-top: 28upx;
		}

		.pay {
			width: 220upx;
			height: 80upx;
			margin-top: 16upx;
			margin-right: 16upx;
			text-align: center;
			line-height: 80upx;
			font-size: 36upx;
			background: #EE7D31;
			border-radius: 8upx;
			color: #ffffff;
		}
	}
</style>
