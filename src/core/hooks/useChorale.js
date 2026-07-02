import { useEffect, useState } from "react";

export function useChorale() {
  const [chanteur, setChanteur] = useState(null);
  const [choraleId, setChoraleId] = useState(null);

  useEffect(() => {
    const c = localStorage.getItem("chanteur");
    const t = localStorage.getItem("chorale_id");

    if (c) setChanteur(JSON.parse(c));
    if (t) setChoraleId(t);
  }, []);

  return { chanteur, choraleId };
}