import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabScreenHome from "../../ui/screen/tab/TabScreenHome";
import TabScreenTimer from "../../ui/screen/tab/TabScreenTimer";
import { MyIcon } from "../../ui/component/MyIcon";

export enum TabScreens {
    HOME = "Tab-Home",
    TIMER = "Tab-Timer",
}

type TabScreenParams = {
    [TabScreens.HOME]: undefined,
    [TabScreens.TIMER]: undefined,
}

const Tab = createBottomTabNavigator<TabScreenParams>();

const TabIcon = (props: { focused: boolean, color: string, size: number, name: string }) => {
    return (
        <MyIcon size={props.size} color={props.color} name={props.name} />
    );
}

export const BottomTabNavigator = React.memo(() => {
    return (
        <Tab.Navigator
            initialRouteName={TabScreens.HOME}
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: { fontSize: 14 }
            }}>
            <Tab.Screen
                name={TabScreens.HOME}
                component={TabScreenHome}
                options={{
                    title: "Home",
                    tabBarIcon: props => <TabIcon {...props} name="home-outline" />
                }} />
            <Tab.Screen
                name={TabScreens.TIMER}
                component={TabScreenTimer}
                options={{
                    title: "Timer",
                    tabBarIcon: props => <TabIcon {...props} name="alarm-outline" />
                }} />
        </Tab.Navigator>
    );
});