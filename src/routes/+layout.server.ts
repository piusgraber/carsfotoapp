import { urlBase } from "$lib/fetch";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import storeData from "./+layout.svelte";

export const load: LayoutServerLoad = async ({ url, cookies }) => {
    console.log('------------------> layoutLoad root')
    let user = null
    if (cookies.get('authRoot')) {
        // cookie gesetzt -> User eingeloggt
        const token = cookies.get('authRoot');
//        const url = urlBase + `cwuser?name=${cookies.get('authRoot')}`;
        const url = urlBase + `cwuser?name=${cookies.get('authRoot')}`;
        console.log(url)
        try {
            const res = await fetch(url);
            const userData = await res.json();
            if (userData.length) {
                user = userData[0];
                console.log(user)
                const settings = JSON.parse(user.cwsettings);
                console.log(settings)
                const sprachen = settings.sprachen;
                //            console.log(sprachen)
                user = {
                    login: cookies.get('authRoot'),
                    name: user.vorname + ' ' +user.nachname , id: user.id, cwTelefon: settings.telefon, initialen: 'pg', sprachen: sprachen
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
    } else {
        return {user: {}}
/*
        if (!user) {
            const pth = url.pathname;
            if (!pth.startsWith('/logon')) {
                throw redirect(302, '/logon');
            }
        }
*/
    }



}