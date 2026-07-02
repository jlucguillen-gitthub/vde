import { useEffect, useState } from "react";
import { supabase } from "../../core/supabase/client";

export default function Chansons() {
  const [chansons, setChansons] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("chansons").select("*");
      setChansons(data || []);
    }

    load();
  }, []);

  return (
    <div>
      <h2>🎵 Chansons</h2>

      {chansons.map((c) => (
        <div key={c.id}>
          <h3>{c.titre}</h3>
        </div>
      ))}
    </div>
  );
}