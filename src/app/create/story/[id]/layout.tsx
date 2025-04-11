export default function StoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
} 