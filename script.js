// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  // Konfeti oluştur
  createConfetti()
  
  // Müzik kontrollerini ayarla
  setupMusicControls()
  
  // Fotoğraf etkileşimi
  setupPhotoInteraction()
  
  // Sayfa yüklendiğinde hoş geldin animasyonu
  welcomeAnimation()
  
  // Ekstra efektler
  setupExtraEffects()
  
  // Müzik görselleştirici
  setupMusicVisualizer()
})

// Konfeti oluşturma fonksiyonu
function createConfetti() {
  const confettiContainer = document.getElementById('confetti-container')
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
  const shapes = ['circle', 'square', 'triangle']
  
  // 150 adet konfeti oluştur
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      
      // Rastgele şekil
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      if (shape === 'square') {
        confetti.style.borderRadius = '0'
      } else if (shape === 'triangle') {
        confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'
      }
      
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDelay = Math.random() * 3 + 's'
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'
      confetti.style.width = (Math.random() * 8 + 6) + 'px'
      confetti.style.height = (Math.random() * 8 + 6) + 'px'
      
      confettiContainer.appendChild(confetti)
      
      // Konfeti animasyonu bittikten sonra elementi kaldır
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti)
        }
      }, 5000)
    }, i * 30)
  }
}

// Müzik kontrollerini ayarlama - Spotify Benzeri
function setupMusicControls() {
  const audio = document.getElementById('silaKafa')
  const playPauseBtn = document.getElementById('playPauseBtn')
  const prevBtn = document.getElementById('prevBtn')
  const nextBtn = document.getElementById('nextBtn')
  const volumeSlider = document.getElementById('volumeSlider')
  const progressFill = document.getElementById('progressFill')
  const currentTimeSpan = document.getElementById('currentTime')
  const totalTimeSpan = document.getElementById('totalTime')
  
  let isPlaying = false
  
  // Play/Pause butonu
  playPauseBtn.addEventListener('click', function() {
    if (isPlaying) {
      audio.pause()
      isPlaying = false
      this.innerHTML = '<i class="fas fa-play"></i>'
      deactivateMusicVisualizer()
    } else {
      audio.play()
      isPlaying = true
      this.innerHTML = '<i class="fas fa-pause"></i>'
      activateMusicVisualizer()
      triggerConfettiBurst()
    }
  })
  
  // Ses kontrolü
  volumeSlider.addEventListener('input', function() {
    audio.volume = this.value / 100
    const volumeIcon = this.previousElementSibling
    if (this.value == 0) {
      volumeIcon.className = 'fas fa-volume-mute'
    } else if (this.value < 50) {
      volumeIcon.className = 'fas fa-volume-down'
    } else {
      volumeIcon.className = 'fas fa-volume-up'
    }
  })
  
  // Progress bar güncelleme
  audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100
    progressFill.style.width = progress + '%'
    
    // Zaman göstergesi
    currentTimeSpan.textContent = formatTime(audio.currentTime)
  })
  
  // Metadata yüklendiğinde toplam süreyi göster
  audio.addEventListener('loadedmetadata', function() {
    totalTimeSpan.textContent = formatTime(audio.duration)
  })
  
  // Progress bar'a tıklama
  const progressBar = document.querySelector('.progress-bar')
  progressBar.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickTime = (clickX / width) * audio.duration
    audio.currentTime = clickTime
  })
  
  // Müzik bittiğinde
  audio.addEventListener('ended', function() {
    isPlaying = false
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
    deactivateMusicVisualizer()
    // Otomatik tekrar
    setTimeout(() => {
      audio.currentTime = 0
      audio.play()
      isPlaying = true
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
      activateMusicVisualizer()
    }, 2000)
  })
  
  // Hata durumunda
  audio.addEventListener('error', function() {
    showNotification('❌ Müzik dosyası yüklenemedi!')
  })
  
  // Müzik yüklenirken
  audio.addEventListener('loadstart', function() {
    showNotification('🔄 Müzik yükleniyor...')
  })
}

