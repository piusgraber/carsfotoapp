import type { LayoutServerLoad } from "./$types";

export const load : LayoutServerLoad = () => {
    const user = {name: 'Pius', id:1}

    return  { user }
}