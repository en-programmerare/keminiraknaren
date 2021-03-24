let decimaler = 14;
//listor med värden
const masstal = [59.0, 1.008, 4.0026, 6.94, 9.0122, 10.81, 12.011, 14.007, 15.999, 18.998, 20.180, 22.990, 24.305, 26.982, 28.085, 30.974, 32.06, 35.45, 39.948, 39.098, 40.078, 44.956, 47.867, 50.942, 51.996, 54.938, 55.845, 58.933, 58.693, 63.546, 65.38];
//Vatten, guld, koppar, järn, kol, kol, aluminium, etanol
let specifik_varmekapacitet = [4.19, 0.13, 0.39, 0.45, 0.49, 0.69, 0.9, 2.43];
const tecken = ["Ac", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn"];
const namn = ["acetat", "väte", "helium", "litium", "beryllium", "bor", "kol", "kväve", "syre", "fluor", "neon", "natrium", "magnesium", "aluminium", "kisel", "fosfor", "svavel", "klor", "argon", "kalium", "kalcium", "skandium", "titan", "vanadin", "krom", "mangan", "järn", "kobolt", "nickel", "koppar", "zink"];
const trivialnamn = [
    ["vatten", "H2O"],
    ["syrgas", "O2"],
    ["kvävgas", "N2"],
    ["fluorgas", "F2"],
    ["ammoniak", "NH3"],
    ["koksalt", "NaCl"],
    ["glukos", "C6H12O6"],
    ["druvsocker", "C6H12O6"],
    ["saltsyra", "HCl"],
    ["svavelsyra", "H2SO4"],
    ["salpetersyra", "HNO3"],
    ["natriumklorid", "NaCl"],
    ["kaustiksoda", "NaOH"],
    ["lut", "KOH"]
];
const negativ_jonnamn = ["acetat", "hydrid", "-", "-", "-", "-", "-", "nitrid", "oxid", "fluorid", "-", "-", "-", "-", "-", "-", "fosfid", "sulfid", "klorid", "-", "-"];
//Sparade värden

//för enhetsomvandling
let massenheter = ["mg", "cg", "dg", "g", "dag", "hg", "kg"];
let volymenheter1 = ["mm³", "cm³", "dm³", "m³", "dam³", "hm³", "km³"];
let volymenheter2 = ["ml", "cl", "dl", "l"];
let tryckenheter = ["Pa", "daPa", "hPa", "kPa"];

let praktiskBreddminskning = 1;

//---------------------

//Ladda nyhetstexten via xmlhttpsrequest asynkront
let nyhetsladdning = new XMLHttpRequest();
nyhetsladdning.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {

        document.getElementById("nyheter")
            .innerHTML = nyhetsladdning.responseText;
    }
};
nyhetsladdning.open("GET", "https://raw.githubusercontent.com/en-programmerare/persiljahjalp-filer/master/nyheter-keminiraknaren", true);
nyhetsladdning.send();

kontrolleraKakorVidStart();
for(let i of document.getElementsByClassName("flik_knapp")) {
    let klonad = i.cloneNode(true);
    klonad.classList.remove("flik_knapp");
    klonad.classList.add("flik_meny_knapp");
    klonad.id = klonad.id + "_klonad";
    document.getElementById("meny").appendChild(klonad);
    let br = document.createElement("BR");
    br.classList.add("meny_br");
    document.getElementById("meny").appendChild(br);
}
document.getElementById("flik_start_klonad").style.display = "none";
test();

//--------------------------
//TESTKOD

//oppna_flik("formelsamling");

function test() {
    for(let i = 0; i < document.getElementsByClassName("flik_knapp").length; i++) {
        document.getElementsByClassName("flik_knapp")[i].style.display = "inline";
        document.getElementsByClassName("flik_meny_knapp")[i].style.display = "none";
        document.getElementsByClassName("meny_br")[i].style.display = "none";
    }
    if(window.innerWidth * praktiskBreddminskning> 1310)
        i = 9;
    else
        i = Math.floor((window.innerWidth * praktiskBreddminskning) / 131);
    while(i < document.getElementsByClassName("flik_knapp").length) {
        document.getElementsByClassName("flik_knapp")[i].style.display = "none";
        document.getElementsByClassName("flik_meny_knapp")[i].style.display = "inline";
        document.getElementsByClassName("meny_br")[i].style.display = "inline";
        i++;
    }
    document.getElementById("flik_start_klonad").style.display = "none";
}

