// 🌸 Calculate Next Period Date
function calculatePeriod() {
    let lastPeriodDate = document.getElementById("last-period").value;
    let cycleLength = parseInt(document.getElementById("cycle-length").value);
    
    if (!lastPeriodDate || !cycleLength) {
        alert("⚠️ Please enter both the last period date and cycle length.");
        return;
    }

    let lastDate = new Date(lastPeriodDate);
    let today = new Date();

    // 🚫 Prevent future dates
    if (lastDate > today) {
        alert("⚠️ Last period date cannot be in the future.");
        return;
    }

    let nextPeriodDate = new Date(lastDate);
    nextPeriodDate.setDate(lastDate.getDate() + cycleLength);

    document.getElementById("next-period").textContent = nextPeriodDate.toDateString();
    document.getElementById("tracker-result").style.display = "block";
}

// 🌙 Toggle Dark Mode
// function toggleTheme() {
//     document.body.classList.toggle("dark-mode");
// }

// ⏳ Set max date to today
document.addEventListener("DOMContentLoaded", function () {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("last-period").setAttribute("max", today);
});
