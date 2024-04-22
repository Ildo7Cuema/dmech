import{_ as I,F as V,r as C,P,o as S,R as N,G as r,H as l,I as o,S as d,J as a,U as k,aW as A,$ as f,Q as B,W as i,K as u,L as p,V as L,Y as T,Z as D,q as E,T as z,M as R,X as x,aD as F}from"./index.dd130778.js";import{Q as M}from"./QSpace.0a6fd67d.js";import{Q as w}from"./QTooltip.c440bb63.js";import{Q as O,a as U}from"./QTable.4c0e655e.js";import{a as W,Q as v}from"./QMenu.14684d20.js";import{Q as G}from"./QItemLabel.2584d57e.js";import{Q as H}from"./QList.48daec5c.js";import{Q as J}from"./QPageSticky.84a23e72.js";import{Q as K}from"./QPage.cd22ce20.js";import{a as X,b as Y}from"./QLayout.0b5dd0e9.js";import{u as Z}from"./userApi.88ef93f5.js";import{u as j}from"./useNotify.022cb0a8.js";import{u as ee}from"./use-quasar.9c87f47a.js";import{f as ae}from"./formatCurrency.6090a7ed.js";import{b as oe,i as te}from"./inputVisual.14accdd7.js";import{s as re}from"./vue-json-excel.esm.138b9b53.js";import"./selection.3d2b946a.js";import"./QSelect.fe265749.js";import"./rtl.b51694b1.js";import"./use-fullscreen.287e4c6d.js";const se=[{name:"categoria",label:"Nome de categoria",align:"left",field:"categoria",sortable:!0},{name:"actions",label:"Op\xE7\xF5es",align:"left",field:"actions",sortable:!0}],ie={"Nome da categoria":"categoria","Vencimento base":"salario_base","Vencimento l\xEDquido":"salario_liquido"};const le=V({components:{DownloadExcel:re},setup(){const e=C([]),{list:n,remove:g}=Z(),b=P(),y=ee(),Q=C(""),m="categorias",{notifyError:t,notifySuccess:c}=j(),_=async()=>{d.show({message:"Carregado categorias"});try{e.value=await n(m)}catch(s){t(s.message)}finally{d.hide()}},h=async s=>{try{y.dialog({title:"Confirma\xE7\xE3o",message:`tens a certeza que pretendes eliminar a categoria ${s.categoria} ?`,cancel:!0,persistent:!0}).onOk(async()=>{d.show({message:"Apagando categoria..."}),await g(m,s.id),_(),c("categoria apagada com sucesso")})}catch($){t($.message)}finally{d.hide()}},q=s=>{b.push({name:"form-categoria",params:{id:s.id}})};return S(()=>{_()}),{columns:se,alterarItem:q,formatCurrency:ae,deletarItem:h,categorias:e,btnConfig:oe,inputConfig:te,filter:Q,fields:ie}}}),ne={key:0,class:"row"},me={class:"row text-body3 text-h5 flex-center q-pa-lg bg-secondary text-white"};function ce(e,n,g,b,y,Q){const m=N("download-excel");return r(),l(X,null,{default:o(()=>[a(Y,null,{default:o(()=>[a(K,{padding:""},{default:o(()=>[e.$q.platform.is.desktop?(r(),k("div",ne,[a(O,{rows:e.categorias,flat:"",bordered:"",columns:e.columns,"row-key":"id",class:"col-12","virtual-scroll":"",filter:e.filter},{top:o(()=>[a(A,f({class:"",type:"text",label:"Pesquisar"},{...e.inputConfig},{modelValue:e.filter,"onUpdate:modelValue":n[0]||(n[0]=t=>e.filter=t)}),{prepend:o(()=>[a(B,{name:"mdi-magnify"})]),_:1},16,["modelValue"]),a(M),e.$q.platform.is.desktop?(r(),l(i,f({key:0,icon:"mdi-plus",label:"Cadastrar nova categoria"},{...e.btnConfig},{to:{name:"form-categoria"}}),null,16)):u("",!0),a(m,{data:e.categorias,fields:e.fields,worksheet:"Categorias",name:"categorias.xls",class:"q-ml-md"},{default:o(()=>[a(i,f({icon:"mdi-file-excel",label:"Exportar uma lista"},{...e.btnConfig}),null,16)]),_:1},8,["data","fields"])]),"body-cell-actions":o(t=>[a(U,{props:t,class:"q-gutter-x-sm text-center"},{default:o(()=>[a(i,{icon:"mdi-pencil-outline",color:"primary",dense:"",size:"sm",onClick:c=>e.alterarItem(t.row)},{default:o(()=>[a(w,null,{default:o(()=>[p("Alterar")]),_:1})]),_:2},1032,["onClick"]),a(i,{icon:"mdi-delete-outline",color:"secondary",dense:"",size:"sm",onClick:c=>e.deletarItem(t.row)},{default:o(()=>[a(w,null,{default:o(()=>[p("Apagar")]),_:1})]),_:2},1032,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])):u("",!0),e.$q.platform.is.mobile?(r(),l(H,{key:1,bordered:""},{default:o(()=>[L("div",me,[a(i,{flat:"",icon:"mdi-shape-outline",label:"Categorias"})]),(r(!0),k(D,null,T(e.categorias,t=>E((r(),l(W,{key:t.id,class:"q-mb-sm",clickable:"",onClick:c=>e.alterarItem(t)},{default:o(()=>[a(v,{avatar:""},{default:o(()=>[a(z,{color:"primary","text-color":"white",icon:"mdi-shape"})]),_:1}),a(v,null,{default:o(()=>[a(G,null,{default:o(()=>[p(R(t.categoria),1)]),_:2},1024)]),_:2},1024),a(x)]),_:2},1032,["onClick"])),[[F]])),128))]),_:1})):u("",!0),e.$q.platform.is.mobile?(r(),l(J,{key:2,class:"margin-bottom",position:"bottom-right",offset:[18,18]},{default:o(()=>[a(i,{fab:"",icon:"mdi-plus",color:"primary",to:{name:"form-categoria"}})]),_:1})):u("",!0)]),_:1})]),_:1})]),_:1})}var Ne=I(le,[["render",ce],["__scopeId","data-v-56d78cea"]]);export{Ne as default};
