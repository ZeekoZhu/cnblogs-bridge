const getBlogPostList = () => {
    const postEls: HTMLDivElement[] = Array.from(document.querySelectorAll('.forFlow .postTitle,.postCon,.postDesc'));
    const posts = processPostEl(postEls);
    localStorage.setItem('app-posts', JSON.stringify(posts));
    return posts;
}

const getBlogTitle = () => {
    const blogTitleEl = document.querySelector('#Header1_HeaderTitle') as HTMLHeadingElement;
    localStorage.setItem('app-blog-title', blogTitleEl.innerText);
    return blogTitleEl.innerText;
}

const getBlogStats = (): IBlogStats => {
    const statsData = Array.from(document.querySelectorAll('#blog_stats span') as NodeListOf<HTMLSpanElement>)
        .map(span => span.innerText.split(' ')[2])
        .map(s => parseInt(s, 10));
    const stats = {
        postCnt: statsData[0],
        articleCnt: statsData[1],
        commentCnt: statsData[2]
    };
    localStorage.setItem('app-stats', JSON.stringify(stats));
    return stats;
}



interface IBlogStats {
    postCnt: number;
    articleCnt: number;
    commentCnt: number;
}

interface IBlogPost {
    title: string;
    url: string;
    description: string;
    postTime: Date;
    readCnt: number;
    commentCnt: number;
    author: string;
}

const getCnt = (str: string) => {
    const getNum = /\d+/;
    const res = getNum.exec(str);
    if (res !== null) {
        return parseInt(res[0], 10);
    }
    return 0;
}

const processPostEl = (postEls: HTMLDivElement[]): IBlogPost[] => {
    const result = [];
    for (let index = 0; index < postEls.length; index += 3) {
        const titleEl = postEls[index];
        const title = titleEl.innerText;
        const url = titleEl.querySelector('a')!.href;
        const conEl = postEls[index + 1];
        const description = conEl.innerText.substr(0, conEl.innerText.length - 4);
        const misc = postEls[index + 2].innerText.split(' ');
        //  [ "posted", "@", "2018-07-30", "09:42", "不如隐茶去", "阅读(775)", "评论(4)", "编辑" ]
        const date = new Date(misc[2] + ' ' + misc[3]);
        const author = misc[4];
        const readCnt = getCnt(misc[5]);
        const commentCnt = getCnt(misc[6]);
        const post = {
            title, url, description, postTime: date, readCnt, commentCnt, author
        };
        result.push(post);

    }
    return result;
}

document.addEventListener('DOMContentLoaded', () => {
    getBlogPostList();
    getBlogStats();
    getBlogTitle();
});
