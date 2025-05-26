import { Room } from '@/features/meetings/components/Room/Room';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ roomName: string }>;
  searchParams: Promise<{
    isMicOn: string;
    isCameraOn: string;
  }>;
}) {
  const { roomName } = await params;
  const { isMicOn, isCameraOn } = await searchParams;
  const cookiesStore = await cookies();
  const roomInfo = cookiesStore.get('roomInfo');

  if (!roomInfo) {
    redirect('/profile/requests');
  }

  const { token, url } = JSON.parse(roomInfo.value);
  return (
    <>
      <Room
        isMicOn={isMicOn === 'true'}
        isCameraOn={isCameraOn === 'true'}
        roomName={roomName}
        token={token}
        url={url}
      />
    </>
  );
}
