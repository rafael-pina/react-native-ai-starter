import { StyleSheet } from "react-native";
import { Colors } from "react-native-ui-lib";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboard: {
    width: "100%",
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.grey60,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.grey20,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.grey40,
    textAlign: "center",
  },
  homeProfile: {
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: "white",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 20,
    elevation: 10,
    flex: 1,
    paddingBottom: 20,
  },
  avocado: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: Colors.green30,
  },
  tiles: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  whatToCookText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.blue30,
    textAlign: "right",
    marginRight: 5,
  },
  more: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.blue30,
    textAlign: "right",
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  whatToCook: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 20,
  },
});
