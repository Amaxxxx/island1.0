/*
用来定义路由的路由器模块
 */
const express = require('express')
const md5 = require('blueimp-md5')


const UserModel = require('../models/UserModel')
const ScrapbookModel = require('../models/ScrapbookModel')
const ScrapPageModel = require('../models/ScrapPageModel')

// 得到路由器对象
const router = express.Router()
// console.log('router', router)

// 指定需要过滤的属性
const filter = {password: 0, __v: 0}


// 登陆
router.post('/login', (req, res) => {
  const {username, password} = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  UserModel.findOne({username, password: md5(password)})
    .then(user => {
      if (user) { // 登陆成功
        
          // 返回登陆成功信息(包含user)
          res.send({status: 0, data: user})

      } else {// 登陆失败
        res.send({status: 1, msg: '用户名或密码不正确!'})
      }
    })
    .catch(error => {
      console.error('登陆异常', error)
      res.send({status: 1, msg: '登陆异常, 请重新尝试'})
    })
})


// 注册
router.post('/register', (req, res) => {
  // 读取请求参数数据
  const {username, password,email} = req.body
  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  UserModel.findOne({username})
    .then(user => {
      
      // 如果user有值(已存在)
      if (user) {
        // 返回提示错误的信息
        res.send({status: 1, msg: '此用户已存在'})
        return new Promise(() => {
        })
      } else { // 没值(不存在)
        // 保存
        return UserModel.create({username: username, email:email, password: md5(password || 'atguigu')})
      }
    })
    .then(user => {
      // 返回包含user的json数据
      res.send({status: 0, data: user})
    })
    .catch(error => {
      console.error('注册异常', error)
      res.send({status: 1, msg: '添加用户异常, 请重新尝试'})
    })
})


//获取创建时间
router.post('/admin',(req,res)=>{
  const {username} = req.body
  // 根据userid查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回查询成功信息
  UserModel.findOne({username})
    .then(user => {
      if (user) { // 查找成功 
        res.send({status: 0, msg: user.create_time})
      } else {// 登陆失败
        res.send({status: 1, msg: '创建时间不存在!'})
      }
    })
    .catch(error => {
      console.error('查找异常', error)
      res.send({status: 1, msg: '查找异常, 请重新尝试'})
    })
})

//新建手帐本
router.post('/admin/create/scrapbook',(req,res)=>{
  const {username,coverID,scrapbookname} = req.body
  // 根据scrapbookname查询数据库scrapbooks, 如果有, 提示手帐本已经存在，请更改名称，否则创建手帐本
  ScrapbookModel.findOne({scrapbook_name:scrapbookname})
    .then(scrapbook => {
      // 如果scrapbook有值(已存在)
      if (scrapbook) {
        // 返回提示错误的信息
        res.send({status: 1, msg: '此手帐本已存在'})
        return new Promise(() => {
        })
      } else { // 没值(不存在)
        // 创建手帐本
        return ScrapbookModel.create({created_by: username, scrapbook_name:scrapbookname, coverid: coverID})
      }
    })
    .then(scrapbook => {
      // 返回包含scrapbook的json数据
      res.send({status: 0, data: scrapbook})
    })
    .catch(error => {
      console.error('创建手帐本异常', error)
      res.send({status: 1, msg: '创建手帐本异常, 请重新尝试'})
    })
   
})


//我的手帐本获取手帐本信息
router.post('/admin/myscrapbook',(req,res)=>{
  const {username} = req.body
  // 根据scrapbookname查询数据库scrapbooks, 如果有, 提示手帐本已经存在，请更改名称，否则创建手帐本
  ScrapbookModel.find({created_by:username})
    .then(scrapbooks => {
      // 如果scrapbooks有值(有大于等于一本存在)
      if (scrapbooks) {
        // 返回相应数据
        res.send({status: 0 , msg: '获取手帐本成功',data: scrapbooks})
      } else { // 没值(不存在)
        res.send({status: 1, msg: '您还未创建手帐本'})
      }
    })
    .catch(error => {
      console.error('获取手帐本异常', error)
      res.send({status: 1, msg: '获取手帐本异常, 请重新尝试'})
    })
   
})

