let Quiz = {
    contents: {
        "quiz_title" : "Honey's Quiz",
        "author" : "Yeonghan Kwon",
        "e_mail" : "ehdtls901@gmail.com",
        "phone_number" : "010-7273-2523",
        "quiz_list" : [
            {
                "number" : 1,
                "question" : "나의 이름은?",
                "choice_list" : [
                    "권영한",
                    "권영환",
                    "김용환",
                    "김영한"
                ],
                "answer" : "권영한",
            },
            {
                "number" : 2,
                "question" : "나의 키는?",
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
                "question" : "내가 제일 좋아하는 음식은?",
                "choice_list" : [
                    "삼겹살",
                    "치킨",
                    "피자",
                    "탕수육",
                    "라면"
                ],
                "answer" : "치킨"
            },
            {
                "number" : 4,
                "question" : "나의 생일은?",
                "choice_list" : [
                    "1월 15일",
                    "1월 18일",
                    "1월 28일",
                    "2월 18일",
                    "2월 28일"
                ],
                "answer" : "2월 18일"
            },
            {
                "number" : 5,
                "question" : "나의 외가 친척은 몇명?",
                "choice_list" : [
                    "23명",
                    "31명",
                    "39명",
                    "47명",
                    "55명"
                ],
                "answer" : "55명"
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
        return Math.floor(correctNumber / this.contents.quiz_list.length * 100);
    },

    getResultCode: function() {

    }
}