import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ( {parent} ) => {
    const {user} = await parent()
    console.log(user)
    if(user && user.id) {
        throw redirect(307, '/');
    }
};