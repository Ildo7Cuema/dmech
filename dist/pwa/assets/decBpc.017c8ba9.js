import{_ as to,r as n,bo as io,k as h,o as no,H as r,V as d,L as M,W as o,N as i,K as so,Y as lo,M as l,aU as co,aV as ro}from"./index.35821edc.js";import{h as uo}from"./html2pdf.3665aa38.js";import"./userApi.885d4b06.js";import{u as mo}from"./use-quasar.0c1c42d6.js";import{h as f}from"./moment.40bc58bf.js";import"./num2words.998d9990.js";import{f as _o}from"./formatCurrency.6090a7ed.js";const vo={setup(){const u=n(null),_=io(),w=mo(),e=n(""),v=n(""),b=n(""),N=n(""),S=n(""),P=n(""),g=n(""),y=n(""),O=n(null),T=new Date().toJSON().slice(0,4),E=n(""),m=n(),H=n(""),D=/(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/,J=/^[E]/i,R=/^[H]/i,I=/^[BCKHNMUZ]/i,B=/(\b\w+a\b)/i,V=/(\b\w+o\b)/i,j=/(\b\w+e\b|\b\w+l)/i,C=/(\b\w+o\b|\b\w+os\b|\b\w+ei\b)$/,x=/(\b\w+e\b|\b\w+es\b)$/,L=/(\b\w+E\b|\b\w+S\b|\b\w+e\b|\b\w+s\b)$/,k=()=>{try{w.loading.show();const p=window.document.getElementById("elemento-para-pdf");uo().from(p).set({margin:.89,filename:"Testifica\xE7\xE3o.pdf",html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}}).toPdf().get("pdf").then(s=>{const G=s.internal.getNumberOfPages();for(let Y=1;Y<=G;Y++){s.setPage(Y);const A=s.internal.pageSize.width,F=.55,X=.55,Z=(A-F)/2,$=.3,q=8,oo=.51,eo=A-q-.1,ao=s.internal.pageSize.height-.6;s.addImage("../../../../../../public/icons/ensigna.jpg","PNG",Z,$,F,X),s.setFontSize(10),s.setTextColor(150),s.addImage("../../../../../../public/icons/RodapeIMG.png","PNG",eo,ao,q,oo)}const W=new Blob([s.output("blob")],{type:"application/pdf"}),K=URL.createObjectURL(W);u.value=K})}catch(p){console.log(p.message)}finally{w.loading.hide()}},t=h(()=>JSON.parse(_.params.dados)),c=h(()=>JSON.parse(_.params.addInfo)),z=h(()=>_.params.model2),Q=h(()=>_.params.model),U=h(()=>converterParaExtenso(t.value[0].salario_base));return no(()=>{if(k(),f.updateLocale("pt-br",{months:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]}),O.value=f().format("D [de] MMMM [de] YYYY"),N.value=f(t.value[0].data_nascimento).format("D [de] MMMM [de] YYYY"),S.value=f(t.value[0].data_emissao).format("D [de] MMMM [de] YYYY"),P.value=f(t.value[0].data_inicio_funcao).format("D [de] MMMM [de] YYYY"),D.test(t.value[0].comuna)?(e.value="da",console.log(t.value[0].comuna)):C.test(t.value[0].comuna)?e.value="do":x.test(t.value[0].comuna)&&(e.value="de"),R.test(c.value.provincia)&&B.test(c.value.provincia)?m.value="da":I.test(c.value.provincia)&&B.test(c.value.provincia)?m.value="de":I.test(c.value.provincia)&&V.test(c.value.provincia)?m.value="do":(I.test(c.value.provincia)&&j.test(c.value.provincia),m.value="de"),J.test(c.value.escola_id)?E.value="na":E.value="no",D.test(t.value[0].municipio)?v.value="da":C.test(t.value[0].municipio)?v.value="do":x.test(t.value[0].municipio)&&(v.value="de"),D.test(t.value[0].provincia)?b.value="da":C.test(t.value[0].provincia)?b.value="do":x.test(t.value[0].provincia)&&(b.value="de"),L.test(t.value[0].instituto_formacao)?y.value="no":y.value="na",t.value[0].habilitacao=="licenciada"||t.value[0].habilitacao=="licenciado")g.value="a licenciatura";else{const p=/(\b\w+o\b)$/,s=/(\b\w+e\b)$/;p.test(t.value[0].habilitacao)&&(g.value="o "+t.value[0].habilitacao),s.test(t.value[0].habilitacao)&&(g.value="a "+t.value[0].habilitacao)}}),{salarioPorExtenso:H,pdfSrc:u,gerarPDF:k,dataNascimento:N,dataEmissao:S,dataInicioFuncao:P,artigoComuna:e,artigoMunicipio:v,artigoProvincia:b,artigoComHabiltacao:g,artigoInstituicao:y,addInfo:c,dados:t,data:O,model2:z,model:Q,dateNowYear:T,artigoQantecedEscola:E,artigoQueAntecedeDonomeDaProvincia:m,formatCurrency:_o,moedaPorExtenso:U}}},a=u=>(co("data-v-31f18b7c"),u=u(),ro(),u),bo=["src"],po={style:{display:"none"}},ho={id:"elemento-para-pdf",class:"StyleFontDocument c"},fo={class:"row",style:{"line-height":"1.5"}},go=a(()=>o("div",{class:"col-12 text-center"},"Rep\xFAblica de Angola",-1)),Mo={class:"col-12 text-center"},wo={class:"col-12 text-center"},yo=a(()=>o("div",{class:"col-12 text-center"},[o("b",null,"Direc\xE7\xE3o Municipal da Educa\xE7\xE3o")],-1)),Eo={class:"col-12 text-center"},Do={class:"row"},Io={class:"col-12 tab"},Co=a(()=>o("br",null,null,-1)),xo=a(()=>o("br",null,null,-1)),Yo={style:{"font-family":"Broadway"}},No={class:"col-12 alignTextJustify",style:{"line-height":"1.5"}},So=a(()=>o("br",null,null,-1)),Po=a(()=>o("pre",null,`                                                   AO
                                                   BANCO BPC
            `,-1)),Oo={class:"tab"},Bo={key:0},ko={key:1},Ao={key:2},Fo={key:3},qo=a(()=>o("br",null,null,-1)),To=a(()=>o("br",null,null,-1)),Ho=a(()=>o("span",{class:"tab"}," Compromete-se tamb\xE9m a nossa institui\xE7\xE3o a manter o sal\xE1rio domiciliado do ",-1)),Jo=a(()=>o("br",null,null,-1)),Ro=a(()=>o("br",null,null,-1)),Vo=a(()=>o("span",{class:"tab"},"E para que n\xE3o lhe ponham qualquer impedimento, mandei passar a presente ",-1)),jo=a(()=>o("br",null,null,-1)),Lo={class:"col-12 text-center"},zo=a(()=>o("br",null,null,-1)),Qo=a(()=>o("br",null,null,-1)),Uo=a(()=>o("br",null,null,-1)),Go=a(()=>o("br",null,null,-1)),Wo=a(()=>o("br",null,null,-1)),Ko=a(()=>o("br",null,null,-1)),Xo={class:"col-12 text-center"},Zo={key:0,style:{"line-height":"2"}},$o=a(()=>o("b",null,"O Director Municipal",-1)),oe=a(()=>o("br",null,null,-1)),ee={key:1,style:{"line-height":"2"}},ae=a(()=>o("b",null,"Na ausencia do Director Municipal",-1)),te=a(()=>o("br",null,null,-1)),ie={style:{"margin-top":"-9px"}},ne={key:0,class:"text-small"};function se(u,_,w,e,v,b){return r(),d("div",null,[e.pdfSrc?(r(),d("iframe",{key:0,src:e.pdfSrc,style:{width:"100%",height:"800px"}},null,8,bo)):M("",!0),o("div",po,[o("div",ho,[o("div",fo,[go,o("div",Mo," Governo Provincial "+i(e.artigoQueAntecedeDonomeDaProvincia)+" "+i(e.addInfo.provincia),1),o("div",wo," Administra\xE7\xE3o Municipal do "+i(e.addInfo.municipio),1),yo,o("div",Eo,[o("b",null,[so(lo,{size:"md",color:"black"})])])]),o("div",Do,[o("div",Io,[Co,xo,o("b",Yo,"DECLARA\xC7\xC3O DE SERVI\xC7O N\xBA ____/"+i(e.dateNowYear),1)]),o("div",No,[So,Po,o("span",Oo," Para efeitos de obten\xE7\xE3o de Cr\xE9dito, a Direc\xE7\xE3o Municipal de Educa\xE7\xE3o "+i(e.artigoMunicipio)+" "+i(e.dados[0].municipio)+", ",1),l(" Contribuinte Fiscal n\xBA "+i(e.addInfo.contribuent_fiscal)+", declara que ",1),e.dados[0].genero=="Masculino"?(r(),d("span",Bo,"o senhor")):(r(),d("span",ko,"a senhora")),l(", "),o("b",null,i(e.dados[0].name),1),l(", exerce fun\xE7\xF5es de "),e.dados[0].status_nomeacao=="Sim"?(r(),d("span",Ao,i(e.dados[0].nome_cargo),1)):(r(),d("span",Fo,i(e.dados[0].categorias.categoria),1)),l(", vinculado ao contrato de trabalho por tempo indeterminado, desde "+i(e.dataInicioFuncao)+", auferindo um rendimento mensal l\xEDquido de ",1),o("b",null,i(e.formatCurrency(e.dados[0].salario_liquido)),1),l(" ("+i(e.dados[0].salario_liquido_extenso)+"), na conta n\xBA ",1),o("b",null,i(e.dados[0].num_conta_bancaria),1),l(". "),qo,To,Ho,l(" colaborador junto \xE0 vossa institui\xE7\xE3o, e na eventualidade de qualquer altera\xE7\xE3o relevante da rela\xE7\xE3o jur\xEDdico-contratual com o funcion\xE1rio, informar ao Banco com um per\xEDodo de anteced\xEAncia m\xEDnimo de 15 dias, de modo a mitigar o risco de incumprimento de responsabilidades junto \xE0 vossa institui\xE7\xE3o. "),Jo,Ro,Vo,l(" Declara\xE7\xE3o que vai por mim devidamente assinada e autenticada com o carimbo a \xF3leo em uso nesta Institui\xE7\xE3o. "),jo]),o("div",Lo,[zo,Qo,l(" "+i(e.addInfo.municipio)+", "+i(e.data)+". ",1),Uo,Go,Wo,Ko]),o("div",Xo,[e.model=="Director Municipal"?(r(),d("span",Zo,[$o,oe,l(" "+i(e.addInfo.directoMunicipal),1)])):M("",!0),e.model=="Director Interino"?(r(),d("span",ee,[ae,te,l(" "+i(e.addInfo.directoMunicipal_interino),1)])):M("",!0),o("p",ie,[e.model=="Director Interino"?(r(),d("span",ne," ("+i(e.addInfo.directoMunicipal_interino_funcao)+") ",1)):M("",!0)])])])])])])}var ve=to(vo,[["render",se],["__scopeId","data-v-31f18b7c"]]);export{ve as default};