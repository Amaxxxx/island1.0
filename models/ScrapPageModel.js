
/*
能操作users集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')


// 2.字义Schema(描述文档结构)
const paperSchema = new mongoose.Schema({
  page_id: {type: Number, required: true}, // 纸张样式id
  belong_scrapbook:{type: String, required: true}, //所属手帐本id
  paste: {type:Object,default: {
    paste:[],
    style0:{
      left: 100,
      top: 100,
      width: 100,
      height: 100,},
    style1:{
      left: 100 + 20,
      top: 100 + 20,
      width: 100,
      height: 100
    },
    style2:{
      left: 100 + 40,
      top: 100 + 40,
      width: 100,
      height: 100
    },
    style3:{
      left: 100 + 60,
      top: 100 + 60,
      width: 100,
      height: 100
    },
    style4:{
      left: 100 + 80,
      top: 100 + 80,
      width: 100,
      height: 100
    },
    style5:{
      left: 100 + 100,
      top: 100 + 100,
      width: 100,
      height: 100
    },
    style6:{
      left: 100 + 120,
      top: 100 + 120,
      width: 100,
      height: 100
    },
    style7:{
      left: 100 + 140,
      top: 100 + 140,
      width: 100,
      height: 100
    },
    style8:{
      left: 100 + 160,
      top: 100 + 160,
      width: 100,
      height: 100
    },
    style9:{
      left: 100 + 180,
      top: 100 + 180,
      width: 100,
      height: 100
    },
  }},//所包含的贴纸信息对象数组
  text: {type:Object,default: {}},//所包含的贴纸信息对象数组
})

// 3. 定义Model(与集合对应, 可以操作集合)
const ScrapPageModel = mongoose.model('papers', paperSchema)



// 4. 向外暴露Model
module.exports = ScrapPageModel