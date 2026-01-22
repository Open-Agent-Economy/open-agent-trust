import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Open Agent Trust SDK',
  description: 'Build trusted agent networks with on-chain reputation and attestations',
  base: '/open-agent-trust/',
  ignoreDeadLinks: true,
  lang: 'en-US',

  // Improve LLM and SEO discovery
  sitemap: {
    hostname: 'https://open-agent-economy.github.io/open-agent-trust/'
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Concepts', link: '/concepts/interactions' },
      { text: 'API', link: '/api/sdk-reference' },
      { text: 'Examples', link: '/examples/' },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/Open-Agent-Economy/open-agent-trust/releases' },
          { text: 'NPM', link: 'https://www.npmjs.com/package/@open-agent-economy/trust-sdk' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Why Trust SDK?', link: '/guide/why-trust-sdk' },
            { text: 'Installation', link: '/guide/getting-started' },
            { text: 'Prerequisites', link: '/guide/prerequisites' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        },
        {
          text: 'Integration',
          items: [
            { text: 'Registering Your Marketplace', link: '/guide/registering-marketplace' },
            { text: 'Agent Integration', link: '/guide/agent-integration' },
            { text: 'Agentic Flows', link: '/guide/agentic-flows' },
            { text: 'Read-Only Mode', link: '/guide/read-only' }
          ]
        },
        {
          text: 'Deployment',
          items: [
            { text: 'Network Addresses', link: '/guide/deployment-addresses' },
            { text: 'Testing on Base Sepolia', link: '/guide/testing' }
          ]
        }
      ],
      '/concepts/': [
        {
          text: 'Core Concepts',
          items: [
            { text: 'Interactions', link: '/concepts/interactions' },
            { text: 'Attestations', link: '/concepts/attestations' },
            { text: 'Trust Graph', link: '/concepts/trust-graph' },
            { text: 'Reputation Scores', link: '/concepts/reputation' }
          ]
        },
        {
          text: 'Architecture',
          items: [
            { text: 'System Overview', link: '/concepts/architecture' },
            { text: 'Smart Contracts', link: '/concepts/smart-contracts' },
            { text: 'Agent Identity', link: '/concepts/agent-identity' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'SDK Overview', link: '/api/sdk-reference' },
            { text: 'Configuration', link: '/api/configuration' },
            { text: 'Interactions', link: '/api/interactions' },
            { text: 'Attestations', link: '/api/attestations' },
            { text: 'Trust Graph', link: '/api/trust-graph' },
            { text: 'Reputation', link: '/api/reputation' },
            { text: 'Types', link: '/api/types' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: 'Basic Usage', link: '/examples/basic-usage' },
            { text: 'Marketplace Integration', link: '/examples/marketplace' },
            { text: 'Agent Workflows', link: '/examples/agent-workflows' },
            { text: 'Trust Networks', link: '/examples/trust-networks' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Open-Agent-Economy/open-agent-trust' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@open-agent-economy/trust-sdk' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Open Agent Economy'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/Open-Agent-Economy/open-agent-trust/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },

  head: [
    // Favicon and icons
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/open-agent-trust/og-image.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],

    // SEO meta tags
    ['meta', { name: 'keywords', content: 'agent trust, autonomous agents, blockchain reputation, agent attestations, trust graph, agent economy, web3 agents, AI agents, on-chain reputation, decentralized trust, agent identity, smart contracts, Base Sepolia, TypeScript SDK, agent marketplace' }],
    ['meta', { name: 'author', content: 'Open Agent Economy' }],
    ['meta', { name: 'robots', content: 'index, follow' }],

    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://open-agent-economy.github.io/open-agent-trust/' }],
    ['meta', { property: 'og:title', content: 'Open Agent Trust SDK - Build Trusted Agent Networks' }],
    ['meta', { property: 'og:description', content: 'TypeScript SDK for building verifiable, portable reputation systems for autonomous AI agents on blockchain. Record interactions, issue attestations, build trust networks, and calculate reputation scores.' }],
    ['meta', { property: 'og:image', content: 'https://open-agent-economy.github.io/open-agent-trust/og-image.svg' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site_name', content: 'Open Agent Trust SDK' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: 'https://open-agent-economy.github.io/open-agent-trust/' }],
    ['meta', { name: 'twitter:title', content: 'Open Agent Trust SDK - Build Trusted Agent Networks' }],
    ['meta', { name: 'twitter:description', content: 'TypeScript SDK for building verifiable reputation systems for autonomous AI agents. On-chain interactions, attestations, and trust graphs on Base Sepolia.' }],
    ['meta', { name: 'twitter:image', content: 'https://open-agent-economy.github.io/open-agent-trust/og-image.svg' }],

    // Additional meta for better indexing
    ['meta', { name: 'application-name', content: 'Open Agent Trust SDK' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Agent Trust SDK' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

    // Canonical URL
    ['link', { rel: 'canonical', href: 'https://open-agent-economy.github.io/open-agent-trust/' }],

    // JSON-LD Structured Data for better LLM understanding
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Open Agent Trust SDK',
      'description': 'TypeScript SDK for building verifiable, portable reputation systems for autonomous AI agents on blockchain',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Cross-platform',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'author': {
        '@type': 'Organization',
        'name': 'Open Agent Economy'
      },
      'programmingLanguage': 'TypeScript',
      'codeRepository': 'https://github.com/Open-Agent-Economy/open-agent-trust',
      'softwareVersion': '0.1.0',
      'keywords': 'agent trust, blockchain reputation, autonomous agents, attestations, trust graph, Web3, AI agents',
      'url': 'https://open-agent-economy.github.io/open-agent-trust/',
      'downloadUrl': 'https://www.npmjs.com/package/@open-agent-economy/trust-sdk',
      'installUrl': 'https://www.npmjs.com/package/@open-agent-economy/trust-sdk'
    })]
  ],

  // Add markdown config for better content structure
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    headers: {
      level: [2, 3]
    }
  }
})
