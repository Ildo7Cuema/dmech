import{d as E,r as P,ah as q,au as A,av as V,z as B,k as I,O as R,l as O,br as Q,V as p,X as j,aM as k,bs as D}from"./index.bc90a1a6.js";var K=E({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(r,{slots:F,emit:f}){const C=O(),u=P(null);let i=0;const s=[];function d(e){const a=typeof e=="boolean"?e:r.noErrorFocus!==!0,l=++i,h=(t,o)=>{f("validation"+(t===!0?"Success":"Error"),o)},x=t=>{const o=t.validate();return typeof o.then=="function"?o.then(n=>({valid:n,comp:t}),n=>({valid:!1,comp:t,err:n})):Promise.resolve({valid:o,comp:t})};return(r.greedy===!0?Promise.all(s.map(x)).then(t=>t.filter(o=>o.valid!==!0)):s.reduce((t,o)=>t.then(()=>x(o).then(n=>{if(n.valid===!1)return Promise.reject(n)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return l===i&&h(!0),!0;if(l===i){const{comp:o,err:n}=t[0];if(n!==void 0&&console.error(n),h(!1,o),a===!0){const g=t.find(({comp:S})=>typeof S.focus=="function"&&Q(S.$)===!1);g!==void 0&&g.comp.focus()}}return!1})}function v(){i++,s.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function m(e){e!==void 0&&p(e);const a=i+1;d().then(l=>{a===i&&l===!0&&(r.onSubmit!==void 0?f("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function b(e){e!==void 0&&p(e),f("reset"),j(()=>{v(),r.autofocus===!0&&r.noResetFocus!==!0&&c()})}function c(){k(()=>{if(u.value===null)return;const e=u.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(u.value.querySelectorAll("[tabindex]"),a=>a.tabIndex!==-1);e!=null&&e.focus({preventScroll:!0})})}q(D,{bindComponent(e){s.push(e)},unbindComponent(e){const a=s.indexOf(e);a!==-1&&s.splice(a,1)}});let y=!1;return A(()=>{y=!0}),V(()=>{y===!0&&r.autofocus===!0&&c()}),B(()=>{r.autofocus===!0&&c()}),Object.assign(C.proxy,{validate:d,resetValidation:v,submit:m,reset:b,focus:c,getValidationComponents:()=>s}),()=>I("form",{class:"q-form",ref:u,onSubmit:m,onReset:b},R(F.default))}});export{K as Q};