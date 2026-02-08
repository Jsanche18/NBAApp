import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TEXT } from "../styles/text";

export default function PlayerActionRow({ name, onAdd2, onAdd3, accentColor }) {
  return (
    <View style={styles.card}>
      <Text style={TEXT.playerName} numberOfLines={2}>
        {name}
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.btn, { borderColor: accentColor }]} onPress={onAdd2}>
          <Text style={[TEXT.points, { color: accentColor }]}>+2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { borderColor: accentColor }]} onPress={onAdd3}>
          <Text style={[TEXT.points, { color: accentColor }]}>+3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
  },
});
