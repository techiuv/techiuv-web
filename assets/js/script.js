document.onreadystatechange = function () {
    let progressBar = document.getElementById('progressBar');
    
    if (document.readyState === 'loading') {
        // Simulate the progress bar animation
        progressBar.style.width = '50%';
    }
    
    if (document.readyState === 'interactive') {
        progressBar.style.width = '75%';
    }
    
    if (document.readyState === 'complete') {
        progressBar.style.width = '100%';
        setTimeout(function () {
            progressBar.style.display = 'none';
        }, 500); // delay before hiding
    }
};

function highlightWords(paragraphClass, wordsToHighlight) {
    let paragraphs = document.querySelectorAll(paragraphClass);

    paragraphs.forEach(function (paragraph) {
        let paragraphText = paragraph.innerHTML;

        wordsToHighlight.forEach(function (word) {
            let regex = new RegExp(`\\b${word}\\b`, 'gi'); 
            paragraphText = paragraphText.replace(regex, `<span style="color: #d63547;">${word}</span>`);
        });

        paragraph.innerHTML = paragraphText;
    });
}


let importantWords = [
    'master artist',
    'web developer',  
    'art education',
    'artistic expression',
    'technical',
    'creative audiences',
];


function  calcExp() {
    exp = new Date().getFullYear() - 2021;
    importantWords.push(exp + " years")
    
    document.getElementById("exp").innerHTML = exp + " years";
    
    //console.log(importantWords)
}

calcExp()

highlightWords('.about-p', importantWords);

document.addEventListener("DOMContentLoaded", function() {
    const counter3 = document.querySelector(".counter-3");

    // Function to create the counter divs
    function createCounterDivs() {
        for (let i = 10; i <= 12; i++) {
            for (let j = 1; j >= 0; j--) {
                const div = document.createElement("div");

                div.className = "num";
                div.textContent = j;
                counter3.appendChild(div);
            }
        }

        // Add the final div '0'
        const finalDiv = document.createElement("div");
        finalDiv.className = "num";
        finalDiv.textContent = "0";
        counter3.appendChild(finalDiv);
    }

    // Call the function to create the divs
    createCounterDivs();
});


const projects = [
    {
        id: 1,
        title: "Artist Yuvraj",
        description: "A portfolio website showcasing the artworks of artist Yuvraj.",
        image: "assets/img/artist-yuvraj.png",
        link: "https://artistyuvraj.netlify.app"
    },
    {
        id: 2,
        title: "Portfolio Yuvraj",
        description: "A comprehensive online portfolio.",
        image: "assets/img/Portfolio_Yuvraj.jpg",
        link: "https:///portfolioyuv.netlify.app"
    },
    {
        id: 3,
        title: "Weather App",
        description: "A web application providing real-time weather updates and forecasts.",
        image: "assets/img/Weather_App.png",
        link: "https://techiuv.github.io/Whether-app/"
    },
    {
        id: 4,
        title: "Jarvis",
        description: "An AI assistant built using Python for various task automation.",
        image: "assets/img/jarvis.png",
        link: "https://github.com/techiuv/JARVIS"
    },
    {
        id: 5,
        title: "Music Player App",
        description: "A web based music streaming platform with personal playlist.",
        image: "assets/img/music_player.png",
        link: "https://techiuv.github.io/Music-App/"
    },
    {
        id: 6,
        title: "Dino Python Game",
        description: "A browser-based Dino game developed in Python.",
        image: "assets/img/dino-game.png",
        link: "https://github.com/techiuv/dino-python-game"
    }
];

// Function to create project cards
function createProjectCards() {
    const portfolio = document.querySelector('#portfolio');

    // Ensure the portfolio section exists
    if (!portfolio) {
        console.error("Portfolio section not found");
        return;
    }

    // Parent div for all cards
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cards');

    projects.forEach(project => {
        // Card structure
        const cardItem = document.createElement('div');
        cardItem.classList.add('cards_item');

        cardItem.innerHTML = `
            <div class="cards_el">
                <div class="cards_el-wrapp">
                    <div class="cards_img">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="cards_txt position-relative">                       
                        <h3 class="cards_el-title">${project.title}</h3>
                        <p class="cards_el-p">${project.description}</p>
                        <a class="cards_el-a" href="${project.link}" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right"></i> View Project</a>                       
                    </div>
                    <div class="cards_txt_md position-absolute w-100 h-100 ">
                        <h3 class="cards_el-title">${project.title}</h3>
                        <p class="cards_el-p">${project.description}</p>
                        <a class="cards_el-a" href="${project.link}" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right"></i> View Project</a>           
                    </div>
                </div>
            </div>
        `;

        // Append cardItem to the cardContainer
        cardContainer.appendChild(cardItem);
    });

    // Append the cardContainer to the portfolio section
    portfolio.appendChild(cardContainer);
}


createProjectCards();

