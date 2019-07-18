<template>
  <scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
	  <view class="icon_box">
	  	<image src="../../static/assents/car_icon.png" mode="aspectFit" class="icon "></image>
		<view class="text_box">呼我出行</view>
	  </view>
    <div v-if="!textFlex" >
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
							<input type="text" value="你在哪个机场" placeholder="请选择机场"/>
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
	 
    </div>

  </scroll-view>
</template>
<script>
export default {
    name: 'wuc-tab',
    data() {
        return {
			btn:0,
			btn2:0,
			whereyouare:"钱江·西溪新座",
			tabList2: [{ name: '接机' }, { name: '送机' }],
			TabCur2:0,
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
        selectClass: {
            type: String,
            default() {
                return 'text-black';
            }
        },
    },
    methods: {
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
		}
    },
    computed: {
        scrollLeft() {
            return (this.tabCur - 1) * 60;
        }
    }
};
</script>
<style lang="less" scoped>
div,
scroll-view,
swiper {
	box-sizing: border-box;
}
.wuc-tab-item2.cus {
    border-bottom: 2upx solid #333333;
}
.wuc-tab-item2{
	display:inline-block;
	line-height: 60upx;
	font-size: 24upx;
	color: #999999;
	margin-left: 160upx;
	 width: 80upx;
	 text-align: center;
}
.wuc-tab {
    white-space: nowrap;
	display: flex;
	justify-content:space-between;
	padding:30upx;
	position: relative;
	.icon_box{
		height: 40upx;
		display: flex;
		margin-right: 160upx;
		.icon{
			width: 40upx;
			height:40upx;
			margin-top: 10upx;
			margin-right: 15upx;
		}
		.text_box{
			line-height: 60upx;
			font-size: 32upx;
			font-weight: 600;
		}
	}
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
.firstcar_box{
	margin-left: -370upx;
	.form_box{
		width: 390upx;
		image{
			width: 33upx;
			height: 33upx;
			 margin-bottom: -5upx;
		}
		input{
			font-size: 24upx;
		}
	}
	.from_box{
		border-bottom: #F1F1F1 solid 1upx;
	}
	.go_box{
		
	}
}
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
