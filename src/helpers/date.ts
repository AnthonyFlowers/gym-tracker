export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatDateTime = (date: Date): string => {
    const dateString = formatDate(date);
    const hour = String(date.getHours());
    const minute = String(date.getMinutes());
    return `${dateString}T${hour}-${minute}`;
};
