import { fetchALead, reserveALead, getLeadLog, fetchSQL_CW } from '$lib/fetch';
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

    const guid = params.guid;
    const prnt = await parent();
    const sql = `select * from leadRaw WHERE guid='${guid}'`;
    console.log(sql)
    const rec = await fetchSQL_CW(sql)
    console.log(rec)
    return { lead: rec[0] };
}