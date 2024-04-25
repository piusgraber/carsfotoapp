export const urlBase = 'https://infos.ottoscars.ch/pneu16/'

// einen einzelnen Lead holen für Bearbeitung

export const fetchFz = async id => {
    let url = urlBase + `ngFahrzeug.json?id=${id}`
    console.log(url)
    let resp = await fetch(url);
//    console.log(resp)
    let lead = await resp.json();
    console.log(lead)
    url = urlBase + `ngFahrzeugperson.json?fahrzeug_id=${id}`
    console.log(url)
    resp = await fetch(url);
//    console.log(resp)
    lead.fps = await resp.json();
    console.log(lead.fps)

    return lead;
}

