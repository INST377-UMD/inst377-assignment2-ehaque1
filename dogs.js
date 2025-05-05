// Carousel functionality
let currentSlide = 0;
let slides = [];
let intervalId;

document.addEventListener('DOMContentLoaded', () => {
    loadRandomDogImages();
    loadDogBreeds();
    setupCarouselControls();
});

function setupCarouselControls() {
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
        resetAutoSlide();
    });
}

function moveToSlide(slideIndex) {
    const carousel = document.querySelector('.carousel');
    const totalSlides = slides.length;
    
    // Handle wrap-around for infinite sliding
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    
    currentSlide = slideIndex;
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function startAutoSlide() {
    intervalId = setInterval(() => {
        moveToSlide(currentSlide + 1);
    }, 3000);
}

function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
}

// Load random dog images
async function loadRandomDogImages() {
    const carousel = document.getElementById('dog-carousel');
    carousel.innerHTML = '';
    
    try {
        // Load 10 random dog images
        for (let i = 0; i < 10; i++) {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            
            const imgDiv = document.createElement('div');
            imgDiv.className = 'carousel-item';
            imgDiv.innerHTML = `<img src="${data.message}" alt="Random dog">`;
            carousel.appendChild(imgDiv);
        }
        
        // Initialize carousel after images are loaded
        slides = document.querySelectorAll('.carousel-item');
        startAutoSlide();
    } catch (error) {
        console.error('Error loading dog images:', error);
    }
}

// Load dog breeds and create buttons
async function loadDogBreeds() {
    const breedsContainer = document.getElementById('breeds-container');
    breedsContainer.innerHTML = '';
    
    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');
        const data = await response.json();
        
        data.data.forEach(breed => {
            const btn = document.createElement('button');
            btn.className = 'breed-btn';
            btn.textContent = breed.attributes.name;
            btn.setAttribute('data-breed-id', breed.id);
            
            btn.addEventListener('click', () => showBreedInfo(breed));
            breedsContainer.appendChild(btn);
        });
    } catch (error) {
        console.error('Error loading dog breeds:', error);
    }
}

// Show breed information
function showBreedInfo(breed) {
    const breedInfo = document.getElementById('breed-info');
    
    breedInfo.innerHTML = `
        <h2>${breed.attributes.name}</h2>
        <p><strong>Description:</strong> ${breed.attributes.description}</p>
        <p class="life-span">
            Life Span: ${breed.attributes.life.min} - ${breed.attributes.life.max} years
        </p>
        <p><strong>Male Weight:</strong> ${breed.attributes.male_weight.min} - ${breed.attributes.male_weight.max} kg</p>
        <p><strong>Female Weight:</strong> ${breed.attributes.female_weight.min} - ${breed.attributes.female_weight.max} kg</p>
        <p><strong>Hypoallergenic:</strong> ${breed.attributes.hypoallergenic ? 'Yes' : 'No'}</p>
    `;
    
    breedInfo.style.display = 'block';
    breedInfo.scrollIntoView({ behavior: 'smooth' });
}