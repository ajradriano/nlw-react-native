import { TextInput, View, TextInputProps } from "react-native";
import React from "react";
import { colors } from "@/styles/colors";

interface InputProps {
    children: React.ReactNode;
}

function Input({ children }: InputProps) {
    return (
        <View className="w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg">
            {children}
        </View>
    )
}

function Field({ ...rest }: TextInputProps) {
    return (
        <TextInput className="flex-1 text-white text-base font-regular"
                    placeholderTextColor={colors.gray[200]} {...rest}/>
    )
}

Input.Field = Field

export { Input }