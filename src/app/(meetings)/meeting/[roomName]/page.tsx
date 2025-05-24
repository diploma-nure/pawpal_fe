import { Room } from '@/features/meetings/components/Room/Room';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ roomName: string }>;
}) {
  const { roomName } = await params;
  const cookiesStore = await cookies();
  const roomInfo = cookiesStore.get('roomInfo');

  if (!roomInfo) {
    redirect('/profile/requests');
  }

  const { token, url } = JSON.parse(roomInfo.value);

  return (
    <>
      <Room roomName={roomName} token={token} url={url} />
    </>
  );
}
