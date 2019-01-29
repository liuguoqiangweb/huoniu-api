/**
 * 菜品相关路由
 */
const express = require('express')
const pool = require('../../pool')
var router = express.Router()

/**
 * API: GET /admin/dish
 * 获取所有的菜品（按类别进行分类）
 * 返回数据：
 * [
 *   {cid:1,cname:'肉类'，dishList:[{},{},{},{}]}
 *   {cid:2,cname:'丸滑类'，dishList:[{},{},{},{}]}
 *   {cid:3,cname:'菌菇类'，dishList:[{},{},{},{}]}
 *   ...
 * ]
 */
router.get('/', (req, res) => { 
    // 查询所有的菜品类别
    pool.query('SELECT cid,cname FROM hn_category', (err, result) => { 
        if (err) throw err;
        console.log(result)
        var categoryList = result.slice(0,2)//菜品类别数组
        var count = 0;
        var dishList=[]
        for (var c of categoryList) { 
            pool.query('SELECT * FROM hn_dish WHERE categoryId = ?', c.cid, (err, result) => { 
                if (err) throw err;
                c.dishList=result
                count++;
                if (count == categoryList.length) { 
                    res.send(categoryList)
                }
            })
        }
    })
})

module.exports = router