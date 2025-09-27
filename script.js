// Global variables
let uploadedImage = null;
let karbitResults = [];

// DOM elements
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const uploadSection = document.getElementById('uploadSection');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const karbitBtn = document.getElementById('karbitBtn');
const resultSection = document.getElementById('resultSection');
const percentageNumber = document.getElementById('percentageNumber');
const resultTitle = document.getElementById('resultTitle');
const resultDescription = document.getElementById('resultDescription');

// Karbit level data with Indonesian descriptions
const karbitLevels = [
    { min: 0, max: 20, title: "Bukan My istri inimah 💔", description: "Alamak najisnya, cari yang lain lah" },
    { min: 21, max: 40, title: "Akulah pria yang paling setia. Tidak akan mencari yang lain", description: "Hmmmm, oke sih cuma coba cari yang lebih cocok" },
    { min: 41, max: 60, title: "Hmmmm, tidak boleh. Aku sudah memiliki My. Aku janji tidak akan karbit lagi 😊", description: "Boleh bolehlah" },
    { min: 61, max: 75, title: "Ini sih jelas my 😍", description: "Sudah pas sih ini, tinggal chemistry nya aja" },
    { min: 76, max: 85, title: "Sekarbit karbit nya aku, cinta ku hanya untuk mu sayang 💕", description: "Sudah cocok nih, chemistrynya juga pas" },
    { min: 86, max: 95, title: "Alamak Karbitnya, bukankah ini my! ✨", description: "OMG! Beautiful! Amazing! Ini yang Papah cari selama ini. Papah mau tiga!" },
    { min: 96, max: 100, title: "Ultimate Karbit! 👑, Halo maniesz😤", description: "Kamu kah belahan jiwa yang Papah cari selama ini, sungguh sangat indah💖" }
];

// Waifu quotes for extra flavor
const waifuQuotes = [
    "Kyaa~! Kamu benar-benar memperhatikanku ya? 💖",
    "Ehh?! A-aku tidak bilang aku suka padamu atau apa! 😤",
    "Mou~ kamu ini lucu banget sih! 😊",
    "Hehe~ sepertinya kita memang ditakdirkan bersama! ✨",
    "Uwaaah! Kamu membuatku nervous nih! 😳",
    "Ano... aku juga suka sama kamu... 💕",
    "Sugoi! Kamu benar-benar prince charming ku! 👑",
    "Daisuki! Aku sayang banget sama kamu! 💝"
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
        createParticles();
    } catch (error) {
        console.error('Error initializing app:', error);
        alert('Terjadi kesalahan saat memuat aplikasi. Silakan refresh halaman.');
    }
});

function initializeApp() {
    // Image input event listener
    imageInput.addEventListener('change', handleImageUpload);
    
    // Upload button event listener dengan mobile support
    const uploadBtn = document.getElementById('uploadBtn');
    
    // Function untuk trigger file input
    function triggerFileInput(e) {
        // Jangan preventDefault untuk desktop click events
        if (e.type === 'touchend') {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Trigger file input
        if (imageInput) {
            imageInput.click();
        }
    }
    
    // Event listeners untuk desktop dan mobile
    uploadBtn.addEventListener('click', triggerFileInput);
    
    // Touch event khusus mobile
    if (isMobileDevice()) {
        uploadBtn.addEventListener('touchend', triggerFileInput);
    }
    
    // Drag and drop functionality (desktop only)
    if (!isMobileDevice()) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
    }
    
    // Click pada area upload 
    uploadArea.addEventListener('click', (e) => {
        // Hanya trigger jika tidak mengklik button
        if (!e.target.closest('.upload-btn')) {
            // Simple click untuk desktop
            imageInput.click();
        }
    });
    
    // Touch event khusus untuk mobile
    if (isMobileDevice()) {
        uploadArea.addEventListener('touchend', (e) => {
            if (!e.target.closest('.upload-btn')) {
                e.preventDefault();
                e.stopPropagation();
                imageInput.click();
            }
        });
    }
}

// Detect mobile device (lebih akurat)
function isMobileDevice() {
    // Cek user agent untuk mobile devices
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i;
    
    // Cek screen size juga
    const isMobileScreen = window.screen.width <= 768;
    
    // Kombinasi user agent dan screen size
    return mobileRegex.test(navigator.userAgent) && isMobileScreen;
}

