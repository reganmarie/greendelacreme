import React, { useState } from 'react';
import { useUpdateBlogMutation } from '../../store/blogApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditForm({ blogId, blogTitle, blogBody, blogImage }) {
  const [title, setTitle] = useState(blogTitle);
  const [body, setBody] = useState(blogBody);
  const [image, setImage] = useState(blogImage);
  const [showImageInput, setShowImageInput] = useState(false);
  const [editBlog, result] = useUpdateBlogMutation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editBlog({ id: blogId, data: { title, body, image } });
    setShowImageInput(false);
  };

  if (result.isSuccess) {
    toast(`You successfully edited your blog post: ${title}!`, { toastId: 'editSuccess' });
    result.reset();
  } else if (result.isError) {
    toast.error(`${result.error.data.message}`, { toastId: 'editError' });
    result.reset();
  }

  const handleCloseModal = () => {
    setTitle(blogTitle);
    setBody(blogBody);
    setImage(blogImage);
    setShowImageInput(false);
  }

  return (
    <>
      <input type="checkbox" id={`${blogId}-modal`} className="modal-toggle" onClick={handleCloseModal} />
      <div className="modal" key={`${blogId}-modal`}>
        <div className="modal-box relative max-w-2xl 1080:max-w-3xl 1440:max-w-5xl bg-white/60 backdrop-blur-md">
          <label htmlFor={`${blogId}-modal`} className="btn btn-sm btn-circle absolute right-2 top-2 bg-secondary-200 border-none hover:bg-darkgreen">✕</label>
          <h3 className="text-lg font-bold text-center py-2 mb-2">Edit Blog Post</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="text-xs absolute end-[32px] top-[86px]">{title.length} / 150</label>
            <input
              required
              className="w-full rounded-lg text-sm py-2 pl-2 pr-16 bg-gray-100/60 mb-3 focus:outline-none focus:ring-secondary-200 focus:ring-2 relative"
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength="150"
            />
            <textarea
              required
              id="body"
              name="body"
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Type something..."
              className="w-full rounded-lg p-2 text-sm bg-gray-100/60 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:outline-none focus:ring-secondary-200 focus:ring-2"
            />
            <div className="flex justify-end mt-1">
              {showImageInput ? (
                <>
                  <label htmlFor="image" className="text-xs absolute end-[118px] bottom-[46px]">{image.length} / 400</label>
                  <input
                    className="w-full rounded-lg text-sm py-2 pl-2 pr-[70px] bg-gray-100/60 mb-3 mr-2 focus:outline-none focus:ring-secondary-200 focus:ring-2 relative"
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Image URL here"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    maxLength="400"
                  />
                </>
              ) : (
                <div className="flex gap-2">
                  <span
                    className="flex items-center transition ease-out duration-300 hover:bg-darkgreen hover:text-white w-9 h-9 px-2 mr-2 rounded-full text-secondary-200 bg-white/60 cursor-pointer"
                    onClick={() => { setShowImageInput(true); }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="css-i6dzq1"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </span>
                </div>
              )}
              <div className="submit-modal-form">
                <label htmlFor={`${blogId}-modal`}>
                  <button type="submit" className="flex items-center h-9 py-2 px-4 rounded-lg text-sm bg-secondary-200 text-white hover:bg-darkgreen font-semibold cursor-pointer submit-modal-form">
                    Edit
                    <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
