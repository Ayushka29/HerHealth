function selectEmoji(element) {
    document.querySelectorAll('.emoji').forEach(emoji => emoji.classList.remove('selected'));
    element.classList.add('selected');
}