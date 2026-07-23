import { supabase } from "./client";

export async function getChanteurByToken(token) {
  const { data, error } = await supabase
    .from("acces")
    .select(`
        *,
        saison_chanteurs (
            etat (*),
            saison_id,
            chanteur_id,
            chanteurs (*),
            saisons (*)
        )
    `)
    .eq("token", token)
    .eq("actif", true)
    .is("deleted_at", null)

  console.log(error)
  console.log(data)
  if (error || !data) {
    return null;
  }  
  return {
    chanteur: data.saison_chanteurs,
    chorale_id: data.chorale_id
  };
}