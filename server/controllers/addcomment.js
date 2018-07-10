const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, comment, openid, phone, location} = ctx.request.body
    // console.log(bookid, comment, openid, phone, location)
    try {
        await mysql('comments').insert({bookid, comment, openid, phone, location})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: '-1',
            data: {
                msg: '评论失败:' + e.sqlMessage
            }
        }
    }
}