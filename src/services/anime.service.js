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
        if(!anime) throw new Error("Anime não cadastrado");

        anime.tags.push({'tagId': tagId, folks: [userId] })
        const { modifiedCount } = await Anime.updateOne({'_id': animeId}, {$set: {'tags': anime.tags}} )
        if(modifiedCount === 0) throw new Error("Ocorreu um erro ao adicionar a tag ao anime");
        
        const savedAnime = await this.getAnimeById(animeId); 
        return savedAnime;
    }catch(error){
        throw error
    }
};

exports.addUserVoteToAnimeTag = async (animeId, tagId, userId) =>{
    try{
        const anime = await Anime.findById(animeId);
        if(!anime) throw new Error("Anime não cadastrado");
        
        const tag = anime.tags.find(e => `${e.tagId}` === `${tagId}`);
        if(!tag) throw new Error("Tag não cadastrada"); 
        
        if(tag.folks.includes(userId)) throw new Error("Usuário não pode votar mais de uma vez na mesma tag");
        
        tag.folks.push(userId)
        const { modifiedCount } = await Anime.updateOne({'_id': animeId}, {$set: {'tags': anime.tags}} )
        if(modifiedCount === 0) throw new Error("Ocorreu um erro ao adicionar o voto a tag");
        
        const savedAnime = await this.getAnimeById(animeId); 
        return savedAnime;
    }catch(error){
        throw error;
    }
}

exports.animeContainsTag = async (animeId, tagId) => {
    try {
        const anime = await Anime.findOne({'_id':animeId, 'tags.tagId': tagId});
        if(anime === null) {
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    } 
}

exports.removeAnimeTag = async (animeId, tagId) =>{    
    try{
        const anime = await Anime.findById(animeId)
        if(!anime) throw new Error("Anime não cadastrado");
        
        const index = await anime.tags.findIndex(e => `${e.tagId}` === tagId); 
        if(index === -1) throw new Error("Tag não pertence ao anime"); 
        
        anime.tags.splice(index,1);
        
        const { modifiedCount } = await Anime.updateOne({'_id': animeId}, {$set: {'tags': anime.tags}} )
        if(modifiedCount === 0) throw new Error("Ocorreu um erro ao remover a tag");
        
        const savedAnime = await this.getAnimeById(animeId); 
        return savedAnime;
    }catch(error){
        throw error;
    } 

};
