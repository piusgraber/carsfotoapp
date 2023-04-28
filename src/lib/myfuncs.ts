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

const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    //		timeZone: 'Europe/Zurich'
    timeZone: 'UTC'
};

export const timeSecFormatter = new Intl.DateTimeFormat(locale, options);
export const dateTimeFormatter = new Intl.DateTimeFormat(locale, dateTimeOptions);
export const dateFormatter = new Intl.DateTimeFormat(locale, dateOptions);


export const formatDate = (d, f) => {
    if (d) {
        console.log('=============', d)
        if (f=='d') {
            return dateFormatter.format(new Date(d))
        }
        if (f=='m') {
            return dateTimeFormatter.format(new Date(d))
        }
        if (f=='s') {
            return timeSecFormatter.format(new Date(d))
        }
    }
    console.log('++++++++++++++', d)
    return ''
}


