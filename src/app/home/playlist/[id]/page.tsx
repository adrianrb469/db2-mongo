export default function Playlist({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
