import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
  return {
    // `$page.data` slurps it up 😋
//    session: await event.locals.getSession()
  }
}