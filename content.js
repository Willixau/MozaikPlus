(function() {
    'use strict';
    const styleCacheMenu = document.createElement('style');
    styleCacheMenu.innerHTML = `div[data-composante="utilisateur"] ul { display: none !important; }`;
    document.head.appendChild(styleCacheMenu);

    const styleRipple = document.createElement('style');
styleRipple.innerHTML = `
    /* La base indispensable pour que la vague ne déborde pas du bouton */
    .btn-willixau-ripple {
        position: relative;
        overflow: hidden;
        cursor: pointer; /* Pour avoir la petite main */
    }

    /* Le cercle de la vague */
    .btn-willixau-ripple .ripple {
        background-color: rgba(255, 255, 255, 0.4); /* Blanc semi-transparent */
        border-radius: 50%;
        pointer-events: none; /* Pour ne pas bloquer les clics */
        position: absolute;
        transform: scale(0);
    }

    /* L'animation d'expansion */
    .btn-willixau-ripple .ripple.start {
        transform: scale(0.2);
    }

    .btn-willixau-ripple .ripple.active {
        transform: scale(2.5); /* S'agrandit pour couvrir tout le bouton */
        transition: transform 600ms, opacity 600ms;
        opacity: 0; /* Disparaît doucement à la fin */
    }
`;
document.head.appendChild(styleRipple);

    const styleIcones = document.createElement('style');
    styleIcones.innerHTML = `
        /* --- NOUVEAU : On verrouille la position parente --- */
        li.listeCours__item { position: relative; }
        div.detailCours__matiere { position: relative; }

        /* -- Icône dans la barre latérale -- */
        li.listeCours__item::before {
            content: "";
            position: absolute;
            background-image: var(--icone-matiere, url('https://static.wixstatic.com/media/08b457_9ed4249d82e14cd3989eaef645f92369~mv2.png'));
            background-repeat: no-repeat;
            height: 100%;
            width: 12%;
            background-size: 30px;
            margin: 8px;
            user-select: none;
            z-index: 10;
            pointer-events: none;
        }

        /* -- Icône dans l'en-tête du cours -- */
        div.detailCours__matiere::before {
            content: "";
            position: absolute;
            background-image: var(--icone-matiere, url('https://static.wixstatic.com/media/08b457_9ed4249d82e14cd3989eaef645f92369~mv2.png'));
            background-repeat: no-repeat;
            height: 100%;
            width: 12%;
            background-size: 30px;
            margin-left: 10px;
            margin-top: -2px;
            user-select: none;
            z-index: 10;
            pointer-events: none;
        }

        /* -- Ajustements pour éviter que le texte chevauche l'icône -- */
        a.coursItem__description {
            padding-left: 50px !important;
            position: relative;
            z-index: 1;
        }
        div.detailCours__matiere {
            position: relative;
            z-index: 1;
        }
    `;
    document.head.appendChild(styleIcones);

    const dictionnaireIcones = {
    "français": "https://static.wixstatic.com/media/08b457_5aa7f40bde8b410a90684c60c4709f01~mv2.png",
    "math": "https://static.wixstatic.com/media/08b457_b946423ef5fa4f519daabbda0cce1d1f~mv2.png",
    "anglais": "https://static.wixstatic.com/media/08b457_122545db5c44441bafd011d59ed3fd8f~mv2.png",
    "science": "https://static.wixstatic.com/media/08b457_f1ec8722305445e09ea78179edc72762~mv2.png",
    "chimi": "https://static.wixstatic.com/media/08b457_f1ec8722305445e09ea78179edc72762~mv2.png",
    "histoire": "https://static.wixstatic.com/media/08b457_8e24ec27df9943e08cc6bc9b0ba19bdf~mv2.png",
    "art": "https://static.wixstatic.com/media/08b457_a7cadb58ae78499bb34ad15029ba2f60~mv2.png",
    "éducation physique": "https://static.wixstatic.com/media/08b457_63233821abcb45bd87352902e0056867~mv2.png",
    "sport": "https://static.wixstatic.com/media/08b457_63233821abcb45bd87352902e0056867~mv2.png",
    "citoyenneté": "https://static.wixstatic.com/media/08b457_acecbd5bf08548abaf2e51ccea9b0174~mv2.png",
    "musique": "https://static.wixstatic.com/media/08b457_e35d7fafa8204ca49e8a559daeaff246~mv2.png",
    "financ": "https://static.wixstatic.com/media/08b457_2babd0c01d8a4c569c7ac086a143ef06~mv2.png",
    "informa": "https://static.wixstatic.com/media/08b457_127c6c540c47473baf1d8f3edeb26633~mv2.png",
    "religi": "https://static.wixstatic.com/media/08b457_2b0b384f2f134db4bca9d3730e2f0599~mv2.png",
    "géo": "https://static.wixstatic.com/media/08b457_6a3c8f51ac71449f85d633d3d224a92e~mv2.png",
    "contempora": "https://static.wixstatic.com/media/08b457_6a3c8f51ac71449f85d633d3d224a92e~mv2.png"
};

function obtenirIconeMatiere(texteMatiere) {
    let texte = texteMatiere.toLowerCase();
    for (const [matiere, url] of Object.entries(dictionnaireIcones)) {
        if (texte.includes(matiere)) {
            return url;
        }
    }
    return null; // Retourne null pour garder le livre par défaut
}

    const styleSpoiler = document.createElement('style');
    styleSpoiler.innerHTML = `
        .note-masquee { background-color: #cbd5e1 !important; border-radius: 6px; cursor: pointer; padding: 0 4px; transition: background-color 0.2s ease; }
        .note-masquee, .note-masquee * { color: transparent !important; }
        .note-masquee:hover { background-color: #94a3b8 !important; }
        .note-revelee { background-color: transparent !important; cursor: default; }
    `;
    document.head.appendChild(styleSpoiler);

    const styleErreur = document.createElement('style');
    styleErreur.innerHTML = `
        .willixau-error-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999999; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background-color: rgba(15, 23, 42, 0.2); animation: fadeIn 0.5s ease-out; font-family: 'Segoe UI', Roboto, 'Rubik', sans-serif; }
        .error-card { background: rgba(255, 255, 255, 0.95); padding: 40px 30px; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border-top: 5px solid #0A68F5; width: 90%; max-width: 500px; box-sizing: border-box; text-align: center; animation: slideUp 0.4s ease-out; }
        @media (max-width: 480px) { .error-card { padding: 30px 20px; } .error-card h1 { font-size: 1.5em; } }
        .error-card h1 { color: #0f172a; font-size: 1.8em; margin-top: 0; margin-bottom: 10px; font-weight: 600; }
        .error-card p { color: #64748b; font-size: 1.1em; line-height: 1.5; margin: 15px 0; padding-right: 10px; padding-left: 10px; }
        .status-badge { display: inline-block; background-color: #ff5c5c; color: #ef4444; padding: 5px 12px; border-radius: 20px; font-size: 0.9em; font-weight: bold; margin-bottom: 20px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(styleErreur);

    const styleCorbeille = document.createElement('style');
    styleCorbeille.innerHTML = `
        @keyframes slideOutRight {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes slideInLeft {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes collapseSpace {
            100% {
                max-height: 0;
                padding-top: 0;
                padding-bottom: 0;
                margin-top: 0;
                margin-bottom: 0;
                opacity: 0;
                overflow: hidden;
                border: none;
            }
        }

        .anim-collapse-space {
            animation: collapseSpace 0.3s forwards ease-in-out;
            overflow: hidden;
        }
        .anim-slide-out { animation: slideOutRight 0.3s forwards ease-in-out; }
        .anim-slide-in { animation: slideInLeft 0.3s forwards ease-in-out; }

        /* --- Icône de la corbeille dans l'entête --- */
        .btn-entete-corbeille {
            width: 22px; height: 22px; cursor: pointer; margin-left: auto; opacity: 0.6; transition: opacity 0.2s;
            background-image: url('https://static.wixstatic.com/media/08b457_7aa5a6dbef7b42acad160084cf7fdcd4~mv2.png');
            background-size: contain; background-repeat: no-repeat;
        }
        .btn-entete-corbeille:hover { opacity: 1; }
        [data-theme="dark"] .btn-entete-corbeille {
            background-image: url('https://static.wixstatic.com/media/08b457_96babe79c0d34c8196f6699190e9a3a0~mv2.png');
        }

        /* --- Boutons X et Restaurer --- */
        .publicationEleve { position: relative !important; padding-bottom: 10px; }

        .btn-action-msg {
            cursor: pointer; background: none; border: none; font-family: 'Rubik', sans-serif;
            border-radius: 6px; display: inline-flex; align-items: center; justify-content: center;
            position: absolute; bottom: 12px; right: 12px; z-index: 10; transition: background-color 0.2s, opacity 0.2s;
        }

        /* Mode Supprimer (X) */
        .btn-action-msg.btn-delete { color: #ef4444; font-weight: bold; font-size: 16px; width: 35px; height: 35px; background: rgba(239, 68, 68, 0.1); transition: transform 0.2s ease, background-color 0.25s ease-in-out !important; }
        .btn-action-msg.btn-delete:hover { opacity: 1; background: rgba(239, 68, 68, 0.2); }

        /* Mode Restaurer */
        .btn-action-msg.btn-restore { background-color: #0A68F5; color: white; padding: 6px 12px; font-size: 12px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: transform 0.2s ease, background-color 0.25s ease-in-out !important; }
        .btn-action-msg.btn-restore:hover { background-color: #0855c4; }

        /* --- LA MAGIE DE L'AFFICHAGE --- */
        .msg-willixau-cache { display: none !important; }
        .detail__message.vue-corbeille .msg-willixau-cache { display: block !important; }
        .detail__message.vue-corbeille li:not(.msg-willixau-cache) { display: none !important; }

        /* Cacher/Afficher le bouton retour */
        #btn-retour-corbeille { display: none; background: url('https://static.wixstatic.com/media/08b457_b8a9e3c1b24b4cc8a856731f64143ffd~mv2.png'); border: none; cursor: pointer; color: #64748b; font-weight: bold; margin-left: auto; }
        .detail__message.vue-corbeille #btn-retour-corbeille { display: block; }
        .detail__message.vue-corbeille .btn-entete-corbeille { display: none; }
        [data-theme="dark"] #btn-retour-corbeille { background: url('https://static.wixstatic.com/media/08b457_26fec12b03494f80b3d0139d6f13ba08~mv2.png'); }

        /* Placeholder de messages vides */
        .message-placeholder {
            display: none;
            text-align: center;
            color: #64748b;
            margin-top: 40px;
            font-family: 'Rubik', sans-serif;
            padding: 20px;
            font-weight: normal !important;
        }
    `;
    document.head.appendChild(styleCorbeille);

    // --- B. LOGIQUE DES THÈMES ---
    function appliquerTheme(id) {
        document.body.setAttribute('data-theme', id);
        localStorage.setItem('mozaikTheme', id);
        if (typeof AndroidBridge !== 'undefined') {
            AndroidBridge.updateSystemBars(id === 'light');
        }
    }

    let themeActuel = localStorage.getItem('mozaikTheme') || 'light';
    if (themeActuel === 'colorful') themeActuel = 'light';
    appliquerTheme(themeActuel);

    // --- C. BYPASS ESPACES DE TRAVAIL ---
    let bypassInterval = null;
    let espacesActifs = localStorage.getItem('mozaikEspacesActifs') !== 'false';

    function demarrerBypass() {
        if (bypassInterval) return;
        bypassInterval = setInterval(() => {
            const tuilesTextes = document.querySelectorAll('span.texte');
            for (let span of tuilesTextes) {
                if (span.textContent.trim() === 'Élève') {
                    const boutonEleve = span.closest('a');
                    if (boutonEleve) {
                        boutonEleve.click();
                        clearInterval(bypassInterval);
                        bypassInterval = null;
                        console.log("Bypass Espaces de Travail activé");
                    }
                    break;
                }
            }
        }, 50);
    }

    if (!espacesActifs) demarrerBypass();

// --- INJECTION DE FONT AWESOME (Pour ta flèche de retour) ---
    // On vérifie si FontAwesome est déjà sur la page, sinon on l'ajoute
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // --- D. CRÉATION DES MODALES ---

    function creerMenu(id, titre, aBoutonRetour = false, actionRetour = null) {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'willixau-modal-overlay'; // CLASSE AJOUTÉE
        modal.style.cssText = `display: none; position: fixed; z-index: 10001; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); align-items: center; justify-content: center; backdrop-filter: blur(3px);`;

        const content = document.createElement('div');
        content.id = `${id}-content`; // ID DYNAMIQUE (ex: settings-modal-willixau-content)
        content.className = 'willixau-modal-box'; // CLASSE AJOUTÉE
        content.style.cssText = `position: relative; background-color: white !important; padding: 45px 25px 25px 25px; border-radius: 15px; width: 320px; box-sizing: border-box; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); font-family: 'Rubik', sans-serif;`;

        // 🟧 INTÉGRATION DE TON BOUTON RETOUR FONT AWESOME
        if (aBoutonRetour) {
            const btnBack = document.createElement('button');
            btnBack.id = `${id}-btn-retour`; // ID AJOUTÉ
            btnBack.className = "back-btn btn-press"; // TES CLASSES PERSONNELLES
            btnBack.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';

            // On garde les styles inline de base, mais le !important force la couleur sombre
            btnBack.style.cssText = `position: absolute; top: 12px; left: 12px; background-color: transparent; border: none; color: #333 !important; width: 40px; height: 40px; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s ease; z-index: 10;`;

            // Simulation du :hover
            btnBack.onmouseenter = () => {
                btnBack.style.backgroundColor = 'rgba(97, 97, 97, 0.2)';
                btnBack.style.transform = 'scale(1.1)';
            };
            btnBack.onmouseleave = () => {
                btnBack.style.backgroundColor = 'transparent';
                btnBack.style.transform = 'scale(1)';
            };

            btnBack.onclick = (e) => {
                e.stopPropagation();
                if (actionRetour) actionRetour();
            };
            content.appendChild(btnBack);
        }

        const titleEl = document.createElement('h3');
        titleEl.id = `${id}-title`; // ID AJOUTÉ
        titleEl.className = 'willixau-modal-title'; // CLASSE AJOUTÉE
        // On force la couleur avec !important pour bloquer le thème de Mozaïk
        titleEl.style.cssText = `margin-top:0; color: #333 !important; margin-bottom: 20px; font-size: 22px;`;
        titleEl.textContent = titre;

        content.appendChild(titleEl);
        modal.appendChild(content);
        document.body.appendChild(modal);

        modal.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

        return { modal, content };
    }

    function ajouterBouton(conteneur, label, emoji, actionClick, customId = "") {
        const btn = document.createElement('button');
        if (customId) btn.id = customId; // ID OPTIONNEL
        btn.className = 'willixau-bouton-classique'; // CLASSE AJOUTÉE
        btn.innerHTML = `${emoji} ${label}`;
        btn.style.cssText = `display: block; width: 100%; margin: 10px 0; padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f9f9f9 !important; font-weight: bold; transition: 0.2s; color: #333 !important; font-family: 'Rubik', sans-serif; font-size: 15px; box-sizing: border-box;`;

        btn.onclick = (e) => { e.stopPropagation(); actionClick(); };
        btn.onmouseenter = () => btn.style.backgroundColor = '#eaeaea';
        btn.onmouseleave = () => btn.style.backgroundColor = '#f9f9f9';

        conteneur.appendChild(btn);
        return btn;
    }

    function ajouterDropdown(conteneur, label, emoji, options, valeurActuelle, actionChange, customId = "") {
        const row = document.createElement('div');
        if (customId) row.id = `${customId}-container`;
        row.className = 'willixau-dropdown-container';
        row.style.cssText = `display: flex; justify-content: space-between; align-items: center; width: 100%; margin: 10px 0; padding: 10px 15px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9 !important; font-family: 'Rubik', sans-serif; font-size: 14px; box-sizing: border-box;`;

        const labelDiv = document.createElement('div');
        labelDiv.className = 'willixau-dropdown-label';
        labelDiv.innerHTML = `${emoji} <strong>${label}</strong>`;
        labelDiv.style.cssText = `color: #333 !important;`; // Force le texte en noir

        const select = document.createElement('select');
        if (customId) select.id = customId;
        select.className = 'willixau-dropdown-select';
        select.style.cssText = `border: 1px solid #ccc; border-radius: 5px; padding: 5px; background: white !important; font-family: 'Rubik', sans-serif; font-size: 14px; cursor: pointer; outline: none; color: #333 !important; font-weight: bold;`; // Force le texte du dropdown en noir

        options.forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.textContent = opt.text;
            if (opt.value === valeurActuelle) optionEl.selected = true;
            select.appendChild(optionEl);
        });

        select.onchange = (e) => actionChange(e.target.value);

        row.appendChild(labelDiv);
        row.appendChild(select);
        conteneur.appendChild(row);

        return select;
    }

    // --- INITIALISATION DES MENUS ---
    const menuPrincipal = creerMenu('menu-principal-willixau', 'Options', false);
    const menuModal = menuPrincipal.modal;

    const menuParametres = creerMenu('settings-modal-willixau', 'Paramètres', true, () => {
        menuParametres.modal.style.display = 'none';
        menuPrincipal.modal.style.display = 'flex';
    });

    const themeSauvegarde = localStorage.getItem('theme-mozaik') || 'light';

    ajouterDropdown(
        menuParametres.content,
        'Thème',
        '🎨',
        [ {text: 'Clair', value: 'light'}, {text: 'Sombre', value: 'dark'} ],
        themeSauvegarde,
        (nouvelleValeur) => {
            localStorage.setItem('theme-mozaik', nouvelleValeur);
            appliquerTheme(nouvelleValeur);
        },
        'dropdown-theme-willixau'
    );

    ajouterDropdown(
        menuParametres.content,
        'Espaces de travail',
        '📁',
        [ {text: 'Désactivé', value: 'false'}, {text: 'Activé', value: 'true'} ],
        espacesActifs ? 'true' : 'false',
        (nouvelleValeur) => {
            espacesActifs = (nouvelleValeur === 'true');
            localStorage.setItem('mozaikEspacesActifs', espacesActifs);
            btnEspaces.style.display = espacesActifs ? 'block' : 'none';
            if (!espacesActifs) { demarrerBypass(); } else { if (bypassInterval) { clearInterval(bypassInterval); bypassInterval = null; } }
        },
        'dropdown-espaces-willixau'
    );

    function obtenirLangueActuelle() {
        const url = window.location.href.toLowerCase();
        if (url.includes('/en/')) return 'en';
        if (url.includes('/fr/')) return 'fr';
      
        const textePage = document.body.innerText || "";
        if (textePage.includes('Latest Mark') || textePage.includes('Attendance') || textePage.includes('Sign out')) {
            return 'en';
        }

        const htmlLang = document.documentElement.lang.toLowerCase();
        if (htmlLang.startsWith('en')) return 'en';

        return 'none';
    }

    const langueInitiale = obtenirLangueActuelle();

    ajouterDropdown(
        menuParametres.content,
        'Langue',
        '🌐',
        [ {text: 'Sélectionner', value: 'none'}, {text: 'Français', value: 'fr'}, {text: 'English', value: 'en'} ],
        langueInitiale,
        (nouvelleValeur) => {
            const dropdownElement = document.getElementById('dropdown-langue-willixau');
        if (dropdownElement) {
            const selectHTML = dropdownElement.querySelector('select') || dropdownElement;
            if (selectHTML && selectHTML.options && selectHTML.options[0].value === 'none') {
                selectHTML.remove(0);
            }
        }
            const vraieLangueActuelle = obtenirLangueActuelle();
            if (nouvelleValeur !== vraieLangueActuelle) {
                const btnLangue = document.querySelector('a.langue');
                if (btnLangue) btnLangue.click();
            }
        },
        'dropdown-langue-willixau'
    );

    ajouterBouton(menuPrincipal.content, 'Mon profil', '👤', () => { document.querySelector('#monProfil button')?.click(); menuPrincipal.modal.style.display = 'none'; }, 'btn-profil2-willixau');

    const btnEspaces = ajouterBouton(menuPrincipal.content, 'Espaces de travail', '📁', () => { document.querySelector('#changerSelection button')?.click(); menuPrincipal.modal.style.display = 'none'; }, 'btn-espaces-willixau');
    btnEspaces.style.display = espacesActifs ? 'block' : 'none';

    ajouterBouton(menuPrincipal.content, 'Paramètres', '⚙️', () => {
        menuPrincipal.modal.style.display = 'none';
        menuParametres.modal.style.display = 'flex';
    }, 'btn-parametres-willixau');

    ajouterBouton(menuPrincipal.content, 'Déconnexion', '⬅️', () => { document.querySelector('#deconnexion button')?.click(); menuPrincipal.modal.style.display = 'none'; }, 'btn-deconnexion-willixau');

    function obtenirCouleur(pourcentage) {
        if (pourcentage <= 44) return "#FF1F0A";
        if (pourcentage <= 49) return "#FF330A";
        if (pourcentage <= 54) return "#FF5C0A";
        if (pourcentage <= 59) return "#FF850A";
        if (pourcentage <= 64) return "#FFD70A";
        if (pourcentage <= 69) return "#D9D90B";
        if (pourcentage <= 74) return "#AEFF0A";
        if (pourcentage <= 79) return "#5CFF0A";
        if (pourcentage <= 84) return "#0AFF5C";
        if (pourcentage <= 89) return "#0AFFAE";
        if (pourcentage <= 94) return "#0AFFD7";
        if (pourcentage <= 99) return "#0AFFFF";
        return "#0A68F5";
    }

    setInterval(function() {
        // 1. Bouton Options
        const navUl = document.querySelector('[data-control="outilOnglets"] nav ul') || document.querySelector('div nav ul');
        if (navUl && !document.getElementById('btn-profil-willixau')) {
            const btnProfil = document.createElement('li');
            btnProfil.id = 'btn-profil-willixau';
            btnProfil.className = 'menuEleve__Item--4';
            btnProfil.innerHTML = `
                <a href="#" style="display:flex; align-items:center; text-decoration:none; width:100%;">
                    <div id="OptionsIcon" style="min-width: 25px; height: 25px; flex-shrink: 0; background-image: url('https://static.wixstatic.com/media/08b457_eaf376439e59437f89f9d6fd2254ca79~mv2.png'); background-size: cover; margin-left: 5px;"></div>
                    <span id="OptionsText">Options</span>
                </a>
            `;
            btnProfil.onclick = (e) => { e.preventDefault(); e.stopPropagation(); menuModal.style.display = 'flex'; };
            navUl.appendChild(btnProfil);
        }

        // 2. Les Ressources
        const listeRegroupements = document.querySelector('li.ressources__liste__regroupement')?.parentNode;
        if (listeRegroupements && !document.getElementById('ressources-willixau')) {
            const monGroupe = document.createElement('li');
            monGroupe.id = 'ressources-willixau';
            monGroupe.innerHTML = `
                <div>
                    <h3 style="font-family: 'Rubik', sans-serif; padding-top: 15px;">Outils de l'élève</h3>
                    <ul>
                        <li class="ressources__liste__listeRessources__ressource">
                            <div class="lienExterne"><a class="lienExterne__lien" href="https://admin.biblius.ca/authentications/grics" target="_blank"><div class="lienExterne__image" style="background-color: #f5f5f5;"><img src="https://projetbiblius.ca/wp-content/uploads/2019/07/logo-biblius-1.png" style="width: 35px; opacity: 0.8;"></div><span class="lienExterne__lien__texte">Biblius</span></a></div>
                        </li>
                        <li class="ressources__liste__listeRessources__ressource">
                            <div class="lienExterne"><a class="lienExterne__lien" href="https://reperes.qc.ca/" target="_blank"><div class="lienExterne__image" style="background-color: #f5f5f5;"><img src="https://cdn.reperes.qc.ca/sites/default/files/logo.png"></div><span class="lienExterne__lien__texte">Repères</span></a></div>
                        </li>
                    </ul>
                </div>
            `;
            listeRegroupements.appendChild(monGroupe);
        }

        // 3. Colorier les notes
        document.querySelectorAll('span.noteEntiere').forEach(function(spanEntiere) {
            let boiteParente = spanEntiere.parentElement;
            let noteTexte = spanEntiere.innerText.replace(/[^0-9]/g, '');
            let spanDecimale = boiteParente.querySelector('span.noteDecimale');
            if (spanDecimale) noteTexte += "." + spanDecimale.innerText.replace(/[^0-9]/g, '');
            let noteNumerique = parseFloat(noteTexte);
            let totalSpan = boiteParente.querySelector('span.total');
            let totalValeur = totalSpan ? parseFloat(totalSpan.innerText.replace(/[^0-9,.]/g, '').replace(',', '.')) : 100;
            let signature = noteNumerique + "/" + totalValeur;

            if (boiteParente.dataset.derniereNote === signature) return;

            if (!isNaN(noteNumerique) && totalValeur > 0) {
                let pourcentage = (noteNumerique / totalValeur) * 100;
                let couleur = obtenirCouleur(pourcentage);
                boiteParente.style.color = couleur;
                boiteParente.style.fontWeight = "bold";
                Array.from(boiteParente.children).forEach(enfant => { enfant.style.color = couleur; enfant.style.fontWeight = "bold"; });
                boiteParente.dataset.derniereNote = signature;
            }
        });

        // 4. Colorier les pourcentages
        document.querySelectorAll('span.pourcent').forEach(function(spanPct) {
            let boiteParente = spanPct.parentElement;
            let textePct = boiteParente.innerText.replace(',', '.');
            let valPct = parseFloat(textePct.replace(/[^0-9.]/g, ''));
            let signaturePct = valPct.toString();

            if (boiteParente.dataset.derniereNote === signaturePct) return;

            if (!isNaN(valPct)) {
                let couleur = obtenirCouleur(valPct);
                boiteParente.style.color = couleur;
                boiteParente.style.fontWeight = "bold";
                Array.from(boiteParente.children).forEach(enfant => { enfant.style.color = couleur; enfant.style.fontWeight = "bold"; });
                boiteParente.dataset.derniereNote = signaturePct;
            }
        });

        // 5. Spoilers
        document.querySelectorAll('li.derniersResultats__unTravail').forEach(function(travail) {
            if (travail.dataset.spoilerInit) return;
            const spanEntiere = travail.querySelector('span.noteEntiere');
            const spanPct = travail.querySelector('span.pourcent');
            if (!spanEntiere) return;

            let boiteParenteNote = spanEntiere.parentElement;
            let boiteParentePct = spanPct ? spanPct.parentElement : null;

            boiteParenteNote.classList.add('note-masquee');
            if (boiteParentePct) boiteParentePct.classList.add('note-masquee');

            const revelerTout = function(e) {
                e.preventDefault(); e.stopPropagation();
                boiteParenteNote.className = 'note-revelee';
                if (boiteParentePct) boiteParentePct.className = 'note-revelee';
            };
            boiteParenteNote.addEventListener('click', revelerTout);
            if (boiteParentePct) boiteParentePct.addEventListener('click', revelerTout);
            travail.dataset.spoilerInit = "true";
        });

        const blocMessage = document.querySelector('.detail__message');
        const blocResultats = document.querySelector('.detail__resTrav');

        // 6. Réordonner les blocs
        if (blocMessage && blocResultats && blocResultats.nextElementSibling !== blocMessage) {
            blocMessage.parentNode.insertBefore(blocResultats, blocMessage);
        }

        // 7. Auto-clic sur le bouton "Voir plus" (Version Tiroir & Temps 🔓)
        const boutonVoirPlus = document.querySelector('.resultatsTravaux_etapesSectionOuvrable.voirPlus');
        if (boutonVoirPlus) {
            const estFerme = boutonVoirPlus.classList.contains('reduit') || !boutonVoirPlus.classList.contains('voirPlusOuvert');

            if (estFerme) {
                const maintenant = Date.now();
                const dernierClic = parseInt(boutonVoirPlus.dataset.dernierClic || "0", 10);

                if (maintenant - dernierClic > 800) {
                    boutonVoirPlus.dataset.dernierClic = maintenant;
                    boutonVoirPlus.click();
                    console.log("Ouverture automatique du tiroir de résultats ! 🔓");
                }
            }
        }

        // 8. Assignation dynamique des icônes de matières
document.querySelectorAll('li.listeCours__item').forEach(item => {
    let texteElement = item.querySelector('a.coursItem__description');
    if (texteElement && !item.dataset.iconeInit) {
        let urlIcone = obtenirIconeMatiere(texteElement.innerText);
        if (urlIcone) {
            item.style.setProperty('--icone-matiere', `url('${urlIcone}')`);
        }
        item.dataset.iconeInit = "true";
    }
});

document.querySelectorAll('div.detailCours__matiere').forEach(item => {
    if (!item.dataset.iconeInit) {
        let urlIcone = obtenirIconeMatiere(item.innerText);
        if (urlIcone) {
            item.style.setProperty('--icone-matiere', `url('${urlIcone}')`);
        }
        item.dataset.iconeInit = "true";
    }
});

        // 9. SYSTÈME DE CORBEILLE (MESSAGES)
        const enteteMessage = document.querySelector('.messages__entete');

        if (blocMessage && enteteMessage && !document.getElementById('btn-corbeille-main-willixau')) {

            enteteMessage.style.display = 'flex';
            enteteMessage.style.alignItems = 'center';

            const titreH2 = enteteMessage.querySelector('h2') || enteteMessage.children[0];
            const texteOriginalH2 = titreH2 ? titreH2.innerHTML : 'Messages';

            const btnCorbeille = document.createElement('div');
            btnCorbeille.id = 'btn-corbeille-main-willixau';
            btnCorbeille.className = 'btn-entete-corbeille';
            btnCorbeille.title = "Voir les messages archivés";
            enteteMessage.appendChild(btnCorbeille);

            const btnRetour = document.createElement('button');
            btnRetour.id = 'btn-retour-corbeille';
            enteteMessage.appendChild(btnRetour);

            const placeNormal = document.createElement('div');
            placeNormal.className = 'message-placeholder';
            placeNormal.innerHTML = 'Vous n\'avez aucun message.';
            blocMessage.appendChild(placeNormal);

            const placeCorbeille = document.createElement('div');
            placeCorbeille.className = 'message-placeholder';
            placeCorbeille.innerHTML = 'La corbeille est vide.';
            blocMessage.appendChild(placeCorbeille);

            btnCorbeille.onclick = () => {
                blocMessage.classList.add('vue-corbeille');
                if (titreH2) titreH2.innerHTML = '';
            };
            btnRetour.onclick = () => {
                blocMessage.classList.remove('vue-corbeille');
                if (titreH2) titreH2.innerHTML = texteOriginalH2;
            };

            setInterval(() => {
                let messagesSupprimes = JSON.parse(localStorage.getItem('mozaikMessagesSupprimes') || '[]');
                const tousLesMessages = document.querySelectorAll('.publicationEleve');
                const isTrashView = blocMessage.classList.contains('vue-corbeille');

                let countVisibleNormal = 0;
                let countVisibleArchive = 0;

                tousLesMessages.forEach(pub => {
                    const liParent = pub.closest('li');
                    if (!liParent) return;
                    const expediteur = pub.querySelector('.publicationEleve__expediteur')?.innerText || '';
                    const dateMsg = pub.querySelector('.publicationEleve__date')?.innerText || '';
                    const boutTexte = pub.querySelector('.lirePlus__texte')?.innerText.substring(0, 30) || '';
                    const msgId = btoa(encodeURIComponent(expediteur + dateMsg + boutTexte));
                    const estSupprime = messagesSupprimes.includes(msgId);

                    if (estSupprime) {
                        if (!pub.classList.contains('anim-slide-out')) {
                            liParent.classList.add('msg-willixau-cache');
                        }
                        countVisibleArchive++;
                    } else {
                        if (!pub.classList.contains('anim-slide-in')) {
                            liParent.classList.remove('msg-willixau-cache');
                        }
                        countVisibleNormal++;
                    }

                    if (!pub.querySelector('.btn-action-msg')) {
                        const btnAction = document.createElement('button');
                        btnAction.className = 'btn-action-msg';
                        pub.appendChild(btnAction);
                        btnAction.onclick = (e) => {
                            e.preventDefault(); e.stopPropagation();
                            let memoireActuelle = JSON.parse(localStorage.getItem('mozaikMessagesSupprimes') || '[]');
                            const actuellementSupprime = memoireActuelle.includes(msgId);

                            if (!actuellementSupprime) {
                                pub.classList.add('anim-slide-out');

                                setTimeout(() => {
                                    liParent.style.maxHeight = liParent.offsetHeight + 'px';
                                    liParent.classList.add('anim-collapse-space');
                                    setTimeout(() => {
                                        memoireActuelle.push(msgId);
                                        localStorage.setItem('mozaikMessagesSupprimes', JSON.stringify(memoireActuelle));
                                        liParent.classList.add('msg-willixau-cache');
                                        pub.classList.remove('anim-slide-out');
                                        liParent.classList.remove('anim-collapse-space');
                                        liParent.style.maxHeight = '';
                                    }, 325);
                                }, 10);
                            } else {
                                memoireActuelle = memoireActuelle.filter(id => id !== msgId);
                                localStorage.setItem('mozaikMessagesSupprimes', JSON.stringify(memoireActuelle));
                                liParent.classList.remove('msg-willixau-cache');
                                pub.classList.add('anim-slide-in');
                                setTimeout(() => {
                                    pub.classList.remove('anim-slide-in');
                                }, 300);
                            }
                        };
                    }

                    const btnExistant = pub.querySelector('.btn-action-msg');
                    if (btnExistant) {
                        if (estSupprime) {
                            btnExistant.innerText = '';
                            btnExistant.className = 'btn-action-msg btn-restore';
                            btnExistant.title = "Restaurer";
                        } else {
                            btnExistant.innerText = '✖';
                            btnExistant.className = 'btn-action-msg btn-delete';
                            btnExistant.title = "Archiver";
                        }
                    }
                });
                placeNormal.style.display = (countVisibleNormal === 0 && !isTrashView) ? 'flex' : 'none';
                placeCorbeille.style.display = (countVisibleArchive === 0 && isTrashView) ? 'flex' : 'none';
            }, 0);
        }
    }, 0);

    let interfaceErreurActive = false;
    setInterval(() => {
        if (!interfaceErreurActive && document.body.innerText.includes("Une erreur est survenue")) {
            interfaceErreurActive = true;
            const overlay = document.createElement('div');
            overlay.className = 'willixau-error-overlay';
            overlay.innerHTML = `
                <div class="error-card">
                    <div class="status-badge">Interruption de service</div>
                    <h1>Mozaïk Portail est temporairement indisponible</h1>
                    <p>Une erreur technique empêche actuellement le chargement de vos données scolaires.</p>
                    <p>Veuillez réessayer plus tard.</p>
                </div>
            `;
            document.body.appendChild(overlay);
        }
    }, 1000);

    const containerInfos = document.querySelector('.profilScolaire__informations');
    if (containerInfos) {
        const AvertissementThème = document.createElement("div");
        AvertissementThème.id = "AvertissementThèmeid";
        AvertissementThème.style.cssText = "padding: 10px; color: #64748b; font-weight: bold;";
        AvertissementThème.textContent = "Mozaïk Plus Suite active v10.6";
        containerInfos.appendChild(AvertissementThème);
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    const bouton = document.querySelector('button.mozaikBtn3.mini.btnFermerMessage');
    if (bouton) {
        bouton.addEventListener('click', function() {
            const boite = document.querySelector('div.boiteMessageContenu');
            if (boite) boite.style.display = 'none';
        });
    }
});

