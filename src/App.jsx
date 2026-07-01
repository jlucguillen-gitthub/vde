import { useEffect } from "react";
import { supabase } from "./supabase";

function App() {

  useEffect(() => {

    async function test() {

      const { data, error } = await supabase
        .from("questions")
        .select("*");

      console.log(data);
      console.log(error);

    }

    test();

  }, []);

  return <>Bonjour</>;
}

export default App;