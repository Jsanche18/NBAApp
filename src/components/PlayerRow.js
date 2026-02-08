import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT } from "../styles/text";

export default function PlayerRow({ name }) {
  return (
    <View style={styles.row}>
      <Text style={TEXT.playerName} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
  },
});
