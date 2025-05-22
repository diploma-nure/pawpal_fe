import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { FC } from 'react';

type Props = {
  url: string;
  roomName: string;
  token: string;
};

export const Room: FC<Props> = ({ url, token }) => {
  return (
    <LiveKitRoom
      serverUrl={url}
      token={token}
      connect={true}
      video={false}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
