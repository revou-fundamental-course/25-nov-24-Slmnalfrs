// Mendapatkan elemen-elemen dari DOM
const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");
const resultSection = document.getElementById("result");
const bmiValueElement = document.getElementById("bmiValue");
const bmiCategoryElement = document.getElementById("bmiCategory");
const genderSelect = document.getElementById("gender");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

// Fungsi utama untuk menghitung BMI
function calculateBMI() {
    // Ambil nilai dari input form
    const gender = genderSelect.value; // Jenis kelamin
    const height = parseFloat(heightInput.value) / 100; // Konversi tinggi dari cm ke meter
    const weight = parseFloat(weightInput.value); // Berat badan

    // Validasi input
    if (!gender) {
        alert("Harap pilih jenis kelamin!"); // Peringatan jika jenis kelamin tidak dipilih
        return;
    }
    if (isNaN(height) || height <= 0) {
        alert("Harap masukkan tinggi badan yang valid!"); // Peringatan jika tinggi tidak valid
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        alert("Harap masukkan berat badan yang valid!"); // Peringatan jika berat tidak valid
        return;
    }

    // Rumus BMI
    const bmi = weight / (height * height); // Menghitung nilai BMI

    // Tentukan kategori berdasarkan BMI
    const { category, advice } = getBMICategory(bmi, gender);

    // Tampilkan hasil ke pengguna
    displayResult(bmi, category, advice);
}

// Fungsi untuk menentukan kategori BMI
function getBMICategory(bmi, gender) {
    let category = ""; // Kategori BMI
    let advice = ""; // Saran berdasarkan kategori

    // Menentukan kategori BMI berdasarkan nilai
    if (bmi < 18.5) {
        category = "Kekurangan berat badan";
        advice = "Anda perlu meningkatkan asupan nutrisi untuk mencapai berat badan ideal.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal (Ideal)";
        advice = "Selamat! Anda memiliki berat badan yang sehat. Pertahankan pola makan dan aktivitas fisik.";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Berat badan lebih";
        advice = "Cobalah untuk mengatur pola makan dan meningkatkan aktivitas fisik.";
    } else {
        category = "Obesitas";
        advice = "Pertimbangkan untuk berkonsultasi dengan ahli kesehatan untuk mendapatkan panduan lebih lanjut.";
    }

    // Informasi tambahan untuk jenis kelamin
    if (gender === "male" && bmi >= 25) {
        advice += " Sebagai pria, aktivitas fisik rutin dapat sangat membantu.";
    } else if (gender === "female" && bmi >= 25) {
        advice += " Sebagai wanita, pastikan Anda memantau asupan kalori harian Anda.";
    }

    return { category, advice }; // Mengembalikan kategori dan saran
}

// Fungsi untuk menampilkan hasil ke pengguna
function displayResult(bmi, category, advice) {
    bmiValueElement.textContent = `BMI Anda: ${bmi.toFixed(1)}`; // Menampilkan nilai BMI
    bmiCategoryElement.innerHTML = `
        <strong>Kategori:</strong> ${category}<br>
        <strong>Saran:</strong> ${advice}
    `; // Menampilkan kategori dan saran

    // Tampilkan bagian hasil
    resultSection.style.display = "block";
}

// Fungsi untuk mereset form
function resetForm() {
    // Sembunyikan hasil
    resultSection.style.display = "none";
    // Reset input form
    genderSelect.value = "";
    heightInput.value = "";
    weightInput.value = "";
}

// Event listener untuk tombol hitung
calculateButton.addEventListener("click", calculateBMI);

// Event listener untuk tombol reset
resetButton.addEventListener("click", resetForm);