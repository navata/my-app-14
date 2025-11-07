export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      My Post: {slug} + {new Date().getTime()}
    </div>
  );
}
