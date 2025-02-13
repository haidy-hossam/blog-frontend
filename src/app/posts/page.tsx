'use client';
import { useQuery } from '@tanstack/react-query';

import { getPosts, Post } from './actions';

export const Posts = () => {
  const query = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-indigo-600 sm:text-5xl">Blog</h2>
          {/* <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p> */}
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {query.status === 'success' &&
            query.data.data.posts.map((post: Post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.createdAt} className="text-gray-500">
                    {post.createdAt}
                  </time>
                  <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-indigo-600">
                    {post.categoryName}
                  </p>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-indigo-600">{post.title}</h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm/6">
                    <p className="text-gray-600">Posted By</p>
                    <p className="font-semibold text-indigo-600">{post.username}</p>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
