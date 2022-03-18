import {NextApiRequest, NextApiResponse} from 'next'
import {getAxiosInstance} from "../../configs/axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const {data} = await getAxiosInstance(true)({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`
            }
        })

        // const {data} = await getAllPost(true);
        console.log({data})
        res.status(200).json({posts: data})
    } catch (error: any) {
        res.status(500).json({error})
    }
}