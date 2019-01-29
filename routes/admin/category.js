/*
 *菜品类别相关路由
 */
const express = require('express')
const pool = require('../../pool')

var router = express.Router()

/**
 * API: GET /admin/catagory
 * 含义：客户端获取所有的菜品类别，按编号升序排列
 * 返回值形如：
 * [{cid:1,cname:'...'},{...}]
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM hn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

/**
 * API: DELETE /admin/categofy
 * 含义： 根据表示菜品编号的路由参数， 删除该菜品
 * 返回值形如：
 * {code: 200, msg: '1 category deleted'},
 * {code: 400, msg: '0 category deleted'}
 */
router.delete('/:cid', (req, res) => {
    // 注意：删除菜品类别前必须先把属于该类别的菜品的类型编号都设置为NULL
    pool.query('UPDATE hn_dish SET categoryId=NULL WHERE categoryId=?', req.params.cid, (err, result) => {
        if (err) throw err;
        // 至此指定类别的菜品已经修改完毕
        pool.query('DELETE FROM hn_category WHERE cid=?', req.params.cid, (err, result) => {
            if (err) throw err;
            // 获取DELETE语句在数据库中影响的行数
            if (result.affectedRows > 0) {
                res.send({
                    code: 200,
                    msg: '1 categofy deleted'
                })
            } else {
                res.send({
                    code: 400,
                    msg: '0 categofy deleted'
                })
            }
        })
    })
})

/**
 * API: POST / adim / category
 * 请求参数：{cname：'xxx'}
 * 含义：根据表示菜品编号的路由参数，删除该菜品
 * 返回值形如：
 * {code: 200, msg: '1 category added',cid: x}
 */
router.post('/', (req, res) => { 
    var data = req.body;//行如{cname:xxx}
    pool.query('INSERT INTO hn_category SET ?',data,(err, result) => { //注意此处SQL语句的简写
        if (err) throw err;
        res.send({code:200,msg:'1 catagory added'})
    })
})

/**
 * API: PUT / adim / category
 * 请求参数：{cid: xx, cname：'xxx'}
 * 含义：根据表示菜品编号修改该类别
 * 返回值形如：
 * {code: 200, msg: '1 category modified'}
 * {code: 400, msg: '0 category modified', not exists}
 * {code: 401, msg: '0 category modified', no modification}
 */
router.put('/', (req, res) => { 
    var data = req.body;//请求数据{cid:xxx,cname:'xx'}
    console.log(data)
    // TODO:此处可以对数据进行验证
    pool.query('UPDATE hn_category SET ? WHERE cid=?', [data,data.cid], (err, result) => { 
        if (err) throw err;
        if (result.changedRows > 0) {//实际修改了一行
            res.send({ code: 200, msg: '1 catagory modified' })
        } else if (result.affectedRows == 0) {//影响到0行
            rees.send({ code: 400, msg: 'catagory not exists' })
        } else if (result.affectedRows == 1 && result.changedRows == 0) {
            // 影响到一行，但修改了0行，说明新值与旧值一样
            res.send({code:401,msg:'no categofy modified'})
        }
    })
})
module.exports = router