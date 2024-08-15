import{d as Q,f as y,k as q,j as D,_ as B,r as k,D as S,C as V,E as P,p as m,q as x,s as a,bJ as M,t as e,I as u,v as L,G as A,H as f,aZ as N,x as n,F as G,Q as i,K as T,L as E,M as I,J as z,y as U,ap as O}from"./index.e70dc7e8.js";import{Q as p}from"./QSpace.cccfce51.js";import{Q as b}from"./QTooltip.8d7a7274.js";import{Q as C,a as F}from"./QHeader.e2aa77f0.js";import{a as c,Q as t}from"./position-engine.1f1eaf41.js";import{Q as d}from"./QItemLabel.f0026656.js";import{Q as H}from"./QList.9cd80ca5.js";import{Q as R}from"./QDrawer.9581e0fd.js";import{Q as J}from"./QPageSticky.09a25c3d.js";import{a as j,b as K}from"./QLayout.ca9f809c.js";import{b as Z}from"./btnBackPage.19e4fa5f.js";import"./selection.ded15137.js";import"./TouchPan.e358a799.js";const $=["top","middle","bottom"];var W=Q({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:s=>$.includes(s)}},setup(s,{slots:o}){const g=y(()=>s.align!==void 0?{verticalAlign:s.align}:null),l=y(()=>{const _=s.outline===!0&&s.color||s.textColor;return`q-badge flex inline items-center no-wrap q-badge--${s.multiLine===!0?"multi":"single"}-line`+(s.outline===!0?" q-badge--outline":s.color!==void 0?` bg-${s.color}`:"")+(_!==void 0?` text-${_}`:"")+(s.floating===!0?" q-badge--floating":"")+(s.rounded===!0?" q-badge--rounded":"")+(s.transparent===!0?" q-badge--transparent":"")});return()=>q("div",{class:l.value,style:g.value,role:"status","aria-label":s.label},D(o.default,s.label!==void 0?[s.label]:[]))}}),X="/assets/ensigna.c755d8ab.png";const ee={name:"GooglePlayLayout",components:{btnBackPage:Z},setup(){const s=k(!1),o=k(""),g=k(.26),l=S(),{logout:_}=V();function v(){s.value=!s.value}return{handleAlunos:()=>{l.push({name:"pageAlunos"})},handleCurso:()=>{l.push({name:"pageCurso"})},leftDrawerOpen:s,search:o,storage:g,handleTurma:()=>{l.push({name:"pageTurma"})},logoutUser:async()=>{await M.create({title:"Sair",message:"Tens a certeza que pretendes terminar a sess\xE3o?",cancel:!0,persistent:!0}).onOk(async()=>{try{await _(),l.push({name:"loginPage"})}catch(Y){console.log(Y)}}).onCancel(()=>{console.log("Voce cancelou")})},handlePeriodo:()=>{l.push({name:"pagePeriodo"})},hendleDisciplina:()=>{l.push({name:"pageDisciplina"})},handleClasses:()=>{l.push({name:"pageClasse"})},handleNotas:()=>{l.push({name:"pageNotas"})},hendleMiniPauta:()=>{l.push({name:"mini-pautas"})},links1:[{text:"Minha conta",icon:"mdi-account"},{text:"Comparticipa\xE7\xE3o",icon:"mdi-cart-variant"}],toggleLeftDrawer:v}}},ae={key:1,class:"q-pr-lg"},te=f("img",{class:"GPLAY__logo",src:X},null,-1),le=f("span",{class:"log-text text-bold"},"DME - Escola",-1),se=[te,le],oe={class:"GPLAY__toolbar-input-container row no-wrap"},ne={class:"q-pl-md q-gutter-sm row no-wrap items-center"},re=f("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1);function ie(s,o,g,l,_,v){const h=P("router-view"),w=P("btn-back-page");return m(),x(j,{view:"hHh LpR fFf",class:"bg-grey-3"},{default:a(()=>[e(F,{class:"bg-grey-3 text-grey-9",reveal:"","height-hint":"60"},{default:a(()=>[e(C,{class:"GPLAY__toolbar text-grey-6"},{default:a(()=>[s.$q.platform.is.mobile||!l.leftDrawerOpen?(m(),x(u,{key:0,flat:"",dense:"",round:"",onClick:l.toggleLeftDrawer,"aria-label":"Menu",icon:"menu",class:"q-mr-sm"},null,8,["onClick"])):L("",!0),s.$q.screen.gt.xs?(m(),A("div",ae,se)):L("",!0),e(p),f("div",oe,[e(N,{dense:"",outlined:"",square:"",modelValue:l.search,"onUpdate:modelValue":o[0]||(o[0]=r=>l.search=r),placeholder:"Procurar",class:"bg-white col"},null,8,["modelValue"]),e(u,{class:"GPLAY__toolbar-input-btn",color:"primary",icon:"search",unelevated:""})]),e(p),f("div",ne,[e(u,{round:"",dense:"",flat:"",color:"grey-8",size:"14px",icon:"apps"},{default:a(()=>[e(b,null,{default:a(()=>[n("Menu Servi\xE7o")]),_:1})]),_:1}),e(u,{round:"",dense:"",flat:"",color:"grey-8",icon:"notifications"},{default:a(()=>[e(W,{color:"red","text-color":"white",floating:""},{default:a(()=>[n(" 2 ")]),_:1}),e(b,null,{default:a(()=>[n("Notifica\xE7\xF5es")]),_:1})]),_:1}),e(u,{round:"",flat:""},{default:a(()=>[e(G,{size:"26px"},{default:a(()=>[re]),_:1}),e(b,null,{default:a(()=>[n("Conta")]),_:1})]),_:1}),e(u,{round:"",flat:"",onClick:l.logoutUser},{default:a(()=>[e(G,{size:"26px"},{default:a(()=>[e(i,{name:"mdi-logout"})]),_:1}),e(b,null,{default:a(()=>[n("Sair")]),_:1})]),_:1},8,["onClick"])])]),_:1})]),_:1}),e(R,{modelValue:l.leftDrawerOpen,"onUpdate:modelValue":o[9]||(o[9]=r=>l.leftDrawerOpen=r),"show-if-above":"",bordered:"",class:"bg-grey-3 text-grey-7",width:200},{default:a(()=>[e(H,null,{default:a(()=>[e(c,{clickable:"",class:"GPLAY__drawer-link bg-grey-10 text-grey-3",to:{name:"homeEscola"}},{default:a(()=>[e(t,{avatar:"",class:"text-grey-1"},{default:a(()=>[e(i,{name:"mdi-school"})]),_:1}),e(t,{class:"text-grey-3"},{default:a(()=>[e(d,null,{default:a(()=>[n("Minha escola")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--movies",onClick:o[1]||(o[1]=r=>l.handleCurso())},{default:a(()=>[e(t,{avatar:"",class:"movies-icon bg-red-6 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"school"})]),_:1}),e(t,{class:"movies-text"},{default:a(()=>[e(d,null,{default:a(()=>[n(" Cursos")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books",onClick:o[2]||(o[2]=r=>l.handleTurma())},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-red-6 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-google-classroom"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n(" Turmas")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books",onClick:o[3]||(o[3]=r=>l.handlePeriodo())},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-red-6 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-clock-outline"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Per\xEDodo")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books",onClick:o[4]||(o[4]=r=>l.hendleDisciplina())},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-red-6 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"book"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Disciplinas")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books",onClick:o[5]||(o[5]=r=>l.handleClasses())},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-red-6 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-chart-line"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Classes")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--apps",onClick:o[6]||(o[6]=r=>l.handleAlunos())},{default:a(()=>[e(t,{avatar:"",class:"bg-green-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-account-group"})]),_:1}),e(t,{class:"apps-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Alunos")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books",onClick:o[7]||(o[7]=r=>l.handleNotas())},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-blue-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-numeric-9-plus-box"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Inserir notas")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books",onClick:o[8]||(o[8]=r=>l.hendleMiniPauta())},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-blue-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-microsoft-excel"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Mini-pautas")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books"},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-blue-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-microsoft-excel"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Pautas")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books"},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-blue-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-file-table-outline"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Termos de frequ\xEAncia")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--books"},{default:a(()=>[e(t,{avatar:"",class:"books-icon bg-blue-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-certificate"})]),_:1}),e(t,{class:"books-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Certificados")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--music"},{default:a(()=>[e(t,{avatar:"",class:"music-icon bg-orange-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-account-tie"})]),_:1}),e(t,{class:"music-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Professores")]),_:1})]),_:1})]),_:1}),e(c,{clickable:"",class:"GPLAY__drawer-link GPLAY__drawer-link--devices"},{default:a(()=>[e(t,{avatar:"",class:"music-icon bg-blue-grey-7 text-grey-1 text-center"},{default:a(()=>[e(i,{name:"mdi-chart-line"})]),_:1}),e(t,{class:"music-text"},{default:a(()=>[e(d,null,{default:a(()=>[n("Estat\xEDstica")]),_:1})]),_:1})]),_:1}),e(T,{class:"q-mb-md"}),(m(!0),A(I,null,E(l.links1,r=>z((m(),x(c,{key:r.text,dense:"",clickable:"",class:"GPLAY__drawer-item"},{default:a(()=>[e(t,{class:"text-grey-8"},{default:a(()=>[e(d,null,{default:a(()=>[e(i,{name:r.icon},null,8,["name"]),n(" "+U(r.text),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[O]])),128))]),_:1})]),_:1},8,["modelValue"]),e(K,null,{default:a(()=>[e(h),e(J,{expand:"",position:"top"},{default:a(()=>[e(C,{class:"GPLAY__sticky bg-white q-px-xl"},{default:a(()=>[e(w),e(p),e(u,{icon:"help",dense:"",flat:"",size:"12px",class:"GPLAY__sticky-help"}),e(u,{icon:"settings",dense:"",flat:"",class:"GPLAY__sticky-settings q-ml-md",size:"12px"})]),_:1})]),_:1})]),_:1})]),_:1})}var Ce=B(ee,[["render",ie]]);export{Ce as default};