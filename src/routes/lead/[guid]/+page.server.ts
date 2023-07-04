import { fetchALead, reserveALead, getLeadLog } from '$lib/fetch';
import { dateTimeFormatterMEZ, dateTimeFormatterMEZT, formatDate } from '$lib/myfuncs';
import type { PageServerLoad } from './$types';

const setTelefon = (lead) => {
    if (lead.telefon) {
        if (lead.telefonart == 'M') {
            lead.telefonm = lead.telefon;
        }
        if (lead.telefonart == 'G') {
            lead.telefong = lead.telefon;
        }
        if (lead.telefonart == 'P') {
            lead.telefonp = lead.telefon;
        }
    }
    if (lead.telefon2) {
        if (lead.telefonart2 == 'M') {
            lead.telefonm = lead.telefon2;
        }
        if (lead.telefonart2 == 'G') {
            lead.telefong = lead.telefon2;
        }
        if (lead.telefonart2 == 'P') {
            lead.telefonp = lead.telefon2;
        }
    }
    if (lead.telefon3) {
        if (lead.telefonart3 == 'M') {
            lead.telefonm = lead.telefon3;
        }
        if (lead.telefonart3 == 'G') {
            lead.telefong = lead.telefon3;
        }
        if (lead.telefonart3 == 'P') {
            lead.telefonp = lead.telefon3;
        }
    }
}

export const load: PageServerLoad = async ({ params, parent }) => {

    // Daten kommen aus server.js -> reserveLead

    const guid = params.guid;
    const prnt = await parent();
    // Lead reservieren
    let lead = await reserveALead(guid, prnt.user.id);
    // die Daten zurückgeben -> $page.data
    let leadLog = await getLeadLog(lead.id);
    if (false && leadLog.length) {
        const log = leadLog[leadLog.length - 1]
        const ldate = new Date(log.datum);
        console.log('log', ldate);
        const now = new Date();
        console.log('jetzt', new Date(formatDate(now, 'm')));


        const options = { timeZone: 'Europe/Berlin' };
        const mezNow = now.toLocaleString('de-DE', options);
        console.log(mezNow);

        if( log.datum) {
            lead.available = false;
        }
    } else {
        lead.available = true;
    }
    lead.tip = 'User: ' + prnt.user.id + '\n' + 'Res: ' + lead.recallmaid
    console.log(leadLog)
    setTelefon(lead)
    return { lead: lead, leadlog: leadLog };
}