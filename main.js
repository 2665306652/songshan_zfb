import Vue from 'vue'
import App from './App'
import { requestWB as uniRequest, requestZT as ztRequest } from 'uni-request';
Vue.config.productionTip = false

uniRequest.defaults.baseURL = 'https://littletest.allinkgo.com/songshan';//外包 测试地址
ztRequest.defaults.baseURL = 'https://test.allinkgo.com/qmcy'; //中台 测试地址
// uniRequest.defaults.baseURL = 'https://littleadmin.allinkgo.com/songshan';//外包 生产地址
// ztRequest.defaults.baseURL = 'https://api.allinkgo.com/qmcy'; //中台 生产地址

// ztRequest.defaults.baseURL = 'http://192.168.1.5:8080/qmcy'; //本地 xj  // http://3t6ks2.natappfree.cc/qmcy
// ztRequest.defaults.baseURL = 'http://192.168.8.179:8080/qmcy'; //本地 sd
// ztRequest.defaults.baseURL = 'http://192.168.8.164:8080/qmcy'; //本地 hy

// uniRequest.defaults.baseURL = 'http://192.168.8.179:8080/qmcy'；
// ztRequest.defaults.baseURL = 'http://192.168.8.179:8080/qmcy'; 
try {
	const token = uni.getStorageSync('token');
	if (token) {
		uniRequest.defaults.headers['token'] = token;
		ztRequest.defaults.headers['token'] = token;
	}
} catch (e) {
	// error
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()