import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  return {
    // `$page.data` slurps it up 😋
//    session: await event.locals.getSession()
  }
}