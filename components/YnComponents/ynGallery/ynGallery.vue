<template>
	<view class="swiper" :style="isIphoneX? 'padding-top:'+calculate(200) : 'padding-top:'+calculate(170)">
		<view v-if="images.length" class="galleryBg" :style="{'background-image': 'url(' + images[swiperCurrentIndex].url + ')'}"></view>
		<!-- 渐变层 -->
		<view class="galleryBg1"></view>
		<!-- <view class="gradient-bg"></view> -->
		<!-- 描述 -->
		<view class="dec-wrap" :style="isIphoneX? 'top:16%' : 'top:20%' ">
			<text class="dec-title">{{desc}}</text>
			<view class="icons-wrap">
				<view class="icon-wrap">
					<image src="/static/assents/tikect/img-icon.png" class="icon"></image>
					{{images.length}}
				</view>
			</view>
		</view>
		<swiper  class="swiper-tall" :indicator-dots="indicatorDots" :autoplay="autoplay" duration="200"
		 :previous-margin="previousMargin" :next-margin="nextMargin" :circular="circular" @change="change" :current="swiperCurrentIndex">
			<swiper-item class="swiper-container" v-for="(img,index) in images" :key="index" :item-id="index" :data-year="index" style="display:flex; align-content:flex-end;justify-content: center; border-radius: 15px;">
				<image :src="img.url" class="swiper-img" style="border-radius: 8px;"></image>
			</swiper-item>
		</swiper>
				
	</view>
</template>
<script>
	export default {
		name: 'ynGallery',
		props: {
			images: {
				type: Array,
				default () {
					return []
				}
			},
			desc: {
				type: String,
				default: ''
			},
			isIphoneX: {
				type: Boolean,
				default: false
			}
			
		},
		data() {
			return {
				screenHeight: 0,
				// animationData: {
				// 	0: {},
				// 	1: {},
				// 	2: {}
				// },
				indicatorDots: false,
				autoplay: false,
				previousMargin: uni.upx2px(30) + 'px',
				nextMargin: uni.upx2px(140) + 'px',
				circular: false,
				zoomParam: 1.10,
				swiperCurrentIndex: 0,
				data: [],
				max: 0
			}
		},
		computed: {
			fullHeight() {
				const res = uni.getSystemInfoSync();
				return res.windowHeight - uni.upx2px(60) - (res.statusBarHeight + 44) + 'px';
			}
		},
		onLoad() {
			this.animation = uni.createAnimation();
			this.animation.scale(this.zoomParam).step();
			// this.animationData[0] = this.animation.export();
		},
		methods: {
			calculate(num) {
				return uni.upx2px(num) + 'px'
			},
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				this.title = e.detail.currentItemId;
				// for (let key in this.animationData) {
				// 	if (e.detail.currentItemId == key) {
				// 		this.animation.scale(this.zoomParam).step();
				// 		this.animationData[key] = this.animation.export();
				// 	} else {
				// 		this.animation.scale(1.0).step();
				// 		this.animationData[key] = this.animation.export();
				// 	}
				// }
			}
		}
	}
</script>

<style lang="scss">

	.swiper {
		padding-top: 145upx;
		position: relative;
		height: 750upx;
		margin-bottom: 10upx;
		overflow: hidden;
	}

	.galleryBg {
		content: "";
		width: 100%;
		height: 89%;
		position: absolute;
		left: 0;
		top: 0;
		filter: blur(5px);
		transform: scale(1.2);
		// background-position-y: 30%; 
		// background-repeat: no-repeat;
	}
	.galleryBg1 {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		// background: rgba(0,0,0,0.53);
		// background-image: linear-gradient(to bottom, rgba(0,0,0,0.53) 0%, rgba(255,255,255,0.53) 100%);
		background-image: linear-gradient(180deg, rgba(0,0,0,0.53) 0%, rgba(255,255,255,0.7) 100%);
	}  

	.swiper-container {
		display: flex;
		align-items: center;
		// width: 580upx;
		// height: 720upx;
	}

	.swiper-img {
		height: 720upx;
		width: 540upx;
		broder-radius: 16upx;
		
	}



	.swiper-tall {
		display: flex;
		align-items: flex-start;
		height: 100%;
	}
	.gradient-bg {
		position: absolute;
		bottom: -30upx;
		left: 0;
		width: 100%;
		height: 470upx;
		background-image: linear-gradient(-180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);
		// background: linear-gradient(-180deg,  #000000 100%, rgba(0,0,0,0.00) 0%);
	}
	
	// 描述视图样式
	.dec-wrap {
		position: absolute;
		top: 16%;
		left: 5%;
		height: 650upx;
		width: 500upx;
		padding: 30upx 24upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.dec-title {
			opacity: 0.8;
			// background-image: linear-gradient(90deg, rgba(0,0,0,0.00) 0%, #000000 100%);
			background: linear-gradient(to left, rgba(0,0,0,0.00) 0%, #000000 100%);
			border-radius: 4upx;
			font-family: PingFangSC-Medium;
			font-size: 38upx;
			color: #FFFFFF;
			letter-spacing: 0;
			padding: 8upx 6upx 8upx 24upx;
			z-index: 9;

		}
		.icons-wrap {
			align-self: flex-end;
			z-index: 9;
		}
		.icon-wrap {
			font-size: 18upx;
			color: #FFFFFF;
			background: #000000;
			opacity: 0.56;
			border-radius: 17upx;
			text-align: right;
			padding: 10upx 15upx;
			margin-right: 15upx;
			display: flex;
			align-items: center;
			.icon {
				width: 20upx;
				height: 20upx;
				margin-right: 5upx;
				vertical-align: middle;
			}
		}
		
	}
</style>
