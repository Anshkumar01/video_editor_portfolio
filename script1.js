// Sticky Navbar
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// Scroll Reveal Animations
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100; // Trigger animation when 100px visible

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Counter Animation
function animateCounters() {
  const editsCounter = document.getElementById("edits-count");
  const yearsCounter = document.getElementById("years-count");
  if (editsCounter && yearsCounter) {
    let editsCount = 0;
    let yearsCount = 0;
    const editsTarget = 1000;
    const yearsTarget = 2;
    const editsIncrement = editsTarget / 100; // adjust for speed
    const yearsIncrement = yearsTarget / 20;
    const timer = setInterval(() => {
      editsCount += editsIncrement;
      yearsCount += yearsIncrement;
      if (editsCount >= editsTarget) {
        editsCount = editsTarget;
        clearInterval(timer);
      }
      if (yearsCount >= yearsTarget) {
        yearsCount = yearsTarget;
      }
      editsCounter.textContent = Math.floor(editsCount);
      yearsCounter.textContent = Math.floor(yearsCount);
    }, 50);
  }
}

function setupExperienceCounter() {
  const skillsSection = document.getElementById("skills");
  const editsCounter = document.getElementById("edits-count");
  const yearsCounter = document.getElementById("years-count");
  if (!skillsSection || !editsCounter || !yearsCounter) return;

  let counterStarted = false;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          animateCounters();
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  observer.observe(skillsSection);
}

window.addEventListener("load", setupExperienceCounter);

// Contact form mailto submission
function setupContactMailto() {
  const contactForm = document.getElementById("contact-form");
  const contactName = document.getElementById("contact-name");
  const contactEmail = document.getElementById("contact-email");
  const contactMessage = document.getElementById("contact-message");

  if (!contactForm || !contactName || !contactEmail || !contactMessage) {
    return;
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const message = contactMessage.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending your message.");
      return;
    }

    const subject = encodeURIComponent(`New message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    const mailtoLink = `mailto:vashuxeditzz@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  });
}

window.addEventListener("load", setupContactMailto);
