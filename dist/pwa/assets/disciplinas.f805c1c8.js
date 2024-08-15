import{aW as d,bJ as l,aC as p}from"./index.bc90a1a6.js";import{u}from"./useNotify.98763d5b.js";const{supabase:c}=p(),{notifyError:g,notifySuccess:n}=u(),r="disciplinas",h=d("disciplinas",{state:()=>({disciplinas:[]}),getters:{disciplinasCountByEscolaId:e=>s=>e.disciplinas.filter(i=>i.escola_id===s).length},actions:{async getAllDisciplinas(e){try{const{data:s,error:i}=await c.from(r).select("*, escola:escola_id(*)").eq("escola_id",e);if(i)throw i.message;return this.disciplinas=s}catch(s){console.log(s)}},async addDisciplina(e){try{const{data:s,error:i}=await c.from(r).insert([{nome_disciplina:e.nome_disciplina,descricao:e.descricao,escola_id:e.escola_id}]).select(),a=s[0].id;if(i)throw i.message;return this.addDisciplinaCurso(a,e),this.disciplinas=s}catch{}},async addDisciplinaCurso(e,s){try{if(Array.isArray(s.curso_id)){const i=s.curso_id.map(t=>({disciplina_id:e,curso_id:t,escola_id:s.escola_id})),{data:a,error:o}=await c.from("disciplinas_curso").insert(i);if(o)throw o.message}else{const{data:i,error:a}=await c.from("disciplinas_curso").insert({disciplina_id:e,curso_id:s.curso_id,escola_id:s.escola_id});if(a)throw a.message}}catch{}},async getDisciplinaById(e){console.log(e);try{const{data:s,error:i}=await c.from(r).select("*").eq("id",e).single();if(i)throw i.message;return s}catch(s){console.log(s)}},async updateDisciplinaById(e,s){try{const i=Array.isArray(s.curso_id)?s.curso_id.map(t=>({nome_disciplina:s.nome_disciplina,curso_id:t,descricao:s.descricao,escola_id:s.escola_id})):[{nome_disciplina:s.nome_disciplina,curso_id:s.curso_id,descricao:s.descricao,escola_id:s.escola_id}],{data:a,error:o}=await c.from(r).update(i).eq("id",e);if(o)throw o.message;return n("Disciplina actualizado com sucesso"),a}catch(i){console.log(i)}},async deleteDisciplinaById(e){try{l.create({title:"Confirme",message:"Voc\xEA tens a certeza que pretendes apagar esta disciplina?",cancel:!0,persistent:!0}).onOk(async()=>{const{data:s,error:i}=await c.from(r).delete().match({id:e});if(i)throw i;return n("Disciplina apagada com sucesso"),s}).onCancel(()=>{console.log("Deletion canceled")})}catch(s){console.log(s)}},async disciplinaCursos(e){try{const{data:s,error:i}=await c.from("disciplinas_curso").select("curso_id, cursos:curso_id(*)").eq("disciplina_id",e);if(i)throw i.message;return console.log(s),s}catch{}},async getEscolaIdByEmail(e){try{const{data:s,error:i}=await c.from("escolas").select("id").eq("email",e);if(i)throw i.message;return s[0].id}catch(s){console.log(s)}}}});export{h as u};
