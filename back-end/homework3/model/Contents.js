class Contents {
    static idIndex = 0;
    constructor(title, content, author, password) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.password = password;
        this.viewCnt = 0;
        this.id = Contents.idIndex++;
    }
    getJson() {
        return {
            "title": this.title,
            "content": this.content,
            "author": this.author,
            "password": this.password,
            "viewCnt": this.viewCnt
        }
    }
    view() {
        this.viewCnt += 1;
    }
}
module.exports = Contents;
