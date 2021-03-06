import $ from 'jquery';
import chunck from 'lodash.chunk';

export interface IBlogStats {
    postCnt: number;
    articleCnt: number;
    commentCnt: number;
}

export interface IBlogPostListModel {
    title: string;
    url: string;
    description: string;
    postTime: Date;
    readCnt: number;
    commentCnt: number;
    author: string;
    id: string;
}

export interface IBlogPostDetailModel {
    title: string;
    content: string;
    postTime: Date;
    readCnt: number;
    commentCnt: number;
    diggCnt: number;
    buryCnt: number;
    id: string;
}

export interface ICommentModel {
    id: string;
    reviewerName: string;
    reviewerId: string;
    content: string;
    diggCnt: number;
    buryCnt: number;
    time: Date;
}

export interface IUserProfile {
    name: string;
    age: string;
    fansCnt: number;
    followingCnt: number;
}

export interface IBlogPostItem {
    title: string;
    url: string;
}

export interface IItemWithCount extends IBlogPostItem {
    cnt: number;
}

export interface IRecentComment {
    post: IBlogPostItem;
    content: string;
    user: string;
}


export const getBlogPostList = (doc: ParentNode) => {
    const postEls: HTMLDivElement[] = Array.from(doc.querySelectorAll('.forFlow .postTitle,.postCon,.postDesc'));
    const posts = processPostEl(postEls);
    return posts;
}

export const getBlogTitle = () => {
    const blogTitleEl = document.querySelector('#Header1_HeaderTitle') as HTMLHeadingElement;
    localStorage.setItem('app-blog-title', blogTitleEl.innerText);
    return blogTitleEl.innerText;
}

export const getSubTitle = () => {
    const subtitle = $('#blogTitle h2')[0].innerText;
    localStorage.setItem('app-subtitle', subtitle);
    return subtitle;
}

