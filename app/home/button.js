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
        {id: 22, question1: "Możesz zresetować swoje życie", question2: "Nigdy nie spotkasz nikogo z obecnego życia", result: 34, image1: -1, image2: -1},
        {id: 23, question1: "Możesz podróżować po całym świecie", question2: "Jesteś ostatnim żyjącym człowiekiem", result: 53, image1: -1, image2: -1},
        {id: 24, question1: "Możesz uratować wszystkich ludzi na świecie", question2: "Musisz zabić kogoś, kogo kochasz", result: 48, image1: -1, image2: -1},
        {id: 25, question1: "Możesz rozwiązać problem głodu na świecie", question2: "Tracisz smak", result: 35, image1: -1, image2: -1},
        {id: 26, question1: "Możesz być nieśmiertelny", question2: "Musisz zjeść swojego kota", result: 52, image1: -1, image2: -1},
        {id: 27, question1: "Możesz być pierwszym człowiekiem na Marsie", question2: "Już nigdy z niego nie wrócisz", result: 23, image1: -1, image2: -1},
        {id: 28, question1: "Możesz czytać w myślach", question2: "Każdy może czytać Twoje myśli", result: 28, image1: -1, image2: -1},
        {id: 29, question1: "Możesz uczyć się w Hogwarcie", question2: "Musisz być w Slytherinie", result: 73, image1: -1, image2: -1},
        {id: 30, question1: "Możesz przenosić rzeczy swoim umysłem", question2: "Masz ciągly ból głowy", result: 33, image1: -1, image2: -1},
        {id: 31, question1: "Możesz nauczyć się latać samolotem i helikopterem", question2: "Zapomnieć jak się pływa", result: 64, image1: -1, image2: -1},
        {id: 32, question1: "Możesz mieć nieskończoną ilość pieniędzy", question2: "Umrzesz w wieku 25 lat", result: 52, image1: -1, image2: -1},
        {id: 33, question1: "Dostajesz 10 000zł przy każdym wciśnięciu przycisku", question2: "Za każdym razem umiera losowa osoba na świecie", result: 51, image1: -1, image2: -1},
        {id: 34, question1: "Masz najlepszy komputer na świecie", question2: "Możesz grać tylko w minecraft", result: 42, image1: -1, image2: -1},
        {id: 35, question1: "Dostajesz majątek Elona Muska", question2: "Polują na Ciebie płatni zabójcy", result: 76, image1: -1, image2: -1},
        {id: 36, question1: "Masz umiejętność bycia niewidzialnym", question2: "Nie masz kontroli kiedy to się stanie", result: 39, image1: -1, image2: -1},
        {id: 37, question1: "Twoi rodzice dostają 100 tysięcy złotych", question2: "Ty idziesz do więzienia na rok", result: 35, image1: -1, image2: -1},
        {id: 38, question1: "Możesz czytać ludziom w myślach", question2: "Oni dowiadują się o tym, gdy to robisz", result: 71, image1: -1, image2: -1},
        {id: 39, question1: "Dostajesz milion złotych", question2: "Umiera 10 losowych osób na świecie", result: 87, image1: -1, image2: -1},
        {id: 40, question1: "Możesz jeść wszystko za darmo", question2: "Głód na świecie staje się 2 razy większy", result: 41, image1: -1, image2: -1}, 
        {id: 41, question1: "Zostajesz gwiazdą TikToka", question2: "Nigdy nie możesz użyć innych social mediów", result: 71, image1: -1, image2: -1},
        {id: 42, question1: "Jesteś najładniejszą osobą na świecie", question2: "Masz tylko 60 IQ", result: 51, image1: -1, image2: -1},
        {id: 43, question1: "Możesz przeteleportować się do kogo zechcesz", question2: "Teleportujesz się zawsze, gdy o kimś pomyślisz", result: 24, image1: -1, image2: -1},
        {id: 44, question1: "Możesz rozmawiać z duchami", question2: "Słyszysz ich głosy cały dzień", result: 19, image1: -1, image2: -1},
        {id: 45, question1: "Możesz przewidywać przyszłość", question2: "Nie możesz zmienić swojego losu", result: 41, image1: -1, image2: -1},
        {id: 46, question1: "Masz najszybszy internet na świecie", question2: "Twoja historia z trybu Incognito wychodzi na jaw", result: 36, image1: -1, image2: -1},
        {id: 47, question1: "Dostajesz dowolny telefon za darmo", question2: "Musisz pokazać rodzicom wszystkie zdjęcia z obecnego telefonu", result: 17, image1: -1, image2: -1},
        {id: 48, question1: "Możesz spełnić jedno marzenie", question2: "Zaatakuje Cię pierwsza rzecz po Twojej prawej stronie", result: 18, image1: -1, image2: -1},
        {id: 49, question1: "Poznasz datę swojej śmierci", question2: "Ale nie możesz nic zrobić, żeby ją zmienić", result: 26, image1: -1, image2: -1},
        {id: 50, question1: "Tysiąc złotych spadnie na Ciebie z nieba", question2: "Będą to same monety", result: 67, image1: -1, image2: -1},
        {id: 51, question1: "Dostajesz najnowszego Iphone", question2: "Już nigdy nie możesz włączyć TikToka", result: 41, image1: -1, image2: -1},
        {id: 52, question1: "Dostajesz wszystkie ubrania za darmo", question2: "Każde z nich jest tęczowe", result: 24, image1: -1, image2: -1},
        {id: 53, question1: "Dostajesz nieskończoną ilość pieniędzy", question2: "Poszukuje Ciebie policja", result: 49, image1: -1, image2: -1},
        {id: 54, question1: "Dostajesz najlepsze oceny w szkole", question2: "Nie masz w niej żadnych znajomych", result: 62, image1: -1, image2: -1},
        {id: 55, question1: "Dostajesz 20 000 zł", question2: "Jest 25% szans, że losowe dziecko umrze", result: 82, image1: -1, image2: -1},
        {id: 56, question1: "Możesz przywrocić dowolną osobę do życia", question2: "Umrze ona ponownie za 3 dni", result: 92, image1: -1, image2: -1},
        {id: 57, question1: "Rośniesz 10 cm", question2: "Tracisz 10 IQ", result: 61, image1: -1, image2: -1},
        {id: 58, question1: "Możesz zatrzymywać czas", question2: "Zatrzymujesz się w czasie tak samo jak inni", result: 40, image1: -1, image2: -1},
        {id: 59, question1: "Możesz leczyć choroby innych", question2: "Sam dostajesz te choroby", result: 54, image1: -1, image2: -1},
        {id: 60, question1: "Potrafisz latać", question2: "Nie możesz dotykać ziemi", result: 26, image1: -1, image2: -1},
        {id: 61, question1: "Kończysz wszystkie choroby na świecie", question2: "Tracisz połowę wzrostu", result: 9, image1: -1, image2: -1},
        {id: 62, question1: "Dostajesz 100 000 zł", question2: "Pająki potrafią latać", result: 22, image1: -1, image2: -1},
        {id: 63, question1: "Za każde mrugnięcie dostajesz 10 zł", question2: "Do końca życia słyszysz dźwięk komara przy uchu", result: 60, image1: -1, image2: -1},
        {id: 64, question1: "Jesteś miliarderem", question2: "Idziesz do piekła", result: 54, image1: -1, image2: -1},
        {id: 65, question1: "Zostaniesz milionerem w wieku 60 lat", question2: "Całe życie przed tym jesteś bardzo biedny", result: 18, image1: -1, image2: -1},
        {id: 66, question1: "Staniesz się bogaty i sławny", question2: "Będziesz zdradzany w każdym związku", result: 45, image1: -1, image2: -1},
        {id: 67, question1: "Zarabiasz w pracy 100 000 zł miesięcznie", question2: "Nienawidzisz do niej chodzić", result: 60, image1: -1, image2: -1},
        {id: 68, question1: "Masz milion subskrybcji na YouTube", question2: "Twojego zwierzaka potrąca samochód", result: 38, image1: -1, image2: -1},
        {id: 69, question1: "Zosatjesz milionerem", question2: "Możesz jeść tylko warzywa", result: 82, image1: -1, image2: -1},
        {id: 70, question1: "Stajesz się bardzo bogaty", question2: "Świecisz w ciemności", result: 83, image1: -1, image2: -1},
        {id: 71, question1: "Stajesz się sławny", question2: "Tracisz wszystkich przyjaciół", result: 64, image1: -1, image2: -1},
        {id: 72, question1: "Twoje życie staje się idealne", question2: "Musisz zmienić płeć", result: 41, image1: -1, image2: -1},
        {id: 73, question1: "Możesz rozmawiać z kosmitami", question2: "Zamkną Cię przez to w szpitalu psychiatrycznym", result: 30, image1: -1, image2: -1},
        {id: 74, question1: "Możesz cofnąć się w czasie i naprawić błędy", question2: "racisz wszystkie pieniądze", result: 72, image1: -1, image2: -1},
        {id: 75, question1: "Nigdy na nic nie zachorujesz", question2: "Musisz spać 16 godzin dziennie", result: 58, image1: -1, image2: -1},
        {id: 76, question1: "Potrafisz mówić w każdym języku świata", question2: "Poza językiem polskim", result: 63, image1: -1, image2: -1},
        {id: 77, question1: "Zostajesz na zawsze młody", question2: "Tracisz wszystkich przyjaciół", result: 31, image1: -1, image2: -1},
        {id: 78, question1: "Potrafisz wykrywać kłamstwa", question2: "Już nigdy nie możesz skłamać", result: 60, image1: -1, image2: -1},
        {id: 79, question1: "Zostajesz najpiękniejszą osobą na świecie", question2: "Nigdy nie zobaczysz jak wyglądasz", result: 83, image1: -1, image2: -1},
        {id: 80, question1: "Dostajesz 10zł za każde mrugnięcie", question2: "Masz bardzo słaby wzrok", result: 64, image1: -1, image2: -1},
        {id: 81, question1: "Dostaniesz milion złotych", question2: "Musisz przeżyć na Titanicu", result: 19, image1: -1, image2: -1},
        {id: 82, question1: "Możesz rozmawiać ze zwierzętami", question2: "Zostajesz wegetarianinem do końca życia", result: 65, image1: -1, image2: -1},
        {id: 83, question1: "Dostajesz luksusową willę", question2: "Nigdy nie możesz z niej wyjść", result: 53, image1: -1, image2: -1},
        {id: 84, question1: "Dowiesz się czy Bóg istnieje", question2: "Nie możesz tego nikomu powiedzieć", result: 78, image1: -1, image2: -1},
        {id: 85, question1: "Masz świadome sny", question2: "Masz tylko koszmary", result: 27, image1: -1, image2: -1},
        {id: 86, question1: "Dostajesz 10zł za każdy krok", question2: "Już nigdy nie możesz nosić butów", result: 76, image1: -1, image2: -1},
        {id: 87, question1: "Kończysz głód na świecie", question2: "Już nigdy nie zjesz fast foodów", result: 73, image1: -1, image2: -1},
        {id: 88, question1: "Dowiesz się czy kosmici istnieją", question2: "Jeżeli istnieją to po Ciebie przyjdą", result: 51, image1: -1, image2: -1},
        {id: 89, question1: "Możesz oddychać pod wodą", question2: "Nie potrafisz pływać", result: 29, image1: -1, image2: -1},
        {id: 90, question1: "50% szans na dostanie miliona złotych", question2: "50% szans na to, że milion losowych ludzi umrze", result: 29, image1: -1, image2: -1},
        {id: 91, question1: "Zaczynasz życie od nowa, bez utraty swojej wiedzy", question2: "Nie spotkasz nikogo ze swojego obecnego życia", result: 27, image1: -1, image2: -1},
        {id: 92, question1: "Dostajesz wszystko, czego zapragniesz", question2: "Żyjesz tylko 30 lat", result: 28, image1: -1, image2: -1},
        {id: 93, question1: "Dostajesz jedno życzenie, które się spełni", question2: "Wszyscy poznają Twój największy sekret", result: 39, image1: -1, image2: -1},
        {id: 94, question1: "Już nigdy nie przytyjesz od jedzenia", question2: "Wszystko smakuje tak samo", result: 32, image1: -1, image2: -1},
        {id: 95, question1: "Możesz się przenieść do przyszłości", question2: "Bez powrotu", result: 32, image1: -1, image2: -1},
        {id: 96, question1: "Możesz porozmawiać z Bogiem", question2: "Za każdą minutę rozmowy Twoje życie skraca się o rok", result: 35, image1: -1, image2: -1},
        {id: 97, question1: "Żaden pająk Cię już nigdy nie dotknie", question2: "Zawsze kilka pająków będzie w tym pomieszczeniu co Ty", result: 25, image1: -1, image2: -1},
        {id: 98, question1: "Dostajesz dożywotni zapas ulubionego jedzenia", question2: "Musisz je jeść na oczach głodujących dzieci", result: 42, image1: -1, image2: -1},
        {id: 99, question1: "Dostajesz milion złotych", question2: "Połowę musisz oddać swojemu największemu wrogowi", result: 64, image1: -1, image2: -1},
        {id: 100, question1: "Wszystko co dotkniesz zmienia się w złoto", question2: "Dosłownie wszystko", result: 27, image1: -1, image2: -1},

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