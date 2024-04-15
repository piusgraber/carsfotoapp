import { addRapport } from '$lib/fetch.js'


export async function POST(event) {
    const data = await event.request.formData()
    const datum = data.get('datum')
    const stunden = data.get('stunden')
    const cookies = event.cookies
    const user = cookies.get("authRoot")
    console.log(user)
    // subscribe the user to the newsletter
    console.log(datum, stunden, user)



    addRapport(datum, stunden, user)
    // return success
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // it's common to return JSON, so SvelteKit has a helper
    return json({ success: true })
  }
  