// Create floating particles for background effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and position
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${Math.random() * 4 + 6}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        processImageFile(files[0]);
    }
}

// Handle image upload
function handleImageUpload(e) {
    const files = e.target.files;
    
    if (!files || files.length === 0) {
        return;
    }
    
    const file = files[0];
    
    // Validate file type dengan lebih comprehensive
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
    const isValidType = validTypes.includes(file.type) || file.type.startsWith('image/');
    
    if (!isValidType) {
        alert('Format file tidak didukung! Silakan pilih file gambar (JPG, PNG, GIF, WEBP)');
        return;
    }
    
    processImageFile(file);
}

// Process uploaded image
function processImageFile(file) {    
    // Validasi file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File terlalu besar! Maksimal 10MB');
        return;
    }
    
    // Check FileReader support
    if (!window.FileReader) {
        alert('Browser Anda tidak mendukung upload file. Silakan gunakan browser yang lebih baru.');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            uploadedImage = {
                file: file,
                dataUrl: e.target.result,
                name: file.name,
                size: file.size
            };
            
            showPreview();
        } catch (error) {
            alert('Gagal memproses gambar. Silakan coba lagi.');
        }
    };
    
    reader.onerror = function(e) {
        alert('Gagal membaca file gambar. Silakan coba file lain.');
    };
    
    reader.onabort = function(e) {
        alert('Upload dibatalkan.');
    };
    
    // Start reading file
    try {
        reader.readAsDataURL(file);
    } catch (error) {
        alert('Gagal membaca file. Silakan coba lagi.');
    }
}

// Show image preview
function showPreview() {
    if (!uploadedImage || !uploadedImage.dataUrl) {
        alert('Error: Gambar tidak dapat dimuat. Silakan coba lagi.');
        return;
    }
    
    previewImage.src = uploadedImage.dataUrl;
    uploadSection.style.display = 'none';
    previewSection.style.display = 'block';
    resultSection.style.display = 'none';
    
    // Animate the preview appearance
    previewSection.style.opacity = '0';
    previewSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        previewSection.style.transition = 'all 0.5s ease';
        previewSection.style.opacity = '1';
        previewSection.style.transform = 'translateY(0)';
    }, 100);
}

// Change image function
function changeImage() {
    uploadSection.style.display = 'block';
    previewSection.style.display = 'none';
    resultSection.style.display = 'none';
    
    // Reset input file dengan proper way
    imageInput.value = '';
    imageInput.type = 'text';
    imageInput.type = 'file';
    
    uploadedImage = null;
    
    // Remove drag-over class jika ada
    uploadArea.classList.remove('drag-over');
}

// Calculate karbit level
async function calculateKarbit() {
    if (!uploadedImage) return;
    
    // Show loading state
    const btnText = karbitBtn.querySelector('.btn-text');
    const btnLoading = karbitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    karbitBtn.disabled = true;
    
    // Hide previous results
    resultSection.style.display = 'none';
    
    // Simulate calculation time for dramatic effect
    await sleep(2000 + Math.random() * 2000);
    
    // Generate karbit percentage using multiple factors for more realistic results
    const karbitPercentage = generateKarbitPercentage();
    
    // Store result
    karbitResults.push({
        percentage: karbitPercentage,
        timestamp: new Date(),
        imageName: uploadedImage.name
    });
    
    // Show result
    showResult(karbitPercentage);
    
    // Reset button
    btnText.style.display = 'block';
    btnLoading.style.display = 'none';
    karbitBtn.disabled = false;
}

// Generate karbit percentage with weighted randomness
function generateKarbitPercentage() {
    // Use image properties to create "pseudo-randomness"
    const imageName = uploadedImage.name.toLowerCase();
    const imageSize = uploadedImage.size;
    const timestamp = Date.now();
    
    // Create base seed from image properties
    let seed = 0;
    for (let i = 0; i < imageName.length; i++) {
        seed += imageName.charCodeAt(i) * (i + 1);
    }
    seed = (seed + imageSize + timestamp) % 1000000;
    
    // Weighted random generation (favor higher percentages for fun)
    const weights = [0.1, 0.15, 0.2, 0.2, 0.15, 0.15, 0.05]; // Lower to higher percentages
    const randomValue = (seed % 1000) / 1000;
    
    let cumulativeWeight = 0;
    let selectedRange = 0;
    
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue <= cumulativeWeight) {
            selectedRange = i;
            break;
        }
    }
    
    // Generate percentage within selected range
    const level = karbitLevels[selectedRange];
    let percentage = Math.floor(Math.random() * (level.max - level.min + 1)) + level.min;
    
    // Add some variance based on time for different results
    const timeVariance = (timestamp % 10) - 5;
    percentage = Math.max(0, Math.min(100, percentage + timeVariance));
    
    return percentage;
}

