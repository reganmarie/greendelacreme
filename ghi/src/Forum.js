import React from "react";
import { useGetThreadsQuery } from "./store/forumApi";


export default function ForumList() {
    const { data: threadData } = useGetThreadsQuery();

    return (
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
      )
}
