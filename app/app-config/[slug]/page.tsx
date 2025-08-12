// export const revalidate = 20;
// export const dynamic = 'force-static';

import { redirect } from 'next/navigation';
import React from 'react';
// import { cookies } from 'next/headers'

type ProductDetailProps = {
  params: { slug: string };
  searchParams: Record<string, string>;
};

async function getData(slug: string) {
  // const url = `https://api.genderize.io/?name=${slug}`;
  const url = `https://api-gateway.pharmacity.vn/pmc-ecm-app-config/api/config/with-code/v1.0.2?keys[]=${slug}&is_active=true`
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


  return (
    <div>
      {1111111111111}
      {/* { cookieStore.getAll().map((cookie) => <div>{cookie.name + '=' + cookie.value}</div>)} */}
      {JSON.stringify(resData)}
    </div>
  );
}
