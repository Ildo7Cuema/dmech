import{_ as ce,r as s,bo as re,k as M,o as de,S as ue,H as n,V as c,L as y,W as e,N as i,K as _e,Y as me,M as l,I as E,J as x,aU as ve,aV as pe}from"./index.35821edc.js";import{h as he}from"./html2pdf.3665aa38.js";import"./userApi.885d4b06.js";import{u as be}from"./use-quasar.0c1c42d6.js";import{h}from"./moment.40bc58bf.js";import"./num2words.998d9990.js";import{f as fe}from"./formatCurrency.6090a7ed.js";const ge={setup(){const m=s(null),b=re(),S=be(),o=s(""),f=s(""),g=s(""),v=s(""),B=s(""),H=s(""),C=s(""),Y=s(""),J=s(null),Q=new Date().toJSON().slice(0,4),k=s(""),p=s(),G=s(""),w=s(""),W=s(""),N=/(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/,q=/^[E]/i,K=/^[H]/i,O=/^[BCKHNMUZ]/i,L=/(\b\w+a\b)/i,X=/(\b\w+o\b)/i,Z=/(\b\w+e\b|\b\w+l)/i,V=s(""),P=/(\b\w+o\b|\b\w+os\b|\b\w+ei\b)$/,A=/(\b\w+e\b|\b\w+es\b)$/,$=/(\b\w+E\b|\b\w+S\b|\b\w+e\b|\b\w+s\b)$/,z=()=>{try{S.loading.show();const _=window.document.getElementById("elemento-para-pdf");he().from(_).set({margin:.89,filename:"Testifica\xE7\xE3o.pdf",html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}}).toPdf().get("pdf").then(d=>{const F=d.internal.getNumberOfPages();for(let I=1;I<=F;I++){d.setPage(I);const D=d.internal.pageSize.width,u=.55,R=.55,te=(D-u)/2,ne=.3,j=8,se=.51,ie=D-j-.1,le=d.internal.pageSize.height-.6;d.addImage("../../../../../../public/icons/ensigna.jpg","PNG",te,ne,u,R),d.setFontSize(10),d.setTextColor(150),d.addImage("../../../../../../public/icons/RodapeIMG.png","PNG",ie,le,j,se)}const T=new Blob([d.output("blob")],{type:"application/pdf"}),U=URL.createObjectURL(T);m.value=U})}catch(_){console.log(_.message)}finally{S.loading.hide()}},t=M(()=>JSON.parse(b.params.dados)),r=M(()=>JSON.parse(b.params.addInfo)),ee=M(()=>b.params.model2),oe=M(()=>b.params.model),ae=M(()=>converterParaExtenso(t.value[0].salario_base));return de(()=>{z(),h.updateLocale("pt-br",{months:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]}),J.value=h().format("D [de] MMMM [de] YYYY"),v.value=h(t.value[0].data_nascimento).format("D [de] MMMM [de] YYYY"),G.value=h(r.value.calendary).format("D [de] MMMM [de] YYYY"),B.value=h(t.value[0].data_emissao).format("D [de] MMMM [de] YYYY"),H.value=h(t.value[0].data_inicio_funcao).format("D [de] MMMM [de] YYYY");const _=r.value.municipio;if(_.length>=7){const u=_.slice(0,-4);w.value=u}else if(_.length>=6){const u=_.slice(0,-2);w.value=u}else w.value=_;const d=r.value.nome_seccao,F=["de","e","do","de",","],T=new RegExp(`\\b(${F.join("|")})\\b`,"g"),D=d.replace(T,"").split(" ").map(u=>u[0]);if(V.value=D.join(""),N.test(t.value[0].comuna)?(o.value="da",console.log(t.value[0].comuna)):P.test(t.value[0].comuna)?o.value="do":A.test(t.value[0].comuna)&&(o.value="de"),K.test(r.value.provincia)&&L.test(r.value.provincia)?p.value="da":O.test(r.value.provincia)&&L.test(r.value.provincia)?p.value="de":O.test(r.value.provincia)&&X.test(r.value.provincia)?p.value="do":(O.test(r.value.provincia)&&Z.test(r.value.provincia),p.value="de"),q.test(r.value.escola_id)?k.value="na":k.value="no",N.test(t.value[0].municipio)?f.value="da":P.test(t.value[0].municipio)?f.value="do":A.test(t.value[0].municipio)&&(f.value="de"),N.test(t.value[0].provincia)?g.value="da":P.test(t.value[0].provincia)?g.value="do":A.test(t.value[0].provincia)&&(g.value="de"),$.test(t.value[0].instituto_formacao)?Y.value="no":Y.value="na",t.value[0].habilitacao=="licenciada"||t.value[0].habilitacao=="licenciado")C.value="a licenciatura";else{const u=/(\b\w+o\b)$/,R=/(\b\w+e\b)$/;u.test(t.value[0].habilitacao)&&(C.value="o "+t.value[0].habilitacao),R.test(t.value[0].habilitacao)&&(C.value="a "+t.value[0].habilitacao)}}),{salarioPorExtenso:W,pdfSrc:m,gerarPDF:z,dataNascimento:v,dataEmissao:B,dataInicioFuncao:H,artigoComuna:o,artigoMunicipio:f,artigoProvincia:g,artigoComHabiltacao:C,artigoInstituicao:Y,addInfo:r,dados:t,data:J,model2:ee,model:oe,dateNowYear:Q,artigoQantecedEscola:k,artigoQueAntecedeDonomeDaProvincia:p,formatCurrency:fe,moedaPorExtenso:ae,dataDeFeria:G,primeirasLetras:V,Munic:w}}},a=m=>(ve("data-v-02ec6eca"),m=m(),pe(),m),Me=["src"],ye={style:{display:"none"}},Ce={id:"elemento-para-pdf",class:"StyleFontDocument alignTextJustify"},we={class:"row",style:{"line-height":"1.5"}},Ie=a(()=>e("div",{class:"col-12 text-center"},"Rep\xFAblica de Angola",-1)),De={class:"col-12 text-center"},Ee={class:"col-12 text-center"},xe=a(()=>e("div",{class:"col-12 text-center"},[e("b",null,"Direc\xE7\xE3o Municipal da Educa\xE7\xE3o")],-1)),Se={class:"col-12 text-center"},Ye={class:"text-small top-subtitle",style:{"font-size":"10px","margin-top":"0.1px !important","text-transform":"uppercase"}},ke={key:0},Ne={key:1},Oe={class:"row"},Pe={class:"col-12 text-left"},Ae=a(()=>e("br",null,null,-1)),Fe=a(()=>e("br",null,null,-1)),Te=a(()=>e("br",null,null,-1)),Re=a(()=>e("b",null,"C/C",-1)),Be=a(()=>e("br",null,null,-1)),He=a(()=>e("br",null,null,-1)),Je={class:"col-12 text-center"},Ge=a(()=>e("br",null,null,-1)),Le=a(()=>e("br",null,null,-1)),Ve=a(()=>e("br",null,null,-1)),ze={style:{"text-transform":"uppercase"}},Ue={key:0},je={key:1},Qe={class:"col-12",style:{"line-height":"1.5"}},We=a(()=>e("br",null,null,-1)),qe=a(()=>e("div",{class:"col-12 text-center"},[e("br"),e("br"),e("b",null,"DETERMINO:")],-1)),Ke={class:"col-12",style:{"line-height":"1.5"}},Xe=a(()=>e("br",null,null,-1)),Ze={key:2},$e={key:3},eo=a(()=>e("br",null,null,-1)),oo=a(()=>e("br",null,null,-1)),ao=a(()=>e("br",null,null,-1)),to={class:"col-12 text-center"},no=a(()=>e("br",null,null,-1)),so=a(()=>e("br",null,null,-1)),io=a(()=>e("p",null,[e("b",null,"CUMPRA-SE!")],-1)),lo=a(()=>e("br",null,null,-1)),co=a(()=>e("br",null,null,-1)),ro={class:"col-12 text-center",style:{"line-height":"1.5"}},uo=a(()=>e("br",null,null,-1)),_o=a(()=>e("br",null,null,-1)),mo=a(()=>e("br",null,null,-1)),vo={key:0},po={key:0},ho={key:1},bo={key:1},fo={key:0},go={key:1},Mo=a(()=>e("br",null,null,-1)),yo=a(()=>e("br",null,null,-1)),Co={class:"q-pa-md"};function wo(m,b,S,o,f,g){const v=ue("spam");return n(),c("div",null,[o.pdfSrc?(n(),c("iframe",{key:0,src:o.pdfSrc,style:{width:"100%",height:"800px"}},null,8,Me)):y("",!0),e("div",ye,[e("div",Ce,[e("div",we,[Ie,e("div",De," Governo Provincial "+i(o.artigoQueAntecedeDonomeDaProvincia)+" "+i(o.addInfo.provincia),1),e("div",Ee," Administra\xE7\xE3o Municipal do "+i(o.addInfo.municipio),1),xe,e("div",Se,[e("b",null,[_e(me,{size:"md",color:"black"})]),e("p",Ye,[e("b",null,[l("("),o.addInfo.modelCC!=="Administrador Municipal"?(n(),E(v,{key:0},{default:x(()=>[l(i(o.addInfo.nome_seccao),1)]),_:1})):(n(),E(v,{key:1},{default:x(()=>[o.dados[0].genero=="Masculino"?(n(),c("span",ke,"Gabinete do Director")):y("",!0),o.dados[0].genero=="Feminino"?(n(),c("span",Ne,"Gabinete da Directora")):y("",!0)]),_:1})),l(")")])])])]),e("div",Oe,[e("div",Pe,[Ae,Fe,Te,Re,Be,He,e("b",null,i(o.addInfo.modelCC),1)]),e("div",Je,[Ge,Le,Ve,e("b",ze,[l("ORDEM DE SERVI\xC7O N\xBA_______/"),o.addInfo.modelCC=="Administrador Municipal"?(n(),c("span",Ue,"G.D")):(n(),c("span",je,i(o.primeirasLetras),1)),l("/DME."+i(o.Munic)+"/"+i(o.dateNowYear),1)])]),e("div",Qe,[We,l(" Ausentando-me da Institui\xE7\xE3o "+i(o.addInfo.motivo_da_ausencia)+", e havendo necessidade de se manter o normal funcionamento da mesma; ",1)]),qe,e("div",Ke,[Xe,l(" Fica a responder pelas actividades correntes da "),o.addInfo.modelCC!=="Administrador Municipal"?(n(),E(v,{key:0},{default:x(()=>[l(i(o.addInfo.nome_seccao),1)]),_:1})):(n(),E(v,{key:1},{default:x(()=>[l("Direc\xE7\xE3o Municipal da Educa\xE7\xE3o")]),_:1})),l(", apartir do dia "+i(o.dataDeFeria)+", ",1),o.addInfo.genero=="Masculino"?(n(),c("span",Ze,"o senhor")):(n(),c("span",$e,"a senhora")),l(": "),e("b",null,i(o.addInfo.nome_interino),1),l(" - "+i(o.addInfo.nome_interino_funcao)+" ",1),eo,oo,ao,l(" Obs.: Os assuntos que ultrapassarem as compet\xEAncias deste, ficar\xE3o pendentes. ")]),e("div",to,[no,so,io,lo,co,l(" "+i(o.addInfo.municipio)+", "+i(o.data)+". ",1)]),e("div",ro,[uo,_o,mo,e("b",null,[o.addInfo.modelCC=="Administrador Municipal"?(n(),c("span",vo,[e("b",null,[o.dados[0].genero=="Masculino"?(n(),c("span",po,"O Director Municipal")):y("",!0),o.dados[0].genero=="Feminino"?(n(),c("span",ho,"A Directora Municipal")):y("",!0)])])):(n(),c("span",bo,[o.dados[0].genero=="Masculino"?(n(),c("span",fo,"O")):(n(),c("span",go,"A")),l(" Chefe de Sec\xE7\xE3o")]))]),Mo,yo,e("span",Co,i(o.dados[0].name),1)])])])])])}var No=ce(ge,[["render",wo],["__scopeId","data-v-02ec6eca"]]);export{No as default};
