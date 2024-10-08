const tl = gsap.timeline(); 



const selector = {
  paragraph: Splitting({
    target: '.hero-paragraph-text',
    by: 'words',
  }),
  image: document.querySelector('.hero-bg'),
  
};

const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.05,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  
  initScroll();
}

const initScroll = () => {
  gsap.set(selector.image, { autoAlpha: 1, scale: 1, yPercent: 0 });
  gsap.set('.word', { autoAlpha: 0.4 });


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  });

  // Animate the words' opacity
  tl.to('.word', {
    duration: 2,
    autoAlpha: 1,
    stagger: 1,
  })
  // Animate the hero background image
  .to(
    selector.image,
    {
      duration: 20,
      scale: 0.95,
      autoAlpha: 0,
      yPercent: -5,
    },
    0 // This makes the image animation run in parallel with the words
  )

};



window.addEventListener('DOMContentLoaded', initLenis);



 
function animateHeading() {
    document.querySelectorAll(".heading").forEach(heading => {
        Splitting({ target: heading, by: 'chars' });

        let sectionId = heading.closest('section').id;
        let chars = heading.querySelectorAll('.char');

        gsap.fromTo(chars, 
            {
                opacity: 0,
                scaleY: 50, 
            },
            {
                opacity: 1,
                scaleY: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: `#${sectionId}`,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none none",
                    scrub: 1 
                }
            }
        );
    });
}

animateHeading();


function animateListItems() {
  
    
  // Animating offcanvas title
  gsap.timeline()
    .from(".offcanvas-title", {
      opacity: 0,   
      x: 50,             
      duration: 0.8,      
      ease: "power2.out", 
      stagger: 0.2      
    });
    
  // Animating close button
  gsap.timeline()
    .from(".close-btn", {  
      scale: 1,            
      duration: 0.8,      
      ease: "power2.out", 
      stagger: 0.2      
    });

 
  
}


document.querySelector('.offcanvas').addEventListener('show.bs.offcanvas', function () {
  animateListItems(); 
});




function portfolioAnimation() {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Cards animation
  const cardsWrapper = gsap.utils.toArray(".cards_item");
  const cardsEl = gsap.utils.toArray(".cards_el");
  
 // const cards = gsap.utils.toArray(".cards");

  cardsWrapper.forEach((e, i) => {
    const card = cardsEl[i];
    let scale = 1,
        rotate = 0;

    if (i !== cardsEl.length - 1) {
      scale = 0.9 + (0.025 * i);
      rotate = -5;
    }

    gsap.to(card, {
      scale: scale,
      rotationX: rotate,
      transformOrigin: "top center",
      ease: 'none',
      scrollTrigger: {
        trigger: e,
        start: "top " + (70 + 40 * i) + "px", 
        end: "bottom " + 650 + "px", 
        pin: e, 
        pinSpacing: false, 
        scrub: true,
        endTrigger: ".end-anime", 
      }
    });
  });
}

portfolioAnimation();

function animateForm() {
    // Animate form element
    gsap.from("#form", {
        opacity: 0,
        transformOrigin: "bottom",
        duration: 1,
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            end: "top 70%",
            scrub: 1
        }
    });

    // Animate border-bottom for input and textarea elements
    gsap.fromTo(
        'input[type="text"], input[type="email"], textarea', 
        { // Initial State
            opacity: 0,
            borderBottomWidth: "0px", // Start with no border-bottom
        }, 
        { // Final State
            opacity: 1,
            borderBottomWidth: "1px",  
            width: "100%",
            duration: 1,
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                end: "top 50%",
                scrub: 1
            }
        }
    );

    // Animate submit button
    gsap.from('input[type="submit"]', {
        scale: 0,
        opacity: 0,
        transformOrigin: "bottom",
        duration: 1,
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            end: "top 70%",
            scrub: 1
        }
    });
}

animateForm();



function animateFooterUl() {
  gsap.from(".footer-ul li a", {
    scaleY: 1,
    transformOrigin :"bottom",
 //   opacity: 0,
    duration: 1, // Set a duration for the animation
    stagger: 0.5,
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
     // scrub: 1,
    }
  });
}

animateFooterUl();


// Function to animate the counter

function animateFooter() {
  // Get the footer element with the class '.footer-name'
  const footerName = document.querySelector('.footer-name');

  // Use Splitting to split the text into individual characters
 Splitting({ target: footerName, by: 'chars' });

  // Animate each character using GSAP with ScrollTrigger
  gsap.from(".char", {
    scaleY: 0,
    opacity: 0,
    y:100,
    transformOrigin: 'top',
    stagger: 0.05, // Delay between each character's animation
    duration: 0.8, // Animation duration
    scrollTrigger: {
      trigger: ".footer-brand",   // Trigger animation when the footer is in view
      start: 'top 90%',   // Animation starts when the top of the footer reaches the bottom of the viewport
      //end: 'bottom bottom',  // Animation ends when the bottom of the footer reaches the bottom of the viewport
      //toggleActions: 'play none none none',  // Play animation once
      //scrub: true
    }
  });
}
// animateFooter()
