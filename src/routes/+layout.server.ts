import { urlBase } from "$lib/fetch";
import type { LayoutServerLoad } from "./$types";
import storeData from "./+layout.svelte";

export const load: LayoutServerLoad = async () => {



    const url = urlBase + 'cwuser?name=pg&pwd=adam';
    console.log(url)
    let user = {}
    try {
        const res = await fetch(url);
        const userData = await res.json();
        if (userData.length) {
            user = userData[0];
//            console.log(user)
            const settings = JSON.parse(user.cwsettings);
//            console.log(settings)
            const sprachen = settings.sprachen;
//            console.log(sprachen)
            user = {
                name: user.vorname + ' ' + user.nachname, id: user.id, cwTelefon: settings.telefon, initialen: 'pg', sprachen: sprachen
            }
            //        storeData.set({ user: user })
            //        console.log('xxxxxxxxxxxxxxx', user)
        } else {

        }
        return { user }

    } catch (err) {
        console.log('-----------------------------', err)
        user = {
            name: 'noone',
            sprachen: []
        }
        return { user }
throw (err)
    }


}