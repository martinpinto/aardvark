const { config } = require('../../../config/index');

var mysql = require('mysql');

export class MySqlRepository {
    connection;

    constructor() {
        this.connection = mysql.createConnection({
            host     : config.database.mysql.baseurl  || process.env.DB_USER,
            user     : config.database.mysql.user,
            password : config.database.mysql.password  || process.env.DB_PWD,
            database : config.database.mysql.database
        });
    }
    
    query(sql, args): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows: any[]) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    convertDateToYMD(date) {
        var year, month, day;
        year = String(date.getFullYear());
        month = String(date.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(date.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
}
