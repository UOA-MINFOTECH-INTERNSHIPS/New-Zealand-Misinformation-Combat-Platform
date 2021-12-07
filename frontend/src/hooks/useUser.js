import axios from "axios";
import { useState } from "react";
import useGet from "./useGet";

export default function useUser() {

    const { data, refresh, isLoading } = useGet('/api/user', []);

    const [inProgress, setInProgress] = useState(isLoading);

    function createNewUser() {
        setInProgress(true);
        axios.post('/api/user/register')
            .then(() => {
                refresh();
                setInProgress(false);
            });
    }

    function deleteAllUser() {
        setInProgress(true);
        axios.delete('/api/user')
            .then(() => {
                refresh();
                setInProgress(false);
            });
    }

    return {
        user: data,
        createNewUser,
        deleteAllUser,
        isLoading: isLoading || inProgress
    };

}