const router = require ("express").Router();
const path = require ("path");
const apiroutes = require ("./API");

router.use ("/api", apiroutes);

router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});



module.exports = router