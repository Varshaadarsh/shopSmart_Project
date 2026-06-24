export const searchProducts = (
  query,
  products
) => {
  const text = query.toLowerCase();

  const budgetMatch =
    text.match(/under\s*(\d+)/);

  const budget =
    budgetMatch
      ? Number(budgetMatch[1])
      : null;

  const keywords = text
    .replace(/under\s*\d+/g, "")
    .split(" ")
    .filter(
      (word) =>
        word.length > 2 &&
        ![
          "need",
          "want",
          "show",
          "best",
          "find",
          "give",
          "please",
          "me",
        ].includes(word)
    );

  let results = products.filter((product) => {
    const searchText = `
      ${product.title || ""}
      ${product.brand || ""}
      ${product.category || ""}
    `.toLowerCase();

    return keywords.some((keyword) => {
      const normalizedKeyword = keyword
        .toLowerCase()
        .replace(/s$/, "");

      return searchText.includes(
        normalizedKeyword
      );
    });
  });

  if (budget) {
    results = results.filter(
      (p) => p.price <= budget
    );
  }

  return results.sort(
    (a, b) =>
      (b.rating || 0) -
      (a.rating || 0)
  );
};