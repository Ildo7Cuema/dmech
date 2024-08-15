import{h as V}from"./html2pdf.f54f6dda.js";import{_ as W,r as _,bp as j,f as g,z as X,p as n,G as t,v as s,H as e,y as a,x as d,aU as Q,aV as K}from"./index.bc90a1a6.js";import{u as Z}from"./userApi.9d724f7f.js";import{u as $}from"./use-quasar.c935fd80.js";import{h as v}from"./moment.40bc58bf.js";const oo={setup(){const r=_(null),u=j();_();const p=$();Z();const o=_(""),m=_(""),h=_(""),D=_(""),S=_(""),w=_(""),f=_(""),y=_(""),F=_(null),M=/(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/,I=/(\b\w+o\b|\b\w+os\b|\b\w+ei\b)$/,E=/(\b\w+e\b|\b\w+es\b)$/,O=/(\b\w+E\b|\b\w+S\b|\b\w+e\b|\b\w+s\b)$/,N=()=>{try{p.loading.show();const b=window.document.getElementById("elemento-para-pdf");V().from(b).set({margin:.89,filename:"Testifica\xE7\xE3o.pdf",html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}}).toPdf().get("pdf").then(l=>{const A=l.internal.getNumberOfPages();for(let k=1;k<=A;k++){l.setPage(k);const x=l.internal.pageSize.width,P=.55,B=.55,G=(x-P)/2,J=.3,Y=8,U=.51,L=x-Y-.1,q=l.internal.pageSize.height-.6;l.addImage("../../../../../../public/Simbolo-da-Republica.png","PNG",G,J,P,B),l.setFontSize(10),l.setTextColor(150),l.addImage("../../../../../../public/icons/RodapeIMG.png","PNG",L,q,Y,U)}const H=new Blob([l.output("blob")],{type:"application/pdf"}),z=URL.createObjectURL(H);r.value=z})}catch(b){console.log(b.message)}finally{p.loading.hide()}},c=g(()=>JSON.parse(u.params.dados)),R=g(()=>JSON.parse(u.params.addInfo)),C=g(()=>u.params.model2),T=g(()=>u.params.model);return X(()=>{if(N(),v.updateLocale("pt-br",{months:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]}),F.value=v().format("D [de] MMMM [de] YYYY"),D.value=v(c.value[0].data_nascimento).format("D [de] MMMM [de] YYYY"),S.value=v(c.value[0].data_emissao).format("D [de] MMMM [de] YYYY"),w.value=v(c.value[0].data_inicio_funcao).format("D [de] MMMM [de] YYYY"),M.test(c.value[0].comuna)?(o.value="da",console.log(c.value[0].comuna)):I.test(c.value[0].comuna)?o.value="do":E.test(c.value[0].comuna)&&(o.value="de"),M.test(c.value[0].municipio)?m.value="da":I.test(c.value[0].municipio)?m.value="do":E.test(c.value[0].municipio)&&(m.value="de"),M.test(c.value[0].provincia)?h.value="da":I.test(c.value[0].provincia)?h.value="do":E.test(c.value[0].provincia)&&(h.value="de"),O.test(c.value[0].instituto_formacao)?y.value="no":y.value="na",c.value[0].habilitacao=="licenciada"||c.value[0].habilitacao=="licenciado")f.value="a licenciatura";else{const b=/(\b\w+o\b)$/,l=/(\b\w+e\b)$/;b.test(c.value[0].habilitacao)&&(f.value="o "+c.value[0].habilitacao),l.test(c.value[0].habilitacao)&&(f.value="a "+c.value[0].habilitacao)}}),{pdfSrc:r,gerarPDF:N,dataNascimento:D,dataEmissao:S,dataInicioFuncao:w,artigoComuna:o,artigoMunicipio:m,artigoProvincia:h,artigoComHabiltacao:f,artigoInstituicao:y,addInfo:R,dados:c,data:F,model2:C,model:T}}},i=r=>(Q("data-v-3657714f"),r=r(),K(),r),eo=["src"],ao={style:{display:"none"}},no={id:"elemento-para-pdf",class:"StyleFontDocument alignTextJustify"},to={class:"row",style:{"line-height":"1.5"}},io=i(()=>e("div",{class:"col-12 text-center"},"Rep\xFAblica de Angola",-1)),so=i(()=>e("div",{class:"col-12 text-center"},"Governo Provincial da Hu\xEDla",-1)),co=i(()=>e("div",{class:"col-12 text-center"}," Administra\xE7\xE3o Municipal do Chipindo ",-1)),lo=i(()=>e("div",{class:"col-12 text-center"},"Direc\xE7\xE3o Municipal da Educa\xE7\xE3o",-1)),_o={class:"col-12 text-center"},ro=i(()=>e("p",null,"_________________________________________________",-1)),uo=i(()=>e("p",null,[e("b",{style:{"font-size":"11px"}},"(GABINETE DO DIRECTOR MUNICIPAL)")],-1)),mo=i(()=>e("br",null,null,-1)),ho=i(()=>e("br",null,null,-1)),bo=i(()=>e("br",null,null,-1)),vo={class:"row"},fo={class:"col-12",style:{"line-height":"1.5"}},go={key:0},po={key:1},yo={key:2},Mo={key:3},Io={key:4},Eo={key:5},ko={key:6},Do={key:7},So={key:8},wo={key:9},Fo={key:10},No=i(()=>e("div",{class:"col-12",style:{"line-height":"1.5"}},[e("br"),d(" N\xE3o havendo mais nada a tratar, lavrou-se o presente "),e("b",null,"TERMO DE IN\xCDCIO DE FUN\xC7\xD5ES"),d(", que vai ser assinado por todos quanto nele interv\xEAm. ")],-1)),xo={key:0,class:"col-12"},Po=i(()=>e("br",null,null,-1)),Yo=i(()=>e("br",null,null,-1)),Oo={class:"col-12 text-center",style:{"line-height":"1.5"}},Ro=i(()=>e("br",null,null,-1)),Co=i(()=>e("br",null,null,-1)),To=i(()=>e("br",null,null,-1)),Ao={key:0},Ho={key:1},zo=i(()=>e("p",null,"______________________________",-1)),Bo={class:"col-6 text-center",style:{"line-height":"1.5"}},Go=i(()=>e("br",null,null,-1)),Jo=i(()=>e("br",null,null,-1)),Uo=i(()=>e("br",null,null,-1)),Lo={key:0},qo={key:0},Vo=i(()=>e("p",null,"________________________________",-1)),Wo={key:0},jo={key:0},Xo={key:0,class:"text-small"},Qo={class:"col-6 text-center",style:{"line-height":"1.5"}},Ko=i(()=>e("br",null,null,-1)),Zo=i(()=>e("br",null,null,-1)),$o=i(()=>e("br",null,null,-1)),oe={key:0},ee={key:0},ae=i(()=>e("p",null,"________________________________",-1)),ne={key:0},te={key:0},ie={key:0,class:"text-small"};function se(r,u,p,o,m,h){return n(),t("div",null,[o.pdfSrc?(n(),t("iframe",{key:0,src:o.pdfSrc,style:{width:"100%",height:"500px"}},null,8,eo)):s("",!0),e("div",ao,[e("div",no,[e("div",to,[io,so,co,lo,e("div",_o,[ro,uo,mo,e("b",null,"TERMO DE IN\xCDCIO DE FUN\xC7\xD5ES"+a(o.addInfo.tipoTermo),1),ho,bo])]),e("div",vo,[e("div",fo,[d(" No dia "+a(o.data)+", compareceu no Gabinete do Senhor "+a(o.addInfo.directoMunicipal)+", Director Municipal da Educa\xE7\xE3o, ",1),o.dados[0].genero=="Masculino"?(n(),t("span",go,"o senhor ")):s("",!0),o.dados[0].genero=="Femenino"?(n(),t("span",po,"a senhora ")):s("",!0),o.dados[0].genero=="Femenino"?(n(),t("span",yo,"a ")):s("",!0),e("b",null,a(o.dados[0].nome),1),d(", "),o.dados[0].genero=="Masculino"?(n(),t("span",Mo,"filho")):s("",!0),o.dados[0].genero=="Femenino"?(n(),t("span",Io,"filha")):s("",!0),d(" de "+a(o.dados[0].nome_pai)+" e de "+a(o.dados[0].nome_mae)+", natural "+a(o.artigoMunicipio)+" "+a(o.dados[0].municipio)+" comuna "+a(o.artigoComuna)+" "+a(o.dados[0].comuna)+", Munic\xEDpio "+a(o.artigoMunicipio)+" "+a(o.dados[0].municipio)+", Prov\xEDncia "+a(o.artigoProvincia)+" "+a(o.dados[0].provincia)+", nascid",1),o.dados[0].genero=="Femenino"?(n(),t("span",Eo,"a")):s("",!0),o.dados[0].genero=="Masculino"?(n(),t("span",ko,"o")):s("",!0),d(" aos, "+a(o.dataNascimento)+", portadora do B.I. n\xBA "+a(o.dados[0].num_bilhete)+", emitido pelo sector de Identifica\xE7\xE3o Civil de Luanda aos "+a(o.dataEmissao)+", habilitad",1),o.dados[0].genero=="Masculino"?(n(),t("span",Do,"o")):s("",!0),o.dados[0].genero=="Femenino"?(n(),t("span",So,"a")):s("",!0),d(" com "+a(o.artigoComHabiltacao)+", feita "+a(o.artigoInstituicao)+" "+a(o.dados[0].instituto_formacao)+". A fim de ",1),o.addInfo.tipoTermo==""?(n(),t("span",wo," iniciar as suas fun\xE7\xF5es como docente com a categoria de "+a(o.dados[0].categorias.categoria)+" cargo para qual foi contratado, dia "+a(o.dataInicioFuncao),1)):(n(),t("span",Fo,"reconstituir o seu termo de inicio de fun\xE7\xF5es como docente, com a categoria de "+a(o.dados[0].categorias.categoria)+", com inicio de fun\xE7\xF5es a "+a(o.dataInicioFuncao)+".",1))]),No,o.addInfo.tipoTermo!=""?(n(),t("div",xo,[Po,Yo,d(" Actualizado na Direc\xE7\xE3o Municipal de Educa\xE7\xE3o, "+a(o.data)+". ",1)])):s("",!0),e("div",Oo,[Ro,Co,To,e("b",null,[o.dados[0].genero=="Masculino"?(n(),t("span",Ao,"O")):s("",!0),o.dados[0].genero=="Femenino"?(n(),t("span",Ho,"A")):s("",!0),d(" Docente")]),zo,d(" "+a(o.dados[0].nome),1)]),e("div",Bo,[Go,Jo,Uo,e("b",null,[o.model2=="Chefe da Sec\xE7\xE3o do P.E.R.H"?(n(),t("span",Lo," Chefe da Sec\xE7\xE3o do P.E.R.H ")):s("",!0)]),e("b",null,[o.model2=="Interno(a)"?(n(),t("span",qo," Na Ausencia do Chefe de Sec. do P.E.R.H ")):s("",!0)]),Vo,o.model2=="Chefe da Sec\xE7\xE3o do P.E.R.H"?(n(),t("span",Wo,a(o.addInfo.chef_PERH),1)):s("",!0),e("b",null,[o.model2=="Interno(a)"?(n(),t("span",jo,a(o.addInfo.chef_PERH_interino),1)):s("",!0)]),e("b",null,[o.model2=="Interno(a)"?(n(),t("span",Xo," ("+a(o.addInfo.chef_PERH_interino_funcao)+") ",1)):s("",!0)])]),e("div",Qo,[Ko,Zo,$o,e("b",null,[o.model=="Director Municipal"?(n(),t("span",oe," O Director Municipal ")):s("",!0)]),e("b",null,[o.model=="Director Interino"?(n(),t("span",ee," Na Ausencia do Director Municipal ")):s("",!0)]),ae,o.model=="Director Municipal"?(n(),t("span",ne,a(o.addInfo.directoMunicipal),1)):s("",!0),e("b",null,[o.model=="Director Interino"?(n(),t("span",te,a(o.addInfo.directoMunicipal_interino),1)):s("",!0)]),e("p",null,[e("b",null,[o.model=="Director Interino"?(n(),t("span",ie," ("+a(o.addInfo.directoMunicipal_interino_funcao)+") ",1)):s("",!0)])])])])])])])}var ue=W(oo,[["render",se],["__scopeId","data-v-3657714f"]]);export{ue as default};
