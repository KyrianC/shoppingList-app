import React from "react"
import { StyleSheet, Text, View } from "react-native"
import globalColors from '../global/colors'
import AddItemForm from "./AddItemForm"
import BottomModal from "./BottomModal"

export type FormItem = {
    name: string
    description?: string
    quantity: number
    priority: number
}

type Props = {
    show: boolean
    closeModal: () => void
    addItem: (item: FormItem) => void
}

const baseItem = {
    name: '',
    description: undefined,
    quantity: 1,
    priority: 1,
}

const AddItemModal = ({ show, closeModal, addItem }: Props): JSX.Element => {

    const [item, setItem] = React.useState<FormItem>(baseItem)

    const handleChange = (val: string, name: string) => {
        setItem(prev => ({
            ...prev,
            [name]: val
        }))
    }

    const handleSubmit = () => {
        setItem(baseItem)
        addItem(item)
    }

    return (
        <BottomModal show={show} handleClose={closeModal}>
            <View>
                <Text style={styles.header}>Add an Item</Text>
                <AddItemForm item={item} handleChange={handleChange} handleSubmit={handleSubmit} />
                <Text>{item.name}:{item.description}:{item.quantity}:{item.priority}</Text>
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
