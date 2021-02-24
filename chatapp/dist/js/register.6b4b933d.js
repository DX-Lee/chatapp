(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{"3c35":function(t,e){(function(e){t.exports=e}).call(this,{})},"463a":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"register-wrapper"},[r("nav-head",{on:{leftClick:t.back},scopedSlots:t._u([{key:"left",fn:function(){return[r("i",{staticClass:"iconfont icon-arrow-left",staticStyle:{"font-size":"24px"}})]},proxy:!0}])}),r("div",{staticClass:"register-container"},[t._m(0),r("div",{staticClass:"input-box"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],attrs:{type:"text",placeholder:"账号长度为6-10位",maxlength:10},domProps:{value:t.account},on:{change:t.queryAccountIsExit,input:function(e){e.target.composing||(t.account=e.target.value)}}})]),r("div",{staticClass:"input-box"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"密码长度为8-13位",maxlength:13},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),r("div",{staticClass:"input-box"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.repeatPassword,expression:"repeatPassword"}],attrs:{type:"password",placeholder:"再次确认密码",maxlength:13},domProps:{value:t.repeatPassword},on:{input:function(e){e.target.composing||(t.repeatPassword=e.target.value)}}})]),r("div",{staticClass:"register-btn",on:{click:t.onRegister}},[r("i",{staticClass:"cubeic-arrow"})])])],1)},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"label"},[r("span",[t._v("新用户注册")])])}],o=(r("96cf"),r("1da1")),a=r("7aff"),n=r("8237"),c=r.n(n),h=r("e20a"),u={data:function(){return{account:"",password:"",repeatPassword:"",isAccountAvailable:!1}},components:{NavHead:a["a"]},methods:{onRegister:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.isAccountAvailable){e.next=3;break}return t.$createDialog({type:"alert",title:"账号不可用",content:"账号已存在"}).show(),e.abrupt("return");case 3:if(t.verify()){e.next=5;break}return e.abrupt("return");case 5:return e.prev=5,r=t.$createToast({time:0,txt:"注册中",mask:!0}),r.show(),e.next=10,t.$store.dispatch("onRegister",{account:t.account,password:c()(t.password)});case 10:s=e.sent,r.hide(),s&&200===s.code?(t.$router.push({path:"/message"}),t.$socket.emit("login",t.$store.state.user)):t.$createDialog({type:"alert",title:"注册失败",content:"注册失败请重试"}).show(),e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](5),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[5,15]])})))()},verify:function(){return this.account.length<6||this.account.length>10?(this.$createDialog({type:"alert",title:"账号长度不合法",content:"账号长度为6-10位"}).show(),!1):this.password.length<8||this.password.length>13?(this.$createDialog({type:"alert",title:"密码长度不合法",content:"密码长度为8-13位"}).show(),!1):this.repeatPassword===this.password||(this.$createDialog({type:"alert",title:"密码不一致",content:"两次输入密码不一致"}).show(),!1)},queryAccountIsExit:function(){var t=this;Object(h["d"])(this.account).then((function(e){200===e.code?t.isAccountAvailable=!0:(t.isAccountAvailable=!1,t.$createDialog({type:"alert",title:"账号已存在",content:"该账号已存在"}).show())}))},back:function(){this.$router.go(-1)}}},l=u,f=(r("7c9c"),r("2877")),_=Object(f["a"])(l,s,i,!1,null,"4b3b2261",null);e["default"]=_.exports},"6e2b":function(t,e,r){},"7aff":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"head-wrapper"},[r("div",{staticClass:"head-left",on:{click:t.leftClick}},[t._t("left")],2),r("div",{staticClass:"title"},[t._t("default",[t._v(t._s(t.title))])],2),r("div",{staticClass:"head-right",on:{click:t.rightClick}},[t._t("right")],2)])},i=[],o={props:{title:{type:String,default:""}},methods:{leftClick:function(){this.$emit("leftClick")},rightClick:function(){this.$emit("rightClick")}}},a=o,n=(r("b019"),r("2877")),c=Object(n["a"])(a,s,i,!1,null,"595ca198",null);e["a"]=c.exports},"7c9c":function(t,e,r){"use strict";var s=r("6e2b"),i=r.n(s);i.a},8237:function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */(function(){"use strict";var ERROR="input is invalid type",WINDOW="object"===typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"===typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"===typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&"object"===typeof module&&module.exports,AMD=__webpack_require__("3c35"),ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!==typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"===typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t){return function(e){return new Md5(!0).update(e)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Md5},t.update=function(e){return t.create().update(e)};for(var e=0;e<OUTPUT_TYPES.length;++e){var r=OUTPUT_TYPES[e];t[r]=createOutputMethod(r)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"===typeof t)return crypto.createHash("md5").update(t,"utf8").digest("hex");if(null===t||void 0===t)throw ERROR;return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash("md5").update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod};function Md5(t){if(t)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var e=new ArrayBuffer(68);this.buffer8=new Uint8Array(e),this.blocks=new Uint32Array(e)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(t){if(!this.finalized){var e,r=typeof t;if("string"!==r){if("object"!==r)throw ERROR;if(null===t)throw ERROR;if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!Array.isArray(t)&&(!ARRAY_BUFFER||!ArrayBuffer.isView(t)))throw ERROR;e=!0}var s,i,o=0,a=t.length,n=this.blocks,c=this.buffer8;while(o<a){if(this.hashed&&(this.hashed=!1,n[0]=n[16],n[16]=n[1]=n[2]=n[3]=n[4]=n[5]=n[6]=n[7]=n[8]=n[9]=n[10]=n[11]=n[12]=n[13]=n[14]=n[15]=0),e)if(ARRAY_BUFFER)for(i=this.start;o<a&&i<64;++o)c[i++]=t[o];else for(i=this.start;o<a&&i<64;++o)n[i>>2]|=t[o]<<SHIFT[3&i++];else if(ARRAY_BUFFER)for(i=this.start;o<a&&i<64;++o)s=t.charCodeAt(o),s<128?c[i++]=s:s<2048?(c[i++]=192|s>>6,c[i++]=128|63&s):s<55296||s>=57344?(c[i++]=224|s>>12,c[i++]=128|s>>6&63,c[i++]=128|63&s):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++o)),c[i++]=240|s>>18,c[i++]=128|s>>12&63,c[i++]=128|s>>6&63,c[i++]=128|63&s);else for(i=this.start;o<a&&i<64;++o)s=t.charCodeAt(o),s<128?n[i>>2]|=s<<SHIFT[3&i++]:s<2048?(n[i>>2]|=(192|s>>6)<<SHIFT[3&i++],n[i>>2]|=(128|63&s)<<SHIFT[3&i++]):s<55296||s>=57344?(n[i>>2]|=(224|s>>12)<<SHIFT[3&i++],n[i>>2]|=(128|s>>6&63)<<SHIFT[3&i++],n[i>>2]|=(128|63&s)<<SHIFT[3&i++]):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++o)),n[i>>2]|=(240|s>>18)<<SHIFT[3&i++],n[i>>2]|=(128|s>>12&63)<<SHIFT[3&i++],n[i>>2]|=(128|s>>6&63)<<SHIFT[3&i++],n[i>>2]|=(128|63&s)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[e>>2]|=EXTRA[3&e],e>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,t[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var t,e,r,s,i,o,a=this.blocks;this.first?(t=a[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,s=(-1732584194^2004318071&t)+a[1]-117830708,s=(s<<12|s>>>20)+t<<0,r=(-271733879^s&(-271733879^t))+a[2]-1126478375,r=(r<<17|r>>>15)+s<<0,e=(t^r&(s^t))+a[3]-1316259209,e=(e<<22|e>>>10)+r<<0):(t=this.h0,e=this.h1,r=this.h2,s=this.h3,t+=(s^e&(r^s))+a[0]-680876936,t=(t<<7|t>>>25)+e<<0,s+=(r^t&(e^r))+a[1]-389564586,s=(s<<12|s>>>20)+t<<0,r+=(e^s&(t^e))+a[2]+606105819,r=(r<<17|r>>>15)+s<<0,e+=(t^r&(s^t))+a[3]-1044525330,e=(e<<22|e>>>10)+r<<0),t+=(s^e&(r^s))+a[4]-176418897,t=(t<<7|t>>>25)+e<<0,s+=(r^t&(e^r))+a[5]+1200080426,s=(s<<12|s>>>20)+t<<0,r+=(e^s&(t^e))+a[6]-1473231341,r=(r<<17|r>>>15)+s<<0,e+=(t^r&(s^t))+a[7]-45705983,e=(e<<22|e>>>10)+r<<0,t+=(s^e&(r^s))+a[8]+1770035416,t=(t<<7|t>>>25)+e<<0,s+=(r^t&(e^r))+a[9]-1958414417,s=(s<<12|s>>>20)+t<<0,r+=(e^s&(t^e))+a[10]-42063,r=(r<<17|r>>>15)+s<<0,e+=(t^r&(s^t))+a[11]-1990404162,e=(e<<22|e>>>10)+r<<0,t+=(s^e&(r^s))+a[12]+1804603682,t=(t<<7|t>>>25)+e<<0,s+=(r^t&(e^r))+a[13]-40341101,s=(s<<12|s>>>20)+t<<0,r+=(e^s&(t^e))+a[14]-1502002290,r=(r<<17|r>>>15)+s<<0,e+=(t^r&(s^t))+a[15]+1236535329,e=(e<<22|e>>>10)+r<<0,t+=(r^s&(e^r))+a[1]-165796510,t=(t<<5|t>>>27)+e<<0,s+=(e^r&(t^e))+a[6]-1069501632,s=(s<<9|s>>>23)+t<<0,r+=(t^e&(s^t))+a[11]+643717713,r=(r<<14|r>>>18)+s<<0,e+=(s^t&(r^s))+a[0]-373897302,e=(e<<20|e>>>12)+r<<0,t+=(r^s&(e^r))+a[5]-701558691,t=(t<<5|t>>>27)+e<<0,s+=(e^r&(t^e))+a[10]+38016083,s=(s<<9|s>>>23)+t<<0,r+=(t^e&(s^t))+a[15]-660478335,r=(r<<14|r>>>18)+s<<0,e+=(s^t&(r^s))+a[4]-405537848,e=(e<<20|e>>>12)+r<<0,t+=(r^s&(e^r))+a[9]+568446438,t=(t<<5|t>>>27)+e<<0,s+=(e^r&(t^e))+a[14]-1019803690,s=(s<<9|s>>>23)+t<<0,r+=(t^e&(s^t))+a[3]-187363961,r=(r<<14|r>>>18)+s<<0,e+=(s^t&(r^s))+a[8]+1163531501,e=(e<<20|e>>>12)+r<<0,t+=(r^s&(e^r))+a[13]-1444681467,t=(t<<5|t>>>27)+e<<0,s+=(e^r&(t^e))+a[2]-51403784,s=(s<<9|s>>>23)+t<<0,r+=(t^e&(s^t))+a[7]+1735328473,r=(r<<14|r>>>18)+s<<0,e+=(s^t&(r^s))+a[12]-1926607734,e=(e<<20|e>>>12)+r<<0,i=e^r,t+=(i^s)+a[5]-378558,t=(t<<4|t>>>28)+e<<0,s+=(i^t)+a[8]-2022574463,s=(s<<11|s>>>21)+t<<0,o=s^t,r+=(o^e)+a[11]+1839030562,r=(r<<16|r>>>16)+s<<0,e+=(o^r)+a[14]-35309556,e=(e<<23|e>>>9)+r<<0,i=e^r,t+=(i^s)+a[1]-1530992060,t=(t<<4|t>>>28)+e<<0,s+=(i^t)+a[4]+1272893353,s=(s<<11|s>>>21)+t<<0,o=s^t,r+=(o^e)+a[7]-155497632,r=(r<<16|r>>>16)+s<<0,e+=(o^r)+a[10]-1094730640,e=(e<<23|e>>>9)+r<<0,i=e^r,t+=(i^s)+a[13]+681279174,t=(t<<4|t>>>28)+e<<0,s+=(i^t)+a[0]-358537222,s=(s<<11|s>>>21)+t<<0,o=s^t,r+=(o^e)+a[3]-722521979,r=(r<<16|r>>>16)+s<<0,e+=(o^r)+a[6]+76029189,e=(e<<23|e>>>9)+r<<0,i=e^r,t+=(i^s)+a[9]-640364487,t=(t<<4|t>>>28)+e<<0,s+=(i^t)+a[12]-421815835,s=(s<<11|s>>>21)+t<<0,o=s^t,r+=(o^e)+a[15]+530742520,r=(r<<16|r>>>16)+s<<0,e+=(o^r)+a[2]-995338651,e=(e<<23|e>>>9)+r<<0,t+=(r^(e|~s))+a[0]-198630844,t=(t<<6|t>>>26)+e<<0,s+=(e^(t|~r))+a[7]+1126891415,s=(s<<10|s>>>22)+t<<0,r+=(t^(s|~e))+a[14]-1416354905,r=(r<<15|r>>>17)+s<<0,e+=(s^(r|~t))+a[5]-57434055,e=(e<<21|e>>>11)+r<<0,t+=(r^(e|~s))+a[12]+1700485571,t=(t<<6|t>>>26)+e<<0,s+=(e^(t|~r))+a[3]-1894986606,s=(s<<10|s>>>22)+t<<0,r+=(t^(s|~e))+a[10]-1051523,r=(r<<15|r>>>17)+s<<0,e+=(s^(r|~t))+a[1]-2054922799,e=(e<<21|e>>>11)+r<<0,t+=(r^(e|~s))+a[8]+1873313359,t=(t<<6|t>>>26)+e<<0,s+=(e^(t|~r))+a[15]-30611744,s=(s<<10|s>>>22)+t<<0,r+=(t^(s|~e))+a[6]-1560198380,r=(r<<15|r>>>17)+s<<0,e+=(s^(r|~t))+a[13]+1309151649,e=(e<<21|e>>>11)+r<<0,t+=(r^(e|~s))+a[4]-145523070,t=(t<<6|t>>>26)+e<<0,s+=(e^(t|~r))+a[11]-1120210379,s=(s<<10|s>>>22)+t<<0,r+=(t^(s|~e))+a[2]+718787259,r=(r<<15|r>>>17)+s<<0,e+=(s^(r|~t))+a[9]-343485551,e=(e<<21|e>>>11)+r<<0,this.first?(this.h0=t+1732584193<<0,this.h1=e-271733879<<0,this.h2=r-1732584194<<0,this.h3=s+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+e<<0,this.h2=this.h2+r<<0,this.h3=this.h3+s<<0)},Md5.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,s=this.h3;return HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,s=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&s,s>>8&255,s>>16&255,s>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),e=new Uint32Array(t);return e[0]=this.h0,e[1]=this.h1,e[2]=this.h2,e[3]=this.h3,t},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var t,e,r,s="",i=this.array(),o=0;o<15;)t=i[o++],e=i[o++],r=i[o++],s+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[63&(t<<4|e>>>4)]+BASE64_ENCODE_CHAR[63&(e<<2|r>>>6)]+BASE64_ENCODE_CHAR[63&r];return t=i[o],s+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[t<<4&63]+"==",s};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}).call(this,__webpack_require__("4362"),__webpack_require__("c8ba"))},b019:function(t,e,r){"use strict";var s=r("b8d1"),i=r.n(s);i.a},b8d1:function(t,e,r){}}]);
//# sourceMappingURL=register.6b4b933d.js.map