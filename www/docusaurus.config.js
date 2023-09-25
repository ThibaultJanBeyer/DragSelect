// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DragSelect',
  tagline: 'Easy javascript Drag-Select & Drop functionality done right.',
  url: 'https://DragSelect.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  scripts: [
    'https://assets.lemonsqueezy.com/lemon.js'
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "thibaultjanbeyer", // Usually your GitHub org/user name.
  projectName: "dragselect", // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    "docusaurus-plugin-sass",
    async function tailwind(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  themes: ["@docusaurus/theme-live-codeblock"],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;500;900&display=swap',
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/ThibaultJanBeyer/DragSelect",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: "TJ22T26SP7",
        apiKey: "f72a0eb90358d7a0644c0157d20833bf",
        indexName: "dragselect",
      },
      metadata: [
        {
          name: "keywords",
          content:
            "javascript, npm, drag-and-drop, drag, selection, dragselect, drag-n-drop, drag-selection, drag-select, drag-selection library, open source, free",
        },
        { name: "author", content: "Thibault Jan Beyer" },
        {
          name: "description",
          content:
            "A JavaScript library for selecting and moving elements in the browser.",
        },
      ],
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: true,
      },
      image: "img/dragselect-logo-bg.png",
      navbar: {
        title: "DragSelect",
        logo: {
          alt: "DragSelect Logo",
          src: "img/favicon.ico",
        },
        items: [
          {
            href: '/licenses',
            position: 'left',
            label: 'Pricing',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Getting Started',
          },
          {
            href: "https://github.com/ThibaultJanBeyer/DragSelect",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `
        Designed & Build with love in Bonn, Germany by <a href="https://thibaultjanbeyer.com">Tibo</a> and the <a href="https://github.com/ThibaultJanBeyer/DragSelect">open source</a> community. <a href="/docs/info">Read more about it here</a>.
        `,
      },
    }),
};

module.exports = config;
