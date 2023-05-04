import React from 'react';
import { useGetFriendsQuery } from '../store/friendApi';
import { useGetTokenQuery } from '../store/authApi';

export default function FriendList() {
  const { data: user } = useGetTokenQuery();
  const { data: friends } = useGetFriendsQuery(user?.account.id);

  return (
    <>
      <div className="bg-white max-w-[240px] drop-shadow rounded-xl">
        <div className="flex inline-start">
          <div className="w-full p-4">
            <div className="flex flex-col justify-center">
              <div className='text-center w-full'>
                <h2 className="w-full font-bold text-gray-600 text-center">Plant Pals</h2>
              </div >
              <div className="w-full border-t-2 border-gray-100 my-2">
              </div>
              <div className="flex flex-col space-y-2 text-sm break-words">
                {friends?.length > 0 ? friends.map(friend => {
                  return (
                    `@${friend.username} `
                  );
                })
                  :
                  <div className="text-center">No friends :(</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
