(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a2c0c7ea"],{"695b":function(t,e,n){},f07f:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{appear:"",name:"move"}},[n("div",{staticClass:"publish-wrapper"},[n("div",{staticClass:"top"},[n("div",{staticClass:"cancel",on:{click:t.cancel}},[t._v("取消")]),n("div",{staticClass:"btn",on:{click:t.publish}},[t._v("发表")])]),n("div",{staticClass:"input-wrapper"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"text",attrs:{cols:"21",rows:"4",placeholder:"分享新鲜事...",maxlength:"80"},domProps:{value:t.content},on:{input:[function(e){e.target.composing||(t.content=e.target.value)},t.onInput]}}),n("div",{staticClass:"text-count"},[n("span",[t._v(t._s(this.textCount))]),t._v("/80 ")])]),n("div",{staticClass:"img-content"},[n("div",{staticClass:"upload-wrapper"},[n("cube-upload",{attrs:{action:t.action,max:5},on:{"file-click":t.selectPic,"file-removed":t.deletePic,"files-added":t.addPic,"file-error":t.uploadError,"file-success":t.uploadSuccess},model:{value:t.picList,callback:function(e){t.picList=e},expression:"picList"}})],1),n("div",{staticClass:"upload-count"},[n("span",[t._v(t._s(this.picList.length)+"/5")])])])])])},a=[],c=(n("4160"),n("159b"),n("96cf"),n("1da1")),i=n("37b0"),o=n("c40d"),r={data:function(){return{content:"",textCount:0,picList:[],action:{target:o["a"].baseURL+"post/uploadImgAliyun",headers:{"wec-access-token":Object(i["a"])("token")},fileName:"image",withCredentials:!0}}},methods:{cancel:function(){this.$router.push({name:"Post",params:{ispublish:!1}})},publish:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.content||0!==t.picList.length){e.next=3;break}return t.$createDialog({type:"alert",title:"提示",content:"不能上传空的内容"}).show(),e.abrupt("return");case 3:return n=[],t.picList.forEach((function(t){200===t.response.code&&t.response.result.url&&n.push(t.response.result)})),e.next=7,t.$store.dispatch("publishPost",{content:t.content,picList:n});case 7:s=e.sent,200===s.code?t.$router.push({name:"Post",params:{ispublish:!0}}):t.$createToast({type:"warn",txt:"发布失败",time:1e3});case 9:case"end":return e.stop()}}),e)})))()},onInput:function(){this.textCount=this.content.length},selectPic:function(){},addPic:function(){},deletePic:function(){},uploadError:function(){this.$createToast({type:"warn",txt:"上传失败",time:1e3})},uploadSuccess:function(){}}},u=r,l=(n("fce3"),n("2877")),p=Object(l["a"])(u,s,a,!1,null,"6d3cbbee",null);e["default"]=p.exports},fce3:function(t,e,n){"use strict";var s=n("695b"),a=n.n(s);a.a}}]);
//# sourceMappingURL=chunk-a2c0c7ea.4af02858.js.map