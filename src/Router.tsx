import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/Profile/ProfileScreen';
import { StatusBar } from 'react-native';
import theme from './core/config/theme';
import SettingsScreen from './screens/Settings/SettingsScreen';
import FavoritesScreen from './screens/Favorites/FavoritesScreen';
import LeagueScreen from './screens/League/LeagueScreen';
import LoginScreen from './screens/Login/LoginScreen';
import SignUpScreen from './screens/Login/SignUpScreen';
import GameScreen from './screens/Game/GameScreen';
import { League } from './core/types/league';
import PlayerScreen from './screens/Player/PlayerScreen';
import InfosScreen from './screens/Infos/InfosScreen';
import InfoScreen from './screens/Infos/InfoScreen';
import OnlyInfosScreen from './screens/Infos/OnlyInfosScreen';
import OnlyInfoScreen from './screens/Infos/OnlyInfoScreen';
import { Game } from './core/types/game';
import RegsScreen from './screens/Infos/RegsScreen';
import HomeScreen from './screens/Home/HomeScreen';
import LoadingScreen from './screens/Loading/LoadingScreen';
import React from 'react';

export type RootStackParamList = {
    Loading: undefined;
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
    Favorites: undefined | { hot: boolean };
    Login: undefined;
    SignUp: undefined;
    Code: {
        number: string
    };
    Game: {
        gameUrl: string,
        league: League,
        gameInfo: Game
    }
    League: {
        leagueUrl: string,
        leagueName: string
    },
    Player: {
        playerUrl: string,
        league: League
    },
    Infos: undefined,
    OnlyInfos: undefined,
    Info: {
        title: string,
        text: string
    },
    OnlyInfo: {
        title: string,
        text: string
    },
    Regs: undefined
};

const defaultOptions = {
    title: 'Cardscore',
    headerShown: false,

}

const Stack = createNativeStackNavigator<RootStackParamList>();




export default function Router() {
    return (

        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Player"
                    component={PlayerScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Infos"
                    component={InfosScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="OnlyInfos"
                    component={OnlyInfosScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="OnlyInfo"
                    component={OnlyInfoScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Info"
                    component={InfoScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={defaultOptions}
                />

                <Stack.Screen
                    name="League"
                    component={LeagueScreen}
                    options={defaultOptions}
                />

                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Regs"
                    component={RegsScreen}
                    options={defaultOptions}
                />
            </Stack.Navigator>
            <StatusBar
                animated={false}
                backgroundColor={theme.text}
            />
        </>
    );
}
