import { supabase } from "./supabase";
export async function googleLogin(){return supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});}
export async function sendPhoneOtp(phone){return supabase.auth.signInWithOtp({phone});}
export async function verifyPhoneOtp(phone,token){return supabase.auth.verifyOtp({phone,token,type:"sms"});}
export async function signOut(){return supabase.auth.signOut();}
export async function ensureProfile(user){if(!user)return;await supabase.from("profiles").upsert({id:user.id,full_name:user.user_metadata?.full_name||user.user_metadata?.name||user.email||null,phone:user.phone||null},{onConflict:"id"});}
