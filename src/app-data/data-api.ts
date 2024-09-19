import { PostContent } from './types'
import getImages from './mapping-imgur-app-data';

const getGallery = async () => {
    let posts: Array<PostContent> = [];
    const localPosts: Array<string> | null = localStorage.getItem('gallery') ? JSON.parse(localStorage.getItem('gallery')!).postIds : null;

    if (localPosts) {
        localPosts.forEach((postId: string) => {
            const post: PostContent | null = localStorage.getItem(postId) ? JSON.parse(localStorage.getItem(postId)!) : null;
            if (post && post.isDeleted === false) posts.push(post);
        });
    } else {

        await getImages().then(res => {
            posts = res;
            const gallery: Array<string> = [];
            posts.forEach((post: PostContent) => {
                const id = `post_${post.id}`
                gallery.push(id);
                localStorage.setItem(id, JSON.stringify(post));
            })
            if (gallery.length > 0) localStorage.setItem('gallery', JSON.stringify({ postIds: gallery }));

        }, err => { });
    }

    return posts;
}

const getPost = (id: string): PostContent | null => {
    id = `post_${id}`;
    const post: PostContent | null = localStorage.getItem(id) ? JSON.parse(localStorage.getItem(id)!) : null;
    return post;
}

const changePost = (post: PostContent) => {
    const id = `post_${post.id}`;
    localStorage.removeItem(id);
    localStorage.setItem(id, JSON.stringify(post));
}

export { getGallery, getPost, changePost };