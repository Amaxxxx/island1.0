
/*
能操作users集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')


// 2.字义Schema(描述文档结构)
const scrapbookSchema = new mongoose.Schema({
  created_by: {type: String, required: true}, // 创建人
  scrapbook_name:{type: String, required: true}, //手帐本名称
  coverid:{type: Number, required: true},//封面id
  create_time: {type: Number, default: Date.now}, //创建时间
  create_updatetime: {type: Number, default: Date.now}, //更新时间
  scrapbook_content: {type:Array,default: []},
})

// 3. 定义Model(与集合对应, 可以操作集合)
const ScrapbookModel = mongoose.model('scrapbooks', scrapbookSchema)



// 4. 向外暴露Model
module.exports = ScrapbookModel