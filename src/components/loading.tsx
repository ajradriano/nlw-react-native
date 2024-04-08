import { ActivityIndicator } from "react-native";

export function Loading() {
    return <ActivityIndicator className="flex-1 bg-green-400 items-center justify-center text-orange-400" />; 
}