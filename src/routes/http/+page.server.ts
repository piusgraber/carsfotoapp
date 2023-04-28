import { urlBase } from "$lib/fetch";

export const load = async () => {
    //    const data = await fetch('https://google.com')    
    const datar = await fetch(urlBase + 'versicherungenevn')
    const data = await (datar.json())
    console.log(data)
    return { records: data };
};