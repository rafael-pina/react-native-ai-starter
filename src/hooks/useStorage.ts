import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export const useStorage = (key: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(key);
        if (!storedData) {
          return;
        }

        setData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error reading data from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key]);

  const setItem = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setData(value);
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setData(null);
    } catch (error) {
      console.error("Error removing data from AsyncStorage:", error);
    }
  };

  return { data, isLoading, setItem, removeItem };
};
