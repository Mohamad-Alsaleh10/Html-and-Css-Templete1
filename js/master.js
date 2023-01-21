let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {

document.documentElement.style.setProperty('--main-color',mainColor);

document.querySelectorAll(".color-list li").forEach(element => {

    element.classList.remove("active");
    if(element.dataset.color === mainColor){
            element.classList.add("active");
    }
    
});

}

// Toggle spin class on Icon 
document.querySelector(".toggle-setting .fa-gear").onclick = function() {
this.classList.toggle("fa-spin");
document.querySelector(".setting-box").classList.toggle("open");
};

// Switch color 
const colorsLi = document.querySelectorAll(".color-list li");
colorsLi.forEach(li => {
li.addEventListener("click", (e) => {


// Set main color in Root
document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

// Set  color in Local Storage
localStorage.setItem("color_option" , e.target.dataset.color);
handleActive(e);

});
}) ;

// Random Background Option 
let backgroundOption = true;

// variable to control Interval 
let backgroundInerval;


// Check if there is local storage background item 
let backgroundLocalItem = localStorage.getItem("background_option");
 
// check if random background local storage is not empty 
if(backgroundLocalItem !== null){


    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    } else{
        backgroundOption = false;

    }

// remove all active classes 
document.querySelectorAll(".random-bakgrounds span").forEach( element => {

    element.classList.remove("active");
});
if(backgroundLocalItem === 'true'){
    document.querySelector(".random-bakgrounds .yes").classList.add("active");
} else{
    document.querySelector(".random-bakgrounds .no").classList.add("active");

}
}

// Switch backgroundEl 
const RandomBackEl = document.querySelectorAll(".random-bakgrounds span");
RandomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
    
    
        handleActive(e);
    
    if(e.target.dataset.background === 'yes'){
        backgroundOption =true;
        randomizeImgs();
        localStorage.setItem("background_option" , true);
    }
    else{
        backgroundOption =false;
        clearInterval(backgroundInerval);
        localStorage.setItem("background_option" , false);
              
        
    }

    });
    }) ;
// Select Landing Page Elements 
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images 
let imagesArray = ["back1.jpg","back2.jpg","back3.jpg","back4.jpg","back5.jpg"];





// Function to Randomize Imgs
function randomizeImgs(){
   
    if(backgroundOption === true){
        backgroundInerval = setInterval( () => {
            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * imagesArray.length);
        
            // Change backgroundImage 
            landingPage.style.backgroundImage = 'url("images/' + imagesArray[randomNumber] + '")';
        
        },1000);
    }


}

randomizeImgs();


// Select Skills Selectop 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills offset top 
    let SkillsOffsetTop = ourSkills.offsetTop;
    

    // outer height 
    let SkillsOuterHeight = ourSkills.offsetHeight;

// window height 
let windowHeight = this.innerHeight;

// window ScrollTop 
let WindowScrollTop = this.pageYOffset;

if ( WindowScrollTop >= ( SkillsOffsetTop + SkillsOuterHeight - windowHeight ) ) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
        skill.style.width = skill.dataset.progress;
    });
};


};

// create Popup with the image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {
    
        // create overlay element 
        let overlay = document.createElement("div");

        // Add class to overlay 
        overlay.className = "popup-overlay";

        // Appent overlay to body 
        document.body.appendChild(overlay);

        // create popup box 
        let popupBox = document.createElement("div");

        // Add class to popupBox 
        popupBox.className = "popup-box";

        if(img.alt !== null) {
 
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        // Create Image 
        let popupImage = document.createElement("img");
        popupImage.src = img.src ;

        // Append image to popupBox 
        popupBox.appendChild(popupImage);
        
        // Append popupBox to body
        document.body.appendChild(popupBox);
       
        // create close span 
        let closeButton = document.createElement("span");

        // create close button text 
        let closeButtonText = document.createTextNode("X");

        // Add text to closeButton 
        closeButton.appendChild(closeButtonText);

        // Add class to the close button 
        closeButton.className = 'close-button';
        
        // Add button to the popup box 
        popupBox.appendChild(closeButton);





    });

});

// close popup 
document.addEventListener("click" , (e) => {

if(e.target.className == 'close-button'){
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
}

});


// Select All Bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links 
const allLinks = document.querySelectorAll(".links a");



function ScroolTo(elements){
    elements.forEach(ele => {
        ele.addEventListener("click" , (e) =>{
            e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior:"smooth"
        });
        });
        });
}

ScroolTo(allBullets);
ScroolTo(allLinks);

// Handle Active State 
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");
if(bulletLocalItem !== null){
    bulletsSpan.forEach( span => {
      
        span.classList.remove("active");
     
    });
    if(bulletLocalItem === "block"){
        bulletsContainer.style.display='block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {
        bulletsContainer.style.display='none';
        document.querySelector(".bullets-option .no").classList.add("active");
         
    }


}

bulletsSpan.forEach( span => {

    span.addEventListener("click" , (e) => {
       
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display='block';
            localStorage.setItem("bullets_option",'block');
        } else{
            bulletsContainer.style.display='none';
            localStorage.setItem("bullets_option",'none');

        }
        handleActive(e);

    });


});

document.querySelector(".reset-options").onclick = function(){

// localStorage.clear();

localStorage.removeItem("color_option");
localStorage.removeItem("background_option");
localStorage.removeItem("bullets_option");

window.location.reload();


};

// Toogle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){  
    e.stopPropagation();
this.classList.toggle("menu-active");
tLinks.classList.toggle("open");

};

document.addEventListener("click" , (e) => {

    if(e.target !== toggleBtn && e.target !== tLinks){
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});

tLinks.onclick = function(e){
    e.stopPropagation();

}