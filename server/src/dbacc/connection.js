const mysql = require('mysql')
const config = require('../config/config.js')
const util = require('../util/util.js')

module.exports = {
    query(sql) {
        util.requireNonNull(sql, "sql 缺失！")

        const conn = mysql.createConnection({
            ...config.db
        })

        return new Promise(((resolve, reject) => {
            conn.query(sql, (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            })
        })).finally(() => conn.end());
    }
}
