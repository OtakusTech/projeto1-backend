const Anime = require('../models/Anime');

exports.getAnimeById = async (req, res) => {
    // const animeId = req.params.title;
    const animeId = req.body.animeId;
    try{
        animeOrNull = await Anime.findOne({'_id':animeId})
        res.send(animeOrNull);
        // return animeOrNull;
    }catch(error) {
        throw error;
    }
    
};

exports.getAnimeByName = async (req, res) => {
    // const animeId = req.params.title;
    const animeName = req.body.animeName;
    try{
        animeOrNull = await Anime.findOne({'titulo':animeName})
        return animeOrNull;
    }catch(error) {
        throw error;
    }
    
};

exports.addAnimeTag = async (animeId, tagId, userId)=> {

    try{
        let meuAnime = await Anime.findById(animeId)
        meuAnime.tags.push({'tagId': tagId, folks: [userId] })
        await Anime.findByIdAndUpdate({'_id':animeId}, {'tags': meuAnime.tags} )
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
};

exports.addUserVoteToAnimeTag = async (animeId, tagId, userId) =>{
    try{
        let meuAnime = await Anime.findById(animeId)
        console.log(meuAnime)
        meuAnime.tags.find(e => e.tagId == tagId).folks.push(userId)
        await Anime.findByIdAndUpdate({'_id':animeId}, {'tags': meuAnime.tags} )
        return true;
        //a
    }catch(err){
        console.log(err)
        return false;
    }
}

exports.animeContainsTag = async (animeid, tagid) =>{

        let meuAnime = Anime.findOne({'_id':animeid})
        if(!meuAnime.tags){
            return false
        }

        if(meuAnime != null){
            
            console.log("auwauhewuaheuaeuaaaaaeuh")
            const searchResult = meuAnime.tags.findIndex(e => e.tagId == tagid)
            console.log(">>>>>>> SEARCH RESULT: "+searchResult)
            if(searchResult != -1){
                return true
            }
        }
        return false
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
