// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './features/user/collection/config'
import { Posts } from './features/post/collection/config'
import { Categories } from './features/categories/collections/config'
import { Media } from './features/media/collection/Media'
import { Page } from './features/pages/collections/config'
import getCloudStoragePlugin from './plugins/cloud-storage-plugin'
import { endpointsV1 } from './api/v1'
import { defaultLexical } from './fields/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  endpoints: [...endpointsV1],
  collections: [Users, Posts, Categories, Media, Page],
  editor: defaultLexical,
  // editor:
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URI || '',
  //   },
  // }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || 'Untitled'} | Your Site Name`,
      generateDescription: ({ doc }) => doc?.excerpt || doc?.meta?.description || '',
    }),
    // getCloudStoragePlugin(),
    // storage-adapter-placeholder
  ],
})
