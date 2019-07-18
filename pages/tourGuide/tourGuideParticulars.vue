<!-- 向导详情页面 -->
<template>
	<view class="tourGuideParticulars_page">

		<view class="tourGuideParticulars">
			<view class="itemParticular">
				<view class="item_photo">
					<image :src="article.img" mode="aspectFit" class="photo"></image>
				</view>
				<view class="ParticularData">
					<view class="details_identity">
						<view class="details_name">{{article.name}}</view>
						<view class="details_service">{{article.level}}</view>
						<view class="details_age">{{article.newAge}}</view>
					</view>
					<view class="item_nickname">昵称：{{article.nickname}}</view>
				</view>
			</view>

			<view class="item_tagline">{{article.comments}}</view>
		</view>
		<!-- 评分 -->
		<!-- <view class="Particulars_grade">
			<view class="item_grade">评分：{{article.score}}分</view>
			<view class="item_comment">评论条数：{{article.commentnumber}}</view>
		</view>

		<view class="vacancy"></view>

		<view class="comment">
			<view class="item-introduce">
				<view class="item-commonalityIcon"></view>
				<view class="item-introduce_title">TA收到的评论</view>
			</view>

			<view class="item_start"> -->
				<!-- 需要一个星星的组件 -->
			<!-- 	<uniRate size="16" :value="article.score" disabled="true"></uniRate>
				<text class="star_minute">{{article.score}}</text>分
				<text class="star_number">({{article.commentnumber}}条评论)</text>
			</view>
		</view>
 -->
		<!-- 评论列表(可以拆成组件) -->
	<!-- 	<view class="commentParticularsData">
			<view v-for="(item, index) in list" :key="index">
				<view class="commentParticulars">

					<view class="comment_item">
						<view class="comment_item_photo">
							<image :src="item.avatar" mode="aspectFit" class="comment_photo"></image>
						</view>
						<view class="comment_Data">
							<view class="comment_name">{{item.commentator}}</view>
							<view class="comment_data"> -->
								<!-- 需要组件 -->
							<!-- 	<uniRate size="16" :value="item.score" disabled="true" class="dateDispose" />
								{{item.gmtcreate}}</view>
						</view>
					</view>

					<view class="comment_text">{{item.content}}</view>
				</view>
			</view>
		</view> -->


		<!-- 评论 电话咨询 -->
		<view class="comment_consult">
			<!-- <view class="comment_grade" @click="showPopup('grade')"><text class="iconfont iconicon_xie">&#xe636;</text>写评价</view> -->
			<view class="consult_comment" @click="showPopup('comment')"><text class="iconfont icondianhua1">&#xe629;</text>电话咨询</view>
		</view>
		
		<mypopup :show="popushshow" :msg="popushData" :id="id" @hidePopup="hidePopup" @affirm="affirm"></mypopup>
		
	</view>
</template>
<script>
	import mypopup from '@/components/common/my-popup/my-popup'; //item组件()
	import uniRate from "@/components/common/rate/uni-rate/uni-rate.vue";
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	var _self;
	export default {
		components: {
			mypopup,
			uniRate,
		},
		data() {
			return {
				type: '',
				article: [],
				popushshow:false,
				commentData: {},
				popushData:'',
				list:[],
				phone:'',
				id:'',
				page:1
			}
		},
		onReachBottom(){
			let _this=this
			this.page+=1
			uniRequest.post('/tourguidecomment/gethomebytourguideid', { 
				tourguideid:_this.id,
				page:_this.page,
					}).then(function (res) {
						console.log(res.data.data.list);
						_this.list=_this.list.concat(res.data.data.list)
					}).catch(function (error) {
						console.log(error);
					});
		},
		onLoad(option) {
			// 加载文章详情
			// uni.showLoading({});
			let _this=this;
			uniRequest.post('/tourguide/getbyidtourguideinfo', { 
				id:option.id
					}).then(function (res) {
						console.log(res.data.data);
						_this.article=res.data.data
						_this.phone=res.data.data.phone
						_this.id=res.data.data.id
					}).catch(function (error) {
						console.log(error);
					});
			uniRequest.post('/tourguidecomment/gethomebytourguideid', { 
				tourguideid:option.id,
				page:_this.page,
					}).then(function (res) {
						console.log(res.data.data.list);
						_this.list=res.data.data.list
					}).catch(function (error) {
						console.log(error);
					});
				
			// this.article = data.tourGuideParticulars
		},
		
		methods: {
		
			// 打开弹层,设置数据
			showPopup(type){
				this.popushshow=true;
				if(type=="grade"){
					this.popushData=''
				}else {
						this.popushData=this.phone

				}
			},
			
			// 关闭弹层
			hidePopup(){
				this.popushshow=false;
			},
			affirm(search){
				let _this=this;
				this.popushshow=false;
				uniRequest.post('/tourguidecomment/gethomebytourguideid', { 
					tourguideid:search,
					page:1,
						}).then(function (res) {
							console.log(res.data.data.list);
							_this.list=res.data.data.list
						}).catch(function (error) {
							console.log(error);
						});
					
				
			}
		}
	}
