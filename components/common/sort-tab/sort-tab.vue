<template>
	<view class="boxa fixed" :style="'top:' +calculate(top)">
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
				<block v-for="(item, i) in showSubList" :key="i">
					<view class="mli" @tap="handleChooseVal(i, item.val)">
						<text :class="[i==activeSubTab[activeTab] ?'actives':'']" class="uni_14">{{item.name}}</text>
						<text v-if="i==activeSubTab[activeTab]" class="iconfont gou">&#xe62d;</text>
					</view>
				</block>
			</view>
			<view :class="show? 'showMask': 'hideMask'" @tap="hide"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			sortTabList: {
				type: Array,
				default() {
					return []
				}
			},
			top: { //距离顶部位置
				type:Number,
				default() {
					return 0
				}
			}
		},
		data() {
			return {
				activeTab: -1,
				activeSubTab: this.sortTabList.map(_=>0), //默认选中第一个
				activeTabVal: '', // 传给后端的值
				showSubList: [],
				show: false
			}
		},
		methods: {
			calculate(num) {
				return uni.upx2px(num) + 'px'
			},
			handleShowSub(i, val) {
				this.showSubList = this.sortTabList[i].subTab;
				this.show = true;
				this.activeTab = i;
				this.activeTabVal = val;
			},
			handleChooseVal(i, val) {
				this.activeSubTab.splice(this.activeTab, 1, i)
				this.$emit('chooseItem', [this.activeTabVal, val])
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
	.showMask {
		height: calc(100% - 310upx);
	}
	.hideMask {
		height: 0;
	}

	.mli {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22upx 0;
		border-bottom: 1px solid rgba(238, 238, 238, 0.65);
	}

	.lione {
		background-color: #fff;
		padding: 10upx 40upx;

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
	}

	.boxa {
		position: relative;
		border-bottom: 1px solid rgba(238, 238, 238, 0.65);
		height: auto;
	}
	.boxa.fixed {
		position: fixed;
		width: 100%;
		z-index: 1024;
		height: auto;
	}
</style>
