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
  // Set initial properties for the image and words
  gsap.set(selector.image, { autoAlpha: 1, scale: 1, yPercent: 0 });
  gsap.set('.word', { autoAlpha: 0.4 });

  // Create the timeline with ScrollTrigger
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
