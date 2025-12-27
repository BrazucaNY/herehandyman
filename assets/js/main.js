document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. HERO SLIDER LOGIC (The "Max" Look)
    // ==========================================
    const heroLayers = [document.getElementById('hero-layer-1'), document.getElementById('hero-layer-2')];
    const heroImages = [
        'assets/images/hero-kitchen.webp', 
        'assets/images/hero-remodel.webp',
        'assets/images/hero-handyman.webp'
    ];
    let currentIdx = 0;
    let currentLayerIdx = 0;

    function swapHeroImage() {
        if (!heroLayers[0]) return; // Guard clause if layers don't exist
        
        const nextIdx = (currentIdx + 1) % heroImages.length;
        const nextLayerIdx = (currentLayerIdx + 1) % 2;
        
        // Prepare next layer
        heroLayers[nextLayerIdx].style.backgroundImage = `url('${heroImages[nextIdx]}')`;
        heroLayers[nextLayerIdx].classList.add('active');
        
        // Remove current layer
        heroLayers[currentLayerIdx].classList.remove('active');
        
        currentIdx = nextIdx;
        currentLayerIdx = nextLayerIdx;
    }
    // Change image every 5 seconds
    setInterval(swapHeroImage, 5000);


    // ==========================================
    // 2. CATEGORY GALLERY SYSTEM
    // ==========================================
    const categories = {
        "Kitchens": [
            { src: 'assets/images/k1.webp', title: 'Modern Kitchen' },
            { src: 'assets/images/k2.webp', title: 'Cabinet Refinishing' }
        ],
        "Bathrooms": [
            { src: 'assets/images/b1.webp', title: 'Tile Shower' },
            { src: 'assets/images/b2.webp', title: 'Vanity Install' }
        ],
        "Flooring": [
            { src: 'assets/images/f1.webp', title: 'Vinyl Plank' },
            { src: 'assets/images/f2.webp', title: 'Hardwood Repair' }
        ]
    };

    const categoryGrid = document.getElementById('gallery-category-selection');
    const imageDisplay = document.getElementById('category-image-display');
    const galleryGrid = imageDisplay?.querySelector('.gallery-grid');
    const backBtn = document.getElementById('back-to-categories');

    // Initialize Category Cards
    if (categoryGrid) {
        Object.keys(categories).forEach(catName => {
            const card = document.createElement('div');
            card.className = 'category-card animate-on-scroll';
            card.innerHTML = `
                <div class="category-card-inner">
                    <h3>${catName}</h3>
                    <span class="view-btn">View Projects</span>
                </div>
            `;
            card.addEventListener('click', () => showCategoryImages(catName));
            categoryGrid.appendChild(card);
        });
    }

    function showCategoryImages(category) {
        categoryGrid.style.display = 'none';
        imageDisplay.style.display = 'block';
        galleryGrid.innerHTML = ''; // Clear previous

        categories[category].forEach(imgObj => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${imgObj.src}" alt="${imgObj.title}" loading="lazy">
                <div class="gallery-overlay"><h3>${imgObj.title}</h3></div>
            `;
            galleryGrid.appendChild(item);
        });
        window.scrollTo({ top: document.getElementById('gallery').offsetTop - 100, behavior: 'smooth' });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            imageDisplay.style.display = 'none';
            categoryGrid.style.display = 'grid';
        });
    }


    // ==========================================
    // 3. NAVIGATION & UI (Your Original Logic)
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');
    const header = document.querySelector('header');

    // Mobile Toggle
    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };
    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    // Sticky Header Scroll Effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Intersection Observer for Animations (Better than Scroll Listener)
    const appearanceOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, appearanceOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


    // ==========================================
    // 4. FORM HANDLING (Your Enhanced Logic)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Honeypot check
            if (contactForm.querySelector('[name="company"]').value !== "") return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // Simulate sending
                await new Promise(res => setTimeout(res, 1500));
                alert('Success! We will contact you shortly.');
                contactForm.reset();
            } catch (err) {
                alert('Error sending message.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });
    }
});
<script>
    // Mobile Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const closeBtn = document.querySelector('.mobile-menu-close');

    hamburgerBtn.addEventListener('click', () => {
        mainNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && !e.target.closest('#hamburger-btn')) {
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
</script>