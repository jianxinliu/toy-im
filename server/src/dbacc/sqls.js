const util = require('../util/util.js')

module.exports = {
    myFriends(myId) {
        util.requireNonNull(myId);
        return `select * from im.im_user
                where uid in (
                    select distinct
                    case
                        when uid_owner = ${myId} then uid_friend
                        when uid_friend = ${myId} then uid_owner end 'friends'
                    from im.im_relation ir
                    where uid_owner = ${myId} or uid_friend = ${myId}
                )`
    },

    commonFriends(aUid, bUid) {
        return `select *
                from im.im_user
                where uid in (
                    select a.friends
                    from (
                        select distinct
                        case
                            when uid_owner = ${aUid} then uid_friend
                            when uid_friend = ${aUid} then uid_owner end 'friends'
                        from im.im_relation ir
                        where uid_owner = ${aUid} or uid_friend = ${aUid}
                    ) a
                    inner join
                    (
                        select distinct
                        case
                            when uid_owner = ${bUid} then uid_friend
                            when uid_friend = ${bUid} then uid_owner end 'friends'
                        from im.im_relation ir
                        where uid_owner = ${bUid} or uid_friend = ${bUid}
                    ) b on
                    a.friends = b.friends
                )`
    }
}

