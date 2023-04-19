import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const posts : String[] =  ['me', 'myself']
    return {posts}
};