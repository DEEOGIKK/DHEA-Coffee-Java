import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, update, set, get, child } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBNVwY6EJ-xdNiYZTElFLnDu_cG42Oum9g",
    authDomain: "coffee-java-dhea-cd03c.firebaseapp.com",
    projectId: "coffee-java-dhea-cd03c",
    storageBucket: "coffee-java-dhea-cd03c.firebasestorage.app",
    messagingSenderId: "189704530609",
    appId: "1:189704530609:web:d126bb259164f2bc2b1090"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function bukaHalamanMenuMakanan() {
    document.getElementById("HomePage").style = "display: none;";
    document.getElementById("MenuMakananPage").style = "display: flex;";
    document.body.style.backgroundColor = "#65451f";
    window.document.title = "MENU MAKANAN"
}
function bukaHalamanMenuMinuman() {
    document.getElementById("HomePage").style = "display: none;";
    document.getElementById("MenuMinumanPage").style = "display: flex;";
    document.body.style.backgroundColor = "#65451f";
    window.document.title = "MENU MINUMAN"
}

function scrolltoabout() {
    document.getElementById("HomePage").style = "display: flex;";
    document.getElementById("MenuMinumanPage").style = "display: none;";
    document.getElementById("MenuMakananPage").style = "display: none;";
    document.body.style.backgroundColor = "#ffdbb5";
    window.document.title = "COFFEE JAVA - HOME"
    
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
        window.scrollBy({top: -100, behavior: "smooth"});
    }, 500);
}

function backtoHome() {
    document.getElementById("HomePage").style = "display: flex;";
    document.getElementById("MenuMinumanPage").style = "display: none;";
    document.getElementById("MenuMakananPage").style = "display: none;";
    document.body.style.backgroundColor = "#ffdbb5";
    window.document.title = "COFFEE JAVA - HOME"
}

function cekout() {

    set(ref(db, `pesanan/${sessionStorage.getItem("namaUser")}`), {
        nama: "oaiwjhdoiajwdio",
        pesanan: sessionStorage.getItem("cartliststring"),
        totalHarga: sessionStorage.getItem("totha")
    });

    sessionStorage.clear();

    window.location.href = "checkout.html"
    //masuk database
}

document.getElementById("checkoutbtn").addEventListener("click", function(){ cekout(); })
document.getElementById("backbtn").addEventListener("click", function(){ backtoHome(); })
document.getElementById("scrollbtn").addEventListener("click", function(){ scrolltoabout(); })

var cartCondition = "closed";
function interactCart() {
    if (document.getElementById("itemslist").innerHTML.trim() === "") {
        document.getElementById("infoygkmpesen").textContent = "BELUM ADA YANG KAMU PESEN NIH =(";
        document.getElementById("checkoutbtn").style = "display: none;"
        document.getElementById("tothaDisplay").style = "opacity: 0;"
    } else {
        document.getElementById("infoygkmpesen").textContent = "PESANAN KAMU :";
        document.getElementById("checkoutbtn").style = "display: flex;"
        document.getElementById("tothaDisplay").style = "opacity: 1;"
    }

    if(cartCondition == "closed") {
        document.getElementById("cartcontainer").style = "opacity: 0;"
        
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.getElementById("thePage").style = "pointer-events: none;"
        
        document.getElementById("cart").style = "animation: cartOpened 0.6s;";
        document.getElementById("cart").addEventListener("animationend", function() {
            
            document.getElementById("cartcontainer").style = "animation: pageFadingIn 0.3s"

            document.getElementById("cart").style = "display: flex";
            cartCondition = "pending"
            setTimeout(() => {
                cartCondition = "opened"
            }, 100);
        });
    }

    if(cartCondition == "opened") {
        
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.getElementById("thePage").style = "pointer-events: auto;"
        
        document.getElementById("cartcontainer").style = "animation: pageFadeOut 0.3s";
        document.getElementById("cart").style = "animation: cartClose 0.6s;";
        document.getElementById("cart").addEventListener("animationend", function(){

            document.getElementById("cart").style = "display: none";
            cartCondition = "pending"

            setTimeout(() => {
                cartCondition = "closed"
            }, 100);
        });
    }
}

document.getElementById("categoryItem-minuman").addEventListener("click", bukaHalamanMenuMinuman)
document.getElementById("categoryItem-makanan").addEventListener("click", bukaHalamanMenuMakanan)
document.getElementById("cartbtn").addEventListener("click", function(){ interactCart(); })

// INTERACT PRODUK ITEMS

var addtoCartValue;

function setelahAlert() {
    if(addtoCartValue) {
        var id = sessionStorage.getItem("id");
        var nama = sessionStorage.getItem("nama");
        var harga = sessionStorage.getItem("harga");
        var cartliststring = sessionStorage.getItem("cartliststring");
        var totalharga = 0;

        //masuk ke keranjang list
        var formated = nama + " " + harga + ", ";
        if(cartliststring != null) {
            cartliststring = cartliststring + formated;
        }else {
            cartliststring = formated;
        }

        sessionStorage.setItem("cartliststring", cartliststring);
        closeAlert();
        addtoCartValue = null;

        //convert harga
        harga = harga.substring(0, harga.length - 1);
        harga = parseInt(harga);

        //tambah total harga
        if(sessionStorage.getItem("totha") != null) {
            totalharga = parseInt(sessionStorage.getItem("totha"));
        }else {
            totalharga = 0;
        }
        totalharga = parseInt(totalharga);
        totalharga = totalharga + harga;

        sessionStorage.setItem("totha", totalharga);

        //tambah ke keranjang list
        var container = document.getElementById("itemslist");
        var itemdiv = document.createElement("div");
        itemdiv.className = "itemc"
        itemdiv.innerHTML = `
            <img width="100" src="${sessionStorage.getItem("imgsrc")}" class="itemimg">
            <h1>${nama}</h1>
            <h1>Rp${harga}k</h1>
        `
        container.appendChild(itemdiv);

        document.getElementById("tothaDisplay").innerHTML = "Rp" + sessionStorage.getItem("totha") + "k"

        //otomatis buka keranjang
        cartCondition = "closed";
        interactCart();

    }
    else {
        closeAlert();
        addtoCartValue = null;
    }
}

