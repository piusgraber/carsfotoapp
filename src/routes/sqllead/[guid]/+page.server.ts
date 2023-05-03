import { fetchSQL_DB } from "$lib/sqlFetch";
import type { PageServerData } from "../../$types";

export const load: PageServerData = async ({params}) => {



    let sqlString = 'SELECT TOP 1 *, dbo.fcn_LeadFirmaOrt(id) garage FROM lead';
    sqlString += ' where guid=\'' + params.guid + '\'';

    const data = await fetchSQL_DB(sqlString)    
    console.log(data)
    return  { records: data.recordset} ;
};