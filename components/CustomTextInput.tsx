import React from "react"
import { StyleSheet, View, Text, TextInput, TextInputProps } from "react-native"
import globalColors from '../global/colors'

type Props = TextInputProps & {
    label?: string
    required: boolean
    inputRef?: React.RefObject<TextInput>
    nextInput?: React.RefObject<TextInput>
    handleSubmit?: () => void
}

const CustomTextInput = ({ label, required, nextInput, inputRef, handleSubmit, ...props }: Props): JSX.Element => {

    const [focused, setFocus] = React.useState(false)

    const handleFocus = () => { setFocus(true) }
    const handleBlur = () => { setFocus(false) }
    const handleNext = (ref: typeof nextInput) => {
        if (handleSubmit) {
            handleSubmit()
        } else if (nextInput && ref) {
            ref.current?.focus()
        }
    }

    return (
        <View>
            {/* Label */}
            {label && (
                <Text style={styles.label}>
                    {label}: {required && (
                        <Text style={styles.required}>*</Text>
                    )}
                </Text>
            )}

            {/* Input */}
            <TextInput
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={[styles.input, focused && styles.focused]}
                placeholderTextColor={globalColors.midGray}
                ref={inputRef && inputRef}
                onSubmitEditing={() => handleNext(nextInput)}
                blurOnSubmit={nextInput && false}
                {...props}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    label: {
        color: globalColors.light,
        fontSize: 20,
        marginTop: 16,
        marginBottom: 8,
    },
    required: {
        color: globalColors.maroon,
    },
    input: {
        fontSize: 18,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: globalColors.gray,
        height: 45,
        borderRadius: 15,
        color: globalColors.light
    },
    focused: {
        borderWidth: 1,
        borderColor: globalColors.accentuated,
    }
})

export default CustomTextInput
