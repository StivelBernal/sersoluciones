export default {
  inserted: (el, config) => {
    function loadElement() {
      // console.log(el.nodeName, el.dataset)
      if(config.modifiers.src) {
        el.addEventListener("load", () => {
          setTimeout(() => el.classList.add("loaded"), 100);
        });
        el.addEventListener("error", () => console.log("error"));
        el.src = config.value;
      } else if(config.modifiers.bg) {
        el.classList.remove('dontloadImage')
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          // console.log(1111)
          loadElement();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null, 
        threshold: "0"
      };

      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el); 
    }

    if (!window["IntersectionObserver"]) {
      loadImage();
    } else {
      createObserver();
    }
  }
};
