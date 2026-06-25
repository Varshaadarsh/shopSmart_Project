export const searchProducts = (query, products) => {
  if (!query?.trim()) return [];

  const text = query.toLowerCase().trim();

  // Budget extraction
  const budgetMatch =
    text.match(/under\s*₹?\s*(\d+)/i) ||
    text.match(/below\s*₹?\s*(\d+)/i) ||
    text.match(/less than\s*₹?\s*(\d+)/i);

  const budget = budgetMatch
  
    ? Number(budgetMatch[1])
    : null;

  // Category aliases
  const aliases = {
    phone: "smartphones",
    phones: "smartphones",
    mobile: "smartphones",
    mobiles: "smartphones",

    laptop: "laptops",
    laptops: "laptops",

    watch: "mens-watches",
    watches: "mens-watches",

    beauty: "beauty",
    grocery: "groceries",
    groceries: "groceries",

    shirt: "mens-shirts",
    shirts: "mens-shirts",

    shoe: "mens-shoes",
    shoes: "mens-shoes",

    iphone: "iphone",
    iphones: "iphone"
  };

  const stopWords = [
    "i",
    "need",
    "show",
    "me",
    "find",
    "suggest",
    "give",
    "looking",
    "for",
    "want",
    "please",
    "can",
    "you",
    "a",
    "an",
    "the",
    "with",
    "good",
    "best",
    "budget",
    "under",
    "below",
    "less",
    "than"
  ];

  const keywords = text
    .replace(
      /(under|below)\s*₹?\s*\d+|(less than)\s*₹?\s*\d+/gi,
      ""
    )
    .split(/\s+/)
    .filter(
      (word) =>
        word &&
        !stopWords.includes(word)
    )
    .map(
      (word) =>
        aliases[word] || word
    );

  const results = products.filter((product) => {
    const searchableText = `
      ${product.title || ""}
      ${product.brand || ""}
      ${product.category || ""}
      ${product.description || ""}
    `.toLowerCase();

    const matchesKeywords =
      keywords.length === 0
        ? true
        : keywords.some((word) =>
            searchableText.includes(word)
          );

    const matchesBudget =
      budget === null ||
      Number(product.price) <= budget;

    return (
      matchesKeywords &&
      matchesBudget
    );
  });

  return results.sort(
    (a, b) =>
      (b.rating || 0) -
      (a.rating || 0)
  );
};