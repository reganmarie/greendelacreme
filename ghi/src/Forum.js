import React from "react";
import { useGetThreadsQuery } from "./store/forumApi";


export default function ForumList() {
    const { data: threadData } = useGetThreadsQuery();

    return (
      <>
      <div className='columns-lg-1'>
          <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      </div>
      </div>






















        <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Image</th>
              <th>Created On</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {threadData && threadData.map(thread => {
              return (
                <tr key={thread.id}>
                  <td>{thread.title}</td>
                  <td>{thread.body}</td>
                  <td><img src={thread.image} className="w-2/5" /></td>
                  <td>{thread.created_on}</td>
                  <td>{thread.username}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      </>
      )
}