document.getElementById("tambahproduk").addEventListener("click", function(){ addtoCartValue=true; setelahAlert() })
document.getElementById("gajaditambahproduk").addEventListener("click", function(){ addtoCartValue=false; setelahAlert() })

function closeAlert() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.getElementById("thePage").style = "pointer-events: auto;"
    
    document.getElementById("alert").style = "animation: cartClose 0.6s;";
    document.getElementById("alert").addEventListener("animationend", function(){
        document.getElementById("alert").style = "display: none;";
    });
}

function interactProduct(namaProduk) {
    sessionStorage.setItem("id", namaProduk);
    sessionStorage.setItem("nama", document.getElementById(namaProduk).querySelector("p").textContent);
    sessionStorage.setItem("harga", document.getElementById(namaProduk).querySelector("b").textContent);
    sessionStorage.setItem("imgsrc", document.getElementById(namaProduk).querySelector("img").src)

    document.getElementById("teksAlert").textContent = "TAMBAHIN " + sessionStorage.getItem("nama") + " KE KERANJANG MU?";

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.getElementById("thePage").style = "pointer-events: none;"
    
    document.getElementById("alert").style = "animation: cartOpened 0.6s;";
    document.getElementById("alert").addEventListener("animationend", function(){
        document.getElementById("alert").style = "display: flex;";
    });
}

//#region MAKANAN
// MAKANAN - CORE MENU - BAKERY
document.getElementById("bagelbites").addEventListener("mouseup", () => { interactProduct("bagelbites") });
document.getElementById("beefsausage").addEventListener("mouseup", () => { interactProduct("beefsausage") });
document.getElementById("cheesebagels").addEventListener("mouseup", () => { interactProduct("cheesebagels") });
document.getElementById("spicytuna").addEventListener("mouseup", () => { interactProduct("spicytuna") });

// MAKANAN - CORE MENU - SANDWICHES
document.getElementById("beeffilone").addEventListener("mouseup", () => { interactProduct("beeffilone") });
document.getElementById("classictuna").addEventListener("mouseup", () => { interactProduct("classictuna") });
document.getElementById("smokedbeef").addEventListener("mouseup", () => { interactProduct("smokedbeef") });
document.getElementById("triomixed").addEventListener("mouseup", () => { interactProduct("triomixed") });

// MAKANAN - Appetizer - Bakery
document.getElementById("almondwhirl").addEventListener("mouseup", () => { interactProduct("almondwhirl") });
document.getElementById("buttercroissant").addEventListener("mouseup", () => { interactProduct("buttercroissant") });
document.getElementById("chocochips").addEventListener("mouseup", () => { interactProduct("chocochips") });
document.getElementById("cinnamonrolls").addEventListener("mouseup", () => { interactProduct("cinnamonrolls") });

// MAKANAN - Appetizer - Cakes
document.getElementById("bananamaltine").addEventListener("mouseup", () => { interactProduct("bananamaltine") });
document.getElementById("carrotwalnut").addEventListener("mouseup", () => { interactProduct("carrotwalnut") });
document.getElementById("chocolategenache").addEventListener("mouseup", () => { interactProduct("chocolategenache") });
document.getElementById("espressobrownies").addEventListener("mouseup", () => { interactProduct("espressobrownies") });
//#endregion
//#region MINUMAN
// MINUMAN - Blended Beverages - Blended Coffee
document.getElementById("carameljava").addEventListener("mouseup", () => { interactProduct("carameljava") });
document.getElementById("coffefrapuccino").addEventListener("mouseup", () => { interactProduct("coffefrapuccino") });
document.getElementById("hezelnutfrapuccino").addEventListener("mouseup", () => { interactProduct("hezelnutfrapuccino") });
document.getElementById("javachip").addEventListener("mouseup", () => { interactProduct("javachip") });

// MINUMAN - Blended Beverages - Blended Cream
document.getElementById("doublechocolate").addEventListener("mouseup", () => { interactProduct("doublechocolate") });
document.getElementById("greentea").addEventListener("mouseup", () => { interactProduct("greentea") });
document.getElementById("vannilacream").addEventListener("mouseup", () => { interactProduct("vannilacream") });

// MINUMAN - Blended Beverages - Blended Tea
document.getElementById("manggopassion").addEventListener("mouseup", () => { interactProduct("manggopassion") });
document.getElementById("ruspberry").addEventListener("mouseup", () => { interactProduct("ruspberry") });

// MINUMAN - Brewed Coffee
document.getElementById("coldbrew").addEventListener("mouseup", () => { interactProduct("coldbrew") });
document.getElementById("freshlybrwed").addEventListener("mouseup", () => { interactProduct("freshlybrwed") });
document.getElementById("misto").addEventListener("mouseup", () => { interactProduct("misto") });

// MINUMAN - Expresso Beverages
document.getElementById("caffelatte").addEventListener("mouseup", () => { interactProduct("caffelatte") });
document.getElementById("caffemocha").addEventListener("mouseup", () => { interactProduct("caffemocha") });
document.getElementById("cappucino").addEventListener("mouseup", () => { interactProduct("cappucino") });
document.getElementById("caramelmacchiato").addEventListener("mouseup", () => { interactProduct("caramelmacchiato") });
//#endregion