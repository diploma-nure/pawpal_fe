import { Icon } from '@/components/ui';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface VideoPreviewProps {
  className?: string;
  isCameraOn: boolean;
  isMicOn: boolean;
  setIsCameraOn: (value: boolean) => void;
  setIsMicOn: (value: boolean) => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  className,
  isCameraOn,
  isMicOn,
  setIsCameraOn,
  setIsMicOn,
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: isMicOn,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraOn(true);
    } catch (err) {
      setError('Failed to access camera. Please check permissions.');
      console.error('Error accessing media devices:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const toggleMicrophone = async () => {
    const newMicState = !isMicOn;
    setIsMicOn(newMicState);

    if (isCameraOn && stream) {
      stream.getTracks().forEach((track) => track.stop());

      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: newMicState,
        });

        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (err) {
        setError('Failed to update microphone settings.');
        console.error('Error updating media stream:', err);
      }
    }
  };

  return (
    <div className={`${styles.videoPreview} ${className || ''}`}>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          playsInline
        />
        {!isCameraOn && (
          <div className={styles.placeholder}>
            <p>Camera is off</p>
          </div>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <div className={styles.controls}>
        <button
          className={clsx(styles.button, {
            [styles.button__disabled]: !isCameraOn,
          })}
          onClick={toggleCamera}
          aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
        >
          <Icon
            name={isCameraOn ? 'video' : 'videocam-off'}
            width={24}
            height={24}
            fill={isCameraOn ? colors.grey : colors.white}
          />
        </button>

        <button
          className={clsx(styles.button, {
            [styles.button__disabled]: !isMicOn,
          })}
          onClick={toggleMicrophone}
          aria-label={isMicOn ? 'Turn off microphone' : 'Turn on microphone'}
        >
          <Icon
            name="microphone"
            width={24}
            height={24}
            fill={isMicOn ? colors.grey : colors.white}
          />
        </button>
      </div>
    </div>
  );
};
