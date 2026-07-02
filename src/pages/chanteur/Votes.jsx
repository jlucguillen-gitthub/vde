import { useEffect, useState } from "react";
import { supabase } from "../../core/supabase/client";
import { useChorale } from "../../core/hooks/useChorale";

export default function Votes() {
  const { choraleId, chanteur } = useChorale();
  const [chansons, setChansons] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("chorale_chansons")
        .select(`chanson_id, chansons(id, titre)`)
        .eq("chorale_id", choraleId);

      setChansons(data || []);
    }

    if (choraleId) load();
  }, [choraleId]);

  async function vote(chansonId, value) {
    await supabase.from("votes_chansons").upsert({
      chorale_id: choraleId,
      chanteur_id: chanteur.id,
      chanson_id: chansonId,
      vote: value,
    });
  }

  return (
    <div>
      <h2>🗳️ Votes</h2>

      {chansons.map((c) => (
        <div key={c.chanson_id}>
          <p>{c.chansons.titre}</p>

          <button onClick={() => vote(c.chanson_id, 1)}>1</button>
          <button onClick={() => vote(c.chanson_id, 3)}>3</button>
          <button onClick={() => vote(c.chanson_id, 5)}>5</button>
        </div>
      ))}
    </div>
  );
}