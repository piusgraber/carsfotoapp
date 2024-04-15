import { fetchSQL_Array } from "$lib/fetch";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const user = cookies.get('authRoot')
    const sql = `select * from rapport where person='${user}'`
    console.log(sql)
    let sres = await fetchSQL_Array(sql)
    console.log(sres)
    sres.sort((a, b) => {
        return new Date(b.datum) - new Date(a.datum)
    })
    console.log(sres)
    return { res: sres }
};

