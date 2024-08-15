import{aW as t,bJ as d,aC as n}from"./index.bc90a1a6.js";import{u as _}from"./useNotify.98763d5b.js";const{supabase:c}=n(),{notifyError:y,notifySuccess:p}=_(),r="classes",h=t("classes",{state:()=>({classes:[]}),getters:{classesCountByEscolaId:a=>s=>a.classes.filter(e=>e.escola_id===s).length},actions:{async getAllClasses(a){try{const{data:s,error:e}=await c.from(r).select("*, escola:escola_id(*)").eq("escola_id",a);if(e)throw e.message;return this.classes=s}catch(s){console.log(s)}},async addClasse(a){try{const{data:s,error:e}=await c.from(r).insert([{nome_classe:a.nome_classe,escola_id:a.escola_id}]).select();if(e)throw e.message;const i=s[0].id;return console.log(i),this.addClasseDisciplina(i,a),this.classes=s}catch{}},async addClasseDisciplina(a,s){console.log(a);try{if(Array.isArray(s.disciplina_id)){const e=s.disciplina_id.map(l=>({disciplina_id:l,classe_id:a,escola_id:s.escola_id,curso_id:s.curso_id})),{data:i,error:o}=await c.from("classes_disciplina").insert(e);if(o)throw o.message}else{const{data:e,error:i}=await c.from("classes_disciplina").insert({disciplina_id:disciplinaID,classe_id:a,escola_id:s.escola_id,curso_id:s.curso_id});if(i)throw i.message}}catch(e){console.error("Erro ao cadastrar classe(s):",e)}},async getClasseById(a){try{const{data:s,error:e}=await c.from(r).select("*").eq("id",a).single();if(e)throw e.message;return s}catch(s){console.log(s)}},async updateClasseById(a,s){try{if(Array.isArray(s.disciplina_id)){const e=s.disciplina_id.map(l=>({disciplina_id:l,classe_id:classeID,escola_id:s.escola_id,curso_id:s.curso_id})),{data:i,error:o}=await c.from("classes_disciplina").update(e).eq("classe_id",a);if(o)throw o.message}else{const{data:e,error:i}=await c.from("classes_disciplina").update({disciplina_id:disciplinaID,classe_id:classeID,escola_id:s.escola_id,curso_id:s.curso_id}).eq("classe_id",a);if(i)throw i.message}}catch(e){console.log(e)}},async deleteClasseById(a){try{d.create({title:"Confirme",message:"Voc\xEA tens a certeza que pretendes apagar este per\xEDodo?",cancel:!0,persistent:!0}).onOk(async()=>{const{data:s,error:e}=await c.from(r).delete().match({id:a});if(e)throw e;return p("Per\xEDodo apagado com sucesso"),s}).onCancel(()=>{console.log("Deletion canceled")})}catch(s){console.log(s)}},async getEscolaIdByEmail(a){try{const{data:s,error:e}=await c.from("escolas").select("id").eq("email",a);if(e)throw e.message;return s[0].id}catch(s){console.log(s)}},async getClassesDisciplinas(a){try{const{data:s,error:e}=await c.from("classes_disciplina").select("disciplina_id, disciplinas:disciplina_id(*)").eq("classe_id",a);if(e)throw e.message;return console.log(s),s}catch(s){console.log(s)}}}});export{h as u};