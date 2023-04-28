type FetchALead = (guid: string) => Promise<{}>;
type ReserveALead = (guid: string, userid: number) => Promise<{}>;
type getLeadLog = (id: number) => Promise<{}>;
type FetchLeadsByRecallStatus = (type: number, userid: number) => Promise<[]>;


const prod = true;

export const urlBase = prod? 'https://api.car-ware.ch/' : 'http://localhost:3344/';

export const fetchALead: FetchALead = async guid => {
    const url = urlBase + "recallLead?gid=" + guid + ""
    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
//    console.log(lead);
    return lead;
}


export const reserveALead: ReserveALead = async (guid, userid) => {
    let url = urlBase + "reserveLead?gid=" + guid + "&userid=" + userid
    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
//    console.log(lead);
    return lead;
}


export const getLeadLog: ReserveALead = async (id) => {
    let url = urlBase + "recallLeadHistory?id=" + id
    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
//    console.log(lead);
    return leads;
}


export const fetchLeadsByRecallStatus: FetchLeadsByRecallStatus = async (type, userid) => {
    let url = urlBase + 'recallLeads?type=' + type
    if (type==0) {
        url += '&all=1'
    }
    url += '&userid=' + userid
    console.log(url);
    const resp = await fetch(url);
    let listeL = await resp.json();
    let liste: [] = listeL;
    console.log(liste.length);
    return liste;
};


