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
 return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {feed?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Feed