let Quiz = {
    contents: {
        "quiz_title" : "Honey's Quiz",
        "author" : "Yeonghan Kwon",
        "e_mail" : "ehdtls901@gmail.com",
        "phone_number" : "010-7273-2523",
        "quiz_list" : [
            {
                "number" : 1,
                "content" : "나의 이름은?",
                "choice_list" : [
                    "김영한",
                    "권영환",
                    "김용환",
                    "권영한"
                ],
                "answer" : "권영한",
            },
            {
                "number" : 2,
                "content" : "나의 키는?",
                "choice_list" : [
                    "179",
                    "180",
                    "181",
                    "182"
                ],
                "answer" : "181"
            },
            {
                "number" : 3,
                "contents" : "내가 제일 좋아하는 음식은?",
                "choice_list" : [
                    "삼겹살",
                    "치킨",
                    "피자",
                    "탕수육",
                    "라면"
                ],
                "answer" : "치킨"
            }
        ]
    },

    selectedChoices: {},
    
    getTitle: function() {
        return this.contents.quiz_title;
    },

    getAuthor: function() {
        return this.contents.author;
    },

    getEmail: function() {
        return this.contents.e_mail;
    },

    getPhoneNumber: function() {
        return this.contents.phone_number;
    },

    getQuiz: function(number) {
        let quiz = null;
        for (i = 0; i < this.contents.quiz_list.length; i++) {
            if (this.contents.quiz_list[i].number == number) {
                quiz = this.contents.quiz_list[i];
            }
        }
        return quiz;
    },

    getQuizSize: function() {
        return this.contents.quiz_list.length;
    },

    selectChoice: function(number, selectedChoice) {
        this.selectedChoices[number] = selectedChoice;
        console.log(this.selectedChoices);
    },

    submit: function() {
        let correctNumber = 0;
        for (i = 0; i < this.contents.quiz_list.length; i++) {
            let quiz = this.contents.quiz_list[i];
            let number = quiz.number;
            if (this.selectedChoices[number] == undefined) {
                return -1;
            }
            if (this.selectedChoices[number] == quiz.answer) {
                correctNumber += 1;
            }
        }
        return (correctNumber / this.contents.quiz_list.length * 100);
    }
}