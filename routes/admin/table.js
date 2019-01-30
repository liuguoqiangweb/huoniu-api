const express = require('express')
const pool = require('../../pool')
var router = express.Router()

/**
 * GET /admin/settings
 * 获取所有桌台信息
 * 返回数据：
 * {tid:'xx',tname:'xx',status:''}
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM hn_table ORDER BY tid', (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

module.exports=router