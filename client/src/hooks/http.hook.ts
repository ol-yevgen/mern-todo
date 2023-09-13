import { useCallback, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const BASE_URL =
        process.env.REACT_APP_BASE_URL1
        || process.env.REACT_APP_BASE_URL2
        || process.env.REACT_APP_BASE_URL3 as string;

    const request = useCallback(async (url: string, method: string, body: any = null, headers: Record<string, string> = {}, mode: RequestMode = 'cors', credentials: RequestCredentials = 'include') => {
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const TODO_API = BASE_URL + url

            const response = await fetch(TODO_API, { method, mode, body, credentials, headers })
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

    return { loading, request };
}

