import { ref } from "vue";
import { useRouter } from "vue-router";
import useSupabase from "boot/supabase";
import sendSMS from "src/utils/sendSMS";

const user = ref(null);
const token = ref(null);
const router = useRouter();

// Suponha que você tenha um arquivo onde gerencia o estado de autenticação, como userAuthUser.js
// Você pode chamar a função renewTokenIfNeeded lá

// src/composible/userAuthUser.js
//import { renewTokenIfNeeded } from "src/utils/tokenRenewal.js";
import { data } from "autoprefixer";

export default function userAuthUser() {
  const { supabase, supabaseAdmin } = useSupabase();

  // Função para verificar o estado de autenticação e renovar o token se necessário
  const checkAuthState = (event, session) => {
    user.value = session?.user;
    token.value = session?.access_token;
    console.log(token.value);
    // Chame a função para renovar o token JWT, se necessário
    //renewTokenIfNeeded(session);
  };

  const isLoggidIn = async () => {
    return !!user.value;
  };

  const getToken = async () => {
    const { data, error } = supabase.auth.onAuthStateChange(checkAuthState);
    if (error) throw error;
    token.value = data;
    return data;
  };

  const getUser = async () => {
    return user.value;
  };
  const login = async ({ email, password }) => {
    const { user, error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error.message;

    localStorage.setItem("accessToken", data.session.access_token);
    localStorage.setItem("refreshToken", data.session.refresh_token);
    return user;
  };

  const refreshToken = localStorage.getItem("refreshToken");

  const refreshAccessToken = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) {
        console.error("Error refreshing token:", error.message);
        // Redirecione o usuário para a página de login
        //window.location.href = "/login";
        logout();
        router.push({ name: "loginPage" });
        return;
      }

      // Atualize os tokens no armazenamento local
      localStorage.setItem("accessToken", data.session.access_token);
      localStorage.setItem("refreshToken", data.session.refresh_token);
    } catch (err) {
      console.error("Error during token refresh:", err.message);
      // Redirecione o usuário para a página de login
      logout();
      router.push({ name: "loginPage" });
    }
  };

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.updateUser({
      accessToken,
      password: newPassword,
    });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
  const register = async ({ email, password, ...meta }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: meta.name,
          phone: meta.phone,
          photoURL: meta.photoURL,
          role: meta.role,
          organization_id: user.value.id,
          redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
        },
      },
    });

    if (error) throw error;
    return data;
  };
  const register1 = async ({ email, password, ...meta }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: meta.name,
          phone: meta.phone,
          photoURL: meta.photoURL,
          role: meta.role,
          redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  const createNewUser = async (newUser) => {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: newUser.email,
      password: newUser.password,
      user_metadata: {
        name: newUser.name,
        phone: newUser.phone,
        photoURL: newUser.photoURL,
        status: true,
        organization_id: newUser.organization_id,
        role: newUser.role,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
      },
    });
    sendSMS(newUser);
    if (error) throw error;
    return data;
  };

  const updateUser = async (userData) => {
    const userID = user.value.id;
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userID,
      {
        email: userData.email,
        password: userData.password,
        user_metadata: {
          name: userData.name,
          phone: userData.phone,
          photoURL: userData.photoURL,
          file_name: userData.file_name,
          organization_id: user.value.id,
          role: userData.role,
          status: userData.status,
        },
      }
    );
    if (error) throw error;
    return data;
  };

  const updateSingleUser = async (id, userData) => {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      email: userData.email,
      password: userData.password,
      user_metadata: {
        name: userData.name,
        phone: userData.phone,
        photoURL: userData.photoURL,
        file_name: userData.file_name,
        organization_id: user.value.id,
        role: userData.role,
        status: userData.status,
      },
    });
    if (error) throw error;
    return data;
  };

  const updateStatusUser = async (id, status) => {
    console.log(id);
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      user_metadata: {
        status: status,
      },
    });
    if (error) throw error;
    return data;
  };

  // const listUsers = async () => {
  //   const {
  //     data: { users },
  //     error,
  //   } = await supabaseAdmin.auth.admin.listUsers();
  //   if (error) throw error;
  //   return users;
  // };

  const listUsers = async () => {
    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;
    const unauthenticatedUsers = users.filter(
      (itenUser) => itenUser.email !== "ildocuema@gmail.com"
    );

    console.log(unauthenticatedUsers);
    return unauthenticatedUsers;
  };

  const deleteUser = async (id) => {
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) throw error;
    return data;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn(provider);
    if (error) throw error;
    return user;
  };

  const sendEmailResetPassword = async ({ email }) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return user;
  };

  return {
    user,
    resetPassword,
    login,
    isLoggidIn,
    getUser,
    logout,
    register,
    register1,
    sendEmailResetPassword,
    loginWithSocialProvider,
    updateUser,
    token,
    getToken,
    listUsers,
    updateStatusUser,
    deleteUser,
    updateSingleUser,
    createNewUser,
    refreshAccessToken,
  };
}
