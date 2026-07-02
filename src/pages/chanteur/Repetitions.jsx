import { useEffect, useState } from "react";
import { supabase } from "../../core/supabase/client";
import { useChorale } from "../../core/hooks/useChorale";

export default function Repetitions() {
  const { choraleId } = useChorale();
  const [reps, setReps] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("repetitions")
        .select("*")
        .eq("chorale_id", choraleId);

      setReps(data || []);
    }

    if (choraleId) load();
  }, [choraleId]);

  return (
    <div>
      <h2>🗓️ Répétitions</h2>

      {reps.map((r) => (
        <div key={r.id}>
          <h3>{r.titre}</h3>
          <p>{r.lieu}</p>
        </div>
      ))}
    </div>
  );
}