import { useEffect, useState } from "react";

export default function FormModal({
    open,
    config,
    initialData = null,
    errors = [],
    onClose,
    onSave
}) {

    const [form, setForm] = useState({});

    // ✔ 1. hooks toujours en premier
    useEffect(() => {
        if (!open) return;

        if (initialData) {
            setForm(initialData);
        } else {
            const obj = {};

            config.columns.forEach(f => {
                if (f.type === "date") obj[f.field] = "";
                if (f.type === "text") obj[f.field] = "";
                if (f.type === "number") obj[f.field] = "";
                if (f.type === "boolean") obj[f.field] = false;
            });

            setForm(obj);
        }
    }, [initialData, open, config]);

    const errorsByField = Object.fromEntries(
        errors.map(e => [e.field, e.message])
    );

    // ✔ 2. ensuite logique normale
    if (!open) return null;

    const fields = config.columns || [];

    const handleChange = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        },
        modal: {
            background: "white",
            padding: 20,
            width: 500,
            borderRadius: 8
        }
    };


    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>

                <h2>{initialData ? "✏️ Modifier" : "➕ Créer"}</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {fields.map((f) => (
                        f.hideInForm ? null : (
                            <div key={f.field}>
                                <label>{f.header}</label>

                                {f.type === "text" && (
                                    <input
                                        value={form[f.field] || ""}
                                        onChange={(e) =>
                                            handleChange(f.field, e.target.value)
                                        }
                                    />

                                )}

                                {f.type === "date" && (
                                    <input
                                        type="date"
                                        value={form[f.field] || ""}
                                        onChange={(e) =>
                                            handleChange(f.field, e.target.value)
                                        }
                                    />
                                )}

                                {f.type === "number" && (
                                    <input
                                        type="number"
                                        value={form[f.field] || ""}
                                        onChange={(e) =>
                                            handleChange(f.field, e.target.value)
                                        }
                                    />
                                )}

                                {errorsByField[f.field] && (
                                    <div
                                        style={{
                                            color: "#dc3545",
                                            fontSize: 12,
                                            marginTop: 4
                                        }}
                                    >
                                        {errorsByField[f.field]}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </div>

                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                    <button onClick={onClose}>Annuler</button>

                    <button onClick={() => onSave(form)}>
                        Enregistrer
                    </button>
                </div>

            </div>
        </div>
    );
}