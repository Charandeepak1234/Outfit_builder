import Head from 'next/head';
import dynamic from 'next/dynamic';

const OutfitBuilder = dynamic(() => import('../components/OutfitBuilder'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Outfit Builder</title>
      </Head>
      <main>
        <h1 style={{ textAlign: 'center' }}>Charan's Outfit Builder</h1>
        <OutfitBuilder />
      </main>
    </>
  );
}