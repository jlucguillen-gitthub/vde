import { BrowserRouter, Routes, Route } from "react-router-dom";

import TokenGuard from "../core/auth/TokenGuard";
import AdminGuard from "../core/auth/AdminGuard";

import InvalidToken from "../pages/public/InvalidToken";

import ChanteurLayout from "../pages/chanteur/ChanteurLayout";
import DashboardChanteur from "../pages/chanteur/Dashboard";


import DashboardAdmin from "../pages/admin/Dashboard";
import { Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import Chansons from "../pages/chanteur/Chansons";
import Concerts from "../pages/chanteur/Concerts";
import Repetitions from "../pages/chanteur/Repetitions";
import Votes from "../pages/chanteur/Votes";
import Chanteurs from "../pages/admin/Chanteurs";
import ChansonsAdmin from "../pages/admin/Chansons";
import ConcertsAdmin from "../pages/admin/Concerts";
import AdminLogin from "../pages/admin/login/login";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import SaisonList from "../pages/admin/saisons/SaisonList";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                {/* HOME */}
                <Route path="/" element={<Home />} />

                {/* ERROR */}
                <Route path="/invalid-token" element={<InvalidToken />} />

                {/* CHANTEUR */}
                <Route element={<TokenGuard />}>
                    <Route path="/app" element={<ChanteurLayout />}>
                        <Route index element={<DashboardChanteur />} />
                        <Route path="chansons" element={<Chansons />} />
                        <Route path="concerts" element={<Concerts />} />
                        <Route path="repetitions" element={<Repetitions />} />
                        <Route path="votes" element={<Votes />} />
                    </Route>
                </Route>

                {/* ADMIN LOGIN */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* ADMIN APP */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminGuard>
                            <AdminLayout />
                        </AdminGuard>
                    }
                >
                    <Route index element={<Dashboard />} />

                    <Route path="saisons" element={<div>Saisons</div>} />
                    <Route path="saisonsliste" element={<SaisonList />} />
                    <Route path="chanteurs" element={<div>Chanteurs</div>} />
                    <Route path="chansons" element={<div>Chansons</div>} />
                    <Route path="concerts" element={<div>Concerts</div>} />
                    <Route path="repetitions" element={<div>Répetitions</div>} />
                    <Route path="invitations" element={<div>Invitations</div>} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}