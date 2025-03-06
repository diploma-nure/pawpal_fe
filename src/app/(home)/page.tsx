'use client';
import { Container, RadioGroup } from '@/components';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import { MultiSelect } from '@/components/Select/Select';

export default function Home() {
  const sortOptions = [
    'За датою додавання (спочатку нові додані)',
    'За віком (спочатку молодші)',
    'За розміром (спочатку маленькі)',
    'За розміром (спочатку великі)',
  ];

  const options = [
    { value: 'apartment', label: 'Квартира' },
    { value: 'private_house', label: 'Приватний будинок' },
  ];

  const handleChange = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <Container>
      <div className="grid">
        <div className="col-1-2 col-tablet-1-4 col-desktop-1-12">
          <Button>Click</Button>
        </div>
        <div style={{ maxWidth: '300px' }}>
          <MultiSelect options={sortOptions} />
        </div>
        <Icon name="logo" width={32} height={32} />

        <RadioGroup
          name="housing-type"
          options={options}
          defaultValue="private_house"
          onChange={handleChange}
        />
      </div>
    </Container>
  );
}
