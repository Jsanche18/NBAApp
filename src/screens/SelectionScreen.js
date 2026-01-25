import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TeamPanel from "../components/TeamPanel";
import { TEAMS } from "../data/teams";

export default function SelectionScreen({ navigation }) {
  const [homeIndex, setHomeIndex] = useState(0);
  const [awayIndex, setAwayIndex] = useState(2);

  const homeTeam = useMemo(() => TEAMS[homeIndex], [homeIndex]);
  const awayTeam = useMemo(() => TEAMS[awayIndex], [awayIndex]);

  const nextHome = () => setHomeIndex((prev) => (prev + 1) % TEAMS.length);
  const nextAway = () => setAwayIndex((prev) => (prev + 1) % TEAMS.length);

  const goGame = () => {
    navigation.navigate("Juego", {
      homeId: homeTeam.id,
      awayId: awayTeam.id,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.bigTitle}>NBA JAM RETRO</Text>
        <Text style={styles.subTitle}>PLAYER 1 vs PLAYER 2</Text>

        <View style={styles.row}>
          <TeamPanel title="HOME" team={homeTeam} onNext={nextHome} />
          <View style={styles.vsBox}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <TeamPanel title="VISITOR" team={awayTeam} onNext={nextAway} />
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={goGame}>
          <Text style={styles.startText}>SPACE BAR TO CONTINUE</Text>
          <Text style={styles.startTextSmall}>(INICIAR PARTIDO)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#081022" },
  container: { flex: 1, padding: 14, justifyContent: "center" },

  bigTitle: {
    color: "#FFB300",
    fontWeight: "900",
    fontSize: 26,
    textAlign: "center",
    letterSpacing: 1,
  },
  subTitle: { color: "#b8c0d9", textAlign: "center", marginTop: 6, marginBottom: 14 },

  row: { flexDirection: "row", alignItems: "center", gap: 10 },

  vsBox: {
    width: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  vsText: { color: "white", fontWeight: "900", fontSize: 18 },

  startBtn: {
    marginTop: 14,
    backgroundColor: "#20316a",
    borderWidth: 2,
    borderColor: "#FF6F00",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  startText: { color: "#FFB300", fontWeight: "900", letterSpacing: 1 },
  startTextSmall: { color: "white", marginTop: 2, fontWeight: "700", fontSize: 12 },
});
