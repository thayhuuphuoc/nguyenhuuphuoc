type Blog = {
    tag: string;
    title: string;
    slug: string | any;
    date: string;
    mainImage?: {
        asset?: {
            url?: string;
        };
    };
    description: string;
    author_image: string;
    author?: {
        name?: string;
        image?:{
            asset?:{
                url?: string;
            }
        }
    };
    categories:[];
    publishedAt: string;
    badge: string;
    views: string;
    comment: string;
};