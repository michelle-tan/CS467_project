(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f77fbe5"],{"11e9":function(t,e,r){var a=r("52a7"),s=r("4630"),n=r("6821"),o=r("6a99"),i=r("69a8"),c=r("c69a"),u=Object.getOwnPropertyDescriptor;e.f=r("9e1e")?u:function(t,e){if(t=n(t),e=o(e,!0),c)try{return u(t,e)}catch(r){}if(i(t,e))return s(!a.f.call(t,e),t[e])}},"40f8":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("b-container",t._l(t.chunkedList,function(e,a){return r("b-row",{key:a,ref:"rows",refInFor:!0,staticClass:"rows"},t._l(e,function(t,e){return r("b-col",{key:e,staticClass:"columns",attrs:{sm:"auto"}},[r("ProductCard",{staticClass:"item-container",attrs:{productObject:t}})],1)}),1)}),1),t.showcontrols?r("div",[r("b-button",{attrs:{variant:"primary"},on:{click:t.goToPrev}},[t._v("Prev")]),t._l(t.pages,function(e){return r("span",{key:e,staticClass:"nav-number",class:[e===t.currentPage+1?"current":""],on:{click:function(r){return t.setCurrPage(e-1)}}},[t._v(t._s(e))])}),r("b-button",{attrs:{variant:"primary"},on:{click:t.goToNext}},[t._v("Next")])],2):t._e()],1)},s=[],n=(r("c5f6"),r("e915")),o={name:"ProductGrid",components:{ProductCard:n["a"]},data:function(){return{rows:0,displayList:[],pages:0,currentPage:0,showcontrols:!0}},props:{productObjectArray:{type:Array,required:!0},cols:{type:Number,default:4},itemsToDisplay:{type:Number,default:12}},mounted:function(){var t=this;this.$nextTick(function(){var e=Math.ceil(t.productObjectArray.length/t.itemsToDisplay);t.$set(t.$data,"pages",e),1===t.pages&&(t.showcontrols=!1);var r=t.productObjectArray.slice(0,t.itemsToDisplay);t.$set(t.$data,"displayList",r);var a=Math.ceil(t.displayList.length/t.cols);t.$set(t.$data,"rows",a)})},computed:{chunkedList:function(){for(var t=[],e=0;e<this.rows;e++)t.push(this.displayList.slice(e*this.cols,e*this.cols+this.cols));return t}},methods:{findEndSlice:function(t,e){return t<e?t:e},calcNewDisplayList:function(){var t=this.currentPage*this.itemsToDisplay,e=t+this.itemsToDisplay;return e>this.productObjectArray.length&&(e=this.productObjectArray.length),this.productObjectArray.slice(t,e)},goToPrev:function(){0!==this.currentPage&&(this.currentPage--,this.$set(this.$data,"displayList",this.calcNewDisplayList()))},goToNext:function(){this.currentPage!==this.pages-1&&(this.currentPage++,this.$set(this.$data,"displayList",this.calcNewDisplayList()))},setCurrPage:function(t){this.$set(this.$data,"currentPage",t),this.$set(this.$data,"displayList",this.calcNewDisplayList())}}},i=o,c=(r("9254"),r("2877")),u=Object(c["a"])(i,a,s,!1,null,"7f777dae",null);e["a"]=u.exports},"5dbc":function(t,e,r){var a=r("d3f4"),s=r("8b97").set;t.exports=function(t,e,r){var n,o=e.constructor;return o!==r&&"function"==typeof o&&(n=o.prototype)!==r.prototype&&a(n)&&s&&s(t,n),t}},"64b4":function(t,e,r){"use strict";var a=r("baf3"),s=r.n(a);s.a},"7f7f":function(t,e,r){var a=r("86cc").f,s=Function.prototype,n=/^\s*function ([^ (]*)/,o="name";o in s||r("9e1e")&&a(s,o,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(t){return""}}})},8562:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("StoreFrontBanner",{attrs:{storename:t.storeName}}),r("div",{staticClass:"container"},[r("hr"),t.valid?r("ProductGrid",{attrs:{productObjectArray:t.storeProducts}}):t._e(),t.errorDisplay?r("h1",[t._v("Error: Shopname "+t._s(t.storeName)+" does not exist.")]):t._e()],1)],1)},s=[],n=r("bc3a"),o=r.n(n),i=r("40f8"),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("img",{attrs:{src:t.setBackgroundImage,alt:"Banner-Image",id:"bannerImage"}}),r("b-container",{staticClass:"bannerWrapper"},[r("b-row",[r("b-col",[r("div",{staticClass:"shopImgContainer"},[r("img",{staticClass:"shopImg img-responsive",attrs:{src:t.getPathToSrc(this.shopImage),alt:"No Image Found"}})])]),r("b-col",{attrs:{cols:"8"}},[r("div",[r("h4",{attrs:{id:"shopname"}},[t._v(t._s(this.shopName||"SHOP_NAME"))])]),r("div",{attrs:{id:"description"}},[t._v(t._s(this.shopDesc||"SHOP_DESC"))]),r("div",[r("font-awesome-icon",{attrs:{icon:"map-marker-alt"}}),t._v("\n          "+t._s(this.shopAddress||"A City, Some State")+"\n        ")],1)]),r("b-col",{staticClass:"text-center"},[r("div",[r("h5",[t._v("Shop Owner")])]),r("div",{},[r("img",{staticClass:"ownerImg img-responsive",attrs:{src:t.getPathToSrcProfile(this.ownerImage),alt:"No Image Found"}})]),r("div",[t._v(t._s(this.ownerName||"OWNER_NAME"))])])],1)],1)],1)},u=[],d=(r("7f7f"),{name:"StoreFrontBanner",data:function(){return{shopImage:"",shopName:"",shopDesc:"",shopAddress:"",ownerImage:"",ownerName:""}},props:{storename:String},created:function(){var t=this;this.$nextTick(function(){o.a.get(t.$hostname+"/shop/lookup/".concat(t.storename)).then(function(e){t.$set(t.$data,"shopName",e.data.name),t.$set(t.$data,"shopDesc",e.data.description),t.$set(t.$data,"shopImage",e.data.image_path);var r=e.data.owner.id;return o.a.get(t.$hostname+"/getuser/".concat(r))}).then(function(e){console.log(e.data);var r="".concat(e.data.firstName," ").concat(e.data.lastName),a="".concat(e.data.addresses[0].city,", ").concat(e.data.addresses[0].state),s=e.data.profile_image;t.$set(t.$data,"ownerName",r),t.$set(t.$data,"ownerImage",s),t.$set(t.$data,"shopAddress",a)}).catch(function(t){})})},methods:{getPathToSrc:function(t){return this.$hostname+"/images/products/"+t},getPathToSrcProfile:function(t){return this.$hostname+"/images/profile_images/"+t}},computed:{setBackgroundImage:function(){var t="https://picsum.photos/2000/325";return t}}}),l=d,p=(r("88e5"),r("2877")),f=Object(p["a"])(l,c,u,!1,null,null,null),h=f.exports,m={name:"StoreFront",components:{ProductGrid:i["a"],StoreFrontBanner:h},data:function(){return{storeName:this.$route.params.storename,storeProducts:[],valid:!1,errorDisplay:!1}},props:{},mounted:function(){var t=this;this.$nextTick(function(){o()({method:"GET",url:t.$hostname+"/shop/".concat(t.$route.params.storename,"/products")}).then(function(e){200==e.status?(t.$set(t.$data,"storeProducts",e.data),t.$set(t.$data,"valid",!0)):(t.$set(t.$data,"errorDisplay",!0),console.log("Error: ".concat(e.status," received")))}).catch(function(t){console.log(t)})})}},g=m,v=Object(p["a"])(g,a,s,!1,null,null,null);e["default"]=v.exports},"88e5":function(t,e,r){"use strict";var a=r("d7eb"),s=r.n(a);s.a},"8b97":function(t,e,r){var a=r("d3f4"),s=r("cb7c"),n=function(t,e){if(s(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(s){e=!0}return function(t,r){return n(t,r),e?t.__proto__=r:a(t,r),t}}({},!1):void 0),check:n}},9093:function(t,e,r){var a=r("ce10"),s=r("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return a(t,s)}},9254:function(t,e,r){"use strict";var a=r("ee7d"),s=r.n(a);s.a},aa77:function(t,e,r){var a=r("5ca1"),s=r("be13"),n=r("79e5"),o=r("fdef"),i="["+o+"]",c="​",u=RegExp("^"+i+i+"*"),d=RegExp(i+i+"*$"),l=function(t,e,r){var s={},i=n(function(){return!!o[t]()||c[t]()!=c}),u=s[t]=i?e(p):o[t];r&&(s[r]=u),a(a.P+a.F*i,"String",s)},p=l.trim=function(t,e){return t=String(s(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(d,"")),t};t.exports=l},baf3:function(t,e,r){},c5f6:function(t,e,r){"use strict";var a=r("7726"),s=r("69a8"),n=r("2d95"),o=r("5dbc"),i=r("6a99"),c=r("79e5"),u=r("9093").f,d=r("11e9").f,l=r("86cc").f,p=r("aa77").trim,f="Number",h=a[f],m=h,g=h.prototype,v=n(r("2aeb")(g))==f,b="trim"in String.prototype,_=function(t){var e=i(t,!1);if("string"==typeof e&&e.length>2){e=b?e.trim():p(e,3);var r,a,s,n=e.charCodeAt(0);if(43===n||45===n){if(r=e.charCodeAt(2),88===r||120===r)return NaN}else if(48===n){switch(e.charCodeAt(1)){case 66:case 98:a=2,s=49;break;case 79:case 111:a=8,s=55;break;default:return+e}for(var o,c=e.slice(2),u=0,d=c.length;u<d;u++)if(o=c.charCodeAt(u),o<48||o>s)return NaN;return parseInt(c,a)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof h&&(v?c(function(){g.valueOf.call(r)}):n(r)!=f)?o(new m(_(e)),r,h):_(e)};for(var y,$=r("9e1e")?u(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;$.length>N;N++)s(m,y=$[N])&&!s(h,y)&&l(h,y,d(m,y));h.prototype=g,g.constructor=h,r("2aba")(a,f,h)}},d7eb:function(t,e,r){},e915:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"productbox"},[r("b-link",{attrs:{to:t.itemLink}},[r("div",{staticClass:"thumbnail"},[r("img",{staticClass:"cardImage img-responsive",attrs:{src:t.getPathToSrc(t.productObject.image),alt:"No Image Found"}})])]),r("div",{staticClass:"productinfo"},[r("div",{staticClass:"producttitle"},[t._v(t._s(t.productObject.name||"PRODUCT_NAME"))]),r("div",{staticClass:"productprice"},[r("b-button",{staticClass:"float-right detailButton",attrs:{variant:"info"}},[r("b-link",{staticClass:"detailsButton",attrs:{to:t.itemLink}},[t._v("Details")])],1),r("div",{staticClass:"pricetext"},[t._v("$"+t._s(t.productObject.Price||"0.00"))])],1)])],1)},s=[],n={name:"productCard",data:function(){return{itemLink:""}},props:{productObject:Object},watch:{productObject:function(t,e){var r="/products/item/".concat(t._id);this.$set(this.$data,"itemLink",r)}},created:function(){var t=this;this.$nextTick(function(){var e="/products/item/".concat(t.productObject._id);t.$set(t.$data,"itemLink",e)})},methods:{getPathToSrc:function(t){return this.$hostname+"/images/products/"+t}}},o=n,i=(r("64b4"),r("2877")),c=Object(i["a"])(o,a,s,!1,null,null,null);e["a"]=c.exports},ee7d:function(t,e,r){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-6f77fbe5.9692be6c.js.map