let currentSlide = 1;
const totalSlides = 13;

// Photo gallery
const photos = [
    'Bilder/Bild 1.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 13.29.05 (1).jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 13.30.00 (1).jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 13.44.37.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 13.50.14.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 13.52.11.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 13.52.27.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 14.01.47.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 14.09.59.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 14.12.21.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 14.13.01.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 14.25.27.jpeg',
    'Bilder/WhatsApp Image 2026-02-12 at 14.34.38.jpeg'
];
let currentPhotoIndex = 0;

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updatePhoto();
}

function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updatePhoto();
}

function updatePhoto() {
    const photoElement = document.getElementById('currentPhoto');
    const counterElement = document.getElementById('photoCounter');
    
    if (photoElement) {
        photoElement.style.opacity = '0';
        setTimeout(() => {
            photoElement.src = photos[currentPhotoIndex];
            photoElement.style.opacity = '1';
        }, 300);
    }
    
    if (counterElement) {
        counterElement.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
    }
}

// Startdatum der Beziehung
const startDate = new Date('2020-08-23');

// Berechne die Anzahl der Tage seit dem Startdatum
function calculateDaysTogether() {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Formatiere große Zahlen mit Tausendertrennzeichen
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Aktualisiere die Statistiken beim Laden der Seite
function updateStatistics() {
    const days = calculateDaysTogether();
    const years = (days / 365).toFixed(1);
    
    // Aktualisiere Tage
    const daysElement = document.getElementById('days-together');
    if (daysElement) {
        daysElement.textContent = formatNumber(days);
        console.log('Days updated:', days);
    } else {
        console.log('Element days-together not found');
    }
    
    // Aktualisiere Beschreibung
    const descriptionElement = document.getElementById('days-description');
    if (descriptionElement) {
        descriptionElement.textContent = `Seit dem 23.08.2020 - Das sind ${years} wundervolle Jahre zusammen`;
    }
}

// Initialize floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞', '🌹', '💐'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 600);
}

// Next slide function
function nextSlide() {
    if (currentSlide >= totalSlides) return;
    
    const currentSlideElement = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const nextSlideElement = document.querySelector(`.slide[data-slide="${currentSlide + 1}"]`);
    
    // Add exit animation to current slide
    currentSlideElement.classList.remove('active');
    currentSlideElement.classList.add('exit-left');
    
    // Add enter animation to next slide
    nextSlideElement.classList.add('enter-right');
    
    setTimeout(() => {
        currentSlideElement.classList.remove('exit-left');
        nextSlideElement.classList.remove('enter-right');
        nextSlideElement.classList.add('active');
    }, 600);
    
    currentSlide++;
    updateProgressDots();
}

// Update progress dots
function updateProgressDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Restart slides
function restartSlides() {
    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach(slide => {
        slide.classList.remove('active', 'exit-left', 'enter-right');
    });
    
    currentSlide = 1;
    document.querySelector('.slide[data-slide="1"]').classList.add('active');
    updateProgressDots();
}

// Add click functionality to progress dots
function initProgressDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index + 1);
        });
    });
}

// Go to specific slide
function goToSlide(slideNumber) {
    if (slideNumber === currentSlide || slideNumber < 1 || slideNumber > totalSlides) return;
    
    const currentSlideElement = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const targetSlideElement = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    
    currentSlideElement.classList.remove('active');
    targetSlideElement.classList.add('active');
    
    currentSlide = slideNumber;
    updateProgressDots();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
    updateStatistics();
        if (currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    }
});

// Swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        if (currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    }
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    updateStatistics();
    createFloatingHearts();
    initProgressDots();
    updateProgressDots();
    initMap();
});

// Initialize Map
let map;
function initMap() {
    // Warte bis die Map-Slide geladen ist
    setTimeout(() => {
        if (!map) {
            map = L.map('map').setView([46.5, 22.0], 5);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Unsere Abenteuer-Orte
            const locations = [
                { name: 'Babilon', country: 'Tschechien', lat: 50.4486, lng: 15.0617 },
                { name: 'Kleinlobming', country: 'Österreich', lat: 47.0667, lng: 14.7167 },
                { name: 'Bibione', country: 'Italien', lat: 45.6397, lng: 13.0242 },
                { name: 'Arad', country: 'Rumänien', lat: 46.1866, lng: 21.3123 },
                { name: 'Temesburg', country: 'Rumänien', lat: 45.7489, lng: 21.2087 },
                { name: 'Cluj', country: 'Rumänien', lat: 46.7712, lng: 23.6236 },
                { name: 'Bukarest', country: 'Rumänien', lat: 44.4268, lng: 26.1025 },
                { name: 'Brașov', country: 'Rumänien', lat: 45.6579, lng: 25.6012 },
                { name: 'Transfăgărășan', country: 'Rumänien', lat: 45.6025, lng: 24.6189 },
                { name: 'Ammersee', country: 'Deutschland', lat: 47.9833, lng: 11.1167 },
                { name: 'Wörthersee', country: 'Österreich', lat: 46.6256, lng: 14.1472 }
            ];
            
            // Füge Marker hinzu
            locations.forEach(location => {
                const marker = L.marker([location.lat, location.lng]).addTo(map);
                marker.bindPopup(`<b>${location.name}</b><br>${location.country}`);
            });
        }
    }, 1000);
}

// Handle Yes Button
function handleYes() {
    // Gehe zur nächsten Slide (Passwort-Slide)
    nextSlide();
}

// Handle No Button - macht JA größer und NEIN kleiner
let noClickCount = 0;
function handleNo() {
    noClickCount++;
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Vergrößere JA Button
    const newYesSize = 1 + (noClickCount * 0.3);
    yesBtn.style.transform = `scale(${newYesSize})`;
    
    // Verkleinere NEIN Button
    const newNoSize = Math.max(0.3, 1 - (noClickCount * 0.2));
    noBtn.style.transform = `scale(${newNoSize})`;
    
    // Nach 5 Klicks: NEIN Button verschwindet fast
    if (noClickCount >= 5) {
        noBtn.style.opacity = '0.3';
        noBtn.style.pointerEvents = 'none';
    }
}

// Password Check für PDF Download
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const password = passwordInput.value;
    
    if (password === '04102020') {
        // Korrektes Passwort - Download PDF
        passwordError.style.display = 'none';
        passwordInput.style.borderColor = '#4caf50';
        
        // PDF Download
        const link = document.createElement('a');
        link.href = 'JSSchein/VJD5896718595658_A4.pdf';
        link.download = 'Unser_naechstes_Abenteuer.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Erfolgsmeldung
        passwordInput.value = '✓ Erfolgreich!';
        passwordInput.disabled = true;
    } else {
        // Falsches Passwort
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = '#f5576c';
        passwordInput.value = '';
        passwordInput.focus();
    }
}
