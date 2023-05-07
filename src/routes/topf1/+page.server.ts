//import { fetchSQL } from "$lib/sqlFetch";
import type { PageServerLoad } from "./$types";
import { fetchSQL_CW } from '$lib/fetch';


export const load: PageServerLoad = async () => {
    console.log('------------------> load topf1')
    let sqlString = "select * from sk_leadRawList where stamp > getdate()-1 ORDER BY ID DESC";
    console.log(sqlString)
    const data = await fetchSQL_CW(sqlString)
    data.map(d => {
        d.kf = JSON.parse(d.kundenfilter)
        if (d.kf) {
            d.reason = ''
            if (d.kf.fa) {
                d.firma = true;
            }
            if (d.kf.p1) {
                d.gemail = true;
                d.reason += d.kf.p1
            }
            if (d.kf.result) {
                if (d.kf.result.kv) {
                    d.konfliktKV = true;
                    d.reason += 'Kunde:' + d.nachname + '\n' + d.email + '\n'
                        + 'Verkäufer:' + d.user_nachname + '\n' + d.user_email + '\n'
                }
                if (d.kf.result.kg) {
                    d.konfliktKG = true;
                    d.reason += 'Kunde:' + d.email + '\n'
                        + 'Garage:' + d.garage_email + '\n'
                }
            }
        }
    })
//    console.log(data[0])
    return { records: data };


};