import { fetchLeadsByRecallStatus } from '$lib/fetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {


    const locale = 'de-CH';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat(locale, options);


    const listName = params.list;
    let status: number;
    console.log(listName)
    switch (listName) {
        case 'Leads':
            status = 9;
            break;
        case 'offene':
            status = 1;
            break;
        case 'kein Service':
            status = -1;
            break;
        case 'History':
            status = 7;
            break;
        case 'reserviert':
            status = 8;
            break;
        default:
            status = 0;
    }
    /*
        type Lead = {
            id: string;
            guid: string;
            state?: number;
            status?: string;
            abgabe?: Date;
            abgabeDatum?: string;
        }
        let lead: Lead[] = await fetchLeadsByRecallStatus(status);
        lead.map(l => {
            console.log(l.abgabe)
            l.abgabeDatum = l.abgabe ? formatter.format(new Date(l.abgabe)) : '';
        })
    */
    let lead: [] = await fetchLeadsByRecallStatus(status);
    //    console.log(lead)
    return { leads: lead };
}