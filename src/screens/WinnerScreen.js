import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { TEXT } from "../styles/text";
import { getTeamById } from "../data/teams";

function toSortedArray(pointsObj, teamLabel) {
  return Object.entries(pointsObj || {})
    .map(([name, points]) => ({ name, points, team: teamLabel }))
    .sort((a, b) => b.points - a.points);
}

export default function WinnerScreen({ route, navigation }) {
  const {
    homeId,
    awayId,
    homeScore,
    awayScore,
    homePlayerPoints,
    awayPlayerPoints,
  } = route.params || {};

  const home = useMemo(() => getTeamById(homeId), [homeId]);
  const away = useMemo(() => getTeamById(awayId), [awayId]);

  if (!home || !away) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Error: faltan datos.</Text>
      </View>
    );
  }

  const isTie = homeScore === awayScore;
  const winner = !isTie ? (homeScore > awayScore ? home : away) : null;

  const homeArr = toSortedArray(homePlayerPoints, "HOME");
  const awayArr = toSortedArray(awayPlayerPoints, "VISITOR");

  const topScorers = [...homeArr, ...awayArr]
    .filter((p) => p.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  return (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={TEXT.title}>FINAL</Text>

      
      {!isTie ? (
        <View style={[styles.winnerBox, { borderColor: winner.secondary }]}>
          <Text style={TEXT.subtitle}>WINNER</Text>
          <Image source={winner.logo} style={styles.bigLogo} />
          <Text style={[TEXT.teamName, styles.winnerName]} numberOfLines={1}>
            {winner.name}
          </Text>
        </View>
      ) : (
        <View style={styles.winnerBox}>
          <Text style={TEXT.subtitle}>TIE GAME</Text>
          <View style={styles.tieRow}>
            <Image source={home.logo} style={styles.tieLogo} />
            <Text style={styles.vs}>VS</Text>
            <Image source={away.logo} style={styles.tieLogo} />
          </View>
          <Text style={TEXT.label}>Empate: ningún equipo gana</Text>
        </View>
      )}

      
      <View style={styles.scoreCard}>
        <View style={[styles.scoreSide, { borderColor: home.secondary }]}>
          <Image source={home.logo} style={styles.logoSmall} />
          <Text style={[TEXT.teamName, styles.teamSmall]} numberOfLines={1}>
            {home.name}
          </Text>
          <Text style={[styles.scoreBig, { color: home.secondary }]}>{homeScore}</Text>
        </View>

        <Text style={styles.hyphen}>-</Text>

        <View style={[styles.scoreSide, { borderColor: away.secondary }]}>
          <Image source={away.logo} style={styles.logoSmall} />
          <Text style={[TEXT.teamName, styles.teamSmall]} numberOfLines={1}>
            {away.name}
          </Text>
          <Text style={[styles.scoreBig, { color: away.secondary }]}>{awayScore}</Text>
        </View>
      </View>

      <View style={styles.scorersBox}>
        <Text style={TEXT.subtitle}>TOP 5 SCORERS</Text>

        {topScorers.length === 0 ? (
          <Text style={TEXT.label}>No se han anotado puntos.</Text>
        ) : (
          topScorers.map((p, idx) => (
            <View key={p.name + idx} style={styles.scorerRow}>
              <Text style={styles.scorerRank}>{idx + 1}</Text>

              <View style={{ flex: 1 }}>
                <Text style={TEXT.playerName} numberOfLines={1}>
                  {p.name}
                </Text>
                <Text style={TEXT.label}>{p.team}</Text>
              </View>

              <Text style={TEXT.points}>{p.points} PTS</Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.popToTop()}>
        <Text style={TEXT.button}>VOLVER A SELECCIÓN</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#081022" },
  scroll: { padding: 14, paddingBottom: 22, gap: 12 },

  scoreCard: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#0f1630",
    borderRadius: 16,
    padding: 10,
    borderWidth: 2,
    borderColor: "#FF6F00",
    alignItems: "center",
  },
  scoreSide: {
    flex: 1,
    backgroundColor: "#081022",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  logoSmall: { width: 50, height: 50, resizeMode: "contain" },
  teamSmall: { marginTop: 6, textAlign: "center" },
  scoreBig: { fontWeight: "900", fontSize: 34, marginTop: 4, letterSpacing: 1 },
  hyphen: { color: "white", fontWeight: "900", fontSize: 18 },

  winnerBox: {
    backgroundColor: "#0f1630",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FF6F00",
    padding: 12,
    alignItems: "center",
    gap: 8,
  },
  bigLogo: { width: 130, height: 130, resizeMode: "contain" },
    winnerName: { textAlign: "center", fontSize: 16, fontWeight: "900" },


  tieRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  tieLogo: { width: 64, height: 64, resizeMode: "contain" },
  vs: { color: "white", fontWeight: "900", fontSize: 16 },

  scorersBox: {
    backgroundColor: "#0f1630",
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.10)",
    gap: 8,
  },
  scorerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  scorerRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF6F00",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "900",
    fontSize: 12,
  },

  backBtn: {
    backgroundColor: "#0f1630",
    borderWidth: 2,
    borderColor: "#FF6F00",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
});
