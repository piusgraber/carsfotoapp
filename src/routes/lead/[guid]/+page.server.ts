import { fetchALead, reserveALead, getLeadLog } from '$lib/fetch';
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
            lead.telefonm = lead.telefon;
        }
        if (lead.telefonart2 == 'G') {
            lead.telefong = lead.telefon;
        }
        if (lead.telefonart2 == 'P') {
            lead.telefonp = lead.telefon;
        }
    }
    if (lead.telefon3) {
        if (lead.telefonart3 == 'M') {
            lead.telefonm = lead.telefon;
        }
        if (lead.telefonart3 == 'G') {
            lead.telefong = lead.telefon;
        }
        if (lead.telefonart3 == 'P') {
            lead.telefonp = lead.telefon;
        }
    }
}

export const load: PageServerLoad = async ({ params, parent }) => {

    const guid = params.guid;
    const prnt = await parent();
    // Lead reservieren
    let lead = await reserveALead(guid, prnt.user.id);
    // die Daten zurückgeben -> $page.data
    let leadLog = await getLeadLog(lead.id);
    console.log(leadLog)
    setTelefon(lead)
    return { lead: lead, leadlog: leadLog };
}