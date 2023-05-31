'use client';

import { useEffect, useState } from 'react';

import Profile from '@components/Profile';

const MyProfile = ({ params, searchParams }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={`${searchParams?.name}'s`}
      desc={`Welcome to ${searchParams?.name}'s personalized profile page. Immerse yourself in their exceptional prompts and let the power of their imagination ignite your own creativity.`}
      data={posts}
    />
  );
};

export default MyProfile;