//删除手帐本
router.post('/admin/myscrapbook/delete',(req,res)=>{
  const {scrapid} = req.body
  ScrapbookModel.deleteOne({_id: scrapid})
  .then((doc) => {
    return ScrapPageModel.remove({belong_scrapbook: scrapid})
  })
  .then((doc) => {
    res.send({status: 0})
  }).catch(error=>{ 
    console.log(error); // Failure 
  })  
})

//修改手帐本基本信息
router.post('/admin/myscrapbook/edit',(req,res)=>{
  const {editid,coverID,scrapbookname} = req.body
  // 根据scrapbookname查询数据库scrapbooks, 如果有, 提示手帐本名称已经存在，请更改名称，否则修改手帐本
  ScrapbookModel.findOne(
    {$and: [{scrapbook_name:scrapbookname}, {_id: { $ne:editid}}]},
    )
    .then(scrapbook => {
      // 如果scrapbook有值(已存在)
      if (scrapbook) {
        // 返回提示错误的信息
        res.send({status: 1, msg: '手帐本名称已存在'})
        return new Promise(() => {
        })
      } else { // 没值(不存在)
        // 修改手帐本信息
        ScrapbookModel.findOneAndUpdate({
          _id: editid
        }, { 
          $set: {
                  coverid: coverID,
                  scrapbook_name: scrapbookname,
                  create_updatetime: Date.now(),
           }
        },{
          new: true
        }, function(err, data) {
          if(err) {
            res.send({status: 1,msg: '数据库发生错误'})
          }
          else if(!data) {
            res.send({status: 1,msg: '未查找到相关数据'})
            
          }
          else if(data){
            res.send({status: 0,msg: '修改数据成功'})
          }
        })
      } 
    })   
    .catch(error => {
      console.error('更新手帐本信息异常', error)
      res.send({status: 1, msg: '更新手帐本信息异常, 请重新尝试'})
    })
  })


//获取手帐本所有纸张信息
router.post('/admin/myscrapbook/scrapbookx',(req,res)=>{
  const {cid} = req.body
  // 根据cid查询数据库scrapbooks, 如果有, 返回纸张编号数组，否则提示数据库错误
  ScrapbookModel.findOne({_id: cid})
    .then(scrapbook => {
      // 如果scrapbook有值(已存在)
      if (scrapbook) {
        // 返回提示错误的信息
        return ScrapPageModel.find({belong_scrapbook: cid})
      } else { // 没值(不存在)
        res.send({status: 1, msg: '数据库错误'})
        return new Promise(() => {
        })
      } 
    })   
    .then((papers)=>{
      res.send({status: 0, data: papers,msg:'获取纸张信息成功'})
    })
    .catch(error => {
      console.error('获取纸张信息异常', error)
      res.send({status: 1, msg: '获取纸张信息异常, 请重新尝试'})
    })
  })


////新建纸张
router.post('/admin/myscrapbook/scrapbookx/addpaper',(req,res)=>{
  const {papercoverid,cid} = req.body
  // 根据cid查询数据库scrapbooks手帐本纸张数量有没有超过30张, 如果有, 提示手帐本张数已满30张，请创建新的手帐本
  ScrapbookModel.findOne({_id:cid})
    .then(scrapbook=> {
      if (scrapbook.scrapbook_content.length>=30) {
        // 返回提示错误的信息
        res.send({status: 1, msg: '此手帐本已满,请重创建新的手帐本'})
        return new Promise(() => {
        })
      } else { // 没值(不存在)
        // 创建新的paper
       return ScrapPageModel.create({page_id: papercoverid, belong_scrapbook:cid})
      }
    })
    .then(paper => {
      // 返回包含scrapbook的json数据
      ScrapbookModel.findOneAndUpdate({
        _id: cid
      }, { 
        $set: {
                create_updatetime: Date.now(),
         },
        $push: {
          scrapbook_content: paper._id,
        }
      },{
        new: true
      }, function(err, data) {
        if(err) {
          res.send({status: 1,msg: '数据库发生错误'})
        }
        else if(!data) {
          res.send({status: 1,msg: '未查找到相关数据'})
          
        }
        else if(data){
          res.send({status: 0,msg: '添加纸张成功'})
        }
      })
    })
    .catch(error => {
      console.error('添加纸张异常', error)
      res.send({status: 1, msg: '添加纸张异常, 请重新尝试'})
    })
   
})


