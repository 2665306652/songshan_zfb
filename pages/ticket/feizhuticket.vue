<template>
	<view class="bigestbox" :style="btn && !changeCss ? 'position:fixed' : ''">
		<view>
			<!-- <ynGallery :galleryheight="460" bkstart="ragb(0,0,0,0)" bkend="ragb(0,0,0,0)" :imgviewwidth="235" :imgviewheight="310"
			 :showdec="true" :images="galleryImgs" class="swipe"></ynGallery> -->
			<ynGallery :images="imgList" :desc="productName" :isIphone="isIphoneX" class="swipe"></ynGallery>
		</view>
		<view class="main-wrap">
			<!-- icon容器 -->
			<view class="facility-icon-wrap">
				<view class="wrap">
					<image src="/static/assents/tikect/shop-icon.png" class="icon"></image>
				</view>
				<view class="wrap">
					<image src="/static/assents/tikect/food-icon.png" class="icon"></image>
				</view>
				<view class="wrap">
					<image src="/static/assents/tikect/park-icon.png" class="icon"></image>
				</view>
			</view>

			<view class="address-wrap">
				<view class="text-wrap">
					<text class="address">{{ addressStr }}</text>
					<text class="distance">距离您 {{ distance }} km</text>
				</view>
				<view class="phone-wrap" @click="handleShowPopup()">
					<image src="../../static/assents/tikect/phone-icon.png" class="phone-icon"></image>
					<text class="text">电话</text>
				</view>
			</view>
			<view class="content-wrap">
				<u-parse :content="content"></u-parse>
			</view>

			<view class="bottom-wrap">
				<view class="policy-title">
					<image src="../../static/assents/tikect/policy-title-l.png" class="policy-img"></image>
					<text>景点政策</text>
					<image src="../../static/assents/tikect/policy-title-r.png" class="policy-img"></image>
				</view>
				<view class="policy-content">
					<text class="title">
						<image src="../../static/assents/tikect/gou-icon.png" class="icon"></image>
						开放时间
					</text>
					<text class="desc">周一至周日 7：00-18：30</text>
				</view>
				<view class="policy-content">
					<text class="title">
						<image src="../../static/assents/tikect/gou-icon.png" class="icon"></image>
						入园时间
					</text>
					<text class="desc">夏季7:00-17:30 冬季：8:00-16:00</text>
				</view>
				<view class="policy-content">
					<text class="title">
						<image src="../../static/assents/tikect/gou-icon.png" class="icon"></image>
						温馨提示
					</text>
					<text class="desc">{{warmTips}}</text>
				</view>
			</view>
		</view>

		<view class="pop_upbox" :class="isIphoneX && !btn ? 'bottom' : ''" :style="btn ? 'bottom:59%;' + 'box-shadow: 0 4px 15px 0 rgba(0,0,0,0.04);' + 'background:#fff' : 'bottom:0;' + 'transition: bottom .3s linear;'"
		 v-if="showBottomNav">
			<text class="smallbox" v-for="(i, index) in pop_upbox" :key="index" @tap="show(index)" :style="(index==idx)&&btn?'background:#333;'+'color:#fff;':''">{{ i.name }}</text>
		</view>
		<view class="pop">
			<!-- 		<popup-layer ref="popupRef" :direction="'top'" :btn="btn"  :idx="index" :ticketifo="ticketifo" :commentList="commentList" @closeCallBack="down">
 -->
			<popup-layer ref="popupRef" :instruction="instruction" :direction="'top'" :btn="btn" :idx="idx" :ticketifo="ticketifo"
			 :date="date" :infoCode="infoCode" :morendate="morendate" :cancelConditionArray="cancelConditionArray" :commentList="commentList"
			 @closeCallBack="down" @handleChangeCss="handleChangeCss" :openId="openId" :tid="tid" :longitude="longitude"
			 :latitude="latitude" :address="address"></popup-layer>
		</view>

		<uni-popup :show="showPopup" position="bottom" @hidePopup="hidePopup">
			<view class="bottom-content">
				<view class="call-btn" @tap="handleCall('0371-62745000')">呼叫 0371-62745000</view>
				<view class="bottom-btn" @tap="hidePopup">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import ynGallery from 'components/YnComponents/ynGallery/ynGallery.vue';
	// 底部 门票购买 评价 呼我
	import popupLayer from 'components/popup-layer.vue';
	import uniPopup from '../../components/common/uni-popup/uni-popup.vue';
	import {
		requestWB as uniRequest,
		requestZT as ztRequest
	} from 'uni-request';
	import uParse from '@/components/gaoyia-parse/parse.vue';
	import moment from 'moment';
	import 'moment/locale/zh-cn'
	moment.locale('zh-cn');
	let PASS_STATUS = 1; //审核通过
	export default {
		components: {
			ynGallery,
			popupLayer,
			uniPopup,
			uParse
		},
		data() {
			return {
				tid: '', // 票id
				productName: '', //票产品名称
				imgList: [], //画廊图片地址
				content: '', //详情内容
				addressStr: '',
				changeCss: false,
				openId: '',
				address: '',
				distance: '',
				longitude: '',
				latitude: '',
				commentList: [],
				showPopup: false,
				showBottomNav: true,
				// galleryImgs: [],
				pop_upbox: [{
						name: '门票购买'
					},
					{
						name: '评价'
					},
					{
						name: '呼我打车'
					}
				],
				boolShow: false,
				btn: false,
				idx: 999,
				isIphoneX: false,
				infoCode: '',
				ticketifo: [],
				date: [],
				nickname: '',
				avatar: '',
				externalId: '',
				token: '',
				morendate: '',
				cancelConditionArray: [],
				warmTips: '',
				instruction: ''
			};
		},
		methods: {
			show(idx) {
				let _this = this;

				const value = uni.getStorageSync('externalId')

				if (value) {

					this.$refs.popupRef.show(); // 弹出
					this.btn = true;
					this.idx = idx;
					// console.log(this.externalId,'id')
					if (this.idx == 0) {
						this.morendate = moment().format('YYYY-MM-DD')
						let today = moment().format('MM-DD');
						let tomorrow = moment().add(1, 'd').format('MM-DD');
						let houtian = moment().add(2, 'd').format('MM-DD');
						this.date = [today, tomorrow, houtian]
						// console.log(this.date)
						ztRequest
							.get('/api/public/sell_product/list', {
								params: {
									id: _this.tid
								}
							})
							.then(function(res) {
								_this.ticketifo = res.data.content;

								console.log(_this.ticketifo, 222);
							})
							.catch(function(error) {
								console.log(error);
							});
					}
				} else {
					uni.showLoading({
						title: '加载中'
					});
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
											// console.log(res, 'res');

										}).catch(function(error) {
											console.log(error);
										});


										this.nickname = infoRes.userInfo.nickName;
										this.avatar = infoRes.userInfo.avatarUrl;

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
					uni.hideLoading()
				}


			},
			loginIn() {
				ztRequest.post('/api/public/user/login', {
					externalId: this.externalId,
					buyerNick: this.nickname,
					imgUrl: this.avatar
				}).then(res => {
					if (res.data.code == '000000') {
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

					} else {
						uni.showToast({
							title: res.data.message
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			close() {
				this.$refs.popupRef.close(); // 关闭
			},
			down(btns) {
				this.btn = btns;
			},
			handleShowPopup() {
				this.showBottomNav = false;
				this.showPopup = true;
			},
			hidePopup() {
				this.showBottomNav = true;
				this.showPopup = false;
			},
			// 详情接口
			getDetailData() {
				ztRequest
					.get('/api/public/sell_product/details', {
						params: {
							id: this.tid,
							longitude: this.longitude,
							latitude: this.latitude
						}
					})
					.then(res => {
						if (res.data.code == '000000') {
							this.productName = res.data.content.productName || '';
							this.content = res.data.content.sellPoint || '';
							this.addressStr = ((res.data.content.province || '') + (res.data.content.city || '') + (res.data.content.address ||
								'')) || '';
							this.address = res.data.content.address || '';
							if(res.data.content.distance) {
								this.distance = res.data.content.distance.substring(0, res.data.content.distance.lastIndexOf(".")+3) || '未知';
							} else {
								this.distance =  '未知'
							}
							this.imgList = res.data.content.imgUrlArray || [];
							this.infoCode = res.data.content.infoCode || '';
							this.cancelConditionArray = res.data.content.cancelConditionArray
							this.instruction = res.data.content.instruction
							this.warmTips = res.data.content.warmTips
							// console.log(this.cancelCondition,123)
							// 							this.productName = res.data.content.productName;
							// 							this.content = res.data.content.sellPoint;
							// 							this.addressStr = res.data.content.addressStr;
							// 							this.address = res.data.content.address;
							// 							this.distance = res.data.content.distance;
							// 							this.imgList = res.data.content.imgUrlArray;
							// 							this.infoCode = res.data.content.infoCode;
							// 							console.log(res,123)

							// if (this.imgList.length) {
							// 	this.imgList.forEach(item => {
							// 		this.galleryImgs.push({
							// 			url: item.url,
							// 			dec: this.productName
							// 		});
							// 	});
							// }
						} else {
							uni.showToast({
								title: res.data.message
							});
						}
					});
			},
			// 评论列表数据
			getCommentList() {
				ztRequest
					.get('/api/public/comment/list', {
						params: {
							sellProductId: this.tid,
							status: PASS_STATUS
						}
					})
					.then(res => {
						if (res.data.code == '000000') {
							this.commentList = res.data.content;
						} else {
							uni.showToast({
								title: res.data.message
							});
						}
					});
			},
			handleChangeCss() {
				this.changeCss = true;
			},
			handleCall(number) {
				uni.makePhoneCall({
					phoneNumber: number
				});
			}
		},
		onLoad: function(option) {
			let _this = this;
			// #ifdef MP-ALIPAY
			my.getAuthCode({
				scopes: 'auth_user',
				success: (res) => {
					if (res.authCode) {
						// console.log(res,2222);
						uni.getUserInfo({
							provider: 'alipay',
							success: infoRes => {
							this.nickname = infoRes.userInfo.nickName;
							this.avatar = infoRes.userInfo.avatarUrl;

							}
						});
						console.log(res.authCode,33)
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
			this.tid = option.id;
			uni.getSystemInfo({
				success: res => {
					let modelmes = res.model;
					if (modelmes.search('iPhone X') != -1) {
						_this.isIphoneX = true;
					}
				}
			});
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					_this.longitude = res.longitude;
					_this.latitude = res.latitude;
					_this.getDetailData();
					// console.log(res, 'res')
				},
				fail: function(err) {
					console.log('定位失败')
					_this.longitude = '';
					_this.latitude = '';
					_this.getDetailData();
				}
			});
			// 			// #ifdef MP-ALIPAY
			// 			my.getLocation({
			// 				success: res => {
			// 					console.log(res, 'res')
			// 				}
			// 			})
			// 			// #endif	
			// 
			this.getCommentList();

			// 获取openId
			try {
				const token_val = uni.getStorageSync('token');
				if (token_val) {
					this.openId = uni.getStorageSync('openId');
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	};
</script>

<style lang="less" scoped>
	.bigestbox {
		position: relative;
		width: 100%;
		background: #ffffff;
		width: 100%;
	}

	.bottom {
		padding-bottom: 68upx;
	}

	.bg {
		position: relative;
		top: 0;
	}

	.main-wrap {
		padding: 0upx 30upx 150upx 30upx;
		box-sizing: border-box;

		.facility-icon-wrap {
			margin-bottom: 10upx;
			display: flex;
			flex-direction: row;

			.wrap {
				display: inline-block;
				z-index: 9;
			}

			.icon {
				z-index: 9;
				width: 15px;
				height: 15px;
				display: inline-block;
				margin-left: 17upx;
			}
		}

		.address-wrap {
			padding: 24upx 16upx;
			background: #FBFBFB;
			border-radius: 16px;
			display: flex;
			justify-content: space-around;

			.text-wrap {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-right: 20upx;

				.address {
					font-family: PingFangSC-Regular;
					font-size: 26upx;
					color: #333333;
					letter-spacing: 0;
					line-height: 26upx;
					margin-bottom: 14upx;
				}

				.distance {
					font-family: PingFangSC-Regular;
					font-size: 20upx;
					color: #999999;
					letter-spacing: 0;
					line-height: 22upx;
				}
			}

			.phone-wrap {
				display: flex;
				flex-direction: column;
				width: 50upx;

				.phone-icon {
					width: 32upx;
					height: 32upx;
					margin-bottom: 8upx;
				}

				.text {
					font-family: PingFangSC-Light;
					font-size: 20upx;
					color: #5d636f;
					letter-spacing: 0;
				}
			}
		}

		.content-wrap {
			padding: 50upx 0 0 0;

			text {
				font-family: PingFangSC-Regular;
				font-size: 32upx;
				color: #656565;
				letter-spacing: 0;
				line-height: 50upx;
			}

			image {
				width: 700upx;
			}
		}

		.bottom-wrap {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-top: 50upx;
			padding-bottom: 165upx;

			.policy-title {
				display: flex;
				align-self: center;
				align-items: center;
				margin-bottom: 10upx;

				text {
					margin: 0 32upx;
					font-family: PingFangSC-Medium;
					font-size: 38upx;
					color: #222222;
					letter-spacing: 0;
					line-height: 30upx;
				}

				.policy-img {
					width: 56upx;
					height: 10upx;
				}
			}

			.policy-content {
				margin-top: 32upx;

				.title {
					display: flex;
					font-family: PingFangSC-Regular;
					font-size: 28upx;
					color: #333333;
					letter-spacing: 0;
					margin-bottom: 20upx;

					.icon {
						width: 24upx;
						height: 24upx;
						margin-right: 18upx;
					}
				}

				.desc {
					font-family: PingFangSC-Regular;
					font-size: 26upx;
					color: #8d8d8d;
					letter-spacing: 0;
				}
			}
		}
	}

	.pop_upbox {
		height: 7.34%;
		position: fixed;
		z-index: 10000009;
		bottom: 0;
		width: 100%;
		background: #fbfbfb;
		box-shadow: 0 -4upx 7upx 0 rgba(0, 0, 0, 0.05);
		transition: bottom 0.7s ease;

		.smallbox {
			border: 1px solid rgba(0, 0, 0, 0.08);
			border-radius: 8upx;
			color: #333;
			font-size: 36upx;
			height: 63.6%;
			line-height: 170%;
			display: inline-block;
			padding: 0 20upx;
			margin: 2.2%;
			font-weight: 600;
			font-family: Arial, Helvetica, sans-serif;
		}
	}
	// 呼叫电话 样式
	.bottom-content {
		padding: 30upx;
		.call-btn {
			// background-color: #108EE9;
			// color: #ffffff;
			margin-bottom: 16upx;
			background: #FFFFFF;
			border-radius: 16upx;
			font-family: PingFangSC-Regular;
			font-size: 40upx;
			color: #2877E0;
			letter-spacing: 0;
		}
		.bottom-btn {
			background: #FFFFFF;
			border-radius: 16upx;
			font-family: PingFangSC-Regular;
			font-size: 40upx;
			color: #2877E0;
			letter-spacing: 0;
		}
	}
</style>
