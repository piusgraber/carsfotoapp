import type { PageServerLoad } from "./$types";
import { urlBase } from "$lib/fetch";
import { fetchSQL_Array } from "$lib/fetch"


export const load: PageServerLoad = async ({ cookies }) => {

    const sql = "select * from fcn_sk_recallEvn(1, 1, 200)";
    console.log(sql)
    let sres = await fetchSQL_Array(sql)
    if (cookies.get('authRoot') == 'lo') {
        sres = sres.filter(r => {
            if (r.evnok && r.evnok_code != 2) return false
            return true
        })
    }
    return { res: sres }
};