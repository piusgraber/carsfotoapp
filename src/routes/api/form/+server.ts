import type { RequestHandler } from './$types'

import { storeData } from '$lib/mystore';

export const GET: RequestHandler = async (event) => {
    console.log(event);
    const options: ResponseInit = {
        status: 418,
        headers: {
            banana: 'youre'
        }
    }
    return new Response('hello', options)
}

export const POST: RequestHandler = async (event) => {

    console.log('POST Login')
    const data: FormData = await event.request.formData();
    console.log(data)
    let userName = 'oooo';
/*
    if (data.get('initialen') !== undefined) {
        userName = data.get("initialen")?.toString();
    }
    if (userName === undefined) {
    }
*/
    const user = { initialen: userName }
    console.log(user)
    storeData.set({ user: { initialen: userName } })
    console.log({ user: { initialen: userName } })
    return new Response(JSON.stringify({ success: true }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })

}