//--------------------------
//Flikhantering


function oppna_flik(flik) {
    //Stäng av alla flikar
    oppnaStangMeny(true);
    for(let objekt of document.getElementsByClassName("flik_knapp")) {
        objekt.classList.remove("aktiv");
    }
    //Stäng av alla menyknappar
    for(let objekt of document.getElementsByClassName("flik_meny_knapp")) {
        objekt.classList.remove("aktiv");
    }
    //Dölj alla behållare
    for(let objekt of document.getElementsByClassName("behallare")) {
        objekt.classList.add("dold");
    }

    //Aktivera rätt flik och visa rätt behållare
    try {
        document.getElementById(flik + "_behallare")
            .classList.remove("dold");
        document.getElementById("flik_" + flik)
            .classList.add("aktiv");
        document.getElementById("flik_" + flik + "_klonad")
            .classList.add("aktiv");
    } catch (exc) {
        //Hantera felaktiga fliknamn i koden
        document.getElementById("ogiltlig_behallare")
            .classList.remove("dold");
    }
}

//Öppna och stäng meny
function oppnaStangMeny(stang_endast) {
    if(stang_endast)
        document.getElementById("meny_knapp").classList.add("aktiv");
    if(document.getElementById("meny_knapp").classList.contains("aktiv")) {
        document.getElementById("meny_knapp").classList.remove("aktiv");
        document.getElementById("meny").style.display = "none";
    }
    else {
        document.getElementById("meny_knapp").classList.add("aktiv");
        document.getElementById("meny").style.display = "block";
    }
}

//--------------------------
//Beräkningsfunktioner där indatan hämtas från textfälten och utdatan går till resultaten


//Utifrån ämne
function berakna_substansmangd() {
    let molmassan = molmassa(tillSummaformel(document.getElementById("amne_substansmangd")
        .value));
    let substansmangden = konverteraMassenheter(document.getElementById("massval_substansmangd")
        .value, "g", document.getElementById("massa_substansmangd")
        .value);
    if(molmassan == -1) {
        document.getElementById("substansmangd")
            .innerHTML = "Felaktigt ämne";
    } else {
        document.getElementById("substansmangd")
            .innerHTML = avrunda(substansmangd(molmassan, substansmangden));
    }
}

function berakna_substansmangd_gaslag() {
    let temperatur = konverteraTemperaturenheter(document.getElementById("temperaturval_substansmangd_gaslag")
        .value, "K", Number(document.getElementById("temperatur_substansmangd_gaslag")
            .value));
    let tryck = konverteraTryckenheter(document.getElementById("tryckval_substansmangd_gaslag")
        .value, "Pa", Number(document.getElementById("tryck_substansmangd_gaslag")
            .value));
    let volym = konverteraVolymenheter(document.getElementById("volymval_substansmangd_gaslag")
        .value, "m³", Number(document.getElementById("volym_substansmangd_gaslag")
            .value));
    document.getElementById("substansmangd_gaslag")
        .innerHTML = avrunda(Number(String((tryck * volym) / (8.314 * temperatur))));
}

//utifrån ämne
function berakna_massa() {
    let molmassan = molmassa(tillSummaformel(document.getElementById("amne_massa")
        .value));

    if(molmassan == -1) {
        document.getElementById("massa")
            .innerHTML = "Felaktigt ämne";
    } else {
        document.getElementById("massa")
            .innerHTML = avrunda(konverteraMassenheter("g", document.getElementById("utdataval_massa")
                .value, massa(molmassan, document.getElementById("substansmangd_massa")
                    .value)));
    }
}

//utifrån ämne
function berakna_molmassa() {
    let molmassan = molmassa(tillSummaformel(document.getElementById("amne_molmassa")
        .value));
    if(molmassan == -1) {
        document.getElementById("molmassa")
            .innerHTML = "Felaktigt ämne";
    } else {
        document.getElementById("molmassa")
            .innerHTML = avrunda(molmassan);
    }
}

