import { useState } from "react";

const useApiRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const request = async (apiCall) => {
        setLoading(true);
        setError("");
        try {

            const response = await apiCall();
            setData(response.data);
            return response.data;
        } catch (err) {
            console.log(err)
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("حدث خطأ غير متوقع.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, request };
};

export default useApiRequest;
