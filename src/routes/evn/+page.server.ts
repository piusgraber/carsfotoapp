import type { PageServerLoad } from "./$types";
import { urlBase } from "$lib/fetch";
import { fetchSQL_CW } from "$lib/fetch"


export const load: PageServerLoad = async () => {

    const sql = "select * from fcn_sk_recallEvn(1, 1, 200)";
    console.log(sql)
    const sres = await fetchSQL_CW(sql)
    console.log(sres[0])
    return {res: sres}
};