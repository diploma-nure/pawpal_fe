/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui';
import { API_URL } from '@/lib/api-client';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './Room.module.scss';

interface SignalRConnection {
  start(): Promise<void>;
  stop(): Promise<void>;
  invoke(methodName: string, ...args: any[]): Promise<any>;
  on(methodName: string, callback: (...args: any[]) => void): void;
  onclose(callback: (error?: Error) => void): void;
}

interface SignalRHubConnectionBuilder {
  withUrl(url: string, options?: any): SignalRHubConnectionBuilder;
  configureLogging(level: any): SignalRHubConnectionBuilder;
  build(): SignalRConnection;
}

declare global {
  interface Window {
    signalR: {
      HubConnectionBuilder: new () => SignalRHubConnectionBuilder;
      HttpTransportType: {
        WebSockets: number;
      };
      LogLevel: {
        Information: number;
      };
    };
  }
}

export const Room: FC<{ JWT: string }> = ({ JWT }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const meetingId = Number(urlParams.get('meetingId') || 1);
  const userId = Number(
    urlParams.get('userId') || Math.floor(Math.random() * 1e6),
  );

  const [isConnected, setIsConnected] = useState(false);
  const [canCall, setCanCall] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const hubRef = useRef<SignalRConnection | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const initializeSignalR = () => {
    if (!window.signalR) {
      return null;
    }

    const hub = new window.signalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/meeting-hub`, {
        accessTokenFactory: () => JWT,
        transport: window.signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .configureLogging(window.signalR.LogLevel.Information)
      .build();

    hub.onclose((err) => {
      setIsConnected(false);
    });

    hub.on('Error', (msg) => console.log('❌', msg));

    hub.on('UserJoined', (uid: number, name: string) => {
      console.log(`ℹ️ User ${uid} (${name}) joined`);
    });

    hub.on('ReceiveWebRTCOffer', handleOffer);
    hub.on('ReceiveWebRTCAnswer', handleAnswer);
    hub.on(
      'ReceiveICECandidate',
      ({ from, candidate }: { from: number; candidate: RTCIceCandidate }) => {
        if (from === userId) return;
        addIce(candidate);
      },
    );

    return hub;
  };

  const initializePeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });

    pc.onicecandidate = (evt) => {
      if (evt.candidate && hubRef.current) {
        hubRef.current
          .invoke('SendICECandidate', meetingId, evt.candidate)
          .catch(console.log);
      }
    };

    pc.ontrack = (evt) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = evt.streams[0];
      }
    };

    return pc;
  };

  const addIce = async (candidate: RTCIceCandidate) => {
    try {
      if (pcRef.current) {
        await pcRef.current.addIceCandidate(candidate);
      }
    } catch (e) {
      console.log('addIce error', e);
    }
  };

  const handleOffer = async (
    fromUserId: number,
    offer: RTCSessionDescriptionInit,
  ) => {
    if (fromUserId === userId || !pcRef.current || !hubRef.current) return;
    console.log('📥 offer');

    try {
      await pcRef.current.setRemoteDescription(offer);
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      await hubRef.current.invoke('SendWebRTCAnswer', meetingId, answer);
    } catch (e) {
      console.log('handleOffer error', e);
    }
  };

  const handleAnswer = async (
    fromUserId: number,
    answer: RTCSessionDescriptionInit,
  ) => {
    if (fromUserId === userId || !pcRef.current) return;
    console.log('📥 answer');

    try {
      await pcRef.current.setRemoteDescription(answer);
    } catch (e) {
      console.log('handleAnswer error', e);
    }
  };

  const handleStart = async () => {
    try {
      hubRef.current = initializeSignalR();
      pcRef.current = initializePeerConnection();

      if (!hubRef.current || !pcRef.current) {
        console.log('❌ Failed to initialize connections');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream.getTracks().forEach((track) => {
        if (pcRef.current) {
          pcRef.current.addTrack(track, stream);
        }
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      await hubRef.current.start();
      await hubRef.current.invoke('JoinMeeting', meetingId, userId);

      console.log('✅ joined hub');
      setIsConnected(true);
      setCanCall(true);
    } catch (error) {
      console.log('❌ Start error:', error);
    }
  };

  const handleCall = async () => {
    if (!pcRef.current || !hubRef.current) return;

    try {
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      await hubRef.current.invoke('SendWebRTCOffer', meetingId, offer);
      console.log('📤 offer sent');
    } catch (error) {
      console.log('❌ Call error:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (hubRef.current) {
        hubRef.current.stop();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <div className="space-y-2">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className={styles.video}
          />
        </div>

        <div className="space-y-2">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={styles.video}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <Button
          onClick={handleStart}
          disabled={isConnected}
          className={`${styles.button} ${styles.microphone}`}
        >
          Microphone
        </Button>

        <Button
          onClick={handleCall}
          disabled={!canCall}
          className={`${styles.button} ${styles.camera}`}
        >
          Camera
        </Button>

        <Button
          onClick={handleCall}
          disabled={!canCall}
          className={`${styles.button} ${styles.disconnect}`}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};
