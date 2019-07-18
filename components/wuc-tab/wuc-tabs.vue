<template>
	<view class="content">
		<view class="content_s">
			<view class="wuc_tab" :class="MisH?'wuc_tab_h':''">
				<view class="icon_box">
				  	<image src="../../static/assents/car1.png" mode="aspectFit" class="icon"></image>
					<view class="text_box" @tap="gowhere">呼我出行</view>
					<view class="right_call" v-show="!MisH">
						<view class="call_me" :class="false?'':'call_one'">
							<text class="call" v-if="false">叫车</text>
							<text class="call" v-if="false">接送机</text>
						</view>
					</view>
					<view class="ticket_list" v-show="MisH">
						<scroll-view scroll-x="true" class="ticket_lists" v-show="MisH" >
							<view class="ticket_im">
								<image @click="nothing" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon1.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="navticket" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon2.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="navhotel" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon3.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="navfood" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon4.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="navshop" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon5.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="navtour" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon6.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="tofeizhu" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon7.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="tofeizhu" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon8.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="nothing" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon9.png" mode="aspectFit"></image>
							</view>
							<view class="ticket_im">
								<image @click="nothing" class="ticket_img" :class="MisH?'ticket_list_show':''" src="../../static/assents/icon10.png" mode="aspectFit"></image>
							</view>
							
						</scroll-view>
					</view>
				</view>
				<view class="address">
					<view class="form_box">
						<view class="go_box">
							<image class="bo_boximg" src="../../static/assents/cril_bule.png" mode="aspectFit"></image>
							<view class="bo_input" @tap="clickwhere">
								<input class="bo_input" disabled type="text" :value="whereyouare" placeholder="你在哪儿"/>
								<!-- {{whereyouare}} -->
							</view>
						</view>
						<view class="go_box">
							<image class="bo_boximg" src="../../static/assents/cril_org.png" mode="aspectFit"></image>
							<view class="bo_input" @tap="clickgo">
								<input class="bo_input"  disabled type="text" :value="whereyougo" placeholder="你要去哪儿"/>
								<!-- {{whereyougo}} -->
							</view>
						</view>
					</view>
					<view class="call_new_b">
						<view class="call_new" @tap="nothings">
							立即叫车
						</view>
					</view>
				</view>
			  <!-- <div v-if="!textFlex" >
			    <div class="wuc-tab-item" :class="[index === tabCur ? selectClass + ' cur':'']" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index,$event)">
			      <text :class="item.icon"></text>
			      <span>{{item.name}}</span>
			    </div>
				  <view class="callcar_box">
				  	 <view class="firstcar_box" v-show="!btn">
				  	<view class="form_box">
				  		<view class="from_box">
				  			<image src="../../static/assents/cril_bule.png" mode="aspectFit"></image>
							<input type="text" :value="whereyouare" placeholder="你在哪儿"/>
							</view>
						<view class="go_box">
							<image src="../../static/assents/cril_org.png" mode="aspectFit"></image>
							<input type="text" placeholder="你要去哪儿"/>
						</view>
				  	</view>
				  </view>
				  <view v-show="btn" class="secone_box">
				    <div class="text-center" >
				      <div class="wuc-tab-item2 " :class="index === tabCur2 ? 'text-blue':''" v-for="(i,index) in tabList2" :key="index" :id="index" @tap="tabSelect2(index,$event)">
				        <view class="mid_box">{{i.name}}</view>
				      </div>
				    </div>
						 <view class="firstcar_box secondcar_box" v-show="!btn2">
							<view class="form_box">
								<view class="from_box">
									<image src="../../static/assents/cril_bule.png" mode="aspectFit"></image>
										<input type="text" :value="你在哪个机场" placeholder="请选择机场"/>
										</view>
									<view class="go_box">
										<image src="../../static/assents/cril_org.png" mode="aspectFit"></image>
										<input type="text" placeholder="你要去哪儿"/>
									</view>
							</view>
						</view>
						 <view class="firstcar_box thirdcar_box" v-show="btn2">
							<view class="form_box">
								<view class="from_box">
									<image src="../../static/assents/cril_bule.png" mode="aspectFit"></image>
										<input type="text" :value="whereyouare" placeholder="你在哪儿"/>
										</view>
									<view class="go_box">
										<image src="../../static/assents/cril_org.png" mode="aspectFit"></image>
										<input type="text" placeholder="请选择机场"/>
									</view>
							</view>
						</view>
				  </view>
				  <image src="../../static/assents/car_bg.png" mode="aspectFit" class="bg_png"></image>
				  <button type="primary" class="callcar_btn">立即叫车</button>
				  </view>
				 
			  </div> -->
			
			</view>
		</view>
	</view>
  
