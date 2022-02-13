import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home'
import Room from './components/Room'
import Test from './components/Test'
import type { ListItem } from './components/Room'


export type RootStackParamList = {
    Home: undefined;
    Room: { roomId: string, username: string }
    Test: undefined
    ItemDetail: { item: ListItem }
}

const Root = createNativeStackNavigator<RootStackParamList>()

export default function App() {
    return (
        <NavigationContainer>
            <Root.Navigator>
                <Root.Screen name="Home" component={Home} />
                <Root.Screen options={{
                    headerShown: false
                }} name="Room" component={Room} />
                <Root.Screen name="Test" component={Test} />
            </Root.Navigator>
        </NavigationContainer>
    );
}
