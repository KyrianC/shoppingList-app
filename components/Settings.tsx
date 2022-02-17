import { View, Text, StyleSheet } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App"
import globalColors from "../global/colors";


type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

const Settings = ({ navigation, route }: Props): JSX.Element => {

    const { roomId, username } = route.params;

    return (
        <View style={styles.container}>
            <Text>List of users in the room</Text>
            <Text>Notifications</Text>
            <Text>Theme</Text>
            <Text>admin related settings:</Text>
            <Text>  - Ban people</Text>
            <Text>  - Delete Group</Text>
            <Text>  - Make a member admin</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.dark,
        height: '100%',
    }
})

export default Settings
