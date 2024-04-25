import { fetchFz } from "$lib/fetch";

export const load: PageServerLoad = async (event) => {
    const id=event.url.searchParams.get("id")
    console.log(id)

    const fz = await fetchFz(id)    
    console.log(fz)
    return {fz}
};