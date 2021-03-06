module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.Topic.findById(req.params.topicid).populate('comments').exec(function(err, topic){
            if(err){
                console.log(err);
            } else {
                let data = {
                    contentid: req.params.id,
                    forumid: req.params.forumid,
                    topicid: req.params.topicid,
                    topic: topic,
                }
               res.render('showtopic', {data: data, error: objRepo.error})
               return next();
            }
        })
    }
}