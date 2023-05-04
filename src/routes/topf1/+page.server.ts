//import { fetchSQL } from "$lib/sqlFetch";
import type { PageServerLoad } from "./$types";
import { fetchSQL_CW } from '$lib/fetch';


export const load: PageServerLoad = async () => {

    let sqlString = "select * from sk_leadRawList where stamp > getdate()-1 ORDER BY ID DESC";
    console.log(sqlString)
    const data = await fetchSQL_CW(sqlString)
    data.map(d => {
        d.kf = JSON.parse(d.kundenfilter)
        if (d.kf) {
            if (d.kf.fa) {
                d.firma = true;
            }
            if (d.kf.p1) {
                d.gemail = true;
            }
            if (d.kf.result) {
                if (d.kf.result.kv) {
                    d.konfliktK = true;
                }
                if (d.kf.result.kg) {
                    d.konfliktG = true;
                }
            }
        }
    })
    console.log(data[0])
    return { records: data };


};