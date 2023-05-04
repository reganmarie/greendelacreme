import React from 'react';
import { useGetFriendRequestsQuery } from '../store/friendApi';
import { useGetTokenQuery } from '../store/authApi';
import RequestForms from './RequestForms';


export default function RequestList() {
  const { data: user } = useGetTokenQuery();
  const { data: requests } = useGetFriendRequestsQuery(user?.account.id);

  return (
    <>
      <div className="bg-white max-w-[240px] drop-shadow rounded-xl">
        <div className="flex inline-start">
          <div className="w-full p-4">
            <div className="flex flex-col justify-center">
              <div className='text-center w-full'>
                <h2 className="w-full font-bold text-gray-600 text-center">Budding Relations</h2>
              </div >
              <div className="w-full border-t-2 border-gray-100 my-2">
              </div>
              <div className="flex flex-col space-y-2">
                {requests?.length > 0 ? requests.map(request => {
                  return (
                    <RequestForms key={`${request?.id} - friend request`} request={request} />
                  );
                })
                  :
                  <div className="text-center">No friend requests</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
