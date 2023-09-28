const router = require ("express").Router();
const fs = require ("fs");
const util = require ("util");
const readFile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require('uuid');

const getnotes = () => {
    return readFile ("db/db.json", "utf-8").then(notes => [].concat(JSON.parse(notes)));
};

router.get ("/notes", (req, res) => {
    getnotes().then(notes => res.json(notes));
})

router.post ("/notes", (req, res) => {
    getnotes().then(oldnotes => {
       const newnotes = [...oldnotes, {
        title:req.body.title, 
        text:req.body.text,
        id:uuidv4()
       }] 
       writefile("db/db.json", JSON.stringify(newnotes)).then(() => res.json({
        msg:"okay"
       }));
    });
});

router.delete ("/notes/:id", (req, res) => {
    getnotes().then(oldnotes => {
      const filteredNotes = oldnotes.filter(note => note.id !== req.params.id);
console.log(filteredNotes);
       writefile("db/db.json", JSON.stringify(filteredNotes)).then(() => res.json({
        msg:"okay"
       }));
    }); 
});






module.exports = router;