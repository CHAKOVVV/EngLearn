export default async function handler(req, res) {
  const word = req.query.word;

  try {
    const response = await fetch(
      `https://dictionary-api.cambridge.org/api/v1/entries/en/${word}`,
      {
        headers: {
          "accessKey": process.env.CAMBRIDGE_API_KEY || process.env.API_KEY,
          "Accept": "application/json"
        },
      }
    );

    const text = await response.text();

    return res.status(200).json({
      status: response.status,
      headers: Object.fromEntries(response.headers),
      raw: text.slice(0, 500) // limit length
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
