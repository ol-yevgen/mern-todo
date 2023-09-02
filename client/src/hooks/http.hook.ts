import { useCallback, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const BASE_URL = process.env.REACT_APP_BASE_URL as string;

    const request = useCallback(async (url: string, credentials: RequestCredentials = 'include', method: string = 'GET', mode: RequestMode = 'cors', body: any = null, headers: Record<string, string> = {}) => {
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const TODO_API = BASE_URL + url

            const response = await fetch(TODO_API, { credentials, method, mode,body, headers })
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success(data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });

            setLoading(false);
            
            return data;

        } catch (error: any) {
            setLoading(false);

            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }, [BASE_URL]);

    return { loading, request};
}

