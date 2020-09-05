(function($) {
    $(".quiz-title").text(Quiz.getTitle());
    $(".author").text(Quiz.getAuthor());
    $(".e-mail").text(Quiz.getEmail());
    $(".contact").text(Quiz.getPhoneNumber());

    start();

    function start() {
        $(".dynamic-body").empty().append(
            $("<div>").addClass("button-area").append(
                makeButton("Start", "start-button", "btn-secondary")
            )
        )
        $(".start-button").click(function() {
            $(".dynamic-body")
                .empty()
                .append($("<span>").addClass("question-number"))
                .append($("<span>").addClass("question-content"))
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
        $(".question-number").text(curQuiz["number"]);
        $(".question-content").text(curQuiz["content"]);
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
            Quiz.selectChoice(Number($(".question-number").text()), $(this).text());
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
        let curNumber = Number($(".question-number").text());
        if (curNumber > 1) {
            load(curNumber - 1);
        }
    }

    function loadNext() {
        let curNumber = Number($(".question-number").text());
        if (curNumber < Quiz.getQuizSize()) {
            load(curNumber + 1);
        }
    }

    function submit() {
        alert("Score: " + Quiz.submit());
    }

})(jQuery);
