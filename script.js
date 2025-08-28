document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")
  const hamburger = document.querySelector(".hamburger")

  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block"

    // Animate hamburger icon
    if (mobileNav.style.display === "block") {
      hamburger.classList.add("active")
      hamburger.querySelector("span:nth-child(1)").style.transform = "rotate(45deg)"
      hamburger.querySelector("span:nth-child(1)").style.top = "9px"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "0"
      hamburger.querySelector("span:nth-child(3)").style.transform = "rotate(-45deg)"
      hamburger.querySelector("span:nth-child(3)").style.top = "9px"
    } else {
      hamburger.classList.remove("active")
      hamburger.querySelector("span:nth-child(1)").style.transform = "rotate(0)"
      hamburger.querySelector("span:nth-child(1)").style.top = "0"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
      hamburger.querySelector("span:nth-child(3)").style.transform = "rotate(0)"
      hamburger.querySelector("span:nth-child(3)").style.top = "18px"
    }
  })

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.style.display = "none"
      hamburger.classList.remove("active")
      hamburger.querySelector("span:nth-child(1)").style.transform = "rotate(0)"
      hamburger.querySelector("span:nth-child(1)").style.top = "0"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
      hamburger.querySelector("span:nth-child(3)").style.transform = "rotate(0)"
      hamburger.querySelector("span:nth-child(3)").style.top = "18px"
    })
  })

  // Scroll Indicator
  const sections = document.querySelectorAll("section")
  const scrollIndicators = document.querySelectorAll(".scroll-indicator span")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    scrollIndicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    if (current) {
      const activeIndicator = document.querySelector(
        `.scroll-indicator span:nth-child(${Array.from(sections).findIndex((section) => section.getAttribute("id") === current) + 1})`,
      )
      if (activeIndicator) {
        activeIndicator.classList.add("active")
      }
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".service-card, .info-card, .client-logo, .pricing-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animated elements
  document.querySelectorAll(".service-card, .info-card, .client-logo, .pricing-card").forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Form submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const inputs = contactForm.querySelectorAll("input, textarea")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.style.borderColor = "red"
        } else {
          input.style.borderColor = "#ddd"
        }
      })

      if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector(".submit-btn")
        const originalText = submitBtn.textContent

        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true

        setTimeout(() => {
          alert("Thank you for your message! We will get back to you soon.")
          contactForm.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 1500)
      }
    })
  }
})


const messages = [
  "Hello",        // English
  "வணக்கம்",     // Tamil
  "നമസ്കാരം",     // Malayalam
  "नमस्ते",       // Hindi
  "こんにちは"     // Japanese
];
let index = 0;
const screen = document.getElementById('helloScreen');

const interval = setInterval(() => {
  if (index < messages.length) {
    screen.textContent = messages[index];
    index++;
  } else {
    clearInterval(interval);
    screen.classList.add('hidden');
  }
}, 500);