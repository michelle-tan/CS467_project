(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f914077"],{"049f":function(t,e,s){"use strict";var n=s("4f4f"),r=s.n(n);r.a},"0759":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{staticStyle:{"margin-bottom":"20px"}},[s("b-row",{attrs:{"align-h":"end"}},[s("b-col",{attrs:{"offset-md":"7",sm:"2","offset-sm":"8",cols:"4",offset:"4"}},[s("strong",[t._v("Subtotal: ")])]),s("b-col",[t._v("\n            $ "+t._s(t.subtotal)+" \n        ")])],1),s("b-row",[s("b-col",{attrs:{"offset-md":"7",sm:"2","offset-sm":"8",cols:"4",offset:"4"}},[s("strong",[t._v("Shipping: ")])]),s("b-col",[this.shipping?s("div",[t._v(" $ "+t._s(t.shipping)+" ")]):s("div",[t._v(" FREE! ")])])],1),s("b-row",[s("b-col",{attrs:{"offset-md":"7",sm:"2","offset-sm":"8",cols:"4",offset:"4"}},[s("strong",[t._v("Tax: ")])]),s("b-col",[t._v("\n            $ "+t._s(t.tax)+" \n        ")])],1),s("b-row",[s("b-col",{attrs:{"offset-md":"7",sm:"2","offset-sm":"8",cols:"4",offset:"4"}},[s("strong",[t._v("Total: ")])]),s("b-col",[t._v("\n            $ "+t._s(t.total)+" \n        ")])],1)],1)},r=[],o=s("59ad"),i=s.n(o),a={props:{items:Array},computed:{subtotal:function(){for(var t=0,e=0;e<this.items.length;e++)t+=this.items[e].unitPrice*this.items[e].qty;return t.toFixed(2)},tax:function(){return(.1*this.subtotal).toFixed(2)},shipping:function(){return this.subtotal>=50?0:5.99.toFixed(2)},total:function(){return(i()(this.subtotal)+i()(this.tax)+i()(this.shipping)).toFixed(2)}}},c=a,l=s("2877"),u=Object(l["a"])(c,n,r,!1,null,null,null);e["a"]=u.exports},"0a90":function(t,e,s){var n=s("63b6"),r=s("10ff");n(n.G+n.F*(parseFloat!=r),{parseFloat:r})},"10ff":function(t,e,s){var n=s("e53d").parseFloat,r=s("a1ce").trim;t.exports=1/n(s("e692")+"-0")!==-1/0?function(t){var e=r(String(t),3),s=n(e);return 0===s&&"-"==e.charAt(0)?-0:s}:n},"4f4f":function(t,e,s){},"59ad":function(t,e,s){t.exports=s("7be7")},"713d":function(t,e,s){"use strict";var n=s("b39d"),r=s.n(n);r.a},"7be7":function(t,e,s){s("0a90"),t.exports=s("584a").parseFloat},"890f":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-table",{attrs:{items:t.items,fields:t.fields},scopedSlots:t._u([{key:"item",fn:function(e){return[s("b-container",[s("b-row",{attrs:{"align-h":"start"}},[s("b-col",{attrs:{cols:"6"}},[s("b-img",{staticClass:"product-thumbnail",attrs:{src:e.item.img}})],1),s("b-col",{staticStyle:{padding:"0"},attrs:{cols:"6"}},[s("div",{staticClass:"text-left"},[s("strong",[t._v(" "+t._s(e.item.title)+" ")]),s("br"),s("div",{staticClass:"text-muted"},[t._v(" Color: "+t._s(e.item.color))]),s("div",{staticClass:"text-muted"},[t._v(" Size:\n                             "),e.item.size?s("span",[t._v(t._s(e.item.size))]):s("span",[t._v("N/A")])])])])],1)],1)]}}])})},r=[],o={props:{items:Array},data:function(){return{fields:[{key:"item",label:"Item",class:"item-col"},{key:"unitPrice",label:"Price",formatter:function(t){return"$ "+t}},{key:"qty",label:"Qty"},{key:"subtotal",label:"Subtotal",formatter:function(t,e,s){return"$ "+(s.qty*s.unitPrice).toFixed(2)}}]}}},i=o,a=(s("713d"),s("2877")),c=Object(a["a"])(i,n,r,!1,null,null,null);e["a"]=c.exports},a1ce:function(t,e,s){var n=s("63b6"),r=s("25eb"),o=s("294c"),i=s("e692"),a="["+i+"]",c="​",l=RegExp("^"+a+a+"*"),u=RegExp(a+a+"*$"),f=function(t,e,s){var r={},a=o(function(){return!!i[t]()||c[t]()!=c}),l=r[t]=a?e(b):i[t];s&&(r[s]=l),n(n.P+n.F*a,"String",r)},b=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=f},b39d:function(t,e,s){},b789:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{attrs:{fluid:""}},[s("div",{staticClass:"h2 text-left title-text"},[t._v("Your Cart:")]),s("b-row",[s("b-col",[s("ItemsTable",{attrs:{items:t.sessionData.cart}}),s("hr")],1)],1),s("b-row",[s("b-col",[s("PriceSummary",{attrs:{items:t.sessionData.cart}})],1)],1)],1)},r=[],o=s("890f"),i=s("0759"),a={components:{ItemsTable:o["a"],PriceSummary:i["a"]},props:{sessionData:Object},data:function(){return{}},computed:{}},c=a,l=(s("049f"),s("2877")),u=Object(l["a"])(c,n,r,!1,null,null,null);e["default"]=u.exports},e692:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-1f914077.365043e2.js.map