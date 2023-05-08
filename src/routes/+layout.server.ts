import { urlBase } from "$lib/fetch";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import storeData from "./+layout.svelte";

/*
*   Root Layout Daten laden
*/
export const load: LayoutServerLoad = async ({ url, cookies }) => {
//    console.log('------------------> layoutLoad root')
    let user = null
    // authRoot - cookie abfragen
    if (cookies.get('authRoot')) {
        // cookie gesetzt -> User eingeloggt
        const token = cookies.get('authRoot');
        const url = urlBase + `cwuser?name=${token}`;
        console.log(url)
        try {
            console.log('fetch')
            const res = await fetch(url);
            // User aus DB holen
            const userData = await res.json();
            console.log(userData)
            if (userData.length) {
                user = userData[0];
                // Settings aus DB-Feld cwsetings
                const settings = JSON.parse(user.cwsettings);
                const sprachen = settings.sprachen;
                user = {
                    login: cookies.get('authRoot'),
                    name: user.vorname + ' ' + user.nachname, id: user.id, cwTelefon: settings.telefon, initialen: 'pg', sprachen: sprachen
                }
                console.log(user)
                return { user }
            } else {
                console.log('not foiûnd')
                return { }
            }
        } catch (err) {
            console.log('-----------------------------', err)
            user = {
                name: 'noone',
                sprachen: []
            }
            return { user }
            throw (err)
        }
    } else {
        // kein User eingeloggt
        return { user: {} }
    }



}