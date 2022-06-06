import fs from 'fs/promises';
import path from 'path';

const ProductDetail = ({ loadedProduct }) => {
  // use this with fallback: true
  if (!loadedProduct) return <p>Loading...</p>;

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

async function getData() {
  const jsonData = await fs.readFile(
    path.join(process.cwd(), 'dummy-backend.json')
  );
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) return { notFound: true };

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// tell nextjs which instances of this dynamic page should be pre-generated
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: true,
  };
}

export default ProductDetail;
