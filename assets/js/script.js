document.getElementById("copyright").innerHTML = "&copy;" + new Date().getFullYear() + ". All rights reserved.";


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

function loadProjects() {
    fetch('data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = ''; // Clear existing content

            data.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h2>${project.title}</h2>
                    <img src="${project.image}" alt="${project.title}">
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
}

// Call the function to load projects when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', loadProjects);
