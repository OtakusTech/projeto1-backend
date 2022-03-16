const Tag = require('../models/Tag');

exports.getTag = async (tagName) => {
    const myTag = await Tag.findById({tag:tagName});
    if(myTag){
        return myTag
    }else{
        return null
    }
}

exports.getTagId = async (name, res) => {
    const tagName = name;
    const tag = await Tag.find({"tag":tagName}); //Ver como tratar maiusculas e minusculas;
    
    if (!tag) {
        return res.status(400).send('Tag não cadastrada');
    }
    return tag.id;
};

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