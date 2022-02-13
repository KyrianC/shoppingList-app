import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Item } from "./AddItemModal"
import globalColors from '../global/colors'
import CustomTextInput from "./CustomTextInput"
import React from "react"

type Props = {
    item: Item
    handleChange: (val: string, name: string) => void
    handleSubmit: () => void
}

const AddItemForm = ({ item, handleChange, handleSubmit }: Props): JSX.Element => {

    // HACK must be better way to focus on next input after submitEditing
    const nameRef = React.useRef<TextInput>(null)
    const descriptionRef = React.useRef<TextInput>(null)
    const quantityRef = React.useRef<TextInput>(null)
    const priorityRef = React.useRef<TextInput>(null)

    return (
        <ScrollView>
            <CustomTextInput
                label="Name"
                required={true}
                onChangeText={(val) => handleChange(val, 'name')}
                placeholder="Eg: Banana"
                returnKeyType='next'
                inputRef={nameRef}
                nextInput={descriptionRef}
            />
            <CustomTextInput
                label="Description"
                required={false}
                onChangeText={(val) => handleChange(val, 'description')}
                placeholder="Eg: Take only small ones"
                returnKeyType='next'
                inputRef={descriptionRef}
                nextInput={quantityRef}
            />
            <CustomTextInput
                label="Quantity"
                required={true}
                onChangeText={(val) => handleChange(val, 'quantity')}
                value={item.quantity.toString()}
                returnKeyType='next'
                inputRef={quantityRef}
                nextInput={priorityRef}
            />
            <CustomTextInput
                label="Priority"
                required={true}
                onChangeText={(val) => handleChange(val, 'priority')}
                value={item.priority.toString()}
                inputRef={priorityRef}
                nextInput={nameRef}
                handleSubmit={handleSubmit}
            />

            <Pressable style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.submitText}>submit</Text>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        color: globalColors.light,
        fontSize: 20,
        marginTop: 16,
        marginBottom: 8,
    },
    submit: {
        backgroundColor: globalColors.accentuated,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        padding: 10
    },
    submitText: {
        color: globalColors.dark,
        fontSize: 20,
        fontWeight: '700'
    }

})

export default AddItemForm
