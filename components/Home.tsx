import type { RootStackParamList } from "../App"
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Button, TextInput } from "react-native"
import React from "react";
import globalColors from '../global/colors'
import CustomTextInput from "./CustomTextInput";


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>


const Home = ({ navigation }: Props): JSX.Element => {

    const [roomId, setRoomId] = React.useState("")
    const [username, setUsername] = React.useState("")

    const roomIdRef = React.useRef<TextInput>(null)

    const handleSubmit = () => navigation.replace('Room', { roomId, username })

    return (
        <View style={styles.container}>
            <CustomTextInput
                label="Username"
                required
                value={username}
                onChangeText={setUsername}
                nextInput={roomIdRef}
                returnKeyType='next'
            />
            <CustomTextInput
                label="Room ID"
                required
                value={roomId}
                onChangeText={setRoomId}
                inputRef={roomIdRef}
                handleSubmit={handleSubmit}
            />
            <Button title="Join Room" onPress={handleSubmit} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.dark,
        justifyContent: "center",
        padding: 12,
    },
    text: {
        color: globalColors.light
    },
});


export default Home;
