import { useEffect } from 'react';
import useSWR from 'swr';

export default function UserProfilePage({ username }) {
  // client-side data fetching
  const { data, error } = useSWR('some-api');

  useEffect(() => {
    // some data transformation logic and maybe you can set some state
  }, [data]);

  if (error) return <p>Failed to load...</p>;

  if (!data) return <p>Loading...</p>;

  return <h1>{username}</h1>;
}

// server side code that only runs there
export async function getServerSideProps({ params, req, res }) {
  return {
    props: {
      username: 'D',
    },
  };
}
