import { useState, useEffect, useRef, PropsWithChildren, createContext } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useGetMeQuery, useGetNotificationsQuery, useUpdateNotifMutation } from '../core/store/api/auth.api';
import { useStoreBy } from '../core/hooks/useStoreBy';
import { AuthStore } from '../core/store/auth/auth.store';
import { Notification } from '../core/types/notification';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}




export const NotifContext = createContext<NotifContextProps>({
  expoPushToken: "",
  notificatorsData: undefined,
  isLoadingNotif: false
});

interface NotifContextProps {
  expoPushToken: string,
  notificatorsData: Notification[] | undefined,
  isLoadingNotif: boolean
}

export const NotifProvider = ({ children }: PropsWithChildren) => {

  const { data: notificatorsData, isLoading: isLoadingNotif } = useGetNotificationsQuery(undefined, {
    pollingInterval: 5000
})

  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const { token } = useStoreBy<AuthStore>("auth")
  const [updateExpoToken] = useUpdateNotifMutation()

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data as { league: any, gameUrl: string, gameInfo: any }

      console.log(data)
    });

    

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

 
  useEffect(()=>{
      updateExpoToken(expoPushToken)
  }, [token, expoPushToken])

  useEffect(()=>{
    const intervalId = setInterval(() => {
      updateExpoToken(expoPushToken)
    }, 10000);
  
    return () => clearInterval(intervalId);

}, [expoPushToken])

  

  return (
    <NotifContext.Provider value={{expoPushToken, notificatorsData, isLoadingNotif}}>
      {children}
    </NotifContext.Provider>
  );
};