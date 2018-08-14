"use strict";
var getBlogPostList = function () {
    var postEls = Array.from(document.querySelectorAll('.forFlow .postTitle,.postCon,.postDesc'));
    var posts = processPostEl(postEls);
    localStorage.setItem('app-posts', JSON.stringify(posts));
    return posts;
};
var getBlogStats = function () {
    var statsData = Array.from(document.querySelectorAll('#blog_stats span'))
        .map(function (span) { return span.innerText.split(' ')[2]; })
        .map(function (s) { return parseInt(s, 10); });
    var stats = {
        postCnt: statsData[0],
        articleCnt: statsData[1],
        commentCnt: statsData[2]
    };
    localStorage.setItem('app-stats', JSON.stringify(stats));
    return stats;
};
var getCnt = function (str) {
    var getNum = /\d+/;
    var res = getNum.exec(str);
    if (res !== null) {
        return parseInt(res[0], 10);
    }
    return 0;
};
var processPostEl = function (postEls) {
    var result = [];
    for (var index = 0; index < postEls.length; index += 3) {
        var titleEl = postEls[index];
        var title = titleEl.innerText;
        var url = titleEl.querySelector('a').href;
        var conEl = postEls[index + 1];
        var description = conEl.innerText.substr(0, conEl.innerText.length - 4);
        var misc = postEls[index + 2].innerText.split(' ');
        var date = new Date(misc[2] + ' ' + misc[3]);
        var author = misc[4];
        var readCnt = getCnt(misc[5]);
        var commentCnt = getCnt(misc[6]);
        var post = {
            title: title, url: url, description: description, postTime: date, readCnt: readCnt, commentCnt: commentCnt, author: author
        };
        result.push(post);
    }
    return result;
};
