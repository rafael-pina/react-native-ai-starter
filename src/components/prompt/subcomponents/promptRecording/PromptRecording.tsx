import { View, Text } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRecordVoiceCtx } from '@/ctx/RecordVoiceProvider';
import { styles } from './styles';

export const PromptRecording = () => {
  const { recordingDuration } = useRecordVoiceCtx();
  const slideTextPosition = useRef(new Animated.Value(100)).current;
  const micColorAnimation = useRef(new Animated.Value(0)).current;

  const formattedDuration = `${Math.floor(recordingDuration / 60)}:${
    recordingDuration % 60 < 10 ? `0${recordingDuration % 60}` : recordingDuration % 60
  }`;

  useEffect(() => {
    Animated.timing(slideTextPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      slideTextPosition.setValue(100);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(micColorAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(micColorAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const micColor = micColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['black', 'red'],
  });

  return (
    <View style={styles.microphoneContainer}>
      <View style={styles.inputTextContainer}>
        <Animated.Text style={{ color: micColor }}>
          <MaterialIcons name="mic" size={24} />
        </Animated.Text>
        <Text style={[styles.inputText, { marginLeft: 10 }]}>{formattedDuration}</Text>
        <MaterialIcons name="chevron-left" size={24} color="black" />
        <Animated.Text
          style={[
            styles.inputText,
            {
              transform: [{ translateX: slideTextPosition }],
            },
          ]}
        >
          Slide to cancel
        </Animated.Text>
      </View>
    </View>
  );
};
