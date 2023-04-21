import type { PageData, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {lead: {}}
};