const Tag = require('../models/Tag');

exports.getAll = async (req, res, next) => {
    const tags = await Tag.find();
    if (!tags) {
        return res.status(400).send('Sem tags cadastradas');
    }
    res.send(tags);
};

exports.createTag = async (req, res) => {
    const tagExists = await Tag.findOne({tag: req.body.tag});
    if (tagExists) {
        return res.status(400).send('Tag ja cadastrada.');
    }
    const newTag = new Tag({
        tag: req.body.tag
    });

    try{
        const savedTag = await newTag.save();
        res.send({tag: newTag._id});
    }catch(err){
        res.status(400).send(err);
    }
}