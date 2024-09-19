import React, { useEffect } from "react";
import ImageCard from "./ImageCard";
import './ImagePage.css';
import { PostContent } from "../app-data/types";
import { useParams } from "react-router-dom";

interface ImagePageInfo {
    className?: string;
    post?: PostContent | null;
    getPost: (id: string) => PostContent | null;
    back: () => void;
    changePost: (post: PostContent) => void;
}

type Params = {
    postId?: string;
  }

const ImagePage: React.FC<ImagePageInfo> = ({ className = '', post, getPost, back, changePost }) => {
    const { postId } = useParams<Params>();
    useEffect(() => { window.scrollTo(0, 0) });
    

    post = post ?? postId ? getPost(postId!) : null;

    function onLike(post: PostContent) {
        changePost(post);
    }

    function onDelete(post: PostContent) {
        changePost(post);
        if(post.isDeleted) back();
    }

    return (
        <div className={`${className} image-page`}>
            <div className="image-page__link-home back-link" onClick={back}>
                <div className="back-link__icon" />
                <p className="back-link__text">Gallery</p>
            </div>
            {(!!post) && (<ImageCard post={post} onLike={onLike} onDelete={onDelete}/>)}
            {(!post) && (<p>Изображение не найдено</p>)}
        </div>
    )
}

export default ImagePage;