(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4737042a"],{"1f0f":function(t,e,r){},b059:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",{attrs:{fluid:""}},[r("div",{staticClass:"h1 text-left title-text"},[t._v("Order History")]),r("hr"),r("b-row",[r("b-col",[r("b-table",{attrs:{items:t.orders,fields:t.fields,hover:"",striped:"",responsive:""},on:{"row-clicked":t.displayOrder},scopedSlots:t._u([{key:"status",fn:function(e){return[e.item.dateShipped?r("div",[t._v("Order was shipped on "+t._s(t._f("formatDate")(e.item.dateShipped)))]):r("div",[t._v("Awaiting fulfillment")])]}}])})],1)],1)],1)},a=[],i={props:{orders:Array},data:function(){return{fields:[{key:"dateOrdered",label:"Order Date",formatter:function(t){var e=new Date(t);return e.toLocaleDateString("en-US")}},{key:"_id",label:"Order Number"},{key:"status",label:"Order Status"},{key:"total",label:"Order Total",formatter:function(t){return"$"+t.toFixed(2)}}]}},methods:{formatOrderStatus:function(t){return console.log(t),t.isShipped?"Shipped":"WIP"},displayOrder:function(t,e){this.$router.push(this.$route.path+"/"+e)}},filters:{formatDate:function(t){var e=new Date(t);return e.toLocaleDateString("en-US")}}},o=i,s=(r("cfc7"),r("2877")),d=Object(s["a"])(o,n,a,!1,null,null,null);e["default"]=d.exports},cfc7:function(t,e,r){"use strict";var n=r("1f0f"),a=r.n(n);a.a}}]);
//# sourceMappingURL=chunk-4737042a.ea5feefa.js.map