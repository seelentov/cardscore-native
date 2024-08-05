import { createContext, PropsWithChildren } from 'react';

export const TimeContext = createContext<TimeContextProps>({

});

interface TimeContextProps {

}



export const TimeProvider = ({ children }: PropsWithChildren) => {
  // const [isUsingNetworkTime, setIsUsingNetworkTime] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     if (state.isInternetReachable) {
  //       if (state?.details?.) {
  //         setIsUsingNetworkTime(true);
  //       } else {
  //         setIsUsingNetworkTime(false);
  //       }
  //     } else {
  //       setIsUsingNetworkTime(false);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);
  
  // useEffect(() => {
  //   if (!isUsingNetworkTime) {
  //     Alert.alert(
  //       'Предупреждение',
  //       'Пожалуйста, включите опцию "Использовать автоматическое время сети" в настройках вашего устройства для корректной работы приложения.',
  //       [{ text: 'OK' }],
  //     );
  //   }
  // }, [isUsingNetworkTime]);

  return (
    <TimeContext.Provider value={{ }}>
      {children}
    </TimeContext.Provider>
  );
};