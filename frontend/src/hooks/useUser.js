import axios from "axios";
import { useState } from "react";
import useGet from "./useGet";

export default function useUser() {

    const { data, refresh, isLoading } = useGet('/api/user', []);

    const [inProgress] = useState(isLoading);

    function createNewUser() {
        axios.post('/api/user/register')
            .then(() => {
                refresh();
            });
    }
    return {
        user: data,
        createNewUser,
        isLoading: isLoading || inProgress
    };

}