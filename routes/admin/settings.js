const express = require('express')
const pool = require('../../pool')
var router = express.Router()

/**
 * GET /admin/settings
 * 获取所以有的全局设置信息
 * 返回数据：
 * {appName:'xx',adminUrl:'xx'...}
 */
router.get('/', (req, res) => { 
    pool.query('SELECT * FROM hn_settings LIMIT 1', (err, result) => { 
        if (err) throw err;
        res.send(result[0])
    })
})

/**
 * PUT /admin/settings
 * 请求数据：{appName:'xx',adminUrl:'xx'...}
 * 修改所有的全局设置信息
 * 返回数据：
 * {code:200,msg:'settings updated succ'}
 */
router.put('/', (req, res) => {
    pool.query('UPDATE hn_settings SET ?',req.body, (err, result) => {
        if (err) throw err;
        res.send({code:200,msg:'settings updated succ'})
    })
})

module.exports = router