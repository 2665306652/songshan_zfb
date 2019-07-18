<template>
	<view class="big_box">
		<view class="box" v-for="(i,index) in list" :key="index" @click="ticket(i.id)">
			<view class="title_box">
				<view class="bg_box"></view>
					<text>{{i.title}}</text>
			</view>
			<view class="image"><image :src="i.img" mode="scaleToFill"></image></view>
		</view>
		
	</view>
</template>

<script>
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';

	export default{
		data(){
			return{
				list:[]
		
			}
			
		},
		onLoad() {
			let _this=this;
			uniRequest.post('/ticketcategory/gethomefticketcategorylist', { 
					}).then(function (res) {
						// console.log(res.data.data);
						_this.list=res.data.data
					}).catch(function (error) {
						console.log(error);
					});
		},
		methods:{
			ticket(i){
				uni.navigateTo({			
					url: 'ticketDetail?id='+i
				});
				// console.log(url)
			}
		}
	}
</script>

<style  lang="less" scoped>
	.big_box{
		margin: 0 30upx;

		
	}
	.box{
		margin-bottom: 30upx;
		image{
			width: 100%;
			height: 260upx;
		}
	}
	.title_box{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		position: relative;
		margin-top: 10upx;
		.bg_box{
			position: absolute;
			left: 0;
			top: 10upx;
			width: 4upx;
			height: 28upx;
			background-color: #D39D66;
		}
		
		text{
			font-size: 30upx;
			line-height: 50upx;
			display: inline-block;
			font-weight: bold;
			margin-left: 20upx;
		}
	}
</style>