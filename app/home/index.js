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
        {id: 34, question1: "Być przeciwnej płci przez jeden dzień", question2: "Zostać dowolnym zwierzęciem na jeden dzień", result1: 68, result2: 32, image1: -1, image2: -1},
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
        {id: 89, question1: "Mieć starsze rodzeństwo", question2: "Mieć młodsze rodzeństwo", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 90, question1: "Żyć samotnie na bezludnej wyspie", question2: "Żyć w przeludnionym mieście", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 91, question1: "Stracić możliwość mówienia", question2: "Stracić możliwość chodzenia", result1: 23, result2: 77, image1: -1, image2: -1},
        {id: 92, question1: "Powiedzieć wszystkie sekrety rodzicom", question2: "Powiedzieć wszysstkie sekrety znajomemu", result1: 31, result2: 69, image1: -1, image2: -1},
        {id: 93, question1: "Znaleźć się w Twojej ulubionej grze", question2: "Znaleźć się w Twoim ulubionym filmie", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 94, question1: "Urodzić się w Polsce", question2: "Urodzić się w USA", result1: 41, result2: 59, image1: -1, image2: -1},
        {id: 95, question1: "Używać tylko łyżki", question2: "Używać tylko widelca", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 96, question1: "Nie jeść mięsa", question2: "Nie jeść owoców", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 97, question1: "Zawsze jeść zimne jedzenie", question2: "Zawsze dojadać resztki", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 98, question1: "Idziesz do nieba, ale Twoja rodzina idzie do piekła", question2: "Idziesz do piekła, ale Twoja rodzina idzie do nieba", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 99, question1: "Życie Twojego zwierzaka", question2: "Życie 5 nieznajomych osób", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 100, question1: "Minuta rozmowy z Jezusem", question2: "Milion złotych", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 101, question1: "Zostać weganinem", question2: "Musieć polować na swoje jedzenie", result1: 75, result2: 25, image1: -1, image2: -1},
        {id: 102, question1: "Mieć homoseksualnego syna", question2: "Mieć homoseksualną córkę", result1: 23, result2: 77, image1: -1, image2: -1},
        {id: 103, question1: "Już nigdy nie jeść mięsa", question2: "Już nigdy nie jeść słodyczy", result1: 65, result2: 35, image1: -1, image2: -1},
        {id: 104, question1: "Żeby rodzice zobaczyli Twoją galerię", question2: "Żeby rodzice zobaczyli Twoje wiadomości", result1: 80, result2: 20, image1: -1, image2: -1},
        {id: 105, question1: "Mieć 20 lojalnych przyjaciół", question2: "Dostać milion złotych", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 106, question1: "Nie oglądać więcej TikToka", question2: "Nie oglądać więcej YouTube", result1: 67, result2: 33, image1: -1, image2: -1},
        {id: 107, question1: "Rozpocząć biznes samemu", question2: "Rozpocząć biznes z przyjacielem", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 108, question1: "Dostać 50 000 złotych", question2: "Dać 300 000 zł losowej osobie", result1: 77, result2: 23, image1: -1, image2: -1},
        {id: 109, question1: "Zarabiać 30 tysięcy zł miesięcznie", question2: "Dostać 500 tysięcy zł", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 110, question1: "Nie wiedzieć rodziców 2 lata", question2: "Nie widzieć przyjaciół rok", result1: 65, result2: 35, image1: -1, image2: -1},
        {id: 111, question1: "Tracisz wzrok", question2: "Pięciu Twoich przyjaciół traci wzrok", result1: 24, result2: 76, image1: -1, image2: -1},
        {id: 112, question1: "Zostać psem", question2: "Zostać kotem", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 113, question1: "Móc kontrolować swoje sny", question2: "Móc nagrywać swoje sny", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 114, question1: "Mieć milion obserwujących na TikToku", question2: "Mieć milion subskrybcji na YouTube", result1: 28, result2: 72, image1: -1, image2: -1},
        {id: 115, question1: "Być rok w śpiączce", question2: "Być rok w więzieniu", result1: 67, result2: 33, image1: -1, image2: -1},
        {id: 116, question1: "Żyć 40 lat jako człowiek", question2: "Być nieśmiertelnym w ciele kota", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 117, question1: "Dostać 1 milion zł", question2: "Mieć 50% szans, że dostaniesz 1 miliard zł", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 118, question1: "Oglądać tylko horrory", question2: "Oglądać tylko komedie", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 119, question1: "Płakać, kiedy ktoś się śmieje", question2: "Śmiać się, kiedy ktoś płacze", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 120, question1: "Zabić rodzeństwo", question2: "Zabić drugą połówkę", result1: 27, result2: 73, image1: -1, image2: -1},
        {id: 121, question1: "Mieć supermoce", question2: "Znaleźć prawdziwą miłość", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 122, question1: "10.000 zł w banknotach", question2: "100.000 zł w jedno groszówkach, bez możliwości wymiany na banknoty", result1: 70, result2: 30, image1: -1, image2: -1},
        {id: 123, question1: "Wygrać wycieczkę do Włoch", question2: "Wygrać wycieczkę do Hiszpanii", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 124, question1: "Nie potrzebować jedzenia i picia", question2: "Nie potrzebować wypoczynku", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 125, question1: "Mieszkać na najwyższym piętrze", question2: "Mieszkać na parterze", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 126, question1: "Mieszkać na parterze", question2: "Wypić koktajl bananowo-rybny", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 127, question1: "Jeździć na kolejce górskiej przez 24 godziny", question2: "Siedzieć w bezruchu przez 24 godziny", result1: 68, result2: 32, image1: -1, image2: -1},
        {id: 128, question1: "Okropnie śpiewać", question2: "Okropnie tańczyć", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 129, question1: "Być małym dzieckiem przez 1 dzień", question2: "Być przeciwnej płci przez 1 dzień", result1: 27, result2: 73, image1: -1, image2: -1},
        {id: 130, question1: "Być przeziębionym do końca życia", question2: "Być niewidomym na jedno oko", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 131, question1: "Nigdy nie być smutnym", question2: "Nigdy niczego się nie bać", result1: 73, result2: 27, image1: -1, image2: -1},
        {id: 132, question1: "Żyć bez elektroniki", question2: "Żyć bez przyjaciół", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 133, question1: "Zabić kogoś, ale nikt by o tym nie wiedział", question2: "Nie zabić nikogo, ale każdy myśli, że to zrobiłeś", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 134, question1: "Spędzić noc w nawiedzonym domu", question2: "Zgubić się nocą w lesie", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 135, question1: "Być bałaganiarzem", question2: "Być przewrażliwionym na punkcie czystości", result1: 58, result2: 42, image1: -1, image2: -1},
        {id: 136, question1: "Nie mieć paznokci", question2: "Być łysy", result1: 54, result2: 46, image1: -1, image2: -1},
        {id: 137, question1: "Mieć 20 milionów subskrybentów na YouTube", question2: "Być reżyserem najlepszego filmu wszechczasów", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 138, question1: "Wynaleźć lek na raka", question2: "Być pierwszą osobą, która nawiąże kontakt z kosmitami", result1: 75, result2: 25, image1: -1, image2: -1},
        {id: 139, question1: "Chodzić do pracy", question2: "Chodzić do pracy", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 140, question1: "Nie mieć rodziny", question2: "Nie mieć przyjaciół", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 141, question1: "Kochać", question2: "Być kochanym", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 142, question1: "Być grubym", question2: "Mieć anoreksję", result1: 26, result2: 74, image1: -1, image2: -1},
        {id: 143, question1: "Czytać", question2: "Pisać", result1: 75, result2: 25, image1: -1, image2: -1},
        {id: 144, question1: "Do końca życia jeść tylko ser", question2: "Do końca życia jeść tylko szynkę", result1: 18, result2: 82, image1: -1, image2: -1},
        {id: 145, question1: "Nie jeść śniadań", question2: "Nie jeść kolacji", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 146, question1: "Nigdy nie musieć chodzić do toalety", question2: "Nigdy nie musieć chodzić spać", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 147, question1: "Mieć okropny kaszel", question2: "Mieć okropny katar", result1: 76, result2: 24, image1: -1, image2: -1},
        {id: 148, question1: "Umieć czytać w myślach", question2: "Umieć przenosić się w czasie", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 149, question1: "Mieszkać tylko z tatą", question2: "Mieszkać tylko z mamą", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 150, question1: "Uczyć się w Hogwarcie", question2: "Wygrać Igrzyska Śmierci", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 151, question1: "Żyć rok w łodzi podwodnej", question2: "Żyć rok w kosmosie", result1: 28, result2: 72, image1: -1, image2: -1},
        {id: 152, question1: "Mieć córkę", question2: "Mieć syna", result1: 30, result2: 70, image1: -1, image2: -1},
        {id: 153, question1: "Nie móc chodzić", question2: "Nie móc mówić", result1: 54, result2: 46, image1: -1, image2: -1},
        {id: 154, question1: "Żyć za 1000 lat", question2: "Żyć 1000 lat temu", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 155, question1: "Ożenić się z bogatą staruszką", question2: "Ożenić się z biedną, ale śliczną kobietą", result1: 68, result2: 32, image1: -1, image2: -1},
        {id: 156, question1: "Żyć w willi", question2: "Żyć w zamku", result1: 67, result2: 33, image1: -1, image2: -1},
        {id: 157, question1: "Znać wszystkie języki świata", question2: "Być matematycznym geniuszem", result1: 65, result2: 35, image1: -1, image2: -1},
        {id: 158, question1: "Kontrolować pogodę", question2: "Kontrolować grawitację", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 159, question1: "Móc rozmawiać ze zwierzętami", question2: "Móc latać", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 160, question1: "Być nieśmiertelnym", question2: "Móc podróżować w czasie", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 161, question1: "Nie jeść przez tydzień", question2: "Nie spać przez 3 dni", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 162, question1: "Dostawać grosz za każdy krok", question2: "Dostawać złotówkę za każdy skok", result1: 7, result2: 93, image1: -1, image2: -1},
        {id: 163, question1: "Filmy", question2: "Seriale", result1: 70, result2: 30, image1: -1, image2: -1},
        {id: 164, question1: "Być sławnym youtuberem", question2: "Być sławnym aktorem", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 165, question1: "McDonalds", question2: "KFC", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 166, question1: "Pizza", question2: "Burger", result1: 77, result2: 23, image1: -1, image2: -1},
        {id: 167, question1: "Zatrudnić sprzątaczkę", question2: "Zatrudnić kucharza", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 168, question1: "Sauna", question2: "Basen", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 169, question1: "Prywatny helikopter", question2: "Prywatny odrzutowiec", result1: 30, result2: 70, image1: -1, image2: -1},
        {id: 170, question1: "Przywrócić kogoś do życia", question2: "Dostać 500 000zł", result1: 68, result2: 32, image1: -1, image2: -1},
        {id: 171, question1: "Nie jeść jeden dzień", question2: "Nie pić jeden dzień", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 172, question1: "Zwiedzić cały ocean", question2: "Zwiedzić cały kosmos", result1: 18, result2: 82, image1: -1, image2: -1},
        {id: 173, question1: "Mieć świetną pamięć", question2: "Móc zapomnieć o czym chcesz", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 174, question1: "Dostać 50 000 zł", question2: "Dostać 100 000 zł i oddać przyjacielowi", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 175, question1: "Przegapić pogrzeb przyjaciela", question2: "Przegapić wesele przyjaciela", result1: 65, result2: 35, image1: -1, image2: -1},
        {id: 176, question1: "Nigdy nie czekać w kolejce", question2: "Nigdy nie czekać w korku", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 177, question1: "Rozmawiać z roślinami", question2: "Rozmawiać ze zwierzętami", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 178, question1: "Poznać datę swojej śmierci", question2: "Poznać powód swojej śmierci", result1: 66, result2: 34, image1: -1, image2: -1},
        {id: 179, question1: "Dostać 1 000 zł", question2: "Oddać 10 000 zł na cele charytatywne", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 180, question1: "Nigdy nie powiedzieć komplementu", question2: "Nigdy nie otrzymać komplementu", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 181, question1: "Nigdy nie czytać książek", question2: "Nigdy nie słuchać muzyki", result1: 88, result2: 12, image1: -1, image2: -1},
        {id: 182, question1: "Uratować życie nieznajomego", question2: "Uratować życie swojego zwierzaka", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 183, question1: "Zawsze kłamać", question2: "Zawsze mówić prawdę", result1: 14, result2: 86, image1: -1, image2: -1},
        {id: 184, question1: "Zawsze widzieć niewyraźnie", question2: "Zawsze widzieć w czerni i bieli", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 185, question1: "Wyglądać całe życie jak dziesięciolatek", question2: "Wyglądać całe życie jak siedemdziesięciolatek", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 186, question1: "Stracić dostęp do internetu na całe życie", question2: "Stracić rękę", result1: 58, result2: 42, image1: -1, image2: -1},
        {id: 187, question1: "Zmienić religię", question2: "Zmienić poglądy polityczne", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 188, question1: "Mieć psa", question2: "Mieć kota", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 189, question1: "Apokalipsa zombie", question2: "Inwazja zombie", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 190, question1: "Mieć słaby dom, ale dobry samochód", question2: "Mieć dobry dom, ale słaby samochód", result1: 13, result2: 87, image1: -1, image2: -1},
        {id: 191, question1: "Nike", question2: "Adidas", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 192, question1: "Louis Vuitton", question2: "Gucci", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 193, question1: "Zara", question2: "H&M", result1: 80, result2: 20, image1: -1, image2: -1},
        {id: 194, question1: "Złamać nos", question2: "Stracić ząb", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 195, question1: "Ból głowy", question2: "Ból zęba", result1: 60, result2: 40, image1: -1, image2: -1},
        {id: 196, question1: "Znaleźć prawdziwego przyjaciela", question2: "Znajdź prawdziwą miłłość", result1: 24, result2: 76, image1: -1, image2: -1},
        {id: 197, question1: "Stracić palec", question2: "Mieć 100 000zł długu", result1: 59, result2: 41, image1: -1, image2: -1},
        {id: 198, question1: "Już nigdy nie rozmawiać z mamą", question2: "Już nigdy nie rozmawiać z tatą", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 199, question1: "Zostać w domu", question2: "Iść na imprezę", result1: 39, result2: 61, image1: -1, image2: -1},
        {id: 201, question1: "Zakończyć wszystkie wojny", question2: "Zakończyć głód na świecie", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 202, question1: "Mieć asystentkę", question2: "Mieć ochroniarza", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 203, question1: "Być z kimś starszym o 10 lat", question2: "Być z kimś młodszym o 10 lat", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 204, question1: "Być bogaty, ale nie znany", question2: "Być znany, ale biedny", result1: 66, result2: 34, image1: -1, image2: -1},
        {id: 205, question1: "Nigdy nie zjeść już ciepłego jedzenia", question2: "Nigdy nie wypić już zimnego napoju", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 206, question1: "Być sławnym piosenkarzem", question2: "Być sławnym aktorem", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 207, question1: "Biała czekolada", question2: "Mleczna czekolada", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 208, question1: "Być najmądrzejszy na świecie", question2: "Być najbogatszy na świecie", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 209, question1: "Pocałować losową osobę", question2: "Walczyć z losową osobą", result1: 66, result2: 34, image1: -1, image2: -1},
        {id: 210, question1: "Żyć w świecie bez wojen i głodu", question2: "Dostać 100 milionów zł", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 211, question1: "Już nigdy nie używać telefonu", question2: "Już nigdy nie używać komputera", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 212, question1: "Cały czas biegać", question2: "Cały czas chodzić boso", result1: 79, result2: 21, image1: -1, image2: -1},
        {id: 213, question1: "Żyć tydzień bez papieru toaletowego", question2: "Żyć tydzień bez Wi-Fi", result1: 28, result2: 72, image1: -1, image2: -1},
        {id: 214, question1: "Lamborghini", question2: "Ferrari", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 215, question1: "Audi", question2: "Bmw", result1: 24, result2: 76, image1: -1, image2: -1},
        {id: 216, question1: "Brać codziennie zimne prysznice", question2: "Jeść codziennie zimne jedzenie", result1: 65, result2: 35, image1: -1, image2: -1},
        {id: 217, question1: "Przejść po rozżarzonym węglu", question2: "Przejść po potłuczonym szkle", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 218, question1: "Pizza", question2: "Sushi", result1: 81, result2: 19, image1: -1, image2: -1},
        {id: 219, question1: "Monster", question2: "Red Bull", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 220, question1: "Kurczak", question2: "Ryba", result1: 82, result2: 18, image1: -1, image2: -1},
        {id: 221, question1: "Jabłko", question2: "Banan", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 222, question1: "Być jedynakiem", question2: "Mieć 10 rodzeństwa", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 223, question1: "Dostać 10 000 000 zł", question2: "Znaleźć prawdziwą miłość", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 224, question1: "Zostać prezydentem", question2: "Zostać astronautą", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 225, question1: "Nigdy nie pójść na imprezę", question2: "Nigdy nie pójść do kościoła", result1: 14, result2: 86, image1: -1, image2: -1},
        {id: 226, question1: "Być najśmieszniejszy na świecie", question2: "Być najprzystojniejszy na świecie", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 227, question1: "Żyć w uniwersum Star Wars", question2: "Żyć w uniwersum Wiedźmina", result1: 66, result2: 34, image1: -1, image2: -1},
        {id: 228, question1: "Lody waniliowe", question2: "Lody czekoladowe", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 229, question1: "Być biedny całe życie", question2: "Być bogaty, ale żyć tylko kolejne 10 lat", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 230, question1: "Stracić wszystkie pieniądze zarobione w tym roku", question2: "Stracić wszystkie wspomnienia z tego roku", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 231, question1: "Usłyszeć najpierw złą wiadomość", question2: "Usłyszeć najpierw dobrą wiadomość", result1: 76, result2: 24, image1: -1, image2: -1},
        {id: 232, question1: "Sport", question2: "E-sport", result1: 76, result2: 24, image1: -1, image2: -1},
        {id: 233, question1: "Netflix", question2: "YouTube", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 234, question1: "Muzyka", question2: "Filmy", result1: 20, result2: 80, image1: -1, image2: -1},
        {id: 235, question1: "Morze", question2: "Góry", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 236, question1: "Oszczędzić życie swojej rodziny", question2: "Oszczędzić życie miliona ludzi", result1: 41, result2: 59, image1: -1, image2: -1},
        {id: 237, question1: "Już nigdy nie uprawiać sportu", question2: "Już nigdy nie oglądać filmów", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 238, question1: "Lays", question2: "Doritos", result1: 73, result2: 27, image1: -1, image2: -1},
        {id: 239, question1: "Snickers", question2: "KitKat", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 240, question1: "Tymbark", question2: "Caprio", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 241, question1: "Jeść tylko fast foody do końca życia", question2: "Nigdy nie jeść fast foodów", result1: 26, result2: 74, image1: -1, image2: -1},
        {id: 242, question1: "Pizza hawajska", question2: "Rosół z ziemniakami", result1: 78, result2: 22, image1: -1, image2: -1},
        {id: 243, question1: "Nigdy nie odczuwać emocji", question2: "Nigdy nie okazywać emocji", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 244, question1: "Gadać przez sen każdej nocy", question2: "Lunatykować każdej nocy", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 245, question1: "Pójść na kolację ze znanym sportowcem", question2: "Pójść na kolację ze znanym muzykiem", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 246, question1: "Nie mieć pamięci do twarzy", question2: "Nie mieć pamięci do imion", result1: 31, result2: 69, image1: -1, image2: -1},
        {id: 247, question1: "Utknąć na oceanie", question2: "Utknąć na pustyni", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 248, question1: "Być pierwszym człowiekiem na Marsie", question2: "Wynaleźć lek na wszystkie choroby", result1: 24, result2: 76, image1: -1, image2: -1},
        {id: 249, question1: "Stracić wszystkie pieniądze", question2: "Stracić wszystkie zdjęcia", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 250, question1: "Potrącić kogoś samochodem", question2: "Zostać potrąconym", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 251, question1: "TikTok", question2: "Instagram", result1: 66, result2: 34, image1: -1, image2: -1},
        {id: 252, question1: "Twitter (X)", question2: "Facebook", result1: 30, result2: 70, image1: -1, image2: -1},
        {id: 253, question1: "Youtube", question2: "Twitch", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 254, question1: "Netflix", question2: "Disney+", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 255, question1: "Mieszkać w górach", question2: "Mieszkać nad morzem", result1: 58, result2: 42, image1: -1, image2: -1},
        {id: 256, question1: "Pracować w biurze", question2: "Pracować w terenie", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 257, question1: "Być sławnym za życia, ale zapomnianym po śmierci", question2: "Być nikim za życia, ale sławnym po śmierci", result1: 78, result2: 22, image1: -1, image2: -1},
        {id: 258, question1: "Nigdy nie mieć prawa jazdy", question2: "Nigdy nie mieć telefonu", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 259, question1: "Dobrze wyglądać, ale źle pachnieć", question2: "Dobrze pachnieć, ale źle wyglądać", result1: 80, result2: 20, image1: -1, image2: -1},
        {id: 260, question1: "Mieszkać w Nowym Jorku", question2: "Mieszkać w Londynie", result1: 73, result2: 27, image1: -1, image2: -1},
        {id: 261, question1: "Jeździć pociągiem", question2: "Jeździć samochodem", result1: 19, result2: 81, image1: -1, image2: -1},
        {id: 262, question1: "Spacerować", question2: "Jeździć na rowerze", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 263, question1: "Woda gazowana", question2: "Woda niegazowana", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 264, question1: "Móc spotkać się ze zmarłym celebrytą", question2: "Móc spotkać się z żyjącym celebrytą", result1: 25, result2: 75, image1: -1, image2: -1},
        {id: 265, question1: "Nie myć głowy przez rok", question2: "Nie myć zębów przez miesiąc", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 266, question1: "Być najbogatszym na świecie", question2: "Być najszczęśliwszym na świecie", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 267, question1: "Mieć dziecko w wieku 70 lat", question2: "Nigdy nie mieć dziecka", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 268, question1: "Dać wzrok niewidomemu", question2: "Dostać 10 milionów złotych", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 269, question1: "Mieć brata", question2: "Mieć siostrę", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 270, question1: "Żyć w świecie z superbohaterami", question2: "Żyć w normalnym świecie", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 271, question1: "Nosić tylko dżinsy", question2: "Nosić tylko dresy", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 272, question1: "Zaryzykować zakładając własyn biznes (możesz stracić wszystko)", question2: "Pracować całe życie na etacie za przeciętną pensję", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 273, question1: "Odnieść sukces, ale być nieszczęśliwy", question2: "Nie odnieść sukcesu, ale być szczęśliwy", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 274, question1: "Móc kontrolować ogień", question2: "Móc kontrolować wodę", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 275, question1: "Być samotnym", question2: "Być w nieszczęśliwym związku", result1: 81, result2: 19, image1: -1, image2: -1},
        {id: 276, question1: "Być robotem", question2: "Być kosmitą", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 277, question1: "Nosić czyjąś bieliznę", question2: "Używać czyjejś szczoteczki do zębów", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 278, question1: "Mieć najlepszy dom w złej okolicy", question2: "Mieć najgorszy dom w dobrej okolicy", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 279, question1: "Być sławnym raperem", question2: "Być znanym gangsterem", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 280, question1: "Być pogrzebany żywcem", question2: "Być zjedzonym żywcem", result1: 60, result2: 40, image1: -1, image2: -1},
        {id: 281, question1: "Polecieć na marsa, ale tylko w jedną stronę", question2: "Nigdy nie polecieć w kosmos", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 282, question1: "Zawsze być zmęczony", question2: "Zawsze być głodny", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 283, question1: "Zobaczyć najpiękniejszą rzecz na świecie", question2: "Skosztować najsmaczniejszej rzeczy na świecie", result1: 49, result2: 51, image1: -1, image2: -1},
        {id: 284, question1: "Mieć cały czas mokre włosy", question2: "Być łysy", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 285, question1: "Zostać bohaterem filmu akcji", question2: "Zostać bohaterem romansu", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 286, question1: "Nauczyć się gry na pianinie", question2: "Nauczyć się gry na gitarze", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 287, question1: "Imprezować całą noc", question2: "Spać całą noc", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 288, question1: "Być milionerem na jeden dzień", question2: "Być prezydentem na jeden dzień", result1: 76, result2: 24, image1: -1, image2: -1},
        {id: 289, question1: "Pracować w Google", question2: "Pracować w Facebooku", result1: 73, result2: 27, image1: -1, image2: -1},
        {id: 290, question1: "Wyjść za kogoś, kto jest atrakcyjny", question2: "Wyjść za kogoś, kto jest bogaty", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 291, question1: "Być nieśmiertelny i samotny", question2: "Być śmiertelny i mieć przyjaciół", result1: 26, result2: 74, image1: -1, image2: -1},
        {id: 292, question1: "Umrzeć z głodu", question2: "Umrzeć z odwodnienia", result1: 49, result2: 51, image1: -1, image2: -1},
        {id: 293, question1: "Grać w reprezentacji polski", question2: "Być kierowcą forumły 1", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 294, question1: "Mieć jedno 1000-letnie życie", question2: "Mieć dziesięć 100-letnich żyć", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 295, question1: "Mieć talent do wszystkich instrumentów", question2: "Mieć talent do wszystkich sportów", result1: 31, result2: 69, image1: -1, image2: -1},
        {id: 296, question1: "Żyć samotnie na tropikalnej wyspie", question2: "Mieszkać z innymi na Antarktydzie", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 297, question1: "Zobaczyć początek świata", question2: "Zobaczyć jak skończy się świat", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 298, question1: "Zjeść pająka", question2: "Zjeść gluty", result1: 28, result2: 72, image1: -1, image2: -1},
        {id: 299, question1: "Zgubić klucze do domu", question2: "Zgubić telefon komórkowy", result1: 59, result2: 41, image1: -1, image2: -1},
        {id: 300, question1: "Nie mieć kolan", question2: "Nie mieć łokci", result1: 40, result2: 60, image1: -1, image2: -1},
        {id: 301, question1: "Mieć dwie mamy", question2: "Mieć dwóch ojców", result1: 65, result2: 45, image1: -1, image2: -1},
        {id: 302, question1: "Walczyć z lwem", question2: "Walczyć z rekinem", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 303, question1: "Spróbować rozbić deskę głową", question2: "Spróbować rozbić cegłe ręką", result1: 65, result2: 35, image1: -1, image2: -1},
        {id: 304, question1: "Zostać najbogatszą osobą na świecie", question2: "Posiadać dowolną wybraną supermoc", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 305, question1: "Zawsze jeździć z przepisową prędkością", question2: "Zawsze jeździć ponad przepisową prędkością", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 306, question1: "Wyjechać na wakacje z przyjaciółmi", question2: "Wyjechać na wakacje z drugą połówką", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 307, question1: "Jeść tylko chleb i wodę do końca życia", question2: "Nigdy więcej nie korzystać z internetu", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 308, question1: "Dowiedzieć się kiedy umrzesz", question2: "Dowiedzieć się, kiedy Twój przyjaciel umrze", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 309, question1: "Być piratem", question2: "Być kowbojem", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 310, question1: "Zmieniać pracę co rok", question2: "Mieć jedną pracę całe życie", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 311, question1: "Zjeść trujący kwiat", question2: "Być wewnątrz płonącego domu", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 312, question1: "Przebywać całą noc w pokoju pełnym pająków", question2: "Przebywać całą noc w pokoju pełnym węży", result1: 49, result2: 51, image1: -1, image2: -1},
        {id: 313, question1: "Być ostatnią osobą urodzoną na ziemi", question2: "Być pierwszą osobą urodzoną na ziemi", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 314, question1: "Grać w znanym zespole muzycznym", question2: "Zagrać w znanym filmie", result1: 27, result2: 73, image1: -1, image2: -1},
        {id: 315, question1: "Być uczulonym na dzieci", question2: "Być uczulonym na osoby starsze", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 316, question1: "Rok bez muzyki", question2: "Rok bez gier wideo", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 317, question1: "Być małym facetem z donośnym głosem", question2: "Być dużym facetem z piskliwym głosem", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 318, question1: "Mieszkać z rodzicami", question2: "Mieszkać z rodzeństwem", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 319, question1: "Być prezydentem", question2: "Być właścicielem dużej firmy", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 320, question1: "Być przez jeden dzień Twoim zwierzakiem", question2: "Żeby Twój zwierzak był człowiekiem przez jeden dzień", result1: 39, result2: 61, image1: -1, image2: -1},
        {id: 321, question1: "Spać 4 godziny na dobę", question2: "Spać 16 godzin na dobę", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 322, question1: "Zmienić kolor oczu", question2: "Zmienić kolor włosów", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 323, question1: "Być uważany za kłamcę", question2: "Być uważany za złodzieja", result1: 67, result2:23 , image1: -1, image2: -1},
        {id: 324, question1: "Być o metr wyższy", question2: "Być o metr niższy", result1: 77, result2: 23, image1: -1, image2: -1},
        {id: 325, question1: "Słuchać starszej muzyki", question2: "Słuchać nowej muzyki", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 326, question1: "Żyć długim, nudnym życiem", question2: "Żyć krótkim, intensywnym życiem", result1: 27, result2: 73, image1: -1, image2: -1},
        {id: 327, question1: "Wymiotować każdego dnia", question2: "Mieć biegunkę każdego dnia", result1: 54, result2: 46, image1: -1, image2: -1},
        {id: 328, question1: "Mieć dziecko, które zostanie więźniem", question2: "Mieć dziecko, które zostanie bezdomne", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 329, question1: "Otrzymywać pieniądze za granie w gry", question2: "Otrzymywać pieniądze za uprawianie sportu", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 330, question1: "Doświadczać ciągłego bólu", question2: "Doświadczać ciągłego swędzenia", result1: 39, result2: 61, image1: -1, image2: -1},
        {id: 331, question1: "Zrobić sobie tatuaż", question2: "Zrobić sobie piercing (kolczyki na ciele)", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 332, question1: "Tracić zmysły", question2: "Tracić swoją drugą połówkę", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 333, question1: "Zmienić się w kogoś innego", question2: "Zostać sobą", result1: 31, result2: 69, image1: -1, image2: -1},
        {id: 334, question1: "Nigdy więcej nie oglądać siatkówki", question2: "Nigdy więcej nie oglądać piłki nożnej", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 335, question1: "Zapłacić 10 000zł i nigdy więcej nie oglądać reklam", question2: "Oglądać reklamy do końca życia", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 336, question1: "Mieć okropną pamięć krótkotrwałą", question2: "Mieć okropną pamięć długotrwałą", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 337, question1: "Zobaczyć jak umrzesz", question2: "Zobaczyć kogo poślubisz", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 338, question1: "Mieszkać w parku rozrywki", question2: "Mieszkać w ZOO", result1: 84, result2: 16, image1: -1, image2: -1},
        {id: 339, question1: "Obrabować bank", question2: "Ukraść sportowy samochód", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 340, question1: "Mieć ból głowy", question2: "Mieć ból gardła", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 341, question1: "Nigdy się nie starzeć", question2: "Nigdy nie umrzeć", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 342, question1: "Zawsze się spóźniać", question2: "Zawsze być nieprzygotowany", result1: 77, result2: 23, image1: -1, image2: -1},
        {id: 343, question1: "Nikt nie pojawi się na Twoim pogrzebie", question2: "Nikt nie pojawi się na Twoim ślubie", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 344, question1: "Być w stanie tylko szeptać", question2: "Być w stanie tylko krzyczeć", result1: 70, result2: 30, image1: -1, image2: -1},
        {id: 345, question1: "Przestać brać prysznic", question2: "Przestać myć zęby", result1: 44, result2: 56, image1: -1, image2: -1},
        {id: 346, question1: "Posiadać strój Iron Mana", question2: "Posiadać pieniądze Iron Mana", result1: 26, result2: 72, image1: -1, image2: -1},
        {id: 347, question1: "Nagrać najlepszą piosenkę w historii", question2: "Napisać najlepszą książkę w historii", result1: 72, result2: 28, image1: -1, image2: -1},
        {id: 348, question1: "Być niesamowitym kucharzem", question2: "Być niesamowitym tancerzem", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 349, question1: "Spać na miękim podłożu z twardą poduszką", question2: "Spać na twardym podłożu z mięką poduszką", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 350, question1: "Mieszkać na stacji kosmicznej", question2: "Mieszkać w łodzi podwodnej", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 351, question1: "Mieć nieograniczoną kolekcję filmów", question2: "Mieć nieograniczoną kolekcję gier wideo", result1: 64, result2: 36, image1: -1, image2: -1},
        {id: 352, question1: "Być ściganym przez wściekłe byki", question2: "Być ściganym przez rekiny", result1: 73, result2: 27, image1: -1, image2: -1},
        {id: 353, question1: "Nosić tylko białe ubrania", question2: "Nosić tylko czarne ubrania", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 354, question1: "Przeglądać tylko TikTok", question2: "Przeglądać tylko Instagram", result1: 67, result2: 33, image1: -1, image2: -1},
        {id: 355, question1: "Wzbogacić się dzięki ciężkiej pracy", question2: "Wzbogacić się dzięki wygranej na loterii", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 356, question1: "Mieć nudną karierę", question2: "Mieć ekscytującą, ale niebezpiecznią karierę", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 357, question1: "Wszędzie jeździć samochodem", question2: "Wszędzie chodzić na piechotę", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 358, question1: "Przekroczyć rzekę z piraniami", question2: "Przekroczyć rzekę z krokodylami", result1: 50, result2: 50, image1: -1, image2: -1},
        {id: 359, question1: "Być dorosłym na zawsze", question2: "Być dzieckiem na zawsze", result1: 41, result2: 59, image1: -1, image2: -1},
        {id: 360, question1: "Otrzymywać kwiaty", question2: "Otrzymywać czekoladę", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 361, question1: "Dużo zarabiać u złego szefa", question2: "Mało zarabiać u dobrego szefa", result1: 77, result2: 23, image1: -1, image2: -1},
        {id: 362, question1: "Mieć stale cieknący nos", question2: "Mieć ciągle zatkany nos", result1: 56, result2: 44, image1: -1, image2: -1},
        {id: 363, question1: "Spędzić cały dzień w piżamie", question2: "Spędzić cały dzień w garniturze", result1: 79, result2: 21, image1: -1, image2: -1},
        {id: 364, question1: "Ciągle potykać się podczas chodzenia", question2: "Ciągle jąkać się podczas mówienia", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 365, question1: "Pocałować przypadkową osobę", question2: "Pocałować osobę, której nienawidzisz", result1: 66, result2: 34, image1: -1, image2: -1},
        {id: 366, question1: "Być głupim w świecie mądrych", question2: "Być mądrym w świecie głupich", result1: 28, result2: 72, image1: -1, image2: -1},
        {id: 367, question1: "Być batmanem", question2: "Być supermanem", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 368, question1: "Przestać korzystać z Facebooka", question2: "Przestać korzystać z YouTube", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 369, question1: "Nigdy nie grać", question2: "Grać, ale zawsze przegrywać", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 370, question1: "Być Twoją ulubioną postacią z gry wideo", question2: "Być Twoją ulubioną postacią filmową", result1: 34, result2: 66, image1: -1, image2: -1},
        {id: 371, question1: "Być najgorszym graczem w najlepszej drużynie", question2: "Być najlepszym graczem w najgorszej drużynie", result1: 16, result2: 84, image1: -1, image2: -1},
        {id: 372, question1: "Pójść do lekarza", question2: "Pójść do dentysty", result1: 63, result2: 37, image1: -1, image2: -1},
        {id: 373, question1: "Jeść tylko fast foody przez rok", question2: "Jeść tylko sałatkę przez rok", result1: 38, result2: 62, image1: -1, image2: -1},
        {id: 374, question1: "Spełnić jedno życzenie dzisiaj", question2: "Spełnić 3 życzenia za 10 lat", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 375, question1: "Nie mieć palców", question2: "Nie mieć uszu", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 376, question1: "Zarabiać 10 milionów ale nie móc opóścić kraju", question2: "Zarabiać 40 tysięcy rocznie", result1: 76, result2: 24, image1: -1, image2: -1},
        {id: 377, question1: "Stracić 1 000 zł", question2: "Stracić wszystkie kontakty z telefonu", result1: 30, result2: 70, image1: -1, image2: -1},
        {id: 378, question1: "Pocić się krwią", question2: "Pocić się mlekiem", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 379, question1: "Nigdy więcej nie jeść Twojego ulubionego jedzenia", question2: "Nigdy więcej z nikim nie rozmawiać", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 380, question1: "Zmienić swój wygląd", question2: "Zmienić swoją osobowość", result1: 75, result2: 25, image1: -1, image2: -1},
        {id: 381, question1: "Rozmawiać tylko z mężczyznami", question2: "Rozmawiać tylko z kobietami", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 382, question1: "Żyć w przeszłości", question2: "Żyć w przyszłości", result1: 30, result2: 70, image1: -1, image2: -1},
        {id: 383, question1: "Stracić portfel", question2: "Stracić telefon", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 384, question1: "Być smokiem", question2: "Posiadać smoka", result1: 25, result2: 75, image1: -1, image2: -1},
        {id: 385, question1: "Być agentem", question2: "Być superbohaterem", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 386, question1: "Nigdy nie płacić podatków", question2: "Nigdy nie płacić za paliwo", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 387, question1: "Posiadać Ferrari", question2: "Posiadać Lamborghini", result1: 37, result2: 63, image1: -1, image2: -1},
        {id: 388, question1: "Stracić swoją ulubioną aplikację", question2: "Stracić wszystkie aplikacje poza ulubioną", result1: 59, result2: 41, image1: -1, image2: -1},
        {id: 389, question1: "Być w pokoju z 100 pszczołami", question2: "Być w pokoju z 100 pająkami", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 390, question1: "Mieć limuzynę", question2: "Mieć kabriolet", result1: 51, result2: 49, image1: -1, image2: -1},
        {id: 391, question1: "Nie wiedzieć niczego przez jeden dzień", question2: "Miesiąc bez telefonu", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 392, question1: "Zjeść 100 surowych jajek", question2: "Zjeść pizzę, która leżała na ziemi przez tydzień", result1: 33, result2: 67, image1: -1, image2: -1},
        {id: 393, question1: "Mieć 10 zwierząt domowych", question2: "Nie mieć żadnych zwierząt", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 394, question1: "Znaleźć wszystko co kiedykolwiek zgubiłeś", question2: "Przypomnieć sobie wszystko, o czym kiedykolwiek zapomniałeś", result1: 54, result2: 46, image1: -1, image2: -1},
        {id: 395, question1: "Podwoić swoje zarobki", question2: "Zmniejszyć swoje wydatki o połowę", result1: 68, result2: 32, image1: -1, image2: -1},
        {id: 396, question1: "Mieć swój wymarzony dom", question2: "Mieć swój wymarzony samochód", result1: 77, result2: 23, image1: -1, image2: -1},
        {id: 397, question1: "Przeczołgać się przez jamę pająków", question2: "Przepłynąć przez basen pełen węży", result1: 47, result2: 53, image1: -1, image2: -1},
        {id: 398, question1: "Urodzić się z szyją żyrafy", question2: "Urodzić się z trąbą słonia", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 399, question1: "Zobaczyć swoje przyszłe dzieci", question2: "Zobaczyć siebie z przeszłości", result1: 70, result2: 30, image1: -1, image2: -1},
        {id: 400, question1: "Spać bez poduszki", question2: "Spać bez kołdry", result1: 75, result2: 25, image1: -1, image2: -1},
        {id: 401, question1: "Być pierwszą osobą na Mount Everest", question2: "Być pierwszą osobą na księżycu", result1: 29, result2: 71, image1: -1, image2: -1},
        {id: 402, question1: "Nic nie jeść przez 3 dni", question2: "Jeść to samo przez miesiąc", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 403, question1: "Wynaleźć koło", question2: "Wynaleźć internet", result1: 15, result2: 85, image1: -1, image2: -1},
        {id: 404, question1: "Czytać w myślach wszystkim kobietom", question2: "Czytać w myślach wszystkim mężczyznom", result1: 53, result2: 47, image1: -1, image2: -1},
        {id: 405, question1: "Mieć nielimitowaną baterie w telefonie", question2: "Mieć nielimitowany internet w telefonie", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 406, question1: "Jeść tylko gofry", question2: "Jeść tylko naleśniki", result1: 39, result2: 61, image1: -1, image2: -1},
        {id: 407, question1: "Nie czuć smaku", question2: "Nie widzieć kolorów", result1: 52, result2: 48, image1: -1, image2: -1},
        {id: 408, question1: "Uratować świat, ale nikt się o tym nie dowie", question2: "Uratować świat, ale umrzeć jako bohater", result1: 49, result2: 51, image1: -1, image2: -1},
        {id: 409, question1: "Apokalipsa zombie", question2: "3 Wojna Światowa", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 410, question1: "Jeść wszystko co widzisz", question2: "Lizać wszystko co widzisz", result1: 36, result2: 64, image1: -1, image2: -1},
        {id: 411, question1: "Mieszkać w większym i droższym mieszkaniu", question2: "Mieszkać w mniejszym i tańszym mieszkaniu", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 412, question1: "Nigdy nie mieć pracy", question2: "Nigdy nie mieć drugiej połówki", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 413, question1: "Zostać lekarzem", question2: "Zostać prawnikiem", result1: 48, result2: 52, image1: -1, image2: -1},
        {id: 414, question1: "Nie mieć życia pozagrobowego", question2: "Przeżyć życie pozagrobowe w piekle", result1: 80, result2: 20, image1: -1, image2: -1},
        {id: 415, question1: "Dowiedzieć się, że Twoi rodzice są tajnymi agentami", question2: "Dowiedzieć się, że Twoi rodzice są bogaci", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 416, question1: "Mieć złamaną kość", question2: "Mieć złamane serce", result1: 75, result2: 25, image1: -1, image2: -1},
        {id: 417, question1: "Dostać karę śmierci", question2: "Iść do więzienia na całe życie", result1: 27, result2: 73, image1: -1, image2: -1},
        {id: 418, question1: "Być wdową/wdowcem", question2: "Być po rozwodzie", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 419, question1: "Mieszkać z rodzicami za darmo", question2: "Mieć swoje mieszkanie i płacić 1000zł czynszu ", result1: 70, result2: 30, image1: -1, image2: -1},
        {id: 420, question1: "Otrzymywać nowy samochód co rok", question2: "Otrzymywać nowy dom co 10 lat", result1: 54, result2: 46, image1: -1, image2: -1},
        {id: 421, question1: "Zrezygnować z komputera", question2: "Zrezygnować ze swojego zwierzaka", result1: 75, result2: 25, image1: -1, image2: -1},
        {id: 422, question1: "Mieszkać w spokojnej i nudnej okolicy", question2: "Mieszkać w głośniej i imprezowej okolicy", result1: 43, result2: 57, image1: -1, image2: -1},
        {id: 423, question1: "Uratować swoją mamę", question2: "Uratować siebie", result1: 76, result2: 24, image1: -1, image2: -1},
        {id: 424, question1: "Być nieśmiertelnym", question2: "Mieć miliard złotych", result1: 32, result2: 68, image1: -1, image2: -1},
        {id: 425, question1: "Być uczniem do końca życia", question2: "Być nauczycielem do końca życia", result1: 44, result2: 56, image1: -1, image2: -1},
        {id: 426, question1: "Oglądać tylko pierwszą połowę filmów", question2: "Oglądać tylko drugą połowę filmów", result1: 35, result2: 65, image1: -1, image2: -1},
        {id: 427, question1: "Wiedzieć wszystko", question2: "Mieć wszystko", result1: 45, result2: 55, image1: -1, image2: -1},
        {id: 428, question1: "Nigdy nie wiedzieć, która jest godzina", question2: "Nigdy nie wiedzieć, jaki jest dzień", result1: 54, result2: 46, image1: -1, image2: -1},
        {id: 429, question1: "Pić stare mleko", question2: "Jeść stare mięso", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 430, question1: "Oglądać wszystkie filmy za darmo", question2: "Jeść wszystko za darmo", result1: 28, result2: 72, image1: -1, image2: -1},
        {id: 431, question1: "Robić zakupy na Amazon", question2: "Robić zakupy na Allegro", result1: 23, result2: 77, image1: -1, image2: -1},
        {id: 432, question1: "Żyć w apokalipsie zombie", question2: "Żyć w apokalipsie robotów", result1: 46, result2: 54, image1: -1, image2: -1},
        {id: 433, question1: "Pocałować meduzę", question2: "Nadepnąć na tarantulę", result1: 78, result2: 22, image1: -1, image2: -1},
        {id: 434, question1: "Nigdy nie opuścić rodzinnego miasta", question2: "Przeprowadzać się co 2 miesiące", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 435, question1: "Ograniczyć się do 500 słów dziennie", question2: "Ograniczyć się do 500 kroków dziennie", result1: 42, result2: 58, image1: -1, image2: -1},
        {id: 436, question1: "Stracić rękę", question2: "Stracić dostęp do internetu na zawsze", result1: 57, result2: 43, image1: -1, image2: -1},
        {id: 437, question1: "Spędzić 5 lat w więzieniu za coś, czego nie zrobiłeś", question2: "Spędzić 10 lat w więzieniu za coś, co zrobiłeś", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 438, question1: "Pracować w FBI", question2: "Pracować w CIA", result1: 60, result2: 40, image1: -1, image2: -1},
        {id: 439, question1: "Mieszkać w losowym kraju każdego dnia", question2: "Mieszkać w wybranym kraju do końca życia", result1: 24, result2: 76, image1: -1, image2: -1},
        {id: 440, question1: "Być bezdomnym", question2: "Żyć bez rodziny i przyjaciół", result1: 61, result2: 39, image1: -1, image2: -1},
        {id: 441, question1: "Spędzać czas w samotności", question2: "Spędzać czas z rodziną", result1: 31, result2: 69, image1: -1, image2: -1},
        {id: 442, question1: "Mieć pierwsze dziecko w wieku 18 lat", question2: "Mieć pierwsze dziecko w wieku 45 lat", result1: 31, result2: 69, image1: -1, image2: -1},
        {id: 443, question1: "Zjeść żywego pająka", question2: "Zjeść żywego karalucha", result1: 58, result2: 42, image1: -1, image2: -1},
        {id: 444, question1: "Pływać w morzu z głodnym rekinem", question2: "Chodzić po dżungli z głodnym lwem", result1: 21, result2: 79, image1: -1, image2: -1},
        {id: 445, question1: "Stracić ręcę", question2: "Stracić wzrok", result1: 55, result2: 45, image1: -1, image2: -1},
        {id: 446, question1: "Zostać porwanym przez kosmitów", question2: "Zostać porwanym przez terrorystów", result1: 62, result2: 38, image1: -1, image2: -1},
        {id: 447, question1: "Zarabiać 250 tysięcy zł rocznie, nie pracując", question2: "Zarabiać 1 milion zł rocznie pracująć na pełny etat", result1: 71, result2: 29, image1: -1, image2: -1},
        {id: 448, question1: "Mieć 2 prawdziwych przyjaciół", question2: "Mieć 1000 znajomych na Facebook", result1: 94, result2: 6, image1: -1, image2: -1},
        {id: 449, question1: "Mieć boże narodzenie 2 razy w roku", question2: "Mieć urodziny 2 razy w roku", result1: 74, result2: 26, image1: -1, image2: -1},
        {id: 450, question1: "Wyjść za kogoś, kogo nie kochasz", question2: "Wyjść za kogoś, kto Cię nie kocha", result1: 43, result2: 57, image1: -1, image2: -1},
        

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