import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Open Agent Trust SDK',
  description: 'Build trusted agent networks with on-chain reputation and attestations',
  base: '/open-agent-trust/',
  ignoreDeadLinks: true,

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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Open Agent Trust SDK' }]
  ]
})
