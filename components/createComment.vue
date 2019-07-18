<template>
	<view class="wrap" v-if="showAddComment">
		<view class="close" @click="closePage()" :style="'margin-top:'+top">
			<text class="iconfont">&#xe660;</text>
		</view>
		<view class="content-wrap">
			<textarea class="text-area" v-model="commentVal" auto-height minlength="15" @input="bindTextAreaBlur" @blur="bindTextAreaBlur" placeholder="可以分享游玩心得或景点各方面的体验，多写点细节对大家更有帮助哦~" />
			<text class="desc">加油少年，一口气写满15个字即可发布！</text>
			 <button class="public-btn" :class="activeClass?'active': ''" @click="handlePublic">发表</button>
		</view>
	</view>
</template>

<script>
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	export default {
		name: 'create-comment',
		props: {
			showAddComment: {
				type: Boolean,
				default() {
					return false;
				}
			},
			tid: { // 售卖产品id
				type: String,
				default() {
					return ''
				}
			},
			openId: { // userId
				type: String,
				default() {
					return ''
				}
			},
			top: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				activeClass: false,
				commentVal: '',
				userId: this.openId
			};
		},
		methods: {
			closePage() {
				this.$emit('handleShowCom', false)
			},
			bindTextAreaBlur(e) {
				if(e.detail.value.length >= 15) {
					this.activeClass = true;
					this.commentVal = e.detail.value;
				} else {
					this.activeClass = false;
				}
			},
			// 发布操作
			handlePublic() {
				if(this.commentVal && this.commentVal.length >= 15) {
					// 请求发布评论接口
					ztRequest.post('/api/public/comment/add', {
						id: this.tid,
						openId: this.openId,
						content: this.commentVal
					}).then(res => {
						if(res.data.code == '000000') {
							uni.showToast({
								title: '发布成功'
							})
							this.commentVal = '';
							this.activeClass = false;
							
							this.$emit('handleShowCom', false);//关闭页面
							
						}else {
							uni.showToast({
								title: res.data.message
							})
						}
						
					})
					
				}else {
					return false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 99999999999999999;
		padding: 30upx;
		box-sizing: border-box;
		background-color: #fff;
		.close {
			height: 33upx;
			width: 100%;
			margin-bottom: 50upx;
		}
		.content-wrap {
			.text-area {
				font-family: PingFangSC-Light;
				font-size: 32upx;
				color: #BCBCBC;
				letter-spacing: 0;
				margin-bottom: 250upx;
			}
			.desc {
				font-family: PingFangSC-Light;
				font-size: 24upx;
				color: #BCBCBC;
				letter-spacing: 0;
				line-height: 33upx;
			}
			.public-btn {
				background: #6A6A6A;
				color: #999999;
				border-radius: 16upx;
				font-family: PingFangSC-Medium;
				font-size: 36upx;
				letter-spacing: 0;
				margin-top: 72upx;
				&.active {
					background: #EE7D31;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
