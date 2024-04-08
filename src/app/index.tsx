import { useState } from 'react';
import { Input } from '@/components/input';
import { Alert, Image, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { Button } from '@/components/button';
import { Link, Redirect, router } from 'expo-router';
import { api } from '@/server/api';

import { colors } from '@/styles/colors';
import { useBadgeStorage } from '@/storage/badge-storage';

export default function Home() {
    const [codigoIngresso, setCodigoIngresso] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const badgeStorage = useBadgeStorage()

    async function getAccess() {
        try {
            setIsLoading(true)
            if (!codigoIngresso.trim()) {
                return Alert.alert('Ops!', 'Nenhum código informado!')
            }
            const { data } = await api.get(`/attendees/${codigoIngresso}/badge`,)
            badgeStorage.save(data.badge)
            router.push('/ticket')

        } catch (error) {
            console.log(error);
            return Alert.alert('Ops!', 'Não foi possível encontrar o ingresso!')
        } finally {
            setIsLoading(false)
        }
    }

    if (badgeStorage.data?.checkInURL) {
        return <Redirect href="/ticket" />
    }

    return (
        <View className="flex-1 items-center justify-center bg-green-500">
            <Image source={require('@/assets/logo.png')} className="h-16"
                resizeMode="contain" />
            <View className='w-full gap-3 mt-12'>
                <Input>
                    <FontAwesome5 name="ticket-alt" size={18} color={colors.green[200]} />
                    <Input.Field placeholder='Código Ingresso'
                        onChangeText={setCodigoIngresso} />
                </Input>
                <Button title='Acessar' onPress={() => getAccess()} isLoading={isloading} />
                <Link href={'/register'} className='text-gray-200 text-base font-bold text-center mt-10'>Não tenho ingresso</Link>
            </View>
        </View>
    )
}