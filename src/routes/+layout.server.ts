import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => {
    const user = {
        name: 'Pius', id: 20, cwTelefon: '078 708 0809', initialen: 'pg', sprachen: {
            de: 1,
            fr: 1,
            it: 1
        }
    }

    return { user }
}