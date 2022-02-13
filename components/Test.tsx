
import type { RootStackParamList } from "../App"
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Button } from "react-native"

type Props = NativeStackScreenProps<RootStackParamList, 'Test'>

const Home = ({ navigation }: Props): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text>Test Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Home;
