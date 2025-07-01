 const cursor = document.querySelector('.cursor');
        const trails = [];
        const trailCount = 8;

        // Create cursor trails
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push({ element: trail, x: 0, y: 0 });
        }

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';

            trails.forEach((trail, index) => {
                trail.x += (mouseX - trail.x) * (0.1 - index * 0.01);
                trail.y += (mouseY - trail.y) * (0.1 - index * 0.01);
                
                trail.element.style.left = trail.x - 2 + 'px';
                trail.element.style.top = trail.y - 2 + 'px';
                trail.element.style.opacity = (trailCount - index) / trailCount * 0.5;
            });

            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
            particle.style.animationDuration = Math.random() * 4 + 4 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 8000);
        }

        setInterval(createParticle, 300);

        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Animate skill progress bars
                    if (entry.target.querySelector('.skill-progress')) {
                        entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                            setTimeout(() => {
                                bar.style.width = bar.dataset.width;
                            }, 200);
                        });
                    }
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Interactive project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                card.style.transform = `
                    translateY(-10px) 
                    rotateX(${(y - 0.5) * 20}deg) 
                    rotateY(${(x - 0.5) * 20}deg)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });

        // Typewriter effect for subtitle
        const subtitle = document.querySelector('.subtitle');
        const text = 'Next-Generation Full Stack Developer';
        subtitle.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, 1500);