$(document).ready(function() {
    $(".chat-text").on("input", function() {
        if ($(this).val().trim().length === 0 && $(".chat-submit").prop("disabled") === false) {
            $(".chat-submit").attr("disabled", true);
        }
        if ($(this).val().trim().length > 0 && $(".chat-submit").prop("disabled") === true) {
            $(".chat-submit").removeAttr("disabled");
        }
    });

    $(".chat-submit").on("click", function() {
        sendMessage();
    });
    $(".chat-text").keydown(function(key) {
        if (key.keyCode == 13) {
            sendMessage();
        }
    });
});

function sendMessage() {
    let userName = $(".user-name").text();
    let messageContent = $(".chat-text").val().trim();
    if (messageContent.length === 0) {
        return false;
    }
    $.ajax({
        url: "/chat/baseball/message",
        content: "application/json",
        method: "POST",
        data: {
            username: userName,
            message: messageContent
        },
        success: function(result) {
            $(".chat-text").val("");
            $(".chat-area").append($(
                `<div class="my-message d-flex justify-content-end">
                    <div class="my-message-box d-flex align-items-end flex-column">
                        <div class="my-message-content">
                            ${messageContent}
                        </div>
                    </div>
                </div>`
            ));
            $(".chat-area").append($(
                `<div class="other-message d-flex justify-content-start">
                    <div class="other-profile d-flex justify-content-center">
                        <img src="images/chatbot_image.png" class="other-profile-image">
                    </div>
                    <div class="other-message-box d-flex align-items-start flex-column">
                        <div class="other-name">
                            Baseball Warrior
                        </div>
                        <div class="other-message-content">
                            ${result}
                        </div>
                    </div>
                </div>`
            ));
            $(".chat-area").scrollTop(99999999);
            $(".chat-text").focus();
        }
    });
    $(".chat-submit").attr("disabled", true);
}