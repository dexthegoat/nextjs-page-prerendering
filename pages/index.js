import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const jsonData = await fs.readFile(
    path.join(process.cwd(), 'dummy-backend.json')
  );
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  if (data.products.length === 0) return { notFound: true };

  return {
    props: {
      products: data.products,
    },
    // incremental static generation
    // this page should be regenerated every 10 seconds
    revalidate: 10,
    // notFound: true,
    // redirect:
  };
}

export default HomePage;
