/* ==========================================================================
 *  THE SYLVAN LIBRARY - COMPLETE INTERACTIVE ENGINE
 *  Features: 2.5D Displacement, Clickable Milestones, Smart Chapter Split,
 *            Auto-Covers, & Automated Archivist Cycle Engine.
 *  ========================================================================== */

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyACGOlY9Re74qBgQCewILMFxXrc9voB9ag",
    authDomain: "sylvan-library-bde3e.firebaseapp.com",
    projectId: "sylvan-library-bde3e",
    storageBucket: "sylvan-library-bde3e.firebasestorage.app",
    messagingSenderId: "34207244217",
    appId: "1:34207244217:web:0d50a8ba83ec3d57e76068",
    measurementId: "G-NK7SXM7715"
};

// Initialize Firebase via Global CDN Compat SDK
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = typeof firebase !== 'undefined' ? firebase.firestore() : null;

document.addEventListener('DOMContentLoaded', () => {
    initPixi2DHero();
    initGlobalFireflies();
    initHeroFireflies();
    initCurrentBook();
    initArchivePage();
    initVibeStamps();
    initRecommendations();
    initArchiveTransfer();
    renderMilestones();
    initArchivistEvents();
    initArchiveModal();
    initTrial();
    initNavToggle();
});



// Global Helper: Sanitize text to prevent XSS
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, (tag) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}
/* --------------------------------------------------------------------------
 *  0. Ultra-Fast Pure CSS Parallax & Scroll Engine (No WebGL)
 *  -------------------------------------------------------------------------- */
function initPixi2DHero() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let scrollZoom = 1.05;

    const darknessOverlay = document.getElementById('darkness-overlay');

    // Mouse movement calculations
    window.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        targetX = mouseX * -25; // Pan offset
        targetY = mouseY * -25;
    });

    // Scroll zoom & darkness syncing
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        const scrollProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        scrollZoom = 1.05 + (scrollProgress * 0.12);

        if (darknessOverlay) {
            darknessOverlay.style.opacity = (0.25 + (scrollProgress * 0.65)).toString();
        }
    });

    // 60 FPS Smooth Transform Loop
    function renderParallax() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        container.style.transform = `scale(${scrollZoom}) translate3d(${currentX}px, ${currentY}px, 0)`;
        requestAnimationFrame(renderParallax);
    }

    renderParallax();
}


/* --------------------------------------------------------------------------
 *  1. Global Background Fireflies Canvas
 *  -------------------------------------------------------------------------- */
