import { useEffect, useMemo, useState } from "react";

import DataTable from "../table/DataTable";
import FormModal from "../form/FormModal";

export default function CRUDPage({ config }) {



    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [errors, setErrors] = useState([]);
    const [controller, setController] = useState(config.controller );

    // LOAD
    const load = () => controller.load(setItems);

    useEffect(() => {
        load();
    }, [config.entity]);



    // ACTIONS TABLE
    const handleAction = (action, row) => {

        switch (action) {

            case "edit":
                setEditItem(row);
                setOpen(true);
                break;

            case "activate":
                controller.activate(row.id, load);
                break;

            case "delete":
                if(window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
                    controller.delete(row.id, load);
                }
                break;

            default:
                console.warn("Unknown action:", action);
        }
    };

    // SAVE (CREATE / UPDATE)
    const handleSave = async (form) => {
        console.log("handleSave form", form);
        try {
            setErrors([]);


            const result = await controller.save(form, load);
            console.log("handleSave result", result);
            if (!result.success) {
                console.log("dans result en erreur", result);
                setErrors(result.errors || []);
                return;
            }
            console.log("avnt setOen");
            setOpen(false);
            console.log("apres setOen");
            setEditItem(null);

        } catch (e) {
            console.log("handleSave error", e);
            setErrors([{ message: e.message }]);
        }
    };

    return (
        <div>

            {/* TITLE */}
            <h1>{config.title}</h1>

            {/* ERRORS */}
            {errors.length > 0 && (
                <div style={{ color: "red", marginBottom: 10 }}>
                    {errors.map((e, i) => (
                        <div key={i}>{e.message}</div>
                    ))}
                </div>
            )}

            {/* CREATE BUTTON */}
            <button
                style={{ marginBottom: 10 }}
                onClick={() => {
                    setEditItem(null);
                    setOpen(true);
                }}
            >
                ➕ Nouveau
            </button>

            {/* TABLE */}
            <DataTable
                data={items}
                config={config}
                onAction={handleAction}
            />

            {/* MODAL */}
            <FormModal
                open={open}
                config={config}
                errors={errors}
                initialData={editItem}
                onClose={() => setOpen(false)}
                onSave={handleSave}
            />

        </div>
    );
}