<template>
	<view class="food-list-wrap">
		<sort-tab class="sort-tab-wrap" :sortTabList="sortTabList" @chooseItem="chooseItem"></sort-tab>
		<scroll-view>
			<block v-for="item in list" :key="item.id">
				<view class="item" @tap="toDetail(item.id)">
					<image :src="item.img" class="l-image"></image>
					<view class="r-wrap">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="consume">人均消费 ￥{{item.percapita}}</view>
						<text class="tag" v-for="(i,index) in item.label" :key=index>{{i}}</text>
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
	import SortTab from '@/components/common/sort-tab/sort-tab.vue';
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	export default {
		data() {
			return {
				longitude: '',
				latitude: '',
				list: [],
				sortTabList: [{
						name: '价格',
						val: 'price',
						subTab: [{
							name: '不限',
							val: ''
						}, {
							name: '100以内',
							val: '1'
						}, {
							name: '100-200',
							val: '2'
						}, {
							name: '200-300',
							val: '3'
						}, {
							name: '300以上',
							val: '4'
						}]
					},
					{
						name: '特色',
						val: 'features',
						subTab: [{
							name: '不限',
							val: ''
						}, {
							name: '当地口味',
							val: '1'
						}, {
							name: '主题餐厅',
							val: '2'
						}, {
							name: '下午茶',
							val: '3'
						}, {
							name: '老字号',
							val: '4'
						}, {
							name: '深夜营业',
							val: '5'
						}, {
							name: '景观餐厅',
							val: '6'
						}],
					},
					{
						name: '综合',
						val: 'synthesis',
						subTab: [{
							name: '不限',
							val: ''
						}, {
							name: '距离最近',
							val: '1'
						}, {
							name: '人均最低',
							val: '2'
						}, {
							name: '人均最高',
							val: '3'
						}],
					}
				],
				condition: {
					price: '',
					features: '',
					synthesis: '',
					longitude: '',
					latitude: ''
				},
				label: []
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
				uniRequest.post('/food/gethomefoodlist', this.condition).then(res => {
					if(res.data.code == '000000') {
						this.list = res.data.data || []
					} else {
						uni.showToast({
							title: res.data.message
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/specialFood/specialFoodDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.food-list-wrap {
		margin-top: 45px;
		background-color: #ffffff;
		
		.sort-tab-wrap {
			margin-bottom: 88upx;
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
				}

				.consume {
					font-size: 22upx;
					color: #999999;
					margin: 15upx 0;
					line-height: 20upx;
				}

				.tag {
					color: $theme-light-orange;
					font-size: 20upx;
					line-height: 32upx;
					display: inline-block;
					border: 1px solid $theme-light-orange;
					border-radius: 4px;
					padding: 2upx 10upx;
					margin: 15upx 10upx 0;
				}

				.address {
					font-size: 22upx;
					color: #999999;
					margin-top: 26upx;
					line-height: 40upx;
					overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
					width: 460upx;
					.icon-address {
						vertical-align: top
					}
				}

			}
		}
	}
</style>
