import { Modal, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native"
import globalColors from "../global/colors"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App"

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Room'>
    show: boolean
    handleClose: () => void
    roomId: string
    username: string
}

type link = {
    title: string,
    to: keyof RootStackParamList
    params?: { roomId: string, username: string }
}

const SettingsModal = ({ navigation, handleClose, show, roomId, username }: Props): JSX.Element => {

    const links: link[] = [
        { title: 'Settings', to: 'Settings', params: { roomId, username } },
        { title: 'Quit Room', to: 'Home' },
        { title: 'Invite', to: 'InviteMember', params: { roomId, username } }
    ]

    const handleNavigation = (link: link) => {
        handleClose()
        navigation.navigate(link.to, link.params)
    }


    return (
        <Modal onRequestClose={handleClose} animationType='fade' visible={show} transparent>
            <Modal
                transparent visible={show}
                onRequestClose={handleClose} >
                <Pressable onPress={handleClose} style={styles.background} />
            </Modal>
            <View style={styles.popup}>
                {links.map(link => (
                    <TouchableOpacity onPress={() => handleNavigation(link)}>
                        <Text style={styles.link}>{link.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    popup: {
        position: "absolute",
        top: 50,
        right: 15,
        padding: 20,
        backgroundColor: globalColors.dark,
        borderRadius: 15,
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    link: {
        fontSize: 18,
        color: globalColors.light,
        paddingVertical: 10
    }
})

export default SettingsModal
