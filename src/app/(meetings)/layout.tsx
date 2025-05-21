import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function MeetingsLayout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
