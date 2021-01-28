$(document).ready(function() {
    let contentsAdmin = new ContentsAdmin();
    $(".title").click(function() {
        location.reload();
    })
    $(".newButton").click(function() {
        if ($(".newContentForm").attr("hidden")) {
            $(".newContentForm").removeAttr("hidden");
        } else {
            $(".newContentForm").attr("hidden", true);
        }
    });
    $(".newContentSubmit").click(function() {
        let title = $(".titleInput").val();
        let content = $(".contentInput").val();
        let author = $(".authorInput").val();
        let password = $(".passwordInput").val();
        let contents = new Contents(title, content, author, password);
        if (contents.validCheck()) {
            contentsAdmin.register(contents);
            $(".newContentForm").attr("hidden", true);
        }
    });
    $(".modifyContentSubmit").click(function() {
        let id = $(".modifyContentId").val();
        let title = $(".modifyTitleInput").val();
        let content = $(".modifyContentsInput").val();
        let author = $(".modifyAuthorInput").val();
        let password = $(".modifyPasswordInput").val();
        let contents = new Contents(title, content, author, password);
        if (contents.validCheck()) {
            contentsAdmin.update(id, contents);
        }
    });
    $(".cancelContentSubmit").click(function() {
        $(".modifyLayer").attr("style", "display: none;");
    });
    $(".moreContentsButton").click(function() {
        contentsAdmin.load();
    });
    $(".searchButton").click(function() {
        let option = $("#searchType").val();
        let input = $(".searchInput").val();
        if (!option || !input) {
            return;
        }
        contentsAdmin.search(option, input);
    });
});

