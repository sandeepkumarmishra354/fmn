import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenFullNews from "../ui/screen/stack/ScreenFullNews";
import { IArticle } from "../types";
import { BottomTabNavigator, TabScreens } from './tab';
import { Title } from '../ui/component/Title';

export enum StackScreens {
    HOME = "Home",
    FULL_NEWS = "Full-News"
}

type StackScreenParams = {
    [StackScreens.HOME]: undefined,
    [StackScreens.FULL_NEWS]: IArticle
}

// these are type inference for navigation (vs code will show suggestions)
export interface StackNavProps<S extends StackScreens> {
    navigation: NativeStackNavigationProp<StackScreenParams, S>,
    route: RouteProp<StackScreenParams, S>,
}
export type StackNavigationType<S extends StackScreens> = NativeStackNavigationProp<StackScreenParams, S>;

const Stack = createNativeStackNavigator<StackScreenParams>();

export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={StackScreens.HOME}
                screenOptions={{
                    headerTitle: props => (<Title style={{ color: props.tintColor }}>{props.children}</Title>),
                    headerTintColor: "#242B2E"
                }}>
                <Stack.Screen
                    name={StackScreens.HOME}
                    component={BottomTabNavigator}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name={StackScreens.FULL_NEWS}
                    component={ScreenFullNews} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export type { TabScreens }