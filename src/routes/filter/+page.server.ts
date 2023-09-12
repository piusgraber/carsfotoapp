import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const resp = await fetch('http://localhost:3344/domainFilter')
    const domains = (await resp.json()).domains;
    return {domains}
};