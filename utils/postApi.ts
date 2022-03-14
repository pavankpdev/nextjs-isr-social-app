import axios from "../configs/axios";

export const createPostApi = async (post: {title: string, content: string, user: {id: string}}) => {
    try {
        const { data } = await axios({
            method: 'POST',
            url: '/api/posts',
            data: post
        })

        return data;
    } catch (error: any) {
        console.log(error)
    }
}

export const getAllPost = async () => {
    try {
        const {data} = await axios({
            method: 'GET',
            url: '/api/posts',
        })

        return data;
    } catch (error) {
        console.log(error)
    }
}
