import Hero from '../Hero'

export default function HeroExample() {
  return (
    <Hero
      onGetStarted={() => console.log('Get started clicked')}
      onSearch={(query) => console.log('Search:', query)}
    />
  )
}