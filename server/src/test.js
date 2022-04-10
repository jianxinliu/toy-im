const conn = require('./dbacc/connection.js')
const sqls = require('../src/dbacc/sqls.js')

function testDb() {
    conn.query('select * from im.im_user')
        .then(results => console.log('The result is: ', results.map(v => v.uname)))
        .catch(err => console.error(err))

    conn.query(sqls.myFriends(1))
        .then(results => console.log('The result is: ', results.map(v => v.uname)))
        .catch(err => console.error(err))

    conn.query(sqls.commonFriends(1, 2))
        .then(results => console.log('The result is: ', results.map(v => v.uname)))
        .catch(err => console.error(err))
}

testDb();
