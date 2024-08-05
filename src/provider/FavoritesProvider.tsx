import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useGetFavoriteGamesQuery, useGetMeQuery, useUpdateNotifMutation } from '../core/store/api/auth.api';
import { useActions } from '../core/hooks/useActions';
import { NotifContext } from './NotifProvider';
import { NavigationProp, ParamListBase, useNavigation, CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Game } from '../core/types/game';
import { League } from '../core/types/league';

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: undefined, 
  isLoading: false,
});

interface FavoritesContextProps {
  favorites: {
    league: League;
    game: Game;
}[] | undefined, 
  isLoading: boolean,
}



export const FavoritesProvider = ({ children }: PropsWithChildren) => {
 
  const { data: favorites, isLoading } = useGetFavoriteGamesQuery(undefined, { pollingInterval: 10000 })

  return (
    <FavoritesContext.Provider value={{ favorites, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};