import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'fs';
import path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Orbits documentation',
  tagline: 'Keep your orbit in the cloud galaxy.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://orbits.do',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lawebcapsule', // Usually your GitHub org/user name.
  projectName: 'orbits', // Usually your repo name.
  //trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],


  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {name: 'keywords', content: 'Orchestration, DevOps, Cloud, Workflows, Typescript, Automation, Platform engineering'},
    ],
    navbar: {
      title: 'Orbits',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
        href: 'https://orbits.do',
        target: '_self',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'typedocSidebar',
          position: 'left',
          label: 'API',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/LaWebcapsule/orbits',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: 'https://orbits.do/documentation/quick-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://join.slack.com/t/orbitsgroupe/shared_invite/zt-394jwf72o-utjAV~odD32GhyKnhjnDFQ',
            },
            /*{
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },*/
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/LaWebcapsule/orbits',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Webcapsule`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      // Options
      {
        sidebar: {
          autoConfiguration: true,
        },
        entryPoints: [
          './../core/actions',
          // './helpers',
          // './packages'
        ],
        entryPointStrategy: 'packages',
        tsconfig: "./../core/actions/tsconfig.json",
        externalPattern: [
          '**/node_modules/**'
        ],
        readme: 'none',
        excludeExternals:true,
        excludeInternal: true
      },
    ],
    async function webflowIntegrationPlugin(context, options) {
      // ...
      return {
        name: 'webflow-integration-plugin',
        async postBuild() {
          //copy the static home (webflow) directory
          //to the root of the website
          //and override some default webflow images
          await fs.promises.cp(
            path.join(context.siteDir, 'static/home'),
            path.join(context.outDir),
            {
              recursive: true,
              force: true,
            }
          )
          await fs.promises.copyFile(
            path.join(context.siteDir ,'static/img/favicon.ico'),
            path.join(context.outDir, 'images/favicon.ico'));
          await fs.promises.copyFile(
            path.join(context.siteDir,'static/img/docusaurus.png'),
            path.join(context.outDir, 'images/webclip.png')
          );  
        
        }
      };
    },
  ],
};

export default config;