// Zaman formatı
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00'
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Müzik görselleştirici
function setupMusicVisualizer() {
  const bars = document.querySelectorAll('.music-visualizer .bar')
  
  bars.forEach((bar, index) => {
    bar.style.animationDelay = `${index * 0.1}s`
  })
}

function activateMusicVisualizer() {
  const bars = document.querySelectorAll('.music-visualizer .bar')
  bars.forEach(bar => {
    bar.style.animationPlayState = 'running'
  })
}

function deactivateMusicVisualizer() {
  const bars = document.querySelectorAll('.music-visualizer .bar')
  bars.forEach(bar => {
    bar.style.animationPlayState = 'paused'
  })
}

// Fotoğraf etkileşimi
function setupPhotoInteraction() {
  const photoPlaceholder = document.querySelector('.photo-placeholder')
  
  photoPlaceholder.addEventListener('click', function() {
    // Fotoğrafa tıklandığında konfeti patlaması
    triggerConfettiBurst()
    showNotification('🎉 Esra çok güzel görünüyor! 💖')
  })
}

// Konfeti patlaması
function triggerConfettiBurst() {
  const confettiContainer = document.getElementById('confetti-container')
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
  
  // 80 adet hızlı konfeti
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDuration = '1.5s'
      confetti.style.animationDelay = '0s'
      confetti.style.width = (Math.random() * 10 + 5) + 'px'
      confetti.style.height = (Math.random() * 10 + 5) + 'px'
      
      confettiContainer.appendChild(confetti)
      
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti)
        }
      }, 2500)
    }, i * 15)
  }
}

// Hoş geldin animasyonu
function welcomeAnimation() {
  const title = document.querySelector('.main-title')
  const subtitle = document.querySelector('.subtitle')
  const celebrationIcons = document.querySelector('.celebration-icons')
  
  // Başlık animasyonu
  title.style.opacity = '0'
  title.style.transform = 'translateY(-50px)'
  
  setTimeout(() => {
    title.style.transition = 'all 1s ease'
    title.style.opacity = '1'
    title.style.transform = 'translateY(0)'
  }, 500)
  
  // Alt başlık animasyonu
  subtitle.style.opacity = '0'
  subtitle.style.transform = 'translateY(30px)'
  
  setTimeout(() => {
    subtitle.style.transition = 'all 1s ease'
    subtitle.style.opacity = '1'
    subtitle.style.transform = 'translateY(0)'
  }, 1000)
  
  // Kutlama ikonları animasyonu
  celebrationIcons.style.opacity = '0'
  celebrationIcons.style.transform = 'scale(0.5)'
  
  setTimeout(() => {
    celebrationIcons.style.transition = 'all 0.8s ease'
    celebrationIcons.style.opacity = '1'
    celebrationIcons.style.transform = 'scale(1)'
  }, 1500)
  
  // Hoş geldin mesajı
  setTimeout(() => {
    showNotification('🎊 Esra için özel doğum günü sayfasına hoş geldin!')
  }, 2500)
}

// Ekstra efektler
function setupExtraEffects() {
  // Mouse hareket efektleri
  setupMouseEffects()
  
  // Scroll efektleri
  setupScrollEffects()
  
  // Klavye kısayolları
  setupKeyboardShortcuts()
  
  // Periyodik efektler
  setupPeriodicEffects()
}

// Mouse efektleri
function setupMouseEffects() {
  const cards = document.querySelectorAll('.feature-card, .message-card, .showcase-item')
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    })
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    })
  })
}

// Scroll efektleri
function setupScrollEffects() {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset
    const parallax = document.querySelector('.header')
    const speed = scrolled * 0.3
    
    if (parallax) {
      parallax.style.transform = `translateY(${speed}px)`
    }
    
    // Scroll-based animasyonlar
    const elements = document.querySelectorAll('.feature-card, .showcase-item')
    elements.forEach((element, index) => {
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      const scrollPosition = window.pageYOffset + window.innerHeight
      
      if (scrollPosition > elementTop && scrollPosition < elementTop + elementHeight) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }
    })
  })
}

