const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function circleFollow(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    console.log(dets);

    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale( ${xscale} ,${yscale})`;
  });
}
//----------------  OR ------------------->>>>>>>   //
// function circleFollow() {
//     window.addEventListener("mousemove", function(event) {
//         const { clientX, clientY } = event; // Destructure clientX and clientY from the event object

//         // Log the coordinates to the console
//         console.log(`Mouse Position: X=${clientX}, Y=${clientY}`);
//     });
// }

function FirstPageAnimation() {
  var t1 = gsap.timeline();

  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".bonding-elem", {
      y: "-10",
      duration: 2,
      stagger: 0.2,
      delay: -1,
      ease: Expo.easeInOut,
    })
    .from("#home-footer", {
      y: "-10",
      opacity: 0,
      duration: 1.2,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

var timeout;

function CircleSkew() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    this.clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.7, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.7, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleFollow(xscale, yscale);

    timeout = setTimeout(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});

document.querySelectorAll(".elem").forEach(function (elem) {
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
});

window.onload = function () {
  circleFollow();
  FirstPageAnimation();
  CircleSkew();
};
