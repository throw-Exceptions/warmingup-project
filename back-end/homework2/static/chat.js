let ws;
$(document).ready(() => {
    join().then(socketSetting);
    $(".submit-text").click(sendMessage);
    $("textarea").keypress((e) => {
        if (e.charCode === 13) {
            sendMessage();
            return false;
        }
        return true;
    });
});
function join() {
    return new Promise((resolve, reject) => {
        $(".start").click((e) => {
            let username = $(".name").val();
            if (!username) {
                alert("이름을 정해주세요");
                return false;
            }
            $(".popup").removeClass("on");
            $("textarea").focus();
            resolve();
        });
    });
}
function socketSetting() {
    let username = $(".name").val();
    ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
        console.log("Connection opened");
        ws.send(JSON.stringify({
            cmd: "join",
            data: {
                username: username
            }
        }));
    }
    ws.onmessage = (e) => {
        let msgData = JSON.parse(e.data);
        switch (msgData.cmd) {
            case "join":
                console.log(`"${msgData.data.username}" has joined`);
                handleJoinMessage(msgData.data);
                break;
            case "message":
                console.log(`message arrived: ${msgData.profile}, ${msgData.message}`);
                addMessage(msgData.data);
                break;
            case "left":
                console.log(`"${msgData.data.username}" has left`);
                handleLeftMessage(msgData.data);
            default:
                console.log(`"${msgData.cmd}" is not allowed command`);
        }
    }
    ws.onclose = () => {
        console.log("Socket Disconnected");
        ws = null;
    }
}
function addMessage(msgData) {
    $(".message-display").append($(`
        <div class="message">
            <div class="profile">
                ${msgData.profile}
            </div>
            <div class="message-text">
                ${msgData.message}
            </div>
        </div>
    `));
}
function sendMessage() {
    let profile = $(".name").val();
    let message = $("textarea").val();
    if (!message) {
        return;
    }
    ws.send(JSON.stringify({
        cmd: "message",
        data: {
            profile,
            message
        }
    }));
    $("textarea").val("");
}
function handleJoinMessage(data) {
    let username = $(".name").val();
    if (data.username === username) return;
    $(".message-display").append($(`
        <div class="notice">
            <strong>${data.username}</strong>님이 입장하셨습니다.
        </div>
    `));
}
function handleLeftMessage(data) {
    let username = $(".name").val();
    if (data.username === username) return;
    $(".message-display").append($(`
        <div class="notice">
            <strong>${data.username}</strong>님이 퇴장하셨습니다.
        </div>
    `));
}
