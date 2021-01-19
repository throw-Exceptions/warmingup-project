const mysql = require('sync-mysql');

class ContentRepository {

    static connection = new mysql({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "ara"
    });

    constructor() {
    }

    insert(content) {
        let queryStatement = `INSERT INTO hw3_contents (title, content, author, password) 
                    VALUES ('${content.title}', '${content.content}', '${content.author}', '${content.password}')`;
        return this._booleanQuery(queryStatement);
    }

    selectLatest10() {
        let queryStatement = `SELECT * FROM hw3_contents ORDER BY id DESC LIMIT 10`;
        return this._listQuery(queryStatement);
    }

    selectAfter(id) {
        let queryStatement = `SELECT * FROM hw3_contents WHERE id < ${id} ORDER BY id DESC LIMIT 10`
        return this._listQuery(queryStatement);
    }

    selectBefore(id) {
        let queryStatement = `SELECT * FROM hw3_contents WHERE id >= ${id} ORDER BY id DESC`
        return this._listQuery(queryStatement);
    }

    selectBy(id) {
        let queryStatement = `SELECT * FROM hw3_contents WHERE id = ${id}`;
        return this._oneQuery(queryStatement);
    }

    updateBy(content, id) {
        let queryStatement = `UPDATE hw3_contents SET
                                title = '${content.title}',
                                content = '${content.content}',
                                author = '${content.author}' WHERE id = ${id}`;
        return this._booleanQuery(queryStatement);
    }

    updateViewCnt(id) {
        let queryStatement = `UPDATE hw3_contents SET view_cnt = view_cnt + 1 WHERE id = ${id}`;
        return this._booleanQuery(queryStatement);
    }

    deleteBy(id) {
        let queryStatement = `DELETE FROM hw3_contents WHERE id = ${id}`;
        return this._booleanQuery(queryStatement);
    }

    _oneQuery(queryStatement) {
        let result;
        try {
            result = ContentRepository.connection.query(queryStatement)[0];
        } catch (e) {
            console.log(e);
        }
        return result;
    }

    _listQuery(queryStatement) {
        let resultList;
        try {
            resultList = ContentRepository.connection.query(queryStatement);
        } catch (e) {
            console.log(e);
            resultList = [];
        }
        return resultList;
    }

    _booleanQuery(queryStatement) {
        let result;
        try {
            ContentRepository.connection.query(queryStatement);
            result = true;
        } catch (e) {
            console.log(e);
            result = false;
        }
        return result;
    }
}
module.exports = ContentRepository;
