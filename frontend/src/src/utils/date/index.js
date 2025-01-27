export const formatMemberSinceDate = (createdAt) => {
    const date = new Date(createdAt);
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `Bergabung ${month} ${year}`;
};