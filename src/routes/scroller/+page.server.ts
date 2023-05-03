//import { fetchSQL } from "$lib/sqlFetch";
import type { PageServerLoad } from "./$types";
import { fetchSQL_CW } from '$lib/fetch';


export const load: PageServerLoad = async () => {

    let sqlString = "select * from leadRaw where stamp > getdate()-1 ORDER BY ID DESC";
        console.log(sqlString)
    const data = await fetchSQL_CW(sqlString)
    return { records: data };

    
};