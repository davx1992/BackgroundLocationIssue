import "react-native-gesture-handler";
import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    UIManager,
    YellowBox,
} from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const verifyLocationPersmissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
        console.log("Permissions failed");
        return false;
    }
    return true;
};

const startLocationUpdates = async () => {
    // await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    verifyLocationPersmissions();
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Low,
        timeInterval: 60000,
        distanceInterval: 3000,
        showsBackgroundLocationIndicator: false,
    });
};

const check = async () => {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    console.log(tasks);
};

YellowBox.ignoreWarnings([
    "Require cycle:",
    "Non-serializable values were found in the navigation state",
]);

check();

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        };
    },
});

export default function App() {
    useEffect(() => {
        startLocationUpdates();
    }, []);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {}}
                style={{
                    width: "100%",
                    height: 500,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: 500,
                        backgroundColor: "red",
                    }}
                ></View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    console.log("data location", data);
});
