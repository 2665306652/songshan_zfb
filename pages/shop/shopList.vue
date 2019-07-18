<template>
	<view class="shop-list-wrap">
		<sort-tab class="sort-tab-wrap fixed" :sortTabList="sortTabList" @chooseItem="chooseItem"></sort-tab>
		<scroll-view>
			<block v-for="item in list" :key="item.id">
				<view class="item" @tap="toDetail(item.id)">
					<image :src="item.img" class="l-image"></image>
					<view class="r-wrap">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="address">
							<text class="iconfont icon-address">&#xe601;</text>
							{{ item.address }}
						</view>
					</view>
				</view>
			</block>
			
			<view class="nothing-wrap" v-if="!list.length">暂无数据</view>
		</scroll-view>
	</view>
</template>

<script>
	import SortTab from '@/components/common/sort-tab/sort-tab.vue'
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	export default {
		data() {
			return {
				list: [],
				sortTabList: [{
						name: '智能排序',
						val: 'synthesis',
						subTab: [{
							name: '不限',
							val: ''
						}, {
							name: '距离最近',
							val: '1'
						}, {
							name: '人气最高',
							val: '2'
						}],
					},
					{
						name: '商店类型',
						val: 'type',
						subTab: [{
							name: '不限',
							val: ''
						}, {
							name: '超市&便利店',
							val: '1'
						}, {
							name: '服饰鞋包',
							val: '2'
						}, {
							name: '综合商场',
							val: '3'
						}, {
							name: '花店',
							val: '4'
						}, {
							name: '烟酒茶叶',
							val: '5'
						}, {
							name: '食品药品',
							val: '6'
						}, {
							name: '药妆店/药店',
							val: '7'
						}],
					}
				],
				condition: {
					type: '',
					synthesis: '',
					longitude: '',
					latitude: ''
				}
			}
		},
		components: {
			SortTab
		},
		onLoad() {
			this.getaddress()
		},
		methods: {
			// 获取经纬度
			getaddress() {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						this.condition.longitude = res.longitude
						this.condition.latitude = res.latitude
						this.getListData()
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
						if(val == '1' && key == 'synthesis') { //距离最近 获取经纬度
							this.getaddress()
						}
						this.getListData()
						return
					}
				}
				// 根据condition去调接口
				this.getListData()
			},
			getListData() {
				uniRequest.post('/shopping/gethomeshoppinglist', this.condition).then(res => {
					this.list = res.data.data;
				}).catch(error => {
					console.log(error);
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/shop/shopDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop-list-wrap {
		margin-top: 50px;
		background-color: #ffffff;

		.sort-tab-wrap.fixed {
			position: fixed;
			width: 100%;
			top: 88upx;
			z-index: 1024;
		}

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
					margin-top: 15upx;
				}


				.address {
					font-size: 22upx;
					color: #999999;
					margin-top: 55upx;
					line-height: 20upx;

					.icon-address {
						vertical-align: top
					}
				}

			}
		}
	}
</style>
