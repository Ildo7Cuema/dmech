import{d as Q,k as n,O as fe,R as ct,Q as Le,l as Z,S as be,T as me,f as u,r as N,w as A,a_ as dt,z as vt,av as ft,au as gt,o as bt,aj as mt,$ as xe,j as De,a$ as St,b0 as yt,b1 as ge,b2 as Be,b3 as ht,X as Ve,b4 as _t,b5 as ve,b6 as E,I as J,K as wt}from"./index.bc90a1a6.js";import{Q as qt}from"./QList.ac9043eb.js";import{u as Pt,a as Ct,c as Me,Q as kt}from"./QSelect.1664c3a2.js";import{u as Rt,a as Tt,b as xt}from"./use-fullscreen.28de194d.js";var Bt=Q({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:a,emit:r}){const g=Z(),{proxy:{$q:i}}=g,b=s=>{r("click",s)};return()=>{if(e.props===void 0)return n("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:b},fe(a.default));let s,d;const c=g.vnode.key;if(c){if(s=e.props.colsMap[c],s===void 0)return}else s=e.props.col;if(s.sortable===!0){const l=s.align==="right"?"unshift":"push";d=ct(a.default,[]),d[l](n(Le,{class:s.__iconClass,name:i.iconSet.table.arrowUp}))}else d=fe(a.default);const h={class:s.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:s.headerStyle,onClick:l=>{s.sortable===!0&&e.props.sort(s),b(l)}};return n("th",h,d)}}});const Ot=["horizontal","vertical","cell","none"];var Ft=Q({name:"QMarkupTable",props:{...be,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>Ot.includes(e)}},setup(e,{slots:a}){const r=Z(),g=me(e,r.proxy.$q),i=u(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(g.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>n("div",{class:i.value},[n("table",{class:"q-table"},fe(a.default))])}});function je(e,a){return n("div",e,[n("table",{class:"q-table"},a)])}const $t={list:qt,table:Ft},Lt=["list","table","__qtable"];var Dt=Q({name:"QVirtualScroll",props:{...Pt,type:{type:String,default:"list",validator:e=>Lt.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:{default:void 0}},setup(e,{slots:a,attrs:r}){let g;const i=N(null),b=u(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:s,localResetVirtualScroll:d,padVirtualScroll:c,onVirtualScrollEvt:h}=Ct({virtualScrollLength:b,getVirtualScrollTarget:P,getVirtualScrollEl:q}),l=u(()=>{if(b.value===0)return[];const O=(F,R)=>({index:s.value.from+R,item:F});return e.itemsFn===void 0?e.items.slice(s.value.from,s.value.to).map(O):e.itemsFn(s.value.from,s.value.to-s.value.from).map(O)}),m=u(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),w=u(()=>e.scrollTarget!==void 0?{}:{tabindex:0});A(b,()=>{d()}),A(()=>e.scrollTarget,()=>{S(),_()});function q(){return i.value.$el||i.value}function P(){return g}function _(){g=mt(q(),e.scrollTarget),g.addEventListener("scroll",h,xe.passive)}function S(){g!==void 0&&(g.removeEventListener("scroll",h,xe.passive),g=void 0)}function B(){let O=c(e.type==="list"?"div":"tbody",l.value.map(a.default));return a.before!==void 0&&(O=a.before().concat(O)),De(a.after,O)}return dt(()=>{d()}),vt(()=>{_()}),ft(()=>{_()}),gt(()=>{S()}),bt(()=>{S()}),()=>{if(a.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?je({ref:i,class:"q-table__middle "+m.value},B()):n($t[e.type],{...r,ref:i,class:[r.class,m.value],...w.value},B)}}});const Vt={xs:2,sm:4,md:6,lg:10,xl:14};function Oe(e,a,r){return{transform:a===!0?`translateX(${r.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var Mt=Q({name:"QLinearProgress",props:{...be,...St,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:a}){const{proxy:r}=Z(),g=me(e,r.$q),i=yt(e,Vt),b=u(()=>e.indeterminate===!0||e.query===!0),s=u(()=>e.reverse!==e.query),d=u(()=>({...i.value!==null?i.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),c=u(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),h=u(()=>Oe(e.buffer!==void 0?e.buffer:1,s.value,r.$q)),l=u(()=>`with${e.instantFeedback===!0?"out":""}-transition`),m=u(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${l.value} q-linear-progress__track--${g.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),w=u(()=>Oe(b.value===!0?1:e.value,s.value,r.$q)),q=u(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${l.value} q-linear-progress__model--${b.value===!0?"in":""}determinate`),P=u(()=>({width:`${e.value*100}%`})),_=u(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${l.value}`);return()=>{const S=[n("div",{class:m.value,style:h.value}),n("div",{class:q.value,style:w.value})];return e.stripe===!0&&b.value===!1&&S.push(n("div",{class:_.value,style:P.value})),n("div",{class:c.value,style:d.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},De(a.default,S))}}});function jt(e,a){return new Date(e)-new Date(a)}const At={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function Et(e,a,r,g){const i=u(()=>{const{sortBy:d}=a.value;return d&&r.value.find(c=>c.name===d)||null}),b=u(()=>e.sortMethod!==void 0?e.sortMethod:(d,c,h)=>{const l=r.value.find(q=>q.name===c);if(l===void 0||l.field===void 0)return d;const m=h===!0?-1:1,w=typeof l.field=="function"?q=>l.field(q):q=>q[l.field];return d.sort((q,P)=>{let _=w(q),S=w(P);return l.rawSort!==void 0?l.rawSort(_,S,q,P)*m:_==null?-1*m:S==null?1*m:l.sort!==void 0?l.sort(_,S,q,P)*m:ge(_)===!0&&ge(S)===!0?(_-S)*m:Be(_)===!0&&Be(S)===!0?jt(_,S)*m:typeof _=="boolean"&&typeof S=="boolean"?(_-S)*m:([_,S]=[_,S].map(B=>(B+"").toLocaleString().toLowerCase()),_<S?-1*m:_===S?0:m)})});function s(d){let c=e.columnSortOrder;if(ht(d)===!0)d.sortOrder&&(c=d.sortOrder),d=d.name;else{const m=r.value.find(w=>w.name===d);m!==void 0&&m.sortOrder&&(c=m.sortOrder)}let{sortBy:h,descending:l}=a.value;h!==d?(h=d,l=c==="da"):e.binaryStateSort===!0?l=!l:l===!0?c==="ad"?h=null:l=!1:c==="ad"?l=!0:h=null,g({sortBy:h,descending:l,page:1})}return{columnToSort:i,computedSortMethod:b,sort:s}}const Nt={filter:[String,Object],filterMethod:Function};function Qt(e,a){const r=u(()=>e.filterMethod!==void 0?e.filterMethod:(g,i,b,s)=>{const d=i?i.toLowerCase():"";return g.filter(c=>b.some(h=>{const l=s(h,c)+"";return(l==="undefined"||l==="null"?"":l.toLowerCase()).indexOf(d)!==-1}))});return A(()=>e.filter,()=>{Ve(()=>{a({page:1},!0)})},{deep:!0}),{computedFilterMethod:r}}function zt(e,a){for(const r in a)if(a[r]!==e[r])return!1;return!0}function Fe(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const Ht={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function Ut(e,a){const{props:r,emit:g}=e,i=N(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:r.rowsPerPageOptions.length!==0?r.rowsPerPageOptions[0]:5},r.pagination)),b=u(()=>{const l=r["onUpdate:pagination"]!==void 0?{...i.value,...r.pagination}:i.value;return Fe(l)}),s=u(()=>b.value.rowsNumber!==void 0);function d(l){c({pagination:l,filter:r.filter})}function c(l={}){Ve(()=>{g("request",{pagination:l.pagination||b.value,filter:l.filter||r.filter,getCellValue:a})})}function h(l,m){const w=Fe({...b.value,...l});if(zt(b.value,w)===!0){s.value===!0&&m===!0&&d(w);return}if(s.value===!0){d(w);return}r.pagination!==void 0&&r["onUpdate:pagination"]!==void 0?g("update:pagination",w):i.value=w}return{innerPagination:i,computedPagination:b,isServerSide:s,requestServerInteraction:c,setPagination:h}}function It(e,a,r,g,i,b){const{props:s,emit:d,proxy:{$q:c}}=e,h=u(()=>g.value===!0?r.value.rowsNumber||0:b.value),l=u(()=>{const{page:R,rowsPerPage:T}=r.value;return(R-1)*T}),m=u(()=>{const{page:R,rowsPerPage:T}=r.value;return R*T}),w=u(()=>r.value.page===1),q=u(()=>r.value.rowsPerPage===0?1:Math.max(1,Math.ceil(h.value/r.value.rowsPerPage))),P=u(()=>m.value===0?!0:r.value.page>=q.value),_=u(()=>(s.rowsPerPageOptions.includes(a.value.rowsPerPage)?s.rowsPerPageOptions:[a.value.rowsPerPage].concat(s.rowsPerPageOptions)).map(T=>({label:T===0?c.lang.table.allRows:""+T,value:T})));A(q,(R,T)=>{if(R===T)return;const z=r.value.page;R&&!z?i({page:1}):R<z&&i({page:R})});function S(){i({page:1})}function B(){const{page:R}=r.value;R>1&&i({page:R-1})}function O(){const{page:R,rowsPerPage:T}=r.value;m.value>0&&R*T<h.value&&i({page:R+1})}function F(){i({page:q.value})}return s["onUpdate:pagination"]!==void 0&&d("update:pagination",{...r.value}),{firstRowIndex:l,lastRowIndex:m,isFirstPage:w,isLastPage:P,pagesNumber:q,computedRowsPerPageOptions:_,computedRowsNumber:h,firstPage:S,prevPage:B,nextPage:O,lastPage:F}}const Kt={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},Wt=["update:selected","selection"];function Gt(e,a,r,g){const i=u(()=>{const P={};return e.selected.map(g.value).forEach(_=>{P[_]=!0}),P}),b=u(()=>e.selection!=="none"),s=u(()=>e.selection==="single"),d=u(()=>e.selection==="multiple"),c=u(()=>r.value.length!==0&&r.value.every(P=>i.value[g.value(P)]===!0)),h=u(()=>c.value!==!0&&r.value.some(P=>i.value[g.value(P)]===!0)),l=u(()=>e.selected.length);function m(P){return i.value[P]===!0}function w(){a("update:selected",[])}function q(P,_,S,B){a("selection",{rows:_,added:S,keys:P,evt:B});const O=s.value===!0?S===!0?_:[]:S===!0?e.selected.concat(_):e.selected.filter(F=>P.includes(g.value(F))===!1);a("update:selected",O)}return{hasSelectionMode:b,singleSelection:s,multipleSelection:d,allRowsSelected:c,someRowsSelected:h,rowsSelectedNumber:l,isRowSelected:m,clearSelection:w,updateSelection:q}}function $e(e){return Array.isArray(e)?e.slice():[]}const Xt={expanded:Array},pt=["update:expanded"];function Jt(e,a){const r=N($e(e.expanded));A(()=>e.expanded,s=>{r.value=$e(s)});function g(s){return r.value.includes(s)}function i(s){e.expanded!==void 0?a("update:expanded",s):r.value=s}function b(s,d){const c=r.value.slice(),h=c.indexOf(s);d===!0?h===-1&&(c.push(s),i(c)):h!==-1&&(c.splice(h,1),i(c))}return{isRowExpanded:g,setExpanded:i,updateExpanded:b}}const Yt={visibleColumns:Array};function Zt(e,a,r){const g=u(()=>{if(e.columns!==void 0)return e.columns;const d=e.rows[0];return d!==void 0?Object.keys(d).map(c=>({name:c,label:c.toUpperCase(),field:c,align:ge(d[c])?"right":"left",sortable:!0})):[]}),i=u(()=>{const{sortBy:d,descending:c}=a.value;return(e.visibleColumns!==void 0?g.value.filter(l=>l.required===!0||e.visibleColumns.includes(l.name)===!0):g.value).map(l=>{const m=l.align||"right",w=`text-${m}`;return{...l,align:m,__iconClass:`q-table__sort-icon q-table__sort-icon--${m}`,__thClass:w+(l.headerClasses!==void 0?" "+l.headerClasses:"")+(l.sortable===!0?" sortable":"")+(l.name===d?` sorted ${c===!0?"sort-desc":""}`:""),__tdStyle:l.style!==void 0?typeof l.style!="function"?()=>l.style:l.style:()=>null,__tdClass:l.classes!==void 0?typeof l.classes!="function"?()=>w+" "+l.classes:q=>w+" "+l.classes(q):()=>w}})}),b=u(()=>{const d={};return i.value.forEach(c=>{d[c.name]=c}),d}),s=u(()=>e.tableColspan!==void 0?e.tableColspan:i.value.length+(r.value===!0?1:0));return{colList:g,computedCols:i,computedColsMap:b,computedColspan:s}}const Y="q-table__bottom row items-center",Ae={};Me.forEach(e=>{Ae[e]={}});var nl=Q({name:"QTable",props:{rows:{type:Array,required:!0},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{default:void 0},...Ae,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...be,...Rt,...Yt,...Nt,...Ht,...Xt,...Kt,...At},emits:["request","virtualScroll",...Tt,...pt,...Wt],setup(e,{slots:a,emit:r}){const g=Z(),{proxy:{$q:i}}=g,b=me(e,i),{inFullscreen:s,toggleFullscreen:d}=xt(),c=u(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),h=N(null),l=N(null),m=u(()=>e.grid!==!0&&e.virtualScroll===!0),w=u(()=>" q-table__card"+(b.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),q=u(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":w.value)+(b.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(s.value===!0?" fullscreen scroll":"")),P=u(()=>q.value+(e.loading===!0?" q-table--loading":""));A(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+q.value,()=>{m.value===!0&&l.value!==null&&l.value.reset()});const{innerPagination:_,computedPagination:S,isServerSide:B,requestServerInteraction:O,setPagination:F}=Ut(g,M),{computedFilterMethod:R}=Qt(e,F),{isRowExpanded:T,setExpanded:z,updateExpanded:Ee}=Jt(e,r),ee=u(()=>{let t=e.rows;if(B.value===!0||t.length===0)return t;const{sortBy:o,descending:v}=S.value;return e.filter&&(t=R.value(t,e.filter,$.value,M)),Ue.value!==null&&(t=Ie.value(e.rows===t?t.slice():t,o,v)),t}),Se=u(()=>ee.value.length),D=u(()=>{let t=ee.value;if(B.value===!0)return t;const{rowsPerPage:o}=S.value;return o!==0&&(U.value===0&&e.rows!==t?t.length>I.value&&(t=t.slice(0,I.value)):t=t.slice(U.value,I.value)),t}),{hasSelectionMode:V,singleSelection:Ne,multipleSelection:ye,allRowsSelected:Qe,someRowsSelected:he,rowsSelectedNumber:te,isRowSelected:le,clearSelection:ze,updateSelection:H}=Gt(e,r,D,c),{colList:He,computedCols:$,computedColsMap:_e,computedColspan:we}=Zt(e,S,V),{columnToSort:Ue,computedSortMethod:Ie,sort:ae}=Et(e,S,He,F),{firstRowIndex:U,lastRowIndex:I,isFirstPage:ne,isLastPage:re,pagesNumber:K,computedRowsPerPageOptions:Ke,computedRowsNumber:W,firstPage:oe,prevPage:ie,nextPage:se,lastPage:ue}=It(g,_,S,B,F,Se),We=u(()=>D.value.length===0),Ge=u(()=>{const t={};return Me.forEach(o=>{t[o]=e[o]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function Xe(){m.value===!0&&l.value.reset()}function pe(){if(e.grid===!0)return st();const t=e.hideHeader!==!0?Re:null;if(m.value===!0){const v=a["top-row"],f=a["bottom-row"],y={default:k=>Pe(k.item,a.body,k.index)};if(v!==void 0){const k=n("tbody",v({cols:$.value}));y.before=t===null?()=>k:()=>[t()].concat(k)}else t!==null&&(y.before=t);return f!==void 0&&(y.after=()=>n("tbody",f({cols:$.value}))),n(Dt,{ref:l,class:e.tableClass,style:e.tableStyle,...Ge.value,scrollTarget:e.virtualScrollTarget,items:D.value,type:"__qtable",tableColspan:we.value,onVirtualScroll:Ye},y)}const o=[Ze()];return t!==null&&o.unshift(t()),je({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},o)}function Je(t,o){if(l.value!==null){l.value.scrollTo(t,o);return}t=parseInt(t,10);const v=h.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(v!==null){const f=h.value.querySelector(".q-table__middle.scroll"),y=v.offsetTop-e.virtualScrollStickySizeStart,k=y<f.scrollTop?"decrease":"increase";f.scrollTop=y,r("virtualScroll",{index:t,from:0,to:_.value.rowsPerPage-1,direction:k})}}function Ye(t){r("virtualScroll",t)}function qe(){return[n(Mt,{class:"q-table__linear-progress",color:e.color,dark:b.value,indeterminate:!0,trackColor:"transparent"})]}function Pe(t,o,v){const f=c.value(t),y=le(f);if(o!==void 0)return o(Ce({key:f,row:t,pageIndex:v,__trClass:y?"selected":""}));const k=a["body-cell"],C=$.value.map(x=>{const X=a[`body-cell-${x.name}`],p=X!==void 0?X:k;return p!==void 0?p(et({key:f,row:t,pageIndex:v,col:x})):n("td",{class:x.__tdClass(t),style:x.__tdStyle(t)},M(x,t))});if(V.value===!0){const x=a["body-selection"],X=x!==void 0?x(tt({key:f,row:t,pageIndex:v})):[n(ve,{modelValue:y,color:e.color,dark:b.value,dense:e.dense,"onUpdate:modelValue":(p,ut)=>{H([f],[t],p,ut)}})];C.unshift(n("td",{class:"q-table--col-auto-width"},X))}const L={key:f,class:{selected:y}};return e.onRowClick!==void 0&&(L.class["cursor-pointer"]=!0,L.onClick=x=>{r("RowClick",x,t,v)}),e.onRowDblclick!==void 0&&(L.class["cursor-pointer"]=!0,L.onDblclick=x=>{r("RowDblclick",x,t,v)}),e.onRowContextmenu!==void 0&&(L.class["cursor-pointer"]=!0,L.onContextmenu=x=>{r("RowContextmenu",x,t,v)}),n("tr",L,C)}function Ze(){const t=a.body,o=a["top-row"],v=a["bottom-row"];let f=D.value.map((y,k)=>Pe(y,t,k));return o!==void 0&&(f=o({cols:$.value}).concat(f)),v!==void 0&&(f=f.concat(v({cols:$.value}))),n("tbody",f)}function Ce(t){return ce(t),t.cols=t.cols.map(o=>E({...o},"value",()=>M(o,t.row))),t}function et(t){return ce(t),E(t,"value",()=>M(t.col,t.row)),t}function tt(t){return ce(t),t}function ce(t){Object.assign(t,{cols:$.value,colsMap:_e.value,sort:ae,rowIndex:U.value+t.pageIndex,color:e.color,dark:b.value,dense:e.dense}),V.value===!0&&E(t,"selected",()=>le(t.key),(o,v)=>{H([t.key],[t.row],o,v)}),E(t,"expand",()=>T(t.key),o=>{Ee(t.key,o)})}function M(t,o){const v=typeof t.field=="function"?t.field(o):o[t.field];return t.format!==void 0?t.format(v,o):v}const j=u(()=>({pagination:S.value,pagesNumber:K.value,isFirstPage:ne.value,isLastPage:re.value,firstPage:oe,prevPage:ie,nextPage:se,lastPage:ue,inFullscreen:s.value,toggleFullscreen:d}));function lt(){const t=a.top,o=a["top-left"],v=a["top-right"],f=a["top-selection"],y=V.value===!0&&f!==void 0&&te.value>0,k="q-table__top relative-position row items-center";if(t!==void 0)return n("div",{class:k},[t(j.value)]);let C;if(y===!0?C=f(j.value).slice():(C=[],o!==void 0?C.push(n("div",{class:"q-table__control"},[o(j.value)])):e.title&&C.push(n("div",{class:"q-table__control"},[n("div",{class:["q-table__title",e.titleClass]},e.title)]))),v!==void 0&&(C.push(n("div",{class:"q-table__separator col"})),C.push(n("div",{class:"q-table__control"},[v(j.value)]))),C.length!==0)return n("div",{class:k},C)}const ke=u(()=>he.value===!0?null:Qe.value);function Re(){const t=at();return e.loading===!0&&a.loading===void 0&&t.push(n("tr",{class:"q-table__progress"},[n("th",{class:"relative-position",colspan:we.value},qe())])),n("thead",t)}function at(){const t=a.header,o=a["header-cell"];if(t!==void 0)return t(de({header:!0})).slice();const v=$.value.map(f=>{const y=a[`header-cell-${f.name}`],k=y!==void 0?y:o,C=de({col:f});return k!==void 0?k(C):n(Bt,{key:f.name,props:C},()=>f.label)});if(Ne.value===!0&&e.grid!==!0)v.unshift(n("th",{class:"q-table--col-auto-width"}," "));else if(ye.value===!0){const f=a["header-selection"],y=f!==void 0?f(de({})):[n(ve,{color:e.color,modelValue:ke.value,dark:b.value,dense:e.dense,"onUpdate:modelValue":Te})];v.unshift(n("th",{class:"q-table--col-auto-width"},y))}return[n("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},v)]}function de(t){return Object.assign(t,{cols:$.value,sort:ae,colsMap:_e.value,color:e.color,dark:b.value,dense:e.dense}),ye.value===!0&&E(t,"selected",()=>ke.value,Te),t}function Te(t){he.value===!0&&(t=!1),H(D.value.map(c.value),D.value,t)}const G=u(()=>{const t=[e.iconFirstPage||i.iconSet.table.firstPage,e.iconPrevPage||i.iconSet.table.prevPage,e.iconNextPage||i.iconSet.table.nextPage,e.iconLastPage||i.iconSet.table.lastPage];return i.lang.rtl===!0?t.reverse():t});function nt(){if(e.hideBottom===!0)return;if(We.value===!0){if(e.hideNoData===!0)return;const v=e.loading===!0?e.loadingLabel||i.lang.table.loading:e.filter?e.noResultsLabel||i.lang.table.noResults:e.noDataLabel||i.lang.table.noData,f=a["no-data"],y=f!==void 0?[f({message:v,icon:i.iconSet.table.warning,filter:e.filter})]:[n(Le,{class:"q-table__bottom-nodata-icon",name:i.iconSet.table.warning}),v];return n("div",{class:Y+" q-table__bottom--nodata"},y)}const t=a.bottom;if(t!==void 0)return n("div",{class:Y},[t(j.value)]);const o=e.hideSelectedBanner!==!0&&V.value===!0&&te.value>0?[n("div",{class:"q-table__control"},[n("div",[(e.selectedRowsLabel||i.lang.table.selectedRecords)(te.value)])])]:[];if(e.hidePagination!==!0)return n("div",{class:Y+" justify-end"},ot(o));if(o.length!==0)return n("div",{class:Y},o)}function rt(t){F({page:1,rowsPerPage:t.value})}function ot(t){let o;const{rowsPerPage:v}=S.value,f=e.paginationLabel||i.lang.table.pagination,y=a.pagination,k=e.rowsPerPageOptions.length>1;if(t.push(n("div",{class:"q-table__separator col"})),k===!0&&t.push(n("div",{class:"q-table__control"},[n("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||i.lang.table.recordsPerPage]),n(kt,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:v,options:Ke.value,displayValue:v===0?i.lang.table.allRows:v,dark:b.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":rt})])),y!==void 0)o=y(j.value);else if(o=[n("span",v!==0?{class:"q-table__bottom-item"}:{},[v?f(U.value+1,Math.min(I.value,W.value),W.value):f(1,Se.value,W.value)])],v!==0&&K.value>1){const C={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(C.size="sm"),K.value>2&&o.push(n(J,{key:"pgFirst",...C,icon:G.value[0],disable:ne.value,onClick:oe})),o.push(n(J,{key:"pgPrev",...C,icon:G.value[1],disable:ne.value,onClick:ie}),n(J,{key:"pgNext",...C,icon:G.value[2],disable:re.value,onClick:se})),K.value>2&&o.push(n(J,{key:"pgLast",...C,icon:G.value[3],disable:re.value,onClick:ue}))}return t.push(n("div",{class:"q-table__control"},o)),t}function it(){const t=e.gridHeader===!0?[n("table",{class:"q-table"},[Re()])]:e.loading===!0&&a.loading===void 0?qe():void 0;return n("div",{class:"q-table__middle"},t)}function st(){const t=a.item!==void 0?a.item:o=>{const v=o.cols.map(y=>n("div",{class:"q-table__grid-item-row"},[n("div",{class:"q-table__grid-item-title"},[y.label]),n("div",{class:"q-table__grid-item-value"},[y.value])]));if(V.value===!0){const y=a["body-selection"],k=y!==void 0?y(o):[n(ve,{modelValue:o.selected,color:e.color,dark:b.value,dense:e.dense,"onUpdate:modelValue":(C,L)=>{H([o.key],[o.row],C,L)}})];v.unshift(n("div",{class:"q-table__grid-item-row"},k),n(wt,{dark:b.value}))}const f={class:["q-table__grid-item-card"+w.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(f.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(f.onClick=y=>{r("RowClick",y,o.row,o.pageIndex)}),e.onRowDblclick!==void 0&&(f.onDblclick=y=>{r("RowDblclick",y,o.row,o.pageIndex)})),n("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(o.selected===!0?" q-table__grid-item--selected":"")},[n("div",f,v)])};return n("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},D.value.map((o,v)=>t(Ce({key:c.value(o),row:o,pageIndex:v}))))}return Object.assign(g.proxy,{requestServerInteraction:O,setPagination:F,firstPage:oe,prevPage:ie,nextPage:se,lastPage:ue,isRowSelected:le,clearSelection:ze,isRowExpanded:T,setExpanded:z,sort:ae,resetVirtualScroll:Xe,scrollTo:Je,getCellValue:M}),_t(g.proxy,{filteredSortedRows:()=>ee.value,computedRows:()=>D.value,computedRowsNumber:()=>W.value}),()=>{const t=[lt()],o={ref:h,class:P.value};return e.grid===!0?t.push(it()):Object.assign(o,{class:[o.class,e.cardClass],style:e.cardStyle}),t.push(pe(),nt()),e.loading===!0&&a.loading!==void 0&&t.push(a.loading()),n("div",o,t)}}});export{nl as Q,Bt as a};
