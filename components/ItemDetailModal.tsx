import { Text, StyleSheet, View } from "react-native"
import { ListItem } from "./Room"
import globalColors from '../global/colors'
import BottomModal from "./BottomModal"

type Props = {
    item: ListItem | null;
    closeModal: () => void
    show: boolean
}

const ItemDetailModal = ({ show, item, closeModal }: Props): JSX.Element => {

    const priorities = {
        1: 'normal',
        2: 'necessity',
        3: 'important'
    }

    if (item) {
        return (
            <BottomModal handleClose={closeModal} show={show}>
                <View>
                    <Text style={styles.header}>{item?.name}</Text>
                    <Text>quantity: {item?.quantity}</Text>
                    <Text>Priority: {priorities[item.priority]}</Text>
                    <Text>Written by: kyrian</Text>
                    {item.description && (
                        <Text>{item?.description}</Text>
                    )}
                </View>
            </BottomModal>
        )
    } else {
        return (
            <BottomModal handleClose={closeModal} show={show}>
                <Text>An Error Occured, no item selected</Text>
            </BottomModal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: globalColors.midDark,
        borderRadius: 20,

    },
    header: {
        textAlign: 'center',
        color: globalColors.light,
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeBtn: {
        color: globalColors.light,
        position: 'absolute',
        top: 2,
        right: 2,
    }
})

export default ItemDetailModal
