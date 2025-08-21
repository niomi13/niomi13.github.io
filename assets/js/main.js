/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

/* ===== JAVANESE CALENDAR (Hari, Pasaran, Wuku, Mangsa) ===== */
const HARI = ["ꦱꦼꦤꦺꦤ꧀", "ꦱꦼꦭꦱ", "ꦉꦧꦺꦴ", "ꦏꦼꦩꦶꦱ꧀", "ꦗꦼꦩꦸꦮꦃ", "ꦱꦼꦠꦸ", "ꦔꦏꦢ꧀"];
const PASARAN = ["ꦏ꧀ꦭꦶꦮꦺꦴꦤ꧀", "ꦊꦒꦶ", "ꦥꦲꦶꦁ", "ꦥꦺꦴꦤ꧀", "ꦮꦒꦺ"];
const WUKU = ["ꦝꦸꦏꦸꦠ꧀", "ꦮꦠꦸꦒꦸꦤꦸꦁ", "ꦱꦶꦤ꧀ꦠ", "ꦭꦤ꧀ꦢꦼꦥ꧀", "ꦮꦸꦏꦶꦂ", "ꦏꦸꦫꦤ꧀ꦠꦶꦭ꧀", "ꦠꦺꦴꦭꦸ", "ꦒꦸꦩ꧀ꦧꦽꦒ꧀", "ꦮꦫꦶꦒ꧀ꦲꦭꦶꦠ꧀", "ꦮꦫꦶꦒ꧀ꦲꦒꦸꦁ", "ꦗꦸꦭꦸꦁꦮꦔꦶ", "ꦱꦸꦁꦱꦁ", "ꦒꦭꦸꦁꦔꦤ꧀", "ꦏꦸꦤꦶꦁꦔꦤ꧀", "ꦭꦁꦏꦶꦂ", "ꦩꦟ꧀ꦝꦱꦶꦪ", "ꦗꦸꦭꦸꦁꦥꦸꦗꦸꦢ꧀", "ꦥꦲꦁ", "ꦏꦸꦫꦸꦮꦼꦭꦸꦠ꧀", "ꦩꦫꦏꦺꦃ", "ꦠꦩ꧀ꦧꦶꦂ", "ꦩꦼꦝꦁꦏꦸꦁꦔꦤ꧀", "ꦩꦏ꧀ꦠꦭ꧀", "ꦮꦸꦪꦺ", "ꦩꦤꦲꦶꦭ꧀", "ꦥꦿꦁꦧꦏꦠ꧀", "ꦧꦭ", "ꦮꦸꦒꦸ", "ꦮꦪꦁ", "ꦏꦸꦭꦮꦸ"];
const WINDU = ["ꦄꦭꦶꦥ꧀", "ꦌꦲꦺ", "ꦗꦶꦩ꧀ꦩꦮꦭ꧀", "ꦗꦺ", "ꦢꦭ꧀", "ꦧꦺ", "ꦮꦮꦸ", "ꦗꦶꦩ꧀ꦩꦏꦶꦂ"];
const MANGSA = [
    { name: "ꦏꦥꦶꦠꦸ", d: 43 }, { name: "ꦏꦮꦺꦴꦭꦸ", d: 26 }, { name: "ꦏꦱꦔ", d: 25 }, { name: "ꦏꦱꦥꦸꦭꦸꦃ", d: 24 },
    { name: "ꦏꦱꦮꦼꦭꦱ꧀", d: 23 }, { name: "ꦰꦝ꧀ꦢ꧀ꦮ", d: 41 }, { name: "ꦏꦱ", d: 41 }, { name: "ꦏꦫꦺꦴ", d: 23 },
    { name: "ꦏꦠꦶꦒ", d: 24 }, { name: "ꦏꦥꦠ꧀", d: 25 }, { name: "ꦏꦭꦶꦩ", d: 27 }, { name: "ꦏꦤꦼꦩ꧀", d: 43 }
];

function julianDay(date) {
    const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
    const a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}
function pasaranIndex(date) { return (julianDay(date) + 1) % 5; }

// Referensi: 26 Jan 2025 (Minggu) = Wuku Dukut
function wukuIndex(date) {
    const ref = new Date(Date.UTC(2025, 0, 26));
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - ref.getTime()) / oneDay);
    const weeks = Math.trunc(diffDays / 7);
    return ((weeks % 30) + 30) % 30;
}

// Mangsa: hari pertama 21 Des 2024 (Kapitu)
function mangsaName(date) {
    const ref = new Date(Date.UTC(2024, 11, 21));
    const oneDay = 24 * 60 * 60 * 1000;
    let diff = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - ref.getTime()) / oneDay);
    const y = date.getFullYear();
    const leap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    const durations = MANGSA.map((m, i) => ({ ...m, d: (leap && i === 7) ? 27 : m.d }));
    const total = durations.reduce((s, m) => s + m.d, 0);
    if (diff < 0) diff = ((diff % total) + total) % total;
    for (let i = 0; i < durations.length; i++) { if (diff < durations[i].d) return durations[i].name; diff -= durations[i].d; }
    return durations[durations.length - 1].name;
}

function javaneseDate(date) {
    const adj = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    const dina = (date.getDay() + 6) % 7; // Sen=0..Ming=6
    const hari = HARI[dina];
    const pIdx = pasaranIndex(date);
    const pasaran = PASARAN[pIdx];
    const wuku = WUKU[wukuIndex(date)];

    // Hijriah -> Jawa (≈ Umm al-Qura + 512)
    let jd = 0, jm = 0, jy = 0;
    try {
        const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', year: 'numeric' }).formatToParts(adj)
            .filter(p => p.type !== 'literal');
        const mp = Object.fromEntries(parts.map(p => [p.type, p.value]));
        jd = parseInt(mp.day, 10); jm = parseInt(mp.month, 10); jy = parseInt(mp.year, 10) + 512;
    } catch (_) {
        jd = adj.getDate(); jm = adj.getMonth() + 1; jy = adj.getFullYear() + 512; // fallback
    }

    const sasi = ["ꦱꦸꦫ", "ꦱꦥꦂ", "ꦩꦸꦭꦸꦢ꧀", "ꦧꦏ꧀ꦢꦩꦸꦭꦸꦢ꧀", "ꦗꦸꦩꦢꦶꦭ꧀ꦭꦮꦭ꧀", "ꦗꦸꦩꦢꦶꦭ꧀ꦭꦏꦶꦂ", "ꦫꦼꦗꦼꦧ꧀", "ꦫꦸꦮꦃ", "ꦥꦱ", "ꦱꦮꦭ꧀", "ꦱꦼꦭ", "ꦧꦼꦱꦂ"][(Math.max(1, Math.min(12, jm))) - 1];
    const windu = WINDU[((jy - 1555) % 8 + 8) % 8];
    const tanggalStr = `꧇${jd}꧇ ${sasi} ${windu} ꧇${jy}꧇`;
    const mangsa = mangsaName(date);

    return { hari, pasaran, tanggalStr, wuku, mangsa };
}

function renderJavaneseBar() {
    const d = new Date();
    const c = javaneseDate(d);
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('jawa-hari', c.hari);
    set('jawa-pasaran', c.pasaran);
    set('jawa-tanggal', c.tanggalStr);
    set('jawa-wuku', c.wuku);
    set('jawa-mangsa', c.mangsa);
}

renderJavaneseBar();
// Refresh saat pergantian hari
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) renderJavaneseBar();
}, 60 * 1000);
