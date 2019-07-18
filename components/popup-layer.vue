<template>
	<view>
		<view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer">

		</view>
		<view ref="popRef" class="popup-content" @tap.stop="stopEvent" :style="_location">
			<!-- <slot></slot>style="position:relative;top:0; width: 100%; z-index:10000009999;height: 360upx;" -->
			<scroll-view scroll-y="true" class="popupbox" @click="i">
				<view class="ticketbox" v-show="idx==0?true:false">
					<view class="date_box  center">
						<view class="box" style="margin-right: .1rem;">
							使用日期
						</view>
						<view class="smalldate" v-for="(i,index) in monidate" :key="index" @tap="thisdate(index)" :style="org===index?'border-color: #EE7D31;'+'color: #EE7D31;':''">
							<text style="font-weight: bold;font-size: .3rem" class="text">{{i.name}}</text>
							<text class="text" style="font-size: .28rem;">{{i.date}}</text>
						</view>
						<view class="chosedate" @tap="chose()" :style="moreday?'border-color: #EE7D31;'+'color: #EE7D31;'+'line-height:.3rem;':(lh?'line-height:.3rem;':'line-height:.6rem;')">

							<view class="" v-show="moreday?0:1" style="display: flex; align-items: center;">
								<text style="font-weight: bold; font-size: .28rem;" class="text">更多日期</text>
								<image src="/static/assents/order/right-icon.png" mode="scaleToFill" style="margin:0 .08rem;" class="image"></image>
							</view>
							<view class="" v-show="moreday?1:0" style="display: flex; align-items: center;">
								<text style="font-weight: bold; font-size: .28rem;" class="text">更多日期</text>
								<image src="/static/assents/order/orgright.png" mode="scaleToFill" style="margin:0 .08rem;" class="image"></image>
							</view>

							<text class="text">{{choseday}}</text>
						</view>

					</view>

					<view class="quantity_box center">
						<view class="box">
							票型选择
						</view>
						<view class="list_boxs">
							<view class="ticket_type" v-for="(i,index) in ticketifo" :key="index" @tap="choseticket(index,i.id,i.productName,i.sellPrice.amount,i.cancelConditionArray,i.instruction,i.playerPerType
)"
							 :style="chosetickets&&(org2===index)?'border-color:#EE7D31':''">
								<text class="text1">[{{i.productName}}]门票</text>
								<image src="/static/assents/order/111.png" mode="aspectFit" class="icon"></image>
								<view class="small_box">
									<text class="lable" v-for="(item,index) in i.condition" :key="index">{{item}}</text>
								</view>
								<view class="price">
									总计:&nbsp;&nbsp;￥<text class="text">{{i.sellPrice.amount}}</text>
								</view>
								<view v-show="chosetickets&&(org2===index)?true:false" class="right">
									<image src="/static/assents/order/11.png" mode="scaleToFill" class="image"></image>

								</view>
							</view>

						</view>
						<view class="nub_box">
							<view class="box">
								选择数量
							</view>
							<view class="lz-form__item">
								<view class="lz-row lz-jc--end">
									<view style="width: 1.84rem; height:.48upx;">
										<lz-numinput @change="onChange" :value="1" btnTheme="2" :step="1" :min="1" :max="999">
										</lz-numinput>
									</view>
								</view>
							</view>

						</view>
						<view class="information_box ">
							<view class="box">
								游客信息
							</view>
							<view class="box1" v-show="!ischose&&rule">
								请添加 <text style="color: #333; padding: 0 .1rem;">{{ticketnub}}</text> 位
							</view>
							<view class="box1" v-show="!ischose&&(!rule)">
								请添加 <text style="color: #333; padding: 0 .1rem;">1</text> 位
							</view>
							<view class="flexbox" v-show="ischose">
								<view class="box2" v-for="(item,index) in arr" :key="index" @tap="cxxuanze(item.openCode,index)">
									<text class="text">{{item.name}}</text>
									<image src="/static/assents/order/22.png" class="image" mode="scaleToFill"></image>
								</view>
							</view>

							<view class="addmore" @tap="showchosecst">
								新增更换
								<image src="/static/assents/order/right-icon.png" mode="scaleToFill" class="image"></image>
							</view>
						</view>

						<view class="detail_box">

							<view class="box">
								费用明细
							</view>
							<view class="text" v-show="chosetickets?false:true">
								选择票型后生成
							</view>
							<view class="mid_box" v-show="chosetickets?true:false">
								<view class="top_box">
									<view class="box1">[{{tickettp}}]门票</view>
									<view class="box2">
										x{{ticketnub}}
									</view>
									<view class="box3">
										￥{{ticketprice}}
									</view>
								</view>
								<view class="bot_box">
									<view class="box">
										总计费用
									</view>
									<view class="box4">
										￥{{total}}
									</view>
								</view>
							</view>
						</view>

					</view>
					<view class="notice_box">
						<view class="box center" style="padding-top: .64rem;">
							购票须知
						</view>
						<view class="box1" style="margin: .42rem .3rem; padding-top: .64rem;">
							<text class="bord">使用说明:</text>
							<text class="bord-content">{{instruction}}</text>


						</view>
						<view class="box2" style="margin: .42rem .3rem;">
							<text class="bord">退票规则:</text>
							<view class="bord-content" v-for="(idx,index) in cancelConditionArray" :key="index">
								{{idx.value}}
							</view>
						</view>
					</view>
				</view>
				<view class="evaluatebox" v-show="idx==1?true:false">
					<view class="total_box">
						<text class="total">{{ commentList.length }}条评价</text>
						<view class="btn_box" @click="handleToComment()">
							<text class="text">写点评</text>
							<text class="iconfont right-icon">&#xe64e;</text>
						</view>
					</view>
					<view class="list_box">
						<view class="list" v-for="item in commentList" :key="item.id">
							<image :src="item.userImg" class="avatar"></image>
							<view class="content_box">
								<view class="name_time">
									<text class="name">{{ item.userName || '匿名用户' }}</text>
									<text class="time">{{ item.createTimeStr }}</text>
								</view>
								<view class="comment">
									{{ item.content }}
								</view>
							</view>
						</view>
						<view class="nothing-wrap" v-if="!commentList.length">暂无评论</view>
					</view>
				</view>
				<view class="carbox" v-show="idx==2?true:false">
					<view class="top_box">
						<image src="/static/assents/car1.png" class="car-icon"></image>
						<text class="text">呼我出行</text>
					</view>
					<view class="form_box">
						<!-- <input type="text" class="input startAddress" disabled v-model="startAddress" />
						<input type="text" class="input" disabled v-model="address" /> -->
						<view class="input startAddress">{{ startAddress }}</view>
						<view class="input">{{ address }}</view>
					</view>
					<view class="btn_box">
						<button class="button" @click="toHuEr">立即叫车</button>
					</view>
				</view>

			</scroll-view>
			<view class="pay_box" v-show="idx==0?true:false">
				<view class="price_box">
					<view class="box1" v-show="chosetickets?false:true">
						未选择票型
					</view>
					<view class="box2" v-show="chosetickets?true:false">
						总计&nbsp;￥<text class="text">{{total}}</text>
					</view>
				</view>
				<view class="pay" :style="chosetickets?'background-color:#EE7D31':'background-color:#6A6A6A;'+'color:#999'" @tap="a">
					立即支付
				</view>
			</view>
		</view>
		<view class="date" v-show="choseadate?1:0" style="position:fixed;bottom:0; width: 100%; z-index:1000000999999;height: 59.2%;">


			<view class="title_box" style="display: flex;">
				<view class="" style="margin-left: 25upx; margin-top: 25upx;" @tap="backbtn">
					<image src="/static/assents/back.png" mode="aspectFit" style="width: 36upx; height: 36upx;"></image>

				</view>
				<text style="margin-left: 190upx;">选择使用日期</text>

			</view>
			<reserve-date @changeDay='changeDay' @changeMonth='changeMonth' :disableBefore="true" />
		</view>
		<create-comment :tid="tid" :openId="openId" :top="44" :showAddComment="showAddComment" @handleShowCom="handleShowCom"></create-comment>
		<added :tid="tid" :openId="openId" :showchose="showchose" @shuaxin="shuaxin" :list="list" @handleShowChose="handleShowChose"
		 :arr="arr" @chosemsg="chosemsg" :neednub="neednub"></added>
	</view>
