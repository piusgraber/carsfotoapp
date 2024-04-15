type FetchALead = (guid: string) => Promise<{}>;
type FetchSQL = (sql: string) => Promise<{}>;
type FetchSQLArray = (sql: string) => Promise<[]>;
type ReserveALead = (guid: string, userid: number) => Promise<{}>;
type getLeadLog = (id: number) => Promise<{}>;
export type FetchLeadsByRecallStatus = (type: number, userid: number) => Promise<[]>;
type FetchLeadsHistory = (srch: string) => Promise<[]>;
import { dateTimeFormatterMEZ, dateTimeFormatterMEZT, formatDate } from '$lib/myfuncs';

const prod = true;

export const urlBase = prod ? 'https://api.car-ware.ch/' : 'http://localhost:3344/';

export const fetchSQL_CW: FetchSQL = async sql => {

    //    // console.log('fetchSQL_CW');
    const respss = await fetch(urlBase + "set-session");
    //    // console.log(respss);
    const respgs = await fetch(urlBase + "get-session");
    //    // console.log(respgs);
    sql = encodeURIComponent(sql);
    const url = urlBase + "sql?sql=" + sql + ""
    //    // console.log(url);
    const resp = await fetch(url);
    //    // console.log('rsr', resp);
    let recs : [] = await resp.json();
    //    // console.log(recs);
    return recs;
}


export const fetchSQL_Array: FetchSQLArray = async sql => {

    //    // console.log('fetchSQL_CW');
    const respss = await fetch(urlBase + "set-session");
    //    // console.log(respss);
    const respgs = await fetch(urlBase + "get-session");
    //    // console.log(respgs);
    sql = encodeURIComponent(sql);
    const url = urlBase + "sql?sql=" + sql + ""
    //    // console.log(url);
    const resp = await fetch(url);
    //    // console.log('rsr', resp);
    let recs = await resp.json();
    //    // console.log(recs);
    return recs;
}


// einen einzelnen Lead holen für Bearbeitung

export const fetchALead: FetchALead = async guid => {
    // console.log('fetchALead');
    const url = urlBase + "recallLead?gid=" + guid + ""
    //    // console.log(url);
    const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
    //    // console.log(lead);
    return lead;
}


export const reserveALead: ReserveALead = async (guid, userid) => {
    // console.log('reserveALead');
    let url = urlBase + "reserveLead?gid=" + guid + "&userid=" + userid
    // console.log(url);
    const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
    //    // console.log(lead);
    return lead;
}


export const getLeadLog: ReserveALead = async (id) => {
    // console.log('getLeadLog');
    let url = urlBase + "recallLeadHistory?id=" + id
    //    // console.log(url);
    const resp = await fetch(url);
    let leads = await resp.json();
    //    // console.log(lead);
    return leads;
}




export const verifyEmail: any = async (leadid: number, userid: number, email: string) => {
    // console.log('verify')
    let url = urlBase + `sql?sql=update lead set emailverified=1, email='${email}', recallmaid=${userid} where id=${leadid}`
    // console.log(url)
    const resp = await fetch(url);
    let lead = await resp.json();
    return lead;

}




export const markAsXxxxxx: any = async (guid: string) => {
    const sql = `update lead 
                set nachname=SUBSTRING(nachname, 1, 1) + 'xxxxx'
                , vorname=SUBSTRING(vorname, 1, 1) + 'xxxxx'
                , strasse='Xxxxxx'
                , hausnummer='0'
                , email = 'x@x.xx'
                , telefon = null
                , telefonart = null
                , telefon2 = null
                , telefonart2 = null
                , telefon3 = null
                , telefonart3 = null
                , srchString=''
                  , geburtstag=null 
                where guid = '${guid}'`
    console.log(sql)                
    const sres = await fetchSQL_CW(sql)
    return {}
}




export const addLogEntry: any = async (leadid: number, user: number, text: string, reminder: Date) => {
    // console.log('addLogEntry');
    /*   
        let reminderXML = 'null';
    //     // console.log('entry', user, text, reminder)
     const sql = "insert into leadlog(leadid, userid, bemerkung, datumnext ) VALUES (0, " + user + ", '" + text + "', " + reminderXML + ")";
     //// console.log(sql)
        const sres = await fetchSQL_CW( sql)
        //// console.log('sres ', sres)
        return { }
    */
    let url = urlBase + "addLeadHistoryRec"
    //// console.log(url);
    reminder = reminder ? reminder : null
    const data = { leadid: leadid, userid: user, bemerkung: text, reminder: reminder }
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
    //    // console.log(lead);
    return leads;

}


export const setEvnCode: any = async (guid: string, code: number) => {
    const sql = `update leadRaw set evnok = getdate(), evnok_code = ${code} where guid = '${guid}'`
    const sres = await fetchSQL_CW(sql)
    console.log(sres)
    return {}
}


export const getLogEntry: any = async (id: number) => {

    const sql = "select * from leadlog where id=" + id + "";
    // console.log('getLogEntry')
    const sres = await fetchSQL_CW(sql)
    //    // console.log('sres ', sres)
    return {}
}





// Leads für Liste holen

export const fetchLeadsByRecallStatus: FetchLeadsByRecallStatus = async (type, userid) => {
    let url = urlBase + 'recallLeads?type=' + type
    if (type == 0) {
        url += '&all=1'
    }
    console.log(url);
    let resp = await fetch(url);
    let listeL = await resp.json();
    listeL.sort((a, b) => {
        const atime = new Date(a.histdatum);
        const btime = new Date(b.histdatum);
        return btime - atime;
    })

    if (type == 0) {
        let url = urlBase + 'recallLeads?type=' + 9
        console.log(url);
        let resp = await fetch(url);
        let liste2 = await resp.json();
        liste2.map(z => {
            z.histdatum = z.datumlead
            z.histtext = 'Lead' + (z.adminLead ? (': ' + z.recallma) : '')
            //            z.histdatum = z.datumlead
        })
        listeL = listeL.concat(liste2)
    }
    //    url += '&userid=' + userid


    if (type == 0) {
        listeL.sort((a, b) => {
            const atime = new Date(a.histdatum);
            const btime = new Date(b.histdatum);
            return btime - atime;
        })
    }
    if (type == -2) {
        listeL.sort((a, b) => {
            const atime = new Date(a.histdatum);
            const btime = new Date(b.histdatum);
            return atime - btime;
        })
    }

    if (type == 9) {
        // Leads
        listeL.sort((a, b) => {
            const atime = new Date(a.datumlead);
            const btime = new Date(b.datumlead);
            return btime - atime;
        })
    }

    let liste: [] = listeL;
    return liste;
};

export const fetchLeadsByRecallStatusJunk: FetchLeadsByRecallStatus = async (type, junk) => {
    // console.log('fetchLeadsByRecallStatus')
    let url = urlBase + 'recallLeadsJunk?type=' + type + '&junk=' + junk + ''
    if (type == 0) {
        url += '&all=1'
    }
    //    url += '&userid=' + userid
    console.log(url);
    const resp = await fetch(url);
    let listeL = await resp.json();
    //    // console.log(listeL[0])
    let liste: [] = listeL;
    //    // console.log(liste.length);
    return liste;
};

export const fetchLeadsHistory: FetchLeadsHistory = async (srch) => {
    // console.log('fetchLeadsHistory')
    let url = urlBase + 'recallLeads?srch=' + srch
    // console.log(url);
    const resp = await fetch(url);
    let listeL = await resp.json();
    //    // console.log(listeL[0])
    let liste: [] = listeL;
    //    // console.log(liste.length);
    return liste;
};


