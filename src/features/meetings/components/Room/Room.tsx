'use client';

import { useChangeApplicationStatus } from '@/features/admin/applications/api/changeApplicationStatus';
import { useChangeMeetingStatus } from '@/features/admin/meetings/api/changeMeetingStatus';
import { useGetUser } from '@/features/profile/hooks';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';

type Props = {
  url: string;
  roomName: string;
  token: string;
  isMicOn: boolean;
  isCameraOn: boolean;
};

export const Room: FC<Props> = ({ url, token, isCameraOn, isMicOn }) => {
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const user = useGetUser();
  const changeApplicationStatusMutation = useChangeApplicationStatus();
  const changeMeetingStatusMutation = useChangeMeetingStatus();

  useEffect(() => {
    const textsToHide = ['Share screen', 'Chat'];
    const sourcesToHide = ['chat', 'screen_share']; // Add the `data-lk-source` values you want to hide

    const observer = new MutationObserver(() => {
      document.querySelectorAll('button').forEach((button) => {
        const buttonText = button?.textContent;
        const dataSource = button.getAttribute('data-lk-source');
        const hasChatToggleClass = button.classList.contains('lk-chat-toggle');

        const shouldHideByText = textsToHide.some((text) =>
          buttonText?.includes(text),
        );
        const shouldHideBySource =
          dataSource && sourcesToHide.includes(dataSource);

        if (shouldHideByText || shouldHideBySource || hasChatToggleClass) {
          button.style.setProperty('display', 'none', 'important');
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const handleDisconnect = () => {
    if (user?.role === 'Admin') {
      const applicationId = searchParams.get('applicationId');
      const meetingId = searchParams.get('meetingId');
      const isAbleToChangeStatus =
        applicationId &&
        !isNaN(parseInt(applicationId)) &&
        meetingId &&
        !isNaN(parseInt(meetingId));

      if (isAbleToChangeStatus) {
        changeApplicationStatusMutation.mutate({
          applicationId: Number(applicationId),
          status: 3,
        });

        changeMeetingStatusMutation.mutate({
          meetingId: Number(meetingId),
          status: 2,
        });
      }
    }
    back();
  };

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={url}
      token={token}
      connect={true}
      video={isCameraOn}
      audio={isMicOn}
      className={styles.room}
      onDisconnected={handleDisconnect}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
