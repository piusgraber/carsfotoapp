//export const urlBase = 'https://infos.ottoscars.ch/pneu16/'
export const urlBase = `http://127.0.0.1:8888/`

// einen einzelnen Lead holen für Bearbeitung

export const fetchFz = async id => {
    const url = urlBase + `ngFotoAppData.json?id=${id}`
    console.log(url)
    const resp = await fetch(url);
//    console.log(resp)
    const lead = await resp.json();
    console.log(lead)

    return lead;
}

