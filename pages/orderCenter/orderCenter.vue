<template>
	<view class="wrap">
		<view class="page-title">
			订单中心
		</view>
		<view class="main-container">
			<head-tab ref="headTab" :tab-list="tabList" :tabCur.sync="tabCur" :isTop="isTop" @change="tabChange"></head-tab>
			<view class="list-wrap" :style="{paddingTop: isTop ? '.9rem' : '0'}">
				<swiper :current="tabCur" duration="300" @change="swiperChange">
					<swiper-item v-for="item in tabList" :key="item">
						<scroll-view style='height: 9.8rem; background: #FFF;' scroll-y="true">
							<view class="order-item" v-for="order in item.list" :key="order">
								<view class="content-wrap">
									<view class="title-wrap" @click="toticket(order.id)">
										<image src="../../static/assents/order/order-icon.png" class="icon"></image>
										<text class="title">{{ order.productName }}</text>
										<image src="../../static/assents/order/right-icon.png" class="right-icon"></image>
									</view>

									<text class="msg">
										{{ order.comeDate }}({{ order.week }}){{ calConsumeType(order.consumeType) }} · 成人票 · {{ order.count }}位
									</text>
									<view class="status-price">
										<text v-if="order.status == 1">待付款</text>
										<text v-if="order.status == 2">处理中</text>
										<text v-if="order.status == 3">已使用</text>
										<text v-if="order.status == 4">待使用</text>
										<text v-if="order.status == 5">订单失败</text>
										<text v-if="order.status == 10">已关闭</text>

										<text class="price">￥{{ order.amount.amount }}</text>
									</view>
									<view class="btn-wrap">
										<button class="order-btn" @click="handleToDetail(order.orderNo,order.id)" v-if="order.status == 1">继续支付</button>
										<button class="order-btn" @click="handleToDetail(order.orderNo,order.id)" v-if="order.status == 4">马上使用</button>
										<button class="order-btn" @click="handleToDetail(order.orderNo,order.id)" v-if="order.status == 3||order.status == 5||order.status == 2||order.status == 10">订单详情</button>
										<button class="order-btn"  @click="handleAddComment(order.id)" v-if="order.status==3">点评一下</button>
									</view>
								</view>
								<image :src="order.imgUrl" class="order-img"></image>
							</view>
							<view class="nothing-wrap" v-if="!item.list.length">暂无数据</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>

		<create-comment :tid="tid" :openId="openId" :showAddComment="showAddComment" @handleShowCom="handleShowCom"></create-comment>

	</view>
</template>

