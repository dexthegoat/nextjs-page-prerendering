export default function UserProfilePage({ username }) {
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
