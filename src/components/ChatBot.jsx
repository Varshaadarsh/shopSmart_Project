import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaMicrophone } from "react-icons/fa";
import { askAI } from "../services/groq";
import { searchProducts } from "../utils/searchProducts";

function ChatBot({
  products = [],
  addToCart,
  addToCompare,
  cartItems = [],
  matchedProducts = []
}) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "Hello 👋 Welcome to ShopSmart! How can I help you today?"
      }
    ]);

  const [input, setInput] =
    useState("");

  const [lastSearchResults, setLastSearchResults] =
    useState([]);

  const getBotResponse = (message) => {
    const msg = message.toLowerCase().trim();

    // Greeting
    if (
      msg.includes("hi") ||
      msg.includes("hello") ||
      msg.includes("hey")
    ) {
      return {
        text: "Hello 👋 Welcome to ShopSmart! What product are you looking for?"
      };
    }

    // View Cart
    if (
      msg.includes("view cart") ||
      msg === "cart"
    ) {
      navigate("/cart");

      return {
        text: "🛒 Opening your cart..."
      };
    }

    // Checkout
    if (
      msg.includes("checkout") ||
      msg.includes("buy now")
    ) {
      navigate("/checkout");

      return {
        text: "🚀 Proceeding to checkout..."
      };
    }

    // Add First Product To Cart
    if (
      msg.includes("add first") &&
      lastSearchResults.length > 0
    ) {
      const product = lastSearchResults[0];

      addToCart(product);

      return {
        text: `✅ ${product.title} added to cart.

You now have ${cartItems.length + 1
          } item(s) in your cart.

Type:
• view cart
• checkout`
      };
    }

    // Add Specific Product To Cart
    if (
      msg.includes("add") &&
      msg.includes("cart")
    ) {
      const product = products.find((p) =>
        msg.includes(p.title.toLowerCase())
      );

      if (product) {
        addToCart(product);

        return {
          text: `✅ ${product.title} added to cart.

You now have ${cartItems.length + 1
            } item(s) in your cart.

Type:
• view cart
• checkout`
        };
      }

      return {
        text: "Please specify the product name. Example: Add iPhone to cart."
      };
    }

    // Order Tracking
    if (
      msg.includes("track") ||
      msg.includes("order")
    ) {
      return {
        text: "🚚 Your latest order is currently Out For Delivery."
      };
    }

    // Payment
    if (msg.includes("payment")) {
      return {
        text: "💳 We support UPI, Debit Card, Credit Card and EMI."
      };
    }

    // Return Policy
    if (msg.includes("return")) {
      return {
        text: "🔄 Products can be returned within 7 days of delivery."
      };
    }

    // Open Product Details

    if (msg.startsWith("product ")) {
      const productId = msg.replace("product ", "");

      const selectedProduct = products.find(
        (p) => String(p.id) === productId
      );

      if (selectedProduct) {
        navigate(`/product/${selectedProduct.id}`);

        return {
          text: `Opening ${selectedProduct.title}...`
        };
      }

      return {
        text: "Product not found."
      };
    }

    // Compare Products

    if (
      msg.includes("compare")
    ) {
      if (lastSearchResults.length < 2) {
        return {
          text:
            "Please search products first before comparing."
        };
      }

      const bestProduct = [...lastSearchResults]
        .sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        )[0];

      return {
        text: `📊 Product Comparison

${lastSearchResults
            .slice(0, 5)
            .map(
              (p) =>
                `${p.title}
Price: ₹${p.price}
Rating: ⭐${p.rating}`
            )
            .join("\n\n")}

🏆 Best Product:
${bestProduct.title}

Rating: ⭐${bestProduct.rating}
Price: ₹${bestProduct.price}

You can say:
Add ${bestProduct.title} to cart`
      };
    }

    // Product Search (Natural Language)

    const searchResults = searchProducts(
      message,
      products
    );

    if (searchResults.length > 0) {
      setLastSearchResults(searchResults);

      return {
        text: `🔍 Found ${searchResults.length} product(s):

${searchResults
            .slice(0, 5)
            .map(
              (p, index) =>
                `${index + 1}. ${p.title}
Price: ₹${p.price}
Rating: ⭐${p.rating || "N/A"}
Brand: ${p.brand || "ShopSmart"}
Product ID: ${p.id}

Open Product:
product ${p.id}
`
            )
            .join("\n")}

You can say:
• product PRODUCT_ID
• compare products
• add PRODUCT NAME to cart`
      };
    }

    if (searchResults.length > 0) {
      setLastSearchResults(searchResults);

      return {
        text: `🔍 Found ${searchResults.length
          } product(s):

${searchResults
            .slice(0, 5)
            .map(
              (p) =>
                `• ${p.title} - ₹${p.price}`
            )
            .join("\n")}

You can say:
• Add first to cart
• Add PRODUCT NAME to cart`
      };
    }

    return {
      text:
        "❌ Sorry, I couldn't find that product. Try searching for phones, laptops, beauty products, groceries, shirts, watches, etc."
    };
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    const msg = userInput.toLowerCase();

    const userMsg = {
      sender: "user",
      text: userInput,
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");


    // -------------------------
    // SALE SEARCH
    // -------------------------

    if (
      msg.includes("sale") ||
      msg.includes("offer") ||
      msg.includes("discount") ||
      msg.includes("deal")
    ) {
      const saleProducts = products.filter(
        (p) => Number(p.discountPercentage) > 0
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "🔥 Current Sale Products",
          products: saleProducts.slice(0, 10),
        },
      ]);

      return;
    }

    // -------------------------
    // CATEGORY SEARCH
    // -------------------------

    const categoryAliases = {
      beauty: ["beauty", "makeup", "cosmetics"],
      groceries: ["grocery", "groceries"],
      mobiles: ["mobile", "mobiles", "phone", "phones", "iphone"],
      electronics: ["electronics", "laptop", "laptops"],
    };

    const matchedCategory = Object.keys(
      categoryAliases
    ).find((category) =>
      categoryAliases[category].some((keyword) =>
        msg.includes(keyword)
      )
    );

    if (matchedCategory) {

      let categoryProducts = [];

      if (matchedCategory === "beauty") {
        categoryProducts = products.filter(
          (p) =>
            p.category?.toLowerCase().includes("beauty") ||
            p.category?.toLowerCase().includes("fragrances") ||
            p.category?.toLowerCase().includes("skin")
        );
      }

      if (matchedCategory === "mobiles") {
        categoryProducts = products.filter(
          (p) =>
            p.category?.toLowerCase().includes("smartphone") ||
            p.category?.toLowerCase().includes("mobile")
        );
      }

      if (matchedCategory === "electronics") {
        categoryProducts = products.filter(
          (p) =>
            p.category?.toLowerCase().includes("laptop")
        );
      }

      if (matchedCategory === "groceries") {
        categoryProducts = products.filter(
          (p) =>
            p.category?.toLowerCase().includes("groceries")
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `📦 ${matchedCategory} Products`,
          products: categoryProducts.slice(0, 10),
        },
      ]);

      return;
    }

    // -------------------------
    // PRODUCT SEARCH
    // -------------------------

    const searchResults = searchProducts(
      userInput,
      products
    );

    if (searchResults.length > 0) {

      setLastSearchResults(searchResults);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Found ${searchResults.length} products`,
          products: searchResults.slice(0, 5),
        },
      ]);

      return;
    }

    // -------------------------
    // VIEW CART
    // -------------------------

    if (
      msg.includes("cart") ||
      msg.includes("view cart")
    ) {
      navigate("/cart");

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Opening Cart...",
        },
      ]);

      return;
    }

    // -------------------------
    // GEMINI FALLBACK
    // -------------------------

    try {

      const prompt = `
You are ShopSmart AI Assistant.

IMPORTANT RULES:
1. ONLY recommend products from the list below.
2. NEVER recommend products not found in ShopSmart.
3. If the list is empty, reply:
   "Sorry, no matching ShopSmart products were found."

User Question:
${userInput}

Available ShopSmart Products:

${products
          .slice(0, 20)
          .map(
            (p) => `
Title: ${p.title}
Price: ₹${p.price}
Category: ${p.category}
Rating: ${p.rating}
Brand: ${p.brand || "ShopSmart"}
`
          )
          .join("\n")}

Answer based ONLY on these products.
`;

      const reply =
        await askAI(prompt);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
        },
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Groq API Error",
        },
      ]);
    }
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (
      !SpeechRecognition
    ) {
      alert(
        "Voice recognition not supported"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.onresult = (
      event
    ) => {
      setInput(
        event.results[0][0]
          .transcript
      );
    };

    recognition.start();
  };

  const toggleChat = () => {
    if (isOpen) {
      setMessages([
        {
          sender: "bot",
          text:
            "Hello 👋 Welcome to ShopSmart! How can I help you today?"
        }
      ]);
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="chat-avatar"
        onClick={toggleChat}
      >
        <FaRobot />
      </div>

      {isOpen && (
        <div className="chatbox">

          <div className="chat-header">
            <div className="assistant-info">
              <div className="assistant-avatar">
                🤖
              </div>

              <div>
                <h6>
                  ShopSmart AI
                </h6>
                <small>
                  Online Now
                </small>
              </div>
            </div>
          </div>

          <div className="chat-body">
            {messages.map(
              (
                msg,
                index
              ) => (
                <div
                  key={index}
                  className={
                    msg.sender
                  }
                >
                  <>
                    <div>{msg.text}</div>

                    {msg.products &&
                      msg.products.map((product) => (

                        <div
                          key={product.id}
                          className="chat-product-card"
                        >

                          <img
                            src={product.thumbnail}
                            alt={product.title}
                          />

                          <h6>{product.title}</h6>

                          <p>₹{product.price}</p>

                          <p>
                            ⭐ {product.rating}
                          </p>

                          <button
                            onClick={() =>
                              navigate(`/product/${product.id}`)
                            }
                          >
                            View Product
                          </button>

                          <button
                            onClick={() =>
                              addToCart(product)
                            }
                          >
                            Add To Cart
                          </button>

                          <button
                            onClick={() =>
                              addToCompare(product)
                            }
                          >
                            Compare
                          </button>

                        </div>
                      ))}
                  </>
                </div>
              )
            )}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              placeholder="Ask something..."
              onKeyDown={(
                e
              ) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={
                startVoice
              }
            >
              <FaMicrophone />
            </button>

            <button
              onClick={
                sendMessage
              }
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;