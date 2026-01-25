import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlayerRow({ name }) {
  return (
    <View style={styles.row}>
      <Text style={styles.text} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.12)",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
});
