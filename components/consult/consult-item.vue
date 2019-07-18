<template>
	<view class="consult">
		<view class="item" v-for="(item,index) in itemList" :key="index"  @click="artList(item.id)">
			<view class="itemLogo">
				<image :src="item.topimg" mode="scaleToFill"></image>
			</view>
			<view class="introduc">
				<view class="title">{{item.title}}</view>
				<view class="introducText">
					<view class="introduc_data">
						<text class="iconfont iconshijian">&#xe675;</text>
						{{item.gmtcreate}}
					</view>
					<view class="introduc_browse ">
						<text class="iconfont iconchakan">&#xe62b;</text>
						{{item.viewcount}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		props: {
			itemList: {
				type: Array,
				default: function(e){
					return {}
				}
			},
			
		},
		data() {
			return {};
		},
		methods: {
			artList(id){
				var id  = id
				uni.navigateTo({
					url:'/pages/consult/consultParticulars?id='+id
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	// 矢量图标
	.iconshijian ,.iconchakan{
		font-size:20upx;
		margin-right:10upx;
		color:#BEBEBE;
		font-weight:normal;
	}
	.consult {
		width:100%;
		overflow:hidden;
	}
	.item {
		height:242upx;
		padding:30upx;
		box-sizing:border-box;
		display:flex;
		border-bottom: 1upx solid #EEEEEE;
		
	}
	.itemLogo {
		height:182upx;
		width:280upx;
		border-radius: 10upx;
		overflow:hidden;
		background: #D8D8D8;
		image {
			height:182upx;
			width:280upx;
		}
	}
	.introduc {
		flex:1;
		padding-left:30upx;
		padding-right:10upx;
		box-sizing:border-box;
	}
	.title {
		font-size: 30upx;
		color: #333333;
		line-height: 42upx;
		max-height:130upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.introducText {
		padding-top:10upx;
		height:30upx;
		width:100%;
		display:flex;
	}
	.introduc_data {
		height:30upx;
		font-size: 22upx;
		color: #999999;
		line-height:30upx;
		margin-right:45upx;
		font-weight: bold;
	}
	.introduc_browse {
		height:30upx;
		font-size: 22upx;
		color: #999999;
		line-height:30upx;
		margin-right:45upx;
		font-weight: bold;
	}
</style>
