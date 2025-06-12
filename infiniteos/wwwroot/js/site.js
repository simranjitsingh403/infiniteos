const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#$%^&*';
document.querySelectorAll('.jumble-text').forEach(link => {
    const textSpan = link.querySelector('._absoluteText_1mtai_23');
    const originalText = textSpan.textContent;

    link.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            textSpan.textContent = originalText
                .split('')
                .map((char, i) => {
                    if (i < iterations) return originalText[i];
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');

            iterations += 1 / 2; // speed of resolving
            if (iterations >= originalText.length) {
                clearInterval(interval);
                textSpan.textContent = originalText;
            }
        }, 40); // speed of jumble
    });
});




const canvas = document.getElementById('webgl-canvas');
const ctx = canvas.getContext('2d');
const footer = document.getElementById('footer');
if (footer != null) {
    let time = 0;
    const rings = [];

    function resizeCanvas() {
        const rect = footer.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        setupRings();
    }

    function setupRings() {
        rings.length = 0; // clear old
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.sqrt(centerX ** 2 + centerY ** 2);
        const ringSpacing = 45;

        for (let r = ringSpacing; r < maxRadius; r += ringSpacing) {
            rings.push({
                radius: r,
                rotation: Math.random() * Math.PI * 2,
                speed: 0.001 + Math.random() * 0.002, // static speed per ring
            });
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dotsPerRing = 80;

        time += 0.01;

        rings.forEach((ring, index) => {
            const dynamicRadius = ring.radius + Math.sin(time + index) * 2;
            ring.rotation += ring.speed;

            for (let i = 0; i < dotsPerRing; i++) {
                const angle = (i / dotsPerRing) * Math.PI * 2 + ring.rotation;

                const x = centerX + Math.cos(angle) * dynamicRadius;
                const y = centerY + Math.sin(angle) * dynamicRadius;

                const flicker = Math.sin(time * 2 + i + index);
                const size = 1.5 + flicker * 0.5;
                const opacity = 0.4 + 0.6 * Math.abs(flicker);

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 147, 227, ${opacity})`;
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}




document.querySelectorAll('.cursor-dots').forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--x', `${x}%`);
        el.style.setProperty('--y', `${y}%`);
    });

    el.addEventListener('mouseleave', () => {
        el.style.setProperty('--x', '50%');
        el.style.setProperty('--y', '50%');
    });
});


const slider = document.querySelector('.cus-slider-container');
if (slider != null) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;

        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;

    });
    slider.addEventListener('mouseup', () => {
        isDown = false;

    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });

}


function GoToURL(value) {
    window.open(value, '_self');
}