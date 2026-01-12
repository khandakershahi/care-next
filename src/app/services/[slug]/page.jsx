export default function ServiceSlugPage({ params }) {
  const { slug } = params || {};
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Service: {slug}</h1>
      <p className="text-gray-700">Replace with service detail content.</p>
    </main>
  );
}
