import { fetchFz } from "$lib/fetch";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async (event) => {
    const guid = event.params.id;

    const id=guid; //event.url.searchParams.get("id")
    console.log(id)

    const fz = await fetchFz(id)    
    console.log(fz)
    return {fz}
};