setInterval(() => {
  const elementMessage = document.querySelector('.message--avecIcone.grilleHoraire__message.message-apres-chargement--eleve.message-apres-chargement--centre');

  if (!elementMessage) return;

  const elementsAMasquer = document.querySelectorAll(
    '[data-control="outilOnglets"].menuEleve [data-valeur="mesCours"], div.detail__resTrav, div.blocAssiduite'
  );
  const texte = elementMessage.textContent.trim().replace(/[\u2019']/g, "'");
  const messageCible = "L’horaire n’est pas disponible pour le moment.".replace(/[\u2019']/g, "'");

  if (texte === messageCible) {
    elementsAMasquer.forEach(el => {
      el.style.setProperty('display', 'none', 'important');
    });
  } else {
    elementsAMasquer.forEach(el => {
      el.style.removeProperty('display');
    });
  }
}, 50);

// EFFETS BOUTONS
function appliquerEffetRipple(elementBouton) {
    let ripple = elementBouton.querySelector('.ripple');

    if (!ripple) {
        ripple = document.createElement('div');
        ripple.className = 'ripple';
        elementBouton.appendChild(ripple);
    }

    if (!elementBouton.classList.contains('willixau-ripple-applied')) {
        elementBouton.classList.add('willixau-ripple-applied');
        elementBouton.classList.add('btn-willixau-ripple');
        elementBouton.draggable = false;
        elementBouton.style.userSelect = 'none';

        let timerId;

        const mouseDownHandler = (e) => {
            clearTimeout(timerId);
            const rect = elementBouton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const currentRipple = elementBouton.querySelector('.ripple');
            if(currentRipple) {
                currentRipple.style.width = `${size}px`;
                currentRipple.style.height = `${size}px`;
                currentRipple.style.left = `${x}px`;
                currentRipple.style.top = `${y}px`;
                currentRipple.classList.remove('active', 'start');

                setTimeout(() => {
                    currentRipple.classList.add('start');
                    setTimeout(() => { currentRipple.classList.add('active'); }, 10);
                }, 10);
            }
        };

        const resetRipple = () => {
            clearTimeout(timerId);
            const currentRipple = elementBouton.querySelector('.ripple');
            if(currentRipple) {
                timerId = setTimeout(() => { currentRipple.classList.remove('active', 'start'); }, 500);
            }
        };

        elementBouton.addEventListener('mousedown', mouseDownHandler);
        elementBouton.addEventListener('touchstart', mouseDownHandler, {passive: true});
        elementBouton.addEventListener('mouseup', resetRipple);
        elementBouton.addEventListener('mouseleave', resetRipple);
        elementBouton.addEventListener('touchend', resetRipple);
        elementBouton.addEventListener('touchcancel', resetRipple);
    }
}

function initObserverRipple(selecteur) {
    const observer = new MutationObserver(() => {
        const boutons = document.querySelectorAll(selecteur);

        boutons.forEach((btn) => {
            // La vérification principale est ici :
            // Si le bouton n'a PAS la div ripple, OU s'il n'a PAS notre classe marqueur,
            // alors c'est que Mozaïk a altéré le bouton et on doit ré-appliquer l'effet.
            const rippleExistant = btn.querySelector('.ripple');
            const aLeMarqueur = btn.classList.contains('willixau-ripple-applied');

            if (!rippleExistant || !aLeMarqueur) {
                appliquerEffetRipple(btn);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['disabled', 'class']
    });
}

initObserverRipple('.ouverturePleinePage');
initObserverRipple('.precedentSuivant__precedent--leger');
initObserverRipple('.precedentSuivant__suivant--leger');
initObserverRipple('button.btn');
initObserverRipple('button.btn2');
initObserverRipple('button.paletteCouleur__bouton');
initObserverRipple('button.paletteDeCouleur__item');
initObserverRipple('.coursItem__description');
initObserverRipple('.willixau-bouton-classique');
initObserverRipple('.back-btn.btn-press');
initObserverRipple('.overInvisible');
initObserverRipple('.panneau__retour');
initObserverRipple('.menuEleve__Item--4');
initObserverRipple('.listeDeroulanteSelection');
initObserverRipple('.precedentSuivant__suivant--plein');
initObserverRipple('.precedentSuivant__precedent--plein');
initObserverRipple('.precedentSuivant__invisible');
initObserverRipple('button.mesBulletins_anneeSectionOuvrable.voirPlus');
initObserverRipple('.tuile__corps.icone--resultat.tuile--resultats');
initObserverRipple('.tuile__corps.icone--autobus.tuile--transport');
