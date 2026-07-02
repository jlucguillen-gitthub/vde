import { useChorale } from "../../core/hooks/useChorale";

export default function DashboardChanteur() {
  const { chanteur } = useChorale();

  return (
    <div>
      <h1>🎼 Bonjour {chanteur?.prenom}</h1>

      <p>Bienvenue dans votre espace chorale</p>

      <ul>
        <li>🎵 Mes chansons</li>
        <li>🎤 Concerts</li>
        <li>🗓️ Répétitions</li>
        <li>🗳️ Votes</li>
      </ul>
    </div>
  );
}