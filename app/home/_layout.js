import { Stack, Tabs } from "expo-router"
import { Text, View } from "react-native"
import { styles } from "../../assets/styles/Style"
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const StackLayout = () => {
    return (
        <Tabs  screenOptions={{
            headerStyle: {
                backgroundColor: "#fff"
            },
            headerShadowVisible:false,
            headerTitleStyle: {
                color: "#fff",
                fontFamily: "Poppins-Bold"
            },
            headerTitleAlign: "center",
            headerTitle: () => (
                    <Text style={[
                    styles.fontBold,
                    {color:"#000",fontSize:20}
                ]}>Co wybierasz?</Text>
            ),
            tabBarStyle:{borderTopLeftRadius:30,borderTopRightRadius:30,backgroundColor:"#fff",height:70,alignItems:"center",justifyContent:"center",overflow:"hidden",position:'absolute'},
            tabBarActiveBackgroundColor:"#f7f7f7",
            headerTitleStyle:{fontFamily:"Poppins-Bold"},

         
        }}>
            <Tabs.Screen
                name="index"
                options={{ 
                    title:"Co wybierasz?" ,
                    tabBarIcon: ({focused,color}) => (
                        <FontAwesome5 name="question-circle" size={23}  style={{color:focused?"red":"#b5b5b5",paddingTop:6}}/>
                    ),
                    tabBarLabel:({ focused,color })=>(<Text style={[
                        {color:focused?"red":"#b5b5b5",paddingBottom:6},
                        focused?styles.fontBold:styles.font
                    ]}>Co wybierasz?</Text>)
                }}
            >
            </Tabs.Screen>
            <Tabs.Screen
                name="button"
                options={{ 
                    title:"Co wybierasz?" ,
                    tabBarIcon: ({focused,color}) => (
                        <Ionicons name="radio-button-on" size={23} style={{color:focused?"red":"#b5b5b5",paddingTop:6}}/>
                    ),
                    tabBarLabel:({ focused,color })=>(<Text style={[
                        {color:focused?"red":"#b5b5b5",paddingBottom:6},
                        focused?styles.fontBold:styles.font
                    ]}>Czerwony przycisk</Text>)
                }}
            >
            </Tabs.Screen>
        </Tabs>
    )
}

export default StackLayout