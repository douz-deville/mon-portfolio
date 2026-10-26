/* ==========================================================================
   PORTFOLIO SCRIPT - AGBOGAN Kossi Christian
   Fonctionnalités : Theme Switcher, Copy Email, Copy Code, Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCopyEmail();
    initCopyCode();
    initFilters();
});

/* --------------------------------------------------------------------------
   1. Mode Sombre / Clair (Theme Switcher)
   -------------------------------------------------------------------------- */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Si tu as un bouton avec la classe .theme-toggle dans ton HTML
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/* --------------------------------------------------------------------------
   2. Copie d'adresse e-mail au clic
   -------------------------------------------------------------------------- */
function initCopyEmail() {
    const emailLinks = document.querySelectorAll('[data-email]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('data-email');
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = link.innerHTML;
                link.innerHTML = `✓ Copié !`;
                setTimeout(() => {
                    link.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Erreur lors de la copie :', err);
            });
        });
    });
}

/* --------------------------------------------------------------------------
   3. Copie rapide de commandes et blocs de code
   -------------------------------------------------------------------------- */
function initCopyCode() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Crée le bouton de copie
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = 'Copier';

        // Positionnement relatif du block pre si ce n'est pas déjà le cas dans le CSS
        block.style.position = 'relative';
        block.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
            const code = block.querySelector('code')?.innerText || block.innerText;
            
            // Retire le texte du bouton de la copie
            const cleanCode = code.replace(/Copier|Copié !/g, '').trim();

            navigator.clipboard.writeText(cleanCode).then(() => {
                copyBtn.textContent = 'Copié !';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = 'Copier';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
    });
}

/* --------------------------------------------------------------------------
   4. Filtrage dynamique des Labs / Articles
   -------------------------------------------------------------------------- */
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.case-card');

    if (filterBtns.length === 0 || cards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Mise à jour de la classe active sur les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrage des cartes
            cards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}