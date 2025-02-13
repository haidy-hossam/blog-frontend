import axios from 'axios';

export type Post = {
  id?: number;
  title?: string;
  content?: string;
  username?: string;
  categoryName?: string;
  createdAt?: string;
};

export const getPosts = async () => {
  const res = await axios.get('/posts');

  return res;
};
