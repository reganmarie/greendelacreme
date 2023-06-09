import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import Comment from '../../comments/Comment';
import { useGetCommentsQuery } from '../../store/commentApi';
import { useGetTokenQuery } from '../../store/authApi';
import { useGetLikesQuery } from '../../store/likeApi';
import LikeButton from '../../likes/LikeButton';
import UnlikeButton from '../../likes/UnlikeButton';
import AddFriend from '../../friends/AddFriend';
import { useGetFriendRequestsQuery, useGetFriendsQuery } from '../../store/friendApi';


export default function BlogPost({ username, name, avatar, createdOnDate, createOnTime, id, title, body, image, authorId }) {
  const [showChatHover, setShowChatHover] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likeAccounts, setLikeAccounts] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(true);
  const { data: comments } = useGetCommentsQuery(id);
  const { data: user } = useGetTokenQuery();
  const { data: likes } = useGetLikesQuery(id);
  const { data: friends } = useGetFriendsQuery(user?.account.id);
  const { data: friendRequests } = useGetFriendRequestsQuery(user?.account.id);

  useEffect(() => {
    const friendList = friends?.map(friend => friend.username);
    const requestList = friendRequests?.map(request => request.username);
    if (friendList?.includes(username) || requestList?.includes(username) || user?.account.username === username) {
      setShowAddFriend(false);
    } else {
      setShowAddFriend(true);
    }
  }, [friends, friendRequests, username, user]);

  useEffect(() => {
    if (likes !== undefined && likes !== null) {
      const accounts = likes.map(like => like.username);
      setLikeAccounts(accounts);
    }
  }, [likes]);

  return (
    <div key={id} className="flex max-w-2xl 1080:max-w-3xl 1440:max-w-5xl items-center justify-center mx-auto">
      <div className="flex flex-col items-center w-[100%]">
        <div className="flex items-center justify-center py-2 w-[100%]">
          <div id={id} className="rounded-xl border p-5 shadow-md w-full bg-white">
            <div className="flex w-full items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full bg-lime-400" />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="text-md font-bold text-slate-700 mr-1.5">{name}</div>
                    {showAddFriend && <AddFriend friendId={authorId && authorId} username={username} user={user?.account.username} />}
                  </div>
                  <div className="text-xs font-semibold text-secondary-200">@{username}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex flex-col text-end space-x-8 text-secondary-200">
                  <div className="text-xs">{createdOnDate}</div>
                  <div className="text-xs">{createOnTime}</div>
                </div>
                {username === user.account.username ? <Dropdown key={`${id} - dropdown`} id={id} /> : null}
              </div>
            </div>
            <div className="flex flex-col flex-grow mt-4 mb-5">
              <div className="mb-3 text-xl font-bold break-words">{title}</div>
              <div className="text-base text-neutral-600 whitespace-pre-wrap">
                <p className="break-words">
                  {body}
                </p>
              </div>
              <img src={image}
                className={image && "rounded-xl mt-3"}
                alt="" />
            </div>
            <div>
              <div className="flex items-center space-x-5 text-secondary-200 justify-between">
                <div className="flex space-x-4">
                  {likes && user && likeAccounts.includes(user.account.username)
                    ?
                    <UnlikeButton likes={likes} user={user} />
                    :
                    <LikeButton id={id} />
                  }
                  <div className="flex">
                    <div
                      className="flex cursor-pointer items-center hover:text-darkgreen"
                      onMouseEnter={() => setShowChatHover(true)}
                      onMouseLeave={() => setShowChatHover(false)}
                      onClick={() => setShowComments(prev => !prev)}
                    >
                      {
                        !showChatHover ?
                          <img src={`${process.env.PUBLIC_URL}/images/plant-comment-icon.png`} className="mr-1.5 h-6 w-6" alt="Comment" fill="none" />
                          :
                          <img src={`${process.env.PUBLIC_URL}/images/chat-hover.png`} className="mr-1.5 h-6 w-6" alt="Comment" fill="none" />
                      }
                      <span className="font-semibold">Comment</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <span>
                    {likes && (
                      likes.length === 1 ?
                        `${likes.length} Like`
                        :
                        `${likes.length} Likes`
                    )}
                  </span>
                  <img src={`${process.env.PUBLIC_URL}/images/dot.png`} alt="dot" className="w-2 h-2 mr-1" />
                  <span>
                    {comments && (
                      comments.length === 1 ?
                        `${comments.length} Comment`
                        :
                        `${comments.length} Comments`
                    )}
                  </span>
                </div>
              </div>
            </div>
            {showComments && <Comment id={id} username={username} comments={comments} loggedInUser={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}
