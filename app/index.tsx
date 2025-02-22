import { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useGameStore } from "../store/game";
import "expo-dev-client";

export default function Index() {
  const {
    currentWordIndex,
    correctAnswers,
    wrongAnswers,
    randomizedWords,
    wordList,
    initializeGame,
    getCurrentWord,
    getOptions,
    handleAnswer,
  } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, []);

  // Don't render until words are randomized
  if (randomizedWords.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>{wordList.title}</Text>
        <Text style={styles.descriptionText}>{wordList.description}</Text>
        <Text style={styles.progressText}>
          Progress: {currentWordIndex + 1} / {randomizedWords.length} words
        </Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Correct: {correctAnswers}</Text>
        <Text style={styles.scoreText}>Wrong: {wrongAnswers}</Text>
      </View>

      <Text style={styles.wordText}>{getCurrentWord().word}</Text>

      <View style={styles.optionsContainer}>
        {getOptions().map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    color: "#666",
  },
  progressText: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  wordText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    gap: 10,
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
  },
});
