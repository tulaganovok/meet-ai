import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)/')({
  component: MarketingPage,
})

function MarketingPage() {
  return <div>Hello "/(marketing)/"!</div>
}
