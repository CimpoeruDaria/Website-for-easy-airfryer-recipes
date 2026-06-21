document.addEventListener('DOMContentLoaded', () => {
    // Selectăm toate butoanele tale din HTML
    const buttons = document.querySelectorAll('.quick-tags .tag-btn');

    // Definim paginile corespondente pentru fiecare buton (folosind textul din interiorul lor)
    const paginiCorespondente = {
        "Toate": "toate.html",
        "🍗 Pui": "pui.html",
        "🥔 Garnituri": "garnituri.html",
        "🥦 Quick & Healthy": "veggie.html",
        "🍰 Deserturi": "deserturi.html",
        "⭐️ Pagina de Start": "index.html"
    };

    // Luăm la rând fiecare buton și îi adăugăm un eveniment de click
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Preluăm textul exact din interiorul butonului (inclusiv emoji-urile)
            const textButon = button.textContent.trim();

            // Căutăm pagina corespunzătoare în dicționarul nostru
            const paginaDestinatie = paginiCorespondente[textButon];

            // Dacă am găsit o pagină validă, trimitem utilizatorul acolo
            if (paginaDestinatie) {
                window.location.href = paginaDestinatie;
            } else {
                console.error("Nu am găsit o pagină asociată cu textul:", textButon);
            }
        });
    });
});