//  m = nM
function berakna_massa_molmassa() {
    document.getElementById("massa_molmassa")
        .innerHTML = avrunda(konverteraMassenheter("g", document.getElementById("utdataval_massa_molmassa")
            .value, document.getElementById("molmassa_massa_molmassa")
            .value * document.getElementById("substansmangd_massa_molmassa")
            .value));
}

//  M = n / m
function berakna_molmassa_matning() {
    document.getElementById("molmassa_matning")
        .innerHTML = avrunda(konverteraMassenheter(document.getElementById("massval_molmassa_matning")
                .value, "g", document.getElementById("massa_molmassa_matning")
                .value) / document.getElementById("substansmangd_molmassa_matning")
            .value);
}

// n = pV / RT  m = n * M
function berakna_massa_gaslag() {
    let temperatur = konverteraTemperaturenheter(document.getElementById("temperaturval_massa_gaslag")
        .value, "K", Number(document.getElementById("temperatur_massa_gaslag")
            .value));
    let tryck = konverteraTryckenheter(document.getElementById("tryckval_massa_gaslag")
        .value, "Pa", Number(document.getElementById("tryck_massa_gaslag")
            .value));
    let volym = konverteraVolymenheter(document.getElementById("volymval_massa_gaslag")
        .value, "m³", Number(document.getElementById("volym_massa_gaslag")
            .value));
    let substansmangd = Number(String((tryck * volym) / (8.314 * temperatur)));
    document.getElementById("massa_gaslag").innerHTML = avrunda(konverteraMassenheter("g", document.getElementById("utdataval_massa_gaslag").value, molmassa(document.getElementById("amne_massa_gaslag").value) * substansmangd));
}
// n = m / M
function berakna_substansmangd_molmassa() {
    let molmassa = document.getElementById("molmassa_substansmangd_molmassa")
        .value;
    let massa = konverteraMassenheter(document.getElementById("massval_substansmangd_molmassa")
        .value, "g", document.getElementById("massa_substansmangd_molmassa")
        .value);
    document.getElementById("substansmangd_molmassa")
        .value = avrunda(massa / molmassa);
}

// pH = -lg [H3O+]
function berakna_ph_oxoniumjon() {
    document.getElementById("ph_oxoniumjon")
        .innerHTML = avrunda(-Math.log10(document.getElementById("oxoniumjon_ph_oxoniumjon")
            .value));
}

// pH = -lg( kw / [OH-] )
function berakna_ph_hydroxidjon() {
    document.getElementById("ph_hydroxidjon")
        .innerHTML = avrunda(-Math.log10(document.getElementById("kw_ph_hydroxidjon")
            .value / document.getElementById("hydroxidjon_ph_hydroxidjon")
            .value));
}

// ([H3O+]^2) / ([HA] - [H3O+]) = Ka  ==>  pH = -lg [H3O+]
function berakna_ph_ka() {
    let Ka = document.getElementById("ka_ph_ka")
        .value;
    let c = document.getElementById("koncentration_ph_ka")
        .value;
    document.getElementById("ph_ka")
        .innerHTML = avrunda(-Math.log10(-(Ka / 2) + Math.sqrt(Math.pow((Ka / 2), 2) + c * Ka)));
}

//  ([H3O+]^2) / ([HA] - [H3O+]) = Ka
function berakna_koncentration_ka() {
    let Ka = document.getElementById("ka_koncentration_ka")
        .value;
    let c = document.getElementById("koncentration_koncentration_ka")
        .value;
    document.getElementById("koncentration_ka")
        .innerHTML = avrunda(-(Ka / 2) + Math.sqrt(Math.pow((Ka / 2), 2) + c * Ka));

}

//  [H3O+] = 10^(-pH)
function berakna_koncentration_oxonium1() {
    document.getElementById("oxoniumjon_koncentration_oxonium1")
        .innerHTML = avrunda(Math.pow(10, (-document.getElementById("ph_koncentration_oxonium1")
            .value)));
}

