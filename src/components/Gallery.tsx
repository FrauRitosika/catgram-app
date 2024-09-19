import React, { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import Filter from "./Filter";
import './Gallery.css';
import { PostContent } from '../app-data/types';


interface GalleryData {
    className?: string;
    loadGallery: () => Promise<PostContent[]>;
    cardClick: (postId: string, post?: PostContent) => void;
    children: React.ReactNode;
    changePost: (post: PostContent) => void;
}

const Gallery: React.FC<GalleryData> = ({ className = '', loadGallery, cardClick, children, changePost }) => {


    const [filter, setFilter] = useState<string>('NONE');
    const [isLoading, setLoading] = useState<boolean>(true);
    const [postList, setPostList] = useState<Array<PostContent>>([]);
    const [likedPostList, setLikedPostList] = useState<Array<PostContent>>([]);
    const [isEmpty, setEmpty] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        const data = await loadGallery();
        setPostList(data);
        setLikedPostList(chooseLikedPostList(data));
        setLoading(false);
        setEmpty(data.length === 0);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    function chooseLikedPostList(gallery: Array<PostContent>): Array<PostContent> {
        return gallery.filter((post: PostContent) => post.isLiked === true);
    }

    function onDelete(post: PostContent) {
        changePost(post);
        const newList: Array<PostContent> = post.isDeleted ? postList.filter((item: PostContent) => item.id !== post.id)
            : [...postList, post];
        setPostList(newList);
        setLikedPostList(chooseLikedPostList(newList));
        setEmpty(newList.length === 0);
    }

    function onLike(post: PostContent) {
        changePost(post);
        if (post.isLiked) {
            setLikedPostList([...likedPostList, post]);
        } else {
            setLikedPostList(likedPostList.filter((item: PostContent) => item.id !== post.id));
        }

    }

    function getFiltredGallery(): Array<PostContent> {
        switch (filter) {
            case 'LIKED': return likedPostList;
            default: return postList;
        }
    }

    function changeFilter(filter: string) {
        setFilter(filter);
    }

    function contentClick(postId: string, post: PostContent) {
        cardClick(postId, post);
    }

    return (
        <div className={`${className} container`}>
            {children}
            <div className="gallery">
                {(isLoading) && (<p>Loading...</p>)}
                {(!isLoading) && (!isEmpty) &&
                    (<>
                        <div className="gallery__filter-bar">
                            <Filter onClick={changeFilter} filterName='LIKED' >LIKED</Filter>
                        </div>
                        <ul className="gallery__card-list">
                            {getFiltredGallery().map(post => (
                                <li key={post.id} className="gallery__card-item">
                                    <Card post={post} contentClick={contentClick} onDelete={onDelete} onLike={onLike} />
                                </li>
                            ))}
                        </ul>
                    </>
                    )}
                {(!isLoading) && (isEmpty) && (<p>Couldn't find a picture to view {':('}</p>)}
            </div>
        </div>
    );
}

export default Gallery;