export const getBlogStats = (): IBlogStats => {
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

export const getPostDetail = (doc: ParentNode) => {
    const content = doc.querySelector('#cnblogs_post_body')!.innerHTML;
    const titleEl = doc.querySelector('#cb_post_title_url')! as HTMLAnchorElement;
    const title = titleEl.innerText.trim();
    const timeEl = doc.querySelector('#post-date')! as HTMLSpanElement;
    const postTime = new Date(timeEl.innerText);
    const getCntById = (id: string) => {
        const el = doc.querySelector(id)! as HTMLSpanElement;
        return parseInt(el.innerText, 10);
    }
    const readCnt = getCntById('#post_view_count');
    const commentCnt = getCntById('#post_comment_count');
    const diggCnt = getCntById('#digg_count');
    const buryCnt = getCntById('#bury_count');
}

const getCnt = (str: string) => {
    const getNum = /\d+/;
    const res = getNum.exec(str);
    if (res !== null) {
        return parseInt(res[0], 10);
    }
    return 0;
}

const processPostEl = (postEls: HTMLDivElement[]): IBlogPostListModel[] => {
    const result = [];
    for (let index = 0; index < postEls.length; index += 3) {
        const titleEl = postEls[index];
        const title = titleEl.innerText.trim();
        const url = titleEl.querySelector('a')!.href;
        const idStr = url.replace('.html', '');
        const id = idStr.substring(idStr.lastIndexOf('/') + 1);
        const conEl = postEls[index + 1];
        const description = conEl.innerText.substr(0, conEl.innerText.length - 4);
        const misc = postEls[index + 2].innerText.split(' ');
        //  [ "posted", "@", "2018-07-30", "09:42", "不如隐茶去", "阅读(775)", "评论(4)", "编辑" ]
        const date = new Date(misc[2] + ' ' + misc[3]);
        const author = misc[4];
        const readCnt = getCnt(misc[5]);
        const commentCnt = getCnt(misc[6]);
        const post = {
            title, url, description, postTime: date, readCnt, commentCnt, author, id
        };
        result.push(post);

    }
    return result;
}

const processProfileEl = (el: HTMLElement) => {
    const reg = /：(.+)$/;
    const data = el.innerText.split('\n')
        .map(str => {
            const res = reg.exec(str);
            return res ? res[1] : ''
        });
    const name = data[0];
    const age = data[1];
    const fansCnt = parseInt(data[2], 10);
    const followingCnt = parseInt(data[2], 10);
    const result: IUserProfile = {
        name, age, fansCnt, followingCnt
    };
    return result;
}

const processRecentPostsEl = (el: HTMLElement) => {
    const reg = /^\d+\. (.+)$/;
    const result = $('a', el).toArray().map(x => {
        return {
            title: reg.exec(x.innerText)![1],
            url: (x as HTMLAnchorElement).href
        } as IBlogPostItem;
    });
    return result;
}

const processItemsWithCntEl = (el: HTMLElement) => {
    const reg = /^(.+?)(\((\d+)\))?$/;
    const tags = $('li', el).toArray().map(li => {
        const data = reg.exec(li.innerText)!;
        // [ "121 323(23)", "121 323", "(23)", "23" ]
        const title = data[1].trim();
        const cnt = parseInt(data[3] || '0', 10);
        const url = li.querySelector('a')!.href;
        return {
            title, cnt, url
        } as IItemWithCount;
    });
    return tags;
}

const processItemsWithCntOrderEl = (el: HTMLElement) => {
    const reg = /^(?:\d+\. )(.+?)(?:\((\d+)\))?$/;
    // [ "4. 后端学 Angular 2 —— 组件间通信(2811)", "后端学 Angular 2 —— 组件间通信", "2811" ]
    const result = $('li', el).toArray().map(li => {
        const text = li.innerText;
        const data = reg.exec(text)!;
        const title = data[1];
        const cnt = parseInt(data[2], 10);
        const url = li.querySelector('a')!.href;
        return { title, cnt, url } as IItemWithCount;
    });
    return result;
}

const processRecentCommentsEl = (el: HTMLElement) => {
    const processGroup = (g: HTMLElement[]) => {
        const titleEl = g[0];
        const titleReg = /^\d+\. (.+)$/;
        const title = titleReg.exec(titleEl.innerText)![1];
        const urlAnchor = titleEl.querySelector('a')!;
        const url = urlAnchor.href;
        const bodyEl = g[1];
        const content = bodyEl.innerText;
        const userEl = g[2];
        const user = userEl.innerText.substr(2, userEl.innerText.length - 2);
        const post: IBlogPostItem = {
            title, url
        };
        const comment: IRecentComment = {
            post, content, user
        }
        return comment;
    }
    const result = chunck($('li', el), 3).map(processGroup);
    return result;
}


const getDataContainerAsync = (selector: string) => {
    return new Promise<HTMLElement>((resolve, reject) => {
        let cnt = 0;
        let time = 50;
        let handle: number;
        const handler = () => {
            clearInterval(handle);
            const el = $(selector);
            if (el && el.children().length > 0) {
                resolve(el[0]);
            } else {
                if (cnt > 10) {
                    reject('Timeout');
                } else {
                    cnt++;
                    time += 50;
                    handle = setInterval(handler, time);
                }
            }
        };
        handle = setInterval(handler, time);
    })
}

function getParameterByName(name: string, url: string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export class CnblogsBridge {
    data!: {
        posts: IBlogPostListModel[];
        stats: IBlogStats;
        title: string;
        subTitle: string;
    };
    constructor() {
        const posts = getBlogPostList(document);
        const stats = getBlogStats();
        const title = getBlogTitle();
        const subTitle = getSubTitle();
        this.data = {
            posts, stats, title, subTitle
        };
    }

    private getDataAsync<T>(key: string, selector: string,
        processor: (el: HTMLElement) => T): Promise<T | null> {
        const stored = localStorage.getItem(key);
        if (stored) {
            return Promise.resolve(JSON.parse(stored) as T);
        }
        return getDataContainerAsync(selector)
            .then(el => {
                const res = processor(el as HTMLDivElement);
                localStorage.setItem(key, JSON.stringify(res));
                return res;
            })
            .catch(() => {
                return null;
            });
    }

    getUserProfile() {
        return this.getDataAsync('app-profile', '#profile_block', processProfileEl);
    }

    getRecentPosts() {
        return this.getDataAsync('app-recent-posts', '.catListEssay ul', processRecentPostsEl);
    }

    getTags() {
        return this.getDataAsync('app-tags', '.catListTag ul', processItemsWithCntEl);
    }

    getPostCategories() {
        return this.getDataAsync('app-post-categories', '#sidebar_postcategory ul', processItemsWithCntEl);
    }

    getPostArchives() {
        return this.getDataAsync('app-post-archives', '#sidebar_postarchive ul', processItemsWithCntEl);
    }

    getArticleCategories() {
        return this.getDataAsync('app-article-categories', '#sidebar_articlecategory ul', processItemsWithCntEl);
    }

    getArticleArchives() {
        return this.getDataAsync('app-article-archives', '#sidebar_articlearchive ul', processItemsWithCntEl);
    }

    getImageCategories() {
        return this.getDataAsync('app-image-categories', '#sidebar_imagecategory ul', processItemsWithCntEl);
    }

    getRecentComments() {
        return this.getDataAsync('app-recent-comments', '#RecentCommentsBlock ul', processRecentCommentsEl);
    }

    getTopViewedPosts() {
        return this.getDataAsync('app-top-viewed-posts', '#TopViewPostsBlock ul', processItemsWithCntOrderEl);
    }

    getTopCommentPosts() {
        return this.getDataAsync('app-top-comment-posts', '#TopFeedbackPostsBlock ul', processItemsWithCntOrderEl);
    }

    getTopDiggPosts() {
        return this.getDataAsync('app-top-digg-posts', '#TopDiggPostsBlock ul', processItemsWithCntOrderEl);
    }

    get currentPage() {
        const param = getParameterByName('page', window.location.href) || '1';
        return parseInt(param, 10);
    }

    get blogApp() {
        return (window as any)['currentBlogApp'] as string;
    }

    getPostListAt(page: number) {
        const baseUrl = `//www.cnblogs.com/${this.blogApp}/?page=${page}`;
        const result =
            fetch(baseUrl, {
                method: 'GET',
                credentials: 'include'
            })
                .then(resp => resp.text())
                .then(txt => {
                    const temp = document.createElement('template');
                    temp.innerHTML = txt;
                    return getBlogPostList(temp.content);
                });
        return result;
    }

    getPostDetail(url: string) {

    }

}

(window as any)['CnblogsBridge'] = CnblogsBridge;
