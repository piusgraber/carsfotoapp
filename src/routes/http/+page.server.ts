export const load = async () => {
//    const data = await fetch('https://google.com')    
    const datar = await fetch('https://api.car-ware.ch/versicherungenevn')   
    const data = await(datar.json())
    console.log(data)
    return  { records: data} ;
};