import React from "react";
import { useGetThreadsQuery } from "../store/forumApi";
import { Link } from "react-router-dom";

export default function ForumList() {
    const { data: threadData } = useGetThreadsQuery();

    return (
      <div className="godown" >
        <div >
        {threadData && threadData.map(thread => {
           const options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };

          return(
            <>
        <Link to={`${thread.id}`}>
        <div className="m-2 p-4 short max-h-50 rounded-3xl shadow-lg ml-90 bg-red-300">
        <div className="flex place-content-between">
        <div className="font-bold max-w-100 pt-3 ">{thread.title}</div>
                  <div className=" space-x-2">
                  <p className="text-xs">{new Date(thread.created_on).toLocaleDateString("en-US", options)} {new Date(thread.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  <p className="flex justify-end  ">{thread.username}<img src={thread.avatar} className="w-8" />  </p>
                  </div>
          </div>
           </div>
           </Link>
           </>
          )
        })}
        </div>
        </div>
      )
}
