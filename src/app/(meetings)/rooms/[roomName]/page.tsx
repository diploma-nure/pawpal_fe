'use client';

import { VideoPreview } from '@/features/meetings/components/VideoCallPreview/VideoCallPreview';

export default function Page({}: {
  params: Promise<{ roomName: string }>;
  searchParams: Promise<{
    region?: string;
    hq?: string;
    codec?: string;
  }>;
}) {
  return (
    <div>
      <VideoPreview />
    </div>
  );
}
