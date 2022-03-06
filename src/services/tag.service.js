const Tag = require('../models/Tag');

exports.getTagByName = async (tagName) => {
    try {
        const tagOrNull = await Tag.findOne({'tag':tagName});
        return tagOrNull;   
    } catch (error) {
        throw error;
    } 
}

exports.getTagById = async (tagId) => {
    try {
        const tagOrNull = await Tag.findOne({'_id':tagId});
        return tagOrNull;   
    } catch (error) {
        throw error;
    }
}

exports.getAllTags = async () => {
    try {
        const tags = await Tag.find({});
        return tags;
    } catch (error) {
        throw error
    }
}

exports.createTag = async (tagName) => {
    try{
        const tag = this.getTagByName(tagName);
        if(tag) return null; // quando a tag já existe

        const newTag = new Tag({
            tag: tagName
        }); 

        const savedTag = await newTag.save();
        return savedTag;
    }catch(error){
        throw error;
    }
}

exports.deleteTagById = async(tagId) => {
    try {
        const deletedCount = await Tag.deleteOne({'_id': tagId});
        return deletedCount;
    } catch (error) {
        throw error
    }
}

exports.deleteTagByName = async(tagName) => {
    try {
        const deletedCount = await Tag.deleteOne({'tag': tagName});
        return deletedCount;
    } catch (error) {
        throw error
    }
}