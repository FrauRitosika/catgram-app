interface RequestParams {
    url: string,
    headers: {
        'Content-Type': string;
        'Authorization': string;
    };
    query: {
        client_id: string;
    };
    address: {
        tag: string;
        sortType: string;
        page: number;
    };
}

interface ImageResponse {
    id: string;
    title: string | null;
    description: string | null;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    link: string;
}

interface ItemsResponse {
    id: string;
    title: string;
    description: string | null;
    datetime: number;
    cover_width: number;
    cover_height: number;
    link: string;
    images: ImageResponse[];
}

interface DataResponse {
    name: string;
    display_name: string;
    items: ItemsResponse[];
}

interface ApiGetGalleryResponse {
    data?: DataResponse;
    success: boolean;
    status: number;
}

export type {ApiGetGalleryResponse, DataResponse, ItemsResponse, ImageResponse, RequestParams};