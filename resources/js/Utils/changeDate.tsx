export const changeDate = (tanggal) =>
    new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(tanggal)
