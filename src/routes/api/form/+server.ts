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
    const data : FormData = await event.request.formData();
    console.log(data)
    console.log(data.get('email'))
    return new Response(JSON.stringify({ success: true }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}