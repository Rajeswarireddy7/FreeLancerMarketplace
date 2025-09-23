import JobCard from '../JobCard'

export default function JobCardExample() {
  return (
    <div className="p-4 max-w-md">
      <JobCard
        id="job-1"
        title="Build a Modern E-commerce Website with React"
        description="Looking for an experienced React developer to build a full-featured e-commerce platform. The project includes user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard. Must have experience with modern React patterns and state management."
        budget={{
          min: 2500,
          max: 4000,
          type: "fixed"
        }}
        duration="2-3 months"
        location="Remote"
        skills={["React", "Node.js", "TypeScript", "MongoDB", "Stripe API", "TailwindCSS"]}
        postedTime="2 hours ago"
        client={{
          name: "Tech Startup Inc.",
          rating: 4.8,
          totalSpent: 15000
        }}
        proposalsCount={12}
        onApply={() => console.log('Apply clicked')}
        onSave={() => console.log('Save clicked')}
      />
    </div>
  )
}