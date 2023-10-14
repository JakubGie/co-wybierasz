import { Text, View, SafeAreaView,TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { styles } from "../../assets/styles/Style"
import { AntDesign } from '@expo/vector-icons'

import { useEffect, useState } from "react"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'





const Button = () => {
     
    const [ question, setQuestion ] = useState()
    const [ resultsShown, setResultsShown ] = useState(false)
    const [ newQuestion, setNewQuestion ] = useState(1)

    const [ isPlaying, setIsPlaying ] = useState(false)

    const [ key, setKey ] = useState(0)


    const images = [
       
    ]


    const questions = [
        {id: 1, question1: "Dostajesz wymarzony samochód", question2: "Musisz nim jeździć przepisowo do końca życia", result: 60, image1: -1, image2: -1},
        {id: 2, question1: "Za każdy krok dostajesz 10 złotych", question2: "Wszędzie musisz chodzić po klockach lego", result: 61, image1: -1, image2: -1}

    ]

 

    async function clearList() {
        await AsyncStorage.removeItem('answeredQuestion2')
        setNewQuestion(newQuestion+1)
    }

    async function addToList(item) {
     

        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('answeredQuestion2').then((value) => { 

            

                if(value===null) {
                    AsyncStorage.setItem('answeredQuestion2', item)
                } else {
                    var newValue = value+", "+item
                    AsyncStorage.setItem('answeredQuestion2', newValue)
                }

                resolve(true)
    
            })
        })
    }

    async function isOnList(id) {
       return new Promise((resolve, reject) => {
        AsyncStorage.getItem('answeredQuestion2').then((value) => { 

            if(value===null) {
                resolve(false)
            } else {
                resolve(value.includes(id))
            }
         


        })
       })
    }



    async function questionList() {
        setResultsShown(false)
        setQuestion(undefined)


        for(var i=1;i<10;i--) {
            var item = questions[Math.floor(Math.random()*questions.length)]

            var listItem = "|"+item.id+"|"



            const onList = await isOnList(listItem)

            if(!onList) {
                break;
            }
        }



        const add = await addToList(listItem)

        AsyncStorage.getItem('answeredQuestion2').then((value) => { 

            

            if(value!==null) {
                var count = (value.match(/,/g) || []).length+1

                if(count===questions.length) {
                    clearList()
                } else {
                    setQuestion(item)
                }
            } else {
                setQuestion(item)
            }

            setKey(key+1)
            setIsPlaying(true)
            

            

            
         
            
       
        })



      
    }

    async function endOfTime() {
        setIsPlaying(false)
        showResults()
    }
       

    useEffect(() => {
   
        questionList()
    }, [newQuestion])

    function showResults() {
        setResultsShown(true)
    }


    return (
          <SafeAreaView style={{display:"flex",height:"100%",justifyContent:"space-between",paddingBottom:70,backgroundColor:"#DE2020"}}>

            {typeof question !== 'undefined' ? 
            
                <View style={{backgroundColor:"#2D6BC8",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>
                    <Text style={[
                        styles.font,
                        {color:"#fff",fontSize:20}
                    ]}>{question.question1}</Text>
                    {question.image1 > -1 ? <>
                    
                        <View>
                            <Image source={images[question.image1]} style={{width:80,height:80,marginVertical:5}}/>
                        </View>
                        
                    </> : <></>}
                   
                </View>

            :

                <View style={{backgroundColor:"#2D6BC8",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>   
                    <Text style={[
                            styles.fontBold,
                            {color:"#fff"}
                        ]}><ActivityIndicator size="large" color="#DE2020"/></Text>
                </View> 
        
            }

          

            <View style={{height:80,position:"relative"}}>
                <View style={{position:"absolute",left:0,top:0,height:"100%",width:"100%"}}>
                    <View style={{height:"50%",backgroundColor:"#2D6BC8"}}>
                       
                    </View>
                    <View style={{height:"50%",backgroundColor:"#DE2020"}}>
                        
                    </View>
                </View>
                <View style={{position:"absolute",left:0,top:0,height:"100%",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={[
                        resultsShown?{justifyContent:"center"}:{justifyContent:"flex-end"},
                        {backgroundColor:"#fff",height:"100%",display:"flex",flexDirection:"row",paddingRight:10,alignItems:"center",width:"67%",borderTopRightRadius:99999,borderBottomRightRadius:99999}]}>

                        {resultsShown ? <>
                        
                            <View style={{display:"flex",gap:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={[
                                    styles.fontBold,
                                    {fontSize:25},
                                    question.result>50?{color:"green"}:{color:"#DE2020"},
                                    question.result===50?{color:"black"}:{}
                            ] }    >
                                {question.result}%</Text>
                                <Text style={[
                                    styles.font,
                                    {color:"black",fontSize:17}
                                ]}>NACISNĘŁO</Text>
                            </View>

                        </> : <>
                            <CountdownCircleTimer
                                key={key}
                                size="64"
                                isPlaying={isPlaying}
                                duration={8}
                                colors={['#2D6BC8', '#2D6BC8', '#DE2020', '#DE2020']}
                                onComplete={() => endOfTime()}
                                colorsTime={[7, 5, 2, 0]}
                            >
                                {({ remainingTime }) => <Text style={[
                                    styles.font
                                ]}>{remainingTime}</Text>}

                                
                            </CountdownCircleTimer>

                            <TouchableOpacity onPress={() => showResults()} style={{backgroundColor:"red",height:"80%",aspectRatio:1,borderRadius:99999999,marginLeft:10,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Text><Ionicons name="radio-button-on" size={40} color="#fff" /></Text>
                            </TouchableOpacity>
                        </>}
                       
                        
                    </View>
                    <TouchableOpacity onPress={() => setNewQuestion(newQuestion+1)} style={{height:"100%",aspectRatio:1,borderRadius:9999,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#fff",marginRight:30}}>
                        <AntDesign name="forward" size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {typeof question !== 'undefined' ? 
            
            
                <View style={{backgroundColor:"#DE2020",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>
                     <Text style={[
                        styles.fontBold,
                        {color:"#fff",fontSize:23}
                    ]}>Ale...</Text>
                    <Text style={[
                        styles.font,
                        {color:"#fff",fontSize:20}
                    ]}>{question.question2}</Text>
                       {question.image2 > -1 ? <>
                    
                        <View>
                            <Image source={images[question.image2]} style={{width:80,height:80,marginVertical:5}}/>
                        </View>
                        
                    </> : <></>}
                    
                </View> 
        
            :

                <View style={{backgroundColor:"#DE2020",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>   
                    <Text style={[
                            styles.fontBold,
                            {color:"#fff"}
                        ]}><ActivityIndicator size="large" color="#2D6BC8"/></Text>
                </View> 
        
        }

            {/*<TouchableOpacity onPress={() => clearList()} style={{height:50,backgroundColor:"blue"}}>
                <Text>CLEAR</Text>
    </TouchableOpacity>*/}

            

          </SafeAreaView>
    )
}

export default Button