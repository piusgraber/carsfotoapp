import type { RequestHandler } from './$types'

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
    console.log('POST')
    const data = await event.request.json();
    console.log(data)
    return new Response(JSON.stringify({ success: data.user }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}