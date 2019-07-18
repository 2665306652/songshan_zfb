<template>
	<view>
		<view v-show="show" :style="{ top: offsetTop + 'px' }" class="uni-mask">


			<!-- <view v-show="show"> -->
			<view v-if="msg" class="consult_bottom">
				<view class="msgData" @tap="callPhone(msg)">{{msg}}</view>
				<view class="cancel" @tap="closeMask">取消</view>
			</view>

			<view v-else class="consult_middle">

				<view class="consult_middle_title">
					评价
					<view class="uni-icon uni-icon-close" @tap="hide" />
				</view>

				<!-- 需要一个星星的组件 -->
				<view class="articl_estart">
					<uniRate size="24" margin="10" max="5" :value="RateValue" disabled="false" @change="rate"></uniRate>
				</view>

				<view class="textarea_text">
					<textarea @blur="bindTextAreaBlur" maxlength="140" v-model="TextAreaBlur" placeholder="导游服务怎么样？有什么值得改进的地,大家都期待您的点评！" />
					</view>
					
					<view class="data_dispose">
						<view class="data_cancel" @tap="cancel">
							取消
						</view>
						
						<view class="data_affirm" @tap="affirm">
							发布
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import uniRate from "@/components/common/rate/uni-rate/uni-rate.vue"
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';

	export default {
		components: {
			uniRate,
		},
		props: {
			/**
			 * 页面显示
			 */
			id:String,
			show: {
				type: Boolean,
				default: false
			},

			/**
			 * 额外信息
			 */
			msg: {
				type:String,
				default:''
			},
			/**
			 * h5遮罩是否到顶
			 */
			h5Top: {
				type: Boolean,
				default: false
			},
			buttonMode: {
				type: String,
				default: 'bottom'
			}
		},
		data() {
			return {
				offsetTop: 0,
				TextAreaBlur:'',
				RateValue:0,
				list:[],
				ple:false
			}
		},
		watch: {
			h5Top(newVal) {
				if (newVal) {
					this.offsetTop = 44
				} else {
					this.offsetTop = 0
				}
			}
		},
		created() {
			let offsetTop = 0
			// #ifdef H5
			if (!this.h5Top) {
				offsetTop = 44
			} else {
				offsetTop = 0
			}
			// #endif
			this.offsetTop = offsetTop
		},
		methods: {
			hide() {
				this.$emit('hidePopup')
			},
			closeMask() {
				this.$emit('hidePopup')
			},
			// 拨打电话
			callPhone(msg){
				uni.makePhoneCall({
					phoneNumber: msg 
				});
			},
			// 取消评价，数据清空
			cancel(){
				this.RateValue=0,
				this.TextAreaBlur=''
				this.$emit('hidePopup')
			},
			rate: function (e){
							this.RateValue=e.value
						},
						// 文本输入
			bindTextAreaBlur: function (e) {
					this.TextAreaBlur=e.detail.value
			},
			// 确认提交
			affirm(){
				
				if(this.RateValue==0){
					uni.showToast({
							title: '请选择评分',
							duration: 1000,
							position:'center'
					});
				}else if(!this.TextAreaBlur){
					uni.showToast({
							title: '请输入评价内容',
							duration: 1000,
							position:'center'
					});
				}else {
					const star=this.RateValue
					const val=this.TextAreaBlur
					let _this=this
					// #ifdef MP-ALIPAY					
					my.getAuthCode({
						scopes: 'auth_user',
						success: (res) => {
							if (res.authCode) {
								// console.log(res);
							    	uni.getUserInfo({
									provider: 'alipay',
									success: function(infoRes) {
										uniRequest.post('/tourguidecomment/addtourguidecomment', {
											tourguideid:_this.id,
											score:star,
											content:val,
											commentator:infoRes.userInfo.nickName,
											avatar:infoRes.userInfo.avatarUrl,
											type:1
										}).then(function(res) {
											_this.$emit("affirm",_this.id)

										})
										.catch(function(error) {
											console.log(error);
										});
										
									}
								});
							}
						},
					});
					// #endif						

				}
				this.RateValue=0,
				this.TextAreaBlur=''
			},
			
			 
		}
	}
