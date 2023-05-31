'use client';

import { useEffect, useState } from 'react';

import PromptCard from './PromptCard';
import useDebounce from '@hooks/useDebounce';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const regex = new RegExp(debouncedSearchTerm, 'i'); // 'i' flag for case-insensitive
    setFilteredPosts(
      posts.filter(
        (p) =>
          regex.test(p.creator.username) ||
          regex.test(p.prompt) ||
          regex.test(p.tag)
      )
    );
  }, [debouncedSearchTerm]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={(tag) => setSearchTerm(tag)}
      />
    </section>
  );
};

export default Feed;
