import { fetchSQL_CW } from "./fetch"

export const addLogEntry2 :any = async (leadid: number, user: number, text: string, reminder: Date) => {
   
    console.log('addLogEntry2')
   let reminderXML = 'null';
//    console.log('entry', user, text, reminder)
const sql = "insert into leadlog(leadid, userid, bemerkung, datumnext ) VALUES (0, " + user + ", '" + text + "', " + reminderXML + ")";
//console.log(sql)
   const sres = await fetchSQL_CW( sql)
//   console.log('sres ', sres)
   return { }
}

