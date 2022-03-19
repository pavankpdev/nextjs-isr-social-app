import {NextApiRequest, NextApiResponse} from 'next'
import {getAxiosInstance} from "../../../configs/axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            query: { id },
        } = req
        const {data} = await getAxiosInstance(true)({
            method: 'GET',
            url: `/api/posts/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`
            }
        })

        res.status(200).json({post: data})
    } catch (error: any) {
        res.status(500).json({error})
    }
}