import React from "react"
import { Modal, StyleSheet, Text, View, Pressable, KeyboardAvoidingView } from "react-native"
import { Socket } from "socket.io-client"
import globalColors from '../global/colors'
import AddItemForm from "./AddItemForm"
import BottomModal from "./BottomModal"

export type Item = {
    name: string
    description?: string
    quantity: number
    priority: number
}

type Props = {
    show: boolean
    closeModal: () => void
    socket: Socket | null
}

const baseItem = {
    name: '',
    description: undefined,
    quantity: 1,
    priority: 1,
}

const AddItemModal = ({ show, closeModal }: Props): JSX.Element => {

    const [item, setItem] = React.useState<Item>(baseItem)

    const handleChange = (val: string, name: string) => {
        setItem(prev => ({
            ...prev,
            [name]: val
        }))
    }

    const handleSubmit = () => {
        console.log("New Item added: ", item)
        setItem(baseItem)
    }

    return (
        <BottomModal show={show} handleClose={closeModal}>
            <View>
                <Text style={styles.header}>Add an Item</Text>
                <AddItemForm item={item} handleChange={handleChange} handleSubmit={handleSubmit} />
            </View>
        </BottomModal>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: globalColors.light
    },
    text: {
        color: globalColors.light
    }
})

export default AddItemModal
