import { useEffect, useState } from "react";
import { supabase } from "../core/supabase/client";

export default function Chanteurs() {
  const [chanteurs, setChanteurs] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("chanteurs").select("*");
      setChanteurs(data || []);
    }

    load();
  }, []);

  return (
    <div>
      <h2>👤 Chanteurs</h2>

      {chanteurs.map((c) => (
        <div key={c.id}>
          {c.prenom} {c.nom}
        </div>
      ))}
    </div>
  );
}