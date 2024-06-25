import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import colors from "../assets/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { ListItem, ScreenWidth } from "@rneui/base";
import { Toast, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui';
import supabase from "../supabaseClient";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(0);
  const [addingItemName, setAddingItemName] = useState("");
  const [addingItemQuantity, setAddingItemQuantity] = useState("");
  const renderBackdrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={2}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);
  const [listKey, setListKey] = useState<number>(0);

  interface StockItem {
    name: string;
    quantity: number;
  }
  const [stock, setStock] = useState<StockItem[]>([
    { name: "tuna", quantity: 1 },
    { name: "tortilia", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 1 },
    { name: "tuna", quantity: 6 },
  ]);
  let snapPoints: any[];
  if (stock.length < 11) {
    snapPoints = useMemo(() => ["25%", "50%", "70%", "90%"], []);
  } else {
      snapPoints = useMemo(
        () => [
          stock.length * 70,
          stock.length * 80,
          stock.length * 90,
          stock.length * 100,
        ],
        [stock.length]
      );
  }

  // *** FUNCTIONS ***

  const onPressAddManually = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };
  const onPressTakePhoto = () => {
    CurrentToast();
  };
  const openEditItemModal = (itemToEdit: StockItem) => {
    setEditingItem(itemToEdit);
    setUpdatedQuantity(itemToEdit.quantity);
    setModalVisible(true);
  };
  function openSettings() {
    alert("Settings clicked!");
  }
  const addItems = () => {
    const newItem: StockItem = {
        name: addingItemName,
        quantity: Number(addingItemQuantity)
    };
    if (newItem.name != "" && !isNaN(newItem.quantity)) {
        const updatedStock = [...stock, newItem];
        setStock(updatedStock);
        setListKey((prevKey) => prevKey + 1);
        setAddingItemName("");
        setAddingItemQuantity("");
    } else {
        alert("Please enter a valid item name and quantity.");
    }
  };
  const editItem = (itemToEdit: StockItem, updatedQuantity: number) => {
    const updatedStock = stock.map((item) =>
      item === itemToEdit ? { ...item, quantity: updatedQuantity } : item
    );
    setStock(updatedStock);
    setModalVisible(false);
    setListKey((prevKey) => prevKey + 1);
  };
  const removeItem = (itemToRemove: StockItem) => {
    const updatedStock = stock.filter((item) => item !== itemToRemove);
    setStock(updatedStock);
    setListKey((prevKey) => prevKey + 1);
  };
  const CurrentToast = () => {
    const currentToast = useToastState()
  
    if (!currentToast || currentToast.isHandledNatively) return null
    return (
      <Toast
        key={currentToast.id}
        duration={currentToast.duration}
        enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
        exitStyle={{ opacity: 0, scale: 1, y: -20 }}
        y={0}
        opacity={1}
        scale={1}
        animation="100ms"
        viewportName={currentToast.viewportName}
      >
        <YStack>
          <Toast.Title>Changes saved!</Toast.Title>
            <Toast.Description>{currentToast.message}</Toast.Description>
        </YStack>
      </Toast>
    )
  }

  // *** END FUNCTIONS ***

  return (
    <ScrollView style={[styles.container, { flex: 1 }]}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginVertical: 10,
            marginLeft: 15,
          }}
        >
          My Stock
        </Text>
        <Pressable onPress={openSettings}>
          {({ pressed }) => (
            <FontAwesome
              name="gear"
              size={35}
              style={{ marginRight: 29, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </View>
      <View style={styles.addingContainer}>
        <Text
          style={{
            marginRight: 60,
            fontSize: 30,
            marginLeft: 15,
            fontWeight: "bold",
          }}
        >
          Add Items
        </Text>
        <TouchableOpacity onPress={onPressAddManually}>
          <FontAwesome name="plus" size={35} style={{ color: colors.olive }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTakePhoto} style={{ padding: 5 }}>
          <FontAwesome
            name="camera"
            size={35}
            style={{
              color: colors.olive,
              backgroundColor: colors.white,
              padding: 5,
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, paddingBottom: 140, flexDirection: "row" }}>
        <FlashList
          data={stock}
          key={listKey}
          renderItem={({ item }) => (
            <ListItem.Swipeable
              containerStyle={styles.itemContainer}
              rightWidth={ScreenWidth / 4}
              rightContent={(reset) => (
                <TouchableOpacity
                  onPress={() => removeItem(item)}
                  style={styles.deleteSwipe}
                >
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    Delete
                  </Text>
                  <FontAwesome
                    name="trash"
                    size={35}
                    style={{
                      color: "red",
                      backgroundColor: colors.white,
                      padding: 5,
                    }}
                  />
                </TouchableOpacity>
              )}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.name}:
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => openEditItemModal(item)}
                style={{ padding: 5 }}
              >
                <FontAwesome
                  name="pencil"
                  size={35}
                  style={{
                    color: colors.orange,
                    backgroundColor: colors.white,
                    padding: 5,
                  }}
                />
              </TouchableOpacity>
            </ListItem.Swipeable>
          )}
          estimatedItemSize={50}
          ListEmptyComponent={() => (
            <View style={styles.emptyStock}>
              <Text>Your Stock Is Currently Empty</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setEditingItem(null);
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setEditingItem(null);
            setModalVisible((prev) => !prev);
          }}
        >
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {editingItem && (
              <>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      color: colors.white,
                    }}
                  >
                    Editing: {editingItem.name}
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.numberInput}
                    value={
                      updatedQuantity == 0 ? "" : updatedQuantity.toString()
                    }
                    onChangeText={(text) => setUpdatedQuantity(Number(text))}
                  />
                </View>
                <View style={styles.modalButtonsRow}>
                  <Pressable
                    style={styles.modalButtons}
                    onPress={() =>
                      updatedQuantity != 0
                        ? editItem(editingItem, updatedQuantity)
                        : removeItem(editingItem)
                    }
                  >
                    <Text
                      style={[
                        { backgroundColor: colors.olive },
                        styles.modalButtonsText,
                      ]}
                    >
                      Save
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.modalButtons}
                  >
                    <Text
                      style={[
                        {
                          backgroundColor: colors.orange,
                          borderColor: colors.orange,
                        },
                        styles.modalButtonsText,
                      ]}
                    >
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <BottomSheet
        snapPoints={snapPoints}
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: colors.olive }}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.bottomSheetContainer}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Add items to your stock:
          </Text>
          <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
            <BottomSheetTextInput
              placeholder="Item Name"
              style={styles.textInput}
              value={addingItemName}
              onChangeText={(text) => setAddingItemName(text)}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: colors.black,
                height: 50,
                marginTop: 16,
              }}
            >
              :
            </Text>
            <BottomSheetTextInput
              placeholder="0"
              keyboardType="numeric"
              style={[styles.numberInput, { color: colors.black, height: 50 }]}
              value={addingItemQuantity}
              onChangeText={(text) => setAddingItemQuantity(text)}
            />
            <Pressable style={styles.addButton} onPress={addItems}>
              <Text style={{fontSize: 20, fontWeight: "bold"}}>Add</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: colors.white,
  },
  addingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 5,
    justifyContent: "space-between",
    height: 75,
  },
  itemContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 15,
  },
  emptyStock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  numberInput: {
    marginTop: 12,
    borderRadius: 10,
    fontSize: 30,
    lineHeight: 36,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    width: 60,
    color: colors.white,
    fontWeight: "bold",
  },
  deleteSwipe: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 5,
  },
  separator: {
    backgroundColor: colors.black,
    width: "90%",
    height: 1,
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.darkGreen,
    padding: 35,
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalButtonsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  modalButtonsText: {
    fontWeight: "bold",
    color: colors.white,
    paddingHorizontal: 30,
    paddingVertical: 12,
    fontSize: 16,
  },
  modalButtons: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  bottomSheetContainer: {
    paddingTop: 20,
    marginHorizontal: 8,
  },
  textInput: {
    marginTop: 12,
    borderRadius: 10,
    fontSize: 30,
    lineHeight: 36,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    width: 200,
    color: colors.black,
    fontWeight: "bold",
    height: 50,
  },
  addButton: {
    backgroundColor: colors.olive,
    height: 50,
    marginTop: 12,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
