import { goto } from '$app/navigation';
import { fetchLeadsByRecallStatus } from '$lib/fetch';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Zeile } from '$lib/myTypes';

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
        case 'leads':
            status = 9;
            break;
        case 'open':
            status = 1;
            break;
        case 'noservice':
            status = -1;
            break;
        case 'history':
            status = 7;
            break;
        case 'res':
            status = 8;
            break;
        case 'all':
            status = 0;
            break;
        default:
            status=0;
            throw redirect(302, '/liste/open');

    }

    let lead: Zeile[] = await fetchLeadsByRecallStatus(status);
    return { liste: listName,  leads: lead };
}