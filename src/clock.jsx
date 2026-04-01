import {useState, useEffect} from 'react';
import './index.css'

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", 
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
  "Czechia (Czech Republic)", "Côte d'Ivoire", "Democratic Republic of the Congo", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (Swaziland)", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", 
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
  "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", 
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", 
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", 
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", 
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", 
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", 
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", 
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const cities = {
  "Afghanistan": ["Kabul", "Herat", "Mazar-i-Sharif", "Kandahar", "Jalalabad"],
  "Albania": ["Tirana", "Durres", "Vlore", "Shkoder", "Elbasan"],
  "Algeria": ["Algiers", "Oran", "Constantine", "Annaba", "Blida"],
  "Andorra": ["Andorra la Vella", "Escaldes-Engordany", "Encamp", "Sant Julia de Loria"],
  "Angola": ["Luanda", "Huambo", "Lobito", "Benguela", "Lubango"],
  "Antigua and Barbuda": ["Saint John's", "All Saints", "Liberta", "Potter's Village"],
  "Argentina": ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "La Plata"],
  "Armenia": ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat", "Hrazdan"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  "Austria": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
  "Azerbaijan": ["Baku", "Ganja", "Sumqayit", "Mingachevir", "Shirvan"],
  "Bahamas": ["Nassau", "Freeport", "West End", "Coopers Town"],
  "Bahrain": ["Manama", "Riffa", "Muharraq", "Hamad Town", "A'ali"],
  "Bangladesh": ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet"],
  "Barbados": ["Bridgetown", "Speightstown", "Oistins", "Holetown"],
  "Belarus": ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Grodno"],
  "Belgium": ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liege"],
  "Belize": ["Belize City", "Belmopan", "San Ignacio", "Orange Walk Town"],
  "Benin": ["Cotonou", "Porto-Novo", "Parakou", "Abomey-Calavi", "Djougou"],
  "Bhutan": ["Thimphu", "Phuntsholing", "Punakha", "Paro", "Gelephu"],
  "Bolivia": ["Santa Cruz de la Sierra", "La Paz", "Cochabamba", "Sucre", "Oruro"],
  "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Tuzla", "Zenica", "Mostar"],
  "Botswana": ["Gaborone", "Francistown", "Molepolole", "Maun", "Serowe"],
  "Brazil": ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza"],
  "Brunei": ["Bandar Seri Begawan", "Kuala Belait", "Tutong", "Seria"],
  "Bulgaria": ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse"],
  "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Banfora"],
  "Burundi": ["Bujumbura", "Gitega", "Ngozi", "Muyinga", "Rumonge"],
  "Cabo Verde": ["Praia", "Mindelo", "Santa Maria", "Assomada"],
  "Cambodia": ["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville", "Poipet"],
  "Cameroon": ["Douala", "Yaounde", "Garoua", "Bamenda", "Bafoussam"],
  "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"],
  "Central African Republic": ["Bangui", "Bimbo", "Berberati", "Carnot", "Bambari"],
  "Chad": ["N'Djamena", "Moundou", "Sarh", "Abeche", "Kelo"],
  "Chile": ["Santiago", "Valparaiso", "Concepcion", "Antofagasta", "Vina del Mar"],
  "China": ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu"],
  "Colombia": ["Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena"],
  "Comoros": ["Moroni", "Mutsamudu", "Fomboni", "Domoni"],
  "Congo (Congo-Brazzaville)": ["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi", "Owando"],
  "Costa Rica": ["San Jose", "Limon", "Alajuela", "Heredia", "Cartago"],
  "Croatia": ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar"],
  "Cuba": ["Havana", "Santiago de Cuba", "Camaguey", "Holguin", "Santa Clara"],
  "Cyprus": ["Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta"],
  "Czechia (Czech Republic)": ["Prague", "Brno", "Ostrava", "Plzen", "Liberec"],
  "Côte d'Ivoire": ["Abidjan", "Yamoussoukro", "Bouake", "Daloa", "San-Pedro"],
  "Democratic Republic of the Congo": ["Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kisangani", "Goma"],
  "Denmark": ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
  "Djibouti": ["Djibouti", "Ali Sabieh", "Tadjoura", "Dikhil"],
  "Dominica": ["Roseau", "Portsmouth", "Marigot", "Berekua"],
  "Dominican Republic": ["Santo Domingo", "Santiago de los Caballeros", "La Romana", "San Pedro de Macoris", "Punta Cana"],
  "Ecuador": ["Guayaquil", "Quito", "Cuenca", "Santo Domingo", "Machala"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said"],
  "El Salvador": ["San Salvador", "Santa Ana", "San Miguel", "Soyapango", "Santa Tecla"],
  "Equatorial Guinea": ["Malabo", "Bata", "Ebebiyin", "Aconibe"],
  "Eritrea": ["Asmara", "Keren", "Massawa", "Assab", "Mendefera"],
  "Estonia": ["Tallinn", "Tartu", "Narva", "Parnu", "Kohtla-Jarve"],
  "Eswatini (Swaziland)": ["Mbabane", "Manzini", "Siteki", "Nhlangano"],
  "Ethiopia": ["Addis Ababa", "Dire Dawa", "Mekelle", "Gondar", "Bahir Dar"],
  "Fiji": ["Suva", "Nadi", "Lautoka", "Labasa", "Ba"],
  "Finland": ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
  "Gabon": ["Libreville", "Port-Gentil", "Franceville", "Oyem", "Moanda"],
  "Gambia": ["Banjul", "Serekunda", "Brikama", "Bakau"],
  "Georgia": ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Gori"],
  "Germany": ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
  "Ghana": ["Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Tema"],
  "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa"],
  "Grenada": ["Saint George's", "Grenville", "Gouyave", "Victoria"],
  "Guatemala": ["Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "Escuintla"],
  "Guinea": ["Conakry", "Nzerekore", "Kankan", "Kindia", "Labe"],
  "Guinea-Bissau": ["Bissau", "Bafata", "Gabu", "Cacheu"],
  "Guyana": ["Georgetown", "Linden", "New Amsterdam", "Anna Regina"],
  "Haiti": ["Port-au-Prince", "Cap-Haitien", "Gonaives", "Les Cayes", "Jacmel"],
  "Holy See": ["Vatican City"],
  "Honduras": ["Tegucigalpa", "San Pedro Sula", "La Ceiba", "Choloma", "El Progreso"],
  "Hungary": ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pecs"],
  "Iceland": ["Reykjavik", "Kopavogur", "Hafnarfjordur", "Akureyri"],
  "India": ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai"],
  "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Medan", "Bekasi"],
  "Iran": ["Tehran", "Mashhad", "Isfahan", "Karaj", "Shiraz"],
  "Iraq": ["Baghdad", "Basra", "Mosul", "Erbil", "Najaf"],
  "Ireland": ["Dublin", "Cork", "Limerick", "Galway", "Waterford"],
  "Israel": ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva"],
  "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo"],
  "Jamaica": ["Kingston", "Montego Bay", "Spanish Town", "Portmore", "Mandeville"],
  "Japan": ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo"],
  "Jordan": ["Amman", "Zarqa", "Irbid", "Aqaba", "Salt"],
  "Kazakhstan": ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe"],
  "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  "Kiribati": ["Tarawa", "Betio", "Bikenibeu", "Bairiki"],
  "Kuwait": ["Kuwait City", "Al Ahmadi", "Hawalli", "Salmiya", "Farwaniya"],
  "Kyrgyzstan": ["Bishkek", "Osh", "Jalal-Abad", "Karakol", "Tokmok"],
  "Laos": ["Vientiane", "Savannakhet", "Pakse", "Luang Prabang", "Thakhek"],
  "Latvia": ["Riga", "Daugavpils", "Liepaja", "Jelgava", "Jurmala"],
  "Lebanon": ["Beirut", "Tripoli", "Sidon", "Tyre", "Zahle"],
  "Lesotho": ["Maseru", "Teyateyaneng", "Mafeteng", "Hlotse"],
  "Liberia": ["Monrovia", "Gbarnga", "Buchanan", "Kakata", "Harper"],
  "Libya": ["Tripoli", "Benghazi", "Misrata", "Zawiya", "Sabha"],
  "Liechtenstein": ["Vaduz", "Schaan", "Balzers", "Triesen"],
  "Lithuania": ["Vilnius", "Kaunas", "Klaipeda", "Siauliai", "Panevezys"],
  "Luxembourg": ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange"],
  "Madagascar": ["Antananarivo", "Toamasina", "Antsirabe", "Mahajanga", "Fianarantsoa"],
  "Malawi": ["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Kasungu"],
  "Malaysia": ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Kuching"],
  "Maldives": ["Male", "Addu City", "Fuvahmulah", "Kulhudhuffushi"],
  "Mali": ["Bamako", "Sikasso", "Mopti", "Kayes", "Segou"],
  "Malta": ["Valletta", "Birkirkara", "Sliema", "Mosta", "Qormi"],
  "Marshall Islands": ["Majuro", "Ebeye", "Jabor", "Jaluit"],
  "Mauritania": ["Nouakchott", "Nouadhibou", "Kaedi", "Rosso"],
  "Mauritius": ["Port Louis", "Beau Bassin-Rose Hill", "Vacoas-Phoenix", "Curepipe", "Quatre Bornes"],
  "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
  "Micronesia": ["Palikir", "Weno", "Kolonia", "Tofol"],
  "Moldova": ["Chisinau", "Tiraspol", "Balti", "Bender", "Cahul"],
  "Monaco": ["Monaco", "Monte Carlo", "La Condamine", "Fontvieille"],
  "Mongolia": ["Ulaanbaatar", "Erdenet", "Darkhan", "Choibalsan"],
  "Montenegro": ["Podgorica", "Niksic", "Herceg Novi", "Bar", "Budva"],
  "Morocco": ["Casablanca", "Rabat", "Fes", "Marrakesh", "Tangier"],
  "Mozambique": ["Maputo", "Matola", "Beira", "Nampula", "Chimoio"],
  "Myanmar (Burma)": ["Yangon", "Mandalay", "Naypyidaw", "Bago", "Mawlamyine"],
  "Namibia": ["Windhoek", "Walvis Bay", "Swakopmund", "Rundu", "Oshakati"],
  "Nauru": ["Yaren", "Aiwo", "Meneng", "Denigomodu"],
  "Nepal": ["Kathmandu", "Pokhara", "Lalitpur", "Bharatpur", "Biratnagar"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga"],
  "Nicaragua": ["Managua", "Leon", "Masaya", "Matagalpa", "Chinandega"],
  "Niger": ["Niamey", "Zinder", "Maradi", "Agadez", "Tahoua"],
  "Nigeria": ["Lagos", "Kano", "Abuja", "Ibadan", "Port Harcourt"],
  "North Korea": ["Pyongyang", "Hamhung", "Chongjin", "Nampo", "Wonsan"],
  "North Macedonia": ["Skopje", "Bitola", "Kumanovo", "Prilep", "Tetovo"],
  "Norway": ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
  "Oman": ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur"],
  "Pakistan": ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"],
  "Palau": ["Ngerulmud", "Koror", "Melekeok", "Airai"],
  "Palestine State": ["Gaza City", "Jerusalem", "Hebron", "Nablus", "Ramallah"],
  "Panama": ["Panama City", "San Miguelito", "Colon", "David", "Santiago"],
  "Papua New Guinea": ["Port Moresby", "Lae", "Mount Hagen", "Madang", "Goroka"],
  "Paraguay": ["Asuncion", "Ciudad del Este", "San Lorenzo", "Luque", "Capiata"],
  "Peru": ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Cusco"],
  "Philippines": ["Manila", "Quezon City", "Davao City", "Cebu City", "Zamboanga City"],
  "Poland": ["Warsaw", "Krakow", "Lodz", "Wroclaw", "Poznan"],
  "Portugal": ["Lisbon", "Porto", "Braga", "Coimbra", "Funchal"],
  "Qatar": ["Doha", "Al Rayyan", "Al Wakrah", "Umm Salal", "Al Khor"],
  "Romania": ["Bucharest", "Cluj-Napoca", "Timisoara", "Iasi", "Constanta"],
  "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"],
  "Rwanda": ["Kigali", "Butare", "Gisenyi", "Musanze", "Rubavu"],
  "Saint Kitts and Nevis": ["Basseterre", "Charlestown", "Sandy Point Town"],
  "Saint Lucia": ["Castries", "Vieux Fort", "Gros Islet", "Soufriere"],
  "Saint Vincent and the Grenadines": ["Kingstown", "Georgetown", "Barrouallie", "Port Elizabeth"],
  "Samoa": ["Apia", "Vaitele", "Faleula", "Siusega"],
  "San Marino": ["San Marino", "Serravalle", "Borgo Maggiore", "Domagnano"],
  "Sao Tome and Principe": ["Sao Tome", "Santo Antonio", "Neves", "Trindade"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  "Senegal": ["Dakar", "Touba", "Thies", "Saint-Louis", "Kaolack"],
  "Serbia": ["Belgrade", "Novi Sad", "Nis", "Kragujevac", "Subotica"],
  "Seychelles": ["Victoria", "Anse Boileau", "Beau Vallon", "Takamaka"],
  "Sierra Leone": ["Freetown", "Bo", "Kenema", "Makeni", "Koidu"],
  "Singapore": ["Singapore"],
  "Slovakia": ["Bratislava", "Kosice", "Presov", "Zilina", "Nitra"],
  "Slovenia": ["Ljubljana", "Maribor", "Celje", "Kranj", "Koper"],
  "Solomon Islands": ["Honiara", "Auki", "Gizo", "Noro"],
  "Somalia": ["Mogadishu", "Hargeisa", "Bosaso", "Kismayo", "Baidoa"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
  "South Sudan": ["Juba", "Wau", "Malakal", "Yei", "Bor"],
  "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Malaga"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo"],
  "Sudan": ["Khartoum", "Omdurman", "Port Sudan", "Nyala", "Kassala"],
  "Suriname": ["Paramaribo", "Lelydorp", "Nieuw Nickerie", "Moengo"],
  "Sweden": ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Vasteras"],
  "Switzerland": ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
  "Syria": ["Damascus", "Aleppo", "Homs", "Latakia", "Hama"],
  "Tajikistan": ["Dushanbe", "Khujand", "Kulob", "Bokhtar", "Istaravshan"],
  "Tanzania": ["Dar es Salaam", "Dodoma", "Mwanza", "Arusha", "Mbeya"],
  "Thailand": ["Bangkok", "Chiang Mai", "Pattaya", "Phuket", "Nakhon Ratchasima"],
  "Timor-Leste": ["Dili", "Baucau", "Maliana", "Suai"],
  "Togo": ["Lome", "Sokode", "Kara", "Kpalime", "Atakpame"],
  "Tonga": ["Nuku'alofa", "Neiafu", "Pangai", "Haveluloto"],
  "Trinidad and Tobago": ["Port of Spain", "San Fernando", "Chaguanas", "Arima", "Point Fortin"],
  "Tunisia": ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"],
  "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  "Turkmenistan": ["Ashgabat", "Turkmenabat", "Dashoguz", "Mary", "Balkanabat"],
  "Tuvalu": ["Funafuti", "Vaiaku", "Asau", "Savave"],
  "Uganda": ["Kampala", "Gulu", "Mbarara", "Jinja", "Mbale"],
  "Ukraine": ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman"],
  "United Kingdom": ["Bath", "Birmingham", "Bradford", "Brighton & Hove", "Bristol",
  "Cambridge",
  "Canterbury",
  "Carlisle",
  "Chelmsford",
  "Chester",
  "Chichester",
  "Colchester",
  "Coventry",
  "Derby",
  "Doncaster",
  "Durham",
  "Ely",
  "Exeter",
  "Gloucester",
  "Hereford",
  "Kingston-upon-Hull",
  "Lancaster",
  "Leeds",
  "Leicester",
  "Lichfield",
  "Lincoln",
  "Liverpool",
  "London",
  "Manchester",
  "Milton Keynes",
  "Newcastle-upon-Tyne",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Peterborough",
  "Plymouth",
  "Portsmouth",
  "Preston",
  "Ripon",
  "Salford",
  "Salisbury",
  "Sheffield",
  "Southampton",
  "Southend-on-Sea",
  "St Albans",
  "Stoke on Trent",
  "Sunderland",
  "Truro",
  "Wakefield",
  "Wells",
  "Westminster",
  "Winchester",
  "Wolverhampton",
  "Worcester",
  "York",

  "Armagh",
  "Bangor (Northern Ireland)",
  "Belfast",
  "Lisburn",
  "Londonderry",
  "Newry",

  "Aberdeen",
  "Dundee",
  "Dunfermline",
  "Edinburgh",
  "Glasgow",
  "Inverness",
  "Perth",
  "Stirling",

  "Bangor (Wales)",
  "Cardiff",
  "Newport",
  "St Asaph",
  "St Davids",
  "Swansea",
  "Wrexham"
],
  "United States of America": ["New York City", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  "Uruguay": ["Montevideo", "Salto", "Ciudad de la Costa", "Paysandu", "Las Piedras"],
  "Uzbekistan": ["Tashkent", "Samarkand", "Namangan", "Andijan", "Bukhara"],
  "Vanuatu": ["Port Vila", "Luganville", "Norsup", "Isangel"],
  "Venezuela": ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay"],
  "Vietnam": ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho"],
  "Yemen": ["Sanaa", "Aden", "Taiz", "Al Hudaydah", "Ibb"],
  "Zambia": ["Lusaka", "Kitwe", "Ndola", "Kabwe", "Livingstone"],
  "Zimbabwe": ["Harare", "Bulawayo", "Chitungwiza", "Mutare", "Gweru"]
};

const timeZones = {
  "Afghanistan": "Asia/Kabul", "Albania": "Europe/Tirane", "Algeria": "Africa/Algiers", 
  "Andorra": "Europe/Andorra", "Angola": "Africa/Luanda", "Antigua and Barbuda": "America/Antigua",
  "Argentina": "America/Argentina/Buenos_Aires", "Armenia": "Asia/Yerevan", "Australia": "Australia/Sydney", 
  "Austria": "Europe/Vienna", "Azerbaijan": "Asia/Baku", "Bahamas": "America/Nassau", 
  "Bahrain": "Asia/Bahrain", "Bangladesh": "Asia/Dhaka", "Barbados": "America/Barbados", 
  "Belarus": "Europe/Minsk", "Belgium": "Europe/Brussels", "Belize": "America/Belize", 
  "Benin": "Africa/Porto-Novo", "Bhutan": "Asia/Thimphu", "Bolivia": "America/La_Paz", 
  "Bosnia and Herzegovina": "Europe/Sarajevo", "Botswana": "Africa/Gaborone", "Brazil": "America/Sao_Paulo", 
  "Brunei": "Asia/Brunei", "Bulgaria": "Europe/Sofia", "Burkina Faso": "Africa/Ouagadougou", 
  "Burundi": "Africa/Bujumbura", "Cabo Verde": "Atlantic/Cape_Verde", "Cambodia": "Asia/Phnom_Penh", 
  "Cameroon": "Africa/Douala", "Canada": "America/Toronto", "Central African Republic": "Africa/Bangui", 
  "Chad": "Africa/Ndjamena", "Chile": "America/Santiago", "China": "Asia/Shanghai", 
  "Colombia": "America/Bogota", "Comoros": "Indian/Comoro", "Congo (Congo-Brazzaville)": "Africa/Brazzaville", 
  "Costa Rica": "America/Costa_Rica", "Croatia": "Europe/Zagreb", "Cuba": "America/Havana", 
  "Cyprus": "Asia/Nicosia", "Czechia (Czech Republic)": "Europe/Prague", "Côte d'Ivoire": "Africa/Abidjan", 
  "Democratic Republic of the Congo": "Africa/Kinshasa", "Denmark": "Europe/Copenhagen", "Djibouti": "Africa/Djibouti", 
  "Dominica": "America/Dominica", "Dominican Republic": "America/Santo_Domingo", "Ecuador": "America/Guayaquil", 
  "Egypt": "Africa/Cairo", "El Salvador": "America/El_Salvador", "Equatorial Guinea": "Africa/Malabo", 
  "Eritrea": "Africa/Asmara", "Estonia": "Europe/Tallinn", "Eswatini (Swaziland)": "Africa/Mbabane", 
  "Ethiopia": "Africa/Addis_Ababa", "Fiji": "Pacific/Fiji", "Finland": "Europe/Helsinki", 
  "France": "Europe/Paris", "Gabon": "Africa/Libreville", "Gambia": "Africa/Banjul", 
  "Georgia": "Asia/Tbilisi", "Germany": "Europe/Berlin", "Ghana": "Africa/Accra", 
  "Greece": "Europe/Athens", "Grenada": "America/Grenada", "Guatemala": "America/Guatemala", 
  "Guinea": "Africa/Conakry", "Guinea-Bissau": "Africa/Bissau", "Guyana": "America/Guyana", 
  "Haiti": "America/Port-au-Prince", "Holy See": "Europe/Vatican", "Honduras": "America/Tegucigalpa", 
  "Hungary": "Europe/Budapest", "Iceland": "Atlantic/Reykjavik", "India": "Asia/Kolkata", 
  "Indonesia": "Asia/Jakarta", "Iran": "Asia/Tehran", "Iraq": "Asia/Baghdad", 
  "Ireland": "Europe/Dublin", "Israel": "Asia/Jerusalem", "Italy": "Europe/Rome", 
  "Jamaica": "America/Jamaica", "Japan": "Asia/Tokyo", "Jordan": "Asia/Amman", 
  "Kazakhstan": "Asia/Almaty", "Kenya": "Africa/Nairobi", "Kiribati": "Pacific/Tarawa", 
  "Kuwait": "Asia/Kuwait", "Kyrgyzstan": "Asia/Bishkek", "Laos": "Asia/Vientiane", 
  "Latvia": "Europe/Riga", "Lebanon": "Asia/Beirut", "Lesotho": "Africa/Maseru", 
  "Liberia": "Africa/Monrovia", "Libya": "Africa/Tripoli", "Liechtenstein": "Europe/Vaduz", 
  "Lithuania": "Europe/Vilnius", "Luxembourg": "Europe/Luxembourg", "Madagascar": "Indian/Antananarivo", 
  "Malawi": "Africa/Blantyre", "Malaysia": "Asia/Kuala_Lumpur", "Maldives": "Indian/Maldives", 
  "Mali": "Africa/Bamako", "Malta": "Europe/Malta", "Marshall Islands": "Pacific/Majuro", 
  "Mauritania": "Africa/Nouakchott", "Mauritius": "Indian/Mauritius", "Mexico": "America/Mexico_City", 
  "Micronesia": "Pacific/Pohnpei", "Moldova": "Europe/Chisinau", "Monaco": "Europe/Monaco", 
  "Mongolia": "Asia/Ulaanbaatar", "Montenegro": "Europe/Podgorica", "Morocco": "Africa/Casablanca", 
  "Mozambique": "Africa/Maputo", "Myanmar (Burma)": "Asia/Yangon", "Namibia": "Africa/Windhoek", 
  "Nauru": "Pacific/Nauru", "Nepal": "Asia/Kathmandu", "Netherlands": "Europe/Amsterdam", 
  "New Zealand": "Pacific/Auckland", "Nicaragua": "America/Managua", "Niger": "Africa/Niamey", 
  "Nigeria": "Africa/Lagos", "North Korea": "Asia/Pyongyang", "North Macedonia": "Europe/Skopje", 
  "Norway": "Europe/Oslo", "Oman": "Asia/Muscat", "Pakistan": "Asia/Karachi", 
  "Palau": "Pacific/Palau", "Palestine State": "Asia/Gaza", "Panama": "America/Panama", 
  "Papua New Guinea": "Pacific/Port_Moresby", "Paraguay": "America/Asuncion", "Peru": "America/Lima", 
  "Philippines": "Asia/Manila", "Poland": "Europe/Warsaw", "Portugal": "Europe/Lisbon", 
  "Qatar": "Asia/Qatar", "Romania": "Europe/Bucharest", "Russia": "Europe/Moscow", 
  "Rwanda": "Africa/Kigali", "Saint Kitts and Nevis": "America/St_Kitts", "Saint Lucia": "America/St_Lucia", 
  "Saint Vincent and the Grenadines": "America/St_Vincent", "Samoa": "Pacific/Apia", "San Marino": "Europe/San_Marino", 
  "Sao Tome and Principe": "Africa/Sao_Tome", "Saudi Arabia": "Asia/Riyadh", "Senegal": "Africa/Dakar", 
  "Serbia": "Europe/Belgrade", "Seychelles": "Indian/Mahe", "Sierra Leone": "Africa/Freetown", 
  "Singapore": "Asia/Singapore", "Slovakia": "Europe/Bratislava", "Slovenia": "Europe/Ljubljana", 
  "Solomon Islands": "Pacific/Guadalcanal", "Somalia": "Africa/Mogadishu", "South Africa": "Africa/Johannesburg", 
  "South Korea": "Asia/Seoul", "South Sudan": "Africa/Juba", "Spain": "Europe/Madrid", 
  "Sri Lanka": "Asia/Colombo", "Sudan": "Africa/Khartoum", "Suriname": "America/Paramaribo", 
  "Sweden": "Europe/Stockholm", "Switzerland": "Europe/Zurich", "Syria": "Asia/Damascus", 
  "Tajikistan": "Asia/Dushanbe", "Tanzania": "Africa/Dar_es_Salaam", "Thailand": "Asia/Bangkok", 
  "Timor-Leste": "Asia/Dili", "Togo": "Africa/Lome", "Tonga": "Pacific/Tongatapu", 
  "Trinidad and Tobago": "America/Port_of_Spain", "Tunisia": "Africa/Tunis", "Turkey": "Europe/Istanbul", 
  "Turkmenistan": "Asia/Ashgabat", "Tuvalu": "Pacific/Funafuti", "Uganda": "Africa/Kampala", 
  "Ukraine": "Europe/Kyiv", "United Arab Emirates": "Asia/Dubai", "United Kingdom": "Europe/London", 
  "United States of America": "America/New_York", "Uruguay": "America/Montevideo", "Uzbekistan": "Asia/Tashkent", 
  "Vanuatu": "Pacific/Efate", "Venezuela": "America/Caracas", "Vietnam": "Asia/Ho_Chi_Minh", 
  "Yemen": "Asia/Aden", "Zambia": "Africa/Lusaka", "Zimbabwe": "Africa/Harare"
};

export default function Clock() {

  const [country, setCountry] = useState("United Kingdom");
  const [time, setTime] = useState(new Date());
  const [city, setCity] = useState("")
  const [prayers, setPrayers] = useState({});
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones["United Kingdom"]);

  const handleChange = (e) => {
    setCountry(e.target.value);
    setCity("");
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  useEffect(() => {
    if (country) fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(city ? `${city}, ${country}` : country)}`).then(r => r.json()).then(d => {
      setPrayers(d.data.timings);
      setSelectedTimeZone(d.data.meta.timezone);
    });
  }, [country, city]);

  useEffect(() => {
    const Valid = setInterval(() => {
       setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(Valid);
    }
  }, []);

  function fetchTime() {

    if (!country) return "undefined:undefined:undefined"
    const zone = selectedTimeZone || timeZones[country];

    return new Intl.DateTimeFormat("en-GB", {

       timeZone: zone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,

      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(time);

  }

  return (
    <div className="Option">
      <form>
         <select value={country} onChange={handleChange}>
           <option value="">Select a Country</option>
           {countries.map((c) => (
             <option key={c} value={c}>
               {c}
             </option>
           ))}
         </select>
        {cities[country] && (
           <select value={city || ""} onChange={handleCityChange}>
             <option value="">Select a City</option>
             {cities[country].map((c) => (
               <option key={c} value={c}>
                 {c}
               </option>
             ))}
           </select>
         )}
      </form>

      <div className="Clock">
         <li className="Country">{city} , {country}</li>
         <span className="Time">{fetchTime()}</span>
         <li className="Fajr">Fajr - {prayers.Fajr}</li>
         <li className="Dhuhr">Dhuhr - {prayers.Dhuhr}</li>
         <li className="Asr">Asr - {prayers.Asr}</li>
         <li className="Maghrib">Maghrib - {prayers.Maghrib}</li>
         <li className="Isha">Isha - {prayers.Isha}</li>
      </div>

      <div>

         <h1 className="Hi">Hello there!</h1>
         <h2 className="Intro">My name is Jobayer Khan and I am 20 years old. I go to Queen Mary University of London to study Computer Systems Engineering!</h2>
         <h1 className="Clk">This is my prayer time clock app. All you need to do is select any random country and you get their respective live times and each 5 live prayer times immediately.</h1>
      </div>
    </div>
  );
}
