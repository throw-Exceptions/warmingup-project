const express = require("express");
const Contents = require("./model/Contents");
const ContentRepository = require("./ContentRepository");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const repository = new ContentRepository();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/static/index.html");
});

app.get("/:filename", function(req, res) {
    let filename = req.params.filename;
    let ext = filename.split(".")[1];
    if (ext !== "js" && ext !== "css" && ext != "jpg") {
        res.sendStatus(400);
        return;
    }
    res.sendFile(__dirname + `/static/${filename}`);
});

app.post("/contents", function(req, res) {
    console.log(`Post new content`);
    let data = req.body;
    let newContents = new Contents(data.title, data.content, data.author, data.password);
    let result = repository.insert(newContents);
    if (result) {
        res.json(newContents.getJson());
    } else {
        res.sendStatus(400);
    }
});

app.put("/contents/:id/view", function(req, res) {
    console.log(`Increase view count of contents(id=${req.params.id})`);
    let contents = repository.selectBy(req.params.id);
    if (contents === null) {
        res.sendStatus(404);
        return;
    }
    let result = repository.updateViewCnt(req.params.id);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.get("/contents/init", function(req, res) {
    console.log(`Get request to initial 10 contents`);
    let results = repository.selectLatest10();
    res.json(Contents.serialize(results));
});

app.get("/contents/after/:id", function(req, res) {
    console.log(`Get request to contents after id(${req.params.id})`);
    let results = repository.selectAfter(req.params.id);
    res.json(Contents.serialize(results));
});

app.get("/contents/before/:id", function(req, res) {
    console.log(`Get request to contents before id(${req.params.id})`);
    let results = repository.selectBefore(req.params.id);
    res.json(Contents.serialize(results));
});

app.put("/contents/:id", function(req, res) {
    console.log(`Put request to content(id=${req.params.id})`);
    let data = req.body;
    let content = repository.selectBy(req.params.id);
    if (content === null) {
        console.log("[error][update] target not found");
        res.sendStatus(404);
        return;
    }
    if (data.password !== content.password) {
        console.log("[error][update] unauthorized");
        res.sendStatus(403);
        return;
    }
    let result = repository.updateBy(data, req.params.id);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.delete("/contents/:id", function(req, res) {
    console.log(`Delete request to content(id=${req.params.id})`);
    let contents = repository.selectBy(req.params.id);
    if (!contents) {
        console.log("[error][delete] target not found");
        res.sendStatus(404);
        return;
    }
    if (contents.password !== req.body.password) {
        console.log("[error][delete] unauthorized");
        res.sendStatus(403);
        return;
    }
    let result = repository.deleteBy(req.params.id);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.get("/contents/:option", function(req, res) {
    let option = req.params.option;
    let input = req.query.input;
    console.log(`Search request to content(option=${option}, input=${input}`);
    let results;
    if (option === "id") {
        results = repository.selectBy(input);
        results = (results) ? [results] : [];
    } else {
        results = repository.selectWithOption(option, input);
    }
    res.json(results);
});

app.listen(3000, () => console.log("Started server at localhost:3000"));

