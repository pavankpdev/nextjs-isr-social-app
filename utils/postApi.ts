import {getAxiosInstance} from "../configs/axios";

export const createPostApi = async (post: {title: string, content: string, user: {id: string}}) => {
    try {
        const { data } = await getAxiosInstance()({
            method: 'POST',
            url: '/api/posts',
            data: post
        })

        return data;
    } catch (error: any) {
        console.log(error)
    }
}

export const getAllPost = async (isSSR = false) => {
    try {
        const {data} = await getAxiosInstance()({
            method: 'GET',
            url: '/api/posts',
        })

        return data;
    } catch (error) {
        console.log(error)
    }
}
