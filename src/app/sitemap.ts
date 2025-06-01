import { getFilteredPets } from '@/features/pets/api/getFilteredPets';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await getFilteredPets({
    Page: '1',
    PageSize: 1000,
  });

  const petEntries = response.data.items.map((pet) => ({
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/pets/${pet.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
      lastModified: new Date(),
      priority: 1.0,
    },
    ...petEntries,
  ];
}
