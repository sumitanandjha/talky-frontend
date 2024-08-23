import  { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BaseUrl } from '../constants/BaseUrl'; // Renamed to UPPER_SNAKE_CASE for consistency

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BaseUrl}/api/v1/user`);
                console.log("other users -> ", res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log("Failed to fetch other users:", error);
            }
        };

        fetchOtherUsers();
    }, [dispatch]); // Added dispatch to the dependency array

}

export default useGetOtherUsers;
