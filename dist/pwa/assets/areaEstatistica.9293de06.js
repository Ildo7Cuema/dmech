import{a as p,d as y,f as v,j as _,s as k,v as Q,y as S,_ as b,O as q,r as f,o as x,G as d,H as u,I as l,aR as C,V as r,M as g,J as t,W as $,aQ as B,aS as w,R as h,X as z}from"./index.dd130778.js";import{Q as A}from"./QPage.cd22ce20.js";import{a as D,b as P}from"./QLayout.0b5dd0e9.js";import{b as j}from"./btnBackPage.0bd970aa.js";import{u as R}from"./userApi.88ef93f5.js";import"./use-quasar.9c87f47a.js";const V=["text","rect","circle","QBtn","QBadge","QChip","QToolbar","QCheckbox","QRadio","QToggle","QSlider","QRange","QInput","QAvatar"],E=["wave","pulse","pulse-x","pulse-y","fade","blink","none"];var I=p({name:"QSkeleton",props:{...y,tag:{type:String,default:"div"},type:{type:String,validator:e=>V.includes(e),default:"rect"},animation:{type:String,validator:e=>E.includes(e),default:"wave"},animationSpeed:{type:[String,Number],default:1500},square:Boolean,bordered:Boolean,size:String,width:String,height:String},setup(e,{slots:c}){const a=S(),o=v(e,a.proxy.$q),s=_(()=>{const i=e.size!==void 0?[e.size,e.size]:[e.width,e.height];return{"--q-skeleton-speed":`${e.animationSpeed}ms`,width:i[0],height:i[1]}}),n=_(()=>`q-skeleton q-skeleton--${o.value===!0?"dark":"light"} q-skeleton--type-${e.type}`+(e.animation!=="none"?` q-skeleton--anim q-skeleton--anim-${e.animation}`:"")+(e.square===!0?" q-skeleton--square":"")+(e.bordered===!0?" q-skeleton--bordered":""));return()=>k(e.tag,{class:n.value,style:s.value},Q(c.default))}});const N={props:{label:{type:String,required:!0},icon:{type:String,required:!1,default:"mdi-database-outline"},tabela:{type:String,required:!0},color:{type:String,required:!1,default:"red"}},name:"cardsDashboard",setup(e){const{fetchCount:c}=R(),{user:a}=q(),o=f(0),s=f(!1);return x(async()=>{try{s.value=!0;const n=await c(e.tabela,a.value.id);o.value=n.count}catch{}finally{s.value=!1}}),{count:o,loading:s}}},T={class:"col flex flex-center text-body1 text-h6"};function M(e,c,a,o,s,n){return d(),u(w,{class:"my-card",bordered:""},{default:l(()=>[o.loading?(d(),u(I,{key:0,height:"50px"})):(d(),u(C,{key:1,horizontal:""},{default:l(()=>[r("div",T,g(o.count)+" - "+g(a.label),1),t(B,{vertical:"",class:"justify-around q-px-md"},{default:l(()=>[t($,{flat:"",color:a.color,icon:a.icon},null,8,["color","icon"])]),_:1})]),_:1}))]),_:1})}var O=b(N,[["render",M]]);const F={name:"AreaEstatisticaPage",components:{btnBackPageVue:j,cardsDashboard:O},setup(){return{}}},G=r("p",{class:"text-body1"},"\xC1rea de estat\xEDstica",-1),H={class:"row justify-center q-gutter-sm q-mt-sm q-pa-md"},J={class:"col-xs-12 col-sm-12 col-md-3 col-lg-3"},L={class:"col-xs-12 col-sm-12 col-md-3 col-lg-3"},U={class:"col-xs-12 col-sm-12 col-md-3 col-lg-3"};function W(e,c,a,o,s,n){const i=h("btn-back-page-vue"),m=h("cards-dashboard");return d(),u(D,null,{default:l(()=>[t(P,null,{default:l(()=>[t(A,{padding:""},{default:l(()=>[G,t(i),t(z),r("div",H,[r("div",J,[t(m,{label:"Escolas",tabela:"escolas",color:"blue-5",icon:"mdi-school-outline"})]),r("div",L,[t(m,{label:"Funcion\xE1rios",tabela:"funcionarios",color:"green-5",icon:"mdi-account-tie"})]),r("div",U,[t(m,{label:"Or\xE7amentos",tabela:"orcamento_project",color:"blue-grey-5",icon:"mdi-shopping"})])])]),_:1})]),_:1})]),_:1})}var ae=b(F,[["render",W]]);export{ae as default};
