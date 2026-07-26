/* ==========================================================================
 * THE SYLVAN LIBRARY - BOOK DATA CONFIGURATION
 * ========================================================================== */

// 1. ACTIVE READ (Renders on index.html)
const currentBook = {
  title: "El cuento de la criada",
  author: "by Margaret Atwood",
  genre: "Community Choice", // fixed closing quote
  month: "July 2026",
  cover: "assets/books/cover-backup.webp",
  pages: 662,
  targetDate: "Sept 25",

  milestones: [
    {
      step: "Part I",
      range: "Chapters 1–15",
      target: "Oct 7",
      pace: "~15 pgs/day"
    },
    {
      step: "Part II",
      range: "Chapters 16–35",
      target: "Oct 18",
      pace: "~18 pgs/day"
    },
    {
      step: "Part III",
      range: "Chapters 36–End",
      target: "Oct 28",
      pace: "Full Moon Chat"
    }
  ]
};

// 2. ARCHIVED READS (Renders on archive.html)
const archivedBooks = [
  {
    title: "OT Knowledge Articles",
    author: "OT",
    date: "Completed 2026 (Mafer and Fer continue....)",
    cover: "assets/books/cover-backup.webp",
    vibes: ["🤯 Mindblown (3)"],
    quotes: ["We are resilient, we survive, we laugh, we live."]
  }
];

// 3. COMMUNITY RECOMMENDATIONS (recommendations.html)
const recommendations = [
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    suggestedBy: "Victoria",
    reason: "Ethereal labyrinth atmosphere — perfect for our aesthetic!",
    cover: "images/piranesi.jpg"
  },
{
  title: "The Priory of the Orange Tree",
  author: "Samantha Shannon",
  suggestedBy: "Jackie",
  reason: "Epic dragons and political intrigue.",
  cover: "images/priory.jpg"
}
];