// [OH-] = kw / ( 10^(-pH) )
function berakna_koncentration_hydroxid() {
    document.getElementById("hydroxidjon_koncentration_hydroxid").innerHTML =
        avrunda(document.getElementById("kw_koncentration_hydroxidjon").value / Math.pow(10, -document.getElementById("ph_koncentration_hydroxidjon").value));
}

//  c = n / V
function berakna_spadning_substansmangd() {
    let volym = avrunda(konverteraVolymenheter(document.getElementById("volymval_spadning_substansmangd")
            .value, "dm³", document.getElementById("volym_spadning_substansmangd")
            .value)); 
    document.getElementById("spadning_substansmangd")
        .innerHTML = avrunda(document.getElementById("substansmangd_spadning_substansmangd")
        .value / volym);
}

//   Ckonc * Vkonc = Cutsp * Vutsp
function berakna_spadning() {
    let volym = konverteraVolymenheter(document.getElementById("volymval_spadning")
        .value, "dm³", document.getElementById("onskad_volym_spadning")
        .value);
    let klart = (volym * document.getElementById("onskad_koncentration_spadning")
            .value) / document.getElementById("ursprungskoncentration_spadning")
        .value;
    document.getElementById("volym_spadning")
        .innerHTML = avrunda(konverteraVolymenheter("dm³", document.getElementById("utdataval_spadning")
            .value, klart));
}

// (n1 * v1 + n2 * v2) / (v1 + v2)
function berakna_blandning_spadning() {
    let koncentration1 = document.getElementById("koncentration1_blandning_spadning").value;
    let volym1 = konverteraVolymenheter(document.getElementById("volymval1_blandning_spadning").value, "dm³", document.getElementById("volym1_blandning_spadning").value);
    let koncentration2 = document.getElementById("koncentration2_blandning_spadning").value;
    let volym2 = konverteraVolymenheter(document.getElementById("volymval2_blandning_spadning").value, "dm³", document.getElementById("volym2_blandning_spadning").value);
    let substansmangd = koncentration1 * volym1 + koncentration2 * volym2;
    let nyvolym = volym1 + volym2;
    document.getElementById("blandning_spadning").innerHTML = avrunda(substansmangd / nyvolym);
}
//   Ka = ([H3O+]*[A-]) / [HA] - [A-]
function berakna_ka_oxoniumjon() {
    let oxonium = document.getElementById("oxoniumjon_ka_oxoniumjon").value;
    let syra = document.getElementById("syra_ka_oxoniumjon").value;

    document.getElementById("ka_oxoniumjon").innerHTML = avrunda(Math.pow(oxonium, 2) / (syra - oxonium));
}

// Ka = (10^-pH * [A-]) / [HA] - [A-]
function berakna_ka_ph() {
    let ph = document.getElementById("ph_ka_ph").value;
    let syra = document.getElementById("syra_ka_ph").value;
    
    document.getElementById("ka_ph").innerHTML = avrunda(Math.pow(Math.pow(10, -1 * ph), 2) / (syra - Math.pow(10, -1 * ph)));
}

function berakna_viceversa() {
   document.getElementById("viceversa").innerHTML = avrunda(document.getElementById("kw_viceversa").value / document.getElementById("jonkoncentration_viceversa").value);
}

function berakna_energi_c() {
    let specifik = document.getElementById("c_energi_c").value;
    let specifik_enhet_j = document.getElementById("energival_c_energi_c").value;
    let specifik_enhet_g = document.getElementById("massval_c_energi_c").value;
    
    specifik = specifik / konverteraMassenheter(specifik_enhet_g, "g", 1);
    specifik = konverteraEnergienheter(specifik_enhet_j, "J", specifik);
    
    let massa = konverteraMassenheter(document.getElementById("massval_energi_c").value, "g", document.getElementById("massa_energi_c").value);
    let deltaT = document.getElementById("temperatur_energi_c").value;
    
    document.getElementById("energi_c").innerHTML = avrunda(konverteraEnergienheter("J", document.getElementById("utdataval_energi_c").value, specifik * massa * deltaT));
    
}