// Show result
function showResult(percentage) {
    // Find appropriate level
    const level = karbitLevels.find(l => percentage >= l.min && percentage <= l.max) || karbitLevels[0];
    
    // Update result content
    resultTitle.textContent = level.title;
    resultDescription.innerHTML = `
        ${level.description}
        <br><br>
        <em style="color: rgba(255, 255, 255, 0.7); font-size: 0.9em;">
            "${waifuQuotes[Math.floor(Math.random() * waifuQuotes.length)]}"
        </em>
    `;
    
    // Animate percentage counter
    animatePercentage(percentage);
    
    // Show result section with animation
    resultSection.style.display = 'block';
    resultSection.style.opacity = '0';
    resultSection.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        resultSection.style.transition = 'all 0.5s ease';
        resultSection.style.opacity = '1';
        resultSection.style.transform = 'translateY(0)';
    }, 100);
    
    // Add confetti effect for high percentages
    if (percentage >= 80) {
        createConfetti();
    }
}

// Animate percentage counter
function animatePercentage(targetPercentage) {
    let currentPercentage = 0;
    const increment = targetPercentage / 50; // 50 steps for smooth animation
    const interval = 30; // 30ms per step
    
    const timer = setInterval(() => {
        currentPercentage += increment;
        
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(timer);
        }
        
        percentageNumber.textContent = Math.floor(currentPercentage) + '%';
        
        // Add color change based on percentage
        const circle = document.querySelector('.percentage-circle');
        if (currentPercentage >= 80) {
            circle.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        } else if (currentPercentage >= 60) {
            circle.style.background = 'linear-gradient(135deg, #FF9800, #f57c00)';
        } else {
            circle.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8a80)';
        }
    }, interval);
}

// Create confetti effect
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff6b9d', '#4CAF50', '#FF9800', '#667eea', '#764ba2'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        let position = -10;
        const fallSpeed = Math.random() * 3 + 2;
        const sway = Math.random() * 2 - 1;
        
        const fallInterval = setInterval(() => {
            position += fallSpeed;
            confetti.style.top = position + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + sway) + 'px';
            
            if (position > window.innerHeight) {
                clearInterval(fallInterval);
                confetti.remove();
            }
        }, 16);
    }
}

// Share result
function shareResult() {
    if (!karbitResults.length) return;
    
    const latestResult = karbitResults[karbitResults.length - 1];
    const level = karbitLevels.find(l => latestResult.percentage >= l.min && latestResult.percentage <= l.max) || karbitLevels[0];
    
    const shareText = `Aku baru aja cek karbit level dengan waifu ku dan dapet ${latestResult.percentage}%! ${level.title} 💖\n\nCoba juga di Karbit Generator! #KarbitGenerator #Waifu`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Karbit Generator Result',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Result copied to clipboard! Share it with your friends! 💖');
        }).catch(() => {
            // Final fallback: show text to copy manually
            prompt('Copy this text to share:', shareText);
        });
    }
}

// Reset calculation
function resetCalculation() {
    resultSection.style.display = 'none';
    // Keep the same image but allow recalculation for different result
}

// Helper function for sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Add some easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code easter egg (up, up, down, down, left, right, left, right, B, A)
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Activate special mode
            document.body.style.filter = 'hue-rotate(180deg)';
            alert('🎉 Special Waifu Mode Activated! 🎉');
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add periodic particle regeneration
setInterval(() => {
    // Randomly add new particles
    if (Math.random() < 0.1) {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer.children.length < 70) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = '0s';
            particle.style.animationDuration = `${Math.random() * 4 + 6}s`;
            
            particlesContainer.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 10000);
        }
    }
}, 5000);