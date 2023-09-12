const locale = 'de-CH';
const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    //		timeZone: 'Europe/Zurich'
    timeZone: 'UTC'
};

const dateTimeOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    //		timeZone: 'Europe/Zurich'
    timeZone: 'UTC'
};
const dateTimeOptionsMEZ: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Zurich'
};

const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    //		timeZone: 'Europe/Zurich'
    timeZone: 'UTC'
};

const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Zurich'
};

export const timeSecFormatter = new Intl.DateTimeFormat(locale, options);
export const dateTimeFormatter = new Intl.DateTimeFormat(locale, dateTimeOptions);
export const dateTimeFormatterMEZ = new Intl.DateTimeFormat(locale, dateTimeOptionsMEZ);
export const dateTimeFormatterMEZT = new Intl.DateTimeFormat(locale, dateTimeOptionsMEZ);
export const dateFormatter = new Intl.DateTimeFormat(locale, dateOptions);
export const timeFormatter = new Intl.DateTimeFormat(locale, timeOptions);



export const formatDate = (d, f) => {
    if (d) {
        if (f == 'd') {
            return dateFormatter.format(new Date(d))
        }
        if (f == 'm') {
            return dateTimeFormatter.format(new Date(d))
        }
        if (f == 'mu') {
            return dateTimeFormatterMEZ.format(new Date(d))
        }
        if (f == 's') {
            return timeSecFormatter.format(new Date(d))
        }
        if (f == 't') {
            return timeFormatter.format(new Date(d))
        }
        if (f == 'x') {
            let dt = dateTimeFormatter.format(new Date(d))
            const ddd = dt.substring(6, 10) + '-' + dt.substring(3, 5) + '-' + dt.substring(0,2) + 'T' + dt.substring(12,14)  + ':' + dt.substring(15,17) 
            return ddd;
        }
        if (f == 'xu') {
            let dt = dateTimeFormatterMEZ.format(new Date(d))
            const ddd = dt.substring(6, 10) + '-' + dt.substring(3, 5) + '-' + dt.substring(0,2) + 'T' + dt.substring(12,14)  + ':' + dt.substring(15,17) 
            return ddd;
        }
    }
    return ''
}


