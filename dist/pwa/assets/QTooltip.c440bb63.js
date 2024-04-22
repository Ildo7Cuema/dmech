import{a as ee,u as te,aa as ae,e as oe,r as O,j as f,ab as ne,g as ie,ac as le,k as se,ad as re,w as k,p as C,a5 as E,a4 as x,ai as ue,s as H,ak as ce,y as de,v as fe,a2 as ve}from"./index.dd130778.js";import{u as he,v as A,c as me,p as j,d as ge,e as ye,r as q,s as Te,f as pe}from"./QMenu.14684d20.js";import{c as D}from"./selection.3d2b946a.js";var we=ee({name:"QTooltip",inheritAttrs:!1,props:{...he,...te,...ae,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:A},self:{type:String,default:"top middle",validator:A},offset:{type:Array,default:()=>[14,14],validator:me},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0},persistent:Boolean},emits:[...oe],setup(e,{slots:M,emit:y,attrs:v}){let i,l;const h=de(),{proxy:{$q:a}}=h,s=O(null),c=O(!1),L=f(()=>j(e.anchor,a.lang.rtl)),Q=f(()=>j(e.self,a.lang.rtl)),W=f(()=>e.persistent!==!0),{registerTick:B,removeTick:N}=ne(),{registerTimeout:d}=ie(),{transitionProps:R,transitionStyle:_}=le(e),{localScrollTarget:T,changeScrollEvent:I,unconfigureScrollTarget:U}=ge(e,P),{anchorEl:o,canShow:V,anchorEvents:r}=ye({showing:c,configureAnchorEl:X}),{show:$,hide:m}=se({showing:c,canShow:V,handleShow:F,handleHide:G,hideOnRouteChange:W,processOnMount:!0});Object.assign(r,{delayShow:J,delayHide:K});const{showPortal:p,hidePortal:b,renderPortal:z}=re(h,s,Z,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:o,innerRef:s,onClickOutside(n){return m(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},g=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);k(g,n=>{(n===!0?pe:q)(t)}),C(()=>{q(t)})}function F(t){p(),B(()=>{l=new MutationObserver(()=>u()),l.observe(s.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=k(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,u)),d(()=>{p(!0),y("show",t)},e.transitionDuration)}function G(t){N(),b(),S(),d(()=>{b(!0),y("hide",t)},e.transitionDuration)}function S(){l!==void 0&&(l.disconnect(),l=void 0),i!==void 0&&(i(),i=void 0),U(),E(r,"tooltipTemp")}function u(){Te({targetEl:s.value,offset:e.offset,anchorEl:o.value,anchorOrigin:L.value,selfOrigin:Q.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function J(t){if(a.platform.is.mobile===!0){D(),document.body.classList.add("non-selectable");const g=o.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[g,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{$(t)},e.delay)}function K(t){a.platform.is.mobile===!0&&(E(r,"tooltipTemp"),D(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{m(t)},e.hideDelay)}function X(){if(e.noParentEvent===!0||o.value===null)return;const t=a.platform.is.mobile===!0?[[o.value,"touchstart","delayShow","passive"]]:[[o.value,"mouseenter","delayShow","passive"],[o.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(o.value!==null||e.scrollTarget!==void 0){T.value=ue(o.value,e.scrollTarget);const t=e.noParentEvent===!0?u:m;I(T.value,t)}}function Y(){return c.value===!0?H("div",{...v,ref:s,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,_.value],role:"tooltip"},fe(M.default)):null}function Z(){return H(ce,R.value,Y)}return C(S),Object.assign(h.proxy,{updatePosition:u}),z}});export{we as Q};
