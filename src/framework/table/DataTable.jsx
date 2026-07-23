import { useEffect, useMemo, useState } from "react";

export default function DataTable({
    data = [],
    config = {},
    // columns = [],
    // actions = [],
    onAction,
}) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const columns = config.columns.filter(c => !c.hideInTable) || [];
    const actions = config.actions || [];

    // 🔍 FILTRE
    const filteredData = useMemo(() => {
        if (!search) return data;

        return data.filter((row) =>
            columns.some((col) => {
                const value = row[col.field];
                return String(value ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase());
            })
        );
    }, [data, search, columns]);

    // 📄 PAGINATION FRONT
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page, pageSize]);


    useEffect(() => {
        const newTotalPages = Math.ceil(filteredData.length / pageSize);

        if (page > newTotalPages) {
            setPage(1);
        }
    }, [pageSize, filteredData.length]);

    return (
        <div style={{ fontFamily: "Arial" }}>

            {/* 🔍 SEARCH + ACTIONS GLOBAL */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10
            }}>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                    }}
                >
                    <option value={5}>5 par page</option>
                    <option value={10}>10 par page</option>
                    <option value={25}>25 par page</option>
                    <option value={50}>50 par page</option>
                </select>
                <input
                    placeholder="🔍 Rechercher..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    style={{
                        padding: 6,
                        width: 250
                    }}
                />

            </div>

            {/* TABLE */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "white"
                }}
            >
                <thead>
                    <tr style={{ background: "#f5f5f5" }}>
                        {columns.map((col) => (
                            <th
                                key={col.field}
                                style={{
                                    textAlign: "left",
                                    padding: 10,
                                    borderBottom: "1px solid #ddd"
                                }}
                            >
                                {col.header}
                            </th>
                        ))}

                        {actions.length > 0 && (
                            <th style={{ padding: 10 }}>Actions</th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.map((row) => (
                        <tr key={row.id} style={{ borderBottom: "1px solid #eee" }}>

                            {columns.map((col) => (
                                <td key={col.field} style={{ padding: 10 }}>
                                    {col.render
                                        ? col.render(row[col.field], row)
                                        : row[col.field]}
                                </td>
                            ))}

                            {actions.length > 0 && (

                                <td>
                                    {actions.map((a, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onAction(a.action, row)}
                                        >
                                            {a.label}
                                        </button>
                                    ))}
                                </td>

                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 📄 PAGINATION */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
                gap: 5
            }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                            padding: "5px 10px",
                            background: p === page ? "#333" : "#eee",
                            color: p === page ? "white" : "black",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
}