function berakna_energi_amne() {
    let specifik = specifik_varmekapacitet[document.getElementById("amne_energi_amne").selectedIndex];
    
    specifik = specifik / konverteraMassenheter("kg", "g", 1);
    specifik = konverteraEnergienheter("kJ", "J", specifik);
    
    let massa = konverteraMassenheter(document.getElementById("massval_energi_amne").value, "g", document.getElementById("massa_energi_amne").value);
    let deltaT = document.getElementById("temperatur_energi_amne").value;
    
    document.getElementById("energi_amne").innerHTML = avrunda(konverteraEnergienheter("J", document.getElementById("utdataval_energi_amne").value, specifik * massa * deltaT));
}

function berakna_tryck_gaslag() {
    let substans = Number(document.getElementById("substansmangd_tryck_gaslag").value);
    let volym = konverteraVolymenheter(document.getElementById("volymval_tryck_gaslag").value, "m³", Number(document.getElementById("volym_tryck_gaslag").value));
    let temperatur = konverteraTemperaturenheter(document.getElementById("temperaturval_tryck_gaslag").value, "K", Number(document.getElementById("temperatur_tryck_gaslag").value));
    
    let tryck = konverteraTryckenheter("Pa", document.getElementById("utdataval_tryck_gaslag").value, (substans * temperatur * 8.314) / volym);
    document.getElementById("tryck_gaslag").innerHTML = avrunda(tryck);
}

function berakna_tryck_gaslag1() {
    let massa = konverteraMassenheter(document.getElementById("massval_tryck_gaslag1").value, "g", document.getElementById("massa_tryck_gaslag1").value);
    let volym = konverteraVolymenheter(document.getElementById("volymval_tryck_gaslag1").value, "m³", document.getElementById("volym_tryck_gaslag1").value);
    let temperatur = konverteraTemperaturenheter(document.getElementById("temperaturval_tryck_gaslag1").value, "K", Number(document.getElementById("temperatur_tryck_gaslag1").value));
    
    let substans = massa * molmassa(document.getElementById("amne_tryck_gaslag1").value);
    
    let tryck = konverteraTryckenheter("Pa", document.getElementById("utdataval_tryck_gaslag1").value, (substans * temperatur * 8.314) / volym);
    document.getElementById("tryck_gaslag1").innerHTML = avrunda(tryck);
}


//function 


//----------------

//Nedanstående funktioner beräknar från argument och returnerar svar

//Beräkna molmassa utifrån ämne
function molmassa(amne) {
    let amnen = []; //Lista på ämnen i föreningen, fylls i av funktionen
    let antal = []; //Hur många av varje ämne som finns i föreningen, fylls i av funktionen
    let strang = amne.split(""); //Varje tecken i indatan i array
    let index = 0;
    let molmassa = 0;

    //Löp igenom varje tecken i strängen (arrayen)
    while(index < strang.length) {
        //Om det är en stor bokstav
        if(arStorBokstav(strang[index])) {
            //Om nästa tecken är liten bokstav
            if(index + 1 < strang.length && arLitenBokstav(strang[index + 1])) {
                //Lägg till denna bokstav och nästa i ämnesarrayen [..."C", "l"...] ===> [.."Cl"..]
                amnen.push(strang[index] + strang[index + 1]);
                //Fortsätt i nästa iteration att läsa två efter detta index (början på nästa ämne)
                index += 2;
                //Om nästa tecken är en siffra ("Cl2")
                if(arSiffra(strang[index])) {
                    //Lagra det som antal
                    antal.push(parseInt(amne.substring(index)));
                    //Öka indexet med 1 igen för att nästa iteration börjar läsa därefter
                    index++;
                } else {
                    //Om siffra saknas, sätt 1 till antal
                    antal.push(1);
                }

                //Om det andra tecknet inte är en liten bokstav
            } else {
                //Lägg till det första tecknet som ämne bara ("H"), då är det allt
                amnen.push(strang[index]);
                //Resten som förut, hantera antal
                index++;
                if(arSiffra(strang[index])) {
                    antal.push(parseInt(amne.substring(index)));
                    index++;
                } else {
                    antal.push(1);
                }
            }

        //Om den första bokstaven inte är stor har nåt gått fel
        } else {
            console.log("Fel i formeltolkning");
            index++;
        }
    }
    
    //När allt är klart, löp igenom listan med ämnen
    for(let index in amnen) {
        if(tecken.includes(amnen[index])) {
            //För varje ämne, addera molmassan från den globala arrayen multiplicerat med antal till molmassan
            molmassa += masstal[tecken.indexOf(amnen[index])] * antal[index];
        } else {
            //Om ett ämne inte finns, returnera -1 som indikerar fel
            return -1;
        }
    }
    return molmassa;
}

