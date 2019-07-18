<template>
	<view class="ticket-list-wrap">
		<head-tab :tab-list="List" :tabCur.sync="TabCur" @change="tabChange"></head-tab>
		<swiper :current="TabCur" :style="'height:'+calculate(calHeight)" duration="300" @change="swiperChange">
			<swiper-item v-for="(item,index) in List" :key="index">
				<scroll-view>
						<view class="item" v-for="(ticket, innerIndex) in item.tabList" :key="innerIndex">
							<image :src="ticket.iconUrl" mode="aspectFill" class="l-image" @click="handleToDetail(ticket.id)"></image>
							<view class="r-wrap">
								<view class="title" @click="handleToDetail(ticket.id)">
									{{ ticket.productName }}
									<view class="">
									</view>

								</view>
								<text class="use-msg" @click="handleToDetail(ticket.id)">当日可用</text>
								<view class="price" @click="handleToDetail(ticket.id)"><span>￥</span>{{ ticket.sellPrice.amount }}</view>
								<view class="taxi">
									<view class="distance">
										<text class="iconfont icon-address">&#xe601;</text>
										
										{{ ticket.distance }} KM
									</view>
									<text class="taxi-btn" @click="callcar(ticket.longitude, ticket.latitude, ticket.address)">坐车</text>
								</view>
							</view>
						</view>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import HeadTab from '@/components/common/head-tab/head-tab.vue';
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	export default {
		data() {
			return {
				TabCur: 0,
				id: 0,
				List: [{
					name: '门票',
					tabList: []
				}],
				longitude: '',
				latitude: '',
				current: 1,
				size: 10,
				calHeight: ''
			}
		},
		components: {
			HeadTab
		},
		methods: {
			calculate(num) {
				return uni.upx2px(num) + 'px'
			},
			callcar(longi, lati, address) {
				// uni.navigateToMiniProgram({
				// 	appId: '2018122862752160',
				// 	extraData: {
				// 		'origin': '',
				// 		'destination': longi + ',' + lati + ',' + address,
				// 		'serviceType': 0
				// 	},
				// 	success(res) {
				// 		// 打开成功
				// 	}
				// })
				uni.navigateTo({
					url: '/pages/nothing/huerNothing'
				});
			},
			swiperChange(e) {
				this.TabCur = e.detail.current

			},
			tabChange(i) {

			},
			getListData() {
				ztRequest.get('/api/public/sell_product/findPageList', {
					params: {
						longitude: this.longitude,
						latitude: this.latitude
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == '000000') {

						let getlists = res.data.content.records;
						if(getlists != []){
							for(var i = 0; i < getlists.length ; i++){
								if(!getlists[i].distance){
									getlists[i].distance = '未知';
								}else{
									getlists[i].distance = getlists[i].distance.substring(0, getlists[i].distance.lastIndexOf(".")+3);
								}
							}
							this.List[this.TabCur].tabList = getlists;
							this.calHeight = this.List[this.TabCur].tabList.length * 145 * 2
						}
						
						// this.List[this.TabCur].tabList = res.data.content.records || []
						// ticket.distance==undefined?'未知':ticket.distance.substring(0, ticket.distance.lastIndexOf(".")+3) 
					} else {
						uni.showToast({
							title: res.data.message
						})
					}
				})

				
				
			},
			handleToDetail(val) {
				uni.navigateTo({
					url: '/pages/ticket/feizhuticket?id='+ val
				})
			}
		},
		
		onLoad: function(option) {
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					this.longitude = res.longitude;
					this.latitude = res.latitude;
					this.getListData()
				},
			 fail: err => {
					console.log('定位失败');
					this.longitude = "";
					this.latitude = "";
					this.getListData()
				}
			});
	
		}


	}
</script>

<style lang="scss" scoped>
	.ticket-list-wrap {
		margin-top: 88upx;
		background-color: #ffffff;

		.item {
			padding: 30upx;
			display: flex;
			border-bottom: 1px solid rgba(238, 238, 238, 0.65);
			position: relative;

			&:first-of-type {
				border-top: 1px solid #eee;
			}

			.l-image {
				width: 200upx;
				height: 220upx;
				border-radius: 10upx;
			}

			.r-wrap {
				flex: 1;
				padding: 10upx 0 10upx 30upx;

				.title {
					font-size: 30upx;
					color: #333333;
					line-height: 42upx;
					font-weight: bold;
					margin-bottom: 15upx;

					.status {
						color: #999999;
						font-size: 22upx;
						line-height: 30upx;
					}
				}

				.use-msg {
					color: $theme-light-orange;
					font-size: 20upx;
					line-height: 32upx;
					display: inline-block;
					border: 1px solid $theme-light-orange;
					border-radius: 4px;
					padding: 2upx 10upx;
				}

				.price {
					color: $theme-light-orange;
					font-size: 38upx;
					line-height: 53upx;
					margin-top: 20upx;

					span {
						font-size: 20upx;
						line-height: 28upx;
						margin-right: 4upx;
					}
				}

				.taxi {
					position: absolute;
					right: 30upx;
					bottom: 30upx;
					text-align: center;

					.distance {
						color: $theme-dark-orange;
						font-size: 22upx;
						line-height: 30upx;

						.icon-address {
							vertical-align: top;
						}
					}

					.taxi-btn {
						display: inline-block;
						text-align: center;
						width: 120upx;
						height: 56upx;
						background: $theme-dark-orange;
						border-radius: 4px;
						color: #ffffff;
						font-size: 28upx;
						line-height: 56upx;
					}
				}
			}
		}
	}
</style>
