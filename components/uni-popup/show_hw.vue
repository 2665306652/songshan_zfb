<template>
	<view>
		<view class="uni-mask">
			<view class="">
				
			</view>
		</view>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tabs.vue';

export default {
  name: 'UniPopup',
  props: {
    /**
			 * 页面显示
			 */
    show: {
      type: Boolean,
      default: false
    },
    /**
			 * 对齐方式
			 */
    position: {
      type: String,
      // top - 顶部， middle - 居中, bottom - 底部
      default: 'middle'
    },
    /**
			 * 显示模式
			 */
    mode: {
      type: String,
      default: 'insert'
    },
    /**
			 * 额外信息
			 */
    msg: {
      type: String,
      default: ''
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
  data () {
    return {
      offsetTop: 0
    }
  },
  watch: {
    h5Top (newVal) {
      if (newVal) {
        this.offsetTop = 44
      } else {
        this.offsetTop = 0
      }
    }
  },
  created () {
    
  },
  methods: {
    
  },
	components: { WucTab },
}
</script>

<style>
	.uni-mask {
			position: fixed;
			z-index: 998;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.3);
		}
	
	
</style>