//Vanliga beräkningsfunktioner
function massa(molmassa, substansmangd) {
    return molmassa * substansmangd;
}

function substansmangd(molmassa, massa) {
    return massa / molmassa;
}

//Småfunktioner
function arBokstav(bokstav) {
    return bokstav.toUpperCase() != bokstav.toLowerCase();
}

function arStorBokstav(bokstav) {
    return arBokstav(bokstav) && bokstav.toUpperCase() === bokstav;
}

function arLitenBokstav(bokstav) {
    return arBokstav(bokstav) && bokstav.toLowerCase() === bokstav;
}

function arSiffra(siffra) {
    return /\d/.test(siffra);
}

function tillSummaformel(text) {
    if(namn.includes(text.toLowerCase())) {
        return tecken[namn.indexOf(text.toLowerCase())];
    }
    return text;
}

//Avrunda ett tal till så många decimaler som står i den globala variabeln
function avrunda(tal) {
    return Math.round((tal + Number.EPSILON) * Math.pow(10, decimaler)) / Math.pow(10, decimaler);
}


//----------------------
//Nedan funktioner för att konvertera enheter


function konverteraMassenheter(inenhet, utenhet, varde) {
    let g = 0;
    //Konvertera till grundenhet
    if(massenheter.includes(inenhet)) {
        //enheterna lagras i en array där varje steg är 10 ggr mindre en det förra
        g = varde * Math.pow(10, (massenheter.indexOf(inenhet) - 3));
    }
    //Konvertera till utenhet enlig ovan
    let svar = 0;
    if(massenheter.includes(utenhet)) {
        svar = g * Math.pow(10, (-(massenheter.indexOf(utenhet) - 3)));
    }
    return svar;

}

//Som ovan, men volymenheter har två arrayer, en där skillnader är *1000 (m3) och en där den är 10 (l)
function konverteraVolymenheter(inenhet, utenhet, varde) {
    let g = 0;
    if(volymenheter1.includes(inenhet)) {
        g = varde * Math.pow(1000, (volymenheter1.indexOf(inenhet) - 2));
    } else if(volymenheter2.includes(inenhet)) {
        g = varde * Math.pow(10, (volymenheter2.indexOf(inenhet) - 3));
    }
    let svar = 0;
    if(volymenheter1.includes(utenhet)) {
        svar = g * Math.pow(1000, (-(volymenheter1.indexOf(utenhet) - 2)));
    } else if(volymenheter2.includes(utenhet)) {
        svar = g * Math.pow(10, (-(volymenheter2.indexOf(utenhet) - 3)));
    }
    return svar;
}

function konverteraTryckenheter(inenhet, utenhet, varde) {
    let g = 0;
    if(tryckenheter.includes(inenhet)) {
        g = varde * Math.pow(10, (tryckenheter.indexOf(inenhet)));
    }
    let svar = 0;
    if(tryckenheter.includes(utenhet)) {
        svar = g * Math.pow(10, (-(tryckenheter.indexOf(utenhet))));
    }
    return svar;
}

//straigjtforward
function konverteraTemperaturenheter(inenhet, utenhet, varde) {
    let c;
    if(inenhet === "K")
        c = varde - 273.15;
    else
        c = varde;
    if(utenhet === "K")
        return c + 273.15;
    else
        return c;
}
function konverteraEnergienheter(inenhet, utenhet, varde) {
    let J;
    switch(inenhet) {
        case "kJ":
            J = varde * 1000;
            break;
        case "J":
            J = varde;
            break;
        case "kcal":
            J = varde * 4.184 * 1000;
            break;
        case "cal":
            J = varde * 4.184;
            break;
        default:
            J = -1;
    }
    switch(utenhet) {
        case "kJ":
            J = J / 1000;
            break;
        case "J":
            J = J;
            break;
        case "kcal":
            J = J / (4.184 * 1000);
            break;
        case "cal":
            J = J / 4.184;
            break;
        default:
            J = -1;
    }
    return J;
}

