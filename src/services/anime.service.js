
const Anime = require('../models/Anime');
exports.getById = async (animeId) => {
    // const animeId = req.params.title;
    const animeExists = await Anime.findOne({'_id':animeId}); 
    if(!animeExists) {
        return null
    }
    return animeExists
};

exports.addAnimeTag = async (animeId, tagId, userId)=> {

    try{
        let meuAnime = await Anime.findById(animeId)
        console.log(meuAnime)
        meuAnime.tags.push({'tagId': tagId, folks: [userId] })
        await Anime.findByIdAndUpdate({'_id':animeId}, {'tags': meuAnime.tags} )
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
};

exports.removeAnimetag = async (animeId, tagId) =>{

    try{
        let meuAnime = await Anime.findById(animeId)

        for(let i = 0; i < meuAnime.tags.length; i++){
            if (meuAnime.tags[i].tagId == tagId){
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
