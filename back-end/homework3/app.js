const express = require("express");
const Contents = require("./model/Contents");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let contentsList = [
    new Contents("스타크래프트 비제이 추천합니다.", "유튜브에서 김성현TV 검색 ㄱㄱ", "ehdtls901", "1234"),
    new Contents("안녕하세여.. 2등이네용!!", "제곧내", "hoonihoon", "1234"),
    new Contents("난 3등!!", "제곧내2", "minsikson", "1234"),
    new Contents("다들 등수 놀이만 할건가여..", "생산적인 글 좀 적어바바 애드라", "teamLeader", "1234"),
    new Contents("재훈이 뭐하니", "무슨일이니 왜 연락이 안되니~~~", "손민식", "1234"),
    new Contents("민시기 허먼밀러 가져가라ㅏㅏ", "160마넌짜리 얼른얼른 가져가렴 아니면 당근마켓에 팔아버림 ㅎ_ㅎ", "영한", "1234"),
    new Contents("스타크래프트 비제이 추천합니다.", "유튜브에서 김성현TV 검색 ㄱㄱ", "ehdtls901", "1234"),
    new Contents("안녕하세여.. 2등이네용!!", "제곧내", "hoonihoon", "1234"),
    new Contents("난 3등!!", "제곧내2", "minsikson", "1234"),
    new Contents("다들 등수 놀이만 할건가여..", "생산적인 글 좀 적어바바 애드라", "teamLeader", "1234"),
    new Contents("재훈이 뭐하니", "무슨일이니 왜 연락이 안되니~~~", "손민식", "1234"),
    new Contents("민시기 허먼밀러 가져가라ㅏㅏ", "160마넌짜리 얼른얼른 가져가렴 아니면 당근마켓에 팔아버림 ㅎ_ㅎ", "영한", "1234"),
    new Contents("스타크래프트 비제이 추천합니다.", "유튜브에서 김성현TV 검색 ㄱㄱ", "ehdtls901", "1234"),
    new Contents("안녕하세여.. 2등이네용!!", "제곧내", "hoonihoon", "1234"),
    new Contents("난 3등!!", "제곧내2", "minsikson", "1234"),
    new Contents("다들 등수 놀이만 할건가여..", "생산적인 글 좀 적어바바 애드라", "teamLeader", "1234"),
    new Contents("재훈이 뭐하니", "무슨일이니 왜 연락이 안되니~~~", "손민식", "1234"),
    new Contents("민시기 허먼밀러 가져가라ㅏㅏ", "160마넌짜리 얼른얼른 가져가렴 아니면 당근마켓에 팔아버림 ㅎ_ㅎ", "영한", "1234")
];

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
    contentsList.push(newContents);
    res.json(newContents.getJson());
    console.log(contentsList);
});

app.post("/contents/:id/view", function(req, res) {
    console.log(`Increase view count of contents(id=${req.params.id})`);
    let contents = findContents(req.params.id);
    if (contents === null) {
        res.sendStatus(400);
        return;
    }
    contents.view();
    res.sendStatus(200);
});

app.get("/contents", function(req, res) {
    console.log(`Get request to contents list`);
    res.json(contentsList);
});

app.get("/contents/init", function(req, res) {
    console.log(`Get request to initial 10 contents`);
    res.json(getContentsInit());
});

app.get("/contents/after/:id", function(req, res) {
    console.log(`Get request to contents after id(${req.params.id})`);
    res.json(getContentsAfter(req.params.id));
});

app.get("/contents/before/:id", function(req, res) {
    console.log(`Get request to contents before id(${req.params.id})`);
    res.json(getContentsBefore(req.params.id));
});

app.put("/contents/:id", function(req, res) {
    console.log(`Put request to content(id=${req.params.id})`);
    let data = req.body;
    let content = findContents(req.params.id);
    if (content === null) {
        console.log("[error][update] target not found");
        res.sendStatus(404);
        return;
    }
    if (data.password !== content.password) {
        console.log("[error][delete] unauthorized");
        res.sendStatus(403);
        return;
    }
    content.title = data.title;
    content.content = data.content;
    content.author = data.author;
    content.password = data.password;
    res.json(content);
});

app.delete("/contents/:id", function(req, res) {
    console.log(`Delete request to content(id=${req.params.id})`);
    let index = findContentsIndex(req.params.id);
    if (index === -1) {
        console.log("[error][delete] target not found");
        res.sendStatus(404);
        return;
    }
    if (contentsList[index].password !== req.body.password) {
        console.log("[error][delete] unauthorized");
        res.sendStatus(403);
        return;
    }
    contentsList.splice(index, 1);
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Started server at localhost:3000"));

function findContents(id) {
    for (let content of contentsList) {
        if (Number(id) === content.id) {
            return content;
        }
    }
    return null;
}

function findContentsIndex(id) {
    let index = 0;
    for (; index < contentsList.length; index++) {
        if (contentsList[index].id === Number(id)) {
            return index;
        }
    }
    return -1;
}
function getContentsInit() {
    let pageSize = 10;
    let retList = [];
    let start = contentsList.length - 1;
    for (let i = start; i > start - pageSize && i >= 0; i--) {
        retList.push(contentsList[i]);
    }
    return retList;
}
function getContentsAfter(id) {
    let pageSize = 10;
    let retList = [];
    let start = findContentsIndex(id) - 1;
    for (let i = start; i > start - pageSize && i >= 0; i--) {
        retList.push(contentsList[i]);
    }
    return retList;
}
function getContentsBefore(id) {
    let retList = [];
    let start = contentsList.length - 1;
    for (let i = start; i >= findContentsIndex(id) && i >= 0; i--) {
        retList.push(contentsList[i]);
    }
    return retList;
}

