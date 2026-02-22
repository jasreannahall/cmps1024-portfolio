// Scroll-triggered card animations
    const cards = document.querySelectorAll('.highlight-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    cards.forEach(card => observer.observe(card));
    // Animated number counter for stats
    function animateCount(el, target, suffix = '') {
        let start = 0;
        const isNum = !isNaN(parseInt(target));
        if (!isNum) return;
        const end = parseInt(target);
        const duration = 1800;
        const step = duration / end;
        const timer = setInterval(() => {
            start += Math.ceil(end / 60);
            if (start >= end) { start = end; clearInterval(timer); }
            el.textContent = start.toLocaleString() + suffix;
        }, step);
    }
    const statCards = document.querySelectorAll('.stat-card');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numEl = entry.target.querySelector('.stat-number');
                const raw = numEl.textContent.trim();
                if (raw === '1,000+') {
                    animateCount(numEl, 1000, '+');
                } else if (raw === '6') {
                    animateCount(numEl, 6);
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statCards.forEach(c => statObserver.observe(c));
    // Subtle header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 60
            ? 'rgba(6, 78, 99, 0.98)'
            : 'rgba(6, 78, 99, 0.92)';
    });