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
        {id: 16, question1: "Mieć dużo znajomych", question2: "Mieć kilku przyjaciół", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 17, question1: "Mieć dzieci", question2: "Nie mieć dzieci", result1: 60, result2: 40, image1: -1, image2: -1},
        {id: 18, question1: "Umrzeć za rok bez bólu", question2: "Umrzeć za 3 lata w bólu", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 19, question1: "Nie mieć rzęs", question2: "Nie mieć paznokci", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 20, question1: "Nie móc mowić nic", question2: "Mówić, ale wszystko o czym myślisz", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 21, question1: "Zawsze świadomie oddychać", question2: "Zawsze świadomie mrugać", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 22, question1: "Zawsze być głodny", question2: "Zawsze być spragniony", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 23, question1: "Mieć 3 oczy i jedno ucho", question2: "Mieć 3 uszy i jedno oko", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 24, question1: "Widzieć kto Cię potajemnie kocha", question2: "Widzieć kto Cię potajemnie nie lubi", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 25, question1: "Widzieć przyszłość", question2: "Zmienić przeszłość", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 26, question1: "Żyć w świecie Marvela", question2: "Żyć w świecie Harrego Pottera", result1: 23, result2: 77, image1: -1, image2: -1},
        {id: 27, question1: "Mieć tylko jedną rękę", question2: "Mieć tylko jedną nogę", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 28, question1: "Spędzić całe wakacje nad morzem", question2: "Spędzić całe wakacje w górach", result1: 58, result2: 42, image1: -1, image2: -1},
        {id: 29, question1: "Zdradzić drugą połówkę", question2: "Zostać zdradzonym", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 30, question1: "Mieć tylko jedną rękę", question2: "Mieć tylko jedną nogę", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 31, question1: "Żyć w świecie bez internetu", question2: "Żyć w świecie bez muzyki", result1: 28, result2: 72, image1: -1, image2: -1},
        {id: 32, question1: "Mieć 100 milionów zł", question2: "Mieć 1zł i podwajać tę kwotę każdego dnia", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 33, question1: "Stracić wszystkie wspomnienia", question2: "Stracić wszystkie umiejętności", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 34, question1: "Zmienić płeć na jeden dzień", question2: "Zostać dowolnym zwierzęciem na jeden dzień", result1: 68, result2: 32, image1: -1, image2: -1},
        {id: 35, question1: "Być świetnym gitarzystą", question2: "Być świetnym pianistą", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 36, question1: "Móc zatrzymywać czas", question2: "Móc stawać się niewidzialnym", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 37, question1: "Nie mieć wcale włosów", question2: "Mieć bardzo dużo włosów", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 38, question1: "Być wampirem", question2: "Być łowcą wampirów", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 39, question1: "Być całe życie z jedną osobą", question2: "Być całe życie singlem", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 40, question1: "Nigdy nie móc powiedzieć NIE", question2: "Nigdy nie móc powiedzieć TAK", result1: 39, result2: 61, image1: -1, image2: -1},
        {id: 41, question1: "Skoczyć ze spadochronem", question2: "Nurkować w głębi oceanu", result1: 70, result2: 30, image1: -1, image2: -1},
        {id: 42, question1: "Do końca życia móc grać tylko w Fortnite", question2: "Do końca życia móc grać tylko w Minecraft", result1: 25, result2: 75, image1: -1, image2: -1},
        {id: 43, question1: "Spędzić noc na środku oceanu", question2: "Spędzić noc w lesie", result1: 39, result2: 61, image1: -1, image2: -1},
        {id: 44, question1: "Żyć wiecznie ale nie być szczęśliwym", question2: "Żyć 30 lat, ale być szczęśliwym", result1: 49, result2: 51, image1: -1, image2: -1},
        {id: 45, question1: "Żyć samotnie, ale być dobrym człowiekiem", question2: "Mieć przyjaciół i znajomych, ale być złym człowiekiem", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 46, question1: "Umrzeć przed Twoją drugą połówką", question2: "Umrzeć po Twojej drugiej połówce", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 47, question1: "Mieć leniwego partnera", question2: "Mieć głupiego partnera", result1: 58, result2: 42, image1: -1, image2: -1},
        {id: 48, question1: "Być wysokim ale grubym", question2: "Być niskim, ale dobrze zbudowanym", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 49, question1: "Pójść do więzienia na rok", question2: "Mieć areszt domowy przez 5 lat", result1: 33, result2: 67, image1: -1, image2: -1},
        {id: 50, question1: "Być najsilniejszym człowiekiem na świecie", question2: "Być najmądrzejszym człowiekiem na świecie", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 51, question1: "Nigdy nie dostawać pracy domowej w szkole", question2: "Nigdy nie mieć sprawdzianów w szkole", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 52, question1: "Nie mieć internetu przez rok", question2: "Płacić za wszystko 15% więcej przez rok", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 53, question1: "Być jedyną osobą, która będzie żyć wiecznie", question2: "Być jedyną osobą, która nie będzie żyć wiecznie", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 54, question1: "Jeść tylko słodkie jedzenie", question2: "Jeść tylko słone jedzenie", result1: 65, result2: 35, image1: -1, image2: -1},
        {id: 55, question1: "Być ubrany w kurtkę w lecie", question2: "Być w samej podkoszulce w zimie", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 56, question1: "Oglądać tylko filmy do końca życia", question2: "Grać tylko w gry do końca życia", result1: 31, result2: 69, image1: -1, image2: -1},
        {id: 57, question1: "Mieć awarię spadochronu podczas skoku spadochronowego", question2: "Mieć awarię silnika podczas lotu helikopterem", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 58, question1: "Zawsze czuć losowy smak", question2: "Nigdy nie czuć smaków", result1: 66, result2: 34, image1: -1, image2: -1},
        {id: 59, question1: "Mieć świetny węch, ale nie mieć smaku", question2: "Mieć świetny smak, ale nie mieć węchu", result1: 27, result2: 73, image1: -1, image2: -1},
        {id: 60, question1: "Mieć dużo pieniędzy, ale mało czasu", question2: "Mieć mało pieniędzy, ale dużo czasu", result1: 59, result2: 41, image1: -1, image2: -1},
        {id: 61, question1: "Żeby zawsze było za zimno", question2: "Żeby zawsze było za ciepło", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 62, question1: "Znaleźć miłość życia, ale żyć w biedzie", question2: "Być bogatym singlem przez całe życie", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 63, question1: "Mieć za darmo jedzenie jakie tylko chcesz", question2: "Mieć za darmo ubrania jakie tylko chcesz", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 64, question1: "Mieć w domu myszy", question2: "Mieć w domu węże", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 65, question1: "Spędzić całe życie na dworze", question2: "Spędzić całe życie w pomieszczeniach", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 66, question1: "Być wysokim ale grubym", question2: "Być niskim, ale dobrze zbudowanym", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 67, question1: "Być w związku, ale nie mieć znajomych", question2: "Nie być w związku, ale mieć znajomych", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 68, question1: "Włamać się do obcego domu i spędzić w nim dzień w ukryciu", question2: "Spędzić 6 dni na dworze bez namiotu", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 69, question1: "Być osądzany i oceniany przez wszystkich", question2: "", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 70, question1: "Pić gorące napoje w lecie", question2: "Pić lodowate napoje w zimie", result1: 22, result2: 78, image1: -1, image2: -1},
        {id: 71, question1: "Mieć w domu kino", question2: "Mieć w domu siłownie", result1: 49, result2: 51, image1: -1, image2: -1},
        {id: 72, question1: "Nigdy już nie słuchać muzyki", question2: "Cały czas słyszeć muzykę w głowie", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 73, question1: "Nie móc nigdy wyjść z domu, ale mieć internet", question2: "Móc wychodzić z domu, ale nie mieć internetu", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 74, question1: "Pokazywać całe swoje życie w social mediach", question2: "Nigdy już nie korzystać z social mediów (w tym z komunikatorów jak messenger itp.)", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 75, question1: "Jeść tylko spalone jedzenie", question2: "Jeść tylko surowe jedzenie", result1: 67, result2: 33, image1: -1, image2: -1},
        {id: 76, question1: "Żyć w miejscowości, gdzie mieszkasz od małego całe życie", question2: "Nigdy nie móc wrócić do miejscowości w której mieszkałeś od małego", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 77, question1: "Poprawić swój wygląd", question2: "Zwiększyć swoją inteligencję", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 78, question1: "Spędzić 2 lata w więzieniu", question2: "Spędzać weekendy w więzieniu przez 5 lat", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 79, question1: "Poprawić swoje zdrowie fizyczne o 50%", question2: "Poprawić swoje zdrowie psychiczne o 50%", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 80, question1: "Wiedzieć co wydarzy się w Twoim życiu", question2: "Nie wiedzieć co wydarzy się w Twoim życiu", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 81, question1: "Obchodzić tylko swoje urodziny", question2: "Obchodzić tylko urodziny innych", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 82, question1: "Zostać królem/królową Wielkiej Brytani", question2: "Zostać prezydentem USA", result1: 54, result2: 46, image1: -1, image2: -1},
        {id: 83, question1: "Pić sok jabłkowy do końca życia", question2: "Pić sok pomarańczowy do końca życia", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 84, question1: "Umieć tylko pisać", question2: "Umieć tylko czytać", result1: 21, result2: 79, image1: -1, image2: -1},
        {id: 85, question1: "Być wampirem", question2: "Być wilkołakiem", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 86, question1: "Być doktorem", question2: "Być prawnikiem", result1: 49, result2: 51, image1: -1, image2: -1},
        {id: 87, question1: "Rodzina Cię nienawidzi", question2: "Wszyscy poza rodziną Cię nienawidzą", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 88, question1: "Mieć wymarzony samochód, ale nie móc nim jeździć", question2: "Mieć multiplę (albo inny kiepski samochód) i nieskończoną ilość paliwa", result1: 70, result2: 30, image1: -1, image2: -1},
        
        
        

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