</template>
<script>
export default {
    name: 'wuc-tab',
    data() {
        return {
			btn:0,
			btn2:0,
			//whereyouare:"钱江·西溪新座",
			//whereyougo: '',
			tabList2: [{ name: '接机' }, { name: '送机' }],
			TabCur2:0,
			
			//中间变量
			// isHeiMo : this.isHei,
		};
    },
    props: {
        tabList: {
            type: Array,
            default() {
                return [];
            }
        },
        tabCur: {
            type: Number,
            default() {
                return 0;
            }
        },
		whereyouare: {
		    type: String,
		    default() {
		        return '';
		    }
		},
		whereyougo: {
		    type: String,
		    default() {
		        return '';
		    }
		},
        tabClass: {
            type: String,
            default() {
                return '';
            }
        },
        tabStyle: {
            type: String,
            default() {
                return '';
            }
        },
        textFlex: {
            type: Boolean,
            default() {
                return false;
            }
        },
		//是否固定,是否显示icon
		//是否点击呼我 
		//是否达到最高点，显示用‘isHei’
		isHei: {
		    type: Boolean,
		    default() {
		        return false;
		    }
		},
        selectClass: {
            type: String,
            default() {
                return 'text-black';
            }
        },
		
    },
    methods: {
		nothing() {
			uni.navigateTo({
				url: '../nothing/nothing'
			});
		},
		nothings() {
			uni.navigateTo({
				url: '/pages/nothing/huerNothing'
			});
		},
		navtour() {
			uni.navigateTo({
				url: '/pages/tourGuide/tourGuide'
			});
		},
		tofeizhu() {
			uni.navigateToMiniProgram({
				appId: '2018081461095002',
				extraData: {},
				success(res) {
					// 打开成功
				}
			})
		},
		//点击呼我 ，界面跳转 传值
		gowhere(){
			
			this.$emit('gowhere',!this.isHei);
			
		},
		// 输入点击
		clickwhere(){
			
		},
		clickgo(){
			this.$emit('getListShow', 1);
		},
        tabSelect(index, e) {
            if (this.currentTab === index) return false;
            this.$emit('update:tabCur', index);
            this.$emit('change', index);
			this.btn=index
			console.log(this.currentTab)
        },
		tabSelect2(index, e) {
		    if (this.currentTab === index) return false;
			// if (this.currentTab === 0) return false;
		    this.tabCur2=index ;
		    // this.$emit('change', index);
			this.btn2=index
			// console.log(index)
		},
		nothing(){
			uni.navigateTo({
				url: '../nothing/nothing'
			});
		},
		navticket() {
			uni.navigateTo({
				url: '/pages/ticket/ticketList'
			});
		},
		navhotel() {
			uni.navigateTo({
				url: '/pages/hotel/hotelList'
			});
		},
		navfood() {
			uni.navigateTo({
				url: '../specialFood/specialFoodList'
			});
		},
		navshop() {
			uni.navigateTo({
				url: '../shop/shopList'
			});
		},
    },
    computed: {
        scrollLeft() {
            return (this.tabCur - 1) * 60;
        },
		MisH(){
			console.log(this.isHeiMo||this.isHei);
			return this.isHeiMo||this.isHei;
		},
    }
};
</script>
<style lang="less" scoped>
	.content{
		width: 750upx;
		display: flex;
		padding: 10upx 0;
		background-color: rgba(0, 0, 0, 0);
		.content_s{
			width: 690upx;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 16upx;
		}
	}
div,
scroll-view,
swiper {
	box-sizing: border-box;
}

