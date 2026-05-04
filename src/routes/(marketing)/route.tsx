import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)')({
  component: MarketingLayout,
})

function MarketingLayout() {
  return <div>Hello "/(marketing)"!</div>
}
