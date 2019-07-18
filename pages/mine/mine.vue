<template>
	<view>
		<view class="bg_box">
			<image src="../../static/assents/minebg.png" mode="scaleToFill"></image>
			<view class="message">
				<image :src="image" mode="aspectFit"></image>
				<text>{{name}}</text>
			</view>
			<view class="content">
				<navigator url="/pages/orderCenter/orderCenter">
					<view class="icon_box">
						<image src="../../static/assents/icon1.png" mode="aspectFit"></image>
						<text>订单</text>
					</view>
				</navigator>
				<!-- <view class="icon_box" @click="handlePay">
					<image src="../../static/assents/icon3.png" mode="aspectFit"></image>
					<text>下单支付</text>
				</view> -->
			</view>
		</view>
		<view class="tabbar" :style="isIphoneX?'padding-bottom:'+calUpx(68):''">
			<view class="iconbox" @click="tohome">
				<image src="../../static/assents/home1.png" mode="aspectFit"></image>
				<text class="text ">首页</text>
			</view>
			<view class="iconbox" @click="tocar">
				<image src="../../static/assents/car1.png" mode="aspectFit"></image>
				<text class="text in">呼我出行</text>
			</view>
			<view class="iconbox">
				<image src="../../static/assents/mine2.png" mode="aspectFit"></image>
				<text class="text in">我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';

	export default {
		data() {
			return {
				name: '', //用户名
				image: '', //头像
				token: '',
				externalId: '',
				buyerNick: '',
				isIphoneX:false, //x的兼容
			}
		},
		methods: {
			//单位转化方法
			calUpx(num) {
			    return uni.upx2px(num) + 'px';
			},
			tohome() {
				uni.reLaunch({
					url: '../index/index',
				}); 
			},
			tocar() {
				uni.navigateToMiniProgram({
					appId: '2018122862752160',
					extraData: {},
					success(res) {
						// 打开成功
					}
				})
			},
			handlePay() {
				let externalId = '';
				let orderNo = '';
				try{
					const value = uni.getStorageSync('externalId')
					if(value) {
						externalId = value;
						
						// 下单 得到 outerId 支付宝交易号
						ztRequest.post('/api/public/alipay/trade', {
							productCode: 'ne7ilNpCIN7Vlpph',
							amount: "0.01",
							comeDate: "2050-12-12",
							count: "1",
							externalId: externalId,
							merchantCode: "b49c90557893a9f8ed229df13305804a",
							payment: "1",
							userCode: "23027b4f3bd5558cfb462873dff5149b"
						}).then(res => {
							if(res.data.code == '000000') {
								orderNo = res.data.content.outerId;
						
								// #ifdef MP-ALIPAY
								// 唤起支付
								my.tradePay({
									tradeNO: orderNo,
									success: (re) => {
										
									},
									fail: (re) => {
										
									}
								});
								// #endif
								
							} else {
								uni.showToast({
									title: res.data.message
								})
							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						// 授权操作
						
						
					}
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
				
				


			},
			loginIn() {
				ztRequest.post('/api/public/user/login', {
					externalId: this.externalId,
					buyerNick: this.name,
					imgUrl:this.image
				}).then(res => {
					if(res.data.code == '000000') {
						uni.setStorage({
							key: 'openId',
							data: res.data.content.openid,
						});
						uni.setStorage({
							key: 'externalId',
							data: res.data.content.externalId,
						});
						uni.setStorage({
							key: 'token',
							data: res.data.content.token,  
						});
						
					}else {
						uni.showToast({
							title:res.data.message
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			let _this = this;
			
			uni.getSystemInfo({
				success: res => {
					// console.log('手机信息res'+res.model)
					let modelmes = res.model;
					if (modelmes.search('iPhone X') != -1) {
						_this.isIphoneX = true;
						// _this.btuBottom="68rpx";
						// console.log(_this.isIphoneX,_this.btuBottom,123456)
					}
				},
			})
			// #ifdef MP-ALIPAY
			my.getAuthCode({
				scopes: 'auth_user',
				success: (res) => {
					if (res.authCode) {
						// console.log(res,2222);
						uni.getUserInfo({
							provider: 'alipay',
							success: infoRes => {
								uniRequest.post('/user/userlogin', {
									authorization_code: res.authCode,
									nickname: infoRes.userInfo.nickName,
									avatar: infoRes.userInfo.avatarUrl
								}).then(function(res) {
									console.log(res, 'res');
									
								}).catch(function(error) {
									console.log(error);
								});
								
							
								this.name = infoRes.userInfo.nickName;
								this.image = infoRes.userInfo.avatarUrl;

							}
						});

						// 服务端 换取用户id 
						ztRequest.post('/api/public/alipay/auth', {
							authcode: res.authCode
						}).then(response => {
							if (response.data.code == '000000') {

								this.externalId = response.data.content;

								// 服务端 登录
								this.loginIn()

							} else {
								uni.showToast({
									title: res.data.message
								})
							}
						}).catch(err => {
							console.log(err)
						})

					}
				},
			});
			// #endif	

		}
	}
</script>

<style lang="less" scoped>
	.bg_box {
		position: relative;
		height: 544upx;
		width: 100%;

		image {
			width: 100%;
			height: 544upx;
		}

		.message {
			height: 120upx;
			position: absolute;
			left: 32upx;
			top: 220upx;
			width: 686upx;

			image {
				height: 120upx;
				width: 120upx;
				border-radius: 50%;
			}

			text {
				font-size: 36upx;
				color: #fff;
				position: absolute;
				left: 140upx;
				top: 40upx;
			}
		}

		.content {
			width: 686upx;
			height: 240upx;
			position: absolute;
			background-color: #fff;
			left: 32upx;
			top: 385upx;
			border-radius: 15upx;
			box-shadow: 0 7px 27px 0 rgba(0, 0, 0, 0.12);

			.icon_box {
				margin: 48upx;
				height: 122upx;
				float: left;

				image {
					width: 70upx;
					height: 70upx;
				}

				text {
					display: block;
					width: 70upx;
					text-align: center;
					color: #333333;
					font-size: 28upx;
					margin-top: 12upx;
				}
			}
		}
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 98upx;
		display: flex;
		justify-content: space-around;
		z-index: 99999999999;
		background-color: #fff;
		box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.05);

		.iconbox {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 20upx;

			image {
				height: 40upx;
				width: 40upx;
			}

			.text {
				font-size: 22upx;
				color: #999;
			}

			.in {
				color: #333;
			}

		}

	}
</style>
