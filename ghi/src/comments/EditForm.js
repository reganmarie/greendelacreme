import React, { useRef, useState } from 'react';
import { useUpdateCommentMutation } from '../store/commentApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import CloseIcon from '@mui/icons-material/Close';
import { SvgIcon } from '@mui/material';
import Delete from './Delete';

export default function EditForm({ id, showForm, initResponse }) {
  const [response, setResponse] = useState(initResponse);
  const [showPicker, setShowPicker] = useState(false);
  const [showEditForm, setShowEditForm] = useState(showForm);
  const [updateComment, result] = useUpdateCommentMutation();
  const ref = useRef(null);

  const onEmojiClick = (e) => {
    const emoji = e.native;
    setResponse(prev => prev + emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateComment({ id, data: { response } });
    setShowEditForm(false);
  };

  if (result.isSuccess) {
    toast(`You successfully edited your comment!`, { toastId: `editCommentSuccess - ${response}` });
    result.reset();
  };

  const handleEditClick = () => {
    setShowEditForm(true);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    showEditForm ?
      <>
        <div key={`${id} - edit comment`} className="flex items-center">
          <button
            type="button"
            onClick={() => {
              setShowEditForm(prev => !prev);
              setResponse(initResponse);
            }}
          >
            <SvgIcon component={CloseIcon} className="mr-1 mt-2 text-secondary-200 hover:fill-darkgreen" />
          </button>
          <div className="relative w-full pt-2">
            <div className="absolute bottom-[45px] right-[-121px]">
              {showPicker && <Picker
                theme="light"
                data={data}
                onEmojiSelect={onEmojiClick}
              />}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className="py-2 pl-3 w-full h-11 text-slate-700 bg-gray-100 dark:bg-gray-600 rounded-lg placeholder:text-gray-400 dark:placeholder:text-gray-300 text-sm pr-20 focus:outline-secondary-200"
                type="text"
                placeholder="Write a comment"
                value={response}
                onChange={e => setResponse(e.target.value)}
                required
              />
              <span className="flex absolute right-3 top-2/4 -mt-2 items-center">
                <button type="button" onClick={() => setShowPicker(prev => !prev)}>
                  <svg className="mr-2 w-6 h-6 fill-secondary-200 hover:fill-darkgreen hover:cursor-pointer" viewBox="0 0 24 24"
                  >
                    <path
                      d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
                    </path>
                  </svg>
                </button>
                <button type="submit">
                  <svg className="fill-secondary-200 hover:fill-darkgreen hover:cursor-pointer dark:fill-gray-50 w-6 h-6" viewBox="0 0 24 24">
                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                  </svg>
                </button>
              </span>
            </form>
          </div>
        </div>
      </>
      :
      <>
        <div className="flex items-center text-xs text-secondary-200 hover:cursor-pointer pl-12" ref={ref}>
          <button
            type="button"
            onClick={handleEditClick}
          >
            <div className="mr-[3px] hover:text-darkgreen">Edit</div>
          </button>
          <img src={`${process.env.PUBLIC_URL}/images/dot.png`} alt="dot" className="w-2 h-2 mr-1" />
          <label htmlFor={`${id} - delete comment`}>
            <div className="hover:text-darkgreen hover:cursor-pointer">Delete</div>
          </label>
        </div>
        <Delete key={`${id} - delete button`} id={id} comment={response} />
      </>
  );
}
