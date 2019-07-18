<script>
	export default {
		
		onLaunch: function() {
			console.log('App Launch')
			
			
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		
		}
	}
</script>

<style>

	/*每个页面公共css */
	@import url("/components/gaoyia-parse/parse.css");

	@font-face {
	    font-family: 'iconfont';
	    src:  url('//at.alicdn.com/t/font_1230937_7yfnhdct8ds.ttf') format('truetype');
	}
	.iconfont {
	    font-family: iconfont;
	    margin-right: 5upx;
		font-size: 35upx;
	}
	/* 暂无数据 */
	.nothing-wrap {
		margin-top: 45upx;
		text-align: center;
		font-size: 30upx;
	}
	.center30{
		margin: 0 30upx;
	}
</style>
