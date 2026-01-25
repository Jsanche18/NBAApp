import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { getTeamById } from "../data/teams";
import PlayerRow from "../components/PlayerRow";

export default function GameScreen({ route, navigation }) {
  const { homeId, awayId } = route.params || {};

  const home = useMemo(() => getTeamById(homeId), [homeId]);
  const away = useMemo(() => getTeamById(awayId), [awayId]);

  if (!home || !away) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Error: faltan datos del partido.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MARCADOR VISUAL */}
      <View style={styles.scoreboard}>
        <View style={[styles.teamSide, { borderColor: home.secondary }]}>
          <Image source={home.logo} style={styles.logo} />
          <Text style={styles.teamName}>{home.name}</Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={[styles.teamSide, { borderColor: away.secondary }]}>
          <Image source={away.logo} style={styles.logo} />
          <Text style={styles.teamName}>{away.name}</Text>
        </View>
      </View>

      {/* LISTAS DE JUGADORES */}
      <View style={styles.listsRow}>
        <View style={styles.listBox}>
          <Text style={styles.listTitle}>HOME ROSTER</Text>
          <FlatList
            data={home.players}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <PlayerRow name={item} />}
          />
        </View>

        <View style={styles.listBox}>
          <Text style={styles.listTitle}>VISITOR ROSTER</Text>
          <FlatList
            data={away.players}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <PlayerRow name={item} />}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>VOLVER A SELECCIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#081022", padding: 14 },

  scoreboard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f1630",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  teamSide: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
  },
  vs: { color: "white", fontWeight: "900", marginHorizontal: 10 },

  logo: { width: 46, height: 46, resizeMode: "contain" },
  teamName: { color: "white", fontWeight: "900", fontSize: 12, marginTop: 6, textAlign: "center" },

  listsRow: { flex: 1, flexDirection: "row", gap: 10 },
  listBox: { flex: 1, backgroundColor: "#0f1630", borderRadius: 16, overflow: "hidden" },
  listTitle: { color: "#FFB300", fontWeight: "900", padding: 10, textAlign: "center" },

  backBtn: {
    marginTop: 10,
    backgroundColor: "#20316a",
    borderWidth: 2,
    borderColor: "#FF6F00",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  backText: { color: "#FFB300", fontWeight: "900", letterSpacing: 1 },
});
