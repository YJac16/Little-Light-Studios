import { Link } from 'react-router-dom'
import storiesData from '../data/stories.json'

interface Story {
  id: string
  title: string
}

const categoryConfig = {
  napStories: {
    title: 'Nap Stories',
    icon: '☁️',
    stories: storiesData.napStories as Story[],
  },
  bedtimeStories: {
    title: 'Bedtime Stories',
    icon: '🌙',
    stories: storiesData.bedtimeStories as Story[],
  },
}

function StoryList({ category, path }: { category: keyof typeof categoryConfig; path: string }) {
  const config = categoryConfig[category]
  return (
    <section className="mb-10">
      <h3 className="flex items-center gap-2 text-lg font-serif font-medium text-ink mb-4">
        <span aria-hidden>{config.icon}</span>
        {config.title}
      </h3>
      <ul className="space-y-2">
        {config.stories.map((story) => (
          <li key={story.id}>
            <Link
              to={`/stories/${path}/${story.id}`}
              className="block min-h-[56px] p-4 sm:p-5 rounded-xl bg-white border border-sage-light/30 hover:border-sage-light/50 hover:shadow-sm active:scale-[0.99] transition-all text-ink touch-manipulation"
            >
              <span className="font-medium">{story.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function StoriesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
      <h2 className="text-xl font-serif font-medium text-ink mb-8">
        Stories for Rest & Sleep
      </h2>
      <StoryList category="napStories" path="nap" />
      <StoryList category="bedtimeStories" path="bedtime" />
    </main>
  )
}
