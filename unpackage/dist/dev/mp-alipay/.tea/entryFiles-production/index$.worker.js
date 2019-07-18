/*BUGME_START*/
const __BUGME_START__ = 1;
(function(){var CircularJSON=JSON,replacer=function(e,t){return void 0===t?"©undefined":null===t?"©null":t===-1/0?"©- Infinity":t===1/0?"©Infinity":"number"==typeof t&&isNaN(t)?"©NaN":"function"==typeof t?"©function":t};try{CircularJSON=eval('(function(JSON,RegExp){var specialChar="~",safeSpecialChar="\\\\x"+("0"+specialChar.charCodeAt(0).toString(16)).slice(-2),escapedSafeSpecialChar="\\\\"+safeSpecialChar,specialCharRG=new RegExp(safeSpecialChar,"g"),safeSpecialCharRG=new RegExp(escapedSafeSpecialChar,"g"),safeStartWithSpecialCharRG=new RegExp("(?:^|([^\\\\\\\\]))"+escapedSafeSpecialChar),indexOf=[].indexOf||function(v){for(var i=this.length;i--&&this[i]!==v;);return i},$String=String;function generateReplacer(value,replacer,resolve){var doNotIgnore=false,inspect=!!replacer,path=[],all=[value],seen=[value],mapp=[resolve?specialChar:"[Circular]"],last=value,lvl=1,i,fn;if(inspect){fn=typeof replacer==="object"?function(key,value){return key!==""&&replacer.indexOf(key)<0?void 0:value}:replacer}return function(key,value){if(inspect)value=fn.call(this,key,value);if(doNotIgnore){if(last!==this){i=lvl-indexOf.call(all,this)-1;lvl-=i;all.splice(lvl,all.length);path.splice(lvl-1,path.length);last=this}if(typeof value==="object"&&value){if(indexOf.call(all,value)<0){all.push(last=value)}lvl=all.length;i=indexOf.call(seen,value);if(i<0){i=seen.push(value)-1;if(resolve){path.push((""+key).replace(specialCharRG,safeSpecialChar));mapp[i]=specialChar+path.join(specialChar)}else{mapp[i]=mapp[0]}}else{value=mapp[i]}}else{if(typeof value==="string"&&resolve){value=value.replace(safeSpecialChar,escapedSafeSpecialChar).replace(specialChar,safeSpecialChar)}}}else{doNotIgnore=true}return value}}function retrieveFromPath(current,keys){for(var i=0,length=keys.length;i<length;current=current[keys[i++].replace(safeSpecialCharRG,specialChar)]);return current}function generateReviver(reviver){return function(key,value){var isString=typeof value==="string";if(isString&&value.charAt(0)===specialChar){return new $String(value.slice(1))}if(key==="")value=regenerate(value,value,{});if(isString)value=value.replace(safeStartWithSpecialCharRG,"$1"+specialChar).replace(escapedSafeSpecialChar,safeSpecialChar);return reviver?reviver.call(this,key,value):value}}function regenerateArray(root,current,retrieve){for(var i=0,length=current.length;i<length;i++){current[i]=regenerate(root,current[i],retrieve)}return current}function regenerateObject(root,current,retrieve){for(var key in current){if(current.hasOwnProperty(key)){current[key]=regenerate(root,current[key],retrieve)}}return current}function regenerate(root,current,retrieve){return current instanceof Array?regenerateArray(root,current,retrieve):current instanceof $String?current.length?retrieve.hasOwnProperty(current)?retrieve[current]:retrieve[current]=retrieveFromPath(root,current.split(specialChar)):root:current instanceof Object?regenerateObject(root,current,retrieve):current}var CircularJSON={stringify:function stringify(value,replacer,space,doNotResolve){return CircularJSON.parser.stringify(value,generateReplacer(value,replacer,!doNotResolve),space)},parse:function parse(text,reviver){return CircularJSON.parser.parse(text,generateReviver(reviver))},parser:JSON};return CircularJSON})(JSON,RegExp)')}catch(e){console.error(e)}var OriginalFunction=Function,OriginalFetch=self.fetch,OriginalBridgeCall=self.AlipayJSBridge&&self.AlipayJSBridge.call,callInternalAPI=function(e,t){var n={data:{method:e,param:t},action:"internalAPI"},r=encodeURIComponent(JSON.stringify(n));OriginalFetch?OriginalFetch("https://alipay.kylinBridge/?data="+r,{mode:"no-cors"}).then(function(){}).catch(function(){}):OriginalBridgeCall("internalAPI",{method:e,param:t})},eventHandler=function(e){try{if(e.fromVConsoleToWorker){var t=e.requestId;if("exec"===e.method){try{new OriginalFunction("requestId","sendBack","\n              const res = "+e.script+";\n              console.log(res);\n            ")(t,function(e){return callInternalAPI("tinyDebugConsole",{type:"msgFromWorkerToVConsole",content:CircularJSON.stringify({requestId:t,returnValue:e},replacer)})})}catch(e){console.error(e.name+":"+e.message)}}}}catch(e){}};setTimeout(function(){self.document&&self.document.addEventListener("push",function(e){try{eventHandler(JSON.parse(e.data.param.content))}catch(e){}}),self.addEventListener("push",function(e){try{var t=JSON.parse(JSON.parse(e.data.text()).param.data.content);eventHandler(t)}catch(e){}})},10),["log","info","error","debug","warn"].forEach(function(e){var t="o"+e;console[t]||(console[t]=console[e],console[e]=function(){for(var n,r=arguments.length,o=Array(r),a=0;a<r;a++)o[a]=arguments[a];(n=console)[t].apply(n,o);var i=void 0;try{i=CircularJSON.stringify(o.map(function(e){return e instanceof Error?e.name+": "+e.message:e}),replacer)}catch(e){return void console.error(e.name+": "+e.message)}callInternalAPI("tinyDebugConsole",{content:i,type:"console_"+e})})})})();
const __BUGME_END__ = 1;
/*BUGME_END*/if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../..//app');
require('../../components/wuc-tab/wuc-tabs');
require('../../components/uni-popup/show_hw');
require('../../components/common/head-tab/head-tab');
require('../../components/common/sort-tab/sort-tab');
require('../../components/common/uni-popup/uni-popup');
require('../../components/gaoyia-parse/components/wxParseImg');
require('../../components/gaoyia-parse/components/wxParseVideo');
require('../../components/gaoyia-parse/components/wxParseAudio');
require('../../components/gaoyia-parse/components/wxParseTable');
require('../../components/gaoyia-parse/components/wxParseTemplate11');
require('../../components/gaoyia-parse/components/wxParseTemplate10');
require('../../components/gaoyia-parse/components/wxParseTemplate9');
require('../../components/gaoyia-parse/components/wxParseTemplate8');
require('../../components/gaoyia-parse/components/wxParseTemplate7');
require('../../components/gaoyia-parse/components/wxParseTemplate6');
require('../../components/gaoyia-parse/components/wxParseTemplate5');
require('../../components/gaoyia-parse/components/wxParseTemplate4');
require('../../components/gaoyia-parse/components/wxParseTemplate3');
require('../../components/gaoyia-parse/components/wxParseTemplate2');
require('../../components/gaoyia-parse/components/wxParseTemplate1');
require('../../components/gaoyia-parse/components/wxParseTemplate0');
require('../../components/gaoyia-parse/parse');
require('../../components/crosswiseTab');
require('../../components/scenicArea-components/scenicArea-item');
require('../../components/tourGuide/tourGuide');
require('../../components/common/pulldown/pulldown');
require('../../components/common/rate/uni-icon/uni-icon');
require('../../components/common/rate/uni-rate/uni-rate');
require('../../components/common/my-popup/my-popup');
require('../../components/consult/consult-item');
require('../../components/culture/culture-item');
require('../../components/virtualTravel/virtualTravel');
require('../../components/journey/journey');
require('../../components/strategy/strategy');
require('../../components/YnComponents/ynGallery/ynGallery');
require('../../components/reserve-date/uni-icon');
require('../../components/reserve-date/reserve-date');
require('../../components/createComment');
require('../../components/lz-numinput/lz-numinput');
require('../../components/added');
require('../../components/popup-layer');
require('../../pages/index/index');
require('../../pages/mine/mine');
require('../../pages/hotel/hotelList');
require('../../pages/specialFood/specialFoodDetail');
require('../../pages/specialFood/specialFoodList');
require('../../pages/shop/shopList');
require('../../pages/ticket/ticketList');
require('../../pages/shop/shopDetail');
require('../../pages/hotel/hotelDetail');
require('../../pages/quanjin/quanjin');
require('../../pages/scenicArea/scenicArea');
require('../../pages/scenicArea/scenicareaParticulars');
require('../../pages/tourGuide/tourGuide');
require('../../pages/tourGuide/tourGuideParticulars');
require('../../pages/consult/consult');
require('../../pages/consult/consultParticulars');
require('../../pages/culture/culture');
require('../../pages/culture/cultureParticulars');
require('../../pages/virtualTravel/virtualTravel');
require('../../pages/journey/journey');
require('../../pages/journey/journeyParticulars');
require('../../pages/strategy/strategy');
require('../../pages/strategy/strategyParticulars');
require('../../pages/ticket/ticketDetail');
require('../../pages/ticket/feizhuticket');
require('../../pages/orderCenter/orderCenter');
require('../../pages/nothing/nothing');
require('../../pages/nothing/huerNothing');
require('../../pages/orderCenter/orderDetail');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}