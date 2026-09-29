import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { writeups } from '@/lib/content'
import BlogPost from '@/components/BlogPost'

export function generateStaticParams() {
  return writeups.map((w) => ({ slug: w.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = writeups.find((w) => w.slug === params.slug)
  if (!post) return { title: 'Write-up not found' }
  return { title: `${post.title} | Antonio Beltran-Miller`, description: post.excerpt }
}

export default function WriteupPage({ params }: { params: { slug: string } }) {
  const post = writeups.find((w) => w.slug === params.slug)
  if (!post) notFound()
  return <BlogPost post={post} />
}
