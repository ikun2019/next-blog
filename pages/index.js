import Head from 'next/head';
import Hero from '@/components/HomePage/Hero';
import FeaturedPosts from '@/components/HomePage/FeaturedPosts';
import { getFeaturedPosts } from '@/lib/posts-util';

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Welcome to my Blog</title>
        <meta name='description' content='I post about programming and web development' />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  }
}