import{aM as h,r as E,O as F,aN as q}from"./index.dd130778.js";import{u as C}from"./use-quasar.9c87f47a.js";let g;const P=new Uint8Array(16);function R(){if(!g&&(g=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!g))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return g(P)}const s=[];for(let r=0;r<256;++r)s.push((r+256).toString(16).slice(1));function V(r,e=0){return s[r[e+0]]+s[r[e+1]]+s[r[e+2]]+s[r[e+3]]+"-"+s[r[e+4]]+s[r[e+5]]+"-"+s[r[e+6]]+s[r[e+7]]+"-"+s[r[e+8]]+s[r[e+9]]+"-"+s[r[e+10]]+s[r[e+11]]+s[r[e+12]]+s[r[e+13]]+s[r[e+14]]+s[r[e+15]]}const N=typeof crypto!="undefined"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var y={randomUUID:N};function S(r,e,l){if(y.randomUUID&&!e&&!r)return y.randomUUID();r=r||{};const u=r.random||(r.rng||R)();if(u[6]=u[6]&15|64,u[8]=u[8]&63|128,e){l=l||0;for(let c=0;c<16;++c)e[l+c]=u[c];return e}return V(u)}function T(){return{setBrand:(e,l)=>{e&&h("primary",e),l&&h("secondary",l)}}}const m=E({name:"",phone:"",primary:"",secondary:""});function H(){const{user:r,getToken:e}=F(),l=C(),u=S(),{supabase:c}=q(),{setBrand:p}=T(),w=async a=>{const{data:n,error:o}=await c.from(a).select();if(o)throw o;return n},f=async a=>{const{data:n,error:o}=await c.from(a).select(`
      id,
      *,
      escolas (id, nome), categorias (id, categoria)
    `);if(o)throw o;return n},U=async(a,n)=>{const{data:o,error:t}=await c.from(a).select(`
      id,
      *,
      escolas (id, nome), categorias (id, categoria)
    `).eq("id",n);if(t)throw t;return o},v=async(a,n)=>{const{data:o,error:t,count:d}=await c.from(a).select("*",{count:"exact"}).eq("user_id",n);if(t)throw t;return{data:o,count:d}},b=async(a,n)=>{const{data:o,error:t}=await c.from(a).select().eq("id",n);if(t)throw t;return o[0]},x=async(a,n)=>{const{data:o,error:t}=await c.from(a).insert({...n,user_id:r.value.id});if(t)throw t;return o},I=async(a,n)=>{const{data:o,error:t}=await c.from(a).update({...n}).match({id:n.id});if(t)throw t;return o},A=async(a,n)=>{const{data:o,error:t}=await c.from(a).delete().match({id:n});if(t)throw t;return o},B=async(a,n)=>{const{data:o,error:t}=await c.storage.from(n).upload(u,a,{cacheControl:3600,upsert:!1}),d=await D(u,n);if(t)throw t;return d},D=async(a,n)=>{const{data:o,error:t}=await c.storage.from(n).getPublicUrl(a);if(t)throw t;return console.log(o.publicUrl),o.publicUrl};return{list:w,getById:b,post:x,uploadImage:B,graficos:async a=>{const{data:n,error:o}=await c.from(a).select("*");if(o)throw o;return n},update:I,remove:A,fileName:u,getBrand:async()=>{var n;const a=(n=r==null?void 0:r.value)==null?void 0:n.id;if(a){l.loading.show();const{data:o,error:t}=await c.from("config").select("*").eq("user_id",a);if(t)throw t;return o.length>0&&(m.value=o[0],p(m.value.primary,m.value.secondary)),l.loading.hide(),m}},brand:m,getFuncionariosWithCategoriasAndEscolas:f,getFuncionarioWithCategoriasAndEscolas:U,fetchCount:v,totalFuncionatioPorGenero:async a=>{const{data:n,error:o}=await c.from(a).select("genero");if(o)throw o;const t={};n.forEach(i=>{t[i.genero]=(t[i.genero]||0)+1});const d=[["G\xEAnero","Total de Funcion\xE1rios"]];return Object.keys(t).forEach(i=>{d.push([i,t[i]])}),d},totalFuncionatioPornivel:async a=>{const{data:n,error:o}=await c.from(a).select("nivelAcademico");if(o)throw o;const t={};n.forEach(i=>{t[i.nivelAcademico]=(t[i.nivelAcademico]||0)+1});const d=[["Nivel","Total"]];return Object.keys(t).forEach(i=>{d.push([i,t[i]])}),console.log(d),d}}}export{T as a,H as u};
