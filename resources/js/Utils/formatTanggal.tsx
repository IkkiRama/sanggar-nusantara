const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });

    return `${formattedDate}, ${formattedTime}`;
};


export default formatTanggal
