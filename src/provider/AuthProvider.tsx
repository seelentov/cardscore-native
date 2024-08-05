import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react';
import { useGetMeQuery, useUpdateNotifMutation } from '../core/store/api/auth.api';
import { useActions } from '../core/hooks/useActions';
import { NotifContext } from './NotifProvider';
import { NavigationProp, ParamListBase, useNavigation, CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isSubExist: true,
  isLoadingAuth: true,
  setIsAuthenticated: () => { },
  children: null,
  authorization: async (token: string) => { },
  logout: async () => { }
});

interface AuthContextProps {
  isAuthenticated: boolean;
  isSubExist: boolean;
  isLoadingAuth: boolean;
  setIsAuthenticated?: (isAuthenticated: boolean) => void;
  authorization: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  children: ReactNode;
}



export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSubExist, setIsSubExist] = useState<boolean>(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const { setToken } = useActions()

  const [checkSubInterval, setCheckSubInterval] = useState<number>(5000)

  const navigation: NavigationProp<ParamListBase> = useNavigation()

  const { data: meData, error: meError } = useGetMeQuery(undefined, {
    pollingInterval: 5000
});

  const navigateTo = (screen: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      })
    );
  }

  

  useEffect(() => {
    setIsLoadingAuth(true)

    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token') || "";
      if (token) {
        setToken(token)
        setIsAuthenticated(true);
        navigateTo("Home")
      }

      else{
        navigateTo("Login")
        
      }

    };

    checkAuth();
    setIsLoadingAuth(false)
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (meData) {
        const subscriptionDate = new Date(meData.subData);
        const currentDate = new Date();

        if (subscriptionDate < currentDate) {
          setIsSubExist(false);
          
          if(checkSubInterval === 5000){
            setCheckSubInterval(60000)
            navigateTo("OnlyInfos");
          }
          Alert.alert("Подписка истекла!", "Обратитесь по контактным данным для продления подписки")
          console.log("Sub: ERR!")
        } else {
          if(checkSubInterval === 60000){
            setCheckSubInterval(5000)
            navigateTo("Home");
          }

          setIsSubExist(true);
          console.log("Sub: OK!")
        }
      }
    }, checkSubInterval);

    return () => clearInterval(intervalId);
  }, [meData, checkSubInterval]);


  const authorization = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setToken(token)
    setIsAuthenticated(true);

  };

  const logout = async () => {
    await AsyncStorage.setItem('token', "");
    setToken("")
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authorization, logout, children, isSubExist, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};