import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { TEXT } from "../styles/text";
import PlayerRow from "./PlayerRow";

export default function TeamPanel({ title, team, onNext }) {
  return (
    <View style={[styles.panel, { borderColor: team.secondary }]}>
      <Text style={[TEXT.subtitle, styles.panelTitle]}>{title}</Text>

      <View style={styles.header}>
        <Image source={team.logo} style={styles.logo} />
        <Text style={[TEXT.teamName, styles.teamName]} numberOfLines={2}>
          {team.name}
        </Text>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: team.secondary }]} onPress={onNext}>
        <Text style={[TEXT.button, { color: team.primary }]}>CAMBIAR</Text>
      </TouchableOpacity>

      <Text style={[TEXT.label, styles.rosterTitle]}>Jugadores</Text>

      <FlatList
        data={team.players}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <PlayerRow name={item} />}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "#0f1630",
    borderWidth: 2,
    borderRadius: 18,
    padding: 12,
    minHeight: 380,
  },
  panelTitle: {
    textAlign: "center",
    marginBottom: 10,
  },
  header: { alignItems: "center", gap: 10, marginBottom: 12 },
  logo: { width: 86, height: 86, resizeMode: "contain" },
  teamName: {
    textAlign: "center",
    lineHeight: 18,
  },

  btn: { paddingVertical: 12, borderRadius: 14, alignItems: "center", marginBottom: 10 },

  rosterTitle: { marginBottom: 6 },
  list: { borderRadius: 12, overflow: "hidden" },
});
