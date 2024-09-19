interface ImageInfo {
    id: string;
    type: string | null;
    link: string;
    width: number;
    height: number;
}

interface PostContent {
    id: string;
    title?: string;
    img: ImageInfo;
    isLiked: boolean;
    isDeleted: boolean;
}


export {ImageInfo, PostContent}