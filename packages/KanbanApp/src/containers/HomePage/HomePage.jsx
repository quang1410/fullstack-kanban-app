import React, { useEffect } from 'react';

import { useDispatch, useSelect, useSelector } from 'hooks';
import { DefaultLayout } from 'layouts';

const HomePage = () => {
  const { getPost } = useDispatch(({ PostStore }) => ({
    getPost: PostStore.getPost,
  }));

  const { post } = useSelector(({ PostStore }) => ({
    post: PostStore.data,
  }));

  const { selectPosts } = useSelect(({ PostStore }) => ({
    selectPosts: PostStore.slectPostCreateSelector,
  }));

  useEffect(() => {
    getPost();
  }, [getPost]);

  console.log('selectPosts', selectPosts);

  return (
    <DefaultLayout>
      {post?.map(({ userId, id, title, body }) => (
        <ul key={id}>
          <li>{userId}</li>
          <li>{id}</li>
          <li>{title}</li>
          <li>{body}</li>
        </ul>
      ))}
    </DefaultLayout>
  );
};

export default HomePage;
