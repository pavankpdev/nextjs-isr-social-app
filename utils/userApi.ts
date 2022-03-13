import axios, {setHeaders} from "../configs/axios";

export const getUserByIDApi = async (id: string) => {
    try {
        const {data} = await axios({
            method: 'GET',
            url: `/api/users/${id}`,
        });

        return data
    }catch (error: any) {
        console.log(error)
    }

}