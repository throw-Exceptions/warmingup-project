(function($) {
    $(".quiz-title").text(Quiz.getTitle());
    $(".author").text(Quiz.getAuthor());
    $(".e-mail").text(Quiz.getEmail());
    $(".contact").text(Quiz.getPhoneNumber());

    let scoreIndex = location.href.indexOf("score");
    if (scoreIndex >= 0) {
        let score = Number(location.href.substring(scoreIndex + 6));
        result(score);
    } else {
        start();
    }

    function start() {
        $(".dynamic-body").empty().append(
            $("<div>").addClass("button-area").append(
                makeButton("Start", "start-button", "btn-secondary")
            )
        )
        $(".start-button").click(function() {
            $(".dynamic-body")
                .empty()
                .append($("<span>").addClass("quiz-number"))
                .append($("<span>").addClass("quiz-question"))
                .append($("<div>").addClass("choice-area"))
                .append($("<div>").addClass("button-area"));
            load(1);
        })
    }

    function makeButton(text, cls, type) {
        return button = $("<button>")
                            .addClass(cls)
                            .addClass("btn")
                            .addClass(type)
                            .attr("type", "button")
                            .text(text);
    }

    function load(curNumber) {
        let curQuiz = Quiz.getQuiz(curNumber);
        $(".quiz-number").text(curQuiz.number);
        $(".quiz-question").text(curQuiz.question);
        $(".choice-area").empty();
        for (i = 0; i < curQuiz.choice_list.length; i++) {
            let choice = curQuiz.choice_list[i];
            if (Quiz.selectedChoices[curNumber] == choice) {
                $(".choice-area").append(makeButton(choice, "choice", "btn-secondary"));
            } else {
                $(".choice-area").append(makeButton(choice, "choice", "btn-outline-secondary"));
            }
        }
        $(".choice").click(function() {
            $(".choice").removeClass("btn-secondary").addClass("btn-outline-secondary");
            $(this).removeClass("btn-outline-secondary").addClass("btn-secondary");
            Quiz.selectChoice(Number($(".quiz-number").text()), $(this).text());
        });
        $(".button-area").empty();
        $(".button-area").append(makeButton("Prev", "prev-button", "btn-secondary"));
        $(".prev-button").click(loadPrev);
        if (curNumber < Quiz.getQuizSize()) {
            $(".button-area").append(makeButton("Next", "next-button", "btn-secondary"));
            $(".next-button").click(loadNext);
        } else {
            $(".button-area").append(makeButton("Submit", "submit-button", "btn-secondary"));
            $(".submit-button").click(submit);
        }
        
    }

    function loadPrev() {
        let curNumber = Number($(".quiz-number").text());
        if (curNumber > 1) {
            load(curNumber - 1);
        }
    }

    function loadNext() {
        let curNumber = Number($(".quiz-number").text());
        if (curNumber < Quiz.getQuizSize()) {
            load(curNumber + 1);
        }
    }

    function submit() {
        let score = Quiz.submit();
        if (score < 0) {
            alert("모든 문제를 풀어주세요.");
            return;
        }
        result(score);
    }

    function result(score) {
        $(".dynamic-body")
            .empty()
            .append($("<span>").addClass("score").text(score))
            .append($("<span>").text("점"))
            .append($("<div>").addClass("button-area")
                .append(makeButton("재도전", "retry-button", "btn-outline-secondary"))
                .append(makeButton("공유하기", "share-button", "btn-outline-secondary")));
        if (score == 100) {
            $(".score").addClass("perfect");
        } else if (score >= 80) {
            $(".score").addClass("good");
        } else if (score >= 40) {
            $(".score").addClass("bad");
        } else {
            $(".score").addClass("trash");
        }
        $(".retry-button").click(function() {
            Quiz.selectedChoices = {};
            start();
        })
        $(".share-button").click(function() {
            alert("링크가 복사 되었습니다. 친구와 공유해보세요!");
        });
        let clipboard = new ClipboardJS(".share-button", {
            text: function() {
                if (!location.href.includes("score")) {
                    return location.href + "?score=" + score;
                } else {
                    return location.href;
                }
            }
        })
    }

})(jQuery);
