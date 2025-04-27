import { getFilteredPets } from '@/features/pets/api/getFilteredPets';
import { MetadataRoute } from 'next';

export async function generateSitemaps() {
  const {
    data: { items },
  } = await getFilteredPets({
    Page: '1000',
  });

  return items.map((i) => i.id);
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://pawpalpets.netlify.app/pets/${id}`,
      lastModified: new Date(),
    },
  ];
}
