function showTips() {
    const tips = {
        pms: {
            title: "Premenstrual Syndrome (PMS) Hygiene Tips",
            content: [
                "Maintain a balanced diet rich in fruits and vegetables.",
                "Exercise regularly to manage symptoms.",
                "Practice stress-relief techniques like yoga or meditation.",
                "Get adequate sleep to help regulate mood swings.",
                "Avoid caffeine and sugar to reduce bloating.",
                "Use heat therapy to relieve cramps."
            ]
        },
        pcos: {
            title: "Polycystic Ovary Syndrome (PCOS) Hygiene Tips",
            content: [
                "Maintain a healthy weight to manage symptoms.",
                "Keep your skin clean to prevent acne.",
                "Manage blood sugar levels with a balanced diet.",
                "Exercise regularly to improve insulin sensitivity.",
                "Avoid processed foods and sugary drinks.",
                "Consult a healthcare provider for regular check-ups."
            ]
        },
        endometriosis: {
            title: "Endometriosis Hygiene Tips",
            content: [
                "Use heat therapy for pain relief.",
                "Maintain a healthy diet to reduce inflammation.",
                "Stay active to manage symptoms.",
                "Get enough sleep to help the body heal.",
                "Avoid high-fat and high-sugar foods.",
                "Consult with a healthcare provider for personalized advice."
            ]
        },
        fibroids: {
            title: "Fibroids Hygiene Tips",
            content: [
                "Stay hydrated to help with symptoms.",
                "Maintain a balanced diet rich in fruits and vegetables.",
                "Monitor your symptoms regularly.",
                "Avoid high-estrogen foods like soy products.",
                "Exercise regularly to improve overall health.",
                "Consult a healthcare provider for regular monitoring."
            ]
        },
        menorrhagia: {
            title: "Menorrhagia (Heavy Periods) Hygiene Tips",
            content: [
                "Change sanitary products frequently to avoid infections.",
                "Stay hydrated to manage blood loss.",
                "Maintain a balanced diet rich in iron.",
                "Avoid aspirin as it can increase bleeding.",
                "Use heat therapy to relieve cramps.",
                "Consult a doctor if heavy bleeding persists."
            ]
        }
    };

    const disease = document.getElementById('disease').value;
    const tipContent = document.getElementById('tip-content');
    tipContent.innerHTML = '';

    if (disease && tips[disease]) {
        document.getElementById('tip-title').textContent = tips[disease].title;
        tips[disease].content.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipContent.appendChild(li);
        });
        document.getElementById('tips').style.display = 'block';
    } else {
        document.getElementById('tips').style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}