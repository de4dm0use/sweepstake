import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const FOOTBALL_KEY = process.env.FOOTBALL_KEY;
const ODDS_KEY = process.env.ODDS_KEY;

/* ---------------- MATCHES ---------------- */
app.get("/api/matches", async (req, res) => {
    try {
        const r = await fetch(
            "https://api.football-data.org/v4/competitions/WC/matches",
            { headers: { "X-Auth-Token": FOOTBALL_KEY } }
        );
        res.json(await r.json());
    } catch {
        res.json({ matches: [] });
    }
});

/* ---------------- STANDINGS ---------------- */
app.get("/api/standings", async (req, res) => {
    try {
        const r = await fetch(
            "https://api.football-data.org/v4/competitions/WC/standings",
            { headers: { "X-Auth-Token": FOOTBALL_KEY } }
        );
        res.json(await r.json());
    } catch {
        res.json({ standings: [] });
    }
});

/* ---------------- ODDS ---------------- */
app.get("/api/odds", async (req, res) => {
    try {
        const url =
            `https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds/?apiKey=${ODDS_KEY}&regions=uk&markets=outrights`;

        const r = await fetch(url);
        res.json(await r.json());
    } catch {
        res.json([]);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
