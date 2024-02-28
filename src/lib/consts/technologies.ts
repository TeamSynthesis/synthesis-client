const TECH_CATEGORIES = ["frontend", "core", "backend", "database", "infra"];
const BASE_ICON_URL =
  "https://raw.githubusercontent.com/TeamSynthesis/devicon/master/icons/";

const TECHNOLOGIES = [
  {
    title: "HTML5",
    category: "frontend",
    icon: BASE_ICON_URL + "html5/html5-original.svg",
  },
  {
    title: "CSS3",
    category: "frontend",
    icon: BASE_ICON_URL + "css3/css3-original.svg",
  },

  {
    title: "React",
    category: "frontend",
    icon: BASE_ICON_URL + "react/react-original.svg",
  },
  {
    title: "Svelte",
    category: "frontend",
    icon: BASE_ICON_URL + "svelte/svelte-original.svg",
  },
  {
    title: "Vue",
    category: "frontend",
    icon: BASE_ICON_URL + "vuejs/vuejs-original.svg",
  },
  {
    title: "Angular",
    category: "frontend",
    icon: BASE_ICON_URL + "angular/angular-original.svg",
  },
  {
    title: "Bootstrap",
    category: "frontend",
    icon: BASE_ICON_URL + "bootstrap/bootstrap-original.svg",
  },

  {
    title: "Tailwind CSS",
    category: "frontend",
    icon: BASE_ICON_URL + "tailwindcss/tailwindcss-original.svg",
  },
  {
    title: "JQuery",
    category: "frontend",
    icon: BASE_ICON_URL + "jquery/jquery-original.svg",
  },
  {
    title: "Flutter",
    category: "frontend",
    icon: BASE_ICON_URL + "flutter/flutter-original.svg",
  },
  {
    title: "PHP",
    category: "core",
    icon: BASE_ICON_URL + "php/php-original.svg",
  },
  {
    title: "JavaScript",
    category: "core",
    icon: BASE_ICON_URL + "javascript/javascript-original.svg",
  },
  {
    title: "TypeScript",
    category: "core",
    icon: BASE_ICON_URL + "typescript/typescript-original.svg",
  },
  {
    title: "Go",
    category: "core",
    icon: BASE_ICON_URL + "go/go-original.svg",
  },
  {
    title: "Ruby",
    category: "core",
    icon: BASE_ICON_URL + "ruby/ruby-original.svg",
  },
  {
    title: "Java",
    category: "core",
    icon: BASE_ICON_URL + "java/java-original.svg",
  },
  {
    title: "Python",
    category: "core",
    icon: BASE_ICON_URL + "python/python-original.svg",
  },
  {
    title: "C++",
    category: "core",
    icon: BASE_ICON_URL + "cplusplus/cplusplus-original.svg",
  },
  {
    title: "C#",
    category: "core",
    icon: BASE_ICON_URL + "csharp/csharp-original.svg",
  },
  {
    title: "Rust",
    category: "core",
    icon: BASE_ICON_URL + "rust/rust-original.svg",
  },
  {
    title: "Swift",
    category: "core",
    icon: BASE_ICON_URL + "swift/swift-original.svg",
  },
  {
    title: "Kotlin",
    category: "core",
    icon: BASE_ICON_URL + "kotlin/kotlin-original.svg",
  },

  {
    title: "Node.js",
    category: "backend",
    icon: BASE_ICON_URL + "nodejs/nodejs-original.svg",
  },
  {
    title: "Django",
    category: "backend",
    icon: BASE_ICON_URL + "django/django-original.svg",
  },
  {
    title: "Flask",
    category: "backend",
    icon: BASE_ICON_URL + "flask/flask-original.svg",
  },
  {
    title: "FastAPI",
    category: "backend",
    icon: BASE_ICON_URL + "fastapi/fastapi-original.svg",
  },
  {
    title: "Spring",
    category: "backend",
    icon: BASE_ICON_URL + "spring/spring-original.svg",
  },
  {
    title: "Express",
    category: "backend",
    icon: BASE_ICON_URL + "express/express-original.svg",
  },
  {
    title: "Ruby on Rails",
    category: "backend",
    icon: BASE_ICON_URL + "rails/rails-original-wordmark.svg",
  },
  {
    title: "Laravel",
    category: "backend",
    icon: BASE_ICON_URL + "laravel/laravel-original.svg",
  },
  {
    title: "ASP.NET",
    category: "backend",
    icon: BASE_ICON_URL + "dot-net/dot-net-original.svg",
  },

  {
    title: "MySQL",
    category: "database",
    icon: BASE_ICON_URL + "mysql/mysql-original.svg",
  },
  {
    title: "PostgreSQL",
    category: "database",
    icon: BASE_ICON_URL + "postgresql/postgresql-original.svg",
  },
  {
    title: "MongoDB",
    category: "database",
    icon: BASE_ICON_URL + "mongodb/mongodb-original.svg",
  },
  {
    title: "SQLite",
    category: "database",
    icon: BASE_ICON_URL + "sqlite/sqlite-original.svg",
  },
  {
    title: "Redis",
    category: "database",
    icon: BASE_ICON_URL + "redis/redis-original.svg",
  },
  {
    title: "Cassandra",
    category: "database",
    icon: BASE_ICON_URL + "cassandra/cassandra-original.svg",
  },

  {
    title: "Amazon Web Services (AWS)",
    category: "infra",
    icon:
      BASE_ICON_URL +
      "amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    title: "Google Cloud Platform (GCP)",
    category: "infra",
    icon: BASE_ICON_URL + "googlecloud/googlecloud-original.svg",
  },
  {
    title: "Microsoft Azure",
    category: "infra",
    icon: BASE_ICON_URL + "azure/azure-original.svg",
  },
  {
    title: "DigitalOcean",
    category: "infra",
    icon: BASE_ICON_URL + "digitalocean/digitalocean-original.svg",
  },
  {
    title: "Heroku",
    category: "infra",
    icon: BASE_ICON_URL + "heroku/heroku-original.svg",
  },
  {
    title: "Netlify",
    category: "infra",
    icon: BASE_ICON_URL + "netlify/netlify-original.svg",
  },
  {
    title: "Cloudflare",
    category: "infra",
    icon: BASE_ICON_URL + "cloudflare/cloudflare-original.svg",
  },
  {
    title: "Vercel",
    category: "infra",
    icon: BASE_ICON_URL + "vercel/vercel-original.svg",
  },
];

export { TECHNOLOGIES, TECH_CATEGORIES };
