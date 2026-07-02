import { supabase } from "./client";

export async function getChanteurByToken(token) {
  const { data, error } = await supabase
    .from("chanteur_tokens")
    .select(`
      chanteur_id,
      chorale_id,
      chanteurs (*)
    `)
    .eq("token", token)
    .single();

  if (error) return null;

  return {
    chanteur: data.chanteurs,
    chorale_id: data.chorale_id
  };
}