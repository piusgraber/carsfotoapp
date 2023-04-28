import { goto } from '$app/navigation';
import { fetchLeadsByRecallStatus } from '$lib/fetch';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Zeile } from '$lib/myTypes';

export const load: PageServerLoad = async ({ params, cookies, parent }) => {


    const locale = 'de-CH';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat(locale, options);
    const sessionid = cookies.get('sessionid')
    //    const session = await event.locals.getSession()
    if (!sessionid) {
        cookies.set('sessionid', 'dddsssssssh')
    }
    console.log('session: ' + sessionid);
    const prnt = await parent()
    let userid = prnt.user.id;

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
        case 'waiting':
            status = 2;
            break;
        case 'noservice':
            status = -1;
            break;
        case 'company':
            status = 8;
            break;
        case 'history':
            status = 6;
            break;
        case 'all':
            status = 99;
            break;
        case 'res':
            status = 4;
            userid = prnt.user.id;
            break;
        case 'resall':
            status = 4;
            userid = 0;
            break;
        case 'all':
            status = 0;
            break;
            break;
        default:
            status = 0;
            throw redirect(302, '/liste/open');

    }

    let lead: Zeile[] = await fetchLeadsByRecallStatus(status, userid);
    console.log('loaded')
    console.log(prnt)
    return { liste: listName, leads: lead };
}