function kontrolleraKakorVidStart() {
    if(kollaKakburken("standardkw")) {
        document.getElementById("kakor").style.display = "none";
        document.getElementById("radera_kakor").style.display = "inline";
        document.getElementById("decimaler").disabled = false;
        document.getElementById("decimaler").value = ataKaka("decimaler");
        console.log("Cookies finns");
        let kwfalt = document.getElementsByClassName("kw");
        for(let falt of kwfalt) {
            falt.value = ataKaka("standardkw");
            falt.disabled = false;
        }
        avrunda = Number(ataKaka("decimaler"));
    }
}

function tillatKakor() {
    try {
        bakaKaka("standardkw", "1E-14", 30);
        bakaKaka("decimaler", 14, 30);
        window.location.reload();
    } catch (exc) {
        alert(exc.message);
    }
}
function andraInstallningar() {
    bakaKaka("standardkw", document.getElementById("standard_kw").value);
    bakaKaka("decimaler", document.getElementById("decimaler").value);
}

function tvadelad() {
    if(document.getElementsByClassName("container")[0].style.display !== "block") {
        for(let behallare of document.getElementsByClassName("behallare")) {
            behallare.style.width = "50vw";
        }
        document.getElementsByClassName("flikar")[0].style.width = "50vw";
        document.getElementsByClassName("container")[0].style.display = "block";
        document.getElementById("tvadelad_knapp").innerHTML = "Stäng tvådelad skärm";
        praktiskBreddminskning = 0.5;
    }
    else {
        for(let behallare of document.getElementsByClassName("behallare")) {
            behallare.style.width = "100vw";
        }
        document.getElementsByClassName("flikar")[0].style.width = "100vw";
        document.getElementsByClassName("container")[0].style.display = "none";
        document.getElementById("tvadelad_knapp").innerHTML = "Använd tvådelad skärm";
        praktiskBreddminskning = 1;
    }
    test();
}

//HMEH hmeh HmEH
function hmeh() {
    document.getElementById("hmeh")
        .style.display = "block";
}

function hmeh2() {
    document.getElementsByTagName("body")[0].style.backgroundImage = "url('https://cdn.pixabay.com/photo/2020/03/30/13/29/space-4984262_1280.jpg')";
    document.getElementsByTagName("body")[0].style.color = "white";
}

//Skapa en cookie med namn och värde och som går ut efter ett visst antal dagar
function bakaKaka(namn, varde, utgang) {
    let utgangsdatum = new Date();
    //Utgångsdatum anges i millisekunder fr.o.m. nu
    utgangsdatum.setTime(utgangsdatum.getTime() + utgang * 60 * 60 * 24 * 1000);
    let utgangstext = "expires=" + utgangsdatum.toUTCString();
    document.cookie = namn + "=" + varde + ";" + utgangstext + ";path=/"; //Sätt ihop kakan
}

//Hämta värdet på en kaka
function ataKaka(namn) {
    namn = namn + "=";
    let kakortext = decodeURIComponent(document.cookie);
    let kakor = kakortext.split(";"); //Läs varje text mellan semikolonen
    for(let kaka of kakor) {
        if(kaka.includes(namn)) {
            return kaka.substring(kaka.indexOf(namn) + namn.length); //Om det blir namn=iuhsduyfdygf ska den läsa från och med =
        }
    }
    return ""; //Om inget hittas, ge tomt svar
}

//Radera alla cookies
function tomKakburken() {
    let allakakor = document.cookie.split(';');
    for(var i = 0; i < allCookies.length; i++)
        document.cookie = allakakor[i] + "=;expires=" + new Date(0).toUTCString();
    window.location.reload();
}

//Kolla om en cookie finns
function kollaKakburken(namn) {
    if(ataKaka(namn) === "")
        return false;
    return true;
}
