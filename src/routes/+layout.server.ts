import type { LayoutServerLoad } from "./$types";
import  storeData  from "./+layout.svelte";

export const load: LayoutServerLoad = async () => {



    const url = 'http://127.0.0.1:3344/cwuser?name=pg&pwd=adam';
    const res = await fetch(url);
    const userData = await res.json();
    let user = {}
    if (userData.length) {
        user = userData[0];
        console.log(user)
        const settings = JSON.parse(user.cwsettings);
        console.log(settings)
        const sprachen = settings.sprachen;
        console.log(sprachen)
        user = {
            name: user.vorname + ' ' + user.nachname, id: user.id, cwTelefon: settings.telefon, initialen: 'pg', sprachen: sprachen
        }
//        storeData.set({ user: user })
//        console.log('xxxxxxxxxxxxxxx', user)
    } else {

    }


    return { user }
}