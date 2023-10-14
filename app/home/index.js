import { Text, View, SafeAreaView,TouchableOpacity, Image } from "react-native"
import { styles } from "../../assets/styles/Style"
import { AntDesign } from '@expo/vector-icons'

import { useEffect, useState } from "react"

import AsyncStorage from '@react-native-async-storage/async-storage'




const Home = () => {
     
    const [ question, setQuestion ] = useState()
    const [ resultsShown, setResultsShown ] = useState(false)
    const [ newQuestion, setNewQuestion ] = useState(1)


    const images = [
        require("../../assets/img/questions/0.png"),
        require("../../assets/img/questions/1.png")
    ]


    const questions = [
        {id: 1, question1: "Dostać 1 000 000zł za 10 lat", question2: "Dostać 300 000zł teraz", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 2, question1: "Być samotnym milionerem", question2: "Być biednym, ale mieć kochającą rodzinę i przyjaciół", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 3, question1: "Zawsze mówić prawdę, ale nie być lubianym", question2: "Zawsze kłamać, ale być lubianym", result1: 33, result2: 67, image1: -1, image2: -1},
        {id: 4, question1: "Dużo zarabiać, ale nie lubić swojej pracy", question2: "Mało zarabiać, ale lubić swoją pracę", result1: 26, result2: 74, image1: -1, image2: -1},
        {id: 5, question1: "Poznać datę swojej śmierci", question2: "Nie wiedzieć kiedy umrzesz", result1: 41, result2: 59, image1: -1, image2: -1},

    ]
       

    useEffect(() => {
        AsyncStorage.getItem('answeredQuestion').then((value) => { 


        })




        setResultsShown(false)
        var item = questions[Math.floor(Math.random()*questions.length)]
        setQuestion(item)
    }, [newQuestion])

    function showResults() {
        setResultsShown(true)
    }


    return (
          <SafeAreaView style={{display:"flex",height:"100%",justifyContent:"space-between"}}>

            {typeof question !== 'undefined' ? 
            
                <TouchableOpacity onPress={() => showResults()} style={{backgroundColor:"#2D6BC8",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>
                    <Text style={[
                        styles.font,
                        {color:"#fff",fontSize:20}
                    ]}>{question.question1}</Text>
                    {question.image1 > -1 ? <>
                    
                        <View>
                            <Image source={images[question.image1]} style={{width:80,height:80,marginVertical:5}}/>
                        </View>
                        
                    </> : <></>}
                    <View style={{backgroundColor:"#fff",width:110,paddingHorizontal:20,paddingVertical:5,borderRadius:9999,marginTop:7,display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}>
                            {resultsShown ? <Text style={[
                                styles.fontBold,
                                {fontSize:25},
                                question.result1>50?{color:"green"}:{},
                                question.result1<50?{color:"#DE2020"}:{},
                                question.result1===50?{color:"black"}:{}
                            ]}>{question.result1}</Text> : <Text style={[
                                styles.fontBold,
                                {fontSize:25,color:"grey"}
                            ]}>?</Text>}
                        </View>
                        
                        <Text style={[
                            styles.fontBold,
                            resultsShown && question.result1>50 ? {color:"green"} : {},
                            resultsShown && question.result1<50 ? {color:"#DE2020"} : {},
                            resultsShown && question.result1===50 ? {color:"black"} : {},
                            {fontSize:25}
                        ]}>%</Text>
                    </View>
                </TouchableOpacity>

            :

                <View style={{backgroundColor:"#2D6BC8",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>   
                    <Text style={[
                            styles.fontBold,
                            {fontSize:25,color:"#fff"}
                        ]}>Ładowanie...</Text>
                </View> 
        
            }

          

            <View style={{height:60,position:"relative"}}>
                <View style={{position:"absolute",left:0,top:0,height:"100%",width:"100%"}}>
                    <View style={{height:"50%",backgroundColor:"#2D6BC8"}}>
                       
                    </View>
                    <View style={{height:"50%",backgroundColor:"#DE2020"}}>
                        
                    </View>
                </View>
                <View style={{position:"absolute",left:0,top:0,height:"100%",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{backgroundColor:"#fff",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",width:"65%",borderTopRightRadius:99999,borderBottomRightRadius:99999}}>
                        <Text style={[
                            styles.fontBold,
                            {fontSize:25}
                        ]}>Co wybierasz?</Text>
                    </View>
                    <TouchableOpacity onPress={() => setNewQuestion(newQuestion+1)} style={{height:"100%",aspectRatio:1,borderRadius:9999,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#fff",marginRight:30}}>
                        <AntDesign name="forward" size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {typeof question !== 'undefined' ? 
            
                <TouchableOpacity onPress={() => showResults()} style={{backgroundColor:"#DE2020",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>
                    <Text style={[
                        styles.font,
                        {color:"#fff",fontSize:20}
                    ]}>{question.question2}</Text>
                       {question.image2 > -1 ? <>
                    
                        <View>
                            <Image source={images[question.image2]} style={{width:80,height:80,marginVertical:5}}/>
                        </View>
                        
                    </> : <></>}
                    <View style={{backgroundColor:"#fff",width:110,paddingHorizontal:20,paddingVertical:5,borderRadius:9999,marginTop:7,display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}>
                            {resultsShown ? <Text style={[
                                styles.fontBold,
                                {fontSize:25},
                                question.result2>50?{color:"green"}:{},
                                question.result2<50?{color:"#DE2020"}:{},
                                question.result2===50?{color:"black"}:{}
                            ]}>{question.result2}</Text> : <Text style={[
                                styles.fontBold,
                                {fontSize:25,color:"grey"}
                            ]}>?</Text>}
                        </View>
                        
                        <Text style={[
                            styles.fontBold,
                            resultsShown && question.result2>50 ? {color:"green"} : {},
                            resultsShown && question.result2<50 ? {color:"#DE2020"} : {},
                            resultsShown && question.result2===50 ? {color:"black"} : {},
                            {fontSize:25}
                        ]}>%</Text>
                    </View>
                </TouchableOpacity> 
        
            :

                <View style={{backgroundColor:"#DE2020",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>   
                    <Text style={[
                            styles.fontBold,
                            {fontSize:25,color:"#fff"}
                        ]}>Ładowanie...</Text>
                </View> 
        
        }

            

          </SafeAreaView>
    )
}

export default Home