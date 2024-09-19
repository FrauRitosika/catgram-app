import React, { useState } from "react";
import ButtonReaction from "./ButtonReaction";
import './ImageCard.css';
import { PostContent } from "../app-data/types";

interface ImageCardInfo {
    post: PostContent;
    onDelete: (post: PostContent) => void;
    onLike: (post: PostContent) => void;
}

const ImageCard: React.FC<ImageCardInfo> = ({ post, onLike, onDelete }) => {

    const [isLiked, setLikedFlag] = useState<boolean>(post.isLiked);
    const [isDeleted, setDeletesFlag] = useState<boolean>(post.isDeleted);

    function toggleLikedFlag() {
        post.isLiked = !isLiked;
        setLikedFlag(!isLiked);
        onLike(post);
    }

    function setDeleted() {
        post.isDeleted = !isDeleted;
        setDeletesFlag(!isDeleted);
        onDelete(post);
    }

    const isHorizontalImg: boolean = post ? (post.img.width >= post?.img.height ? true : false) : false;

    return (
        <div className='constainer'>
            <h2 className="image-page__title">{post.title}</h2>
            <div className="image-page__image-container">
                <img className={isHorizontalImg ? 'image-page__image--horizontal' : 'image-page__image--vertical'}
                    src={post.img.link} alt={post.title} width={isHorizontalImg ? 1400 : ''} height={isHorizontalImg ? '' : 700} />
                <div className="image-pade__reactions">
                    <ButtonReaction className={`image-page__button`} type='DELETE' status={isDeleted ? 'active' : null} onClick={setDeleted} />
                    <ButtonReaction className={'image-page__button'} type='LIKE' status={isLiked ? 'active' : null} onClick={toggleLikedFlag} />
                </div>
            </div>
        </div>)
}

export default ImageCard;