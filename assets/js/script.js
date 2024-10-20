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

// Select all links inside nav ul li
document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll(".offcanvas div ul li a");
    let offcanvas = document.getElementById("offcanvasRight");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            // Prevent the default action of the anchor tags
            // event.preventDefault();

            let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
            offcanvasInstance.hide();

            // Manually navigate to the target section
            let target = link.getAttribute("href");
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});



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

// highlightWords('.about-p', importantWords);


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
    }
    /* {
        id: 6,
        title: "Dino Python Game",
        description: "A browser-based Dino game developed in Python.",
        image: "assets/img/dino-game.png",
        link: "https://github.com/techiuv/dino-python-game"
    }
 */];

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

// Call the function to create cards
createProjectCards();



function validateForm(event) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const textarea = document.getElementById('message').value.trim();
  
  const toastLive = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
  const toastBody = document.querySelector('.toast-body');

  // Regular expressions for validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /^[a-zA-Z\s]+$/; 
  
  if (name === '') {
    toastBody.innerHTML = "Name cannot be empty!";
    toastBootstrap.show();
    event.preventDefault();  // Prevent submission if validation fails
    return false;
  } else if (!namePattern.test(name)) {
    toastBody.innerHTML = "Name can only contain letters and spaces!";
    toastBootstrap.show();
    event.preventDefault();
    return false;
  }

  if (email === '') {
    toastBody.innerHTML = "Email cannot be empty!";
    toastBootstrap.show();
    event.preventDefault();
    return false;
  } else if (!emailPattern.test(email)) {
    toastBody.innerHTML = "Please enter a valid email address!";
    toastBootstrap.show();
    event.preventDefault();
    return false;
  }
  
  if (textarea === '') {
    toastBody.innerHTML = "Message cannot be empty!";
    toastBootstrap.show();
    event.preventDefault();
    return false;
  }

  // Clear any previous error messages if all validations pass
  toastBody.innerHTML = ""; 
  return true;  // Allow the form to be submitted to Netlify
}

document.getElementById("form").addEventListener("submit", validateForm);
