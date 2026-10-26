/* =========================================================
   Project data — the single source for project cards and
   detail pages. To add a project, copy one object and edit it.
   Leave liveUrl / repoUrl as "" to hide that button.
   ========================================================= */
const PROJECTS = [
  {
    id: "skyline-weather",
    title: "Skyline Weather",
    course: "JSLFP-006 · JavaScript Libraries, Frameworks & Plugins",
    category: "react",
    tags: ["React", "Firebase", "Open-Meteo API", "SCSS", "Webpack", "Babel"],
    summary: "A React weather app that finds your location and shows current conditions, a 24-hour forecast and a 7-day forecast, with saved locations in Firebase.",
    overview:
      "Skyline Weather uses your current location to show the weather right now, a 7-day forecast and a 24-hour forecast. A root WeatherDashboard component manages state for the whole app, two service wrappers handle the weather and geolocation data, and results are saved to a Firebase database. The project is set up from scratch with Webpack, Babel, SCSS, ESLint and dotenv.",
    features: [
      "Current weather for your location: temperature, feels-like, humidity and wind speed",
      "7-day forecast with highs, lows and chance of rain in a scrollable carousel",
      "24-hour forecast with hourly temperature and chance of rain in a scrollable carousel",
      "WeatherService and GeolocationService wrappers that keep API code out of the components",
      "Save favourite locations to a Firebase Firestore database",
      "Error handling and clear feedback when data can't be loaded"
    ],
    challenges:
      "Two tools named in the brief didn't work in practice. The OpenWeather API now needs a credit card even on the free tier, so I switched to the free Open-Meteo API. The jQuery-based React Owl Carousel 2 hadn't been updated in about 8 years and broke with React 18 and Webpack, so I replaced it with react-multi-carousel. Both changes kept the required component structure, and I documented them in technical notes. When revising the app for this portfolio, I fixed forecast day labels that showed one day early in time zones west of UTC, and corrected the wind speed unit to km/h.",
    role: "Solo developer",
    featured: true,
    image: "assets/images/skyline-weather.jpg",
    liveUrl: "",
    repoUrl: ""
  },
  {
    id: "nib-and-notebook",
    title: "Nib & Notebook",
    course: "AT&RT-007 · Authentication & Routing",
    category: "node",
    tags: ["Node.js", "Express", "EJS", "SQLite", "Sessions", "Render"],
    summary: "A full-stack stationery web shop with search and filters, a shopping cart, checkout and a password-protected admin area.",
    overview:
      "Nib & Notebook is an online stationery shop built with Node.js and Express in an MVC structure. Customers browse and filter products, add them to a cart and place an order; a manager logs in to an admin area to add, edit and delete products and review orders. Data is stored in SQLite and the site is deployed live on Render. (The live demo runs on a free plan, so the first visit may take up to a minute to wake up.)",
    features: [
      "Shop page with text search and filters by category, price and stock",
      "Session-based shopping cart: add items, change quantities, remove items",
      "Checkout that saves the order and reduces stock, with a confirmation page",
      "Admin login with protected routes for managing products",
      "Admin order page, sortable by date or customer",
      "Server-rendered EJS views with valid, well-formed HTML"
    ],
    challenges:
      "I organised the code into models, views, controllers and routes so each part stays small and easy to change. I tested every use case end to end, including blocked access to admin pages when logged out and stock updates after checkout, and checked every page with an HTML validator.",
    role: "Solo developer",
    featured: true,
    image: "assets/images/nib-and-notebook.jpg",
    liveUrl: "https://nib-and-notebook-webshop.onrender.com",
    repoUrl: "https://github.com/jeffye158/nib-and-notebook-webshop"
  },
  {
    id: "recipe-finder",
    title: "Recipe Finder",
    course: "ADVJS · Advanced JavaScript",
    category: "js",
    tags: ["JavaScript", "Fetch API", "TheMealDB API", "CSS Grid"],
    summary: "Search any dish and browse recipe cards; click one to see its ingredients and step-by-step instructions.",
    overview:
      "Recipe Finder is a single-page app written in plain JavaScript. It sends the search term to the free TheMealDB API, shows the matching dishes as a responsive grid of photo cards, and opens a pop-up with the category, cuisine, full ingredient list and instructions when a card is clicked.",
    features: [
      "Search by button or by pressing Enter",
      "Responsive card grid built with CSS Grid",
      "Recipe details in a modal pop-up: category, cuisine, ingredients and instructions",
      "Ingredient list built from the API's numbered ingredient and measure fields",
      "Loading, no-results and error messages",
      "Close the pop-up with the X button, a click outside, or the Escape key"
    ],
    challenges:
      "The API returns ingredients as up to 20 separate numbered fields, many of them empty, so I looped through them and kept only the filled ones to build a clean list. When revising it for this portfolio, I made it display properly on phones, added alt text to the recipe photo, and let the Escape key close the pop-up.",
    role: "Solo developer",
    featured: false,
    image: "assets/images/recipe-finder.jpg",
    liveUrl: "demos/recipe-finder/index.html",
    repoUrl: ""
  },
  {
    id: "milas-plant-shop",
    title: "Mila's Plant Shop",
    course: "INPJS-003",
    category: "js",
    tags: ["HTML5", "CSS3", "JavaScript", "DOM Events", "Date & Math"],
    summary: "An interactive plant shop page whose greeting, featured plant, product cards and daily tip are all generated with JavaScript.",
    overview:
      "Mila's Plant Shop is a one-page store for house plants, written in plain JavaScript with no libraries. The greeting changes with the time of day, the hero plant changes with the day of the week, product cards are built from a data array, a random care tip appears on each visit, and a newsletter form checks the email before confirming with a pop-up message.",
    features: [
      "Time-of-day greeting and day-of-week hero plant using the Date object",
      "Plant cards rendered from a JavaScript array, with care tags and prices",
      "Add to Cart buttons that show a toast notification",
      "Random care tip with Math.random() and a button for a new one",
      "Newsletter form with email check and focus / blur hints",
      "Responsive layout with a hamburger menu on phones"
    ],
    challenges:
      "The assignment called for five different JavaScript events, so I planned which interaction each one would drive: hover on links and cards, clicks on buttons, and focus and blur on the email field. When revising it for this portfolio, I set the plant grid to three even columns so the six cards no longer leave a gap, made the buttons use the page font, and made the phone menu close after a link is tapped.",
    role: "Solo developer",
    featured: false,
    image: "assets/images/milas-plant-shop.jpg",
    liveUrl: "demos/milas-plant-shop/index.html",
    repoUrl: ""
  },
  {
    id: "ember-and-grounds",
    title: "Ember & Grounds",
    course: "Advanced HTML & CSS",
    category: "html",
    tags: ["HTML5", "CSS3", "CSS Grid", "Flexbox", "CSS Animations", "JavaScript"],
    summary: "A responsive one-page website for a specialty coffee shop, with an animated hero, menu cards, a contact form and a map.",
    overview:
      "Ember & Grounds is a single-page website for a specialty coffee house. It has a full-screen hero with a floating cup and rising steam, an Our Story section, signature menu cards, contact details with a form, and an embedded map. The design is built on CSS custom properties, with Flexbox and Grid for layout and media queries for tablets and phones.",
    features: [
      "Fixed, blurred navigation bar that turns into a full-screen menu on phones",
      "Animated hero: floating cup, rising steam and staggered fade-in text",
      "Signature menu cards with hover lift and Popular / Seasonal badges",
      "Sections that fade in as you scroll, using IntersectionObserver",
      "Contact form with a sent confirmation, and an embedded Google Map",
      "Colours and shadows defined once as CSS custom properties"
    ],
    challenges:
      "Getting the layout right at every width without a framework took the most work: the about and contact sections switch from two columns to one, the menu grid reflows, and the navigation becomes a toggle menu on small screens. When revising it for this portfolio, I moved the animated coffee cup so it no longer covers the hero text, and adjusted the menu grid so the four cards sit in one row on desktop.",
    role: "Solo developer",
    featured: true,
    image: "assets/images/ember-and-grounds.jpg",
    liveUrl: "demos/ember-and-grounds/index.html",
    repoUrl: ""
  }
];

const CATEGORY_LABELS = {
  html: "HTML/CSS",
  jquery: "jQuery",
  js: "JavaScript",
  react: "React",
  node: "Node"
};
