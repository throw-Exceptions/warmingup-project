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
    ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
        console.log("Connection opened");
    }
    ws.onmessage = (e) => {
        let msgData = JSON.parse(e.data);
        console.log(`message arrived: ${msgData.profile}, ${msgData.message}`);
        addMessage(msgData);
    }
    ws.onclose = () => {
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
        profile,
        message
    }));
    $("textarea").val("");
}
