import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { urlBase } from "$lib/fetch";

export const POST: RequestHandler = async ({ request, cookies }) => {
    const data = await request.json();
    console.log('data received: ', data)
    if (!data.username) {
        throw error(400, 'no user')
    }
    if (!data.username) {
        throw error(400, 'no password')
    }
    //    const loginResp = await ('https://api.car-ware.ch/')
    const loginResp = await (fetch(urlBase + 'loginuser', {
        method: 'post',
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }))
    const userdata = await loginResp.json()
    // {id: 99, username: 'xxx' }
    console.log('userdata', userdata)
    if (userdata.error) {
        throw error(400, userdata.error)
    }
    if (userdata.username) {
        cookies.set('authRoot', userdata.username, {
            path: '/'
        });
    } else {
        throw error(400, userdata.error)
    }
const user = { id: userdata.id, name: userdata.username }
console.log('user', user)
    return json(user);
}