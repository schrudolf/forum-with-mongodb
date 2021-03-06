const renderforummw = require('../middlewares/renderforummw');
const newcontentmw = require('../middlewares/newcontentmw');
const newforummw = require('../middlewares/newforummw');
const showforumsmw = require('../middlewares/showforumsmw');
const topicmw = require('../middlewares/topicmw');
const newtopicmw = require('../middlewares/newtopicmw');
const showtopicmw = require('../middlewares/showtopicmw');
const newcommentmw = require('../middlewares/newcommentmw');
const edituserimgmw = require('../middlewares/user/edituserimgmw');
const edittopicmw = require('../middlewares/user/edittopicmw');
const deletetopicmw = require('../middlewares/user/deletetopicmw');
const editcommentmw = require('../middlewares/user/editcommentmw');
const deletecommentmw = require('../middlewares/user/deletecommentmw');
const login = require('../middlewares/user/login');
const renderregistermw = require('../middlewares/user/rendRegistermw');
const newusermw = require('../middlewares/user/newusermw');
const activatemw = require('../middlewares/user/activatemw');
const newpwmw = require('../middlewares/user/newpwmw');
const imgupload = require('../middlewares/user/imgupload');
const forgotrend = require('../middlewares/forgot/forgotrend');
const forgotemailpw = require('../middlewares/forgot/forgotemailpw');
const renderpwchangemw = require('../middlewares/forgot/renderpwchangemw');

const newpwemail = require('../middlewares/email/newpwemail');
const successemail = require('../middlewares/email/successemailmw');
const successnewpwmw = require('../middlewares/email/successnewpwmw');



// auth
const authmw = require('../middlewares/auth/authmw');
const logoutmw = require('../middlewares/auth/logoutmw');


//models
const Newcontent = require('../models/newcontent');
const Forum = require('../models/forum');
const Topic = require('../models/topic');
const Comment = require('../models/comments');
const User = require('../models/user');

//multer
const multer  = require('multer');


// Routing
module.exports = function(app){
    const objRepo = {
        Newcontent: Newcontent,
        Forum: Forum,
        Topic: Topic,
        Comment: Comment,
        User: User
    };

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'files/profilimages/')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + req.session.user.username + ".jpeg")
        }
      })
    const upload = multer({ storage: storage });

    app.use('/forum/logout', logoutmw(objRepo));   

    app.get('/forum/',
        authmw(objRepo),  
        renderforummw(objRepo));

    app.use('/forum/register',
        renderregistermw(objRepo),
        newusermw(objRepo),
        successemail(objRepo));

    app.use('/forum/activate/:id',
        activatemw(objRepo));
        
    app.use('/forum/login',
        login(objRepo));
        
    app.get('/forum/forgot',
        forgotrend(objRepo));

    app.post('/forum/forgot',
        forgotemailpw(objRepo),
        newpwemail(objRepo));
        
    app.get('/forum/forgot/:id',
        renderpwchangemw(objRepo));

    app.post('/forum/forgot/newpw/:id',
        newpwmw(objRepo),
        successnewpwmw(objRepo));    
        
    app.use('/forum/user/:userid/edit',
        authmw(objRepo),  
        edituserimgmw(objRepo));

    app.post('/forum/user/:userid/avatar',
        authmw(objRepo),  
        upload.single('avatar'),
        imgupload(objRepo));

    app.use('/forum/newcontent',
        authmw(objRepo),
        newcontentmw(objRepo));

    app.get('/forum/:id/',
        authmw(objRepo),
        showforumsmw(objRepo));

    app.use('/forum/:id/new',
        authmw(objRepo), 
        newforummw(objRepo));

    app.get('/forum/:id/:forumid/',
        authmw(objRepo), 
        topicmw(objRepo));

    app.use('/forum/:id/:forumid/new',
        authmw(objRepo),
        newtopicmw(objRepo));

    app.get('/forum/:id/:forumid/:topicid',
        authmw(objRepo),
        showtopicmw(objRepo));

    app.use('/forum/:id/:forumid/:topicid/edit',
        authmw(objRepo),
        edittopicmw(objRepo));

    app.get('/forum/:id/:forumid/:topicid/delete',
        authmw(objRepo),
        deletetopicmw(objRepo));

    app.use('/forum/:id/:forumid/:topicid/newcomment',
        authmw(objRepo), 
        newcommentmw(objRepo),
        showtopicmw(objRepo));
    
    app.use('/forum/:id/:forumid/:topicid/:commentid/edit',
        authmw(objRepo), 
        editcommentmw(objRepo));
        
    app.get('/forum/:id/:forumid/:topicid/:commentid/delete',
        authmw(objRepo), 
        deletecommentmw(objRepo));
};   
  