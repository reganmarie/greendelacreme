import React from 'react';
import { useGetThreadQuery } from '../store/forumApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ForumDropdown from './ForumDropdown';

export default function ForumDetail() {
    const { id } = useParams();
    const { data } = useGetThreadQuery(`${id}`);
    const user = useSelector(state => state.auth.user.username);

    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
            {data &&
                <div>
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">{data.title}</h1>

                <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                    <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={data.image} alt="" />

                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        <p className="text-sm text-blue-500 uppercase">Question</p>

                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                            {data.body}
                        </p>
                        <div className="flex items-center mt-6">
                            <img className="object-cover object-center w-10 h-10 rounded-full" src={data.avatar} alt="" />

                            <div className="mx-4">
                                <h1 className="text-sm text-gray-700 dark:text-gray-200">{data.username}</h1>
                            </div>
                                {data.username === user ? <ForumDropdown /> : null }
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
        </section>
    )
};
