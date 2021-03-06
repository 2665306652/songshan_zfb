if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


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