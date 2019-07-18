<template>
	<view class="bigestbox">
		<view class="topbanner_box">
			<image class="banner" src="../../static/assents/topbanner1.png"></image>
			<!-- <view class="title_box">
				天地之中·中岳嵩山
			</view> -->
		</view>
		<view class="bbox" v-show="bannerShow">
			<swiper class="swiper" autoplay="true" indicator-dots="true" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" skip-hidden-item-layout="true" interval="3000" duration="300" circular="true">
				<swiper-item class="top_swiper" v-for="(item,index) in banner" :key="index">
					<image class="top_s_img" :src="item.img" @click="tobanner(item.url,item.type)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 高度到达后显示 @tap="goAddress"  -->
		<view class="car_box_s" v-show="packup">
			<view class="car_box car_box_fs" >
				<wuc-tab :tab-list="tabList" @gowhere="gowhere" :isHei='packups' :whereyouare="whereyouare" :whereyougo="whereyougo" @getListShow="getListShows" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
			</view>
		</view>
		<!-- 地址列表 -->
		<view class="getAddresslist" v-show="showlist">
			<view class="address_box">
				<view class="address_top">
					<view class="address_topl" @tap="closeShowMiddle">
						<image class="address_topli" src="../../static/assents/left.png" mode="aspectFit"></image>
						<text class="address_toplt">返回</text>
					</view>
					<view class="address_title">
						目的地选择
					</view>
				</view>
				<scroll-view class="address_cont" scroll-y="true" >
					<view class="address_li" v-for="(item,index) in addressList" :key="index">
						<image class="address_img" src="../../static/assents/time.png" mode="aspectFit"></image>
						<view class="address_c" @tap="clickAddress" :data-t="item.address">
							<text class="addressT">{{item.name}}</text>
							<text class="addressD">{{item.address}}</text>	
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- <view class="botbanner">
			<image src="../../static/assents/boybanner.png"></image>
			<text class="introduce_box" style="position: absolute;top: 20upx;left: 50upx;">宋代四大书院之一·儒家文化标本</text>
		</view> -->

		<view class="rel_box">
			
			<!-- 嵩山资讯 -->
			<!-- :style="packup?'padding:1rem 0 0 0;'+'margin-top:.8rem;'+'transition:1.5s padding':(moreicon?'padding:4.3rem 0 0 0;':'padding:3rem 0 0  0;'+'transition:1.5s padding')" -->
			<scroll-view class="big_box" scroll-y="true" @scroll="scroll" >
				
				<view class="car_box_s" v-show="!packup">
					<!-- :class="packup?'car_box_f':''" -->
					<view class="car_box" v-show="1">   
						<wuc-tab :tab-list="tabList" :whereyouare="whereyouare" :whereyougo="whereyougo" @getListShow="getListShows" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
					</view>
				</view>
				<!-- //:style="packup?'position:fixed;'+'top:2.6rem':''" -->
				<view class="banner_box" :style="packup?'margin-top:3rem;':''">
					<view class="mainfunction_box">
						
						<!-- !packup  呼我出行打车模块 -->
						<view class="icon_box">
							<!-- <view class="car_btn" v-show="packup" @touchend="showcar">  
								<image src="../../static/assents/car_icon.png" mode="aspectFit"></image>
								 <span>呼我出行</span>
							</view> -->
							<view class="scroll_box">
								<!-- :style="moreicon&&!packup?'flex-wrap:wrap;':(packup?'width:6.9rem;'+'margin-bottom:-0.2rem;':'')" -->
								<view class="abox" :class="moreicon?'abox_flex':''">
									<!-- :style="moreicon&&!packup?'margin:.2rem  .16rem .1rem 0':''" -->
									<view class="box" :class="moreicon?'box_er':''" @click="nothing">
										<image src="../../static/assents/icon1.png" mode="aspectFit"></image>
										<p>游玩</p>
									</view>
									<view class="box" :class="moreicon?'box_er':''" @click="navticket">
										<image src="../../static/assents/icon2.png" mode="aspectFit"></image>
										<p>门票</p>
									</view>
									<view class="box" :class="moreicon?'box_er':''" @click="navhotel">
										<image src="../../static/assents/icon3.png" mode="aspectFit"></image>
										<p>酒店</p>
									</view>
									<view class="box" :class="moreicon?'box_er':''" @click="navfood">
										<image src="../../static/assents/icon4.png" mode="aspectFit"></image>
										<p>餐饮</p>
									</view>
									<view class="box" :class="moreicon?'box_er box_go':''" @click="navshop" >
										<image src="../../static/assents/icon5.png" mode="aspectFit"></image>
										<p>购物</p>
									</view>
									<view class="box" :class="moreicon?'box_er box_first':''" @click="navtour" >
										<image src="../../static/assents/icon6.png" mode="aspectFit"></image>
										<p>导服</p>
									</view>
									<view class="box" :class="moreicon?'box_er':''" @click="tofeizhu">
										<image src="../../static/assents/icon7.png" mode="aspectFit"></image>
										<p>火车票</p>
									</view>
									<view class="box" :class="moreicon?'box_er':''" @click="tofeizhu">
										<image src="../../static/assents/icon8.png" mode="aspectFit"></image>
										<p>飞机票</p>
									</view>
									<view class="box" :class="moreicon?'box_er':''" @click="nothing">
										<image src="../../static/assents/icon9.png" mode="aspectFit"></image>
										<p>停车费</p>
									</view>
									<view class="box" :class="moreicon?'box_er box_go':''" @click="nothing">
										<image src="../../static/assents/icon10.png" mode="aspectFit"></image>
										<p>咨询投诉</p>
									</view>
								</view>
				
							</view>
							
							<view class="content">
								<!-- :style="packup?'height:0;'+'padding:0;'+'transition: .8s height,.8s padding;':'height:100%;'+'padding:.2rem 0 0 0 ;'+'transition: .8s height,.8s padding'" -->
								<view class="moreicon" @click="moreiconbtn" >
									<view class="text_box">更多的旅行娱乐服务，期待你的发现！</view>
									<view class="more_box">
										<text class="get_more">更多</text>
										<image src="../../static/assents/iconbtn.png" mode="aspectFit" :style="moreicon?'transform: rotate(180deg)':'transform: rotate(0deg)'"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="news_box">
					<image src="../../static/assents/zixun.png" mode="aspectFit" @click="toconsult()"></image>
					<swiper class="swiper" autoplay="true" interval="2000" duration="600" circular="true" vertical="true">
						<swiper-item v-for="(i,index) in news" :key="index">
							<view @click="tonews(i.id)"> <text class="biaoti">{{i.articlecategorytitle}}</text><text class="biaoti_c">{{i.title}}</text></view> 
						</swiper-item>
					</swiper>
				</view>
				
				<!-- 嵩山景区 -->
				<view class="contentbox">
					<view class="titlebox">
						<view class="org_box"></view>
						<text class="chinese">嵩山景区</text>
						<text class="english">Mountain Scenic Area</text>
						<view class="dextro_box" @click="tosenics">
							<image src="../../static/assents/rightbtn.png" mode="aspectFit"></image>
						</view>
						<image src="../../static/assents/title.png" mode="aspectFit" class="slash"></image>
					</view>
					<view class="wrap">
						<scroll-view class="scenicarea_box" scroll-x="true">
								<view class="pic_box" v-for="(i,index) in scenicarea" :key="index" @click="tosenic(index,i.id)">
									<image :src="i.img" mode="scaleToFill"></image>
									<view class="pic_b">
										<text class="title">{{i.title}}</text>
										<text class="intro">{{i.introduction}}</text>
									</view>
								</view>
						</scroll-view>
					</view>
					<view class="titlebox">
						<view class="org_box"></view>
						<text class="chinese">全景地图</text>
						<text class="english">Virtual Tour</text>
						<image src="../../static/assents/title.png" mode="aspectFit" class="slash"></image>
					</view>
				</view>
				<view class="vrbox center" @click="tovar">
					<image src="../../static/assents/vr.jpg" mode="aspectFit"></image>
				</view>
				
				<!-- 嵩山文化 -->
				<view class="titlebox">
					<view class="org_box"></view>
					<text class="chinese">嵩山文化</text>
					<text class="english">Culture Songshan</text>
					<image src="../../static/assents/title.png" mode="aspectFit" class="slash"></image>
				</view>
				<view class="" style="display: flex;">
					<view class="culturebox center">
						<view class="picbox_s" v-for="(i,index) in culture" :key="index" @click="toculture(index,i.id)">
							<view class="picbox">
								<image :src="i.img" mode="scaleToFill"></image>
								<!-- <view class="back_g back_color"></view> -->
								<view class="minbox">
									<text class="title">{{i.title}}</text>
									<view class="line_h">
										<view class="bg"></view>
									</view>
									<text class="intro">{{i.introduction}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 景区门票 -->
				<view class="titlebox">
					<view class="org_box"></view>
					<text class="chinese">景区门票</text>
					<text class="english">Scenic Tickets</text>
					<view class="dextro_box" @click="toticket">
						<image src="../../static/assents/rightbtn.png" mode="aspectFit"></image>
					</view>
					<image src="../../static/assents/title.png" mode="aspectFit" class="slash"></image>
				</view>
				<view class="ticketsboxs">
					<!-- :autoplay="isautoplay"  interval="3000" duration="1000" -->
					<scroll-view class="ticketsbox" scroll-x="true">
						<!-- <view class="pic_box_s" v-for="(i,index) in tickets" :key="index"> -->
							<view class="pic_box" @tap="handleToDetail(i.id)" v-for="(i,index) in tickets" :key="index">
								<image :src="i.iconUrl" mode="scaleToFill"></image>
								<!-- <text class="intro">{{i.label}}</text> -->
								<view class="details">
									<text class="title">{{i.productName}}</text>
									<text class="price"> <text class="rmb">￥</text> {{i.sellPrice.amount}}</text>
								</view>
							</view>
						<!-- </view> -->
					</scroll-view>
				</view>
				
				
				<view class="titlebox">
					<view class="org_box"></view>
					<text class="chinese">景区行程</text>
					<text class="english">Songshan Itinerary</text>
					<view class="dextro_box" @click="tojourney">
						<image src="../../static/assents/rightbtn.png" mode="aspectFit"></image>
					</view>
					<image src="../../static/assents/title.png" mode="aspectFit" class="slash"></image>
				</view>
				<view class="wrap">
					<scroll-view class="routebox" scroll-x="true">
						<view class="item-wrap" v-for="(i,index) in route" :key="index" @click="tojourneys(i.id)">
							<view class="pic_box">
								<image :src="i.topimg" mode="scaleToFill"></image>
								<view class="details">
									<text class="title">{{i.title}}</text>
									<text class="intro">{{i.introduction}}</text>
									<text class="browse">浏览{{i.viewcount}}次</text>
								</view>

							</view>

						</view>
						
					</scroll-view>

				</view>
				
				<!-- 景区攻略 -->
				<view class="titlebox">
					<view class="org_box"></view>
					<text class="chinese">嵩山攻略</text>
					<text class="english">Strategy</text>
					<view class="dextro_box" @click="tostrategy">
						<image src="../../static/assents/rightbtn.png" mode="aspectFit"></image>
					</view>
					<image src="../../static/assents/title.png" mode="aspectFit" class="slash"></image>
				</view>
				<view class="strategybox center">
					<view class="picbox" v-for="(i,index) in strategy" :key="index" @click="tostrategys(i.id)">
						<image :src="i.topimg" mode="scaleToFill"></image>
						<image v-if="index == 0" src="../../static/assents/jingxuan.png" mode="aspectFit" class="jingxuan"></image>
						<view class="look_box" v-if="index == 0">
							<!-- <view class="liulan"></view> -->
							<view class="look_eye">
								<view class="look_eye_b">
									<image src="../../static/assents/eye.png" mode="aspectFit"></image>
									<text>浏览{{i.viewcount}}次</text>
								</view>
							</view>
						</view>
						<view class="box">
							<text class="intro">{{i.introduction}}</text>
						</view>
					</view>
				</view>
				
				<!-- 当地导游 -->
				<view class="titlebox">
					<view class="org_box"></view>
					<text class="chinese">当地导游</text>
					<text class="english">Local Tour Guide</text>
					<view class="dextro_box" @click="navtour">
						<image src="../../static/assents/rightbtn.png" mode="aspectFit"></image>
					</view>
					<image src="../../static/assents/title.png" mode="aspectFit" class="slash"></image>
				</view>
				<view class="wrap">
					<scroll-view class="tourbox" scroll-x="true">
						<view class="pic_box" v-for="(i,index) in tour" :key="index" @click="navtours(i.id)">
							<view class="bg"></view>
							<view class="details">
								<text class="name">{{i.name}}</text>
								<view class="tip">
									<text class="title">{{i.level}}</text>
									<text class="title">{{i.newAge}}</text>
								</view>
								<text class="intro">{{i.comments}}</text>
							</view>
							<image :src="i.img" mode="scaleToFill"></image>
						</view>
					</scroll-view>

				</view>
			</scroll-view>

		</view>
		<view class="tabbar" :style="isIphoneX?'padding-bottom:'+calUpx(68):''">
			<view class="iconbox">
				<image src="../../static/assents/home2.png" mode="aspectFit"></image>
				<text class="text in">首页</text>
			</view>
			<view class="iconbox" @click="tocar">
				<image src="../../static/assents/car1.png" mode="aspectFit"></image>
				<text class="text in">呼我出行</text>
			</view>
			<view class="iconbox" @click="tomine">
				<image src="../../static/assents/mine1.png" mode="aspectFit"></image>
				<text class="text">我的</text>
			</view>
		</view>
		
		<view class="uni-mask" v-show="showMiddle" @tap="closeShowMiddle(false)">
			<!-- <view class="car_box_s" @tap="goAddress" v-show="packup">
				<view class="car_box car_box_fs"  v-show="1">
					<wuc-tab :tab-list="tabList" :isHei='packups' :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
				</view>
			</view> -->
		</view>
	</view>
	
	
</template>

<script>
	// 修改打车模块
	import WucTab from '@/components/wuc-tab/wuc-tabs.vue';
	import {uniPopup} from "@/components/uni-popup/show_hw.vue"
	import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
	export default {
		data() {
			return {
				//banner indicator-color
				indicatorColor: "#E8E8E8",
				indicatorActiveColor: "#000000",
				
				banner: [],
				news: [],
				scenicarea: [],
				culture: [],
				tickets: [],
				route: [],
				strategy: [],
				tour: [],
				TabCur: 0,
				tabList: [{
					name: '叫车'
				}, {
					name: '接送机'
				}],
				iconx: "true",
				moreicon: false,
				packup: false,    //一次 滑动判断点
				packups: false,  //二次 显示icon
				show: 0,
				iconbox: 0,
				// btuBottom:"",
				isIphoneX:false,
				
				//景区门票
				isautoplay: false,
				//banner 是否显示
				bannerShow: true,
				//打车弹框显示
				showMiddle : false,
				//显示地址列表
				showlist: 0,
				//位置
				whereyougo: '',
				whereyouare:'钱江·西溪新座',
				//打车地址列表
				addressList : [
					{
						name: '少林寺',
						address: '河南省郑州市登封市少林景区游客服务中心南侧',
					},
					{
						name: '嵩阳书院',
						address: '河南省郑州市近郊登封市太室路嵩阳南路',
					},
					{
						name: '中岳庙',
						address: '河南省登封市316省道（少林大道，市区以西约4公里）',
					},
					{
						name: '卢崖瀑布',
						address: '河南省登封市嵩山太室山悬练峰下',
					},
					{
						name: '太室山',
						address: '郑州市登封市中岳大街146号嵩山风景名胜区内',
					}
				]
			}

		},
		onLoad() {
			let _this = this;

			uni.getSystemInfo({
				success: res => {
					// console.log('手机信息res'+res.model)
					let modelmes = res.model;
					if (modelmes.search('iPhone X') != -1) {
						_this.isIphoneX = true;
						// _this.btuBottom="68rpx";
						// console.log(_this.isIphoneX,_this.btuBottom,123456)
					}
				},
			})
			uniRequest.post('/advertising/getadvertising', { //banner
			}).then(function(res) {
				
				_this.banner = res.data.data;

				console.log(res.data.data);
			}).catch(function(error) {
				console.log(error);
			});
			uniRequest.post('/articlecategory/getarticlelistbytitle', { //新闻轮播
				title: '嵩山资讯',
				limit: 4
			}).then(function(res) {
				_this.news = res.data.data;
				// console.log(res.data.data);
			}).catch(function(error) {
				console.log(error);
			});
			uniRequest.post('/articlecategory/getarticlecategorylistbytitle', { //嵩山景区
				title: '嵩山景区',
				limit: 4
			}).then(function(res) {
				_this.scenicarea = res.data.data;
				// console.log(res.data.data);
			}).catch(function(error) {
				console.log(error);
			});
			uniRequest.post('/tourguide/gettourguidelistforhome', {}).then(function(res) { //导游
				_this.tour = res.data.data;
				// console.log(res.data.data);
			}).catch(function(error) {
				console.log(error);
			});
			uniRequest.post('/articlecategory/getarticlecategorylistbytitle', { //景区文化
				title: '嵩山文化',
				limit: 5
			}).then(function(res) {
				_this.culture = res.data.data;
				// console.log(res.data.data);
			}).catch(function(error) {
				console.log(error);
			});
			ztRequest.get('/api/public/sell_product/newList', { //景区门票
				
			}).then(function(res) {
				console.log(res)
				// if(res.data.content.sellPrice.amount){}
				_this.tickets = res.data.content;
				// let array = [];
				// array.push(res.data.data[0]);
				// array.push(res.data.data[0]);
				// _this.tickets = array;
				//label 遍历 array
				// console.log(res.data.data);
			}).catch(function(error) {
				console.log(error);
			});
			
		},
		onShow(e) {
			console.log(e)
			this.getStrategy();
			this.getScenicTour();
		},
		// computed: {
		//           calUpx(num) {
		//               return uni.upx2px(num) + 'px';
		//           }
		//       },
		onPageScroll(e) {
			this.showMiddle = false;
			this.showlist = 0;
			// console.log(e.scrollTop)
			if (e.scrollTop > 94) {
				this.bannerShow = false;
				this.packup = true;
			} else {
				this.packup = false;
				this.bannerShow = true;
			}
			if (e.scrollTop > 255) {
				this.packups = true;
			} else {
				this.packups = false;
			}
			//console.log(this.packup)
		},

		methods: {
			//地址选择
			clickAddress(e){
				let url = e.target.dataset.t;
				this.whereyougo = url;
				this.closeShowMiddle(true);
			},
			//组件 显示列表地址
			getListShows(e){
				this.showlist = e;
				this.showMiddle = true;
			},
			//组件传值 控制
			gowhere(e){
				this.packups = e;
				this.showMiddle = true;
			},
			goAddress(){
				this.showMiddle = true;
				this.packups = false;
			},
			//关闭模板
			closeShowMiddle(e){
				if(e){
					this.packups = false;
				}else{
					this.packups = true;
					this.showMiddle = false;
				}
				this.showlist = 0;
			},
			//跳到票详情界面
			handleToDetail(val) {
				uni.navigateTo({
					url: '/pages/ticket/feizhuticket?id='+ val
				})
			},
			tobanner(e,type){
				if(type == 2){
					uni.navigateTo({
						url: '/pages/nothing/huerNothing'
					});
				}else{
					uni.navigateTo({
						url: e
					});
				}
				
			},
			nothing() {
				uni.navigateTo({
					url: '/pages/nothing/nothing'
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
					url: '/pages/specialFood/specialFoodList'
				});
			},
			navshop() {
				uni.navigateTo({
					url: '/pages/shop/shopList'
				});
			},
			navtour() {
				uni.navigateTo({
					url: '/pages/tourGuide/tourGuide'
				});
			},
			navtours(id) {
				uni.navigateTo({
					url: `/pages/tourGuide/tourGuideParticulars?id=${id}`
				});
			},
			airplane() {
				uni.navigateToMiniProgram({
					appId: '60000138',
					path: '',
					success(res) {
						// 打开成功
					}
				})
			},
			tomine() {
				uni.reLaunch({
					url: '/pages/mine/mine',
				});
			},
			toticket() {
				uni.navigateTo({
					url: '/pages/ticket/ticketList',
				});
			},
			tocar() {
				uni.navigateToMiniProgram({
					appId: '2018122862752160',
					extraData: {},
					success(res) {
						// 打开成功
					}
				})
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
			tovar() {
				uni.navigateTo({
					url: '/pages/quanjin/quanjin'
				});
			},
			toculture(index, id) {
				console.log(index, id)
				uni.navigateTo({ //文化
					url: `/pages/culture/culture?index=${index}&id=${id}`

				});
			},
			toconsult(index) {
				uni.navigateTo({ //新闻
					url: '/pages/consult/consult'
				});
			},
			tonews(id) {
				uni.navigateTo({ //新闻详情
					url: '/pages/consult/consultParticulars?id=' + id

				});

			},
			tosenic(index, id) { //景区
				uni.navigateTo({
					url: `/pages/scenicArea/scenicArea?index=${index}&id=${id}`
				});
			},
			tofeizhuticket(id) { //门票详情页跳转
				uni.navigateTo({
					url: '/pages/ticket/feizhuticket?id=' + id
				});
			},
			tosenics() { //景区
				uni.navigateTo({
					url: `/pages/scenicArea/scenicArea?index=0`,

				});
			},
			tostrategy(index) { //攻略
				uni.navigateTo({
					url: '/pages/strategy/strategy'
				});
			},
			tostrategys(id) { //攻略
				uni.navigateTo({
					url: '/pages/strategy/strategyParticulars?id=' + id
				});
			},
			tojourney(index) { //行程
				uni.navigateTo({
					url: '/pages/journey/journey'
				});
			},
			tojourneys(id) { //行程
				uni.navigateTo({
					url: `/pages/journey/journeyParticulars?id=${id}`
				});
			},
			tabChange(index) {
				this.TabCur = index;
				// console.log(this.TabCur)
			},
			moreiconbtn() {
				this.moreicon = !this.moreicon
				// console.log(this.moreicon)
			},
			showcar() {
				this.show = true;
			},
			closecar(e) {
				this.show = false;
				console.log(e)
			},
			calUpx(num) {
			    return uni.upx2px(num) + 'px';
			},
			//景区攻略接口
			getStrategy(){
				let that = this;
				uniRequest.post('/articlecategory/getarticlelistbytitle', { //攻略
					title: '嵩山攻略',
					limit: 3
				}).then(function(res) {
					that.strategy = res.data.data;
					// console.log(res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},
			//景区行程
			getScenicTour(){
				let _this = this;
				uniRequest.post('/articlecategory/getarticlelistbytitle', { //行程
					title: '嵩山行程',
					limit: 3
				}).then(function(res) {
					_this.route = res.data.data;
					// console.log(res);
				}).catch(function(error) {
					console.log(error);
				});
			}
		},
		components: { WucTab,uniPopup },
		
	} 
</script>


<style lang="less">
	.bigestbox {
		position: relative;
		height: 100%;
	}

	.content {
	// margin: 0 30upx;
	}

	.rel_box {
		width: 100%;
		position: relative;
		top: 520upx;
		height: 1000upx;
		background-color: #fff;
	}

	.botbanner {
		image {
			width: 100%;
			height: 192upx;
		}

		text {
			position: absolute;
			color: #fff;
			font-size: 20upx;
			font-family: 'Helvetica';
		}

		position: fixed;
		top: 328upx;
		width:100%;
		height: 192upx;
	}

	.topbanner_box {
		position: fixed;
		z-index: 2;
		top: 0;
		width: 100%;

		.title_box {
			font-family: 'HYGangYiTi-HEW';
			font-size: 54upx;
			color: #fff;
			position: absolute;
			font-weight: bold;
			top: 257upx;
			left: 40upx;
			z-index: 998;

			.introduce_box {
				font-family: 'Helvetica';
				font-weight: normal;
				font-size: 20upx;
			}
		}
	}
	.bbox {
		width: 750upx;
		position: fixed; 
		top: 432.5upx;
		z-index: 4;
		left: 0;
		.swiper {
			height: 83px !important;
			border-radius: 10upx;
			width: 750upx;
			.top_swiper{
				display: block;
				width: 750upx;
				padding: 0 30upx;
				box-sizing: border-box;
				.top_s_img{
					width: 690upx;
					display: block;
					height: 120upx;
					width: 100%;
					border-radius: 10upx;
				}
			}
		}
	}
	.banner {
		width: 100%;
		height: 520upx;
	}

	.big_box {
		z-index: 6;
		width: 100%;
		padding-top: 100upx;
		background-color: #fff;
		padding-bottom: 180upx;
	}
	.car_box_s {
		position: relative;
		z-index: 9999;
		.car_box {
			width: 100%;
			border-radius: 10upx;
			background-color: rgba(255, 255, 255, 0);
			top: 0;
		}
		.car_box_f{
			position: fixed;
			top: 432.5upx;
			z-index: 100;
			left: 0;
			transition:top 2s;
			-webkit-transition:top 2s; /* Safari */
		}
		.car_box_fs{
			position: fixed;
			top: 432.5upx;
			z-index: 100;
			left: 0;
		}
	}
	.getAddresslist{
		position: fixed;
		top: 432.5upx;
		z-index: 99999;
		left: 30upx;
		.address_box{
			width: 690upx;
			background-color: #ffffff;
			border-radius: 16upx;
			overflow: hidden;
			.address_top{
				height: 100upx;
				display: block;
				box-shadow: 0 0 15upx 0 rgba(0,0,0,0.09);
				.address_topl{
					margin-left: 10upx;
					padding: 0 15upx;
					float: left;
					.address_topli{
						display: inline-block;
						width: 10upx;
						height: 10upx;
						vertical-align: middle;
					}	
					.address_toplt{
						font-family: PingFangSC-Medium;
						font-size: 24upx;
						color: #333333;
						height: 100upx;
						line-height: 100upx;
						display: inline-block;
						vertical-align: middle;
						margin-left: 10upx;
					}
				}
				.address_title{
					display: inline-block;
					height: 100upx;
					line-height: 100upx;
					font-family: PingFangSC-Medium;
					font-size: 32upx;
					color: #333333;
					letter-spacing: 1upx;
					font-weight: bold;
					float: left;
					margin-left: 170upx;
				}
			}
			.address_cont{
				height: 490upx;
				
				.address_li{
					height: 120upx;
					.address_img{
						display: inline-block;
						float: left;
						width: 18upx;
						height: 18upx;
						margin-left: 25upx;
						margin-top: 46upx;
					}
					.address_c{
						float: left;
						display: inline-block;
						height: 120upx;
						margin-left: 15upx;
						width: 600upx;
						.addressT{
							font-family: PingFangSC-Medium;
							font-size: 24upx;
							color: #333333;
							letter-spacing: 0;
							font-weight: bold;
							height: 33upx;
							line-height: 33upx;
							display: block;
							margin-top: 25upx;
						}
						.addressD{
							font-family: PingFangSC-Regular;
							font-size: 20upx;
							color: #999999;
							letter-spacing: 0;
							height: 28upx;
							line-height: 28upx;
							display: block;
							margin-top: 10upx;
							text-overflow : ellipsis;
							white-space : nowrap;
							overflow : hidden;
						}
					}
				}
			}
		}
	}
	
	.banner_box {
		width: 690upx;
		margin-left: 30upx;
	}

	.mainfunction_box {
		
		.icon_box {
			
			.scroll_box {
				display: flex;
				.abox {
					display: flex;
					overflow: auto;
					border-radius: 10upx;
					background-color: #fff;
					margin-top: 24upx;
				}
				.abox_flex{
					flex-wrap: wrap;
				}
			}

			.car_btn {
				width: 210upx;
				height: 72upx;
				background-color: #3366FF;
				margin-top: 25upx;
				margin-left: 30upx;
				border-radius: 20upx;
				position: relative;

				span {
					color: #fff;
					line-height: 80upx;
					font-size: 32upx;
					padding-left: 70upx;
				}

				image {
					width: 60upx;
					height: 60upx;
					position: absolute;
					top: 10upx;
					left: 10upx;
				}
			}
			
			
			.box {
				color: #333;
				font-size: 28upx;
				width: 95upx;
				margin:20upx 15upx 10upx 17upx;
				text-align: center;

				image {
					width: 60upx;
					height: 60upx;
				}

				p {
					width: 99upx;
					font-size: 24upx;
				}
			}
			.box_er{
				margin:20upx 30upx 10upx;
			}
			.box:first-child,.box_first {
				margin:20upx 18upx 10upx 0;
			}
			// .box:last-child {
			// 	margin:20upx 15upx 10upx 0;
			// }
			.box_go{
				margin:20upx 0 10upx 17upx;
			}
			.content {
				.moreicon {
					overflow: hidden;
					font-size: 22upx;
					display: flex;
					justify-content: space-between;
					overflow: hidden;
					padding-top: 20upx;
					background-color: #fff;
					border-top: 1.5upx solid rgba(0,0,0,.1);
					.text_box {
						color: #999;
						line-height: 30upx;

					}

					.more_box {
						color: #000;
						font-weight: 600;
						line-height: 30upx;
						.get_more{
							display: inline-block;
							height: 30upx;
							line-height: 30upx;
							vertical-align: middle;
						}
						image {
							width: 25upx;
							height: 25upx;
							vertical-align: middle;
						}
					}
				}
			}

		}
	}

	.bigcallcar_box {

		.small_box {
			position: fixed;
			z-index: 99999999;
			top: 240upx;
			left: 50upx;
			background-color: #fff;
		}

		.bg_box {
			position: fixed;
			width: 750upx;
			height: 99rem;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 9999998;
		}
	}

	.news_box {
		display: flex;
		font-size: 24upx;
		color: #666666;
		line-height: 35upx;
		border: 2upx solid whitesmoke;
		box-shadow: 0 7upx 27upx rgba(0,0,0,0.07);
		height: 100upx;
		margin: 0 30upx;
		border-radius: 16upx;
		margin-top: 48upx;
		image {
			height: 50upx;
			width: 250upx;
			margin-top: 25upx;
			margin-left: 20upx;
		}
		.swiper {
			height: 35upx;
			margin-top: 32.5upx;
			margin-left: 30upx;
			width: 100%;
			.biaoti{
				display: inline-block;
				padding-right: 20upx;
				font-weight: 800;
				height: 35upx;
				max-width: 100upx;
				float: left;
				text-overflow : ellipsis;
				white-space : nowrap;
				overflow : hidden;
			}
			.biaoti_c{
				display: inline-block;
				max-width: 340upx;
				text-overflow : ellipsis;
				white-space : nowrap;
				overflow : hidden;
				height: 35upx;
				float: left;
			}
		}
	}

	.titlebox {
		height: 50upx;
		position: relative;
		margin-top: 50upx;
		margin-bottom: 40upx;
		line-height: 50upx;
		display: flex;

		.org_box {
			width: 16upx;
			height: 10upx;
			background-color: #D39D66;
			position: absolute;
			left: 0;
			top: 15upx;
		}

		.chinese {
			display: inline-block;
			font-size: 36upx;
			color: #373737;
			font-weight: bold;
			width: 150upx;
			margin-left: 22upx;
		}

		.english {
			display: inline-block;
			font-size: 22upx;
			color: #BDBDBD;
			line-height: 50upx;
		}

		.dextro_box {
			position: absolute;
			right: 28upx;

			image {
				width: 20upx;
				height: 20upx;
			}
		}

		.slash {
			height: 41upx;
			width: 19upx;
			position: absolute;
			left: 152upx;
			top: 5upx;
		}
	}

.wrap {
			width: 100%;
			overflow-x: scroll;
		white-space: nowrap;
		display: flex;
		}
	.scenicarea_box {
		margin: 0 30upx;
		height: 440upx;
		display: flex;
		
		.pic_box {
			display: inline-block;
			position: relative;
			width: 300upx;
			height: 420upx;
			border-radius: 20upx;
			margin-left: 20upx;
			box-shadow: 0 7upx 28upx rgba(0, 0, 0, 0.07);
			image {
				width: 300upx;
				height: 420upx;
				border-radius: 20upx;
			}
			.pic_b{
				width:100%;
				height:140upx;
				position:absolute;
				display: block;
				border-radius: 0 0 20upx 20upx;
				bottom:0px;
				background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5));
				display: flex;
				flex-direction: column;
				.title {
					display: inline-block;
					width: 128upx;
					height: 38upx;
					background-color: #fff;
					color: #333333;
					font-size: 24upx;
					line-height: 38upx;
					border-radius: 4upx;
					text-align: center;
					font-weight: 600;
					margin-top: -19upx;
					margin-left: 20upx;
				}
				.intro { 
					width: 280upx;
					height: 90upx;
					line-height: 35upx;
					color: #fff;
					font-size: 30upx;
					font-weight: 600;
					padding-left: 20upx;
					margin-top: 10upx;
					padding-top: 10upx;
					display: -webkit-box; 
					-webkit-box-orient: vertical; 
					-webkit-line-clamp: 2; 
					overflow: hidden;
					border-radius: 0 20upx;
					white-space: normal;
				}
			}
		}
		.pic_box:first-child{
			margin-left: 0;
		}
		.pic_box:last-child{
			margin-right: 20upx;
		}
	}

	.center {
		width: 690upx;
		margin: 0 30upx;
	}

	.vrbox {
		width: 690upx;
		height: 164upx;
		border-radius: 20upx;
		box-shadow: 0 7upx 28upx rgba(0, 0, 0, 0.12);

		image {
			width: 690upx;
			height: 164upx;
			border-radius: 20upx;
		}
	}

	.culturebox {
		display: block;
		// flex-wrap: wrap;
		// justify-content: space-between;
		// position: relative;
		.picbox_s{
			float: left;
			border-radius: 15upx;
			overflow: hidden;
			direction: block;
			width: 326upx;
			height: 126upx;
			margin-left: 10upx;
			margin-top: 10upx;
		}
		.picbox {
			width: 326upx;
			height: 126upx;
			position: relative;
			margin-bottom: 10upx;
			border-radius: 15upx;
			box-shadow: 0 7upx 28upx rgba(0, 0, 0, 0.12);
			overflow: hidden;
			image {
				width: 326upx;
				height: 126upx;
				border-radius: 15upx;
			}
			
			.back_g{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;left: 0;
				opacity: 0.4;
				border-radius: 15upx;
			}
			
			.minbox {
				position: absolute;
				top: 0;
				left: 0;
				background: none;
				color: #ffffff;
				border-radius: 15upx;
				.title {
					display: block;
					font-size: 30upx;
					height: 38upx;
					line-height: 38upx;
					padding-left: 36upx;
					padding-top: 22upx;
					font-weight: bold;
				}
				.intro {
					display: block;
					font-size: 20upx;
					height: 28upx;
					line-height: 28upx;
					padding-left: 36upx;
					margin-top: 10upx;
					width: 290upx;
					text-overflow : ellipsis;
					white-space : nowrap;
					overflow : hidden;
					
				}
				.line_h{
					width: 100%;
					height: 4upx;
					.bg {
						width: 18upx;
						height: 4upx;
						background-color: #fff;
						opacity: 0.6;
						margin-top: 1upx;
						margin-left: 36upx;
					}
				}
				
			}
			
		}
		.picbox_s:first-child .back_color {
			background-image: linear-gradient(-270deg, #AE6522 0%, #5D2706 100%);
		}
		.picbox_s:nth-child(2) .back_color {
			background-image: linear-gradient(-269deg, #159115 0%, #155B00 100%);
		}
		.picbox_s:nth-child(3) .back_color {
			background-image: linear-gradient(-269deg, #CC2323 1%, #760505 70%);
		}
		.picbox_s:nth-child(4) .back_color {
			background-image: linear-gradient(-90deg, #054E8C 3%, #0AB1FF 94%);
		}
		.picbox_s:nth-child(5) .back_color {
			background-image: linear-gradient(-90deg, #4257C0 0%, #4A5AE2 100%);
		}
		
		view:first-child  {
			width: 352upx;
			height: 260upx;
			image {
				width: 352upx;
				height: 260upx;
			}
			margin-left: 0;
		}
		
		view:nth-child(4) {
			width: 352upx;
			height: 126upx;
			image {
				width: 352upx;
				height: 126upx;
			}
			margin-left: 0;
		}
// 		view:first-child {
// 			width: 352upx;
// 			height: 260upx;
// 
// 			image {
// 				width: 352upx;
// 				height: 260upx;
// 				border-radius: 15upx;
// 
// 			}
// 		}
// 
// 		view:nth-child(3) {
// 			position: absolute;
// 			top: 136upx;
// 			right: 0;
// 		}
// 
// 		view:nth-child(4) {
// 			width: 352upx;
// 			height: 126upx;
// 
// 			image {
// 				width: 352upx;
// 				height: 126upx;
// 			}
// 		}
	}
	.ticketsboxs {
		height: 340upx;
		width: 100%;
		overflow-x: scroll;
		white-space: nowrap;
		display: flex;
	}
	.ticketsbox {
		padding: 0 30upx 20upx;
		height: 320upx !important;
		// .pic_box_s{
		// 	display: inline-block;
		// 	width: 620upx;
		// 	height: 340upx;
		// 	box-shadow: 0 7upx 28upx rgba(0, 0, 0, 0.12);
		// }
		.pic_box {
			display: inline-block;
			width: 600upx;
			height: 320upx;
			border-radius: 20upx;
			margin-right: 20upx;
			position: relative;
			box-shadow: 0 7upx 28upx rgba(0, 0, 0, 0.07);
			image {
				width: 600upx;
				height: 226upx;
				border-radius: 15upx 15upx 0 0;
			}

			.intro {
				height: 36upx;
				background-color: #000000;
				opacity: 0.75;
				font-size: 20upx;
				line-height: 36upx;
				text-align: right;
				color: white;
				border-radius: 15upx 0 0 15upx;
				padding: 0 10upx;
				position: absolute;
				top: 32upx;
				right: 0;
				display: inline-block;
			}


			.details {
				height: 42upx;
				display: flex;
				justify-content: space-between;
				margin: 25upx 25upx 0 25upx;

				.title {
					color: #333333;
					width: 400upx;
					display: inline-block;
					text-overflow : ellipsis;
					white-space : nowrap;
					overflow : hidden;
					font-size: 30upx;
					font-family: PingFangSC-Medium;
					font-weight: bold;
				}

				.price {
					color: #D98632;
					font-size: 40upx;
					display: inline-block;
					line-height: 30upx;

					.rmb {
						font-size: 24upx;
					}
				}
			}
		}
		.pic_box:last-child{
			margin-right: 0;
		}
	}
	.title{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	// 景区行程
	.routebox {
		margin: 0 30upx;
		height: 400upx;
		display: flex;
		.item-wrap {
			display: inline-block;
		}
		.pic_box {
			width: 600upx;
			height: 380upx;
			border-radius: 20upx;
			margin-right: 20upx;
			box-shadow: 0 7upx 28upx rgba(0, 0, 0, 0.07);
			display: flex;

			image {
				width: 310upx;
				height: 380upx;
				border-radius: 20upx 0 0 20upx;

			}

			.details {
				width: 290upx;
				position: relative;
				padding: 48upx 24upx;
			}

			.title {
				font-size: 30upx;
				width: 242upx;
				text-overflow : ellipsis; 
				white-space : nowrap;
				overflow : hidden;
				font-weight: bold;
			}

			.intro {
				font-size: 24upx;
				color: #666666;
				margin-top: 20upx;
				display: -webkit-box;   
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
				overflow: hidden;
				width: 243upx;
				height: 145upx;
				line-height: 30upx;
				white-space: normal;
				text-align:justify;
			}
			.browse {
				margin-bottom: 0;
				font-size: 24upx;
				color: #999999;
				margin-top:70upx;
				display:block;
			}

		}
	}

	.strategybox {
		height: 391upx;
		display: flex;
		position: relative;
		border-radius: 10upx;
		// overflow-x: scroll;  支付宝 图片精选显示问题
		white-space: nowrap;
		.picbox {
			display: inline-block;
			position: relative;
			width: 204upx;
			height: 178upx;
			margin-left: 20upx;
			border-radius: 10upx;

			image {
				width: 204upx;
				height: 178upx;
				border-radius: 10upx;
			}
			.box{
				background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5));
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 80upx;	
				border-radius: 0 0 10upx 10upx;
				font-weight: bold;
			}

			.intro {
				width: 176upx;
				position: absolute;
				left: 14upx;
				bottom: 20upx;
				font-size: 20upx;
				line-height: 30upx;
				letter-spacing: 0;
				height: 53upx;
				color: white;
				display: -webkit-box; 
				-webkit-box-orient: vertical; 
				-webkit-line-clamp: 2; 
				overflow: hidden;
				font-weight: bold;
				white-space: normal;
			}

			.jingxuan {
				display: none;
			}
		}

		view:nth-child(3) {
			position: absolute;
			bottom: 20upx;
			right: 0;
		}

		view:first-child {
			width: 465upx;
			height: 371upx;
			position: relative;
			margin-left: 0;
			border-radius: 20upx;

			image {
				width: 465upx;
				height: 371upx;
				border-radius: 20upx;
			}
			.look_box{
				position:absolute;
				top: 0;
				right:0;
				display: inline-block;
				height: 40upx;
				.liulan {
					display: block;
					height: 40upx;
					padding: 0 40upx;
				}
				.look_eye{
					float: right;
					width:auto; 
					display:inline-block !important; 
					height: 40upx;
					position: relative;
					text-align: right;
					.look_eye_b{
						width:auto; 
						display:inline-block !important; 
						height: 40upx;
						padding: 0 30upx;
						border-radius: 0 10upx 0;
						background-image: linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,.5));
						image {
							display: inline-block;
							height: 20upx;
							width: 32upx;
							vertical-align: middle;
						}
						text {
							display: inline-block;
							color: #ffffff;
							font-size: 24upx;
							margin-left: 10upx;
							height: 40upx;
							line-height: 40upx;
							letter-spacing: 0;
							font-family: PingFangSC-Regular;
						}
					}
				}
			}
			
			.box{
				border-radius: 0 0 20upx 20upx;
				height: 108upx;
			}

			.intro {
				width: 420upx;
				height: 48%;
				position: absolute;
				left: 20upx;
				bottom: 20upx;
				font-size: 30upx;
				height: 68upx;
				line-height: 37upx;
				color: white;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				letter-spacing: 0;
			}

			.jingxuan {
				display: block;
				position: absolute;
				top: 25upx;
				left: -14upx;
				width: 100upx;
				height: 42upx;
			}
		}
	}

	.tourbox {
		margin-left: 30upx;
		margin-bottom: 80upx;
		display: flex;
		margin: 0 20upx;

		.pic_box {
			display: inline-block;
			height: 350upx;
			width: 250upx;
			border-radius: 20upx;
			position: relative;
			margin-right: 20upx;

			.bg {
				position: absolute;
				left: 75upx;
				top: 0upx;
				border-radius: 50%;
				width: 100upx;
				height: 100upx;
				background-color: #F7F8F9;
			}

			image {
				position: absolute;
				left: 80upx;
				top: 5upx;
				border-radius: 50%;
				width: 90upx;
				height: 90upx;
			}

			.details {
				height: 293upx;
				width: 250upx;
				border-radius: 20upx;
				background: #F7F8F9;
				margin-top: 50upx;

				.name {
					display: block;
					font-size: 30upx;
					width: 250upx;
					text-align: center;
					display: inline-block;
					margin-top: 60upx;
					font-weight: bold;
				}

				.tip {
					height: 43upx;
					.title {
						display: inline-block;
						color: #E3A078;
						font-size: 22upx;
						border: 1upx solid #EFD4C5;
						margin: 0 3upx;
						height: 40upx;
						line-height: 40upx;
						padding: 0 7upx;
						margin-top: 2upx;
					}
					text-align: center;
					margin-top: 15upx;
				}

				.intro {
					font-size: 24upx;
					color: #999;
					width: 216upx;
					text-align: center;
					display: inline-block;
					margin-left: 17upx;
					margin-top: 50upx;
					height: 52upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;

				}

			}
		}

	}

	.tabbar {
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 98upx;
		display: flex;
		justify-content: space-around;
		z-index: 99999999999;
		background-color: #fff;
		box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.05);

		.iconbox {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 20upx;

			image {
				height: 40upx;
				width: 40upx;
			}

			.text {
				font-size: 22upx;
				color: #999;
			}

			.in {
				color: #333;
			}

		}

	}
	
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
