import { fetchALead, reserveALead } from '$lib/fetch';
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
    let lead = await fetchALead(guid);
    const url = "http://localhost:3344/reserveLead?guid='" + lead.guid + "'"

    if (lead.recallmaid == prnt.user.id || !lead.recallmaid) {
        // Lead reservieren
        let rLead = await reserveALead(guid, prnt.user.id);
        lead.recallmaid = prnt.user.id;
        let leadRes = {}
        //    leadRes.guid = lead.guid;
        // die Daten zurückgeben -> $page.data
        setTelefon(lead)
    } else {
        lead = {}
    }
    return { lead: lead };
}