const Tag = require('../models/Tag');

exports.getTag = async (tagName) => {
    const myTag = await Tag.findById({tag:tagName});
    if(myTag){
        return myTag
    }else{
        return null
    }
}

exports.createTag = async (tagName) => {
    
    const newTag = new Tag({
        tag: tagName
    });

    try{
        const savedTag = await newTag.save();
        return true
    }catch(err){
        return false
    }
}