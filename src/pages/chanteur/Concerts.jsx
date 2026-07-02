import { useEffect, useState } from "react";
import { supabase } from "../../core/supabase/client";
import { useChorale } from "../../core/hooks/useChorale";

export default function Concerts() {
  const { choraleId, chanteur } = useChorale();
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("concerts")
        .select("*")
        .eq("chorale_id", choraleId);

      setConcerts(data || []);
    }

    if (choraleId) load();
  }, [choraleId]);

  async function setStatut(concertId, statut) {
    await supabase.from("chanteur_concerts").upsert({
      chorale_id: choraleId,
      chanteur_id: chanteur.id,
      concert_id: concertId,
      statut,
    });
  }

  return (
    <div>
      <h2>🎤 Concerts</h2>

      {concerts.map((c) => (
        <div key={c.id}>
          <h3>{c.titre}</h3>

          <button onClick={() => setStatut(c.id, "present")}>✔ présent</button>
          <button onClick={() => setStatut(c.id, "absent")}>✖ absent</button>
        </div>
      ))}
    </div>
  );
}