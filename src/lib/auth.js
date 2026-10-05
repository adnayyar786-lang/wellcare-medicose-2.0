import { supabase } from "./supabase";

const PRODUCTION_REDIRECT_URL = "https://wellcare-medicose-2-0.adnayyar786.workers.dev";

export async function googleLogin(){
  return supabase.auth.signInWithOAuth({
    provider:"google",
    options:{
      redirectTo:PRODUCTION_REDIRECT_URL,
      queryParams:{access_type:"offline",prompt:"select_account"}
    }
  });
}

export async function sendPhoneOtp(phone){return supabase.auth.signInWithOtp({phone});}
export async function verifyPhoneOtp(phone,token){return supabase.auth.verifyOtp({phone,token,type:"sms"});}
export async function signOut(){return supabase.auth.signOut();}
export async function ensureProfile(user){
  if(!user)return;
  await supabase.from("profiles").upsert({
    id:user.id,
    full_name:user.user_metadata?.full_name||user.user_metadata?.name||user.email||null,
    phone:user.phone||null
  },{onConflict:"id"});
}
