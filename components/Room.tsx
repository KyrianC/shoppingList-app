import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import io, { Socket } from 'socket.io-client'
import Item from './Item'
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App"
import { useFocusEffect } from "@react-navigation/native";
import globalColors from '../global/colors'
import ItemDetailModal from "./ItemDetailModal";
import AddItemModal, { FormItem } from "./AddItemModal";
import SettingsModal from "./SettingsModal";

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

    const [itemList, setItemList] = React.useState<ListItem[]>([]);
    const [socket, setSocket] = React.useState<Socket | null>(null)

    const [showItemModal, setShowItemModal] = React.useState(false)
    const [itemModalItem, setItemModalItem] = React.useState<ListItem | null>(null)
    const [showAddItemModal, setShowAddItemModal] = React.useState(false)
    const [showSettingsModal, setShowSettingsModal] = React.useState(false)

    // Add setting Btn on StatusBar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => setShowSettingsModal(true)}>
                    <Image source={require('../assets/more.png')} />
                </Pressable>
            ),
        });
    }, [navigation]);

    // init and cose socket connection when navigating
    useFocusEffect(
        React.useCallback(() => {
            setSocket(io('http://192.168.1.128:8000', { transports: ['websocket'], query: { roomId, username } }))
            return () => {
                socket?.close()
            }
        }, [navigation])
    )
    // listen to socket events
    React.useEffect(() => {
        socket?.on('joinRoom', (items: ListItem[]) => {
            deleteOldItem(items)
            setItemList(items)
        })
        socket?.on('addItem', (items: ListItem[]) => {
            console.log('Item added successfully', items)
            setItemList(items)
        })
        socket?.on('toggleItem', (items: ListItem[]) => {
            setItemList(items)
        })
        socket?.on('deleteItem', (items: ListItem[]) => {
            setItemList(items)
        })
    }, [socket, itemList])


    // Items methods
    const addItem = (item: FormItem) => socket?.emit('addItem', item)

    const toggleDone = (id: string) => socket?.emit('toggleItem', id)

    const itemisDoneAndTooOld = (item: ListItem): boolean => {
        if (!item.done || !item.updated) {
            return false
        }
        const itemLastUpdated = new Date(item.updated).getTime()
        const threedaysAgo = (Date.now() - (1000 * 60 * 60 * 24 * 3))
        return threedaysAgo > itemLastUpdated
    }

    const deleteItem = (item: ListItem) => {
        Alert.alert(
            `Delete ${item.name}`,
            "Do you really want to delete this Item?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        socket?.emit('deleteItem', item._id)
                        closeItemModal()
                    }
                }
            ],
            { cancelable: true }
        )
    }

    const deleteOldItem = (items: ListItem[]) => {
        items.forEach(i => (
            itemisDoneAndTooOld(i) && socket?.emit('deleteItem', i._id)
        ))
    }


    // ItemList methods
    const filteredList = () => {
        const oneDayAgo = (Date.now() - (1000 * 60 * 60 * 24))
        const active = itemList.filter(item => (
            new Date(item.updated).getTime() > oneDayAgo
        ))
        const inactive = itemList.filter(item => (
            item.done && new Date(item.updated).getTime() < oneDayAgo
        ))
        return { active, inactive }
    }


    // Modals methods
    const setItemModal = (item: ListItem) => {
        setShowItemModal(true)
        setItemModalItem(item)
    }
    const closeItemModal = () => {
        setShowItemModal(false)
        setItemModalItem(null)
    }
    const toggleAddItemModal = () => setShowAddItemModal(!showAddItemModal)


    if (!socket) {
        return <Text>...waitin connection</Text>
    }
    return (
        <View style={styles.container}>

            {/* Item lists */}
            <ScrollView style={{ paddingTop: 15 }}>

                {/* Active items */}
                {filteredList().active.map(item => (
                    <Item
                        key={item._id}
                        item={item}
                        toggleDone={toggleDone}
                        setModal={setItemModal}
                    />
                ))}

                {/* Inactive Items if any */}
                {filteredList().inactive.length > 0 && (
                    <Text style={styles.inactive}>Done this week</Text>
                )}

                {filteredList().inactive.map(item => (
                    <Item
                        key={item._id}
                        item={item}
                        toggleDone={toggleDone}
                        setModal={setItemModal}
                    />
                ))}
            </ScrollView>

            {/* Add Item Button */}
            <View style={styles.addItemSection}>
                <Pressable style={styles.button} onPress={toggleAddItemModal} >
                    <Text>Add Item</Text>
                </Pressable>
            </View>

            {/* Modal */}
            <ItemDetailModal
                show={showItemModal}
                item={itemModalItem}
                closeModal={closeItemModal}
                deleteItem={deleteItem}
            />
            <AddItemModal
                addItem={addItem}
                show={showAddItemModal}
                closeModal={toggleAddItemModal}
            />
            <SettingsModal
                show={showSettingsModal}
                handleClose={() => setShowSettingsModal(false)}
                navigation={navigation}
                username={username}
                roomId={roomId}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.dark,
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
    },
    inactive: {
        color: globalColors.light,
        fontSize: 18,
        padding: 15
    },
    addItemSection: {
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: globalColors.midDark
    }
});


export default Room;