</script>
<style lang="less" scoped>
	// 矢量图标
	.iconicon_xie ,.icondianhua1{
		color:#D39C66;
		font-size:30upx;
		margin-right:13upx;
	}
	
	.tourGuideParticulars_page {
		width: 100%;
		height: 100%;
		overflow: hidde;
		// position: relative;
	}

	// 个人信息
	.tourGuideParticulars {
		height: 262upx;
		padding: 0 30upx;
		border-bottom: 1upx solid #EEEEEE;
		;
		padding-top: 36upx;
		padding-bottom: 29upx;
		box-sizing: border-box;
		overflow: hidden;

		// 资料
		.itemParticular {
			height: 100upx;
			width: 100%;
			display: flex;

			.item_photo {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				overflow: hidden;
				background: #D8D8D8;

				.photo {
					width: 100upx;
					height: 100upx;
				}
			}

			.ParticularData {
				flex: 1;
				padding-left: 30upx;
				box-sizing: border-box;

				.details_identity {
					display: flex;
					flex-wrap: nowrap;
					height: 66upx;
					padding: 12upx 0;
					box-sizing: border-box;
					align-items: center;

					.details_name {
						font-size: 30upx;
						color: #333333;
						line-height: 72upx;
					}

					.details_service {
						width: 100upx;
						background: #FE9053;
						border-radius: 6upx;
						font-size: 20upx;
						color: #FFFFFF;
						text-align: center;
						line-height: 32upx;
						margin-left: 24upx;
						margin-right: 12upx;
					}

					.details_age {
						border: 1upx solid #FE9053;
						border-radius: 6upx;
						height: 32upx;
						width: 68upx;
						color: #FE9053;
						font-size: 20upx;
						line-height: 32upx;
						text-align: center;
						box-sizing: border-box;
					}

				}

				.item_nickname {
					line-height: 36upx;
					font-size: 25upx;
					color: #666666;
				}
			}


		}

		// 宣传语
		.item_tagline {
			font-size: 22upx;
			width: 100%;
			color: #666666;
			letter-spacing: 0;
			line-height: 34upx;
			margin-top: 29upx;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}

	}

	// 评分
	.Particulars_grade {
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		view {
			flex: 1;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			font-size: 26upx;
			color: #666666;
			box-sizing: border-box
		}

		.item_grade {
			border-right: 0.5upx solid #EEEEEE;
		}

		.item_comment {
			border-left: 0.5upx solid #EEEEEE;
		}
	}

	// 空白元素
	.vacancy {
		background: #F9FAFF;
		height: 20upx;
		width: 100%;
	}

	// 收到的评论
	.comment {
		height: 190upx;
		border-bottom: 1upx solid #D8D8D8;
		padding: 30upx;
		box-sizing: border-box;

		.item-introduce {
			display: flex;
			height: 40upx;
			margin-top: 12upx;
			margin-bottom: 22upx;
			flex-direction: row;

			.item-commonalityIcon {
				background: #CE9D6D;
				width: 4upx;
				height: 28upx;
				margin-top: 4upx;
				margin-right: 14upx;
			}

			.item-introduce_title {
				line-height: 40upx;
				font-size: 28upx;
				color: #000000;
				font-weight: bold;
				letter-spacing: 0;
				text-align: left;
			}
		}

		.item_start {
			height: 50upx;
			line-height: 50upx;
			font-size: 26upx;
			color: #333333;

			.star_minute {
				font-size: 36upx;
				color: #333333;
				padding-left: 20upx;
			}

			.star_number {
				font-size: 24upx;
				color: #CFB49B;
				padding-left: 30upx;
			}
		}

	}

	// 评论列表(可以拆成组件)
	.commentParticularsData {
		width: 100%;
		max-height: 538upx;
		overflow-y: auto;

	}

	.commentParticulars {
		min-height: 213upx;
		border-bottom: 1upx solid #D8D8D8;
		padding: 30upx;
		box-sizing: border-box;

		.comment_item {
			height: 82upx;
			display: flex;

			.comment_item_photo {
				width: 82upx;
				height: 82upx;
				border-radius: 50%;
				overflow: hidden;

				.comment_photo {
					width: 82upx;
					height: 82upx;
				}
			}

			.comment_Data {
				flex: 1;
				padding-left: 30upx;
				box-sizing: border-box;

				.comment_name {
					font-size: 28upx;
					color: #333333;
					line-height: 40upx;
				}

				.comment_data {
					font-size: 24upx;
					color: #999999;
					line-height: 33upx;
					.dateDispose {
						margin-right:10upx;
					}
				}
			}

		}

		.comment_text {
			padding-top: 32upx;
			font-size: 24upx;
			color: #666666;
			line-height: 33upx
		}
	}

	// 评论、电话咨询
	.comment_consult {
		height: 98upx;
		width: 100%;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		justify-content: space-between;
		align-items: center;
		border-top: 1upx solid #D8D8D8;

		view {
			flex: 1;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			font-size: 26upx;
			color: #666666;
			box-sizing: border-box
		}

		.comment_grade {
			// border-right: 0.5upx solid #EEEEEE;
		}

		.consult_comment {
			border-left: 0.5upx solid #EEEEEE;
		}

	}

	// 咨询弹窗
	.uniPopup_phone {
		width: 100%;
		height: 200upx;
		background-color: pink;
	}

	.uni-popup-middle {
		width: 100%;
		height: 200upx;
		background-color: pink;
	}
</style>
