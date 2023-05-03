import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { invalidateAll } from "$app/navigation";

export const POST: RequestHandler = async ({ request , cookies}) => {
    const data = await request.json();
    console.log('data received: ', data)
    if (!data.username) {
        throw error(400, 'no user')
    }
    if (!data.username) {
        throw error(400, 'no password')
    }
    cookies.set('authRoot', data.username, {
     path: '/'
    });
    cookies.set('auth', data.username);
//    invalidateAll();
    return json({ name: data.username });
}