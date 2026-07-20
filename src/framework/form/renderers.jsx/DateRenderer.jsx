export default function DateRenderer({
    field,
    form,
    onChange
}) {

    return (
            <input
                type="date"
                value={form[field.field] || ""}
                onChange={(e) =>
                    onChange(field.field, e.target.value)
                }
            />
    );
}