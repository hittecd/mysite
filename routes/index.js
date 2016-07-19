var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(
    '/userlist',
    function(req, res, next) {
      var db = req.db;
      var collection = db.get('usercollection')
      collection.find(
          {},
          {},
          function(e, docs) {
            res.render('userlist',
                {"userlist" : docs}
            )
          }
      );
    }
);

router.get(
    '/userdata',
    function(req, res, next) {
        res.render('userdata', {"title" : "Create New User"})
    }
);

router.post(
    '/adduser',
    function(req, res, next) {
        var db = req.db;

        var username = req.body.username;
        var useremail = req.body.useremail;

        var collection = db.get('usercollection')

        collection.insert(
            {"username" : username, "email" : useremail},
            function(err, doc) {
                if(err) {
                    res.send("there was a problem adding the information to the database.");
                }
                else {
                    res.redirect("userlist");
                }
            }
        );
    }
);

module.exports = router;
