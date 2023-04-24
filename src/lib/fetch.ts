type FetchALead = (guid: string) => Promise<{}>;
type ReserveALead = (guid: string, userid: number) => Promise<{}>;
type FetchLeadsByRecallStatus = (type: number) => Promise<[]>;

export const fetchALead: FetchALead = async guid => {
    const url = "https://api.car-ware.ch/recallLead?gid=" + guid + ""
//    const url = "http://localhost:3344/recallLead?gid=" + guid + ""
    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
//    console.log(lead);
    return lead;
}


export const reserveALead: ReserveALead = async (guid, userid) => {
//    const url = "https://api.car-ware.ch/recallLead?gid=" + guid + ""
    const url = "http://localhost:3344/reserveLead?gid=" + guid + "&userid=" + userid
    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
//    console.log(lead);
    return lead;
}


export const fetchLeadsByRecallStatus: FetchLeadsByRecallStatus = async type => {
    let url = 'https://api.car-ware.ch/recallLeads?type=' + type
    if (type==0) {
        url += '&all=1'
    }
    //const url = 'http://localhost:3344/recallLeads?type=' + type
    console.log(url);
    const resp = await fetch(url);
    let listeL = await resp.json();
    let liste: [] = listeL;
    console.log(liste.length);
    return liste;
};


