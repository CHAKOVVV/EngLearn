export default async function handler(req, res) {
  const { word } = req.query;

  if (!word) {
    return res.status(400).json({ error: "Missing word" });
  }

  try {
    const response = await fetch(
      `https://dictionary-api.cambridge.org/api/v1/entries/en/${word}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CAMBRIDGE_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    const cefr =
      data.entries?.[0]?.cefr_level ||
      data.entries?.[0]?.senses?.[0]?.cefr_level ||
      null;

    res.status(200).json({ word, cefr });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}