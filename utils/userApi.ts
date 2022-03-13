import axios from "../configs/axios";

export const getUsersApi = async (key: 'username' | 'id', value: string) => {
    try {
        const {data} = await axios({
            method: 'GET',
            url: `/api/users`,
        });

        return data.filter((user: any) => user[key] === value);
    }catch (error: any) {
        console.log(error)
    }

}