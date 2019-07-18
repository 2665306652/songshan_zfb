<template>
	<view class="hotel-list-wrap">
		<view class="tab-wrap">
			<head-tab style="height: 90upx" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></head-tab>
			<sort-tab style="height: 100upx" :top="90" :sortTabList="sortTabList" @chooseItem="chooseItem"></sort-tab>
		</view>
		<swiper class="swiper" :style="'height:'+calculate(calHeight)" :current="TabCur" duration="300" @change="swiperChange">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<scroll-view>
					<block v-for="(item,blockIndex) in item.list" :key="item.id">
						<view class="item" @tap="toDetail(item.id)">
							<image :src="item.img" class="l-image"></image>
							<view class="r-wrap">
								<view class="title">
									{{ item.title }}
								</view>
								<text class="tag" v-for="innerItem in item.label" :key="innerItem">{{ innerItem }}</text>
								<view class="address">
									<text class="iconfont icon-address">&#xe601;</text>
									{{ item.address }}
								</view>
							</view>
						</view>
					</block>
					
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import HeadTab from '@/components/common/head-tab/head-tab.vue'
	import SortTab from '@/components/common/sort-tab/sort-tab.vue'
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{
					name: '宾馆',
					list: []
				}, {
					name: '民宿',
					list: []
				}],
				sortTabList: [
					{
						name: '距离位置',
						val: 'distancetype',
						subTab: [{name: '不限', val: ''}, {name: '距离最近', val: '1'}, {name: '距离最远', val: '2'}]
					},
					{
						name: '星级价格',
						val: 'price',
						subTab: [{name: '不限', val: ''}, {name: '100-500', val: '1'}, {name: '500-1000', val: '2'}, {name: '1000以上', val: '3'}],
					},
					{
						name: '排序推荐',
						val: 'level',
						subTab: [{name: '不限', val: ''}, {name: '一般', val: '一般'}, {name: '中档', val: '中档'}, {name: '高档', val: '高档'}],
					}
				],
				condition: {
					distancetype: '',
					price: '',
					level: '',
					type: '',
					longitude: '',
					latitude: ''
				},
				calHeight: ''
			}
		},
		components: {
			HeadTab, SortTab
		},
		onLoad() {
			this.condition.type = 1;
			
			this.getaddress();
		},
		methods: {
			calculate(num) {
				return uni.upx2px(num) + 'px'
			},
			getListData() {
				uniRequest.post('/hotel/gethotellistbytype', this.condition).then(res => {
					if(res.data.code == '000000') {
						this.tabList[this.TabCur].list = res.data.data;
						this.calHeight = this.tabList[this.TabCur].list.length * 145 * 2
					} else {
						// uni.showToast({
						// 	title: res.data.message
						// })
					}
				}).catch(error => {
					console.log(error);
				});
			},
			// 获取经纬度
			getaddress() {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						this.condition.longitude = res.longitude;
						this.condition.latitude = res.latitude;
						
						this.getListData();
					},
					fail: err => {
						console.log('定位失败')
						this.condition.longitude = '';
						this.condition.latitude = '';
						
						this.getListData();
					}
				});
				
			},
			chooseItem(search) {
				let [key, val] = search;
				for (let k in this.condition) {
					if(key === k) { 
						(this.condition[k] = val)
						if(key == 'distancetype') { //距离最近 获取经纬度
							this.getaddress();
							return
						}
						this.getListData();
						return
					}
				}
				// 根据condition去调接口
				this.getListData()
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/hotel/hotelDetail?id='+ id
				})
			},
			tabChange(i) {
				this.condition.type = +i + 1
				// console.log(this.condition.type)
				this.getListData()
			},
			swiperChange(e) {
				this.TabCur = e.detail.current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hotel-list-wrap {
		background-color: #ffffff;
		.tab-wrap {
			margin-bottom: 190upx;
		}
		.item {
			padding: 30upx;
			display: flex;
			border-bottom: 1px solid rgba(238, 238, 238, 0.65);
			position: relative;
			&:last-of-type {
				border-bottom: none;
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

				}

				.tag {
					color: $theme-light-orange;
					font-size: 20upx;
					line-height: 32upx;
					display: inline-block;
					border: 1px solid $theme-light-orange;
					border-radius: 4px;
					padding: 2upx 10upx;
					margin-right: 8upx;
				}

				.address {
					font-size: 22upx;
					color: #999999;
					margin-top: 26upx;
					line-height: 50upx;
					width: 440upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					.icon-address {
						vertical-align: top
					}
				}

			}
		}
	
		.nothing-wrap {
			margin-top: 80px;
		}
	}
</style>
