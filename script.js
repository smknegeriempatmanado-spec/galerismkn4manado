document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMEN DOM ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentIndex = 0;

    // --- FUNGSI LIGHTBOX ---
    function openLightbox(index) {
        const item = galleryItems[index];
        const img = item.querySelector('img');
        const caption = item.querySelector('figcaption');

        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption.textContent;
        lightbox.classList.add('active');
        currentIndex = index;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function changeImage(direction) {
        galleryItems[currentIndex].classList.remove('active');
        
        if (direction === 1) { // Next
            currentIndex = (currentIndex + 1) % galleryItems.length;
        } else { // Prev
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        }

        openLightbox(currentIndex);
    }

    // --- EVENT LISTENER UNTUK LIGHTBOX ---
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Pastikan item tidak sedang di-hide oleh filter
            if (!item.classList.contains('hide')) {
                openLightbox(index);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));

    // Tutup lightbox saat klik di luar gambar
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigasi dengan keyboard
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });

    // --- FUNGSI FILTER ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan class active ke tombol yang diklik
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

});