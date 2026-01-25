import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import PlayerRow from "./PlayerRow";

export default function TeamPanel({ title, team, onNext }) {
  return (
    <View style={[styles.panel, { borderColor: team.secondary }]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.header}>
        <Image source={team.logo} style={styles.logo} />
        <Text style={styles.teamName} numberOfLines={2}>
          {team.name}
        </Text>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: team.secondary }]} onPress={onNext}>
        <Text style={[styles.btnText, { color: team.primary }]}>CAMBIAR</Text>
      </TouchableOpacity>

      <Text style={styles.rosterTitle}>Jugadores</Text>

      {/* Lista optimizada (lo pide la práctica) */}
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
    borderRadius: 16,
    padding: 12,
    minHeight: 360,
  },
  title: {
    color: "#FFD54A",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  logo: { width: 64, height: 64, resizeMode: "contain" },
  teamName: { color: "white", fontWeight: "900", fontSize: 13, textAlign: "center" },

  btn: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: { fontWeight: "900" },

  rosterTitle: { color: "#b8c0d9", fontWeight: "800", fontSize: 12, marginBottom: 6 },
  list: { borderRadius: 12, overflow: "hidden" },
});
