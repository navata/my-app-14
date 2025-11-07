import React from 'react';

type Props = {
  params: {locale: string; slug: string};
};

// eslint-disable-next-line func-style
const getData = async (): Promise<number> => {
  // eslint-disable-next-line func-style
  const myPromise = new Promise<number>((resolve) =>
    setTimeout(() => {
      resolve(new Date().getTime());
    }, 1000)
  );

  return await myPromise;
};

export default async function ProductDetail({params: {slug}}: Props) {
  const time = await getData();

  return (
    <div className="container p-6">
      {slug} + {time}
    </div>
  );
}
