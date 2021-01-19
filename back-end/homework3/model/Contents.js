class Contents {
    constructor(title, content, author, password, viewCnt, id) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.password = password;
        this.viewCnt = viewCnt;
        this.id = id;
    }

    getJson() {
        return {
            "title": this.title,
            "content": this.content,
            "author": this.author,
            "password": this.password,
            "viewCnt": this.viewCnt,
            "id": this.id
        }
    }

    view() {
        this.viewCnt += 1;
    }

    static serialize(objects) {
        let serializedObjects = [];
        for (let object of objects) {
            serializedObjects.push(new Contents(
                object.title,
                object.content,
                object.author,
                object.password,
                object.view_cnt,
                object.id
            ));
        }
        return serializedObjects;
    }
}
module.exports = Contents;
