module.exports = function(objRepo) {
    return function(req,res,next){
        if(req.body.desc === ''){
            res.locals.errorMsg.push('Üresen nem küldheted el!')
                return next();
        } else {
            objRepo.Topic.findById(req.params.topicid, function(err, newcomment){
                if(err){
                    res.redirect('/forum/')
                } else {
                    objRepo.Comment.create({author: req.body.author, desc: req.body.desc, img: req.body.img}, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            newcomment.comments.push(comment);
                            newcomment.save();
                            res.redirect('/forum/' + req.params.id + '/' + req.params.forumid + '/' + req.params.topicid);
                        }
                    })

                        }
                    })
                }
            }
        }