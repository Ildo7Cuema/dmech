import{d as p,S as y,T as k,f as _,k as v,O as Q,l as S,_ as b,C as q,r as f,z as x,p as d,q as u,s as l,aS as C,H as r,y as g,t,I as $,aR as B,aT as w,E as h,K as z}from"./index.bc90a1a6.js";import{Q as A}from"./QPage.f48c0666.js";import{a as D,b as P}from"./QLayout.c9624849.js";import{b as T}from"./btnBackPage.38abf012.js";import{u as E}from"./userApi.9d724f7f.js";import"./use-quasar.c935fd80.js";const j=["text","rect","circle","QBtn","QBadge","QChip","QToolbar","QCheckbox","QRadio","QToggle","QSlider","QRange","QInput","QAvatar"],I=["wave","pulse","pulse-x","pulse-y","fade","blink","none"];var N=p({name:"QSkeleton",props:{...y,tag:{type:String,default:"div"},type:{type:String,validator:e=>j.includes(e),default:"rect"},animation:{type:String,validator:e=>I.includes(e),default:"wave"},animationSpeed:{type:[String,Number],default:1500},square:Boolean,bordered:Boolean,size:String,width:String,height:String},setup(e,{slots:c}){const a=S(),o=k(e,a.proxy.$q),s=_(()=>{const i=e.size!==void 0?[e.size,e.size]:[e.width,e.height];return{"--q-skeleton-speed":`${e.animationSpeed}ms`,width:i[0],height:i[1]}}),n=_(()=>`q-skeleton q-skeleton--${o.value===!0?"dark":"light"} q-skeleton--type-${e.type}`+(e.animation!=="none"?` q-skeleton--anim q-skeleton--anim-${e.animation}`:"")+(e.square===!0?" q-skeleton--square":"")+(e.bordered===!0?" q-skeleton--bordered":""));return()=>v(e.tag,{class:n.value,style:s.value},Q(c.default))}});const R={props:{label:{type:String,required:!0},icon:{type:String,required:!1,default:"mdi-database-outline"},tabela:{type:String,required:!0},color:{type:String,required:!1,default:"red"}},name:"cardsDashboard",setup(e){const{fetchCount:c}=E(),{user:a}=q(),o=f(0),s=f(!1);return x(async()=>{try{s.value=!0;const n=await c(e.tabela,a.value.id);o.value=n.count}catch{}finally{s.value=!1}}),{count:o,loading:s}}},V={class:"col flex flex-center text-body1 text-h6"};function O(e,c,a,o,s,n){return d(),u(w,{class:"my-card",bordered:""},{default:l(()=>[o.loading?(d(),u(N,{key:0,height:"50px"})):(d(),u(C,{key:1,horizontal:""},{default:l(()=>[r("div",V,g(o.count)+" - "+g(a.label),1),t(B,{vertical:"",class:"justify-around q-px-md"},{default:l(()=>[t($,{flat:"",color:a.color,icon:a.icon},null,8,["color","icon"])]),_:1})]),_:1}))]),_:1})}var F=b(R,[["render",O]]);const H={name:"AreaEstatisticaPage",components:{btnBackPageVue:T,cardsDashboard:F},setup(){return{}}},K=r("p",{class:"text-body1"},"\xC1rea de estat\xEDstica",-1),L={class:"row justify-center q-gutter-sm q-mt-sm q-pa-md"},M={class:"col-xs-12 col-sm-12 col-md-3 col-lg-3"},U={class:"col-xs-12 col-sm-12 col-md-3 col-lg-3"},G={class:"col-xs-12 col-sm-12 col-md-3 col-lg-3"};function J(e,c,a,o,s,n){const i=h("btn-back-page-vue"),m=h("cards-dashboard");return d(),u(D,null,{default:l(()=>[t(P,null,{default:l(()=>[t(A,{padding:""},{default:l(()=>[K,t(i),t(z),r("div",L,[r("div",M,[t(m,{label:"Escolas",tabela:"escolas",color:"blue-5",icon:"mdi-school-outline"})]),r("div",U,[t(m,{label:"Funcion\xE1rios",tabela:"funcionarios",color:"green-5",icon:"mdi-account-tie"})]),r("div",G,[t(m,{label:"Or\xE7amentos",tabela:"orcamento_project",color:"blue-grey-5",icon:"mdi-shopping"})])])]),_:1})]),_:1})]),_:1})}var ae=b(H,[["render",J]]);export{ae as default};
