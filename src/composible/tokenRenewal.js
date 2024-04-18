import userAuthUser from "src/composible/userAuthUser";
import { supabase } from "@/plugins/supabase"; // Suponha que você tenha configurado o supabase como um plugin

// Função para verificar se o token JWT está expirado
function isTokenExpired(token) {
  // Coloque aqui a lógica para verificar se o token está expirado
}

// Função para renovar o token JWT
async function renewTokenIfNeeded(session) {
  const token = session?.access_token;

  if (!token || !isTokenExpired(token)) {
    // Se não houver um token ou se ele não estiver expirado, não é necessário renovar
    return;
  }

  try {
    // Faça uma solicitação para renovar o token utilizando o método refreshSession() do Supabase
    const refreshedSession = await supabase.auth.refreshSession();

    // Atualize o token no objeto de sessão do Supabase
    session.access_token = refreshedSession.access_token;

    // Atualize o usuário e o token no estado global (se estiver usando Vuex ou algo semelhante)
    const { user, token } = userAuthUser();
    user.value = refreshedSession.user;
    token.value = refreshedSession.access_token;
  } catch (error) {
    console.error("Erro ao renovar o token:", error);
    // Lidar com o erro de renovação de token aqui, como redirecionar para a página de login ou exibir uma mensagem de erro
  }
}

export { renewTokenIfNeeded };
