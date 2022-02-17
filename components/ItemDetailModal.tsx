import { Text, StyleSheet, View, Pressable, Modal } from "react-native"
import { ListItem } from "./Room"
import globalColors, { usePriority } from '../global/colors'
import BottomModal from "./BottomModal"
import React from "react"

type Props = {
    item: ListItem | null;
    closeModal: () => void
    show: boolean
    deleteItem: (item: ListItem) => void
}

const ItemDetailModal = ({ show, item, closeModal, deleteItem }: Props): JSX.Element => {
    if (item) {

        const { color, text } = usePriority(item.priority)

        return (
            <BottomModal handleClose={closeModal} show={show}>
                <View>
                    <Text style={styles.header}>{item?.name}</Text>
                    <Text style={styles.text}>quantity: {item?.quantity}</Text>
                    <Text style={[styles.text, { color }]}>Priority: {text}</Text>
                    <Text style={styles.text}>Written by: kyrian</Text>
                    {item.description && (
                        <Text style={styles.text}>Description: {item?.description}</Text>
                    )}
                    <Pressable onPress={() => deleteItem(item)} style={styles.delete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
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
        marginBottom: 12,
    },
    text: {
        color: globalColors.light,
        marginVertical: 8,
        fontSize: 18,
    },
    delete: {
        borderRadius: 15,
        backgroundColor: globalColors.red,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    deleteText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default ItemDetailModal
