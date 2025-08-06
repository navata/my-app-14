// export const revalidate = 20;
// export const dynamic = 'force-static';

import React from 'react';
import { cookies } from 'next/headers'

type ProductDetailProps = {
  params: { slug: string };
  searchParams: Record<string, string>;
};

async function getData(slug: string) {
  const url = `https://api.nationalize.io/?name=${slug}`;
  try {
    const response = await fetch(url, { next: { revalidate: 0, tags: [slug] } });
    console.log(response)
    if (!response.ok) {
      return 'ERROR';
    }

    const json = await response.json();
    return json;
  } catch (_) {
    console.log(_)
    return 'ERROR';
  }
}

export default async function Page({ params }: ProductDetailProps) {
  const resData = await getData(params.slug);
  const cookieStore = cookies();
  console.log('1111', cookieStore.getAll().length)
  cookieStore.getAll().map((cookie) => console.log(cookie.name))

  return (
    <div>
      {JSON.stringify(resData)}
    </div>
  );
}
