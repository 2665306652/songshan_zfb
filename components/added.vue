<template>
	<view class="bigestbox" v-show="showchose">
		<view class="newpage" v-show="newpages">
			<view style="margin: 160upx 30upx;">
				<view class="back_btn" @tap="close"><text class="iconfont">&#xe660;</text></view>
				<view class="title">
					新增信息
					<text>填写完整的信息可以让您更加便捷的享受服务哦~</text>
				</view>
				<view class="">
					<form @submit="formSubmit" @reset="formReset">
						<view class="ipt_box">
							<view class="uni-title">中文姓名</view>
							<view class="uni-list">
								<view class="uni-list-cell">
									<input class="uni-input" name="nickname" placeholder="请输入证件上的实际姓名" :value="name" :enableNative="false" />
								</view>
							</view>
						</view>
						<view class="ipt_box">
							<view class="uni-title">证件类型</view>
							<view class="uni-list">
								<view class="uni-list-cell">
									<input class="uni-input" name="sfz" value="身份证" disabled :enableNative="false"/>
								</view>
							</view>
						</view>
						<view class="ipt_box">
							<view class="uni-title">证件号码</view>
							<view class="uni-list">
								<view class="uni-list-cell">
									<input class="uni-input" name="idCard" placeholder="请输入，与证件保持一致" :value="idcard" :enableNative="false"/>
								</view>
							</view>
						</view>
						<view class="ipt_box">
							<view class="uni-title">手机号</view>
							<view class="uni-list">
								<view class="uni-list-cell">
									<input class="uni-input" name="phone" placeholder="请输入手机号，用户接收信息" :value="phone" :enableNative="false"/>
								</view>
							</view>
						</view>
						<view class="ipt_box">

							<view class="uni-title">邮箱</view>
							<view class="uni-list">
								<view class="uni-list-cell">
									<input class="uni-input" name="email" placeholder="请输入，用于接收行程信息(选填)" :value="email" :enableNative="false"/>
								</view>
							</view>
						</view>
						<view class="uni-btn-v uni-common-mt">
							<button class="btn-submit" formType="submit" type="primary">保存</button>

						</view>
					</form>
				</view>
			</view>
		</view>
		<view class="bigbox">
			<view class="titlebox centent">
				<view class="org" @tap="closechose">取消</view>
				<view class="mid">新增更换&nbsp;-&nbsp;1位</view>
				<view class="org" @tap="tijiao">完成</view>
			</view>
			<scroll-view scroll-y="true" style="height: 71%;margin-top: 110upx;">
				<view class="content centent">
					<view class="" v-show="newlist.length==0?1:0" style="margin-top: 56upx; text-align: center;color: #999;">
						目前无信息录入
					</view>
					<view class="box" v-for="(i, index) in newlist" :key="index" v-show="newlist.length==0?0:1">
						<view class="imagebox" @tap="chose(i.name,i.externalId,index,i.openCode,i.showbtn)">
							<view class="" v-if="i.showbtn?0:1">
								<image src="/static/assents/order/7.png" mode="scaleToFill"></image>
							</view>
							<view class="" v-if="i.showbtn">
								<image src="/static/assents/order/6.png" mode="scaleToFill"></image>
							</view>
						</view>
						<view class="mainbox">
							<view class="namebox">{{ i.name }}</view>
							<view class="idcardbox smallbox">
								身份证
								<text>{{ i.idCard }}</text>
							</view>
							<view class="phonebox smallbox">
								手机号
								<text>{{ i.phone }}</text>
							</view>
							<view class="idcardbox smallbox">
								电子邮箱
								<text>{{ i.email }}</text>
							</view>
						</view>
						<view class="imagebox" @tap="newpage(1,i.openId,i.name,i.idCard,i.phone,i.email,i.openCode)">
							<image src="/static/assents/order/4.png" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>


		<view class="addnew centent" @tap="newpage(0)">
			<image src="/static/assents/order/5.png" mode="scaleToFill"></image>
			新增信息
		</view>
	</view>
</template>

