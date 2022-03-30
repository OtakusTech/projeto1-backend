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
        res.send({ name: tagExists.tag, tagId: tagExists._id});
    } else {
        const newTag = new Tag({
            tag: req.body.tag
        });
    
        try{
            const savedTag = await newTag.save();
            res.send({name: savedTag.tag, tagId: savedTag._id});
        }catch(err){
            res.status(500).send(err);
        }
    }
}