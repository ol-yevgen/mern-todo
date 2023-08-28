import { useCallback, useState } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (url: string, method: string = 'GET', body: any = null, headers: Record<string, string> = {}) => {
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setLoading(false);
            
            return data;

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
}

