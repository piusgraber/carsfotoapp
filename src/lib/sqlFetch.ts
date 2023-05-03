import * as sql from 'mssql';

// config for your database
const config = {
    user: 'carwareadmin',
    password: '%pavDBaws',
    server: 'carware-db-instance.cmiag32fgcgo.eu-west-1.rds.amazonaws.com',
    port: 1433,
    database: 'carware_lead',
    "options": {
        "encrypt": false,
    },
    requestTimeout: 300000
};


export const fetchSQL_DB = sqlString => {
    console.log("HI")
    console.log(sqlString)
    return new Promise(
        function (resolve, reject) {
//            var sql = require("mssql");
            // connect to your database
            sql.connect(config, function (err) {
                if (err) {
                    console.log('Connect');
                    console.log(err);
                    console.log('----------');
                }
                // create Request object
                var request = new sql.Request();
//                console.log('SQL Befehl');
//                console.log(sqlString);
//                console.log('----------');
                // query to the database and get the records
                console.log(sqlString);
                request.query(sqlString, function (err, recordset) {
                    if (err) {
                        reject(err)
                    } else {
                        // send records as a response
//                        recordset=null;
                        if (recordset) {
                            console.log('====================================')
                            console.log(recordset)
                            resolve(recordset);
                        } else {
                            recordset = {
                                    recordset: [
                                        {
                                            service: false,
                                            vertragnr: '10040501',
                                            garage_firma: 'F.+ M. Konstantin Logistik AG',
                                            id: 83923,
                                            evnsent: null,
                                          }
                                      
                                    ],
                                  }
                                  console.log(recordset)
                                  resolve(recordset);
                              }
                    }

                });

            });
        }
    )
}