function initGlobalFireflies() {
    let container = document.getElementById('particle-canvas');
    if (!container) {
        container = document.createElement('div');
        container.id = 'particle-canvas';
        document.body.prepend(container);
    }

    let canvas = container.querySelector('canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        container.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let fireflies = [];
    const fireflyCount = 180;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class AmbientFirefly {
        constructor() { this.reset(true); }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : height + 15;
            this.radius = Math.random() * 2.8 + 1.2;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = -Math.random() * 0.5 - 0.2;
            this.alpha = Math.random() * 0.7 + 0.3;
            this.pulseSpeed = Math.random() * 0.015 + 0.005;
            this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
            this.color = Math.random() > 0.35 ? '243, 208, 104' : '255, 232, 158';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha += this.pulseSpeed * this.pulseDirection;
            if (this.alpha >= 0.95 || this.alpha <= 0.2) this.pulseDirection *= -1;
            if (this.y < -15 || this.x < -20 || this.x > width + 20) this.reset(false);
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.alpha)})`;
            ctx.fill();
            ctx.restore();
        }
    }

    function init() {
        resizeCanvas();
        fireflies = [];
        for (let i = 0; i < fireflyCount; i++) fireflies.push(new AmbientFirefly());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        fireflies.forEach(f => { f.update(); f.draw(); });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    init();
    animate();
}

/* --------------------------------------------------------------------------
 *  2. Hero Dense Embers
 *  -------------------------------------------------------------------------- */
function initHeroFireflies() {
    const heroSection = document.getElementById('sylvan-hero');
    if (!heroSection) return;

    // 💡 FIX: Auto-create firefly-canvas if missing in HTML
    let canvas = document.getElementById('firefly-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'firefly-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '4';
        heroSection.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 130;

    function resizeCanvas() {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
    }

    class Firefly {
        constructor() { this.reset(); }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = -Math.random() * 0.5 - 0.2;
            this.alpha = Math.random();
            this.fadeSpeed = Math.random() * 0.015 + 0.005;
            this.fadingIn = Math.random() > 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.fadingIn) {
                this.alpha += this.fadeSpeed;
                if (this.alpha >= 0.9) this.fadingIn = false;
            } else {
                this.alpha -= this.fadeSpeed;
                if (this.alpha <= 0.1) this.fadingIn = true;
            }
            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
                this.y = height + 10;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#f3d068';
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Firefly());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    initParticles();
    animateParticles();
}
/* --------------------------------------------------------------------------
 *  3. Vibe Stamps & Reactions (Firestore Integrated & Dynamic Book-Scoped)
 *  -------------------------------------------------------------------------- */
function initVibeStamps() {
    // 📖 Automatically read current book ID from <body data-book-id="...">
    const CURRENT_BOOK_ID = document.body.dataset.bookId || 'default-book';

    // --- A. Real-Time Firestore Vibe Stamps (Book-Scoped) ---
    const vibeButtons = document.querySelectorAll('.vibe-btn:not(.rec-vote-btn)');

    if (vibeButtons.length && db) {
        const vibeDocRef = db.collection('vibes').doc(CURRENT_BOOK_ID);

        // 1. Real-time listener: Sync live count from Firestore to UI
        vibeDocRef.onSnapshot((doc) => {
            const vibeData = doc.exists ? doc.data() : {};

            vibeButtons.forEach((btn) => {
                const vibeType = btn.dataset.vibe;
                const countSpan = btn.querySelector('.vibe-count');
                const count = vibeData[vibeType] || 0;

                if (countSpan) {
                    countSpan.textContent = `(${count})`;
                }

                // Restore highlighted state if voted on this browser
                if (localStorage.getItem(`sylvan_vibe_${CURRENT_BOOK_ID}_${vibeType}`)) {
                    btn.classList.add('active');
                }
            });
        }, (error) => console.error("Firestore Vibe Sync Error:", error));

        // 2. Click handler: Cast vote to Firestore
        vibeButtons.forEach((btn) => {
            btn.addEventListener('click', async () => {
                const vibeType = btn.dataset.vibe;
                if (!vibeType) return;

                const localVoteKey = `sylvan_vibe_${CURRENT_BOOK_ID}_${vibeType}`;

                // Prevent double-voting locally
                if (localStorage.getItem(localVoteKey)) return;

                try {
                    // Optimistic local state update
                    btn.classList.add('active');
                    localStorage.setItem(localVoteKey, 'true');

                    // Firestore atomic increment
                    await vibeDocRef.set({
                        [vibeType]: firebase.firestore.FieldValue.increment(1)
                    }, { merge: true });

                } catch (err) {
                    console.error("Error saving vibe vote:", err);
                }
            });
        });
    }

    // --- B. Firestore Write (Tagged with CURRENT_BOOK_ID) ---
    const reactionForm = document.getElementById('reaction-form');
    if (reactionForm && !reactionForm.dataset.bound) {
        reactionForm.dataset.bound = "true";
        reactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const typeSelect = document.getElementById('reaction-type');
            const textInput = document.getElementById('reaction-text');
            const authorInput = document.getElementById('reaction-author-role');

            const type = typeSelect ? typeSelect.value : 'line';
            const content = textInput ? textInput.value.trim() : '';
            const author = authorInput && authorInput.value.trim() ? authorInput.value.trim() : 'Mafer';

            if (!content) return;

            if (!db) {
                console.error("Firestore 'db' object is not initialized!");
                return;
            }

            db.collection('reactions').add({
                bookId: CURRENT_BOOK_ID,
                type: type,
                content: content,
                author: author,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((docRef) => {
                console.log(`Saved quote under [${CURRENT_BOOK_ID}] with ID:`, docRef.id);
                if (textInput) textInput.value = '';
            })
            .catch((error) => console.error("Firestore write failed:", error));
        });
    }

    // --- C. Firestore Read (Filtered by CURRENT_BOOK_ID) ---
    const linesList = document.getElementById('favorite-lines-list');
    const commentsList = document.getElementById('comments-list');

    if ((linesList || commentsList) && db) {
        db.collection('reactions')
        .where('bookId', '==', CURRENT_BOOK_ID)
        .onSnapshot((snapshot) => {
            console.log(`Fetched ${snapshot.size} annotation(s) for [${CURRENT_BOOK_ID}].`);

            if (linesList) linesList.innerHTML = '';
            if (commentsList) commentsList.innerHTML = '';

            let linesCount = 0;
            let commentsCount = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                const authorName = escapeHTML(data.author || 'Anonymous');
                const contentText = escapeHTML(data.content || '');

                if ((data.type === 'line' || data.type === 'quote') && linesList) {
                    linesCount++;
                    const li = document.createElement('li');
                    li.innerHTML = `
                    <span>"${contentText}"</span>
                    <span class="line-attribution">— Inscribed by ${authorName}</span>
                    `;
                    linesList.appendChild(li);
                } else if ((data.type === 'comment' || data.type === 'reflection') && commentsList) {
                    commentsCount++;
                    const card = document.createElement('div');
                    card.className = 'comment-card';
                    card.innerHTML = `
                    <div class="comment-header">
                    <span class="author">${authorName}</span>
                    <span class="timestamp">Inscribed</span>
                    </div>
                    <p class="comment-body">${contentText}</p>
                    `;
                    commentsList.appendChild(card);
                }
            });

            // Empty states when the tome has no inscriptions yet
            if (linesList && linesCount === 0) {
                linesList.innerHTML = '<li class="empty-state">No favorite lines inscribed yet. Leave the first mark below.</li>';
            }
            if (commentsList && commentsCount === 0) {
                commentsList.innerHTML = '<p class="empty-state">No reader notes yet. Share your thoughts below.</p>';
            }
        }, (error) => console.error("Error reading reactions snapshot:", error));
    }
}
/* --------------------------------------------------------------------------
 *  Helper: Title Case Formatter
 *  -------------------------------------------------------------------------- */
function toTitleCase(str) {
    if (!str) return '';
    return str
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/* --------------------------------------------------------------------------
 *  Helper: Recommendation Ranking (shared by the page and the season cycle)
 *  Primary: highest votes. Tie-breaker: earliest pitch.
 *  Pitches without a timestamp (books.js fallbacks) lose ties.
 *  -------------------------------------------------------------------------- */
function compareRecommendations(a, b) {
    const votesA = a.votes || 0;
    const votesB = b.votes || 0;
    if (votesB !== votesA) return votesB - votesA;

    const timeA = a.createdAt?.seconds ?? Infinity;
    const timeB = b.createdAt?.seconds ?? Infinity;
    if (timeA === timeB) return 0;
    return timeA < timeB ? -1 : 1;
}

/* --------------------------------------------------------------------------
 *  4. Recommendations & Pitch Form Submission (Firestore Integrated)
 *  -------------------------------------------------------------------------- */
function initRecommendations() {
    const recsGrid = document.querySelector('.recommendations-grid, .rec-grid');
    const recForm = document.getElementById('rec-form');

    // --- A. Submit Pitch to Firestore ---
    if (recForm && !recForm.dataset.bound) {
        recForm.dataset.bound = "true";
        recForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const rawTitle = document.getElementById('rec-title').value;
            const rawAuthor = document.getElementById('rec-author').value;
            const suggestedBy = document.getElementById('rec-by').value;
            const userCover = document.getElementById('rec-cover')?.value.trim();
            const chapters = document.getElementById('rec-chapters')?.value.trim();
            const reason = document.getElementById('rec-note').value.trim();

            const title = toTitleCase(rawTitle);
            const author = toTitleCase(rawAuthor);

            if (!title || !author || !db) return;

            const cover = userCover || "assets/books/cover-backup.webp";

            db.collection('recommendations').add({
                title: title,
                author: author,
                suggestedBy: suggestedBy,
                cover: cover,
                chapters: chapters || null,
                reason: reason,
                votes: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                recForm.reset();
                alert(`✨ "${title}" has been pitched to the circle!`);
            })
            .catch((err) => console.error("Error pitching book:", err));
        });
    }

    if (!recsGrid || !db) return;

    // --- B. Live Stream Pitches with Option A Tie-Breaker Sort ---
    db.collection('recommendations')
    .onSnapshot((snapshot) => {
        recsGrid.innerHTML = '';

        if (snapshot.empty) {
            recsGrid.innerHTML = `<p class="rec-note" style="grid-column: 1/-1; text-align: center;">No community pitches yet. Pitch a new tome above! 📜</p>`;
            return;
        }

        // Collect documents into an array for local sorting
        const recsList = [];
        snapshot.forEach((doc) => {
            recsList.push({ id: doc.id, ...doc.data() });
        });

        recsList.sort(compareRecommendations);

        // Render sorted recommendation cards
        recsList.forEach((rec) => {
            const docId = rec.id;
            const bookCover = rec.cover || "assets/books/cover-backup.webp";
            const currentVotes = rec.votes || 0;

            const myVotes = JSON.parse(localStorage.getItem('sylvan_my_votes')) || [];
            const hasVoted = myVotes.includes(docId);

            const card = document.createElement('div');
            card.className = 'rec-card';
            card.innerHTML = `
            <div style="display: flex; gap: 1rem; width: 100%;">
            <img src="${bookCover}" alt="${escapeHTML(rec.title)} Cover" class="archive-cover" />
            <div style="display: flex; flex-direction: column; flex-grow: 1;">
            <span class="rec-badge" style="align-self: flex-start; margin-bottom: 0.5rem;">Suggested by ${escapeHTML(rec.suggestedBy || 'Circle Member')}</span>
            <h3 style="margin-bottom: 0.2rem; font-size: 1.2rem;">${escapeHTML(rec.title)}</h3>
            <p class="tome-author" style="margin-bottom: 0.5rem; font-size: 0.85rem;">by ${escapeHTML(rec.author)}</p>
            ${rec.reason ? `<p class="rec-note" style="margin: 0.5rem 0 1rem; font-size: 0.8rem;">"${escapeHTML(rec.reason)}"</p>` : ''}
            <button class="vibe-btn rec-vote-btn ${hasVoted ? 'active' : ''}" style="align-self: flex-start; margin-top: auto; padding: 0.3rem 0.6rem;">
            <span class="vote-icon">${hasVoted ? '✨' : '🌙'}</span>
            <span class="vote-label">${hasVoted ? 'Voted' : 'Vote'}</span>
            <span class="vibe-count">(${currentVotes})</span>
            </button>
            </div>
            </div>
            `;

            const voteBtn = card.querySelector('.rec-vote-btn');
            voteBtn.addEventListener('click', () => toggleVote(docId, hasVoted));
            recsGrid.appendChild(card);
        });
    }, (err) => console.error("Error reading recommendations:", err));
}

/* --------------------------------------------------------------------------
 *  Recommendation Vote Toggle Engine (Firestore Integrated)
 *  -------------------------------------------------------------------------- */
async function toggleVote(docId, hasVoted) {
    if (!db) {
        console.error("Firestore 'db' object is not initialized.");
        return;
    }

    const recRef = db.collection('recommendations').doc(docId);
    let myVotes = JSON.parse(localStorage.getItem('sylvan_my_votes')) || [];

    try {
        if (hasVoted) {
            // Unvote: Decrement Firestore count by 1 & update local storage
            await recRef.update({
                votes: firebase.firestore.FieldValue.increment(-1)
            });
            myVotes = myVotes.filter(id => id !== docId);
        } else {
            // Vote: Increment Firestore count by 1 & update local storage
            await recRef.update({
                votes: firebase.firestore.FieldValue.increment(1)
            });
            myVotes.push(docId);
        }

        localStorage.setItem('sylvan_my_votes', JSON.stringify(myVotes));
    } catch (err) {
        console.error("Error toggling vote in Firestore:", err);
    }
}


/* --------------------------------------------------------------------------
 *  5. Archive Transfers & Rendering
 *  -------------------------------------------------------------------------- */
function initArchiveTransfer() {
    const archiveBtn = document.getElementById('archive-tome-btn');
    if (!archiveBtn) return;

    archiveBtn.addEventListener('click', () => {
        const title = document.querySelector('.tome-title')?.textContent.trim() || 'Untitled Tome';
        const author = document.querySelector('.tome-author')?.textContent.trim() || 'Unknown Author';
        const coverSrc = document.querySelector('.tome-cover')?.src || '';
        const dateCompleted = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        if (!db) return;

        const bookSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        db.collection('archives').add({
            bookId: bookSlug,
            title: title,
            author: author,
            cover: coverSrc,
            date: `Completed ${dateCompleted}`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            localStorage.removeItem('sylvan_vibe_counts');
            alert(`📜 "${title}" has been preserved in The Grand Archives!`);
            window.location.href = 'archive.html';
        })
        .catch((err) => console.error("Error archiving tome:", err));
    });
}


// Global map for Vibe Stamp keys to Emoji Labels
const VIBE_MAP = {
    'cozy': '☕ Cozy',
    'mindblown': '🤯 Mindblown',
    'twist': '⚡ Mind Twist',
    'devastated': '😭 Devastated',
    'intense': '🔥 Intense'
};

/* --------------------------------------------------------------------------
 *  5. Archive Transfers & Rendering (Firestore Integrated)
 *  -------------------------------------------------------------------------- */
function initArchivePage() {
    const bookshelfGrid = document.querySelector('.bookshelf-grid');
    if (!bookshelfGrid) return;

    if (!db) {
        console.error("Firestore 'db' object is not initialized.");
        return;
    }

    // Live stream archived books directly from Firestore
    db.collection('archives')
    .onSnapshot((snapshot) => {
        let firebaseArchives = [];
        snapshot.forEach((doc) => {
            firebaseArchives.push({ id: doc.id, ...doc.data() });
        });

        // Combine Firestore archives + static books.js fallback
        let baseArchives = (typeof archivedBooks !== 'undefined') ? archivedBooks : [];
        const combined = [...firebaseArchives, ...baseArchives];

        // Deduplicate by title so books don't repeat
        const uniqueArchives = combined.filter((book, index, self) =>
        index === self.findIndex((b) => b.title && b.title.trim().toLowerCase() === book.title.trim().toLowerCase())
        );

        // ✅ SORTING APPLIED HERE: Sort the deduplicated array before rendering
        uniqueArchives.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;

            if (timeA !== timeB) {
                return timeB - timeA; // Descending (newest timestamp first)
            }

            // Fallback: Parse season numbers from date string
            const seasonA = parseInt(a.date?.replace(/[^0-9]/g, ''), 10) || 0;
            const seasonB = parseInt(b.date?.replace(/[^0-9]/g, ''), 10) || 0;
            return seasonB - seasonA; // Descending (highest season number first)
        });

        bookshelfGrid.innerHTML = '';

        if (uniqueArchives.length === 0) {
            bookshelfGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No archived tomes yet.</p>';
            return;
        }

        uniqueArchives.forEach((record) => {
            const card = document.createElement('div');
            card.className = 'archive-card';

            const bookTitle = record.title || 'Untitled Tome';
            const bookSlug = record.bookId || bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            // Attach data attributes for the modal query
            card.setAttribute('data-book-id', bookSlug);
            card.setAttribute('data-book-title', bookTitle);

            // Converts 'cozy' -> '☕ Cozy' on the Archive Card
            const vibeTagsHtml = (record.vibes || []).map((vibe) => {
                const label = VIBE_MAP[vibe] || toTitleCase(vibe.replace(/-/g, ' '));
                return `<span>${escapeHTML(label)}</span>`;
            }).join('');
            const bookCover = record.cover || "assets/books/cover-backup.webp";

            card.innerHTML = `
            <img class="archive-cover" src="${bookCover}" alt="${escapeHTML(bookTitle)} Cover" />
            <div class="archive-info">
            <span class="archive-date">${escapeHTML(record.date || '')}</span>
            <h3>${escapeHTML(bookTitle)}</h3>
            <p class="tome-author">by ${escapeHTML(record.author || 'Unknown')}</p>
            <div class="vibe-tags-mini">${vibeTagsHtml}</div>
            </div>
            `;

            bookshelfGrid.appendChild(card);
        });
    }, (err) => console.error("Error loading archives from Firestore:", err));
}

/* ==========================================================================
 *   ACTIVE BOOK RENDER (FIRESTORE REAL-TIME SYNC)
 *  ========================================================================== */
function initCurrentBook() {
    const coverEl = document.querySelector('.tome-cover');
    const titleEl = document.querySelector('.tome-title');
    const authorEl = document.querySelector('.tome-author');
    const genreEl = document.querySelector('.tome-genre-tag');
    const badgeEl = document.querySelector('.badge-moon');
    const targetEl = document.getElementById('tome-target');

    function renderBookData(active) {
        if (!active) return;
        if (coverEl && active.cover) coverEl.src = active.cover;
        if (titleEl && active.title) titleEl.textContent = active.title;
        if (authorEl && active.author) authorEl.textContent = `by ${active.author}`;
        if (genreEl && active.genre) genreEl.textContent = active.genre;
        if (badgeEl && active.month) badgeEl.textContent = `🌙 Active Read • ${active.month}`;

        if (targetEl) {
            if (!active.targetDate) {
                const deadline = new Date();
                deadline.setMonth(deadline.getMonth() + 2);
                active.targetDate = deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            }
            targetEl.textContent = `📍 Target: ${active.targetDate}`;
        }

        // Dynamically set the body tag data-book-id so quotes/reactions sync automatically!
        const bookSlug = active.bookId || active.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        document.body.dataset.bookId = bookSlug;

        // Refresh Vibe Stamps listener with the updated book ID
        if (typeof initVibeStamps === 'function') {
            initVibeStamps();
        }

        // Point the Trial of the Circle at the active book
        initTrial();
    }

    // 1. Instant paint from local cache if available
    let localActive = JSON.parse(localStorage.getItem('sylvan_current_book')) || (typeof currentBook !== 'undefined' ? currentBook : null);
    if (localActive) renderBookData(localActive);

    // 2. Real-time sync from Firestore for all circle members
    if (db) {
        db.collection('settings').doc('activeBook').onSnapshot((doc) => {
            if (doc.exists) {
                const firestoreActive = doc.data();
                localStorage.setItem('sylvan_current_book', JSON.stringify(firestoreActive));
                renderBookData(firestoreActive);
            }
        }, (err) => console.error("Error reading active book from Firestore:", err));
    }
}

/* --------------------------------------------------------------------------
 *  6. Interactive Clickable Milestones (Firestore Real-time Sync)
 *  -------------------------------------------------------------------------- */
function renderMilestones() {
    let active = JSON.parse(localStorage.getItem('sylvan_current_book')) || (typeof currentBook !== 'undefined' ? currentBook : null);
    const container = document.getElementById('milestones-grid');
    if (!container || !active || !active.milestones || !db) return;

    // Firestore document reference to store the active milestone index globally
    const milestoneRef = db.collection('circleState').doc('activeMilestone');

    // Avoid attaching duplicate snapshot listeners if renderMilestones is called multiple times
    if (container.dataset.bound) return;
    container.dataset.bound = "true";

    // --- Real-time Firestore Listener ---
    milestoneRef.onSnapshot((doc) => {
        // Grab activeIndex from Firestore (default to 0 if not set yet)
        const activeIndex = doc.exists && doc.data().activeIndex !== undefined ? doc.data().activeIndex : 0;

        container.innerHTML = '';

        active.milestones.forEach((m, index) => {
            const card = document.createElement('div');
            const isActive = (index === activeIndex);

            // Keep status updated locally
            m.status = isActive ? 'active' : 'upcoming';

            card.className = `milestone-card ${m.status}`;
            card.style.cursor = 'pointer';

            const activeBadge = isActive
            ? `<span class="current-tag">📍 We are here</span>`
            : `<span class="milestone-target" style="font-size: 0.72rem;">Click to set position</span>`;

            card.innerHTML = `
            <div class="milestone-header">
            <span class="milestone-step">${m.step}</span>
            ${activeBadge}
            </div>
            <h3>${m.range}</h3>
            <p class="milestone-target"><span class="milestone-pace">${m.pace || 'Story Checkpoint'}</span></p>
            `;

            // --- Click Event: Updates Firestore for ALL users ---
            card.addEventListener('click', () => {
                milestoneRef.set({
                    activeIndex: index,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true })
                .then(() => {
                    // Save local backup state
                    localStorage.setItem('sylvan_current_book', JSON.stringify(active));
                })
                .catch((err) => console.error("Error setting active milestone:", err));
            });

            container.appendChild(card);
        });
    }, (err) => console.error("Error syncing active milestone:", err));
}

/* ==========================================================================
 *  ARCHIVIST SANCTUM (GLOBAL FUNCTIONS)
 *  ========================================================================== */

const ARCHIVIST_PASSKEY = "1234";
const ARCHIVIST_SESSION_KEY = 'sylvan_archivist_unlocked';

// Archivist access lasts until the browser tab is closed (sessionStorage)
function isArchivistUnlocked() {
    try {
        return sessionStorage.getItem(ARCHIVIST_SESSION_KEY) === 'true';
    } catch (e) {
        return document.body.classList.contains('archivist-mode');
    }
}

function setArchivistMode(unlocked) {
    try {
        if (unlocked) sessionStorage.setItem(ARCHIVIST_SESSION_KEY, 'true');
        else sessionStorage.removeItem(ARCHIVIST_SESSION_KEY);
    } catch (e) { /* private mode: keep it for this page only */ }

    // Archivist-only controls key off this class; listeners can react to the event
    document.body.classList.toggle('archivist-mode', unlocked);
    document.dispatchEvent(new CustomEvent('archivist-change', { detail: { unlocked } }));
}

function showArchivistStep(unlocked) {
    const authStep = document.getElementById('archivist-auth-step');
    const actionsStep = document.getElementById('archivist-actions-step');
    if (authStep) authStep.classList.toggle('hidden', unlocked);
    if (actionsStep) actionsStep.classList.toggle('hidden', !unlocked);
}

window.openArchivistModal = function() {
    const modal = document.getElementById('archivist-modal');
    const pinInput = document.getElementById('archivist-pin');
    const errorMsg = document.getElementById('archivist-error');

    if (!modal) return;

    modal.classList.remove('hidden');
    if (pinInput) pinInput.value = '';
    if (errorMsg) errorMsg.classList.add('hidden');
    showArchivistStep(isArchivistUnlocked());
};

window.closeArchivistModal = function() {
    const modal = document.getElementById('archivist-modal');
    if (modal) modal.classList.add('hidden');
};

window.unlockArchivistControls = function() {
    const pinInput = document.getElementById('archivist-pin');
    const errorMsg = document.getElementById('archivist-error');

    if (pinInput && pinInput.value === ARCHIVIST_PASSKEY) {
        setArchivistMode(true);
        showArchivistStep(true);
        if (errorMsg) errorMsg.classList.add('hidden');
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
    }
};

window.lockArchivistControls = function() {
    setArchivistMode(false);
    showArchivistStep(false);
};

function initArchivistEvents() {
    // Restore Archivist mode for this browser session
    if (isArchivistUnlocked()) document.body.classList.add('archivist-mode');

    // Enter key unlocks (phone keyboards show "Go")
    const pinInput = document.getElementById('archivist-pin');
    if (pinInput) {
        pinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.unlockArchivistControls();
            }
        });
    }

    // Forge the Trial: close the Sanctum before jumping to the Trial section
    document.querySelectorAll('.forge-trial-btn').forEach((link) => {
        link.addEventListener('click', () => window.closeArchivistModal());
    });

    const cycleBtn = document.getElementById('cycle-season-btn');
    if (cycleBtn) {
        cycleBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to complete the current season? This will move the active tome to the Archives.\n\n📚 The next tome will be the most-voted book in Recommendations (ties go to the earliest pitch).")) {
                cycleToNextBook();
            }
        });
    }
}

/* ==========================================================================
 *  AUTOMATED SEASON CYCLE ENGINE (FIRESTORE INTEGRATED)
 *  ========================================================================== */
async function cycleToNextBook() {
    if (!db) {
        alert("Firestore is not connected!");
        return;
    }

    try {
        // 1. Get current active book
        let current = JSON.parse(localStorage.getItem('sylvan_current_book')) || (typeof currentBook !== 'undefined' ? currentBook : {
            title: "The Name of the Wind",
            author: "Patrick Rothfuss",
            cover: "assets/books/book_hero.jpg"
        });

        // 2. Fetch archived titles from Firestore + local fallback
        const archivesSnap = await db.collection('archives').get();
        let firebaseArchives = [];
        archivesSnap.forEach(doc => firebaseArchives.push(doc.data()));

        firebaseArchives.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;

            if (timeA !== timeB) {
                return timeB - timeA;
            }

            const seasonA = parseInt(a.date?.replace(/[^0-9]/g, ''), 10) || 0;
            const seasonB = parseInt(b.date?.replace(/[^0-9]/g, ''), 10) || 0;
            return seasonB - seasonA;
        });

        let baseArchives = (typeof archivedBooks !== 'undefined') ? archivedBooks : [];
        let archivedTitles = [...firebaseArchives, ...baseArchives].map(b => b.title ? b.title.trim().toLowerCase() : '');

        // 3. Fetch pitched recommendations from Firestore + local fallback
        const recsSnap = await db.collection('recommendations').get();
        let firebaseRecs = [];
        recsSnap.forEach(doc => firebaseRecs.push({ id: doc.id, ...doc.data() }));

        let baseRecs = (typeof recommendations !== 'undefined') ? recommendations : [];
        let allRecs = [...firebaseRecs, ...baseRecs];

        // 4. Filter out duplicate titles & already-archived books
        let availableRecs = allRecs.filter((rec, index, self) => {
            if (!rec.title) return false;
            const titleLower = rec.title.trim().toLowerCase();
            const isUnique = index === self.findIndex((b) => b.title && b.title.trim().toLowerCase() === titleLower);
            const isArchived = archivedTitles.includes(titleLower);
            return isUnique && !isArchived;
        });

        if (availableRecs.length === 0) {
            alert("There are no eligible book recommendations available to promote. Pitch a tome first!");
            return;
        }

        // 5. Same ranking as the Recommendations page (votes, then earliest pitch)
        availableRecs.sort(compareRecommendations);

        const winner = availableRecs[0];

        // 6. Smart Milestone Generator
        let totalCh = winner.chapters ? parseInt(winner.chapters) : null;
        let autoMilestones = [];

        if (totalCh && totalCh > 0) {
            let third = Math.ceil(totalCh / 3);
            let p1End = third;
            let p2End = Math.min(third * 2, totalCh - 1);

            autoMilestones = [
                { step: "Part I", range: `Chapters 1–${p1End}`, pace: "Opening Act", status: "active" },
                { step: "Part II", range: `Chapters ${p1End + 1}–${p2End}`, pace: "Rising Action", status: "upcoming" },
                { step: "Part III", range: `Chapters ${p2End + 1}–${totalCh}`, pace: "Climax & Circle Chat", status: "upcoming" }
            ];
        } else {
            autoMilestones = [
                { step: "Part I", range: "The Opening (~First 1/3)", pace: "Opening Act", status: "active" },
                { step: "Part II", range: "The Midpoint (~Middle 1/3)", pace: "Rising Action", status: "upcoming" },
                { step: "Part III", range: "The Climax (~Final 1/3)", pace: "Circle Gathering", status: "upcoming" }
            ];
        }

        // Dynamically increment the active season number
        const currentSeasonNum = parseInt(current.month?.replace(/[^0-9]/g, ''), 10);
        const nextSeasonNum = !isNaN(currentSeasonNum) ? currentSeasonNum + 1 : (firebaseArchives.length + 1);
        const seasonName = `Sylvan Season ${nextSeasonNum}`;

        // 7. Dynamic 2-Month Target Date
        const deadline = new Date();
        deadline.setMonth(deadline.getMonth() + 2);
        const autoTargetDate = deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        // 8. Fetch current vibe counts and archive the current finished book directly into Firestore
        const bookSlug = current.bookId || current.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Fetch preserved vibes for this book from Firestore
        const vibeDocSnap = await db.collection('vibes').doc(bookSlug).get();
        const activeVibes = vibeDocSnap.exists ? vibeDocSnap.data() : {};

        const completedEntry = {
            bookId: bookSlug,
            title: current.title,
            author: current.author,
            date: `Completed in ${current.month || 'Sylvan Season'}`,
            cover: current.cover || "assets/books/cover-backup.webp",
            vibes: Object.keys(activeVibes).filter(k => activeVibes[k] > 0),
            vibesData: activeVibes,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('archives').add(completedEntry);

        // 9. Remove the winner from Firestore recommendations so it's not pitched again
        if (winner.id) {
            await db.collection('recommendations').doc(winner.id).delete();
        }

        // 10. Set the winning recommendation as the new Active Book
        const newCurrentBook = {
            bookId: winner.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            title: winner.title,
            author: winner.author,
            genre: winner.genre || "Community Choice",
            month: seasonName,
            targetDate: autoTargetDate,
            cover: winner.cover || "assets/books/cover-backup.webp",
            milestones: autoMilestones
        };

        // Save to Firestore so ALL 3 members see the new active book instantly!
        await db.collection('settings').doc('activeBook').set(newCurrentBook);
        localStorage.setItem('sylvan_current_book', JSON.stringify(newCurrentBook));

        alert(`✨ "${completedEntry.title}" has been moved to the Grand Archives!\n🎉 "${winner.title}" is now officially active for ${seasonName}!\n📍 Target Deadline: ${autoTargetDate}`);
        window.location.href = 'index.html';

    } catch (err) {
        console.error("Error cycling season:", err);
        alert("There was an issue cycling the season. Check browser console for details.");
    }
}
/* ==========================================================================
 *  ARCHIVE INSCRIPTIONS MODAL (FIRESTORE ON-DEMAND FETCH)
 *  ========================================================================== */
function initArchiveModal() {
    const archiveModal = document.getElementById('archive-modal');
    const closeBtn = document.getElementById('close-archive-modal');
    const archiveTitle = document.getElementById('archive-modal-title');

    if (!archiveModal) return;

    function openModal(bookId, bookTitle) {
        if (archiveTitle) archiveTitle.textContent = `Inscriptions: ${bookTitle}`;
        archiveModal.classList.remove('hidden');
        archiveModal.classList.add('active');
        archiveModal.setAttribute('aria-hidden', 'false');

        fetchArchivedBookNotes(bookId);
    }

    function closeModal() {
        archiveModal.classList.add('hidden');
        archiveModal.classList.remove('active');
        archiveModal.setAttribute('aria-hidden', 'true');
    }

    // 💡 FIX: Target ONLY .archive-card elements (prevents <body> from hijacking navbar clicks)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.archive-card[data-book-id]');
        if (!card || card.closest('#archive-modal')) return;

        const bookId = card.dataset.bookId;
        const bookTitle = card.dataset.bookTitle || card.querySelector('h3, h2, .book-title')?.textContent || 'Archived Book';

        if (bookId) {
            e.preventDefault();
            openModal(bookId, bookTitle);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    archiveModal.addEventListener('click', (e) => {
        if (e.target === archiveModal) closeModal();
    });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !archiveModal.classList.contains('hidden')) {
                closeModal();
            }
        });
}

function fetchArchivedBookNotes(bookId) {
    const linesList = document.getElementById('archive-lines-list');
    const commentsList = document.getElementById('archive-comments-list');
    const vibesList = document.getElementById('archive-vibes-list');

    if (linesList) linesList.innerHTML = '<li>Loading quotes...</li>';
    if (commentsList) commentsList.innerHTML = '<p>Loading reflections...</p>';
    if (vibesList) vibesList.innerHTML = '<span style="font-size: 0.85rem; color: #8fa893;">Loading vibes...</span>';

    if (!db) {
        console.error("Firestore 'db' object is not initialized.");
        return;
    }

    const rawId = bookId.trim().toLowerCase();
    const withoutThe = rawId.replace(/^the-/, '');
    const withThe = rawId.startsWith('the-') ? rawId : `the-${rawId}`;
    const searchIds = Array.from(new Set([rawId, withoutThe, withThe]));

    // --- A. Fetch Vibe Stamps for this Archived Book ---
    const vibeLabels = {
        'cozy': '☕ Cozy',
        'mindblown': '🤯 Mindblown',
        'twist': '⚡ Mind Twist',
        'devastated': '😭 Devastated',
        'intense': '🔥 Intense'
    };

    Promise.all(searchIds.map(id => db.collection('vibes').doc(id).get()))
    .then((vibeDocs) => {
        let combinedVibes = {};
        vibeDocs.forEach(doc => {
            if (doc.exists) {
                const data = doc.data();
                Object.keys(data).forEach(k => {
                    combinedVibes[k] = (combinedVibes[k] || 0) + (data[k] || 0);
                });
            }
        });

        if (vibesList) {
            vibesList.innerHTML = '';
            const activeVibeKeys = Object.keys(combinedVibes).filter(k => combinedVibes[k] > 0);

            if (activeVibeKeys.length === 0) {
                vibesList.innerHTML = '<span style="font-size: 0.85rem; color: #8fa893;">No vibe stamps recorded for this tome.</span>';
            } else {
                activeVibeKeys.forEach(key => {
                    // Look up formatted label with emoji
                    const label = VIBE_MAP[key] || toTitleCase(key.replace(/-/g, ' '));
                    const count = combinedVibes[key];

                    const badge = document.createElement('span');
                    badge.className = 'vibe-btn';
                    badge.style.pointerEvents = 'none';
                    badge.innerHTML = `${escapeHTML(label)} <strong class="vibe-count">(${count})</strong>`;
                    vibesList.appendChild(badge);
                });
            }
        }
    })
    .catch(err => console.error("Error loading archived vibes:", err));

    // --- B. Fetch Quotes & Comments ---
    db.collection('reactions')
    .where('bookId', 'in', searchIds)
    .get()
    .then((snapshot) => {
        if (linesList) linesList.innerHTML = '';
        if (commentsList) commentsList.innerHTML = '';

        if (snapshot.empty) {
            if (linesList) linesList.innerHTML = '<li>No saved lines for this book.</li>';
            if (commentsList) commentsList.innerHTML = '<p>No saved reflections for this book.</p>';
            return;
        }

        let linesCount = 0;
        let commentsCount = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            const authorName = escapeHTML(data.author || 'Anonymous');
            const contentText = escapeHTML(data.content || '');

            if (data.type === 'line' || data.type === 'quote') {
                linesCount++;
                const li = document.createElement('li');
                li.innerHTML = `
                <span>"${contentText}"</span>
                <span class="line-attribution">— Inscribed by ${authorName}</span>
                `;
                linesList.appendChild(li);
            } else if (data.type === 'comment' || data.type === 'reflection') {
                commentsCount++;
                const card = document.createElement('div');
                card.className = 'comment-card';
                card.innerHTML = `
                <div class="comment-header">
                <span class="author">${authorName}</span>
                <span class="timestamp">Inscribed</span>
                </div>
                <p class="comment-body">${contentText}</p>
                `;
                commentsList.appendChild(card);
            }
        });

        if (linesCount === 0 && linesList) {
            linesList.innerHTML = '<li>No saved lines for this book.</li>';
        }
        if (commentsCount === 0 && commentsList) {
            commentsCount.innerHTML = '<p>No saved reflections for this book.</p>';
        }
    })
    .catch((err) => {
        console.error("Error fetching archived notes:", err);
        if (linesList) linesList.innerHTML = '<li>Error loading inscriptions.</li>';
    });
}



/* ==========================================================================
 *  TRIAL OF THE CIRCLE (Questionnaire per tome, Firestore: trials/{bookId})
 *  ========================================================================== */
const TRIAL_MAX_QUESTIONS = 8;

const DEFAULT_TRIAL_QUESTIONS = [
    { id: 'rating', type: 'choice', text: 'Overall rating', options: ['🌙', '🌙🌙', '🌙🌙🌙', '🌙🌙🌙🌙', '🌙🌙🌙🌙🌙'] },
    { id: 'ending', type: 'choice', text: 'Did the ending satisfy you?', options: ['Yes', 'Partly', 'No'] },
    { id: 'recommend', type: 'choice', text: 'Would you recommend it?', options: ['Yes', 'Maybe', 'No'] },
    { id: 'pace', type: 'choice', text: 'Pace of the book', options: ['Too slow', 'Just right', 'Too fast'] },
    { id: 'summary', type: 'text', text: 'One word or line that sums up the book', options: [] }
];

const trialState = { bookId: null, unsubscribe: null, questions: [], editing: false, draft: [] };

function initTrial() {
    const trialBody = document.getElementById('trial-body');
    if (!trialBody || !db) return;

    // React to the Archivist locking/unlocking (bound once)
    if (!trialBody.dataset.bound) {
        trialBody.dataset.bound = 'true';
        document.addEventListener('archivist-change', (e) => {
            if (!e.detail.unlocked) trialState.editing = false;
            renderTrial();
        });
    }

    // Re-subscribe only when the active book changes
    const bookId = document.body.dataset.bookId;
    if (!bookId || bookId === 'active-read' || bookId === trialState.bookId) return;

    if (trialState.unsubscribe) trialState.unsubscribe();
    trialState.bookId = bookId;
    trialState.editing = false;

    trialState.unsubscribe = db.collection('trials').doc(bookId).onSnapshot((doc) => {
        trialState.questions = doc.exists ? (doc.data().questions || []) : [];
        if (!trialState.editing) renderTrial();
    }, (err) => console.error("Error syncing trial:", err));
}

function renderTrial() {
    const trialBody = document.getElementById('trial-body');
    if (!trialBody) return;

    const isArchivist = document.body.classList.contains('archivist-mode');
    if (trialState.editing && isArchivist) {
        renderTrialEditor(trialBody);
        return;
    }

    const questions = trialState.questions;
    let html = '';

    if (!questions.length) {
        html = `<p class="empty-state">The Archivist has not yet forged this tome's trial.</p>`;
    } else {
        html = `<ol class="trial-question-list">${questions.map((q) => `
            <li>
            <span class="trial-q-text">${escapeHTML(q.text)}</span>
            <span class="trial-q-meta">${q.type === 'choice' ? escapeHTML((q.options || []).join(' · ')) : 'Short answer'}</span>
            </li>`).join('')}
        </ol>`;
    }

    if (isArchivist) {
        html += `<button type="button" class="sylvan-btn trial-edit-btn">${questions.length ? '✎ Edit the Trial' : '⚖️ Forge the Trial'}</button>`;
    }

    trialBody.innerHTML = html;

    trialBody.querySelector('.trial-edit-btn')?.addEventListener('click', () => {
        // Start from the saved questions, or the default set for a new tome
        const source = questions.length ? questions : DEFAULT_TRIAL_QUESTIONS;
        trialState.draft = source.map((q) => ({
            id: q.id,
            type: q.type,
            text: q.text || '',
            optionsText: (q.options || []).join('\n')
        }));
        trialState.editing = true;
        renderTrial();
    });
}