</template>

<script>
	import reserveDate from '@/components/reserve-date/reserve-date.vue';
	import lzNuminput from '@/components/lz-numinput/lz-numinput.vue';
	import added from './added.vue';
	import createComment from './createComment.vue'
	import {
		requestWB as uniRequest,
		requestZT as ztRequest
	} from 'uni-request';
	import moment from 'moment';
	import 'moment/locale/zh-cn'
	moment.locale('zh-cn');
	export default {
		components: {
			reserveDate,
			createComment,
			lzNuminput,
			added
		},
		name: 'popup-layer',
		model: {
			prop: "showPop",
			event: "change",
			btns: "btn",
		},
		props: {
			infoCode: {
				type: String
			},
			cancelConditionArray: {
				type: Array
			},
			showPop: {
				type: Boolean,
				default: false,
			},
			ticketifo: {
				type: Array,
				default () {
					return []
				}
			},
			date: {
				type: Array,
				default () {
					return []
				}
			},
			morendate: {
				type: String
			},
			direction: {
				type: String,
				default: 'bottom', // 方向  top，bottom，left，right 
			},
			autoClose: {
				type: Boolean,
				default: true,
			},
			btn: {
				type: Boolean,
				default: false,
			},
			idx: {
				type: Number,
				default: 0
			},
			commentList: {
				type: Array,
				default () {
					return []
				}
			},
			openId: {
				type: String,
				default: ''
			},
			tid: { //售卖产品id
				type: String,
				default: ''
			},
			longitude: {
				type: String,
				default: ''
			},
			latitude: {
				type: String,
				default: ''
			},
			address: {
				type: String,
				default: ''
			},
			instruction: {
				type: String,
				default: ''
			}

		},
		data() {
			return {
				// openId:'',
				// tid: '', //售卖产品id
				startAddress: '从当前位置出发',
				showAddComment: false,
				ifshow: false, // 是否展示,
				translateValue: -100, // 位移距离
				site: -100,
				timer: null,
				iftoggle: false,
				showchose: false, //选择新增游客信息
				// isticket: false,
				text1: '未选择票型',
				text2: '总计 ￥',
				choseadate: false,
				choseday: '',
				notice: {},
				org: 0,
				org2: 0,
				moreday: false,
				lh: false,
				chosetickets: false,
				tickettp: '',
				ticketnub: '',
				ticketprice: '',
				total: '',
				ticketdate: '',
				list: [],
				ischose: false,
				openCode: '',
				time: true,
				a: '',
				arr: [],
				neednub: 1,
				rule: 0


			};
		},
		computed: {
			monidate() {
				let monidates = [{
					name: '今天',
					date: ''
				}, {
					name: '明天',
					date: ''
				}, {
					name: '后天',
					date: ''
				}]
				monidates[0].date = this.date[0]
				monidates[1].date = this.date[1]
				monidates[2].date = this.date[2]
				return monidates
			},
			_translate() {
				const transformObj = {
					'top': `transform:translateY(${-this.translateValue}%)`,
					'bottom': `transform:translateY(${this.translateValue}%)`,
					'left': `transform:translateX(${-this.translateValue}%)`,
					'right': `transform:translateX(${this.translateValue}%)`
				};
				return transformObj[this.direction]
			},
			_location() {
				const positionValue = {
					'top': `bottom:${this.site}%;width:100%;`,
					'bottom': `top:${this.site}%;width:100%;`,
					'left': `right:0px;top:0;height:100%;`,
					'right': `left:0px;top:0;height:100%;`,
				};
				return positionValue[this.direction] + this._translate;
			}
		},
		mounted() {
			if (this.showPop) {
				this.show();
			}
			this.a = this.throttle()
		},
		watch: {
			showPop(value) {
				if (value) {
					this.show();
				} else {
					this.close();
				}
			}
		},
		methods: {
			throttle() {
				var timer = null
				var _this = this
				return function() {
					if (!timer) {
						_this.zhifu()
						timer = setTimeout(() => {
							timer = null

						}, 2000)

					}

				}
			},
			zhifu() {
				let externalId = '';
				let orderNo = '';
				let outerId = ''
				let _this = this
				let date = this.ticketdate
				console.log(this.neednub, this.arr.length, 909)
				if (!date) {
					date = this.morendate
				}
				try {
					const value = uni.getStorageSync('externalId')
					let ticket = this.chosetickets
					if (ticket && (this.neednub == this.arr.length)) {
						externalId = value;
						console.log(_this.infoCode)
						console.log(_this.openCode, 'code')
						// 下单 得到 outerId 支付宝交易号
						ztRequest.post('/api/public/alipay/trade', {
							productCode: _this.infoCode,
							amount: _this.total,
							comeDate: date,	
							count: _this.ticketnub,
							externalId: externalId,
							merchantCode: "b49c90557893a9f8ed229df13305804a",
							payment: "1",
							userCode: _this.openCode
						}).then(res => {

							if (res.data.code == '000000') {

								orderNo = res.data.content.orderNo;
								outerId = res.data.content.outerId

								// #ifdef MP-ALIPAY
								// 唤起支付
								my.tradePay({
									tradeNO: outerId,
									success: (re) => {
										uni.reLaunch({
											url: `/pages/orderCenter/orderDetail?orderNo=${orderNo}`
										})
									},
									fail: (re) => {
										uni.reLaunch({
											url: `/pages/orderCenter/orderDetail?orderNo=${orderNo}`
										})
									}
								});
								// #endif

							} else {
								uni.showToast({
									title: res.data.message
								})
							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						// 授权操作
						if (this.neednub != this.arr.length) {
							uni.showToast({
								title: '请添加与门票数量相匹配的游客信息'
							})
						}
						if (ticket == '') {
							uni.showToast({
								title: '请选择门票种类'
							})
						}

					}
				} catch (e) {
					//TODO handle the exception
					console.log(e)
				}
			},
			cxxuanze(code, index) {
				let newarr = []
				if (this.arr.length == 0) {
					this.ischose = false
				}

				for (let i = 0; i < this.arr.length; i++) {
					let a=999
					if (this.arr[i].openCode == code) {
						a=i
						this.arr.splice(i, 1)
					}
					if (this.arr.length > 0&&(a!=i)) {
						newarr.push(this.arr[i].openCode)
					}
				}
				this.openCode = newarr.toString()
				console.log(this.arr, 88)
			},
			chosemsg(name, openCode, idx, narr) {
				this.openCode = openCode
				this.arr = narr
				// console.log(is,'is')
				if (narr.length > 0) {
					this.ischose = true
				} else {
					this.ischose = false
				}
			},
			changeMonth(data) {
				// console.log(data,222)
			},
			backbtn() {
				this.choseadate = false;
			},
			changeDay(data) {
				let arr = []
				arr = data[0].date.split('-')
				let month = arr[1]
				if (month < 10) {
					month = '0' + month
				}
				let day = arr[2]
				if (day < 10) {
					day = '0' + day
				}
				let year = arr[0]
				this.choseday = month + '-' + day
				this.ticketdate = year + '-' + month + '-' + day
				// console.log(str,111)
				console.log(this.ticketdate)
			},
			thisdate(index) {
				this.org = index;
				this.moreday = false
				switch (index) {
					case 0:
						this.ticketdate = moment().format('YYYY-MM-DD')
						break;
					case 1:
						this.ticketdate = moment().add(1, 'd').format('YYYY-MM-DD')
						break;
					case 2:
						this.ticketdate = moment().add(2, 'd').format('YYYY-MM-DD')
						break;
					default:
						break;
				}
				// console.log(this.ticketdate)
			},
			chose() {
				this.choseadate = true;
				this.moreday = true
				this.org = 999
				this.lh = true
				// console.log(this.choseadate)
			},
			choseticket(index, id, type, price, cancelConditionArray, instruction, playerPerType) {
				if (index == this.org2) {
					this.chosetickets = !this.chosetickets


				} else {
					this.chosetickets = true
				}
				this.org2 = index
				this.tickettp = type
				this.ticketprice = price
				this.total = Number(this.ticketprice) * 100 * Number(this.ticketnub) / 100
				this.rule = playerPerType
			},
			onChange(res) { //步进器

				// console.log('返回数据', res.value);
				this.ticketnub = res.value
				if (this.rule) {
					this.neednub = this.ticketnub
				} else {
					this.neednub = 1
				}
				this.total = Number(this.ticketprice) * 100 * Number(this.ticketnub) / 100
			},
			stopMove(event) {
				return;
			},
			show(events) {
				this.ifshow = true;
				this.site = 0;
				let _open = setTimeout(() => {
					this.translateValue = 0;
					_open = null;
				}, 0)
				let _toggle = setTimeout(() => {
					this.iftoggle = true;
					_toggle = null;
				}, 0);
			},
			close() {
				if (this.timer !== null || !this.iftoggle) {
					return;
				}
				this.translateValue = -100;
				this.btns = false;
				this.choseadate = false;

				this.timer = setTimeout(() => {
					this.ifshow = false;
					this.timer = null;
					this.iftoggle = false;
					this.$emit('closeCallBack', this.btns);
					this.$emit('change', false)
				}, 0);
			},
			ableClose() {
				if (this.autoClose) {
					this.close();
				}
			},
			stopEvent(event) {},
			doSome() {},
			// 展示评论 页面
			handleToComment() {
				this.$emit('handleChangeCss', true);
				this.showAddComment = true;
			},
			//关闭 评论 请求评论列表
			handleShowCom(val) {
				this.showAddComment = val;

			},
			handleShowChose(show) {
				this.showchose = show
			},
			showchosecst() {
				this.showchose = true
				const value = uni.getStorageSync('openId')
				const aa = uni.getStorageSync('externalId')
				let _this = this;
				ztRequest.post('/api/public/order/getUserMange', {
						merchantCode: 'b49c90557893a9f8ed229df13305804a',
						openId: value
					})
					.then(function(res) {
						if (_this.rule) {
							_this.neednub = _this.ticketnub
						} else {
							_this.neednub = 1
						}
						let Things = res.data.content
						for (let i = 0; i < Things.length; i++) {
							Things[i].showbtn = false
							if (_this.arr.length > 0) {
								for (let a = 0; a < _this.arr.length; a++) {
									if (_this.arr[a].openCode == Things[i].openCode) {
										Things[i].showbtn = true
									}
								}
							}
						}
						_this.list = Things
						console.log(Things, _this.arr, 'jj')
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			shuaxin(val, arr) {
				if (val) {
					this.arr = arr
					this.showchosecst()

					// console.log()
				}
			},

			// 跳转 呼我打车
			toHuEr() {
				// 				uni.navigateToMiniProgram({
				// 					appId: '2018122862752160',
				// 					path: 'pages/index/index',
				// 					extraData: {
				// 
				// 						// 						'origin': '',
				// 						// 						'destination': this.longitude + ',' + this.latitude + this.address,
				// 						// 
				// 						'origin': this.longitude,
				// 						'destination': this.latitude,
				// 						'serviceType': 0
				// 					},
				// 					success(res) {
				// 						// 打开成功
				// 					}
				// 				})
				uni.navigateTo({
					url: '/pages/nothing/huerNothing'
				});

			}
		},
		onPageScroll() {
			// console.log(123456)

			this.$emit('handleChangeCss', false);
		}



	}
</script>

<style lang="less" scoped>
	@import './lz-numinput//lzui-css/index.css';

	.popup-layer {
		position: fixed;
		z-index: 999999;
		background: rgba(0, 0, 0, .3);
		height: 100%;
		width: 100%;
		top: 0;
		left: 0px;
		overflow: hidden;
	}

	.popup-content {
		position: fixed;
		z-index: 1000000;
		background: #FFFFFF;
		transition: transform .5s ease;
		overflow: hidden;
		height: 59.2%;
		color: #333;
		// border:1px solid red;
	}

	.center {
		margin: 0 30upx;
	}

	.ticketbox {
		position: relative;
	}

	.notice_box {
		background-color: #FBFBFB;
		padding-bottom: 160upx;

		.box1 {
			margin: 0 20upx;
		}

		.box2 {
			margin: 0 20upx;

		}

		.bord {
			font-weight: bold;
			margin-right: 10upx;
		}

		.bord-content {
			font-family: PingFangSC-Light;
			font-size: 28upx;
			color: #666666;
			line-height: 36upx;
		}
	}

	.date {
		.title_box {
			position: fixed;
			height: 90upx;
			font-size: 36upx;
			font-weight: bold;
			line-height: 90upx;
			text-align: center;
			z-index: 9999999999999999999999;
			background: #fff;
			color: #333;
			width: 100%;
			box-shadow: 0 4upx 15upx 0 rgba(0, 0, 0, 0.04);
			top: 34%;

		}
	}

	.date_box {
		height: 170upx;
		border-bottom: 2upx solid rgba(51, 51, 51, 0.10);
		;
		display: flex;
		align-items: center;


		.smalldate {
			height: 80upx;
			width: 100upx;
			border: 1upx solid #E6E7E9;
			border-radius: 5upx;
			margin: 0 10upx;
			padding-top: 8upx;
			color: #999;

			.text {
				display: block;
				width: 100%;
				text-align: center;
			}
		}

		.chosedate {
			width: 160upx;
			height: 80upx;
			border: 1upx solid #E6E7E9;
			padding-top: 10upx;
			border-radius: 5upx;
			margin: 0 0 0 30upx;
			display: inline-block;
			text-align: center;
			display: flex;
			align-items: center;
			line-height: 60upx;
			flex-direction: column;

			.text {
				display: block;
				width: 100%;
				text-align: center;
				padding-left: 8upx;
			}

			.image {
				height: 8px;
				width: 6px;

			}

		}
	}

	.box {
		font-size: 32upx;
		color: #333;
		height: 70upx;
		line-height: 70upx;
	}

	.information_box {
		display: flex;
		justify-content: space-between;
		padding-top: 60upx;
		border-top: 0.02rem solid rgba(51, 51, 51, 0.10);
		;
		margin-top: 40upx;
		align-items: baseline;

		.box1 {
			font-size: 24upx;
			color: #999;
			height: 33upx;
			line-height: 33upx;
			margin-left: -200upx;
			padding: 5upx 10upx 0;
		}

		.flexbox {
			display: flex;
			width: 380upx;
			flex-wrap: wrap;
		}

		.box2 {
			margin: 10upx 0 0 15upx;
			padding: 10upx 20upx;
			display: flex;
			justify-content: space-around;
			border: 2upx solid #EE7D31;
			border-radius: 8upx;
			color: #EE7D31;
			align-items: center;

			.text {}

			.image {
				width: 15upx;
				height: 15upx;
				margin-left: 10upx;
			}
		}

		.addmore {
			height: 52upx;
			border: 2upx solid #E6E7E9;

			border-radius: 8upx;
			padding: 0 10upx;
			line-height: 52upx;
			display: flex;
			font-size: 24upx;

			.image {
				margin-top: 17upx;
				height: 8px;
				width: 6px;
				margin-left: 10upx;
			}
		}
	}

	.quantity_box {
		margin-top: 56upx;

		.nub_box {
			display: flex;
			margin-top: 33upx;
			justify-content: baseline;
		}

		.detail_box {
			margin: 56upx 0;
			border-top: 0.02rem solid rgba(51, 51, 51, 0.10);
			;
			padding-top: 56upx;
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			position: relative;

			.text {
				color: #999;
				font-size: 24upx;
				position: absolute;
				left: 2rem;
				top: .8rem;
			}

			.mid_box {
				width: 500upx;
				margin-top: 85upx;

				.top_box {
					display: flex;
					height: 40upx;
					justify-content: space-between;
					margin-bottom: 20upx;
				}

				.box1 {
					font-size: 28upx;
					color: #666666;
				}

				.box2 {
					margin-left: 98upx;
					font-size: 24upx;
					color: #999999;
				}

				.box3 {
					font-size: 26upx;
					color: #333333;
					font-weight: bold;
					line-height: 30upx;
					margin-right: 5upx;
				}

				.box4 {
					font-size: 36upx;
					color: #333333;
					font-weight: bold;
					margin-top: 15upx;
					margin-right: 5upx;
				}

				.bot_box {
					display: flex;
					border-top: 0.02rem solid rgba(51, 51, 51, 0.10);
					;
					justify-content: space-between;
					padding-top: 24upx;

				}
			}
		}

		.list_boxs {
			height: 261upx;
			display: flex;

			.ticket_type {
				height: 260upx;
				width: 300upx;
				border: 3upx solid #EAEAEA;
				border-radius: 16upx;
				display: flex;
				flex-direction: column;
				position: relative;
				margin-right: 16upx;

				.text1 {
					height: 33upx;
					font-size: 24upx;
					margin: 28upx 0 0 20upx;
					font-weight: bold;
				}

				.icon {
					width: 35upx;
					height: 35upx;
					margin: 35upx 0 0 24upx;
				}

				.small_box {
					margin: 6upx 0 0 25upx;

					.lable {
						font-size: 24upx;
						display: inline-block;
						background-color: #F7F7F7;
						height: 33upx;
						line-height: 33upx;
						margin: 0 8upx;
					}
				}

				.price {
					margin: 20upx 0 28upx 100upx;
					color: #666;
					font-size: 20upx;

					.text {
						font-size: 30upx;
						color: #333333;
						line-height: 35upx;
						font-weight: bold;
					}
				}

				.right {
					width: 50upx;
					height: 45upx;
					position: absolute;
					right: 0upx;
					bottom: 0upx;

					.image {
						width: 50upx;
						height: 45upx;
					}
				}
			}
		}
	}

	.popupbox {
		height: 100%;
	}

	.pay_box {
		background-color: #333;
		width: 100%;
		height: 12.5%;
		position: fixed;
		bottom: 0;
		z-index: 100000099;
		display: flex;
		margin-top: 16upx;
		justify-content: space-between;

		.pay {
			width: 220upx;
			height: 80upx;
			font-size: 36upx;
			color: #FFFFFF;
			margin: 8upx 10upx 0 0;
			text-align: center;
			line-height: 80upx;
			font-weight: bold;
		}

		.price_box {
			margin-top: 28upx;
			margin-left: 32upx;

			.box1 {
				height: 50upx;
				font-size: 36upx;
				color: #999999;
				font-weight: bold;
			}

			.box2 {
				font-size: 36upx;
				height: 50upx;

				color: #FFFFFF;
				line-height: 47upx;
				font-weight: bold;

				.text {
					font-size: 40upx;
				}
			}
		}

		.content_box {
			position: relative;
			z-index: 100000099;
			height: 100%;
			opacity: 1;
			color: #fff;

		}
	}

	.evaluatebox {
		padding: 30upx;

		.total_box {
			padding: 68upx 0 60upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid rgba(51, 51, 51, 0.10);

			.total {
				font-family: PingFangSC-Light;
				font-size: 32upx;
				color: #333333;
				letter-spacing: 0;
			}

			.btn_box {
				border: 2upx solid #E6E7E9;
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 15upx 20upx 15upx 16upx;

				.text {
					font-family: PingFangSC-Regular;
					font-size: 24upx;
					color: #333333;
					letter-spacing: 0;
					margin-right: 10upx;
				}

				.right-icon {
					// width: 24rpx;
					// height: 36rpx;
					font-size: 20upx;
					font-weight: 900;
					// font-family: PingFangSC-Medium;
				}
			}
		}

		.org {
			border-color: #EE7D31;
			color: #EE7D31;
		}

		.list_box {
			.list {
				padding: 40upx 0;
				display: flex;
				border-bottom: 1px solid rgba(51, 51, 51, 0.10);

				.avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin-right: 16upx;
				}

				.content_box {
					flex: 1;

					.name_time {
						display: flex;
						justify-content: space-between;
						margin: 22upx 0;

						.name {
							font-family: PingFangSC-Light;
							font-size: 32upx;
							color: #333333;
							letter-spacing: 0;
							line-height: 45upx;
						}

						.time {
							font-family: PingFangSC-Light;
							font-size: 28upx;
							color: #333333;
							letter-spacing: 0;
							line-height: 40upx;
						}
					}

					.comment {
						font-family: PingFangSC-Light;
						font-size: 24upx;
						color: #666666;
						letter-spacing: 0;
						line-height: 33upx;
					}
				}
			}
		}
	}

	.carbox {
		padding: 30upx;

		.top_box {
			padding: 68upx 0 60upx 0;
			display: flex;
			border-bottom: 1upx solid rgba(51, 51, 51, 0.10);

			.car-icon {
				width: 40upx;
				height: 40upx;
				margin-right: 16upx;
			}

			.text {
				font-family: PingFangSC-Light;
				font-size: 32upx;
				color: #333333;
			}

		}

		.form_box {
			margin-bottom: 40upx;
			background-image: url('/static/assents/car-input-bg.png');
			background-repeat: no-repeat;
			background-size: 14upx 115upx;
			background-position: 10upx 45upx;
			padding-left: 50upx;

			.input {
				width: 90%;
				padding: 34upx 10upx;
				font-family: PingFangSC-Regular;
				font-size: 30upx;
				color: #333333 !important;

				&.startAddress {
					border-bottom: 1upx solid rgba(51, 51, 51, 0.10);
				}
			}

			// .input:disabled {
			// 	-webkit-text-fill-color: #333333;
			// 	color: #333333;
			// 	opacity: 1;
			// }

		}

		.btn_box {
			.button {
				background-color: #3367FF;
				border-radius: 16upx;
				font-family: PingFangSC-Medium;
				font-size: 36upx;
				color: #FFF !important;
			}
		}
	}
</style>
