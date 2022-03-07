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
        let meuAnime = await Anime.findById(animeId);
        meuAnime.tags.find(e => e.tagId == tagId).folks.push(userId)
        await Anime.findByIdAndUpdate({'_id':animeId}, {'tags': meuAnime.tags} )
        return true;
        //a
    }catch(err){
        console.log(err)
        return false;
    }
}

exports.animeContainsTag = async (animeId, tagId) =>{
    const anime = await Anime.findOne({'_id':animeId, 'tags.tagId': tagId});
    if(anime.length === 0) {
        return false;
    }
    return true;    
}

exports.removeAnimetag = async (animeId, tagId) =>{

    try{
        let meuAnime = await Anime.findById(animeId)

        for(let i = 0; i < meuAnime.tags.length; i++){
            if (meuAnime.tags[i].tagId == tagId){
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                meuAnime.tags.splice(i,1);
                break;
            }
        }

        await Anime.findByIdAndUpdate({'_id':animeId}, {'tags': meuAnime.tags} )
        return true;
    }catch(err){
        console.log(err)
        return false;
    }

};
