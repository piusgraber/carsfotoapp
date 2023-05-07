import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params, cookies, parent }) => {
    console.log('------------------> load liste/testapi/[type]')
    const loggedin = false;
    if (loggedin) {
        let type=0;
        let loading =false;
        const fetchLeads = async () => {
           console.log('start') 
           let url = 'https://api.car-ware.ch/recallLeads?type=' + params.type;
           console.log(url)
           const resp = await fetch(url) 
           let data = [];
           data = await resp.json();
           console.log('ok') 
           loading = true;
           return data;
        }
    
        return {
            leads: fetchLeads(),
            liste: 'testAPI',
            loading: loading
        }
    } else {
        return {}
    }
}