import React, { useState } from 'react';
import { useCreateBlogMutation } from '../../store/blogApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [showImage, setShowImage] = useState(false);

  const [CreateBlog, { isLoading }] = useCreateBlogMutation();

  const canPost = [title, body].every(Boolean) && !isLoading;

  const handlePost = async (e) => {
    if (canPost) {
      try {
        e.preventDefault();
        await CreateBlog({ title, body, image }).unwrap();
        setTitle('');
        setBody('');
        setImage('');
        setShowImage(false);
      } catch (e) {
        toast.error(`Failed to post: ${e}`, {toastId: 'createBlogError'});
      }
    }
  };

  const handleShowImageClick = () => {
    setShowImage(true);
  };


  return (
    <div className="flex max-w-2xl 1080:max-w-3xl 1440:max-w-5xl items-center justify-center mx-auto pt-1 pb-2">
    <section className="bg-[#ffffff] shadow-md rounded-lg p-5 w-full border">
      <h2 className="flex justify-center text-xl font-bold py-2 mb-2">Create a Post</h2>
      <form onSubmit={handlePost}>
        <div className="relative">
        <label htmlFor="postTitle" className="text-gray-400 text-xs absolute end-[8px] top-[10px]">{title.length} / 150</label>
        <input
          required
          className="w-full rounded-lg text-sm py-2 pl-2 pr-16 bg-gray-100 mb-3 focus:outline-secondary-200"
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength="150"
        />
        </div>
        <textarea
          required
          id="postBody"
          name="postBody"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Type something..."
          className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:outline-secondary-200"
        />
        <footer className="flex justify-end mt-1 relative">
          {showImage ? (
            <>
              <label htmlFor="postImage" className="text-gray-400 text-xs absolute end-[98px] bottom-[22px]">{image.length} / 400</label>
              <input
                className="w-full rounded-lg text-sm py-2 pl-2 pr-[70px] bg-gray-100 mb-3 mr-2 focus:outline-secondary-200"
                type="text"
                id="postImage"
                name="postImage"
                placeholder="Image URL here"
                value={image}
                onChange={e => setImage(e.target.value)}
                maxLength="400"
              />
            </>
          ) : (
            <div className="flex gap-2">
              <span
                className="flex items-center transition ease-out duration-300 hover:bg-darkgreen hover:text-white w-9 h-9 px-2 mr-2 rounded-full text-secondary-200 bg-white cursor-pointer"
                onClick={handleShowImageClick}
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
          <button type="submit" className="flex items-center h-9 py-2 px-4 rounded-lg text-sm bg-secondary-200 text-white shadow-md hover:bg-darkgreen font-semibold">Post
            <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </footer>
      </form>
    </section>
    </div>
  );
};

export default BlogForm;
