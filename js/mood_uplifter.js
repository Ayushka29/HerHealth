function playGame(gameName) {
    alert('Starting ' + gameName + '...');
}

document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('.wave-heading');
    const text = heading.textContent;
    heading.innerHTML = '';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.setProperty('--delay', index);
        heading.appendChild(span);
    });
});
