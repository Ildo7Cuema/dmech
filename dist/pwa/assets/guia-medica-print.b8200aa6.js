import{_ as se,r as i,bm as le,j as y,o as ce,G as l,U as c,K as _,V as e,M as s,L as t,J as u,X as m,aT as re,aU as de}from"./index.664889d1.js";import{h as _e}from"./html2pdf.435a0610.js";import"./userApi.ccb43d02.js";import{u as ue}from"./use-quasar.692c0a0b.js";import{h}from"./moment.40bc58bf.js";import"./num2words.3087622a.js";import{f as me}from"./formatCurrency.6090a7ed.js";import"./_commonjsHelpers.2cf1d77b.js";const pe={setup(){const p=i(null),v=le(),w=ue(),o=i(""),f=i(""),g=i(""),N=i(""),P=i(""),F=i(""),x=i(""),I=i(""),O=i(null),U=new Date().toJSON().slice(0,4),S=i(""),b=i(),T=i(""),V=i(""),D=/(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/,G=/^[E]/i,L=/^[H]/i,Y=/^[BCKHNMUZ]/i,z=/(\b\w+a\b)/i,R=/(\b\w+o\b)/i,j=/(\b\w+e\b|\b\w+l)/i,C=/(\b\w+o\b|\b\w+os\b|\b\w+ei\b)$/,E=/(\b\w+e\b|\b\w+es\b)$/,K=/(\b\w+E\b|\b\w+S\b|\b\w+e\b|\b\w+s\b)$/,A=()=>{try{w.loading.show();const M=window.document.getElementById("elemento-para-pdf");_e().from(M).set({margin:.89,filename:"Testifica\xE7\xE3o.pdf",html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}}).toPdf().get("pdf").then(d=>{const X=d.internal.getNumberOfPages();for(let k=1;k<=X;k++){d.setPage(k);const B=d.internal.pageSize.width,H=.55,ee=.55,oe=(B-H)/2,te=.3,J=8,ae=.51,ne=B-J-.1,ie=d.internal.pageSize.height-.6;d.addImage("../../../../../../public/icons/ensigna.jpg","PNG",oe,te,H,ee),d.setFontSize(10),d.setTextColor(150),d.addImage("../../../../../../public/icons/RodapeIMG.png","PNG",ne,ie,J,ae)}const Z=new Blob([d.output("blob")],{type:"application/pdf"}),$=URL.createObjectURL(Z);p.value=$})}catch(M){console.log(M.message)}finally{w.loading.hide()}},a=y(()=>JSON.parse(v.params.dados)),r=y(()=>JSON.parse(v.params.addInfo)),Q=y(()=>(console.log(v.params.model2),v.params.model2)),q=y(()=>v.params.model),W=y(()=>converterParaExtenso(a.value[0].salario_base));return ce(()=>{if(A(),h.updateLocale("pt-br",{months:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]}),O.value=h().format("D [de] MMMM [de] YYYY"),N.value=h(a.value[0].data_nascimento).format("D [de] MMMM [de] YYYY"),T.value=h(r.value.calendary).format("D [de] MMMM [de] YYYY"),P.value=h(a.value[0].data_emissao).format("D [de] MMMM [de] YYYY"),F.value=h(a.value[0].data_inicio_funcao).format("D [de] MMMM [de] YYYY"),D.test(a.value[0].comuna)?(o.value="da",console.log(a.value[0].comuna)):C.test(a.value[0].comuna)?o.value="do":E.test(a.value[0].comuna)&&(o.value="de"),L.test(r.value.provincia)&&z.test(r.value.provincia)?b.value="da":Y.test(r.value.provincia)&&z.test(r.value.provincia)?b.value="de":Y.test(r.value.provincia)&&R.test(r.value.provincia)?b.value="do":(Y.test(r.value.provincia)&&j.test(r.value.provincia),b.value="de"),G.test(r.value.escola_id)?S.value="na":S.value="no",D.test(a.value[0].municipio)?f.value="da":C.test(a.value[0].municipio)?f.value="do":E.test(a.value[0].municipio)&&(f.value="de"),D.test(a.value[0].provincia)?g.value="da":C.test(a.value[0].provincia)?g.value="do":E.test(a.value[0].provincia)&&(g.value="de"),K.test(a.value[0].instituto_formacao)?I.value="no":I.value="na",a.value[0].habilitacao=="licenciada"||a.value[0].habilitacao=="licenciado")x.value="a licenciatura";else{const M=/(\b\w+o\b)$/,d=/(\b\w+e\b)$/;M.test(a.value[0].habilitacao)&&(x.value="o "+a.value[0].habilitacao),d.test(a.value[0].habilitacao)&&(x.value="a "+a.value[0].habilitacao)}}),{salarioPorExtenso:V,pdfSrc:p,gerarPDF:A,dataNascimento:N,dataEmissao:P,dataInicioFuncao:F,artigoComuna:o,artigoMunicipio:f,artigoProvincia:g,artigoComHabiltacao:x,artigoInstituicao:I,addInfo:r,dados:a,data:O,model2:Q,model:q,dateNowYear:U,artigoQantecedEscola:S,artigoQueAntecedeDonomeDaProvincia:b,formatCurrency:me,moedaPorExtenso:W,dataDeFeria:T}}},n=p=>(re("data-v-05df9e96"),p=p(),de(),p),ve=["src"],be={style:{display:"none"}},he={id:"elemento-para-pdf",class:"StyleFontDocument alignTextJustify"},fe={class:"row",style:{"line-height":"1.5"}},ge={class:"col-4 text-center"},Me={class:"col-12 text-center",style:{"line-height":"1.5"}},ye={key:0},xe=n(()=>e("b",null,"O Director Municipal",-1)),we=[xe],Ie={key:0},Se=n(()=>e("b",null,"Na ausencia do Director Municipal",-1)),De=[Se],Ye=n(()=>e("br",null,null,-1)),Ce=n(()=>e("br",null,null,-1)),Ee={key:0,class:"q-pa-md"},ke=n(()=>e("br",null,null,-1)),Ne={key:0},Pe=n(()=>e("br",null,null,-1)),Fe={key:0,class:"text-small"},Oe=n(()=>e("div",{class:"col-4 text-center"},"Rep\xFAblica de Angola",-1)),Te=n(()=>e("div",{class:"col-4 text-center"},null,-1)),ze={class:"row"},Ae={class:"col-12 text-center"},Be={class:"row"},He={class:"col-12 text-center"},Je=n(()=>e("br",null,null,-1)),Ue=n(()=>e("br",null,null,-1)),Ve=n(()=>e("br",null,null,-1)),Ge=n(()=>e("br",null,null,-1)),Le={class:"top-subtitle"},Re={class:"col-12",style:{"line-height":"1.5"}},je=n(()=>e("br",null,null,-1)),Ke={class:"StyleFontDocument"},Qe=n(()=>e("b",null,"Ildo Marques cuema",-1)),qe={class:"col-12",style:{"line-height":"1.5","margin-top":"-60px !important"}},We={key:0},Xe=n(()=>e("b",null,"O Secret\xE1rio",-1)),Ze={key:0,class:"line-top-nama-asign"},$e={key:0},eo=n(()=>e("b",null,"Na ausencia do Secret\xE1rio",-1)),oo={key:0},to={key:0,class:"text-small"},ao={class:"col-12 text-center line-top-data-asign"},no=n(()=>e("p",{style:{"margin-top":"-115px !important"}},"    Prescri\xE7\xE3o M\xE9dica",-1)),io={style:{"margin-top":"-36px !important"}};function so(p,v,w,o,f,g){return l(),c("div",null,[o.pdfSrc?(l(),c("iframe",{key:0,src:o.pdfSrc,style:{width:"100%",height:"800px"}},null,8,ve)):_("",!0),e("div",be,[e("div",he,[e("div",fe,[e("div",ge,[e("div",Me,[e("b",null,[o.model=="Director Municipal"?(l(),c("span",ye,we)):_("",!0)]),e("b",null,[o.model=="Director Interino"?(l(),c("span",Ie,De)):_("",!0)]),Ye,Ce,o.model=="Director Municipal"?(l(),c("span",Ee,s(o.addInfo.directoMunicipal),1)):_("",!0),ke,e("b",null,[o.model=="Director Interino"?(l(),c("span",Ne,s(o.addInfo.directoMunicipal_interino),1)):_("",!0),Pe]),e("p",null,[e("b",null,[o.model=="Director Interino"?(l(),c("span",Fe," ("+s(o.addInfo.directoMunicipal_interino_funcao)+") ",1)):_("",!0)])])])]),Oe,Te]),e("div",ze,[e("div",Ae,[e("b",null,"Direc\xE7\xE3o Municipal da Educa\xE7\xE3o "+s(o.artigoMunicipio)+" "+s(o.addInfo.municipio),1)])]),e("div",Be,[e("div",He,[Je,Ue,e("b",null,"GUIA M\xC9DICA N\xBA_______/"+s(o.dateNowYear),1),Ve,Ge,e("span",Le,[t(" Vai apresentar-se ao "),e("b",null,s(o.addInfo.hospital),1)])]),e("div",Re,[je,e("pre",Ke,[t("   Nome do benefici\xE1rio: "),Qe,t(`
   Situa\xE7\xE3o:
   Categoria:
   Provimentos mensais do agregado familiar
   Kz
   `),u(m,{size:"2px",color:"black",inset:"",class:"line-mais-tope"}),t(`
   Elementos referentes ao benefici\xE1rio:
   `),u(m,{color:"black",class:"line-mais-tope",style:{width:"287px","margin-left":"14px !important"}}),t(`
   `),u(m,{color:"black",class:"line-mais-tope2",style:{width:"287px","margin-left":"14px !important"}}),t(`
   Filia\xE7\xE3o:
   Tiago Celestino
   e
   Ver\xF3nica Laurinda Celestino
   Naturalidade: Ca\xE1la
   Munic\xEDpio: Ca\xE1la
   Prov\xEDncia: Huambo
   Idade: 32 anos                          Estado Civil: Casada                     G\xE9nero: Feminino
   `),e("div",qe,[t(`
            `),e("b",null,[o.model2=="Secret\xE1rio"?(l(),c("span",We,[t(`
                                                               `),Xe,t(`
              `)])):_("",!0)]),t(`
            `),o.model2=="Secret\xE1rio"?(l(),c("p",Ze,`
                                                         `+s(o.addInfo.nome_secretario)+`
            `,1)):_("",!0),t(`
            `),e("b",null,[o.model2=="Secret\xE1rio interino"?(l(),c("span",$e,[t(`
                                                            `),eo,t(`
              `)])):_("",!0)]),t(`
            `),e("b",null,[o.model2=="Secret\xE1rio interino"?(l(),c("span",oo,`
                                                                 `+s(o.addInfo.nome_secretario_interino)+" ",1)):_("",!0)]),t(`
            `),e("p",null,[t(`
              `),e("b",null,[o.model2=="Secret\xE1rio interino"?(l(),c("span",to,`
                                                                (`+s(o.addInfo.nome_funcao_secretario_interino)+`)
                `,1)):_("",!0)]),t(`
            `)]),t(`
             `),e("p",ao,[e("b",null,s(o.addInfo.municipio)+","+s(o.data)+".",1)]),t(`
            `),u(m,{size:"2px",color:"black",inset:"",class:"line-mais-tope",style:{"margin-top":"-45px"}}),t(`


          `)]),t(`
`),no,t(`
`),u(m,{size:"1px",color:"black",inset:"",style:{"margin-top":"-8px !important"}}),t(`
`),u(m,{size:"1px",color:"black",inset:"",style:{"margin-top":"2px !important"}}),t(`
`),u(m,{size:"1px",color:"black",inset:"",style:{"margin-top":"2px !important"}}),t(`
`),u(m,{size:"1px",color:"black",inset:"",style:{"margin-top":"2px !important"}}),t(`
         `),e("p",io,"    _________ "+s(o.dateNowYear)+`                                                                             O M\xE9dico
                                                                                        _____________________________
          `,1),t(`
            `)])])])])])])}var bo=se(pe,[["render",so],["__scopeId","data-v-05df9e96"]]);export{bo as default};
