document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SORTARE ALFABETICĂ (Doar pentru pagina toate.html)
    // ==========================================================================
    // Verificăm dacă ne aflăm pe pagina "toate.html"
    if (window.location.pathname.includes("toate.html")) {
        const container = document.querySelector(".highlights-container"); // Containerul grilă
        const recipeCards = document.querySelectorAll(".highlight-card");

        if (container && recipeCards.length > 0) {
            // Transformăm NodeList-ul de carduri într-un Array normal ca să îl putem sorta
            const cardsArray = Array.from(recipeCards);

            // Sortăm cardurile în funcție de textul din interiorul tag-ului h3
            cardsArray.sort((cardA, cardB) => {
                const titleA = cardA.querySelector("h3").textContent.trim().toLowerCase();
                const titleB = cardB.querySelector("h3").textContent.trim().toLowerCase();
                
                // Folosim localeCompare pentru a sorta corect inclusiv diacriticele românești (Ă, Â, Î, Ș, Ț)
                return titleA.localeCompare(titleB, 'ro');
            });

            // Ștergem cardurile nesortate din container
            container.innerHTML = "";

            // Adăugăm înapoi cardurile în noua lor ordine alfabetică
            cardsArray.forEach(card => container.appendChild(card));
        }
    }

    // ==========================================================================
    // 2. LOGICA PENTRU SEARCH SPECIFIC PE CATEGORIE (LA ENTER / CLICK)
    // ==========================================================================
    const searchInput = document.getElementById("recipe-search");
    const searchButton = document.querySelector(".search-btn");
    
    // ATENȚIE: Selectăm cardurile după ce s-a făcut sortarea (pentru a fi sigure că sunt în ordinea corectă)
    function executeCategorySearch() {
        const recipeCards = document.querySelectorAll(".highlight-card");
        const noResultsMessage = document.getElementById("no-results-message");
        
        // 1. Luăm textul căutat și eliminăm diacriticele
        const searchText = searchInput.value
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        let visibleCardsCount = 0; // Un contor ca să numărăm rețetele găsite

        recipeCards.forEach(card => {
            const titleElement = card.querySelector("h3");
            
            if (titleElement) {
                const recipeTitle = titleElement.textContent
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                // 2. Verificăm potrivirea
                if (recipeTitle.includes(searchText)) {
                    card.style.display = "block"; 
                    visibleCardsCount++; // Am găsit o rețetă validă, o numărăm
                } else {
                    card.style.display = "none"; 
                }
            }
        });

        // 3. Dacă contorul a rămas 0, înseamnă că nu s-a potrivit nimic
        if (noResultsMessage) {
            if (visibleCardsCount === 0) {
                noResultsMessage.style.display = "block"; // Afișăm mesajul de eroare
            } else {
                noResultsMessage.style.display = "none";  // Ascundem mesajul dacă avem rezultate
            }
        }
    }
    if (searchButton) {
        searchButton.addEventListener("click", executeCategorySearch);
    }

    if (searchInput) {
        searchInput.value = ""; 
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                executeCategorySearch();
            }
        });
    }

    // ==========================================================================
    // 3. LOGICA TA EXISTENTĂ PENTRU NAVIGARE (BUTOANE)
    // ==========================================================================
    const buttons = document.querySelectorAll('.quick-tags .tag-btn');

    const paginiCorespondente = {
        "Toate": "toate.html",
        "🍗 Pui": "pui.html",
        "🥔 Garnituri": "garnituri.html",
        "🥦 Quick & Healthy": "veggie.html",
        "🍰 Deserturi": "deserturi.html",
        "⭐️ Pagina de Start": "index.html"
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const textButon = button.textContent.trim();
            const paginaDestinatie = paginiCorespondente[textButon];

            if (paginaDestinatie) {
                window.location.href = paginaDestinatie;
            } else {
                console.error("Nu am găsit o pagină asociată cu textul:", textButon);
            }
        });
    });
});
