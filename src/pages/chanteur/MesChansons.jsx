import { useEffect, useState } from "react";
import { supabase } from "../../core/supabase/client";
import { useChorale } from "../../core/hooks/useChorale";

export default function MesChansons() {
  const { choraleId } = useChorale();
  const [chansons, setChansons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("chorale_chansons")
        .select(`
          chanson_id,
          chansons (
            id,
            titre,
            paroles
          )
        `)
        .eq("chorale_id", choraleId);

      setChansons(data || []);
    }

    if (choraleId) fetchData();
  }, [choraleId]);

  return (
    <div>
      <h2>🎵 Mes chansons</h2>

      {chansons.map((c) => (
        <div key={c.chanson_id}>
          <h3>{c.chansons.titre}</h3>
          <p>{c.chansons.paroles}</p>
        </div>
      ))}
    </div>
  );
}