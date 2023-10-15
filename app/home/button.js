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
        {id: 2, question1: "Za każdy krok dostajesz 10 złotych", question2: "Wszędzie musisz chodzić po klockach lego", result: 61, image1: -1, image2: -1},
        {id: 3, question1: "Możesz podróżować po całym świecie", question2: "Nigdy więcej nie możesz zobaczyć swojej rodziny", result: 34, image1: -1, image2: -1},
        {id: 4, question1: "Dostajesz wymarzoną pracę", question2: "Musisz pracować 7 dni w tygodniu", result: 62, image1: -1, image2: -1},
        {id: 5, question1: "Możesz być niewidzalny", question2: "Już na zawsze", result: 27, image1: -1, image2: -1},
        {id: 6, question1: "Możesz znać wszystkie języki świata", question2: "Być niemym", result: 22, image1: -1, image2: -1},
        {id: 7, question1: "Możesz się przenieść w czasie", question2: "Bez powrotu", result: 74, image1: -1, image2: -1},
        {id: 8, question1: "Możesz mówić w każdym języku świata", question2: "Nie rozumiesz co mówią inni", result: 52, image1: -1, image2: -1},
        {id: 9, question1: "Możesz mieć dar leczenia innych", question2: "Samemu być chorym", result: 32, image1: -1, image2: -1},
        {id: 10, question1: "Możesz być bardzo znany i popularny", question2: "Nie mieć prywatności", result: 71, image1: -1, image2: -1},
        {id: 11, question1: "Masz możliwość pójść na najlepsze studia na świecie", question2: "Musisz studiować przedmiot, którego nie lubisz", result: 43, image1: -1, image2: -1},
        {id: 12, question1: "Możesz sprawić, że ktoś się w Tobie zakocha", question2: "Następnego dnia o Tobie zapomni", result: 46, image1: -1, image2: -1},
        {id: 13, question1: "Nigdy się nie zestarzejesz", question2: "Zawsze będziesz miał 13 lat", result: 64, image1: -1, image2: -1},
        {id: 14, question1: "Będziesz żyć wiecznie", question2: "Twoja ukochana osoba umrze", result: 34, image1: -1, image2: -1},
        {id: 15, question1: "Magia będzie prawdziwa", question2: "Nie będziesz mógł jej używać", result: 75, image1: -1, image2: -1},
        {id: 16, question1: "Dostajesz wszystkie pieniądze Elona Muska", question2: "Umierasz kiedy on umrze", result: 41, image1: -1, image2: -1},
        {id: 17, question1: "Dostajesz milion dolarów", question2: "Jest 20% szans, że od razu umrzesz", result: 20, image1: -1, image2: -1},
        {id: 18, question1: "Możesz zadać pytanie Jezusowi", question2: "Tracisz 15 lat swojego życia", result: 62, image1: -1, image2: -1},
        {id: 19, question1: "Możesz kontrolować pogodę", question2: "Jest ona zależna od Twoich emocji", result: 60, image1: -1, image2: -1},
        {id: 20, question1: "Możesz skończyć głód na świecie", question2: "Nie możesz umyć zębów przez rok", result: 42, image1: -1, image2: -1},
        {id: 21, question1: "Nigdy nie musisz płacić za jedzenie", question2: "Każdy posiłek jest słony", result: 34, image1: -1, image2: -1},
        {id: 22, question1: "Możesz zresetować swoje życie", question2: "Nigdy nie spotkasz nikogo z obecnego życia", result: 34, image1: -1, image2: -1}

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
                        resultsShown?{justifyContent:"center"}:{justifyContent:"center"},
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
                                    {fontSize:17},
                                    question.result>50?{color:"green"}:{color:"#DE2020"},
                                    question.result===50?{color:"black"}:{}
                                ]}>NACISNĘŁO</Text>
                            </View>

                        </> : <>
                            <CountdownCircleTimer
                                key={key}
                                size="64"
                                isPlaying={isPlaying}
                                duration={6}
                                colors={['#2D6BC8', '#2D6BC8', '#DE2020', '#DE2020']}
                                onComplete={() => endOfTime()}
                                colorsTime={[7, 5, 2, 0]}
                            >
                                {({ remainingTime }) => <Text style={[
                                    styles.fontBold,
                                    {paddingBottom:10}
                                ]}>{remainingTime}</Text>}

                                
                            </CountdownCircleTimer>

                            <TouchableOpacity onPress={() => showResults()} style={{backgroundColor:"red",paddingLeft:2,height:"80%",aspectRatio:1,borderRadius:99999999,marginLeft:10,display:"flex",justifyContent:"center",alignItems:"center"}}>
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