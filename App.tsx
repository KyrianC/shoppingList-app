import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home'
import Room from './components/Room'
import Test from './components/Test'
import Settings from './components/Settings'
import globalColors from "./global/colors";


export type RootStackParamList = {
    Home: undefined;
    Room: { roomId: string, username: string }
    Test: undefined
    Settings: { roomId: string, username: string }
    CreateRoom: undefined
    InviteMember: { roomId: string, username: string }
}

const Root = createNativeStackNavigator<RootStackParamList>()


export default function App() {
    return (
        <NavigationContainer>
            <Root.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: globalColors.midDark,
                },
                headerTintColor: globalColors.light,
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
                <Root.Screen name="Home" component={Home} />
                <Root.Screen name="Room" component={Room} />
                <Root.Screen name="Test" component={Test} />
                <Root.Screen name="Settings" component={Settings} />
            </Root.Navigator>
        </NavigationContainer>
    );
}