// Klavye kısayolları
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case ' ':
        e.preventDefault()
        const playPauseBtn = document.getElementById('playPauseBtn')
        if (playPauseBtn) {
          playPauseBtn.click()
        }
        break
      case 'Escape':
        const audio = document.getElementById('silaKafa')
        if (audio) {
          audio.pause()
          audio.currentTime = 0
          const playPauseBtn = document.getElementById('playPauseBtn')
          if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
          }
        }
        break
      case 'c':
        triggerConfettiBurst()
        break
      case 'ArrowLeft':
        const audioLeft = document.getElementById('silaKafa')
        if (audioLeft) {
          audioLeft.currentTime = Math.max(0, audioLeft.currentTime - 10)
        }
        break
      case 'ArrowRight':
        const audioRight = document.getElementById('silaKafa')
        if (audioRight) {
          audioRight.currentTime = Math.min(audioRight.duration, audioRight.currentTime + 10)
        }
        break
    }
  })
}

// Periyodik efektler
function setupPeriodicEffects() {
  // Periyodik konfeti
  setInterval(() => {
    if (Math.random() > 0.8) {
      createRandomConfetti()
    }
  }, 4000)
  
  // Periyodik ışık efektleri
  setInterval(() => {
    if (Math.random() > 0.7) {
      createLightEffect()
    }
  }, 6000)
}

// Rastgele konfeti oluşturma
function createRandomConfetti() {
  const confettiContainer = document.getElementById('confetti-container')
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
  
  const confetti = document.createElement('div')
  confetti.className = 'confetti'
  confetti.style.left = Math.random() * 100 + '%'
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'
  confetti.style.width = (Math.random() * 8 + 4) + 'px'
  confetti.style.height = (Math.random() * 8 + 4) + 'px'
  
  confettiContainer.appendChild(confetti)
  
  setTimeout(() => {
    if (confetti.parentNode) {
      confetti.parentNode.removeChild(confetti)
    }
  }, 4000)
}

// Işık efekti oluşturma
function createLightEffect() {
  const lightEffects = document.querySelector('.light-effects')
  const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3']
  
  const light = document.createElement('div')
  light.className = 'light'
  light.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}40, transparent)`
  light.style.left = Math.random() * 100 + '%'
  light.style.top = Math.random() * 100 + '%'
  light.style.animation = 'lightMove 8s ease-in-out'
  
  lightEffects.appendChild(light)
  
  setTimeout(() => {
    if (light.parentNode) {
      light.parentNode.removeChild(light)
    }
  }, 8000)
}

// Bildirim gösterme
function showNotification(message) {
  // Mevcut bildirimi kaldır
  const existingNotification = document.querySelector('.notification')
  if (existingNotification) {
    existingNotification.remove()
  }
  
  // Yeni bildirim oluştur
  const notification = document.createElement('div')
  notification.className = 'notification'
  notification.innerHTML = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    color: white;
    padding: 20px 30px;
    border-radius: 50px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 600;
    transform: translateX(400px);
    transition: all 0.5s ease;
    max-width: 350px;
    text-align: center;
    font-size: 1.1rem;
  `
  
  document.body.appendChild(notification)
  
  // Animasyon
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 100)
  
  // Otomatik kaldır
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)'
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 500)
  }, 5000)
}

// Sayfa yüklendiğinde ekstra efektler
window.addEventListener('load', function() {
  // Tüm elementlere hover efekti ekle
  const interactiveElements = document.querySelectorAll('.feature-card, .message-card, .photo-placeholder, .showcase-item')
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)'
    })
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)'
    })
  })
  
  // Başlangıç animasyonları
  setTimeout(() => {
    document.body.style.opacity = '1'
  }, 100)
})
