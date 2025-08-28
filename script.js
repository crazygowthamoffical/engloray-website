document.addEventListener("DOMContentLoaded", () => {
  // WebP support detection
  function checkWebpSupport() {
    const webpImage = new Image()
    webpImage.onload = () => {
      const result = webpImage.width > 0 && webpImage.height > 0
      if (result) {
        document.documentElement.classList.add("webp")
      } else {
        document.documentElement.classList.add("no-webp")
      }
    }
    webpImage.onerror = () => {
      document.documentElement.classList.add("no-webp")
    }
    webpImage.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="
  }

  checkWebpSupport()

  // Mobile Menu Toggle with performance optimizations
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")
  const hamburger = document.querySelector(".hamburger")

  if (mobileMenuBtn && mobileNav && hamburger) {
    mobileMenuBtn.addEventListener("click", () => {
      const isVisible = mobileNav.style.display === "block"
      mobileNav.style.display = isVisible ? "none" : "block"

      // Animate hamburger icon
      if (!isVisible) {
        hamburger.classList.add("active")
        requestAnimationFrame(() => {
          const span1 = hamburger.querySelector("span:nth-child(1)")
          const span2 = hamburger.querySelector("span:nth-child(2)")
          const span3 = hamburger.querySelector("span:nth-child(3)")

          if (span1 && span2 && span3) {
            span1.style.transform = "rotate(45deg)"
            span1.style.top = "9px"
            span2.style.opacity = "0"
            span3.style.transform = "rotate(-45deg)"
            span3.style.top = "9px"
          }
        })
      } else {
        hamburger.classList.remove("active")
        requestAnimationFrame(() => {
          const span1 = hamburger.querySelector("span:nth-child(1)")
          const span2 = hamburger.querySelector("span:nth-child(2)")
          const span3 = hamburger.querySelector("span:nth-child(3)")

          if (span1 && span2 && span3) {
            span1.style.transform = "rotate(0)"
            span1.style.top = "0"
            span2.style.opacity = "1"
            span3.style.transform = "rotate(0)"
            span3.style.top = "18px"
          }
        })
      }
    })

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.style.display = "none"
        hamburger.classList.remove("active")

        requestAnimationFrame(() => {
          const span1 = hamburger.querySelector("span:nth-child(1)")
          const span2 = hamburger.querySelector("span:nth-child(2)")
          const span3 = hamburger.querySelector("span:nth-child(3)")

          if (span1 && span2 && span3) {
            span1.style.transform = "rotate(0)"
            span1.style.top = "0"
            span2.style.opacity = "1"
            span3.style.transform = "rotate(0)"
            span3.style.top = "18px"
          }
        })
      })
    })
  }

  // Scroll Indicator with Intersection Observer
  const sections = document.querySelectorAll("section")
  const scrollIndicators = document.querySelectorAll(".scroll-indicator span")

  if (sections.length > 0 && scrollIndicators.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const current = entry.target.getAttribute("id")
          scrollIndicators.forEach((indicator) => {
            indicator.classList.remove("active")
          })

          const activeIndex = Array.from(sections).findIndex((section) => section.getAttribute("id") === current)

          if (activeIndex >= 0) {
            const activeIndicator = document.querySelector(`.scroll-indicator span:nth-child(${activeIndex + 1})`)
            if (activeIndicator) {
              activeIndicator.classList.add("active")
            }
          }
        }
      })
    }, observerOptions)

    sections.forEach((section) => {
      sectionObserver.observe(section)
    })
  }

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

  // Animate elements on scroll with Intersection Observer
  const animateElements = document.querySelectorAll(".service-card, .info-card, .client-logo, .pricing-card")

  if (animateElements.length > 0) {
    // Set initial state for animated elements
    animateElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })

    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            // Unobserve after animation to improve performance
            animationObserver.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    animateElements.forEach((element) => {
      animationObserver.observe(element)
    })
  }

  // Form submission with validation
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

        // Use fetch API for form submission
        fetch("https://admin.engloray.com/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
          },
          body: new URLSearchParams(new FormData(contactForm)),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
          .then(() => {
            alert("Thank you for your message! We will get back to you soon.")
            contactForm.reset()
          })
          .catch((error) => {
            console.error("Error:", error)
            alert("There was an error sending your message. Please try again later.")
          })
          .finally(() => {
            submitBtn.textContent = originalText
            submitBtn.disabled = false
          })
      }
    })
  }

  // Hello screen animation
  const messages = [
    "Hello", // English
    "வணக்கம்", // Tamil
    "നമസ്കാരം", // Malayalam
    "नमस्ते", // Hindi
    "こんにちは", // Japanese
  ]

  let index = 0
  const screen = document.getElementById("helloScreen")

  if (screen) {
    const interval = setInterval(() => {
      if (index < messages.length) {
        screen.textContent = messages[index]
        index++
      } else {
        clearInterval(interval)
        screen.classList.add("hidden")
        setTimeout(() => {
          screen.style.display = "none"
        }, 1000)
      }
    }, 500)
  }
})
