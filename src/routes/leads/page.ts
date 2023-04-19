export const load = async () => {
    // runs in server and browser 
    console.log("Load");
    const winesResp = await fetch('https://api.car-ware.ch/versicherungenevn');
    console.log(winesResp)
    const wines = await winesResp.json();
    console.log(wines)
    return wines
}