//supabase
import { createClient } from "@supabase/supabase-js";
import userAuthUser from "src/composible/userAuthUser";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user, token } = userAuthUser();
  user.value = session?.user;
  token.value = session?.access_token;
});

export default function useSupabase() {
  return { supabase };
}
