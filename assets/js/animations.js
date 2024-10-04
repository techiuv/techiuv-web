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


document.addEventListener("DOMContentLoaded", function() {
    const counter3 = document.querySelectorAll(".num");

    function animateCounterDivs() {
        gsap.from(counter3, {
            opacity: 0,
            y: -50,
            stagger: 0.5,  
            duration: 1,  
            ease: "power2.out" 
        });
    }

    
    animateCounterDivs();
});


 
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
