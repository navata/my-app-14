// export const revalidate = 20;
// export const dynamic = 'force-static';

import React from 'react';
// import { cookies } from 'next/headers'

type ProductDetailProps = {
  params: { slug: string };
  searchParams: Record<string, string>;
};

async function getData(slug: string) {
  const url = `https://api.genderize.io/?name=${slug}`;
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

/**
 * Tạo một chuỗi ngẫu nhiên có độ dài nhất định.
 * @param {number} length Độ dài của chuỗi.
 * @returns {string} Chuỗi ngẫu nhiên.
 */
function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
* Tạo một Promise tự động sinh ra 1000 item với name, age, address.
*
* @returns {Promise<Array<Object>>} Một Promise sẽ giải quyết với một mảng 1000 item.
* Mỗi item có dạng: { name: string, age: number, address: string }.
*/
function generateItemsPromise(slug?:string) {
  return new Promise((resolve, reject) => {
      const items = [];
      const numberOfItems = 100;

      for (let i = 0; i < numberOfItems; i++) {
          const item = {
              name: `User ${generateRandomString(5)} ${slug}`,
              age: Math.floor(Math.random() * 60) + 18,
              address: `${Math.floor(Math.random() * 100) + 1} Street ${generateRandomString(7)}, City ${generateRandomString(5)}`
          };
          items.push(item);
      }

      // Giải quyết (resolve) Promise với mảng các item đã tạo
      resolve(items);
  });
}

// --- Cách sử dụng async/await ---

/**
* Hàm bất đồng bộ để lấy và xử lý các item được tạo.
*/
async function processGeneratedItems(slug: string): Promise<any[]> {
  console.log("Bắt đầu tiến trình tạo và xử lý item với async/await...");

  try {
      // 'await' sẽ tạm dừng việc thực thi hàm này cho đến khi Promise được giải quyết (resolve).
      // Giá trị được 'resolve' sẽ được gán vào biến 'items'.
      const items:any = await generateItemsPromise(slug);

      // console.log(`Đã tạo thành công ${items.length} item.`);
      // console.log("5 item đầu tiên:", items.slice(0, 5));
      // console.log("Item thứ 100:", items[99]);

      // // Bạn có thể thực hiện các thao tác khác với 'items' ở đây
      // // Ví dụ: gửi lên API, lưu vào database, v.v.
      // console.log("Hoàn thành xử lý các item.");
      return items;

  } catch (error) {
      // 'catch' block sẽ bắt bất kỳ lỗi nào (reject) từ Promise.
      console.error("Đã xảy ra lỗi trong quá trình tạo hoặc xử lý item:", error);
      return []
  }
}

export default async function Page({ params }: ProductDetailProps) {
  const resData = await processGeneratedItems(params.slug);
  // const cookieStore = cookies();
 


  return (
    <div>
      {1111111111111}
      {/* { cookieStore.getAll().map((cookie) => <div>{cookie.name + '=' + cookie.value}</div>)} */}
      {resData?.map(item => <div>{item?.name}</div>)}
    </div>
  );
}
