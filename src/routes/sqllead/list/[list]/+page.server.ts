import { fetchSQL } from "$lib/sqlFetch";
import type { PageServerData } from "../../$types";



const setStatuzs = async () => {
const     sqlString = 'EXEC usp_setLeadRecallStatus'
const data = await fetchSQL(sqlString)
}
export const load: PageServerData = async ({ params, parent }) => {


    const prnt = await parent()
    let userid = prnt.user.id;

    console.log(params)
    const count = 200;
    let type = 0;
    switch (params.list) {
        case 'open':
            type = 1;
            break;
        case 'waiting':
            await setStatuzs()
            type = 2;
            break;
        case 'history':
            type = 7;
            break;
        case 'noservice':
            type = -1;
            break;
        case 'lead':
            type = 9;
            break;

    }
    /*
--     type : 
--            0 = alle
--            1 = offen
--            2 = wartende
--            7 = History
--            8 = zugeteilt
--            9 = Lead
--           -1 = kein Service
    */
    let sqlString = 'select * from fcn_recallLead(' + type + ', ' + userid + ', ' + count + ')';
    //    console.log(sqlString)
    const data = await fetchSQL(sqlString)
    //    console.log(data)
    return { records: data.recordset };
};