class ContentsAdmin {
    constructor() {
        this.lastId = 0;
        this.init();
    }
    init() {
        let contentsList = this._getContentsInit();
        if (contentsList.length === 0) {
            alert("표시할 게시물이 없습니다.");
            return;
        }
        for (let contents of contentsList) {
            if (!contents) break;
            this._loadPage(contents);
        }
        this._addContentsHandler();
        this.lastId = contentsList[contentsList.length - 1].id;
    }
    register(contents) {
        let contentsAdmin = this;
        $.ajax({
            url: "/contents",
            method: "POST",
            dataType: "json",
            data: contents,
            success: function(data) {
                let contents = data;
                console.log(contents);
                alert("새 글 등록 성공!");
                $("form input, form textarea").val("");
                contentsAdmin.reload();
            },
            error: function(res, err, msg) {
                console.log(res);
                console.log(err);
                console.log(msg);
                alert("새 글을 등록하는데 실패했습니다.\n실패가 반복되면 관리자에게 문의해주세요");
            }
        });
    }
    remove(id, password) {
        $.ajax({
            url: `/contents/${id}`,
            method: "DELETE",
            data: {
                password
            },
            success: function() {
                alert("삭제 성공!");
            },
            error: function(res, err, msg) {
                console.log(res);
                console.log(err);
                console.log(msg);
                if (res.status === 403) {
                    alert("비밀번호가 틀립니다.");
                } else {
                    alert("글을 삭제하는데 실패했습니다.\n실패가 반복되면 관리자에게 문의해주세요");
                }
            }
        });
    }
    update(id, contents) {
        console.log(contents);
        $.ajax({
            url: `/contents/${id}`,
            method: "PUT",
            data: contents,
            success: function() {
                alert("게시글 수정 성공!");
                $(".modifyContentForm input, .modifyContentForm textarea").val("");
                $(".modifyLayer").attr("style", "display: none;");
                $(`.contents${id} .contentTitle`).text(contents.title);
                $(`.contents${id} .contentAuthor`).text(contents.author);
                $(`.contents${id} .contentViewCnt`).text(contents.viewCnt);
                $(`.contents${id} .contents`).text(contents.content);
            },
            error: function(res, err, msg) {
                console.log(res);
                console.log(err);
                console.log(msg);
                if (res.status === 403) {
                    alert("비밀번호가 틀립니다.");
                } else {
                    alert("글을 수정하는데 실패했습니다.\n실패가 반복되면 관리자에게 문의해주세요");
                }
            }
        });
    }
    load() {
        let contentsList = this._getContentsAfter(this.lastId);
        if (contentsList.length === 0) {
            alert("마지막 페이지 입니다.");
            return;
        }
        for (let contents of contentsList) {
            if (!contents) break;
            this._loadPage(contents);
        }
        this._addContentsHandler();
        this.lastId = contentsList[contentsList.length - 1].id;
    }
    reload() {
        let contentsList = this._getContentsBefore(this.lastId);
        if (contentsList.length === 0) {
            alert("마지막 페이지 입니다.");
            return;
        }
        $(".listBody").empty();
        for (let contents of contentsList) {
            if (!contents) break;
            this._loadPage(contents);
        }
        this._addContentsHandler();
    }
    search(option, input) {
        let optionURI = "";
        if (option === "searchWithTitle") {
            optionURI = "title";
        } else if (option === "searchWithAuthor") {
            optionURI = "author";
        } else if (option === "searchWithNum") {
            optionURI = "id";
        }
        let loadPage = this._loadPage;
        $.ajax({
            url: `/contents/${optionURI}?input=${input}`,
            method: "GET",
            dataType: "json",
        }).done(function(data) {
            let contentsList = data;
            $(".listBody").empty();
            for (let contents of contentsList) {
                loadPage(contents);
            }
            if (contentsList.length === 0) {
                $(".listBody").append($(`<tr>
                    <td colspan="4" class="contentTitle">해당하는 검색 결과가 없습니다ㅠ_ㅠ</td>
                </tr>`));
            }
        });
    }
    _getContentsInit() {
        let contentsList = [];
        $.ajax({
            url: `/contents/init`,
            method: "GET",
            dataType: "json",
            async: false,
            success: function(data) {
                contentsList = data;
            }
        });
        return contentsList;
    }
    _getContentsAfter(lastId) {
        let contentsList = [];
        $.ajax({
            url: `/contents/after/${lastId}`,
            method: "GET",
            dataType: "json",
            async: false,
            success: function(data) {
                contentsList = data;
            }
        });
        return contentsList;
    }
    _getContentsBefore(lastId) {
        let contentsList = [];
        $.ajax({
            url: `/contents/before/${lastId}`,
            method: "GET",
            dataType: "json",
            async: false,
            success: function(data) {
                contentsList = data;
            }
        });
        return contentsList;
    }
    _loadPage(contents) {
        $(".listBody").append($(`
                <tr class="contents${contents.id}">
                    <td class="contentNum">${contents.id}</td>
                    <td class="contentTitle">${contents.title}</td>
                    <td class="contentAuthor">${contents.author}</td>
                    <td class="contentViewCnt">${contents.viewCnt}</td>
                </tr>
                <tr class="contents${contents.id}" hidden>
                    <td colspan="4">
                        <div class="contents">${contents.content}</div>
                        <div class="remove">
                            <input type="password" class="removePassword">
                            <div class="modifyButton" id="${contents.id}">수정</div>
                            <div class="removeButton" id="${contents.id}">삭제</div>
                        </div>
                    </td>
                </tr>
            `));
    }
    _addContentsHandler() {
        let contentsAdmin = this;
        $(".contentTitle").unbind("click");
        $(".contentTitle").click(function() {
            let id = $(this).prev().text();
            let $contentTr = $(this).parent().next();
            if ($contentTr.attr("hidden")) {
                $contentTr.removeAttr("hidden");
                $.ajax({
                    url: `/contents/${id}/view`,
                    method: "PUT"
                });
            } else {
                $contentTr.attr("hidden", true);
            }
        });
        $(".modifyButton").unbind("click");
        $(".modifyButton").click(function() {
            let id = $(this).attr("id");
            let password = $(this).prev().val();
            if (contentsAdmin._checkPassword(id, password) === true) {
                $(".modifyLayer").attr("style", "display: block;");
                $(".modifyContentId").val(id);
                let title = $(`.contents${id} .contentTitle`).text();
                let contents = $(`.contents${id} .contents`).text();
                let author = $(`.contents${id} .contentAuthor`).text();
                console.log(title);
                console.log(contents);
                console.log(author);
                $(".modifyTitleInput").val(title);
                $(".modifyContentsInput").val(contents);
                $(".modifyAuthorInput").val(author);
                $(".modifyPasswordInput").val("");
            }
        });
        $(".removeButton").unbind("click");
        $(".removeButton").click(function() {
            let id = $(this).attr("id");
            let password = $(this).prev().prev().val();
            contentsAdmin.remove(id, password);
            contentsAdmin.reload();
        });
    }
    _checkPassword(id, password) {
        return true;
    }
}

class Contents {
    constructor(title, content, author, password) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.password = password;
        this.id = "-1";
    }
    getJson() {
        return {
            "title": this.title,
            "content": this.content,
            "author": this.author,
            "password": this.password,
            "id": this.id
        }
    }
    validCheck() {
        if (this.title.length === 0) {
            alert("제목은 필수 입력 값 입니다.");
            return false;
        }
        if (this.content.length === 0) {
            alert("내용은 1자 이상 입력해주세요");
            return false;
        }
        if (this.author.length < 2) {
            alert("글쓴이는 2자 이상 입력해주세요");
            return false;
        }
        if (this.password.length < 4) {
            alert("비밀번호는 4자 이상 입력해주세요");
            return false;
        }
        return true;
    }
}

