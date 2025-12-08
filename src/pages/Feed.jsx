import axios from 'axios'
import React, { useEffect } from 'react'
import { API_BASE_URL, API_ENDPOINTS } from '../constants/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../store/slices/feedSlice';
import UserCard from '../components/FeedCard/UserCard';

const Feed = () => {
     const feed = useSelector((state) => state.feed);
      const dispatch = useDispatch();
    const getFeedData = async () =>{
        try{
          if(feed && feed.length > 0) return;
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FEED}`, {withCredentials: true});
        dispatch(addFeed(response.data.data));
        }catch(error){
            console.error("Error fetching feed data:", error);
        }
       
    }
    useEffect(() => {
    getFeedData();
    }, []);

   if (!feed || feed.length === 0) {
    return (
      <h1 className="text-center mt-10 text-gray-600 font-semibold">
        No users found
      </h1>
    );
  }

 return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {feed &&(
          <UserCard user={feed[0]} />
        )}
      </div>
    </div>
  );
}

export default Feed