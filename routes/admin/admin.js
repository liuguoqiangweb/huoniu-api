/**
 * 管理员相关路由
 */
const express = require('express')
const pool = require('../../pool')
var router = express.Router()

/**
 * API: GET /admin/login
 * 请求数据：{aname:'xxx',apwd:'xxx'}
 * 完成用户登录验证
 * 返回数据：
 * {code:200,msg:'login succ'}
 * {code:400,msg:'aname or apwd err'}
 */
router.get('/login/:aname/:apwd', (req, res) => { 
    var aname = req.params.aname
    var apwd = req.params.apwd
    pool.query('SELECT aid FROM hn_admin WHERE aname=? AND apwd=PASSWORD(?)', [aname, apwd], (err, result) => { 
        if (err) throw err;
        if (result.length > 0) {//查询到一行数据，登录成功
            res.send({code:200,msg:'login succ'})
        } else { //没有查询到数据
            res.send({code:400,msg:'aname or apwd err'})
        }
    })
})

 /**
  * API: PATCH /admin/
  * 请求数据：{aname:'xxx',newPwd:'xxx',oldPwd:'xxx'}
  * 根据管理员名和密码修改管理员密码
  * 返回数据：
  * {code:200,msg:'modified succ'}
  * {code:400,msg:'aname or apwd err'}
  * {code:400,msg:'apwd not modified'}
  */
router.patch('/', (req, res) => { 
    var data = req.body
    // 首先根据aname、oldPwd查询该用户是否存在
    pool.query('SELECT aid FROM hn_admin WHERE aname=? AND apwd=PASSWORD(?)', [data.aname, data.oldPwd], (err, result) => { 
        if (err) throw err;
        if (result.length > 0) {
            // 如果查到用户，再修改其密码
            pool.query('UPDATE hn_admin SET apwd=PASSWORD(?) WHERE aid=?', [data.newPwd, result[0].aid], (err, result) => {
                if (err) throw err;
                if (result.changedRows == 0 ) {//新旧密码一样，未做修改
                    res.send({code:401,msg:'apwd not modified'})
                } else {//修改成功
                    res.send({ code: 200, msg: 'modified succ' })
                }
            })
        } else { 
            res.send({code:400,msg:'aname or apwd err'})
        }
    })
})
module.exports = router