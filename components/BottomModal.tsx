import { StyleSheet, Modal, View, ModalProps, Pressable, Text } from "react-native"
import globalColors from '../global/colors'

type Props = ModalProps & {
    show: boolean
    children: JSX.Element
    handleClose: () => void
}

const BottomModal = ({ children, show, handleClose, ...props }: Props): JSX.Element => {
    return (
        <Modal
            transparent
            visible={show}
            animationType='slide'
            onRequestClose={handleClose}
            {...props}
        >
            {/* semi transparent background behind the popup */}
            <Modal
                animationType='fade'
                transparent visible={show}
                onRequestClose={handleClose} >
                <Pressable onPress={handleClose} style={styles.background} />
            </Modal>

            <View style={styles.container}>
                <Pressable onPress={handleClose} style={styles.close}>
                    <Text style={styles.text}>Close</Text>
                </Pressable>
                {children}
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: globalColors.midDark,
        borderRadius: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    close: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    text: {
        color: globalColors.light
    }
})
export default BottomModal
