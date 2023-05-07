import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({cookies}) => {
    cookies.delete('authRoot', {
        path: '/'
    });
    console.log('COOKIEEEE weg')
    //    $page.user = {}
    return json({result: 'ok'})
}

