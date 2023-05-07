type FetchALead = (guid: string) => Promise<{}>;
type FetchSQL = (sql: string) => Promise<{}>;
type ReserveALead = (guid: string, userid: number) => Promise<{}>;
type getLeadLog = (id: number) => Promise<{}>;
type FetchLeadsByRecallStatus = (type: number, userid: number) => Promise<[]>;


const prod = true;

export const urlBase = prod? 'https://api.car-ware.ch/' : 'http://localhost:3344/';

export const fetchSQL_CW: FetchSQL = async sql => {

    console.log('fetchSQL_CW');
    const respss = await fetch(urlBase + "set-session");
//    console.log(respss);
    const respgs = await fetch(urlBase + "get-session");
//    console.log(respgs);
    sql = encodeURIComponent(sql);
    const url = urlBase + "sql?sql=" + sql + ""
//    console.log(url);
	const resp = await fetch(url);
//    console.log('rsr', resp);
    let recs = await resp.json();
//    console.log(recs);
    return recs;
}


export const fetchALead: FetchALead = async guid => {
    console.log('fetchALead');
    const url = urlBase + "recallLead?gid=" + guid + ""
//    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
//    console.log(lead);
    return lead;
}


export const reserveALead: ReserveALead = async (guid, userid) => {
    console.log('reserveALead');
    let url = urlBase + "reserveLead?gid=" + guid + "&userid=" + userid
    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
//    console.log(lead);
    return lead;
}


export const getLeadLog: ReserveALead = async (id) => {
    console.log('getLeadLog');
    let url = urlBase + "recallLeadHistory?id=" + id
//    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
//    console.log(lead);
    return leads;
}




export const verifyEmail :any = async (leadid: number) => {
    let url = urlBase + `sql?sql=update lead set emailverified=1 where id=${leadid}`
    console.log(url)
    const resp = await fetch(url);
    let lead = await resp.json();
    return lead;

}




export const addLogEntry :any = async (leadid: number, user: number, text: string, reminder: Date) => {
    console.log('addLogEntry');
/*   
    let reminderXML = 'null';
//     console.log('entry', user, text, reminder)
 const sql = "insert into leadlog(leadid, userid, bemerkung, datumnext ) VALUES (0, " + user + ", '" + text + "', " + reminderXML + ")";
 //console.log(sql)
    const sres = await fetchSQL_CW( sql)
    //console.log('sres ', sres)
    return { }
*/
let url = urlBase + "addLeadHistoryRec"
//console.log(url);
reminder = reminder ? reminder: null
const data = {leadid: leadid, userid: user, bemerkung: text, reminder: reminder}
//url = '/api/form'
const response = await fetch(url, {
    method: 'POST',
    headers: {
    'content-type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
});

const resp = await fetch(url);
let leads = await resp.json();
//    console.log(lead);
return leads;

}
 
 
 export const getLogEntry :any = async (id: number) => {
   
 const sql = "select * from leadlog where id=" + id + "";
 console.log('getLogEntry')
    const sres = await fetchSQL_CW( sql)
//    console.log('sres ', sres)
    return { }
 }
 
 





export const fetchLeadsByRecallStatus: FetchLeadsByRecallStatus = async (type, userid) => {
    console.log('fetchLeadsByRecallStatus')
    let url = urlBase + 'recallLeads?type=' + type
    if (type==0) {
        url += '&all=1'
    }
    url += '&userid=' + userid
    console.log(url);
    const resp = await fetch(url);
    let listeL = await resp.json();
    let liste: [] = listeL;
//    console.log(liste.length);
    return liste;
};


