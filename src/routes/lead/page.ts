import { urlBase } from "$lib/fetch";

export const load = async () => {
    // runs in server and browser 
    console.log("Load");
    const winesResp = await fetch(urlBase + 'versicherungenevn');
    console.log(winesResp)
    const wines = await winesResp.json();
    console.log(wines)
    return wines
}