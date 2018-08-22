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
export declare const getBlogPostList: (doc: ParentNode) => IBlogPostListModel[];
export declare const getBlogTitle: () => string;
export declare const getSubTitle: () => string;
export declare const getBlogStats: () => IBlogStats;
export declare const getPostDetail: (doc: ParentNode) => void;
export declare class CnblogsBridge {
    data: {
        posts: IBlogPostListModel[];
        stats: IBlogStats;
        title: string;
        subTitle: string;
    };
    constructor();
    private getDataAsync;
    getUserProfile(): Promise<IUserProfile | null>;
    getRecentPosts(): Promise<IBlogPostItem[] | null>;
    getTags(): Promise<IItemWithCount[] | null>;
    getPostCategories(): Promise<IItemWithCount[] | null>;
    getPostArchives(): Promise<IItemWithCount[] | null>;
    getArticleCategories(): Promise<IItemWithCount[] | null>;
    getArticleArchives(): Promise<IItemWithCount[] | null>;
    getImageCategories(): Promise<IItemWithCount[] | null>;
    getRecentComments(): Promise<IRecentComment[] | null>;
    getTopViewedPosts(): Promise<IItemWithCount[] | null>;
    getTopCommentPosts(): Promise<IItemWithCount[] | null>;
    getTopDiggPosts(): Promise<IItemWithCount[] | null>;
    readonly currentPage: number;
    readonly blogApp: string;
    getPostListAt(page: number): Promise<IBlogPostListModel[]>;
    getPostDetail(url: string): void;
}