function renderTrialEditor(trialBody) {
    const draft = trialState.draft;

    trialBody.innerHTML = `
    <form class="reaction-form trial-editor" novalidate>
    <p class="trial-editor-hint">Tap-to-choose questions need at least two options, one per line.</p>
    ${draft.map((q, i) => `
        <fieldset class="trial-edit-card" data-index="${i}">
        <legend>Question ${i + 1}</legend>
        <div class="form-group">
        <label for="trial-q-${i}">Question</label>
        <textarea id="trial-q-${i}" data-field="text" rows="2" placeholder="e.g. What does the color red symbolize?">${escapeHTML(q.text)}</textarea>
        </div>
        <div class="form-group">
        <label for="trial-type-${i}">Answer type</label>
        <select id="trial-type-${i}" class="reaction-select" data-field="type">
        <option value="choice" ${q.type === 'choice' ? 'selected' : ''}>Tap to choose</option>
        <option value="text" ${q.type === 'text' ? 'selected' : ''}>Short answer</option>
        </select>
        </div>
        <div class="form-group trial-options-group ${q.type === 'choice' ? '' : 'hidden'}">
        <label for="trial-opts-${i}">Options (one per line)</label>
        <textarea id="trial-opts-${i}" data-field="optionsText" rows="${Math.max(3, q.optionsText.split('\n').length)}" placeholder="Yes&#10;No">${escapeHTML(q.optionsText)}</textarea>
        </div>
        <button type="button" class="trial-remove-btn" data-action="remove" ${draft.length <= 1 ? 'disabled' : ''}>✕ Remove question</button>
        </fieldset>`).join('')}
    <button type="button" class="trial-add-btn" data-action="add" ${draft.length >= TRIAL_MAX_QUESTIONS ? 'disabled' : ''}>+ Add question (${draft.length}/${TRIAL_MAX_QUESTIONS})</button>
    <p class="error-msg trial-editor-error hidden"></p>
    <div class="trial-editor-actions">
    <button type="submit" class="submit-btn">📜 Seal the Trial</button>
    <button type="button" class="sanctum-lock-btn" data-action="cancel">Cancel</button>
    </div>
    </form>`;

    const form = trialBody.querySelector('.trial-editor');
    const errorEl = form.querySelector('.trial-editor-error');

    // Keep the draft in sync with every keystroke so add/remove re-renders keep values
    form.addEventListener('input', (e) => {
        const card = e.target.closest('.trial-edit-card');
        const field = e.target.dataset.field;
        if (!card || !field) return;
        const q = draft[Number(card.dataset.index)];
        q[field] = e.target.value;

        if (field === 'type') {
            card.querySelector('.trial-options-group').classList.toggle('hidden', q.type !== 'choice');
        }
    });

    form.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (!action) return;

        if (action === 'add' && draft.length < TRIAL_MAX_QUESTIONS) {
            draft.push({ id: `q${Date.now().toString(36)}`, type: 'choice', text: '', optionsText: '' });
            renderTrialEditor(trialBody);
            trialBody.querySelector(`#trial-q-${draft.length - 1}`)?.focus();
        } else if (action === 'remove' && draft.length > 1) {
            draft.splice(Number(e.target.closest('.trial-edit-card').dataset.index), 1);
            renderTrialEditor(trialBody);
        } else if (action === 'cancel') {
            trialState.editing = false;
            renderTrial();
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const questions = draft.map((q) => ({
            id: q.id,
            type: q.type,
            text: q.text.trim(),
            options: q.type === 'choice'
            ? q.optionsText.split('\n').map((opt) => opt.trim()).filter(Boolean)
            : []
        }));

        const problem = questions.findIndex((q) => !q.text || (q.type === 'choice' && q.options.length < 2));
        if (problem !== -1) {
            const q = questions[problem];
            errorEl.textContent = !q.text
            ? `Question ${problem + 1} needs some text.`
            : `Question ${problem + 1} needs at least two options.`;
            errorEl.classList.remove('hidden');
            return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.disabled = true;

        try {
            // merge keeps other trial fields (e.g. reveal state) untouched
            await db.collection('trials').doc(trialState.bookId).set({
                bookId: trialState.bookId,
                bookTitle: document.querySelector('.tome-title')?.textContent.trim() || '',
                questions: questions,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            trialState.questions = questions;
            trialState.editing = false;
            renderTrial();
        } catch (err) {
            console.error("Error sealing trial:", err);
            errorEl.textContent = 'The trial could not be sealed. Check the browser console for details.';
            errorEl.classList.remove('hidden');
            submitBtn.disabled = false;
        }
    });
}

function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}
