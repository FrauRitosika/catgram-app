import { ApiGetGalleryResponse, RequestParams } from './types-image';

const token: string = '765e609641f09058ad8839329d36c207ccf280a5';

const params: RequestParams = {
    url: 'https://api.imgur.com/3/gallery/t/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
    },
    query: {
        client_id: '02f219827258953'
    },

    address: {
        tag: 'cutestcat',
        sortType: 'top',
        page: 1
    }
};

async function getImgurGallery(params: RequestParams) {

    const url: string = `${params.url}${params.address.tag}/${params.address.sortType}/all/${params.address.page}`;
    const queryParams: URLSearchParams = new URLSearchParams(params.query);

    const result: ApiGetGalleryResponse = await fetch(`${url}?${queryParams}`, {
        method: 'GET',
        headers: params.headers
    })
        .then(successResponse => {
            return (successResponse.status === 200 ? successResponse.json() : null);
        },
            failResponse => {
                return null;
            });

    return result;
}

const getImgurGalleryWithPreset = () => {
    return getImgurGallery(params);
}

export default getImgurGalleryWithPreset;