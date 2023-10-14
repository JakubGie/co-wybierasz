import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { styles } from '../assets/styles/Style'
import { useEffect } from 'react'





const index = () => {

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf")
  })

    useEffect(() => {
      async function prepare() {
          await SplashScreen.preventAutoHideAsync()
      }
      prepare()
  }, [])


  if (!fontsLoaded) {
    
        
    return null } else {

      return (
        <Redirect href="/home"/>  
      )
    }

 
}


export default index