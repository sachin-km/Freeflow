export async function generateStaticParams() {
  return [
    { projectId: 'new' },
    { projectId: 'demo' }
  ]
}

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 