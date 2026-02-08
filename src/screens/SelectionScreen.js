import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TEXT } from "../styles/text";
import TeamPanel from "../components/TeamPanel";
import { TEAMS } from "../data/teams";

export default function SelectionScreen({ navigation }) {
  const [homeIndex, setHomeIndex] = useState(0);
  const [awayIndex, setAwayIndex] = useState(1);

  const home = useMemo(() => TEAMS[homeIndex], [homeIndex]);
  const away = useMemo(() => TEAMS[awayIndex], [awayIndex]);

  const nextHome = () => setHomeIndex((i) => (i + 1) % TEAMS.length);
  const nextAway = () => setAwayIndex((i) => (i + 1) % TEAMS.length);

  const startMatch = () => {
    navigation.navigate("Partido", { homeId: home.id, awayId: away.id });
  };

  return (
    <View style={styles.container}>
      <Text style={TEXT.title}>NBA JAM RETRO</Text>
      <Text style={TEXT.label}>PLAYER 1 vs PLAYER 2</Text>

      <View style={styles.panels}>
        <TeamPanel title="HOME" team={home} onNext={nextHome} />
        <Text style={styles.vs}>VS</Text>
        <TeamPanel title="VISITOR" team={away} onNext={nextAway} />
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={startMatch}>
        <Text style={TEXT.button}>INICIAR PARTIDO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#081022", padding: 14, alignItems: "center", gap: 8 },
  panels: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
  vs: { color: "white", fontWeight: "900", fontSize: 16, marginHorizontal: 4 },
  startBtn: {
    width: "100%",
    backgroundColor: "#0f1630",
    borderWidth: 2,
    borderColor: "#FF6F00",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
});
