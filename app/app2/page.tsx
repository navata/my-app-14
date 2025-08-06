// import { getProductDetailServer } from '@/utils/api/product';

import React from 'react';

async function getData(slug: string) {
  const url = `https://api-gateway.pharmacity.vn/pmc-ecm-product/api/public/product/with-slug/${slug}`;
  try {
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (_) {
    return;
  }
}

export default async function Page() {
  const resData = await getData('mieng-dan-mun-pharmacity-hop-20-mieng');

  return (
    <div>
      {resData?.data?.item?.seo_meta_description}
    </div>
  );
}