</script>
<style lang="less" scoped>
	// 新增/修改
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.consult_bottom {
		position: absolute;
		bottom: 0upx;
		z-index: -1;
		width: 100%;
		height: 260upx;
		padding: 30upx;
		background-color: #ffff;
		box-sizing: border-box;

		.msgData {
			width: 100%;
			margin-bottom: 20upx;
			text-align: center;
			font-size: 34upx;
			height: 80upx;
			line-height: 80upx;
			background-color: #3d97cb;
			color: #ffffff;
		}

		.cancel {
			width: 100%;
			border: 1upx solid #CECECE;
			margin-bottom: 20upx;
			text-align: center;
			color: #333333;
			font-size: 34upx;
			height: 80upx;
			line-height: 80upx;
		}
	}

	.consult_middle {
		position: absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		width:600upx;
		height:650upx;
		border-radius: 16upx;
		background: #FFFFFF;
		.consult_middle_title {
			height:100upx;
			width:100%;
			font-weight:bold;
			text-align:center;
			line-height:100upx;
			font-size: 34upx;
			color: #333333;
			border-bottom:1upx solid #EEEEEE;
			padding:0 38upx;
			box-sizing:border-box;
			.uni-icon-close {
				float:right;
				margin-top:26upx;
			}
		}
		
		// 星星
		.articl_estart {
			height:120upx;
			padding-top:40upx;
			padding-left:100upx;
			box-sizing:border-box;
		}
		
		// 文本输入
		.textarea_text {
			height:264upx;
			width:100%;
			padding:0 38upx;
			box-sizing:border-box;
			font-size: 24upx;
			textarea {
				height:264upx;
				width:100%;
				padding:20upx;
				border: 1upx solid #CCCCCC;
				font-size: 24upx;
				color: #C3C3C3;
				background: #F8F8F8;
				letter-spacing: 0.43upx;
				text-align: left;
				line-height: 42upx;
				box-sizing:border-box;
			}
		}
		 
		 // 提交、取消
		 .data_dispose {
			 height:164upx;
			 padding:40upx 54upx;
			 width:100%;
			 box-sizing:border-box;
			 display:flex;
			 justify-content:space-between;
			 .data_cancel {
				 width:234upx;
				 height:86upx;
				 border: 1upx solid #CECECE;
				 border-radius: 8upx;
				 font-size: 34upx;
				 color: #999999;
				 line-height:86upx;
				 text-align:center;
			 }
			 .data_affirm {
				 background: #D39C64;
				 border-radius: 8upx;
				 width:234upx;
				 height:86upx;
				 font-size: 34upx;
				 line-height:86upx;
				 text-align:center;
				 color: #FFFFFF;
			 }
		 }
	}


	// .uni-popup {
	// 	position: fixed;
	// 	z-index: 999;
	// 	background-color: #ffffff;
	// 	padding:30upx;
	// 	box-sizing:border-box;
	// }

	// 	.uni-popup-middle {
	// 		display: flex;
	// 		flex-direction: column;
	// 		align-items: center;
	// 		justify-content: center;
	// 		top: 50%;
	// 		left: 50%;
	// 		transform: translate(-50%, -50%);
	// 	}
	// 
	// 	.uni-popup-middle.uni-popup-insert {
	// 		min-width: 380upx;
	// 		min-height: 380upx;
	// 		max-width: 100%;
	// 		max-height: 80%;
	// 		transform: translate(-50%, -65%);
	// 		background: none;
	// 		box-shadow: none;
	// 	}
	// 
	// 	.uni-popup-middle.uni-popup-fixed {
	// 		border-radius: 10upx;
	// 		padding: 30upx;
	// 	}
	// 
	// 	.uni-close-bottom,
	// 	.uni-close-right {
	// 		position: absolute;
	// 		bottom: -180upx;
	// 		text-align: center;
	// 		border-radius: 50%;
	// 		color: #f5f5f5;
	// 		font-size: 60upx;
	// 		font-weight: bold;
	// 		opacity: 0.8;
	// 		z-index: -1;
	// 	}
	// 	.uni-close-bottom {
	// 		margin: auto;
	// 		left: 0;
	// 		right: 0;
	// 	}
	// 	.uni-close-right {
	// 		right: -60upx;
	// 		top: -80upx;
	// 	}
	// 
	// 	.uni-close-bottom:after {
	// 		content: '';
	// 		position: absolute;
	// 		width: 0px;
	// 		border: 1px #f5f5f5 solid;
	// 		top: -200upx;
	// 		bottom: 56upx;
	// 		left: 50%;
	// 		transform: translate(-50%, -0%);
	// 		opacity: 0.8;
	// 	}
	// 
	// 	.uni-popup-top {
	// 		top: 0;
	// 		left: 0;
	// 		width: 100%;
	// 		height: 100upx;
	// 		line-height: 100upx;
	// 		text-align: center;
	// 	}
	// 
	// 	.uni-popup-bottom {
	// 		left: 0;
	// 		bottom: 0;
	// 		width: 100%;
	// 		min-height: 100upx;
	// 		line-height: 100upx;
	// 		text-align: center;
	// 	}
	// 呼叫电话 样式
	// .bottom-content {
	// 	padding: 30upx;
	// 	.call-btn {
	// 		background-color: #108EE9;
	// 		color: #ffffff;
	// 		margin-bottom: 20upx;
	// 	}
	// 	.bottom-btn {
	// 		border: 1px solid rgba(238, 238, 238, 0.65);
	// 	}
	// }
</style>
