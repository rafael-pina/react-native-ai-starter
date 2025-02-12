import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { Audio } from 'expo-av';
import { useRecordVoice } from '@/hooks/useRecordVoice';

export const RecordVoiceContext = createContext({
  recording: undefined,
  uri: undefined,
  isRecording: false,
  startRecording: async () => {},
  stopRecording: async () => {},
  recordingDuration: 0,
} as UseRecordVoiceCtxType);

type UseRecordVoiceCtxType = {
  recording: Audio.Recording | undefined;
  uri: string | undefined;
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null | undefined>;
  recordingDuration: number;
};

interface RecordVoiceProviderProps {
  children: ReactNode;
}

export const RecordVoiceProvider: FC<RecordVoiceProviderProps> = ({ children }) => {
  const { recording, uri, isRecording, startRecording, stopRecording, recordingDuration } = useRecordVoice();

  const value = useMemo(
    () => ({ recording, uri, isRecording, startRecording, stopRecording, recordingDuration }),
    [recording, uri, isRecording, startRecording, stopRecording, recordingDuration],
  );

  return <RecordVoiceContext.Provider value={value}>{children}</RecordVoiceContext.Provider>;
};

export const useRecordVoiceCtx = (): UseRecordVoiceCtxType => useContext(RecordVoiceContext);
