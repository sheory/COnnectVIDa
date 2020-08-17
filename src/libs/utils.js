module.exports = {
    date: function(birthTimestamp){
        const date = new Date(birthTimestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
        const hour = date.getHours();
        const minutes = `0${date.getMinutes()}`.slice(-2);
        return {
            hourFormat: `${hour}:${minutes}`,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        };
    }
}