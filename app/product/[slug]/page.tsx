const getTime = async () => new Date().getTime();

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const time = await getTime();
  return (
    <div>
      My Post: {slug} + {time}
    </div>
  );
}
