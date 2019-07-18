
<template>
	<view class="tab">
		<scroll-view scroll-x style="white-space:nowrap;" scroll-with-animation :scroll-left="tabIndex*30" class="srollStyle">
			<view :class="['tab_main', tabList.length <= 3 ? 'addStyle' : '']">
				<view class="tab_main_item" v-for="(item, index) in tabList" :key="index"  @click="tabSelect(index,item.id)" :data-current="index">
					<view style="display: inline-block;" :class="index == tabIndex ? 'tab_active' : ''" >
						{{ item.title }}
					</view>
				</view>
			</view>
			<!-- 		
			<view class="tab_main" style="display: inline-block;" :class="index == tabIdx ? 'tab_active' : ''" v-for="(item, index) in tabList" :key="index" @click="tabSelect(index)" :data-id="index">
				<view class="relative">
					<view class="name">{{ item.name }}</view>
					<view class="absolute bottomLine"></view>
				</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		tabList: {
			type: Array ,
			default: function(e){
				return []
			}
		},
		tabIndex:{
			type:Number,
			default: 0
		},
		tabActiveIdx: {
			type: Number,
			default: 0
		},
		isScroll: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// tabIndex:0,
			// scrollLeft: 0,
			scrollLeft: 0,
		};
	},
	watch: {
		tabActiveIdx(newValue, oldValue) {
			console.log('newValue', newValue);
			this.tabSelect(newValue,newCateid);
		}
	},
	methods: {
		tabSelect(newValue,newCateid) {
			var index  = newValue;
			// 具体的分类id
			var cateid =newCateid;
			this.scrollLeft = newValue * 30;
			
			this.$emit('tabSelect',index,cateid);
			// console.log( cateid,'id')
		}
	}
};
</script>
<style lang="less" scoped>
.tab {
	min-width: 100%;
	.addStyle {
		justify-content: space-around;
	}
	.srollStyle {
		border-bottom:1upx solid #EEEEEE;
	}
	.tab_main {	
		display: flex;
		align-items: center;
		// justify-content: space-around;
		font-size: 34upx;
		text-align: center;
		// border-bottom:1upx solid #EEEEEE;
		.tab_main_item {
			min-width:25%;
			padding:0 20upx;
			height: 97upx;
			line-height: 80upx;
			box-sizing:border-box;
			>view{
				line-height: 90upx;
				text-align:center;
				width:100%;
				&.tab_active {
					font-size: 32upx;
					font-weight: bold;
					color: #D39C66;
					border-bottom:4upx solid #D39C66;
					
				}
			}
		}
		
	}
	
}
</style>
