const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

const users = [];

var app = http.createServer(function(request,response){
    const parsedUrl = url.parse(request.url);
    const pathname = parsedUrl.pathname;
    const queryString = parsedUrl.query;

    /**
     * 게임 채팅 메인화면
     * url: /
     * method: GET
     */
    if (pathname === "/"){
        let returnUrl = '/static/index.html';
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + returnUrl));
    }

    /**
     * 야구게임 채팅방 들어가기
     * url: /chat/baseball
     * method: GET
     * query: userName
     */
    if (pathname === "/chat/baseball") {
        let returnUrl = '/static/chat.html';
        let userName = String(querystring.parse(queryString).userName);
        let gameName = "baseball";
        let user = new User(userName, gameName);
        user.game = new BaseballGame();
        users.push(user);
        response.writeHead(200);
        let returnHTML = String(fs.readFileSync(__dirname + returnUrl)).replace("${username}", userName);
        response.end(returnHTML);
    }

    /**
     * 야구게임 채팅 보내기
     * url: /chat/baseball/message
     * method: POST
     * data: username, message
     */
    if (pathname === "/chat/baseball/message") {
        request.on("data", function(data) {
            let dataMap = parseData(data);
            let username = decodeURI(dataMap.username);
            let message = decodeURI(dataMap.message);
            let user = getUser(username);
            console.log(`username: ${username}, message: ${message}`);
            response.writeHead(200);
            if (user === null) {
                response.end("로그인 후 이용하세요.");
            } else {
                if (user.game.isStarted === false) {
                    if (message.includes("시작")) {
                        user.game.start();
                        response.end("게임이 시작되었습니다. 숫자 세자리를 입력해 문제를 맞춰보세요!");
                    } else {
                        response.end("\"시작\"이 포함된 메세지를 입력해주세요.");
                    }
                } else {
                    response.end(user.game.try(message));
                }
            }
        });
    }

    /**
     * css나 js 파일을 요청하면 /static 의 디렉토리에 있는 파일 반환
     */
    if (pathname.includes(".css") || pathname.includes(".js")) {
        let splitPathName = pathname.split("/");
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + "/static/" + splitPathName[splitPathName.length - 1]));
    }

    /**
     * images를 경로로 가지는 요청은 /static/images 안에 있는 동일 파일명을 가진 파일 반환
     */
    if (pathname.includes("images")) {
        let splitPathName = pathname.split("/");
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + "/static/images/" + splitPathName[splitPathName.length - 1]));
    }
});
app.listen(3000);

class User {
    constructor(userName, gameObject) {
        this.name = userName;
        this.game = gameObject;
    }
}

class BaseballGame {
    constructor() {
        this.answer = "";
        this.isStarted = false;
    }

    start(newAnswer) {
        this.answer = newAnswer || "";
        this.isStarted = true;
        if (!this.answer) {
            while (this.answer.length < 3) {
                let randomNum = String(Math.round(Math.random() * 10));
                if (!this.answer.includes(randomNum)) {
                    this.answer += randomNum;
                }
            }
        }
        console.log(`게임이 시작되었습니다. 생성 정답: ${this.answer}`);
    }

    try(tryNumber) {
        if (tryNumber.length != 3) {
            return "잘못된 입력입니다. 숫자 3개를 붙여서 입력해주세요.";
        }
        if (isNaN(tryNumber)) {
            return "숫자만 입력해주세요.";
        }
        let strike = 0;
        let ball = 0;
        for (let i in tryNumber) {
            if (tryNumber[i] === this.answer[i]) {
                strike += 1;
            } else if (this.answer.includes(tryNumber[i])) {
                ball += 1;
            }
        }
        if (strike === 3) {
            this.isStarted = false;
            this.answer = "";
            return "정답입니다.<br> \"시작\"을 입력해 새 게임을 시작하세요.";
        } else if (strike === 0 && ball === 0) {
            return "아웃입니다.";
        } else {
            return `${strike} 스트라이크, ${ball} 볼`;
        }
    }
}

function parseData(data) {
    let retObject = {};
    let dataList = String(data).split("&");
    for (let i in dataList) {
        let member = dataList[i].split("=");
        retObject[`${String(member[0])}`] = String(member[1]);
    }
    return retObject;
}

function getUser(username) {
    for (let i in users) {
        if (users[i].name === username) {
            return users[i];
        }
    }
    return null;
}
