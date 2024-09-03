import React, { useState } from 'react'
import axios from 'axios';
import { hostname } from '../config';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DragIcon } from '../assets/svg/DragSVG.svg';

const Form = () => {

    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [neighbourhood1, setNeighbourhood1] = useState([]);


    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [mileage, setMileage] = useState("");
    const [price, setPrice] = useState("");
    const [fuel, setFuel] = useState("none");
    const [transmission, setTransmission] = useState("none");
    const [owner, setOwner] = useState("none");
    const [state, setState] = useState("none");
    const [city, setCity] = useState("none");
    const [neighbourhood, setNeighbourhood] = useState("none");
    const [manufactured, setManufactured] = useState("none");

    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();



    const stateCityMapping = {
        "Andhra Pradesh": {
            "Vijayawada": ["Srinivasa Nagar", "Benz Circle", "Moghalrajpuram", "Gollapudi", "Kaleswara Rao Market", "Gandhinagar", "Prakasam Barrage", "Satyanarayana Puram", "Krishna Lanka", "Patamata"],
            "Visakhapatnam": ["Dwaraka Nagar", "Bhimili", "MVP Colony", "Gajuwaka", "TPT Colony", "Jubilee Hills", "Seethammadhara", "Steel Plant", "Pendurthi", "Old Airport"],
            "Guntur": ["Brodi", "Ashok Nagar", "Chowdavaram", "Guntur City", "Kaza", "Arundelpet", "Nallapadu", "Brindavan Gardens", "Sattenapalle", "Mangalagiri"],
            "Tirupati": ["Tiruchanoor", "Balaji Nagar", "Srinivasam", "K T Road", "Peddaganjam", "Chandragiri", "Renigunta", "Chittoor", "Kongareddy"],
            "Kakinada": ["Jagannaickpur", "Ravulapalem", "Kakinada Beach", "Gandhinagar", "Malkapuram", "Mogalthur", "Gollaprolu", "Kakinada Port", "Sarpavaram"],
            "Anantapur": ["Subash Nagar", "Nallamada", "Doddakuntapalli", "Reddipalli", "Anantapur Town", "Bhagyanagar", "Gooty", "Peddapappur"],
            "Kadapa": ["Pulivendula", "Kadapa Town", "Rajampet", "Proddatur", "Jammalamadugu", "Chennur", "Rayachoti", "Yerraguntla"],
            "Nellore": ["Santoshnagar", "Nellore Town", "Dargamitta", "Venkatagiri", "Gudur", "Naidupeta", "Kavali", "Mogallu"],
            "Ongole": ["Chinna Bazar", "Ongole Town", "Addanki", "Kandukur", "Darsi", "Chilakaluripet", "Giddalur", "Kanigiri"]
        },
        "Arunachal Pradesh": {
            "Itanagar": ["Ganga", "Naharlagun", "Chandranagar", "Doimukh", "Banderdewa", "Karsingsa", "Lekhi", "Nirjuli", "Papu Nallah"],
            "Naharlagun": ["Kamba", "Sangdupota", "Chimpu", "Kola", "Borum", "Hoj", "Banderdewa", "Karsingsa"],
            "Tawang": ["Tawang Town", "Jang", "Lumla", "Bumla", "Sela Pass", "Madhuri Lake", "Monpa Colony"],
            "Ziro": ["Ziro Town", "Hong Village", "Yachuli", "Hija", "Pangin", "Tali", "Raga"],
            "Bomdila": ["Bomdila Town", "Rupa", "Jang", "Dirang", "Kalaktang", "Tenga Valley"]
        },
        "Assam": {
            "Guwahati": ["Paltan Bazaar", "Fancy Bazaar", "Garchuk", "Beltola", "Dispur", "Hengrabari", "Ganeshguri", "Hatigaon", "Uzanbazar", "Kahilipara"],
            "Silchar": ["Tarapur", "Meherpur", "Madhurband", "Kalibari", "Kachari", "Sadarghat", "Dullavcherra", "Aizawl Road", "Kumarpara"],
            "Dibrugarh": ["Dibrugarh Town", "Khowang", "Dibrugarh University", "Laluk", "Tengakhat", "Rupai", "Naliapool", "Nimati Ghat"],
            "Jorhat": ["Gar-Ali", "Charingia", "Paltan Bazar", "Naya Gaon", "Borbora", "Nagaon", "Raja Maidam", "Rowriah"],
            "Tezpur": ["Tezpur Town", "Baliapatam", "Nalbari", "Rangapara", "Sonitpur", "Dhekiajuli", "Kharupetia"]
        },
        "Bihar": {
            "Patna": ["Frazer Road", "Boring Road", "Kankarbagh", "Patna City", "Raja Bazar", "Mithapur", "Rajendra Nagar", "Dakbungalow", "Digha", "Kumhrar"],
            "Gaya": ["Bodhi Tree", "Sherghati", "Manpur", "Barachatti", "Gaya Town", "Khijursarai", "Gaya Cantt", "Gaya Airport"],
            "Bhagalpur": ["Gujri Tola", "Naugachhia", "Kahera", "Saraiya", "Purnea", "Sabaur", "Rajaun", "Amdaha"],
            "Munger": ["Munger Town", "Jamui", "Lalganj", "Tetri", "Gauspur", "Kharagpur", "Katarpur", "Saharsa"],
            "Siwan": ["Siwan Town", "Raghunathpur", "Hussainganj", "Mairwa", "Basantpur", "Siwan Cantt", "Kachnar"],
            "Darbhanga": ["Darbhanga Town", "Mithila", "Laheriya Sarai", "Jale", "Birauli", "Bahadurpur", "Kiratpur", "Patepur"]
        },
        "Delhi": {
            "New Delhi": ["Connaught Place", "India Gate", "Janpath", "Rajiv Chowk", "Chanakyapuri", "Vasant Vihar", "Safdarjung", "Lajpat Nagar", "South Extension", "Karol Bagh"],
            "North Delhi": ["Rohini", "Mundka", "Narela", "Bawana", "Burari", "Sarai Rohilla", "Badli", "Alipur", "Subzi Mandi", "Wazirpur"],
            "South Delhi": ["Greater Kailash", "Hauz Khas", "Saket", "Vasant Kunj", "Mehrauli", "Chattarpur", "Malviya Nagar", "Lajpat Nagar", "Kalkaji", "New Friends Colony"],
            "East Delhi": ["Preet Vihar", "Laxmi Nagar", "Mayur Vihar", "Patparganj", "Kondli", "Shahdara", "Kalkaji", "Geeta Colony", "Vikramshila", "Yamuna Vihar"],
            "West Delhi": ["Rajouri Garden", "Punjabi Bagh", "Janakpuri", "Dwarka", "Uttam Nagar", "Hari Nagar", "Moti Nagar", "Nangloi", "Tagore Garden", "Subhash Nagar"]
        },
        "Andaman and Nicobar Islands": {
            "Port Blair": ["Aberdeen Bazaar", "Bamboo Flat", "Brichgunj", "Chakkargaon", "Garacharma", "RGT Road", "South Point", "Wimberlygunj", "Anandapur"],
            "Havelock Island": ["Radhanagar", "Vijay Nagar", "Kalapathar", "Govind Nagar", "Beach No. 5", "Beach No. 7", "Jungle Beach", "Neil's Cove"],
            "Neil Island": ["Bharatpur", "Laxmanpur", "Sitapur", "Ramnagar", "Nehru Park", "Bharatpur Beach", "Laxmanpur Beach"],
            "Car Nicobar": ["Car Nicobar Town", "Malacca", "Nancowry", "Teressa", "Kamorta", "Katchal", "Batti", "Kowatk"],
            "Little Andaman": ["Long Island", "Lamba", "Khushnapur", "Haddo", "Nimbia", "Sitanagar", "Doniya", "Rangat"]
        },
        "Chandigarh": {
            "Chandigarh": ["Sector 17", "Sector 22", "Sector 35", "Sector 43", "Sector 45", "Sector 15", "Sector 32", "Sector 18", "Sector 26", "Sector 21"]
        },
        "Dadra and Nagar Haveli and Daman and Diu": {
            "Daman": ["Daman City", "Nani Daman", "Moti Daman", "Devka Beach", "Jampore Beach", "Daman Ganga", "Daman Diu Road"],
            "Diu": ["Diu Town", "Nagoa", "Jalandhar", "Fudam", "Bunder", "Khambhalia", "Nagoa Beach", "Diu Fort", "Swaraj Dweep"]
        },
        "Goa": {
            "Panaji": ["Fontainhas", "Campal", "Altinho", "Miramar", "Chorao", "Ribandar", "Vasco", "Santa Cruz", "Tiswadi", "Dona Paula"],
            "Margao": ["Margao Town", "Benaulim", "Cortalim", "Colva", "Seraulim", "Raia", "Verna", "Loutolim", "Betalbatim"],
            "Vasco da Gama": ["Vasco Town", "Dabolim", "Chicalim", "Zuarinagar", "Dabolim Beach", "Vasco Railway Station", "Kesarval Spring"],
            "Mapusa": ["Mapusa Town", "Calangute", "Anjuna", "Candolim", "Agarwada", "Pernem", "Siolim", "Baga Beach"]
        },
        "Gujarat": {
            "Ahmedabad": ["Maninagar", "Vastrapur", "Navrangpura", "Satellite", "Bodakdev", "Ghatlodia", "Ashram Road", "C.G. Road", "Sabarmati", "Juhapura"],
            "Surat": ["Athwalines", "Gopi Talav", "Rander", "Udhna", "Vesu", "Mughal Sarai", "Pandesara", "Sachin", "Katargam", "Sarthana"],
            "Vadodara": ["Alkapuri", "Sayajigunj", "Gotri", "Vasna", "Karishma", "Panchvati", "Padra", "Tarsali", "Makarpura", "Vadsar"],
            "Rajkot": ["Kotharia", "Gondal", "Upleta", "Jamnagar", "Ratanpur", "Kuvadva", "Mota Mava", "Gokulnagar", "Pratapnagar", "Vavdi"],
            "Bhavnagar": ["Gondal", "Kumbhnath", "Sanghavi", "Ratanpura", "Vavdi", "Sardar Patel Complex", "Adarsh Society", "Khodiyar Colony", "Panchkui"],
            "Jamnagar": ["Khambhalia", "Dared", "Jodia", "Rajkot", "Patan", "Madhapar", "Gokulnagar", "Bedi", "Upleta"],
            "Junagadh": ["Junagadh Town", "Malia", "Keshod", "Sasangadh", "Gondal", "Upleta", "Dhoraji", "Bantwa", "Mendarda"],
            "Surendranagar": ["Wadhwan", "Dhangadhra", "Chotila", "Lakhtar", "Thangadh", "Muli", "Radhanpur", "Santalpur", "Vadhvan"]
        },
        "Haryana": {
            "Gurugram": ["MG Road", "DLF Phase 1", "DLF Phase 2", "Sector 14", "Sector 15", "Sushant Lok", "Udyog Vihar", "Huda City Centre", "Old Gurgaon", "South City"],
            "Faridabad": ["Sector 15", "Sector 16", "Sector 17", "Sector 18", "Sector 19", "Sector 21", "Sector 28", "Sector 30", "Sector 37", "Sector 55"],
            "Ambala": ["Ambala Cantt", "Ambala City", "Kalpi", "Saha", "Nabha", "Kalanwali", "Sohna", "Tajpur", "Bani", "Chandigarh"],
            "Hisar": ["Hisar City", "Sector 15", "Sector 16", "Sector 17", "Sector 18", "Sector 19", "Sector 20", "Sector 21", "Sector 22"],
            "Karnal": ["Karnal City", "Sector 12", "Sector 13", "Sector 14", "Sector 15", "Sector 16", "Sector 17", "Sector 18", "Sector 19", "Sector 20"],
            "Rohtak": ["Rohtak City", "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7", "Sector 8", "Sector 9"],
            "Panipat": ["Panipat City", "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7", "Sector 8", "Sector 9"]
        },
        "Himachal Pradesh": {
            "Shimla": ["Mall Road", "Chotta Shimla", "Lakkar Bazaar", "Kalka Shimla Road", "Jakhoo", "The Ridge", "Kufri", "Fagu", "Chalets"],
            "Dharamshala": ["Mcleodganj", "Kangra", "Bhagsu", "Khurpatal", "Kotwali Bazaar", "Dharamkot", "Sidhpur", "Palampur"],
            "Manali": ["Old Manali", "Mall Road", "Vashisht", "Naggar", "Solang Valley", "Beas River", "Manikaran", "Rohtang Pass"],
            "Kullu": ["Kullu Town", "Manikaran", "Naggar", "Raison", "Bhuntar", "Sainj", "Kasol", "Jari"],
            "Solan": ["Solan Town", "Kasauli", "Barog", "Chail", "Rajgarh", "Kunihar", "Baddi"]
        },
        "Jharkhand": {
            "Ranchi": ["Harmu", "Kanke", "Doranda", "Upper Bazar", "Lower Bazar", "Birsa Nagar", "Hatia", "Ratu", "Ranchi University", "Sukhdeonagar"],
            "Jamshedpur": ["Bistupur", "Sonari", "Sakchi", "Telco", "Mango", "Golmuri", "Baharagora", "Kantatoli"],
            "Dhanbad": ["Dhanbad Town", "Jharia", "Sindri", "Kenduadih", "Karkend", "Chas", "Bermo", "Katras", "Tundi"],
            "Bokaro": ["Bokaro Steel City", "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7"],
            "Deoghar": ["Deoghar Town", "Baba Baidyanath Dham", "Ranishwar", "Madhupur", "Jarmundi", "Katoria"],
            "Hazaribagh": ["Hazaribagh Town", "Barhi", "Chouparan", "Koderma", "Sadar", "Karma", "Sarkari"],
            "Giridih": ["Giridih Town", "Dumri", "Bagodar", "Pirtand", "Tundi", "Keshri", "Dhanwar"]
        },
        "Karnataka": {
            "Bengaluru": ["Koramangala", "Indiranagar", "MG Road", "Whitefield", "Jayanagar", "Ulsoor", "Basavanagudi", "Hebbal", "Hosur Road", "BTM Layout"],
            "Mysuru": ["Mysuru Palace", "Lalitha Mahal", "Nazarabad", "Kuvempunagar", "Hebbal", "Ashoka Road", "Karanji Lake", "Siddhartha Layout"],
            "Hubli": ["Hubli City", "Keshwapur", "Gokul Road", "Unkal", "Dharwad", "Kumar", "Vijay Nagar", "Hubli Railway Station"],
            "Mangalore": ["Mangalore City", "PVS Circle", "Bunts Hostel", "Kankanady", "Lalbagh", "Bajpe", "Nanthoor", "Bejai"],
            "Belagavi": ["Belagavi City", "Keshwapur", "Cantonment", "Gokak", "Savadatti", "Kanbargi", "Khanapur", "Belgaum Railway Station"],
            "Bagalkot": ["Bagalkot Town", "Bagalakot", "Kudachi", "Hangal", "Rabkavi Banhatti", "Ilkal", "Badami", "Jamboti"],
            "Karwar": ["Karwar Town", "Kumta", "Ankola", "Uttar Kannada", "Devbagh", "Karwar Beach", "Haliyal"],
            "Raichur": ["Raichur Town", "Manvi", "Sindhnur", "Devadurga", "Lingasugur", "Raichur Fort", "Shahapur"]
        },
        "Kerala": {
            "Thiruvananthapuram": ["Kowdiar", "Pattom", "Chalai", "Vellayambalam", "Sreekariyam", "Kazhakkoottam", "Sasthamangalam", "Palayam", "Nanthancode"],
            "Kochi": ["Marine Drive", "Ernakulam", "MG Road", "Fort Kochi", "Mattancherry", "Kakkanad", "Palarivattom", "Edappally", "Cheranelloor"],
            "Kozhikode": ["Calicut Beach", "Mavoor Road", "Puthiyara", "Kallai", "Kozhikode Town", "Vellimadukunnu", "Mananchira", "Nellikkode"],
            "Malappuram": ["Malappuram Town", "Perinthalmanna", "Ponnani", "Tirur", "Kondotty", "Areekode", "Manjeri", "Valanchery"],
            "Thrissur": ["Thrissur Town", "Puthenpalli", "Koratti", "Ollur", "Irinjalakuda", "Chalakkudy", "Mamangalam", "Kunnamkulam"],
            "Alappuzha": ["Alappuzha Town", "Ambalappuzha", "Cherthala", "Kuttanadu", "Punnamada", "Vayalar", "Punnappra", "Karumadi"],
            "Kannur": ["Kannur City", "Payyannur", "Thalassery", "Pallikunnu", "Kannur Railway Station", "Mattannur", "Kannur Fort", "Mahe"],
            "Kottayam": ["Kottayam Town", "Changanassery", "Pala", "Vaikom", "Kumarakom", "Cherpunkal", "Mutholy"]
        },
        "Ladakh": {
            "Leh": ["Leh City", "Shanti Stupa", "Pangong Lake", "Nubra Valley", "Tsomoriri Lake", "Magnetic Hill", "Hemis Monastery", "Thiksey Monastery"],
            "Kargil": ["Kargil Town", "Sankar", "Drass", "Batalik", "Zanskar Valley", "Mulbekh", "Kargil Airport", "Suru Valley"]
        },
        "Lakshadweep": {
            "Kavaratti": ["Kavaratti Town", "Kavaratti Beach", "Agatti", "Minicoy", "Suheli Par", "Kalapeni", "Androth", "Amini"],
            "Agatti": ["Agatti Island", "Agatti Beach", "Agatti Airport", "Agatti Town"],
            "Minicoy": ["Minicoy Island", "Minicoy Beach", "Funaadhoo", "Vattaru"]
        },
        "Madhya Pradesh": {
            "Bhopal": ["Bhopal City", "Habibganj", "Bairagarh", "New Market", "Old City", "Raisen", "Saket", "Mahalakshmi", "Kolar"],
            "Indore": ["Indore City", "Rajendra Nagar", "Vijay Nagar", "A.B. Road", "Sarwate Bus Stand", "Manorama Ganj", "Navi Peth", "Old Palasia"],
            "Gwalior": ["Gwalior Fort", "Maharaj Bada", "Lashkar", "Gwalior Railway Station", "Daboh", "Gola Ka Mandir", "Sarai Khwaja", "Birla Mandir"],
            "Jabalpur": ["Jabalpur City", "Ranjhi", "Sadar", "Madhotal", "Madan Mahal", "Dumna Nature Reserve", "Jabalpur Railway Station"],
            "Ujjain": ["Ujjain City", "Mahakal Mandir", "Bajrang Nagar", "Kothi", "Ujjain Railway Station", "Chintaman Ganesh"],
            "Satna": ["Satna City", "Rewa", "Maihar", "Chitrakoot", "Amarpatan", "Rampur Baghelan", "Kota"],
            "Sagar": ["Sagar City", "Khurai", "Bina", "Rahatgarh", "Sagar Fort", "Tendukheda", "Gopalganj"],
            "Dewas": ["Dewas City", "Dewas Naka", "Bagli", "Khategaon", "Sonkatch", "Dewas Railway Station"]
        },
        "Maharashtra": {
            "Mumbai": ["Colaba", "Bandra", "Andheri", "Versova", "Juhu", "Powai", "Malad", "Dadar", "South Mumbai", "Lower Parel"],
            "Pune": ["Camp", "Koregaon Park", "Hinjewadi", "Viman Nagar", "Kothrud", "Pimpri-Chinchwad", "Hadapsar", "Visharantwadi", "Aundh"],
            "Nagpur": ["Nagpur City", "Sitabuldi", "Cotton Market", "Sadar", "Laxmi Nagar", "Maharajbagh", "Ghat Road", "Civil Lines", "Kamptee"],
            "Nashik": ["Nashik City", "Peth Road", "Satpur", "CIDCO", "Gangapur", "Muktidham", "Nashik Road", "Deolali"],
            "Aurangabad": ["Aurangabad City", "CIDCO", "Waluj", "Jalna Road", "Kranti Chowk", "Mukundwadi", "Aurangabad Railway Station"],
            "Kolhapur": ["Kolhapur City", "Shahu Market", "Rajarampuri", "Rukmini Nagar", "Bharat Petrol Pump", "Shivaji University", "Ichalkaranji"],
            "Solapur": ["Solapur City", "Kurduwadi", "Mangalvedhe", "Solapur Railway Station", "Siddheshwar Temple", "Shirpur", "Barshi"],
            "Satara": ["Satara City", "Mahabaleshwar", "Panhala", "Koregaon", "Satara Railway Station", "Khandala", "Patan"]
        },
        "Manipur": {
            "Imphal": ["Imphal East", "Imphal West", "Thangmeiband", "Lamlai", "Khurai", "Pangai", "Yairipok", "Wangoi", "Yumnam Huidrom"],
            "Churachandpur": ["Churachandpur Town", "Lunglei", "Henglep", "Tuibong", "Sangau", "Saikul", "Mualkhang"],
            "Ukhrul": ["Ukhrul Town", "Mao", "Khangkhui", "Phungyar", "Litan", "Kamjong", "Siyang"]
        },
        "Meghalaya": {
            "Shillong": ["Shillong City", "Laitumkhrah", "Police Bazaar", "Mawlai", "Upper Shillong", "Jowai", "Nongthymmai"],
            "Tura": ["Tura Town", "Nongstoin", "Williamnagar", "Babadam", "Rongram", "Chokpot", "Dalu"],
            "Jowai": ["Jowai Town", "Nongstoin", "Mynsai", "Mynkre"],
            "Nongstoin": ["Nongstoin Town", "Rongram", "Mawshynrut", "Mairang"]
        },
        "Mizoram": {
            "Aizawl": ["Aizawl City", "Lunglei", "Champhai", "Mamit", "Kolasib", "Serchhip", "Lawngtlai"],
            "Lunglei": ["Lunglei Town", "Mamit", "Serchhip", "Champhai"],
            "Champhai": ["Champhai Town", "Serchhip", "Lunglei", "Mamit"],
            "Kolasib": ["Kolasib Town", "Aizawl", "Serchhip", "Mamit"]
        },
        "Nagaland": {
            "Kohima": ["Kohima Town", "Dimapur", "Mokokchung", "Wokha", "Tuensang", "Zunheboto"],
            "Dimapur": ["Dimapur City", "Kohima", "Mokokchung", "Tuensang"],
            "Mokokchung": ["Mokokchung Town", "Tuensang", "Zunheboto"],
            "Wokha": ["Wokha Town", "Dimapur", "Kohima"]
        },
        "Odisha": {
            "Bhubaneswar": ["Bhubaneswar City", "Khandagiri", "Dhauli", "Lingaraj", "Patia", "Saheed Nagar", "Sambalpur", "Cuttack"],
            "Cuttack": ["Cuttack City", "Barabati", "Chauliaganj", "Fatehgarh", "Jobra", "Mahanadi Vihar", "Nayabazar", "Kathagola"],
            "Rourkela": ["Rourkela Town", "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7"],
            "Berhampur": ["Berhampur Town", "Gosaninuagaon", "Bada Bazar", "Brahmapur", "Kumudini", "Khallikote"]
        },
        "Puducherry": {
            "Puducherry": ["Puducherry City", "Auroville", "Cuddalore", "Villupuram", "Karaikal", "Mahe"],
            "Auroville": ["Auroville Village", "Auroville Beach", "International Zone"]
        },
        "Punjab": {
            "Chandigarh": ["Sector 17", "Sector 22", "Sector 23", "Sector 34", "Sector 43", "Sector 45", "Sector 52"],
            "Amritsar": ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Raja Sansi", "Hall Bazaar", "Katra Jaimal Singh"],
            "Ludhiana": ["Ludhiana City", "Model Town", "Ferozepur Road", "Ghumar Mandi", "Dugri", "Kitchlu Nagar"],
            "Jalandhar": ["Jalandhar City", "Ranjit Avenue", "Model Town", "Loharan", "Guru Nanak Mission", "Ladowali Road"]
        },
        "Rajasthan": {
            "Jaipur": ["Jaipur City", "Hawa Mahal", "City Palace", "Jantar Mantar", "Amer Fort", "Nahargarh Fort", "Jal Mahal"],
            "Udaipur": ["Udaipur City", "City Palace", "Lake Pichola", "Jag Mandir", "Saheliyon Ki Bari", "Fateh Sagar Lake"],
            "Jodhpur": ["Jodhpur City", "Mehrangarh Fort", "Umaid Bhawan Palace", "Clock Tower", "Mandore Gardens"],
            "Ajmer": ["Ajmer City", "Ajmer Sharif Dargah", "Ana Sagar Lake", "Pushkar Lake", "Taragarh Fort"]
        },
        "Sikkim": {
            "Gangtok": ["Gangtok City", "MG Road", "Tsomgo Lake", "Buddha Park", "Rumtek Monastery", "Nathula Pass", "Tashi Viewpoint"],
            "Namchi": ["Namchi Town", "Samdruptse", "Temi Tea Garden", "Ravangla", "Sang"]
        },
        "Tamil Nadu": {
            "Chennai": ["Marina Beach", "Breezy Beach", "Kapaleeshwarar Temple", "Fort St. George", "Government Museum", "Santhome Cathedral"],
            "Madurai": ["Meenakshi Temple", "Thirumalai Nayakkar Palace", "Gandhi Museum", "Madurai Market", "Koodal Azhagar Temple"],
            "Coimbatore": ["Marudamalai Temple", "Perur Patteeswarar Temple", "VOC Park", "Codissia Trade Centre", "Kovai Kutralam Falls"],
            "Tiruchirappalli": ["Sri Ranganathaswamy Temple", "Rock Fort Temple", "Tiruchi Town", "Kallanai Dam"]
        },
        "Telangana": {
            "Hyderabad": ["Charminar", "Hussain Sagar Lake", "Golconda Fort", "Ramoji Film City", "Salar Jung Museum", "Qutb Shahi Tombs"],
            "Warangal": ["Warangal Fort", "Thousand Pillar Temple", "Ramappa Temple", "Warangal Wildlife Sanctuary"],
            "Nizamabad": ["Nizamabad City", "Banswada", "Kanteshwar", "Nizamabad Fort", "Nizamabad Railway Station"],
            "Khammam": ["Khammam City", "Kaleshwaram", "Sathupalli", "Peddapalli"]
        },
        "Tripura": {
            "Agartala": ["Agartala City", "Ujjayanta Palace", "Nirman Bhawan", "Tripura Sundari Temple", "Chaturdash Devta Temple"],
            "Unakoti": ["Unakoti Temple", "Unakoti Hills", "Kailashahar"],
            "Dhalai": ["Dhalai Town", "Ambassa", "Khowai"]
        },
        "Uttar Pradesh": {
            "Lucknow": ["Hazratganj", "Aminabad", "Gomti Nagar", "Indira Nagar", "Alambagh", "Chowk", "Hussainganj"],
            "Agra": ["Taj Mahal", "Agra Fort", "Mehtab Bagh", "Sikandra", "Tomb of Itimad-ud-Daulah"],
            "Varanasi": ["Kashi Vishwanath Temple", "Sarnath", "Dashashwamedh Ghat", "Ramnagar Fort", "Manikarnika Ghat"],
            "Kanpur": ["Kanpur City", "Ganga Barrage", "Kanpur Zoo", "Allen Forest Zoo", "Jajmau"]
        },
        "Uttarakhand": {
            "Dehradun": ["Rajpur Road", "Mussoorie Road", "Clement Town", "Kashmiris", "Doon University", "Paltan Bazaar"],
            "Haridwar": ["Har Ki Pauri", "Chandi Devi Temple", "Maya Devi Temple", "Ganga Aarti", "Sapta Rishi Ashram"],
            "Rishikesh": ["Laxman Jhula", "Ram Jhula", "Parmarth Niketan", "Beatles Ashram", "Triveni Ghat"]
        },
        "West Bengal": {
            "Kolkata": ["Howrah Bridge", "Victoria Memorial", "Dakshineswar Kali Temple", "Eden Gardens", "Kalighat Temple", "New Market", "South City Mall"],
            "Darjeeling": ["Darjeeling Mall", "Tiger Hill", "Batasia Loop", "Himalayan Mountaineering Institute", "Japanese Temple"],
            "Kolkata Suburbs": ["Salt Lake City", "New Town", "Baranagar", "Dum Dum"]
        }
    }

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setCities(stateCityMapping[state] || []);
    };

    const handleStateChange2 = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setNeighbourhood1(cities[city] || []);
    };

    // console.warn(cities)

    const [error, setError] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user);
    const uid = userObj._id;

    const handleFileChange = (event) => {
        setError('');
        const files = Array.from(event.target.files);

        if (files.length > 6) {
            setError('You can only upload a maximum of 6 images.');
            event.target.value = ''; // Clear the input
            setSelectedFiles([]);
            return;
        }

        setSelectedFiles(files);
    };

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = JSON.parse(localStorage.getItem('token'));
        // const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        console.log(token);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('brand', brand);
            formData.append('description', description);
            formData.append('mileage', mileage);
            formData.append('price', price);
            formData.append('fuel', fuel);
            formData.append('transmission', transmission);
            formData.append('owner', owner);
            // formData.append('state', state);
            // formData.append('city', city);
            // formData.append('neighbourhood', neighbourhood);
            formData.append('location', JSON.stringify({ state, city, neighbourhood }));
            formData.append('manufactured', manufactured);
            formData.append('uid', uid);
            if (selectedFiles && selectedFiles.length > 0) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('propics', selectedFiles[i]); // Append each file with the same key 'propics'
                }
            }
            // console.log(title, brand, description, mileage, price, fuel, transmission, owner, state, city, neighbourhood, manufactured)
            console.log('Authorization header:', `Bearer ${token}`);
            const response = await axios.post(`${hostname}/post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.data.result) {
                <p className='flex items-center justify-center text-2xl'>upload success</p>
                navigate('/')
            } else {
                // setError(response.data.result);
                console.log(response.data.result);
            }
        } catch (error) {
            // setError("An error occurred while logging in. Please try again.");
            console.log(error)
        } finally {
            setLoading(false);
        }
    }


    return (
        /* From Uiverse.io by themrsami */
        <div className="flex w-fit flex-col items-center justify-center h-fit">
            <div className="w-fit  bg-myGrey rounded-myRound shadow-myShadow p-6">
                <h2 className="text-2xl font-bold mb-4">POST your CAR</h2>
                <form className="flex flex-col items-center justify-between w-fit" encType="multipart/form-data" onSubmit={postData}>
                    <div className='flex w-fit gap-5 items-center justify-evenly flex-wrap'>
                        <div className='flex flex-col w-[295px]'>
                            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
                            <input placeholder="Brand" onChange={(e) => setBrand(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
                            <textarea placeholder='Description' onChange={(e) => setDescription(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"></textarea>
                            <input placeholder="Mileage (KM Driven)" onChange={(e) => setMileage(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
                            <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
                        </div>
                        {/* <input placeholder="Location" className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"/> */}
                        <div className='flex flex-col w-[295px]'>
                            <label className="text-sm mb-2  cursor-pointer" htmlFor="fuel">
                                Fuel
                            </label>
                            <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="fuel">
                                <option value="none" disabled>None</option>
                                <option value="CNG & Hybrids">CNG & Hybrids</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="LPG">LPG</option>
                                <option value="Petrol">Petrol</option>
                            </select>
                            <label className="text-sm mb-2  cursor-pointer" htmlFor="transmission">
                                Transmission
                            </label>
                            <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="transmission">
                                <option value="none" disabled>None</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                            <label className="text-sm mb-2  cursor-pointer" htmlFor="owner">
                                Owner
                            </label>
                            <select value={owner} onChange={(e) => setOwner(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="owner">
                                <option value="none" disabled>None</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="5+">5+</option>
                            </select>
                            <label className="text-sm mb-2  cursor-pointer" id='location'>Location</label>
                            {/* value={state} value={selectedState}*/}
                            <select value={state} onChange={(e) => { setState(e.target.value); handleStateChange(e); }} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="location">
                                <option value="none" disabled>Choose your state</option>
                                {Object.keys(stateCityMapping).map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {
                                selectedState && (
                                    // value={city} value={selectedCity}
                                    <select value={city} onChange={(e) => { setCity(e.target.value); handleStateChange2(e); }} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="city">
                                        <option value="none" disabled>Choose your city</option>
                                        {Object.keys(cities).map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                )
                            }
                            {
                                selectedCity && (
                                    <select value={neighbourhood} onChange={(e) => { setNeighbourhood(e.target.value); }} className="bg-gray-100  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="city">
                                        <option value="none" disabled>Choose your neighbourhood</option>
                                        {neighbourhood1.map((neighbourhood1) => (
                                            <option key={neighbourhood1} value={neighbourhood1}>
                                                {neighbourhood1}
                                            </option>
                                        ))}
                                    </select>
                                )
                            }
                            <label className="text-sm mb-2  cursor-pointer" htmlFor="manufactured">
                                Manufactured
                            </label>
                            <input onChange={(e) => setManufactured(e.target.value)} className="bg-gray-100  border-0 rounded-md p-2" id="manufactured" type="date" />
                        </div>
                        <div className="flex flex-col items-center">
                            <label htmlFor="fileInput" className="mb-2 font-semibold">
                                Upload up to 6 images (JPG, JPEG)
                            </label>
                            <label
                                htmlFor="file"
                                className="flex flex-col justify-center items-center w-[250px] h-[190px] border-2 border-dashed border-gray-300 text-center p-2 text-gray-600 cursor-pointer"
                            >
                                <span>
                                    <DragIcon />
                                </span>
                                <p>Click here to select a file!</p>
                            </label>
                            <input
                                className="hidden"
                                name="propic"
                                id="file"
                                type="file"
                                multiple
                                accept=".jpg, .jpeg"
                                onChange={handleFileChange}
                            />

                            {/* Image Previews */}
                            {selectedFiles.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="w-24 h-24 overflow-hidden border border-gray-200 rounded">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Selected ${index + 1}`}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            {error && <span className="text-red-500">{error}</span>}
                        </div>
                    </div>
                    {/* <p className=" mt-4"> Already have an account? <a className="text-sm text-blue-500 -200 hover:underline mt-4" href="#">Login</a></p> */}
                    <button disabled={loading} className={`bg-gradient-to-r w-48 from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit`}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Form
