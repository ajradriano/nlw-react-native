import { Input } from '@/components/input';
import { Alert, Image, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from '@/components/button';
import { Link, router } from 'expo-router';
import axios from 'axios';

import { api } from '@/server/api';

import { colors } from '@/styles/colors';
import { useState } from 'react';
import { useBadgeStorage } from '@/storage/badge-storage';

const event_id = '9e9bd979-9d10-4915-b339-3786b1634f33'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const badgeStorage = useBadgeStorage()

    async function handleRegister() {
        try {

            if (!name.trim() || !email.trim()) {
                return Alert.alert('Ops', 'Preencha todos os campos.')
            }
            setIsLoading(true)
            const response = await api.post(`/events/${event_id}/attendees`, { name, email })
            if (response.data.attendeeId) {
                console.log('log, ', response.data.attendeeId);
                
                const badgeResponse =  await api.get(`/events/${response.data.attendeeId}/badge`)
                badgeStorage.save(badgeResponse.data.badge)
                Alert.alert("Inscrição", "Inscrição realizada.", [
                    { text: "OK", onPress: () => router.push('/ticket') }
                ])
            }
            console.log(response);
            

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                if (String(error.response?.data.message).includes("already registered")) {
                    return Alert.alert("Inscrição", "Este email já está cadastrado.")
                }
            }
            Alert.alert('Inscrição', 'Não foi  possível realizar a inscrição.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <View className="flex-1 items-center justify-center bg-green-500">
            <Image source={require('@/assets/logo.png')} className="h-16"
                resizeMode="contain" />
            <View className='w-full gap-3 mt-12'>
                <Input>
                    <FontAwesome5 name="user-alt" size={18} color={colors.green[200]} />
                    <Input.Field placeholder='Nome Completo' onChangeText={setName} />
                </Input>
                <Input>
                    <MaterialCommunityIcons name="email" size={20} color={colors.green[200]} />
                    <Input.Field placeholder='Email' keyboardType='email-address' onChangeText={setEmail} />
                </Input>
                <Button title='Cadastrar' onPress={() => handleRegister()} isLoading={isloading} />
                <Link href={'/'} className='text-gray-200 text-base font-bold text-center mt-10'>
                    Já tenho meu ingresso
                </Link>
            </View>
        </View>
    )
}