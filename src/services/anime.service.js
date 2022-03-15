const { ObjectId } = require('mongodb');
const Anime = require('../models/Anime');

exports.getAnimeById = async (animeId) => {
    try{
        animeOrNull = await Anime.findOne({'_id': animeId})
        return animeOrNull;
    }catch(error) {
        throw error;
    }
    
};


exports.addAnimeTag = async (animeId, tagId, userId)=> {
    try{
        const anime = await this.getAnimeById(animeId);
        anime.tags.push({'tagId': tagId, folks: [userId] })
        const { modifiedCount } = await Anime.updateOne({'_id': animeId}, {$set: {'tags': anime.tags}} )
        if(modifiedCount === 0) return null;
        const savedAnime = await this.getAnimeById(animeId); 
        return savedAnime;
    }catch(error){
        throw error
    }
};

exports.addUserVoteToAnimeTag = async (animeId, tagId, userId) =>{
    try{
        const anime = await Anime.findById(animeId);
        if(!anime) return null;
        
        const tag = anime.tags.find(e => `${e.tagId}` === tagId)
        if(!tag) res.send("eee"); 
        
        if(tag.folks.includes(userId)) return null;
        
        tag.folks.push(userId)
        const { modifiedCount } = await Anime.updateOne({'_id': animeId}, {$set: {'tags': anime.tags}} )
        if(modifiedCount === 0) return null;
        
        const savedAnime = await this.getAnimeById(animeId); 
        return savedAnime;
    }catch(error){
        throw error;
    }
}

exports.animeContainsTag = async (animeId, tagId) =>{
    const anime = await Anime.findOne({'_id':animeId, 'tags.tagId': tagId});
    if(anime === null) {
        return false;
    }
    return true;    
}

exports.removeAnimeTag = async (animeId, tagId) =>{    
    try{
        const anime = await Anime.findById(animeId)
        if(!anime) return null;
        
        const index = await anime.tags.findIndex(e => `${e.tagId}` === tagId); 
        if(index === -1) return null;
        
        anime.tags.splice(index,1);
        
        const { modifiedCount } = await Anime.updateOne({'_id': animeId}, {$set: {'tags': anime.tags}} )
        if(modifiedCount === 0) return null;
        
        const savedAnime = await this.getAnimeById(animeId); 
        return savedAnime;
    }catch(error){
        throw error;
    } 

};
