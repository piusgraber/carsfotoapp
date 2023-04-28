import { fetchSQL } from "$lib/sqlFetch";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {

    let sqlString = 'select TOP 800 * from leadRaw WHERE evnsent is not null ORDER BY ID DESC';
    //    console.log(sqlString)
    const data = await fetchSQL(sqlString)
    //    console.log(data)
    return { records: data.recordset };

    
};