<script>
	import HeadTab from '@/components/common/head-tab/head-tab.vue'
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	import createComment from '../../components/createComment.vue'

	export default {
		data() {
			return {
				tabCur: 0,
				isTop: false,
				showAddComment: false,
				name: '', //用户名
				image: '', //头像
				openId: '',
				tid: '',//售卖产品id
				status: '',
				tabList: [{
					name: '全部订单',
					list: []
				}, {
					name: '待付款',
					list: []
				}, {
					name: '待使用',
					list: []
				}, {
					name: '退款/售后',
					list: []
				},]
			}
		},
		methods: {
			tabChange(i) { //状态0-取消 1-待支付 2-已支付 3-完结'
				switch (i) {
					case 0: //全部订单
						this.status = ''
						break;
					case 1: //待付款
						this.status = 1
						break;
					case 2: //待使用
						this.status = 4
						break;
					case 3: //退款/售后
						this.status = 5
						break;
		
					default:
						return ''
				}
				this.getListData()

			},
			calConsumeType(i) { //0 取票入园 1 电子票入园 2 身份证入园 3 优惠核销（整单优 惠)
				switch (i) {
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
			swiperChange(e) {
				this.tabCur = e.detail.current
			},
			getListData() {
				uni.showLoading({
					title: '加载中'
				});
				ztRequest.post('/api/public/order/getOrderList', {
					openId: this.openId,
					status: this.status
				}).then(res => {
					uni.hideLoading();
					if (res.data.code == '000000') {
						this.tabList[this.tabCur].list = res.data.content || [];
						// console.log(res.data.content,123)
					} else {
						uni.showToast({
							title: res.data.message,
							duration: 1000
						});
					}
				}).catch(err => {
					console.log(err)
					uni.hideLoading();
				})
				
			},
			handleToDetail(orderNo,id) {
				uni.navigateTo({
					url: `/pages/orderCenter/orderDetail?orderNo=${orderNo}&id=${id}`
				})
			},
			toticket(id){
			console.log(id,111)

				uni.reLaunch({
					url: '/pages/ticket/feizhuticket?id='+ id,
						
				})
			},
			loginIn() {
				ztRequest.post('/api/public/user/login', {
					externalId: this.externalId,
					buyerNick: this.name,
					imgUrl:this.image
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
						this.openId = res.data.content.openid
						this.getListData()

					} else {
						uni.showToast({
							title: res.data.message
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleAddComment(val) {
				this.tid = val;
				this.showAddComment = true;
			},
			handleShowCom(val) {
				this.showAddComment = val;
			}
		},
		onLoad() {
			try {
				const token_val = uni.getStorageSync('token');
				if (token_val) {
					this.openId = uni.getStorageSync('openId');
					this.getListData()
				} else {
					// #ifdef MP-ALIPAY
					// 如未授权 重新授权登录；
					my.getAuthCode({
						scopes: 'auth_user',
						success: (res) => {
							if (res.authCode) {
								// console.log(res,2222);
								uni.getUserInfo({
									provider: 'alipay',
									success: infoRes => {

										this.name = infoRes.userInfo.nickName;
										this.image = infoRes.userInfo.avatarUrl;

									}
								});

								// 服务端 换取用户id 
								ztRequest.post('/api/public/alipay/auth', {
									authcode: res.authCode
								}).then(response => {
									if (response.data.code == '000000') {

										this.externalId = response.data.content || '';

										// 服务端 登录
										this.loginIn()

									}else {
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



			} catch (e) {
				//TODO handle the exception
			}
			// this.getListData()
		},
		components: {
			HeadTab,
			createComment
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: relative;
		width: 100%;
		background-color: #ffffff;
	}

	.page-title {
		font-size: 38upx;
		color: #333333;
		line-height: 53upx;
		padding: 30upx;
		font-weight: bold;
	}

	.main-container {
		.list-wrap {
			padding: 30upx;

			.order-item {
				display: flex;
				padding: 40upx 0;
				border-bottom: 1px solid rgba(51, 51, 51, 0.10);

				&:last-of-type {
					border-bottom: none;
				}

				.content-wrap {
					flex: 1;
					display: flex;
					flex-direction: column;

					.title-wrap {
						display: flex;
						align-items: center;

						.icon {
							margin-right: 16upx;
							width: 35upx;
							height: 35upx;
						}

						.title {
							font-family: PingFangSC-Medium;
							font-size: 28upx;
							color: #333333;
							line-height: 40upx;
						}

						.right-icon {
							width: 12upx;
							height: 12upx;
							margin-left: 16upx;
						}

					}

					.msg {
						font-size: 28upx;
						color: #333333;
						line-height: 40upx;
					}

					.status-price {
						margin-top: 20upx;
						font-size: 28upx;
						color: #EE7D31;
						line-height: 40upx;

						.price {
							font-family: DINAlternate-Bold;
							line-height: 32upx;
							font-size: 28upx;
							color: #333333;
							margin-left: 32upx;
						}
					}

					.btn-wrap {
						display: flex;

						.order-btn {
							width: 156upx;
							height: 58upx;
							line-height: 58upx;
							margin-top: 28upx;
							font-size: 28upx;
							color: #333333;
							border: 1px solid rgba(51, 51, 51, 0.10);
							border-radius: 8px;
							margin-right: 24upx;
							font-family: PingFangSC-Light;
						}
					}
				}

				.order-img {
					width: 176upx;
					height: 132upx;
				}
			}
		}
	}
</style>
