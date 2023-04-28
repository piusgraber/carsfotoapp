import { fetchSQL } from "$lib/sqlFetch";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {

    let sqlString = "select TOP 10 * from leadRaw WHERE garage_firma like '%konst%' ORDER BY ID DESC";
    //    console.log(sqlString)
    const data = await fetchSQL(sqlString)
    //    console.log(data)
    return { records: data.recordset };

    
};