import { Outlet } from "react-router-dom";

export default function ChanteurLayout() {
  return (
    <div>
      <header>🎼 Chorale - Espace chanteur</header>

      <nav>
        {/* futur menu */}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}