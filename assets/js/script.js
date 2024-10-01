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
    'technical and creative audiences'
];




function  calcExp() {
    exp = new Date().getFullYear() - 2021;
    importantWords.push(exp + " years")
    
    document.getElementById("exp").innerHTML = exp + " years";
    
    //console.log(importantWords)
}

calcExp()

highlightWords('.about-p', importantWords);


async function loadProjectsMap() {
    try {
        const response = await fetch('./data/projects.json');
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const projectsMap = new Map();

        data.forEach(project => {
            projectsMap.set(project.title, {
                image: project.image,
                description: project.description,
                link: project.link
            });
        });

        // Now, you can access the project data through the projectsMap
        console.log(projectsMap);

        // For example, iterating over the Map:
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear existing content

        for (let [title, projectDetails] of projectsMap) {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h2>${title}</h2>
                <img src="${projectDetails.image}" alt="${title}">
                <p>${projectDetails.description}</p>
                <a href="${projectDetails.link}" target="_blank">View Project</a>
            `;
            projectsContainer.appendChild(projectCard);
        }

    } catch (error) {
        console.error('Error loading projects:', error.message);
    }
}

//loadProjectsMap();


// Call the function when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', loadProjects);


const tl = gsap.timeline();

tl.from([".intro-heading", ".intro-p"], { 
    y: 15,   
    opacity: 0, 
    duration: 0.5, 
    stagger: 0.5 
});



tl.from(".picture", { 
   // y: 15,   
    opacity:0,
    duration: .5,

}); 

gsap.from(" .about-p", {    
    y: 10,
    opacity: 0,
    stagger:.5,
    duration: .5,
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",                 
    }
}); 




gsap.fromTo("#about h3 ", 
    {
        clipPath: "inset(100% 0% 0% 0%)" // Starts with the element fully hidden from the bottom
    }, 
    {
        clipPath: "inset(0% 0% 0% 0%)", // Ends with the element fully visible
        opacity: 1, 
        duration: .5,
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%", 
            toggleActions: "play none none none"
        }
    }
);

gsap.fromTo("#portfolio h3 ", 
    {
        clipPath: "inset(100% 0% 0% 0%)" // Starts with the element fully hidden from the bottom
    }, 
    {
        clipPath: "inset(0% 0% 0% 0%)", // Ends with the element fully visible
        opacity: 1, 
        duration: .5,
        scrollTrigger: {
            trigger: "#portfolio",
            start: "top 80%", 
            toggleActions: "play none none none"
        }
    }
);




gsap.from(" #portfolio h3", {    
    y: 10,
    opacity: 0,
    stagger:.5,
    duration: .5,
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top 80%",                 
    }
}); 