.wuc_tab {
	box-shadow: rgba(0, 0, 0, 0.12) 0 7upx 28upx;
	border-radius: 16upx;
	overflow: hidden;
	padding: 20upx 0;
	height: 230upx;
	.icon_box{
		height: 40upx;
		padding: 0 24upx;
		width: 648upx;
		position: relative;
		height: 60upx;
		.icon{
			width: 40upx;
			height:40upx;
			float: left;
			margin-top: 10upx;
			display: inline-block;
		}
		.text_box{
			display: inline-block;
			height: 60upx;
			line-height: 60upx;
			font-size: 32upx;
			font-weight: 600;
			font-family: PingFangSC-Medium;
			font-size: 32upx;
			color: #333333;
			letter-spacing: 1upx;
			margin-left: 14upx;
		}
		.right_call{
			display: inline-block;
			float: right;
			.call_me{
				height: 60upx;
				width: 250upx;
				display: flex;
				justify-content: space-around;
				.call{
					display: inline-block;
					height: 60upx;
					line-height: 60upx;
					opacity: 0.24;
					border: 1px solid rgba(151,151,151,.7);
					border-radius: 30upx;
					font-family: PingFangSC-Medium;
					font-size: 24upx;
					color: #333333;
					letter-spacing: 1upx;
					text-align: center;
					padding: 0 20upx;
				}
			}
			.call_one{
				display: inline-block;
				text-align: right;
			}
		}
		
			
		.ticket_list{
			position: absolute;
			right: 0; top: 0;
			width: 400upx;
			height: 60upx;
			margin-right: 20upx;
			overflow-x: scroll;
			.ticket_lists{
				width: 400upx;
				height: 60upx;
				display: flex;
				white-space: nowrap;
			}
			.ticket_im{
				width: 52upx;
				height: 52upx;
				display: inline-block;
				margin-left: 30upx;
			}
			.ticket_img{
				width: 52upx;
				height: 52upx;
				display: inline-block;
			}
			.ticket_list_show{
				width: 52upx;
				height: 52upx;
				transition:width .2s linear,height .2s linear;
				-webkit-transition:width .2s linear,height .2s linear; /* Safari */
			}
		}
		
	}
	.address{
		display: flex;
		justify-content: space-around;
		margin-top: 30upx;
		.form_box{
			width: 390upx;
			.go_box{
				margin-top: 10upx;
				position: relative;
				.bo_boximg{
					width: 33upx;
					height: 33upx;
					position: absolute;
					top: 9upx;left: 0;
					display: inline-block;
				}
				.bo_input{
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					color: black;
					display: inline-block;
					height: 50upx;
					width: 360upx;
					line-height: 50upx;
					margin-left: 18upx;
					text-overflow : ellipsis;
					white-space : nowrap;
					overflow : hidden;
					padding: 0;
					padding-left: 8upx;
				}
			}
			
		}
		.call_new_b{
			width: 200upx;
			position: relative;
			.call_new{
				font-family: PingFangSC-Medium;
				font-size: 30upx;
				padding: 0 20upx;
				height: 70upx;
				line-height: 70upx;
				background: #3366FF;
				border-radius: 12upx;
				color: #ffffff;
				text-align: center;
				position: absolute;
				right: 0;bottom: 8upx;
			}
		}
	}
	transition:height .2s linear;
	-webkit-transition:height .2s linear; /* Safari */
}
.wuc_tab_h{
	height: 60upx;
	transition:height .2s linear;
	-webkit-transition:height .2s linear; /* Safari */
}
// .secone_box{
// 	width: 690upx;
// }
.wuc-tab-item {
    height: 60upx;
    display: inline-block;
    line-height: 60upx;
    margin: 0 10upx 50upx 10upx;
    padding: 0 20upx;
	color: #999999;
	font-size: 24upx;

}
.callcar_box{
	display: flex;
}
/* .wuc-tab-item.cur {
    border-bottom: 4upx solid;
} */

.callcar_btn{
	background-color: #3366FF;
	border-radius: 17upx;
	width: 160upx;
	height: 70upx;
	font-size: 30upx;
	line-height: 70upx;
	font-weight: 600;
	position: absolute;
	bottom: 20upx;
	right: 32upx;
	z-index: 10;
}
.wuc-tab.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

.flex {
    display: flex;
}
.text-center {
	margin-left: -375upx;
	margin-bottom: 35upx;

}
.flex-sub {
    flex: 1;
}
.text-black{
  color:#333333;
  border: 1upx solid #F1F1F1;
  border-radius: 50upx;
}
.text-blue{
   color:#333333;
   border-bottom: 4upx solid #333333;
}
.text-white{
  color:#ffffff;
}
.bg-white{
    background-color: #ffffff;
}
.bg-blue{
    background-color: #0081ff;
}
.text-orange{
  color: #f37b1d
}

.text-xl {
	font-size: 36upx;
}
.bg_png{
	width: 80upx;
	height: 130upx;
	position: absolute;
	bottom: 52upx;
	right: 0;
	z-index: 9
}
</style>
