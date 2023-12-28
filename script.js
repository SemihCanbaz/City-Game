const cityImages = document.querySelectorAll(".city-image");
const deckContainer = document.getElementById("deck-container");
const answerContainer = document.getElementById("answer-container");
const confettiContainer = document.getElementById("confetti-container");
const cityInput = document.getElementById("city-input");

function getRandomCity() {
  return cityImages[Math.floor(Math.random() * cityImages.length)];
}

function startGame() {
  // Önceki resimleri ve input alanını temizle
  deckContainer.innerHTML = "";
  confettiContainer.innerHTML = "";
  cityInput.value = "";

  // Rastgele bir şehir seç
  const randomCityImage = getRandomCity();

  // Şehir resmini kopyala ve ekleyin
  const cityImage = randomCityImage.cloneNode(true);
  cityImage.id = "city-image"; // ID'yi güncelledik
  cityImage.classList.add("start-game-image"); // Yeni sınıf ekledik
  deckContainer.appendChild(cityImage);

  // Resimleri göster
  deckContainer.classList.remove("hidden");

  // Input alanını göster
  answerContainer.classList.remove("hidden");
}

function checkAnswer() {
  const randomCityImage = document.getElementById("city-image");
  const randomCityName = randomCityImage.alt.toUpperCase(); // Seçilen şehirin adını al
  const userAnswer = cityInput.value.toUpperCase(); // Kullanıcının cevabını al

  if (userAnswer === randomCityName) {
    revealCityName(randomCityName, randomCityImage);
  } else {
    // Hatalı cevap durumunda SweetAlert2 kullanarak uyarı göster
    Swal.fire({
      title: "Yanlış Cevap!",
      text: "Tekrar deneyin.",
      icon: "error",
      confirmButtonText: "Tamam",
    });
  }
}

function revealCityName(cityName, cityImage) {
  // Confeti efekti
  confettiEffect(confettiContainer);

  // SweetAlert2 ile animasyonlu doğru cevap uyarısı göster
  Swal.fire({
    title: "Doğru!",
    text: `Şehir: ${cityName}`,
    icon: "success",
    confirmButtonText: "Tamam",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    didOpen: () => {
      // Uyarı penceresi açıldığında resmi başka bir elemanın içine yerleştir
      const imageContainer = Swal.getContent().querySelector("#swal2-content");
      const enlargedImage = cityImage.cloneNode(true);
      enlargedImage.classList.add("enlarged");
      imageContainer.innerHTML = "";
      imageContainer.appendChild(enlargedImage);
    },
    willClose: () => {
      // Uyarı penceresi kapatıldığında yeni oyunu başlat
      startGame();
    },
  });
}

function confettiEffect(container) {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;

  container.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

function selectCard(card) {
  card.classList.add("selected");
  // Diğer kartları seçilemez yapmak için
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((c) => {
    if (c !== card) {
      c.style.pointerEvents = "none";
    }
  });
}
