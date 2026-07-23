import { useEffect, useState } from "react";
import { chanteurConfig } from "../../../../config/entities/chanteur.config";
import { supabase } from "../../../../core/supabase/client";
import CRUDPage from "../../../../framework/crud/CRUDPage";


export default function ChanteurPage() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log(session);
      setSession(session);
    };

    fetchSession();
  }, []);

    return <CRUDPage 
    config={chanteurConfig} />;
}