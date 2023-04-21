import { fetchALead } from "$lib/fetch";
import type { PageServerLoad } from "../$types";


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

export const load: PageServerLoad = async ({params}) => {
    const guid = params.guid;
    let lead = await fetchALead(guid);

    let leadRes = {}
    //    leadRes.guid = lead.guid;
    // die Daten zurückgeben -> $page.data
    setTelefon(lead)
    return { lead: lead };
};