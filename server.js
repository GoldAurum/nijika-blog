import express from "ultimate-express";
import Database from "better-sqlite3";
import { rateLimit } from "express-rate-limit";

const app = express();
app.set("trust proxy", true);

const ALLOWED_ORIGIN = "https://nijika.osaka";

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

const db = new Database("data.db");

/******** Database ********/

db.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
        slug TEXT PRIMARY KEY,
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0
    )
`).run();

function ensurePost(slug) {
    db.prepare(`
        INSERT OR IGNORE INTO posts (slug) VALUES (?)
    `).run(slug);
}

/******** Rate limiters ********/

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

const viewLimiter = rateLimit({
    windowMs: 10 * 1000,
    max: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

/******** Endpoints ********/

/* Incrementa views */
app.post("/api/view/:slug", viewLimiter, (req, res) => {
    const { slug } = req.params;
    ensurePost(slug);

    db.prepare(`
        UPDATE posts SET views = views + 1 WHERE slug = ?
    `).run(slug);

    const row = db
        .prepare("SELECT views FROM posts WHERE slug = ?")
        .get(slug);

    res.json({ views: row.views });
});

/* Obtiene views (SIN incrementar) */
app.get("/api/view/:slug", (req, res) => {
    const { slug } = req.params;
    ensurePost(slug);

    const row = db
        .prepare("SELECT views FROM posts WHERE slug = ?")
        .get(slug);

    res.json({ views: row.views });
});

/* Obtiene likes */
app.get("/api/like/:slug", (req, res) => {
    const { slug } = req.params;
    ensurePost(slug);

    const row = db
        .prepare("SELECT likes FROM posts WHERE slug = ?")
        .get(slug);

    res.json({ likes: row.likes });
});

/* Modifica likes */
app.post("/api/like/:slug", limiter, (req, res) => {
    const { slug } = req.params;
    const { action } = req.query; // add | remove

    ensurePost(slug);

    if (action === "add") {
        db.prepare(`
            UPDATE posts SET likes = likes + 1 WHERE slug = ?
        `).run(slug);
    }

    if (action === "remove") {
        db.prepare(`
            UPDATE posts
            SET likes = MAX(likes - 1, 0)
            WHERE slug = ?
        `).run(slug);
    }

    const row = db
        .prepare("SELECT likes FROM posts WHERE slug = ?")
        .get(slug);

    res.json({ likes: row.likes });
});

/******** Server ********/

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
