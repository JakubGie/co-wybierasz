import { Stack } from "expo-router"
import { Text } from "react-native"
import { styles } from "../../assets/styles/Style"

const StackLayout = () => {
    return (
        <Stack  screenOptions={{
            headerStyle: {
                backgroundColor: "#fff"
            },
            headerShadowVisible:false,
            headerTitleStyle: {
                color: "#fff",
                fontFamily: "Poppins-Bold"
            },
            headerLeft: () => (
                <Text style={[
                    styles.fontBold,
                    {color:"#000",fontSize:20}
                ]}>Co wybierasz?</Text>
            )
        }}>

        </Stack>
    )
}

export default StackLayout