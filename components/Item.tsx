import { Text, View, Pressable, StyleSheet, Image } from "react-native"
import type { ListItem } from './Room'
import globalColors, { usePriority } from '../global/colors'
import React from "react"


type props = {
    item: ListItem
    toggleDone: (item: string) => void
    setModal: (item: ListItem) => void
}

const Item = ({ item, toggleDone, setModal }: props): JSX.Element => {

    const { color } = usePriority(item.priority)

    return (
        <View style={[styles.item, item.done && styles.itemDone]}>
            <Pressable style={styles.itemMain} onPress={() => toggleDone(item._id)}>
                <View style={[styles.icon, item.done ? styles.iconsDone : { borderColor: color }]}>
                    {item.done && (
                        <Image style={styles.check} source={require('../assets/check.png')}></Image>
                    )}
                </View>
                <Text style={[styles.text, item.done && styles.textDone]}>{item.name}  x{item.quantity}</Text>
            </Pressable>
            <Pressable onPress={() => setModal(item)}>
                <Text style={styles.detail}>Details</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: globalColors.gray,
        borderRadius: 15,
        marginBottom: 20,
        marginHorizontal: 15,
        padding: 10,
        height: 50,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    itemMain: {
        flex: 1,
        flexDirection: 'row',
    },
    itemDone: {
        backgroundColor: globalColors.midDark,
    },
    text: {
        color: globalColors.light,
        marginHorizontal: 10,
        fontSize: 16,
    },
    textDone: {
        textDecorationLine: 'line-through'
    },
    icon: {
        borderWidth: 2,
        borderColor: globalColors.accentuated,
        borderRadius: 99,
        height: 20,
        width: 20,
    },
    iconsDone: {
        borderColor: globalColors.green,
        backgroundColor: globalColors.green,
        alignItems: 'center',
        justifyContent: 'center',
    },
    check: {
        height: 12,
        width: 12,
    },
    detail: {
        color: globalColors.light,
        fontSize: 12,
    }
})

export default Item
