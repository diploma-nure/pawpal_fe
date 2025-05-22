import { Container } from '@/components/layout';
import { getPet } from '@/features/pets/api/getPet';
import { PetInfo } from '@/features/pets/components/PetInfo';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await getPet({ id });

  return {
    title: `${data.name} потребує вашої допомоги!`,
    description: `Дізнайтеся більше про ${data.name} - чарівну тваринку з нашого притулку. Перегляньте опис, фото та дізнайтеся, як подарувати їй дім.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const cookiesStore = await cookies();
  // const token = cookiesStore.get('token') ?? null;
  const { id } = await params;
  const { data } = await getPet({ id });
  // const user: User | null = token?.value
  //   ? JSON.parse(
  //       Buffer.from(token?.value.split('.')[1], 'base64url').toString('utf-8'),
  //     )
  //   : null;

  return (
    <section className="section">
      <Container>
        <PetInfo pet={data} />
        {/* {Boolean(token?.value) && user?.role === 'User' && <RecommendedPets />} */}
      </Container>
    </section>
  );
}
