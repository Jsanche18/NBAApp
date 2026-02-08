import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TEXT } from "../styles/text";

export default function Scoreboard({ home, away, homeScore, awayScore }) {
  return (
    <View style={styles.board}>
      <View style={[styles.side, { borderColor: home.secondary }]}>
        <Image source={home.logo} style={styles.logo} />
        <Text style={[TEXT.teamName, styles.teamName]} numberOfLines={2}>
          {home.name}
        </Text>
        <Text style={[styles.score, { color: home.secondary }]}>{homeScore}</Text>
      </View>

      <View style={styles.center}>
        <Text style={[TEXT.label, styles.centerText]}>Q4</Text>
        <Text style={[TEXT.label, styles.centerText]}>00:00</Text>
        <Text style={[TEXT.label, styles.centerMini]}>MATCH</Text>
      </View>

      <View style={[styles.side, { borderColor: away.secondary }]}>
        <Image source={away.logo} style={styles.logo} />
        <Text style={[TEXT.teamName, styles.teamName]} numberOfLines={2}>
          {away.name}
        </Text>
        <Text style={[styles.score, { color: away.secondary }]}>{awayScore}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#0f1630",
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderColor: "#FF6F00",
    alignItems: "center",
  },
  side: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#081022",
  },
  logo: { width: 64, height: 64, resizeMode: "contain" },
  teamName: { marginTop: 8, textAlign: "center", lineHeight: 18 },
  score: { fontWeight: "900", fontSize: 38, marginTop: 6, letterSpacing: 2 },

  center: { width: 80, alignItems: "center" },
  centerText: { color: "#FFB300", fontWeight: "900" },
  centerMini: { color: "#b8c0d9", fontWeight: "800", marginTop: 6 },
});
