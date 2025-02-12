import { ScrollView, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { getGroupMealsByDate } from '@/features/mealHistory/utils';
import { useProgressTrackerCtx } from '@/ctx/ProgressTrackerProvider';
import { useEffect, useRef } from 'react';
import { getRecentMealSuggestions } from './utils';

type Props = {
  onSelectSuggestion: (suggestion: string) => void;
};

export const PromptSuggestions = ({ onSelectSuggestion }: Props) => {
  const { meals } = useProgressTrackerCtx();
  const groupedMeals = getGroupMealsByDate(meals);
  const scrollViewRef = useRef<ScrollView>(null);

  const suggestions = getRecentMealSuggestions(groupedMeals);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: 35, animated: true });
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: 15, animated: true });
      }, 300);
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => onSelectSuggestion(suggestion)}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
  },
  suggestionItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 5,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});