<script>
	var graceChecker = require("./graceChecker.js");
	import {
		requestWB as uniRequest,
		requestZT as ztRequest
	} from 'uni-request';
	export default {
		name: 'added',
		props: {
			showchose: {
				type: Boolean,
				default () {
					return false;
				}
			},
			tid: {
				// 售卖产品id
				type: String,
				default () {
					return '';
				}
			},
			openId: {
				// userId
				type: String,
				default () {
					return '';
				}
			},
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			arr: {
				type: Array,
				default () {
					return [];
				}
			},
			neednub: {
				type: Number
			}
		},
		data() {
			return {
				show: this.showchose,
				newpages: false,
				openid: '',
				type: '',
				name: null,
				idcard: null,
				phone: null,
				email: null,
				lists: [],
				newopen: false,
				choese: false,
				idx: 999,
				externalId: '',
				openCode: ''
			};
		},
		computed: {
			newlist() {
				let arr = this.list
				if (this.arr.length == 0) {
					for (let i = 0; i < arr.length; i++) {
						arr[i].showbtn = false
					}
				}
				if (this.newopen) {
					arr = this.lists
				}
				return arr
			},
			narr() {
				return this.arr
			}

		},
		methods: {
			tijiao() {
				let newarr = []
				for (let i = 0; i < this.narr.length; i++) {
					newarr.push(this.narr[i].openCode)
				}

				this.openCode = newarr.toString();
				console.log(this.openCode, 9098)
				this.$emit('chosemsg', this.name, this.openCode, this.idx, this.narr);
				this.show = false;
				this.$emit('handleShowChose', this.show);
				// this.choese=false;
				// console.log(this.name)
			},
			chose(name, externalId, index, openCode, showbtn) {
				let newarr = this.newlist
				console.log(this.newlist, showbtn, 'list')
				// if(this.narr.length<this.neednub){
				this.newlist[index].showbtn = !this.newlist[index].showbtn
				if (newarr[index].showbtn) {
					this.narr.push({
						'openCode': openCode,
						'name': name
					})
				} else {
					for (let a = 0; a < this.narr.length; a++) {
						if (this.narr[a].openCode == newarr[index].openCode) {
							this.narr.splice(a, 1)
						}
					}
				}





			},
			closechose() {
				this.show = false;

				this.$emit('handleShowChose', this.show);
			},

			close() {
				this.newpages = false
				this.formReset()
			},
			newpage(i, openid, name, idcard, phone, email, openCode) {
				if (i === 1) {
					// console.log('编辑信息')			
					this.name = name
					this.idcard = idcard
					this.phone = phone
					this.email = email
					this.openid = openid
					this.type = 1,
						this.openCode = openCode
				} else {
					this.type = 0
					this.name = ''
					this.idcard = ''
					this.phone = ''
					this.email = ''
				}
				this.newpages = true;
			},
			formReset: function(e) {
				// console.log("清空数据")
				this.chosen = ''
			},
			formSubmit: function(e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [{
						name: "nickname",
						checkType: "string",
						checkRule: "1,6",
						errorMsg: "请输入姓名"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请输入正确的手机号"
					},
					{
						name: "idCard",
						checkType: "string",
						checkRule: "15,18",
						errorMsg: "请输入正确的身份证号码"
					},

				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				let _this = this
				const value = uni.getStorageSync('openId')

				if (checkRes) {
					// uni.showToast({title:"验证通过!", icon:"none"});
					// console.log(formData)
					if (this.type === 0) {
						ztRequest.post('/api/public/order/saveUserManage', {
								name: formData.nickname,
								openId: value,
								phone: formData.phone,
								idCard: formData.idCard,
								email: formData.email
							})
							.then(function(res) {
								// _this.list=	res.data.content	
								_this.$emit('shuaxin', true, _this.narr)

								// console.log('新增', 11);
							})
							.catch(function(error) {
								console.log(error);
							});
						this.formReset()
						this.newpages = false
					} else {
						ztRequest.post('/api/public/order/updateUserManage', {
								name: formData.nickname,
								phone: formData.phone,
								idCard: formData.idCard,
								email: formData.email,
								openCode: _this.openCode
							})
							.then(function(res) {
								// _this.list=	res.data.content	
								_this.$emit('shuaxin', true, _this.narr)
							})
							.catch(function(error) {
								console.log(error);
							});
					}
					this.formReset()
					this.newpages = false

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}

		}
	};
</script>

<style lang="less" scoped>
	.centent {
		padding: 0 4.3%;
		width: 91.4%;
	}

	.ipt_box {
		height: 125upx;
		margin-top: 40upx;
		border-bottom: 2upx solid rgb(230, 231, 233);
		justify-content: space-between;

		.uni-title {
			font-size: 28upx;
			color: #666666;

		}

		.uni-list {
			margin-bottom: -10upx;
		}

		.uni-input {
			margin-top: 16upx;
			width: 100%;
			font-size: 32upx;

		}
	}

	.btn-submit {
		background: #ee7d31;
		border: none;
	}

	.uni-btn-v {
		margin-top: 50upx;
	}

	.newpage {
		position: fixed;
		z-index: 9999;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;

		.back_btn {
			width: 33upx;
			height: 33upx;
			margin-top: 30upx;

			.iconfont {
				width: 33upx;
				height: 33upx;
			}
		}

		.title {
			font-size: 38upx;
			margin-top: 30upx;
			color: #333333;
			font-weight: bold;
			line-height: 53upx;

			text {
				font-size: 24upx;
				line-height: 33upx;
				color: #999999;
				display: block;
				font-weight: normal;
			}
		}
	}

	.bigestbox {
		position:fixed;
		z-index: 9999999999999;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		top: 0;

		.bigbox {
			position: fixed;
			z-index: 999;
			height: 66.2%;
			bottom: 0;
			width: 100%;
			background-color: #fff;
		}

		.titlebox {
			display: flex;
			position: absolute;
			z-index: 9999;
			top: 0%;
			justify-content: space-between;
			height: 110upx;
			box-shadow: 0 4upx 15upx 0 rgba(0, 0, 0, 0.04);

			.mid {
				font-size: 36upx;
				line-height: 110upx;
				font-weight: bold;
				color: #333333;
			}

			.org {
				font-size: 32upx;
				font-weight: bold;
				height: 100%;
				line-height: 110upx;
				color: #ee7d31;
			}
		}
	}

	.content {


		.box {
			height: 248upx;
			border-bottom: 2upx solid rgb(230, 231, 233);
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.imagebox {
				height: 35upx;
				width: 35upx;
			}

			image {
				height: 35upx;
				width: 35upx;
			}

			.mainbox {
				position: absolute;
				left: 70upx;

				.namebox {
					font-size: 32upx;
					color: #333333;
					height: 45upx;
					line-height: 45upx;
					font-weight: bold;
				}

				.smallbox {
					height: 34upx;
					font-size: 24upx;
					color: #666;
					line-height: 34upx;

					text {
						margin-left: 32upx;
					}
				}
			}
		}
	}

	.addnew {
		height: 10%;
		box-shadow: 0 -4upx 10upx 0 rgba(0, 0, 0, 0.05);
		position: fixed;
		bottom: 0;
		z-index: 999;
		font-weight: bold;
		font-size: 36upx;
		color: #333333;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 40upx;
			height: 40upx;
			margin-right: 16upx;
		}
	}
</style>
