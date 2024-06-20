import userAuthUser from "./userAuthUser";
import userSupabase from "boot/supabase";
import { v4 as uuid } from "uuid";
import { ref } from "vue";
import useBrand from "src/composible/useBrand.js";
import { useQuasar } from "quasar";
import sendSMS from "src/utils/sendSMS";

const brand = ref({
  name: "",
  phone: "",
  primary: "",
  secondary: "",
});
export default function userApi() {
  const { user, getToken } = userAuthUser();
  const $q = useQuasar();
  const fileName = uuid();
  const { supabase, supabaseAdmin } = userSupabase();
  const { setBrand } = useBrand();

  const list = async (table, organization_id) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", organization_id);
    if (error) throw error;
    return data;
  };

  const getFuncionariosWithCategoriasAndEscolas = async (tabela) => {
    const { data, error } = await supabase.from(tabela).select(`
      id,
      *,
      escolas (id, name), categorias (id, categoria)
    `);
    if (error) throw error;
    return data;
  };
  const getFuncionarioWithCategoriasAndEscolas = async (
    tabela,
    idFuncionario
  ) => {
    const { data, error } = await supabase
      .from(tabela)
      .select(
        `
      id,
      *,
      escolas (id, name), categorias (id, categoria)
    `
      )
      .eq("id", idFuncionario);
    if (error) throw error;
    return data;
  };

  const fetchCount = async (table, userId) => {
    const { data, error, count } = await supabase
      .from(table)
      .select("*", { count: "exact" })
      .eq("user_id", userId);
    if (error) throw error;
    return {
      data,
      count,
    };
  };

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select().eq("id", id);
    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert({ ...form, user_id: user.value.id });
    if (error) throw error;
    return data;
  };
  const postFuncionario = async (table, form) => {
    const { data, error } = await supabase.from(table).insert({
      name: form.name,
      nome_pai: form.nome_pai,
      nome_mae: form.nome_mae,
      num_agente: form.num_agente,
      num_bilhete: form.num_bilhete,
      phone: form.phone,
      data_emissao: form.data_emissao,
      data_caducidade: form.data_caducidade,
      data_nascimento: form.data_nascimento,
      num_conta_bancaria: form.num_conta_bancaria,
      email: form.email,
      genero: form.genero,
      data_inicio_funcao: form.data_inicio_funcao,
      provincia: form.data_inicio_funcao,
      municipio: form.municipio,
      comuna: form.comuna,
      localidade: form.localidade,
      status_nomeacao: form.status_nomeacao,
      categoria_id: form.categoria_id,
      escola_id: form.escola_id,
      habilitacao: form.habilitacao,
      area_formacao: form.area_formacao,
      instituto_formacao: form.instituto_formacao,
      img_url: form.img_url,
      file_name: form.file_name,
      salario_base: form.salario_base,
      salario_liquido: form.salario_liquido,
      nivelAcademico: form.nivelAcademico,
      salario_base_extenso: form.salario_base_extenso,
      salario_liquido_extenso: form.salario_liquido_extenso,
      cituacao_funcionario: form.cituacao_funcionario,
      estado_civil: form.estado_civil,
      balcao_domicilio: form.balcao_domicilio,
      balcao_domicilio_provincia: form.balcao_domicilio_provincia,
      balcao_domicilio_municipio: form.balcao_domicilio_municipio,
      user_id: user.value.id,
    });
    creatCountUser(form);
    if (error) throw error;
    return data;
  };

  const postEscola = async (table, form) => {
    const { data, error } = await supabase.from(table).insert({
      name: form.name,
      numero: form.numero,
      num_decreto: form.num_decreto,
      provincia: form.provincia,
      municipio: form.municipio,
      natureza_escola: form.natureza_escola,
      tipo_escola: form.tipo_escola,
      salas_professores: form.salas_professores,
      salas_alunos: form.salas_alunos,
      email: form.email,
      phone: form.phone,
      role: form.role,
      user_id: user.value.id,
    });

    creatCountUser(form);
    if (error) throw error;
    return data;
  };

  //criar conta usuario
  const creatCountUser = async (itemForm) => {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.admin.createUser({
      email: itemForm.email,
      password: itemForm.password,
      user_metadata: {
        name: itemForm.name,
        email: itemForm.email,
        phone: itemForm.phone,
        role: itemForm.role,
        status: true,
      },
    });
    sendSMS(itemForm);
    if (error) throw error;
    return user;
  };
  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id });

    if (error) throw error;
    return data;
  };
  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });

    if (error) throw error;
    return data;
  };

  // Ûploud de Imagens
  const uploadImage = async (file, storage) => {
    const { data, error } = await supabase.storage
      .from(storage)
      .upload(fileName, file, {
        cacheControl: 3600,
        upsert: false,
      });

    const publicURL = await getImagUrl(fileName, storage);
    if (error) throw error;
    return publicURL;
  };

  // Pega a Url da Imagem
  const getImagUrl = async (fileName, storage) => {
    const { data, error } = await supabase.storage
      .from(storage)
      .getPublicUrl(fileName);
    if (error) throw error;
    console.log(data.publicUrl);
    return data.publicUrl;
  };

  const getBrand = async () => {
    const id = user?.value?.id;
    if (id) {
      $q.loading.show();
      const { data, error } = await supabase
        .from("config")
        .select("*")
        .eq("user_id", id);

      if (error) throw error;
      if (data.length > 0) {
        (brand.value = data[0]),
          setBrand(brand.value.primary, brand.value.secondary);
      }
      $q.loading.hide();
      return brand;
    }
  };

  const totalFuncionatioPorGenero = async (tabela) => {
    const { data, error } = await supabase.from(tabela).select("genero");

    if (error) throw error;
    const counts = {};
    data.forEach((row) => {
      counts[row.genero] = (counts[row.genero] || 0) + 1;
    });
    // Formata os dados para o formato necessário para o Vue-Google-Charts
    const newData = [["Gênero", "Total de Funcionários"]];
    Object.keys(counts).forEach((genero) => {
      newData.push([genero, counts[genero]]);
    });

    // Atualiza os dados do gráfico
    return newData;
  };

  const totalFuncionatioPornivel = async (tabela) => {
    const { data, error } = await supabase
      .from(tabela)
      .select("nivelAcademico");

    if (error) throw error;
    const counts = {};

    data.forEach((row) => {
      counts[row.nivelAcademico] = (counts[row.nivelAcademico] || 0) + 1;
    });

    const newDataNivel = [["Nivel", "Total"]];
    Object.keys(counts).forEach((nivelAcademico) => {
      newDataNivel.push([nivelAcademico, counts[nivelAcademico]]);
    });
    console.log(newDataNivel);
    return newDataNivel;
  };

  const graficos = async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data;
  };

  return {
    list,
    getById,
    post,
    uploadImage,
    graficos,
    update,
    remove,
    fileName,
    getBrand,
    brand,
    getFuncionariosWithCategoriasAndEscolas,
    getFuncionarioWithCategoriasAndEscolas,
    fetchCount,
    totalFuncionatioPorGenero,
    totalFuncionatioPornivel,
    postEscola,
    postFuncionario,
  };
}
