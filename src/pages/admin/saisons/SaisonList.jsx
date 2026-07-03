import { useEffect, useState } from "react";
import { SaisonController } from "../../../controllers/SaisonController";
import CRUDPage from "../../../framework/crud/CRUDPage";
import { saisonConfig } from "../../../config/entities/saison.config";

export default function SaisonList() {
    return <CRUDPage config={saisonConfig} />;
}
