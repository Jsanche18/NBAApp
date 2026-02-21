import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { getTeamById } from "../data/teams";
import Scoreboard from "../components/Scoreboard";
import PlayerActionRow from "../components/PlayerActionRow";


export default function MatchScreen({ route, navigation }) {
  const { homeId, awayId } = route.params || {};

  const home = useMemo(() => getTeamById(homeId), [homeId]);
  const away = useMemo(() => getTeamById(awayId), [awayId]);

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // puntos por jugador
  const [homePlayerPoints, setHomePlayerPoints] = useState({});
  const [awayPlayerPoints, setAwayPlayerPoints] = useState({});

  if (!home || !away) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Error: faltan equipos.</Text>
      </View>
    );
  }

  const addPointsHome = (playerName, pts) => {
    setHomeScore((s) => s + pts);
    setHomePlayerPoints((prev) => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + pts,
    }));
  };

  const addPointsAway = (playerName, pts) => {
    setAwayScore((s) => s + pts);
    setAwayPlayerPoints((prev) => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + pts,
    }));
  };

  const finishGame = () => {
    navigation.navigate("Ganador", {
      homeId: home.id,
      awayId: away.id,
      homeScore,
      awayScore,
      homePlayerPoints,
      awayPlayerPoints,
    });
  };

  return (
    <View style={styles.container}>
      <Scoreboard home={home} away={away} homeScore={homeScore} awayScore={awayScore} />

      <View style={styles.columns}>
        {/* HOME */}
        <View style={[styles.teamColumn, { borderColor: home.secondary }]}>
          <Text style={[styles.columnTitle, { backgroundColor: home.primary }]}>HOME</Text>

          <FlatList
            data={home.players}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <PlayerActionRow
                name={item}
                accentColor={home.secondary}
                onAdd2={() => addPointsHome(item, 2)}
                onAdd3={() => addPointsHome(item, 3)}
              />
            )}
          />
        </View>

        {/* VISITOR */}
        <View style={[styles.teamColumn, { borderColor: away.secondary }]}>
          <Text style={[styles.columnTitle, { backgroundColor: away.primary }]}>VISITOR</Text>

          <FlatList
            data={away.players}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <PlayerActionRow
                name={item}
                accentColor={away.secondary}
                onAdd2={() => addPointsAway(item, 2)}
                onAdd3={() => addPointsAway(item, 3)}
              />
            )}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.finishBtn} onPress={finishGame}>
        <Text style={styles.finishText}>FIN DEL JUEGO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#081022", padding: 14, gap: 12 },

  columns: { flex: 1, flexDirection: "row", gap: 10 },
  teamColumn: {
    flex: 1,
    backgroundColor: "#0f1630",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 2,
  },
  columnTitle: {
    textAlign: "center",
    fontWeight: "900",
    letterSpacing: 2,
    paddingVertical: 12,
    color: "white",
  },

  finishBtn: {
    backgroundColor: "#0f1630",
    borderWidth: 2,
    borderColor: "#FF6F00",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  finishText: { color: "#FFB300", fontWeight: "900", letterSpacing: 2 },
});
