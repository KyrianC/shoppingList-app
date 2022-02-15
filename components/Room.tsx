import React from "react";
import { Button, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import io, { Socket } from 'socket.io-client'
import Item from './Item'
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App"
import { useFocusEffect } from "@react-navigation/native";
import globalColors from '../global/colors'
import ItemDetailModal from "./ItemDetailModal";
import AddItemModal from "./AddItemModal";

type message = string

type Props = NativeStackScreenProps<RootStackParamList, 'Room'>

export interface ListItem {
    _id: string;
    name: string;
    description?: string;
    priority: 1 | 2 | 3;
    quantity: number;
    done: boolean;
    created: string;
    updated: string;
}

interface User {
    name: string
    isConnected: boolean
}

interface Room {
    items: ListItem[];
    users: User[]
}

const Room = ({ route, navigation }: Props): JSX.Element => {

    const { roomId, username } = route.params;

    const [msgList, setMsgList] = React.useState<ListItem[]>([]);
    const [socket, setSocket] = React.useState<Socket | null>(null)

    const [showItemModal, setShowItemModal] = React.useState(false)
    const [itemModalItem, setItemModalItem] = React.useState<ListItem | null>(null)
    const [showAddItemModal, setShowAddItemModal] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            setSocket(io('http://192.168.1.128:8000', { transports: ['websocket'], query: { roomId, username } }))
            return () => {
                socket?.close()
            }
        }, [navigation])
    )

    const setItemModal = (item: ListItem) => {
        setShowItemModal(true)
        setItemModalItem(item)
    }

    const closeItemModal = () => {
        setShowItemModal(false)
        setItemModalItem(null)
    }

    const toggleAddItemModal = () => {
        setShowAddItemModal(!showAddItemModal)
    }


    React.useEffect(() => {
        socket?.on('joinRoom', (room: Room) => {
            deleteOldItem(room.items)
            setMsgList(room.items)
        })
        socket?.on('addItem', (items: ListItem[]) => {
            console.log('Item added successfully', items)
            setMsgList(items)
        })
        socket?.on('toggleItem', (items: ListItem[]) => {
            setMsgList(items)
        })
    }, [socket, msgList])

    const deleteOldItem = (items: ListItem[]) => {
        items.forEach(i => {
            if (itemisDoneAndTooOld(i)) {
                console.log('deleting item ', i.name)
                socket?.emit('deleteItem', i._id)
            }
        })
    }

    const addItem = (item: any) => {
        console.log('add Item ', item.name)
        socket?.emit('addItem', item)
    }

    const itemisDoneAndTooOld = (item: ListItem): boolean => {
        if (!item.done || !item.updated) {
            return false
        }
        const itemLastUpdated = new Date(item.updated).getTime()
        const threedaysAgo = (Date.now() - (1000 * 60 * 60 * 24 * 3))
        return threedaysAgo > itemLastUpdated
    }

    const toggleDone = (id: string) => {
        socket?.emit('toggleItem', id)
        console.log('toggle done')
    }

    if (!socket) {
        return <Text>...waitin connection</Text>
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={msgList}
                renderItem={({ item }) => (
                    <Item
                        key={item._id}
                        item={item}
                        toggleDone={toggleDone}
                        setModal={setItemModal}
                    />)} />
            <Pressable style={styles.button} onPress={toggleAddItemModal} >
                <Text>Add Item</Text>
            </Pressable>
            <ItemDetailModal show={showItemModal} item={itemModalItem} closeModal={closeItemModal} />
            <AddItemModal addItem={addItem} show={showAddItemModal} closeModal={toggleAddItemModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.dark,
        justifyContent: "center",
        paddingTop: 40,
    },
    item: {
        fontSize: 16,
        margin: 12,
    },
    button: {
        borderRadius: 15,
        backgroundColor: globalColors.accentuated,
        margin: 20,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        margin: 40,
        height: 35
    }
});


export default Room;
