import React, { useState, useEffect } from 'react';
import { SvgIcon } from '@mui/material';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useCreateFriendRequestMutation, useGetFriendRequestsQuery } from '../store/friendApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisabledButton from './DisabledButton';

export default function AddFriend({ friendId, username, user }) {
  const [addFriend, result] = useCreateFriendRequestMutation();
  const { data: requests } = useGetFriendRequestsQuery(friendId);
  const [disableButton, setDisableButton] = useState(false);

  const handleAddFriend = (e) => {
    e.preventDefault();
    addFriend({ "friend_id": friendId });
  };

  if (result.isSuccess) {
    setDisableButton(true);
    toast(`Sent friend request to ${username}`, { toastId: `friendRequestSuccess - ${username}` });
    result.reset();
  } else if (result.isError) {
    toast.error(`${result.error.data.message}`, { toastId: `friendRequestError - ${username}` });
    result.reset();
  }

  useEffect(() => {
    const requestList = requests?.map(request => request.username);
    if (requestList?.includes(user)) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [requests, user]);

  return (
    <>
      {disableButton ?
        <>
          <DisabledButton username={username} />
        </>
        :
        <>
          <SvgIcon onClick={handleAddFriend} component={PersonAddRoundedIcon} data-tooltip-id={`addfriend-${username}`} className="!w-5 !h-5 text-color5 hover:cursor-pointer hover:text-darkgreen hover:scale-110 transition-all ease-in duration-300 focus:outline-none" />
          <Tooltip id={`addfriend-${username}`} content="Add friend" place="right" className="!bg-secondary-200 font-semibold" />
        </>
      }
    </>
  );
}
