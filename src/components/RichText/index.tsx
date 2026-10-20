import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { nodeText, slugifyHeading } from '@/utilities/headings'
import { TableJSXConverter } from '@payloadcms/richtext-lexical/react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/guides/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...TableJSXConverter,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    const id = slugifyHeading(nodeText(node as never))
    return (
      <Tag id={id || undefined} className="scroll-mt-28">
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },
  upload: ({ node }) => {
    const doc = node.value as unknown
    if (!doc || typeof doc !== 'object') return null
    const file = doc as { mimeType?: string; url?: string; filename?: string; caption?: string }
    if (!file.mimeType?.startsWith('image')) {
      return <a href={file.url} rel="noopener noreferrer">{file.filename}</a>
    }
    const caption = (node.fields as { caption?: string } | undefined)?.caption || file.caption
    return (
      <figure className="my-8">
        <Media resource={doc as never} imgClassName="m-0 w-full rounded-xl" />
        {caption && <figcaption className="mt-3 text-center text-sm text-navy-900/60">{caption}</figcaption>}
      </figure>
    )
  },
  table: (args) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-navy-100">
      {(TableJSXConverter.table as (a: unknown) => React.ReactNode)(args)}
    </div>
  ),
  blocks: {
    banner: ({ node }) => <BannerBlock className="mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="my-8"
        imgClassName="m-0 w-full"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md prose-neutral max-w-none text-navy-900/90 prose-headings:font-serif prose-headings:text-navy-900 prose-p:text-navy-900/85 prose-li:text-navy-900/85 prose-strong:text-navy-900 prose-a:text-brand-600 prose-blockquote:border-brand-600 prose-blockquote:text-navy-900/80 prose-th:bg-mist prose-th:text-navy-900 prose-td:text-navy-900/85': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
