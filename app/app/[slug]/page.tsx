// export const revalidate = 20;
export const dynamic = 'force-static';

import React from 'react';
import { cookies } from 'next/headers'

type ProductDetailProps = {
  params: { slug: string };
  searchParams: Record<string, string>;
};

async function getData(slug: string) {
  const url = `https://api-gateway.pharmacity.vn/pmc-ecm-app-config/api/config/with-code/v1.0.2?keys[]=${slug}`;
  try {
    const response = await fetch(url, { next: { tags: [slug] } });
    console.log(response)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (_) {
    console.log(_)
    return;
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
