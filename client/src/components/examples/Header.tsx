import Header from '../Header'

export default function HeaderExample() {
  return (
    <Header
      userRole="freelancer"
      onLogin={() => console.log('Login clicked')}
      onPostJob={() => console.log('Post job clicked')}
    />
  )
}