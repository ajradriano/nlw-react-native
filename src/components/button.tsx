import { colors } from "@/styles/colors";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";

type Props = TouchableOpacityProps & {
    title: string
    isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.button} disabled={isLoading}  {...rest} activeOpacity={0.85}>
            {isLoading ? (
                <ActivityIndicator className="text-green-200" />
            ) : (
                <Text className="text-black text-base font-bold uppercase">
                    {title}
                </Text>
            )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.orange[500],
        padding: 10,
        borderRadius: 10,
    }
})