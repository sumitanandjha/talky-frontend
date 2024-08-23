import { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BaseUrl } from '../constants/BaseUrl'; // Renamed to UPPER_SNAKE_CASE for consistency

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return; // Early return if no selected user

            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BaseUrl}/api/v1/message/${selectedUser._id}`);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log("Failed to fetch messages:", error);
                // Optionally, you can show an error notification
                // toast.error("Failed to fetch messages. Please try again later.");
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]); // Corrected dependency array
}

export default useGetMessages;
