import React, { RefObject, useEffect, useRef, useState } from "react";
import ButtonReaction from "./ButtonReaction";
import './Card.css';
import { PostContent } from '../app-data/types';

interface CardInfo {
    className?: string;
    contentClick: (postId: string, post: PostContent) => void;
    post: PostContent;
    onDelete: (post: PostContent) => void;
    onLike: (post: PostContent) => void;
}

const Card: React.FC<CardInfo> = ({ post, className = '', contentClick, onDelete, onLike }) => {

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

    const handleClick = () => {
        contentClick(post.id, post);
    }

    return (
        <div className={`${className} image-card`} >
            <div className="image-card__content" onClick={handleClick}>
                <div className="image-card__image-container">
                    <img className="image-card__image" src={post.img.link} onError={() => {}} onLoad={() => {}} alt={post.title} width={320} loading="lazy"  />
                </div>
                <p className="image-card__title">{post.title}</p>
            </div>
            <div className="image-card__reactions">
                <ButtonReaction className={`image-card__button`} type='DELETE' status = {isDeleted ? 'active' : null} onClick={setDeleted} >
                </ButtonReaction>
                <ButtonReaction className={`image-card__button`} type='LIKE' status = {isLiked ? 'active' : null} onClick={toggleLikedFlag}>
                </ButtonReaction>
            </div>
        </div>

    );
}

export default Card;