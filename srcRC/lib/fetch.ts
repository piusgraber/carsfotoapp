type FetchALead = (guid: string) => Promise<{}>;
type FetchLeadsByRecallStatus = (type: number) => Promise<[]>;

export const fetchALead: FetchALead = async guid => {
    const url = "https://api.car-ware.ch/recallLead?gid=" + guid + ""
    console.log(url);
	const resp = await fetch(url);
    let leads = await resp.json();
    let lead = leads.length ? leads[0] : {}
//    console.log(lead);
    return lead;
}


export const fetchLeadsByRecallStatus: FetchLeadsByRecallStatus = async type => {
    const url = 'https://api.car-ware.ch/recallLeads?type=' + type
    console.log(url);
    const resp = await fetch(url);
    let listeL = await resp.json();
    let liste: [] = listeL;
//    console.log(liste);
    return liste;
};


