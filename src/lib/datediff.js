export const calcDiff = (t1, t2) => {
    let tb = new Date(t1)
    let te = new Date(t2)
    const sdt = tb.toISOString()
    const edt = te.toISOString()
    const sd = sdt.substring(0, 10);
    const ed = edt.substring(0, 10);
    let sdd = new Date(sd)
    let edd = new Date(ed)
    let cd = sdd.toISOString().substring(0, 10);
    let cdm = sdd.toISOString();
    let arr = []
    let rec = { wd: sdd.getDay(), d: cd, b: sdt }
//    console.log('1. ', sdt)
//    console.log(sdd, cdm)
    while (sdd.getTime() <= edd.getTime()) {
        sdd.setDate(sdd.getDate() + 1);
        let cd = sdd.toISOString().substring(0, 10);
        let cdm = new Date(cd).toISOString()
//        console.log('n. ', cdm)
//        console.log(sdd, edd)
        if (sdd.getTime() > edd.getTime()) {
//            console.log(cdm, edt)
//            console.log('x. ', edt)
            rec.e = edt
        } else {
//            console.log(cdm, edt)
            rec.e = cdm
        }
        arr.push(rec);
        rec = { wd: sdd.getDay(), d: cd, b: cdm }
//        console.log(cd)
    }

//    console.log(sd, ed)
    let td = (te.getTime() - tb.getTime())
    const th = Math.floor(td / 1000 / 60 / 60)
    let tm = '0' + Math.round((td / 1000 / 60 / 60 - th) * 60)
    if (tm.length == 3) {
        tm = tm.substring(1)
    }

//    console.log('===================')
//    console.log(arr)
//    console.log('===================')

    let delaym = 0


    arr.forEach(r => {
        const bhour = parseInt(r.b.substring(11, 13));
        const ehour = parseInt(r.e.substring(11, 13));
        const bminute = parseInt(r.b.substring(14, 16));
        const eminute = parseInt(r.e.substring(14, 16));
        let dbreak = true;
        switch (r.wd) {
            case 0, 6:
                r.t = 0
                dbreak = false
                break;
            case 5:
                // Freitag
//                console.log(r.b, r.b.substring(11, 13), parseInt(r.b.substring(11, 13)))
                if (bhour < 8) {
                    r.b = r.d + 'T08:00:00.000Z'
                }
                if (bhour >= 13) {
                    dbreak = false
                }
                if (bhour >= 17) {
                    r.b = r.d + 'T17:00:00.000Z'
                }
                if (bhour == 12 && bminute > 0 || bhour == 13 && bminute < 30) {
                    // Beginn über Mittag
                    r.b = r.d + 'T13:30:00.000Z'
                    dbreak = false
                }
                if (ehour == 12 || ehour == 13 && eminute < 30) {
                    r.e = r.d + 'T12:00:00.000Z'
                    dbreak = false
                }
                if (ehour < 8 && ehour != 0) {
                    r.e = r.d + 'T08:00:00.000Z'
                    dbreak = false
                }
                if (ehour <= 12 && ehour != 0) {
                    dbreak = false
                }
                if (ehour >= 17 || ehour == 0) {
                    r.e = r.d + 'T17:00:00.000Z'
                    dbreak = false
                }
                r.t = (new Date(r.e).getTime() - new Date(r.b).getTime()) / 1000 / 60
                break;
            default:
//                console.log(r.b, r.b.substring(11, 13), parseInt(r.b.substring(11, 13)))
                if (bhour < 8) {
                    r.b = r.d + 'T08:00:00.000Z'
                }
                if (bhour >= 13) {
                    console.log('1')
                    dbreak = false
                }
                if (bhour >= 17) {
                    r.b = r.d + 'T17:00:00.000Z'
                    console.log('2')
                    dbreak = false
                }
                if (bhour == 12 && bminute > 0 || bhour == 13 && bminute < 30) {
                    // Beginn über Mittag
                    r.b = r.d + 'T13:30:00.000Z'
                    console.log('3')
                    dbreak = false
                }
                if (ehour == 12 || ehour == 13 && eminute < 30) {
                    // Ende übver Mittag
                    r.e = r.d + 'T12:00:00.000Z'
                    console.log('4')
                    dbreak = false
                }
                if (ehour < 8 && ehour != 0) {
                    r.e = r.d + 'T08:00:00.000Z'
                    console.log('5')
                    dbreak = false
                }

                if (ehour <= 12 && ehour != 0) {
                    console.log('6')
                    dbreak = false
                }
                if (ehour >= 17 && eminute > 30 || ehour == 0) {
                    r.e = r.d + 'T17:30:00.000Z'
                }
                r.t = (new Date(r.e).getTime() - new Date(r.b).getTime()) / 1000 / 60
        }
        r.break = dbreak ? -60 : 0
        r.time = r.t + r.break
        delaym += r.time
        
    })
    let delayh = Math.floor(delaym / 60)
    let delaymin = '0' + (delaym - delayh * 60) 
    if (delaymin.length==3) {
        delaymin = delaymin.substring(1)
    }
    let delayS = delayh + 'h' + delaymin
    return { arr, delaym, delayS }
}

