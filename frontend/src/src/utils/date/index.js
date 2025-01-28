export const formatPostDate = (createdAt) => {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);

    const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

    if (timeDifferenceInDays > 1) {
        return createdAtDate.toLocaleDateString("id", { month: "short", day: "numeric" });
    } else if (timeDifferenceInDays === 1) {
        return "1 hari";
    } else if (timeDifferenceInHours >= 1) {
        return `${timeDifferenceInHours} jam`;
    } else if (timeDifferenceInMinutes >= 1) {
        return `${timeDifferenceInMinutes} menit`;
    } else {
        return "Baru saja";
    }
};

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