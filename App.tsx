import { NativeModules, Platform, SafeAreaView } from 'react-native';
import Router from './src/Router';
import { Provider } from 'react-redux';
import { store } from './src/core/store/store';
import { AuthProvider } from './src/provider/AuthProvider';
import { NotifProvider } from './src/provider/NotifProvider';
import { NavigationContainer } from '@react-navigation/native';
import { TimeProvider } from './src/provider/TimeProvider';
import { FavoritesProvider } from './src/provider/FavoritesProvider';

const { StatusBarManager } = NativeModules;

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS !== 'android' ? StatusBarManager.HEIGHT : 0,
      }}>
        <NavigationContainer>
          <TimeProvider>
            <NotifProvider>
              <AuthProvider>
                <FavoritesProvider>
                  <Router />
                </FavoritesProvider>
              </AuthProvider>
            </NotifProvider>
          </TimeProvider>
        </NavigationContainer>

      </SafeAreaView>

    </Provider>
  );
}
