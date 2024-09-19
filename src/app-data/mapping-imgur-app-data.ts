import { PostContent } from './types';
import getImgurGalleryWithPreset from '../imgur/get-gallery';


export default async function getImages() {

    const list: Array<PostContent> = [];

    await getImgurGalleryWithPreset().then(res => {
        if (!!res.data && res.success) {
            res.data.items.filter(item => item.images && item.images.length)
                .slice(0, 50).forEach(item => {
                    const img = item.images?.find(img => ['image/jpeg', 'image/png'].includes(img.type));
                    if (img) {
                        list.push({
                            id: item.id,
                            title: item.title,
                            img: {
                                id: img.id,
                                type: img.type,
                                link: img.link,
                                width: img.width,
                                height: img.height,
                            },
                            isLiked: false,
                            isDeleted: false
                        });
                    }
                    return null;
                });
        }
    }, err => { });

    return list;

}