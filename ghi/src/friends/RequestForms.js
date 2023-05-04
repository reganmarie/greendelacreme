import React from 'react';
import { useAcceptFriendRequestMutation, useDenyFriendRequestMutation } from '../store/friendApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RequestForms({ request }) {
  const [acceptRequest, acceptResult] = useAcceptFriendRequestMutation();
  const [denyRequest, denyResult] = useDenyFriendRequestMutation();

  const handleAcceptFriendRequest = async (e) => {
    e.preventDefault();
    await acceptRequest(request?.id);
  };

  const handleDenyFriendRequest = async (e) => {
    denyRequest(request?.id);
  };

  if (acceptResult.isSuccess) {
    toast("You're mint to be friends! 🌱", { toastId: 'acceptSuccess' });
    acceptResult.reset();
  } else if (acceptResult.isError) {
    toast.error(`${acceptResult.error.data.message}`, { toastId: 'acceptError' });
    acceptResult.reset();
  }

  if (denyResult.isSuccess) {
    toast("Friendship did not bear fruit 🥀", { toastId: 'acceptSuccess' });
    denyResult.reset();
  } else if (denyResult.isError) {
    toast.error(`${denyResult.error.data.message}`, { toastId: 'acceptError' });
    denyResult.reset();
  }

  return (
    <>
      <div key={`${request?.id} - friend request`} className="w-full flex flex-row space-x-4 items-center justify-between max-h-[150px] max-w-full">
        <div className="text-sm">
          <span className="break-words">
            @{request?.username}
          </span>
        </div>
        <div className="flex justify-end text-white text-xs">
          <button type="button" className="bg-color5/80 rounded-full px-2 py-0.5 mr-1 hover:scale-105 transition-all ease-in duration-200 font-bold" onClick={handleAcceptFriendRequest}>Sprout</button>
          <button type="button" className="bg-color7 rounded-full px-2 py-0.5 hover:scale-105 transition-all ease-in duration-200 font-bold" onClick={handleDenyFriendRequest}>Weed</button>
        </div>
      </div>
    </>
  );
}
