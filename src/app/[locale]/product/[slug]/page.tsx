type Props = {
	params: { locale: string; slug: string };
};

// eslint-disable-next-line func-style
const getData = (slug: string): Promise<string> => {
	const myPromise = new Promise<string>((resolve) =>
		setTimeout(() => {
			resolve(`${slug}-${Date.now()}`);
		}, 10000),
	);

	return myPromise;
};

export default async function ProductDetail({ params: { slug } }: Props) {
	const timeSlugString = await getData(slug);

	return <div className="container p-6">{timeSlugString}</div>;
}
