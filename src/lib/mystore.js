import { writable } from "svelte/store";

export const storeData = writable({
    user: {initialen: ''}
});