//获取贴纸信息
router.post('/admin/myscrapbook/scrapbookx/pastes',(req,res)=>{
  const {page,cid} = req.body
  // 根据cid查询数据库scrapbooks手帐本纸张数量有没有超过30张, 如果有, 提示手帐本张数已满30张，请创建新的手帐本
  ScrapbookModel.findOne({_id:cid})
    .then(scrapbook=> {
      if (scrapbook.scrapbook_content[page]) {
        return ScrapPageModel.findOne({_id:scrapbook.scrapbook_content[page]})
      } else { // 没值(不存在)
        // 创建新的paper
        res.send({status: 1,msg: '数据库发生错误'})
        return new Promise(() => {
        })
      }
    })
    .then(paper => {
      res.send({status: 0,data:paper.paste,msg: '获取贴纸成功',})
    })
    .catch(error => {
      console.error('获取贴纸异常', error)
      res.send({status: 1, msg: '获取贴纸异常, 请重新尝试'})
    })
   
})


//保存贴纸信息
router.post('/admin/myscrapbook/scrapbookx/savepastes',(req,res)=>{
  const {page,cid,pastes,styles} = req.body
  // 根据cid查询数据库scrapbooks手帐本纸张数量有没有超过30张, 如果有, 提示手帐本张数已满30张，请创建新的手帐本
  ScrapbookModel.findOne({_id:cid})
    .then(scrapbook=> {
      if (scrapbook.scrapbook_content[page]) {
        return ScrapPageModel.findOneAndUpdate(
          {_id:scrapbook.scrapbook_content[page]},
          { 
            $set: {
                    paste: {
                      paste:pastes,
                      style0:styles[0],
                      style1:styles[1],
                      style2:styles[2],
                      style3:styles[3],
                      style4:styles[4],
                      style5:styles[5],
                      style6:styles[6],
                      style7:styles[7],
                      style8:styles[8],
                      style9:styles[9],
                    },
             }
          },
          {
            new: true
          }, 
          function(err, data) {
            if(err) {
              res.send({status: 1,msg: '数据库发生错误'})
            }
            else if(!data) {
              res.send({status: 1,msg: '未查找到相关数据'})
              
            }
            else if(data){
              res.send({status: 0,msg: '修改贴纸信息数据成功'})
            }
          })
      } else { // 没值(不存在)
        // 创建新的paper
        res.send({status: 1,msg: '数据库发生错误'})
        return new Promise(() => {
        })
      }
    })
    .catch(error => {
      console.error('获取纸张信息异常', error)
      res.send({status: 1, msg: '获取纸张信息异常, 请重新尝试'})
    })
   
})

//减纸
router.post('/admin/myscrapbook/scrapbookx/deletepaper',(req,res)=>{
  const {index,sid} = req.body
  let deleteid ;
      // 先删papers，再更新scrap的paper数组
    ScrapbookModel.findOne({
      _id: sid
    })
    .then((scrapbook) => {
      if (scrapbook.scrapbook_content[index]) {
      deleteid = scrapbook.scrapbook_content[index]
      return ScrapbookModel.findOneAndUpdate(
        {
          _id: sid
        }, 
        { 
          $pull: {
            scrapbook_content: scrapbook.scrapbook_content[index],
           },
        },
        {
          new: true
        }, 
        function(err, data) {
          if(err) {
            res.send({status: 1,msg: '更新手帐本纸张信息出错，数据库发生错误'})
          }
          else if(!data) {
            res.send({status: 1,msg: '未查找到相关数据'})
          }
        })
      }else{
        res.send({status: 1,msg: '删除纸张出错，数据库发生错误'})
        return new Promise(() => {
        })
      }
    })
    .then((doc)=>{
      return ScrapPageModel.deleteOne({_id: deleteid}) 
    })
    .then((doc)=>{
      res.send({status: 0, msg: '删除纸张成功'})
      return new Promise(() => {
      })
    })
    .catch(error => {
      console.error('删除纸张异常', error)
      res.send({status: 1, msg: '删除纸张异常, 请重新尝试'})
    })
})






require('./file-upload')(router)

module.exports = router