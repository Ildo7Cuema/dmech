import{_ as te,r as c,bp as ne,f,z as ie,p as i,G as s,v as _,H as e,y as a,t as se,K as ce,x as d,aU as le,aV as re}from"./index.bc90a1a6.js";import{h as de}from"./html2pdf.f54f6dda.js";import"./userApi.9d724f7f.js";import{u as ue}from"./use-quasar.c935fd80.js";import{h as g}from"./moment.40bc58bf.js";import"./num2words.46635330.js";import{f as me}from"./formatCurrency.6090a7ed.js";const _e={setup(){const u=c(null),v=ne(),y=ue(),o=c(""),b=c(""),h=c(""),C=c(""),P=c(""),Y=c(""),M=c(""),D=c(""),k=c(null),R=new Date().toJSON().slice(0,4),I=c(""),m=c(),H=c(""),E=/(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/,q=/^[E]/i,J=/^[H]/i,w=/^[BCKHNMUZ]/i,O=/(\b\w+a\b)/i,U=/(\b\w+o\b)/i,z=/(\b\w+e\b|\b\w+l)/i,S=/(\b\w+o\b|\b\w+os\b|\b\w+ei\b)$/,x=/(\b\w+e\b|\b\w+es\b)$/,L=/(\b\w+E\b|\b\w+S\b|\b\w+e\b|\b\w+s\b)$/,A=()=>{try{y.loading.show();const p=window.document.getElementById("elemento-para-pdf");de().from(p).set({margin:.89,filename:"Testifica\xE7\xE3o.pdf",html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}}).toPdf().get("pdf").then(l=>{const j=l.internal.getNumberOfPages();for(let N=1;N<=j;N++){l.setPage(N);const T=l.internal.pageSize.width,B=.55,X=.55,Z=(T-B)/2,$=.3,F=8,ee=.51,oe=T-F-.1,ae=l.internal.pageSize.height-.6;l.addImage("../../../../../../public/Simbolo-da-Republica.png","PNG",Z,$,B,X),l.setFontSize(10),l.setTextColor(150),l.addImage("../../../../../../public/icons/RodapeIMG.png","PNG",oe,ae,F,ee)}const K=new Blob([l.output("blob")],{type:"application/pdf"}),W=URL.createObjectURL(K);u.value=W})}catch(p){console.log(p.message)}finally{y.loading.hide()}},t=f(()=>JSON.parse(v.params.dados)),r=f(()=>JSON.parse(v.params.addInfo)),V=f(()=>v.params.model2),G=f(()=>v.params.model),Q=f(()=>converterParaExtenso(t.value[0].salario_base));return ie(()=>{if(A(),g.updateLocale("pt-br",{months:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]}),k.value=g().format("D [de] MMMM [de] YYYY"),C.value=g(t.value[0].data_nascimento).format("D [de] MMMM [de] YYYY"),P.value=g(t.value[0].data_emissao).format("D [de] MMMM [de] YYYY"),Y.value=g(t.value[0].data_inicio_funcao).format("D [de] MMMM [de] YYYY"),E.test(t.value[0].comuna)?(o.value="da",console.log(t.value[0].comuna)):S.test(t.value[0].comuna)?o.value="do":x.test(t.value[0].comuna)&&(o.value="de"),J.test(r.value.provincia)&&O.test(r.value.provincia)?m.value="da":w.test(r.value.provincia)&&O.test(r.value.provincia)?m.value="de":w.test(r.value.provincia)&&U.test(r.value.provincia)?m.value="do":(w.test(r.value.provincia)&&z.test(r.value.provincia),m.value="de"),q.test(r.value.escola_id)?I.value="na":I.value="no",E.test(t.value[0].municipio)?b.value="da":S.test(t.value[0].municipio)?b.value="do":x.test(t.value[0].municipio)&&(b.value="de"),E.test(t.value[0].provincia)?h.value="da":S.test(t.value[0].provincia)?h.value="do":x.test(t.value[0].provincia)&&(h.value="de"),L.test(t.value[0].instituto_formacao)?D.value="no":D.value="na",t.value[0].habilitacao=="licenciada"||t.value[0].habilitacao=="licenciado")M.value="a licenciatura";else{const p=/(\b\w+o\b)$/,l=/(\b\w+e\b)$/;p.test(t.value[0].habilitacao)&&(M.value="o "+t.value[0].habilitacao),l.test(t.value[0].habilitacao)&&(M.value="a "+t.value[0].habilitacao)}}),{salarioPorExtenso:H,pdfSrc:u,gerarPDF:A,dataNascimento:C,dataEmissao:P,dataInicioFuncao:Y,artigoComuna:o,artigoMunicipio:b,artigoProvincia:h,artigoComHabiltacao:M,artigoInstituicao:D,addInfo:r,dados:t,data:k,model2:V,model:G,dateNowYear:R,artigoQantecedEscola:I,artigoQueAntecedeDonomeDaProvincia:m,formatCurrency:me,moedaPorExtenso:Q}}},n=u=>(le("data-v-2bc8faa9"),u=u(),re(),u),ve=["src"],be={style:{display:"none"}},he={id:"elemento-para-pdf",class:"StyleFontDocument alignTextJustify"},pe={class:"row",style:{"line-height":"1.5"}},fe=n(()=>e("div",{class:"col-12 text-center"},"Rep\xFAblica de Angola",-1)),ge={class:"col-12 text-center"},Me={class:"col-12 text-center"},ye=n(()=>e("div",{class:"col-12 text-center"},[e("b",null,"Direc\xE7\xE3o Municipal da Educa\xE7\xE3o")],-1)),De={class:"col-12 text-center"},Ie={class:"row"},Ee={class:"col-12 text-center"},we=n(()=>e("br",null,null,-1)),Se=n(()=>e("br",null,null,-1)),xe={class:"col-12",style:{"line-height":"1.5"}},Ne=n(()=>e("br",null,null,-1)),Ce=n(()=>e("span",{class:"tab"}," Para fins julgados convenientes, a Direc\xE7\xE3o Municipal da Educa\xE7\xE3o, declara que,",-1)),Pe={key:0},Ye={key:1},ke={key:2},Oe={key:3},Ae={key:4},Te={key:5},Be=n(()=>e("br",null,null,-1)),Fe=n(()=>e("span",{class:"tab"},"\xC9",-1)),Re={key:6},He={key:7},qe=n(()=>e("br",null,null,-1)),Je=n(()=>e("span",{class:"tab"},"A",-1)),Ue=n(()=>e("br",null,null,-1)),ze=n(()=>e("div",{class:"col-12",style:{"line-height":"1.5"}},[e("br"),e("span",{class:"tab"},"OBS.:"),d(" Esta Declara\xE7\xE3o tem validade de noventa (90) dias. "),e("br"),e("br"),e("span",{class:"tab"},"E"),d(" para que n\xE3o lhe ponham qualquer impedimento, mandei passar a presente Declara\xE7\xE3o que vai por mim devidamente assinada e autenticada com o carimbo a \xF3leo em uso nesta Institui\xE7\xE3o. ")],-1)),Le={class:"col-12 text-center"},Ve=n(()=>e("br",null,null,-1)),Ge=n(()=>e("br",null,null,-1)),Qe={class:"col-12 text-center",style:{"line-height":"1.5"}},je=n(()=>e("br",null,null,-1)),Ke=n(()=>e("br",null,null,-1)),We=n(()=>e("br",null,null,-1)),Xe={key:0},Ze=n(()=>e("b",null,"O Director Municipal",-1)),$e=[Ze],eo={key:0},oo=n(()=>e("b",null,"Na ausencia do Director Municipal",-1)),ao=[oo],to=n(()=>e("br",null,null,-1)),no=n(()=>e("br",null,null,-1)),io={key:0},so={key:0},co={key:0,class:"text-small"};function lo(u,v,y,o,b,h){return i(),s("div",null,[o.pdfSrc?(i(),s("iframe",{key:0,src:o.pdfSrc,style:{width:"100%",height:"800px"}},null,8,ve)):_("",!0),e("div",be,[e("div",he,[e("div",pe,[fe,e("div",ge," Governo Provincial "+a(o.artigoQueAntecedeDonomeDaProvincia)+" "+a(o.addInfo.provincia),1),e("div",Me," Administra\xE7\xE3o Municipal do "+a(o.addInfo.municipio),1),ye,e("div",De,[e("b",null,[se(ce,{size:"md",color:"black"})])])]),e("div",Ie,[e("div",Ee,[we,Se,e("b",null,"DECLARA\xC7\xC3O DE SERVI\xC7O N\xBA ____/"+a(o.dateNowYear),1)]),e("div",xe,[Ne,Ce,o.dados[0].genero=="Masculino"?(i(),s("span",Pe," o senhor")):(i(),s("span",Ye," a senhora")),d(", "),e("b",null,a(o.dados[0].name),1),o.dados[0].genero=="Masculino"?(i(),s("span",ke," filho ")):(i(),s("span",Oe," filha ")),d(" de "+a(o.dados[0].nome_pai)+" e de "+a(o.dados[0].nome_mae)+", ",1),o.dados[0].genero=="Masculino"?(i(),s("span",Ae,"nascido")):(i(),s("span",Te,"nascida")),d(" aos "+a(o.dataNascimento)+", natural "+a(o.artigoMunicipio)+" "+a(o.dados[0].municipio)+", Prov\xEDncia "+a(o.artigoProvincia)+" "+a(o.dados[0].provincia)+", portador do B.I. n\xBA "+a(o.dados[0].num_bilhete)+", emitido pelo Arquivo de Identifica\xE7\xE3o Nacional, aos "+a(o.dataEmissao)+". ",1),Be,Fe,o.dados[0].genero=="Masculino"?(i(),s("span",Re," funcion\xE1rio")):(i(),s("span",He," funcion\xE1ria")),d(" em efectivo servi\xE7o, colocado neste Munic\xEDpio com o n\xBA de agente "+a(o.dados[0].num_agente)+", desempenhando as fun\xE7\xF5es de "+a(o.dados[0].categorias.categoria)+", "+a(o.artigoInstituicao)+" "+a(o.dados[0].escolas.name)+", auferindo um rendimento mensal cerca de "+a(o.formatCurrency(o.dados[0].salario_base))+" ("+a(o.dados[0].salario_base_extenso)+") na conta n\xBA "+a(o.addInfo.conta_bancaria)+". ",1),qe,Je,d(" presente Declara\xE7\xE3o destina-se para efeito de: "),e("b",null,a(o.addInfo.efeito_da_declaracao)+".",1),Ue]),ze,e("div",Le,[Ve,Ge,d(" DIREC\xC7\xC3O MUNICIPAL DA EDUCA\xC7\xC3O NO "+a(o.addInfo.municipio)+", "+a(o.data)+". ",1)]),e("div",Qe,[je,Ke,We,e("b",null,[o.model=="Director Municipal"?(i(),s("span",Xe,$e)):_("",!0)]),e("b",null,[o.model=="Director Interino"?(i(),s("span",eo,ao)):_("",!0)]),to,no,o.model=="Director Municipal"?(i(),s("span",io,a(o.addInfo.directoMunicipal),1)):_("",!0),e("b",null,[o.model=="Director Interino"?(i(),s("span",so,a(o.addInfo.directoMunicipal_interino),1)):_("",!0)]),e("p",null,[e("b",null,[o.model=="Director Interino"?(i(),s("span",co," ("+a(o.addInfo.directoMunicipal_interino_funcao)+") ",1)):_("",!0)])])])])])])])}var po=te(_e,[["render",lo],["__scopeId","data-v-2bc8faa9"]]);export{po as default};