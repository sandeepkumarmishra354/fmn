export interface IArticle {
    source: {
        id: string | null,
        name: string
    },
    author: string | null,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export interface ITopHeadline {
    status: string,
    totalResults: number,
    articles: IArticle[]
}