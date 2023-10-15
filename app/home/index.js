import { Text, View, SafeAreaView,TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { styles } from "../../assets/styles/Style"
import { AntDesign } from '@expo/vector-icons'

import { useEffect, useState } from "react"

import AsyncStorage from '@react-native-async-storage/async-storage'





const Home = () => {
     
    const [ question, setQuestion ] = useState()
    const [ resultsShown, setResultsShown ] = useState(false)
    const [ newQuestion, setNewQuestion ] = useState(1)


    const images = [
       
    ]


    const questions = [
        {id: 1, question1: "Dostać 1 000 000zł za 10 lat", question2: "Dostać 300 000zł teraz", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 2, question1: "Być samotnym milionerem", question2: "Być biednym, ale mieć kochającą rodzinę i przyjaciół", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 3, question1: "Zawsze mówić prawdę, ale nie być lubianym", question2: "Zawsze kłamać, ale być lubianym", result1: 33, result2: 67, image1: -1, image2: -1},
        {id: 4, question1: "Dużo zarabiać, ale nie lubić swojej pracy", question2: "Mało zarabiać, ale lubić swoją pracę", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 5, question1: "Poznać datę swojej śmierci", question2: "Nie wiedzieć kiedy umrzesz", result1: 41, result2: 59, image1: -1, image2: -1},
        {id: 6, question1: "Coca Cola", question2: "Pepsi", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 7, question1: "Żyć bez przyjaźni", question2: "Żyć bez miłości", result1: 73, result2: 27, image1: -1, image2: -1},
        {id: 8, question1: "Umrzeć szczęśliwy za rok", question2: "Umrzeć nieszczęśliwy za 40 lat", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 9, question1: "Nigdy nie jeść pizzy", question2: "Nigdy nie jeść sushi", result1: 19, result2: 81, image1: -1, image2: -1},
        {id: 10, question1: "Nie obchodzić świąt", question2: "Nie obchodzić urodzin", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 11, question1: "Nie słyszeć", question2: "Nie mówić", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 12, question1: "Zobaczyć przyjaciela z Twoją drugą połówką", question2: "Zobaczyć wroga z Twoją drugą połówką", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 13, question1: "Zjeść 10 zgniłych ziemniaków", question2: "Już nigdy nie zjeść lodów", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 14, question1: "Psy", question2: "Koty", result1: 70, result2: 30, image1: -1, image2: -1},
        {id: 15, question1: "Być głupi, ale lubiany", question2: "Być mądry, ale nie lubiany", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 16, question1: "Mieć dużo znajomych", question2: "Mieć kilku przyjaciół", result1: 38, result2: 62, image1: -1, image2: -1}

    ]

 

    async function clearList() {
        await AsyncStorage.removeItem('answeredQuestion')
        setNewQuestion(newQuestion+1)
    }

    async function addToList(item) {
     

        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('answeredQuestion').then((value) => { 

            

                if(value===null) {
                    AsyncStorage.setItem('answeredQuestion', item)
                } else {
                    var newValue = value+", "+item
                    AsyncStorage.setItem('answeredQuestion', newValue)
                }

                resolve(true)
    
            })
        })
    }

    async function isOnList(id) {
       return new Promise((resolve, reject) => {
        AsyncStorage.getItem('answeredQuestion').then((value) => { 

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

        AsyncStorage.getItem('answeredQuestion').then((value) => { 

            

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
         
            
       
        })



      
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
            
                <TouchableOpacity onPress={resultsShown === false ? () => showResults() : () => setNewQuestion(newQuestion+1)} style={{backgroundColor:"#2D6BC8",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>
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
                            {color:"#fff"}
                        ]}><ActivityIndicator size="large" color="#DE2020"/></Text>
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
                    <View style={{backgroundColor:"#fff",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",width:"67%",borderTopRightRadius:99999,borderBottomRightRadius:99999}}>
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
            
            
                <TouchableOpacity onPress={resultsShown === false ? () => showResults() : () => setNewQuestion(newQuestion+1)} style={{backgroundColor:"#DE2020",flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:35}}>
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

export default Home