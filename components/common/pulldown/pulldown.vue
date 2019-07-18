<template>
	<view class="boxa fixed" :style="{top: top}">
		<view class="top_kbox">
			<block v-for="(item,i) in sortTabList" :key="i">
				<view class="ibox" @tap="handleShowSub(i, item.val)" :class="[i== activeTab?'actives':'']">
					<text class="uni_14">{{item.name}}</text>
					<text v-if="i != activeTab" class="iconfont">&#xe605;</text>
					<text v-else class="iconfont">&#xe600;</text>
				</view>
			</block>
		</view>
		<view :class="[show?'list_boxs2':'list_boxs']">
			<view class="lione">
				<view v-if="isSort">
					<block v-for="(item, i) in showSubListOne" :key="i">
						<view class="mli" @tap="handleChooseVal(i, item.val)">
							<text :class="[i==activeSubTab[activeTab] ?'actives':'']" class="uni_14">{{item.name}}</text>
							<text v-if="i==activeSubTab[activeTab]" class="iconfont gou">&#xe62d;</text>
						</view>
					</block>
				</view>

				<view v-else>
					<block v-for="(item, i) in showSubListTwo" :key="i">
						<view class="showSubListTwo">
							<view class="select_title">{{item.title}}</view>
							<view class="select_confirm">
			
								<block v-if="i==0">
									<text  @tap="selectChooseValAge(is)" v-for="(items, is) in item.data" :key="is" :class="[is==activeSubTabAge ?'selectactives':'']"
									 class="select_confirm_item">
										{{items.name}}
									</text>
								</block>
								<block v-else>
									<text  @tap="selectChooseValSex(is)" v-for="(items, is) in item.data" :key="is" :class="[is==activeSubTabSex ?'selectactives':'']"
									 class="select_confirm_item">
										{{items.name}}
									</text>
								</block>
							</view>

						</view>

					</block>
					<view class="selectOperation">
						<text class="filter-content-footer-cancel" @tap="selectcancel()">清空</text>
						<text class="filter-content-footer-confirm" @tap="selectChoose()">确认</text>
					</view>
				</view>

			</view>
			<view class="hideA" @tap="hide"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			sortTabList: {
				type: Array,
				default () {
					return []
				}
			},
			top: { //距离顶部位置
				type: String,
				sort: "sort",
				default () {
					return '0'
				}
			}
		},
		data() {
			return {
				activeTab: -1,
				activeSubTab: this.sortTabList.map(_ => 0), //默认选中第一个
				activeTabVal: '', // 传给后端的值
				isSort: false,
				showSubListTwo: [],
				showSubListOne: [],
				show: false,
				
				activeSubTabAge:0,
				activeSubTabSex:0,
			}
		},
		methods: {
			handleShowSub(i, val) {

				if (this.sortTabList[i].val === "sort") {
					this.showSubListOne = this.sortTabList[i].subTab;
					this.isSort = true
				} else {
					this.showSubListTwo = this.sortTabList[i].subTab;
					this.isSort = false
				}
				// console.log(this.showSubListOne, this.showSubListTwo, 2222222222)
				// this.showSubList = this.sortTabList[i].subTab;
				this.show = true;
				this.activeTab = i;
				this.activeTabVal = val;
			},
			handleChooseVal(i, val) {
				this.activeSubTab.splice(this.activeTab, 1, i)
				this.$emit('chooseItem', val)
				this.hide()
			},
			
			selectChooseValAge(is) {
				this.activeSubTabAge=is
			},
			selectChooseValSex(is) {
				this.activeSubTabSex=is
			},
			
			selectChoose() {
				this.$emit('complexChooseItem',[{"sex":this.showSubListTwo[0].data[this.activeSubTabAge].val},{"age":this.showSubListTwo[1].data[this.activeSubTabSex].val}])
				this.hide()
			},
			selectcancel() {
				this.activeSubTabSex=0
				this.activeSubTabAge=0
				this.$emit('selectcancel',[{"sex":this.showSubListTwo[0].data[this.activeSubTabAge].val},{"age":this.showSubListTwo[1].data[this.activeSubTabSex].val}])
				this.hide()
			},

			hide() {
				this.show = false;
				this.activeTab = -1;
			}
		}
	}
</script>

<style>
	/* 新增 */
	.iconfont {
		margin-left:15upx;
		font-size:24upx;
	}
	.selectOperation {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 90upx;
		border-top: 1px solid rgba(238, 238, 238, 0.65);
	}

	.filter-content-footer-cancel {
		width: 50%;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		color: block;
		display: flex;
	}

	.filter-content-footer-confirm {
		background-color: #D39C66;
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		color: #FFFFFF;
	}

	.showSubListTwo {
		padding: 0 30upx;
		padding-right: 200upx;
		box-sizing: border-box;
	}

	.select_title {
		height: 70upx;
		line-height: 70upx;
		font-size: 30upx;
		color: #666666;

	}

	.select_confirm {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}

	.select_confirm_item {
		width: 140upx;
		height: 60upx;
		background-color: #ccc;
		color: block;
		font-size: 28upx;
		margin-right: 30upx;
		margin-bottom: 30upx;
		text-align: center;
		line-height: 60upx;
	}

	.selectactives {
		color: #D39C66;
		border: 1upx solid #D39C66;
		background-color: #fff;
	}

	.hideA {
		height: calc(100% - 310upx);
	}

	.mli {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22upx 40upx;
		border-bottom: 1px solid rgba(238, 238, 238, 0.65);
	}

	.lione {
		background-color: #fff;
		padding: 10upx 0;
		padding-bottom: 0;

	}

	.uni_14 {
		font-size: 32upx;
		line-height: 45upx;
	}

	.list_boxs {
		background-color: rgba(84, 80, 80, 0.48);
		position: fixed;
		height: calc(100%);
		width: 100%;
		z-index: 88;
		transform: translateY(-123%);
	}

	.list_boxs2 {
		background-color: rgba(84, 80, 80, 0.48);
		position: fixed;
		height: calc(100%);
		width: 100%;
		z-index: 88;
		transform: translateY(0);
	}

	.ii {
		width: 30upx;
		height: 30upx;
		display: block;
		margin-left: 12upx;
		background-size: contain;
	}

	.actives,
	.gou {
		color: #D39C66;
	}

	.ibox {
		display: flex;
		align-items: center;
	}

	.top_kbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 28upx 5%;
		width: 90%;
		z-index: 99;
		border-bottom: 1px solid rgba(238, 238, 238, 0.65);
	}

	.boxa {
		position: relative;
		border-bottom: 1px solid rgba(238, 238, 238, 0.65);
	}

	.boxa.fixed {
		position: fixed;
		width: 100%;
		z-index: 1024;
	}
</style>
