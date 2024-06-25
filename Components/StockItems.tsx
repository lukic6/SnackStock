// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import React, {useState} from 'react';
// import colors from "../assets/Colors";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { FlashList } from "@shopify/flash-list";
// import { ListItem, ScreenWidth } from "@rneui/base";

// const StockItems = () => {
//     const [listKey, setListKey] = useState<number>(0);

//     interface StockItem {
//         name: string;
//         quantity: number;
//     }
//     const [stock, setStock] = useState<StockItem[]>([
//         { name: "tuna", quantity: 1 },
//         { name: "tortilia", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 1 },
//         { name: "tuna", quantity: 6 },
//       ]);
//   return (
//     <FlashList
//           data={stock}
//           key={listKey}
//           renderItem={({ item }) => (
//             <ListItem.Swipeable
//               containerStyle={styles.itemContainer}
//               rightWidth={ScreenWidth / 4}
//               rightContent={(reset) => (
//                 <TouchableOpacity
//                   onPress={() => removeItem(item)}
//                   style={styles.deleteSwipe}
//                 >
//                   <Text style={{ fontWeight: "bold", color: "red" }}>
//                     Delete
//                   </Text>
//                   <FontAwesome
//                     name="trash"
//                     size={35}
//                     style={{
//                       color: "red",
//                       backgroundColor: colors.white,
//                       padding: 5,
//                     }}
//                   />
//                 </TouchableOpacity>
//               )}
//             >
//               <Text style={{ fontWeight: "bold", fontSize: 20 }}>
//                 {item.name}:
//               </Text>
//               <Text style={{ fontWeight: "bold", fontSize: 20 }}>
//                 {item.quantity}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => openEditItemModal(item)}
//                 style={{ padding: 5 }}
//               >
//                 <FontAwesome
//                   name="pencil"
//                   size={35}
//                   style={{
//                     color: colors.orange,
//                     backgroundColor: colors.white,
//                     padding: 5,
//                   }}
//                 />
//               </TouchableOpacity>
//             </ListItem.Swipeable>
//           )}
//           estimatedItemSize={50}
//           ListEmptyComponent={() => (
//             <View style={styles.emptyStock}>
//               <Text>Your Stock Is Currently Empty</Text>
//             </View>
//           )}
//           ItemSeparatorComponent={() => <View style={styles.separator}></View>}
//         />
//   )
// }

// export default StockItems

// const styles = StyleSheet.create({
//     deleteSwipe: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: colors.white,
//         padding: 5,
//       },
//       separator: {
//         backgroundColor: colors.black,
//         width: "90%",
//         height: 1,
//         marginHorizontal: 20,
//       },
//       itemContainer: {
//         backgroundColor: colors.white,
//         marginHorizontal: 15,
//       },
//       emptyStock: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         fontSize: 24,
//         fontWeight: "bold",
//       },
// });