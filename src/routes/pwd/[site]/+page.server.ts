import { urlBase } from "$lib/fetch";

export const load = async () => {
    // runs in server and browser 
    console.log('Load +page.ts')
    const wines = await (await import ("$lib/password.json")).default;
    const versicherungen = {"wines": null};
    versicherungen.wines = await(await fetch(urlBase + 'versicherungenevn')).json();
    console.log(versicherungen)
    console.log(wines)
    return wines
}   