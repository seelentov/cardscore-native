import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token || "");
    };

    fetchToken();
  }, []);

  return token;
};