import { View, TextFieldRef } from 'react-native-ui-lib';
import { ActivityIndicator, ScrollView, TextInput } from 'react-native';

import { Actions } from '../actions/Actions';
import { styles } from './styles';
import { useUI } from '@/ctx/UIProvider';
import { useRecordVoiceCtx } from '@/ctx/RecordVoiceProvider';
import { useChatGPTCtx } from '@/ctx/ChatGPTProvider';
import { PromptRecording } from './subcomponents/promptRecording';
import { useRef } from 'react';
import { PromptSuggestions } from './subcomponents/promptSuggestions/PromptSuggestions';
import { useTranslation } from '@/hooks/useTranslation';

const noop = () => {};

export const Prompt = () => {
  const { setPrompt, prompt, loading, submitting } = useChatGPTCtx();
  const inputRef = useRef<TextFieldRef>(null);
  const { t } = useTranslation();
  const { isRecording } = useRecordVoiceCtx();
  const { setIsWritingPrompt, isWritingPrompt } = useUI();

  const handleSuggestionSelect = (suggestion: string) => {
    setPrompt(suggestion);
    inputRef.current?.focus();
  };

  return (
    <>
      {isWritingPrompt && prompt.length > 0 ? <PromptSuggestions onSelectSuggestion={handleSuggestionSelect} /> : null}
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
        <View style={styles.containerInput}>
          <View>
            <TextInput
              ref={inputRef}
              placeholder={!isRecording && !submitting ? t('logYourMeal') : ''}
              onChangeText={!loading ? setPrompt : noop}
              value={prompt}
              onFocus={() => {
                setIsWritingPrompt(true);
              }}
              onBlur={() => {
                setIsWritingPrompt(false);
              }}
              maxLength={180}
              autoFocus
              multiline
              style={[styles.input, isRecording ? { paddingLeft: 350 } : {}]}
            />
            {isRecording ? (
              <View style={styles.promptRecordingContainer}>
                <PromptRecording />
              </View>
            ) : null}
            {submitting ? (
              <View style={{ position: 'absolute', right: 20, top: 25 }}>
                <ActivityIndicator />
              </View>
            ) : (
              <View style={styles.actionsContainer}>
                <Actions prompt={prompt} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
