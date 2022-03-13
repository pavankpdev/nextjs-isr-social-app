import axios, {setHeaders} from "../configs/axios";

export const loginApi = async (username: string, password: string) => {
    try{
        const body = {
            username,
            password
        }

        const {data} = await axios({
            method: "POST",
            url: '/api/login',
            data: body
        })

        localStorage.setItem('isr', JSON.stringify({token: data.accessToken, id: data.id}));
        setHeaders('Authorization', `Bearer ${data.accessToken}`);

        return data
    }catch (error: any){
        throw error;
    }
}

export const registerApi = async (userData: {firstName: string, lastName: string, password: string, username: string}) => {
    try{

        const {data} = await axios({
            method: "POST",
            url: '/api/users',
            data: {
                ...userData,
                roles: ['user']
            },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN}`
            }
        })

        localStorage.setItem('isr', JSON.stringify({token: data.accessToken, id: data.id}));
        setHeaders('Authorization', `Bearer ${data.accessToken}`);

        return data

    }catch (error: any){
        throw error;
    }
}