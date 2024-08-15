import{_ as g,C as h,D as y,r as V,p as w,q as _,s as l,P as c,t as o,bq as b,H as f,aZ as t,N as n,Q as i,I as m}from"./index.bc90a1a6.js";import{Q as C}from"./QForm.d8ddec26.js";import{Q as P}from"./QPage.f48c0666.js";import{a as U,b as Q}from"./QLayout.c9624849.js";import{u as q}from"./useNotify.98763d5b.js";import{i as v}from"./inputVisual.14accdd7.js";const x={name:"form-login",setup(){const{register:u}=h(),{notifyError:r,notifySuccess:d}=q(),a=y(),s=V({email:"",password:"",name:"",phone:"",role:"User",photoURL:"",status:"activo"});return{form:s,createUser:async()=>{try{c.show({message:"Criando conta"}),await u(s.value),a.push({name:"email-confirmation",query:{email:s.value.email}}),d("conta criada com sucesso")}catch(e){r(e.message)}finally{c.hide()}},inputConfig:v}}},B=f("p",{class:"col-12 text-h5 text-center q-mt-lg"},"Criar uma conta",-1),I={class:"col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm"};function N(u,r,d,a,s,p){return w(),_(U,null,{default:l(()=>[o(Q,null,{default:l(()=>[o(P,{padding:""},{default:l(()=>[o(C,{class:"row justify-center",onSubmit:b(a.createUser,["prevent"])},{default:l(()=>[B,f("div",I,[o(t,n({...a.inputConfig},{modelValue:a.form.name,"onUpdate:modelValue":r[0]||(r[0]=e=>a.form.name=e),label:"Nome da Institui\xE7\xE3o",class:"col-12","lazy-rules":"",rules:[e=>e&&e.length>0||"Porfavor digite seu nome"]}),{prepend:l(()=>[o(i,{name:"mdi-account"})]),_:1},16,["modelValue","rules"]),o(t,n({...a.inputConfig},{modelValue:a.form.email,"onUpdate:modelValue":r[1]||(r[1]=e=>a.form.email=e),label:"E-mail",class:"col-12","lazy-rules":"",rules:[e=>e&&e.length>0||"Porfavor digite seu e-mail"]}),{prepend:l(()=>[o(i,{name:"mdi-email"})]),_:1},16,["modelValue","rules"]),o(t,n({...a.inputConfig},{modelValue:a.form.phone,"onUpdate:modelValue":r[2]||(r[2]=e=>a.form.phone=e),label:"Telemovel",class:"col-12","lazy-rules":"",rules:[e=>e&&e.length>0||"Porfavor digite seu e-mail"]}),{prepend:l(()=>[o(i,{name:"mdi-phone-dial"})]),_:1},16,["modelValue","rules"]),o(t,n({...a.inputConfig},{modelValue:a.form.password,"onUpdate:modelValue":r[3]||(r[3]=e=>a.form.password=e),label:"Senha",type:"password",class:"col-12",rules:[e=>e!==null&&e!==""||"Porfavor digite sua senha",e=>e>0&&e>=6||"A sua senha deve ter maior ou igual a 6 caracteres"]}),{prepend:l(()=>[o(i,{name:"mdi-key-chain"})]),_:1},16,["modelValue","rules"]),o(m,{type:"submit",label:"Criar conta",class:"full-width q-mt-lg",color:"primary","no-caps":"",icon:"mdi-account-tie"}),o(m,{to:{name:"resetPassword"},flat:"",label:"Esqueci minha senha",class:"full-width q-mt-md",color:"primary","no-caps":""}),o(m,{to:{name:"loginPage"},flat:"",label:"J\xE1 tenho uma conta",class:"full-width q-mt-md",color:"primary","no-caps":""})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})}var R=g(x,[["render",N]]);export{R as default};