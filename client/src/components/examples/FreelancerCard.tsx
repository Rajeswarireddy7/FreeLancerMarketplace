import FreelancerCard from '../FreelancerCard'
import developerImage from "@assets/generated_images/Female_developer_profile_photo_174cac2f.png"

export default function FreelancerCardExample() {
  return (
    <div className="p-4 max-w-md">
      <FreelancerCard
        id="freelancer-1"
        name="Sarah Chen"
        title="Full-Stack Developer & UI/UX Designer"
        avatar={developerImage}
        rating={4.9}
        reviewCount={127}
        hourlyRate={75}
        location="San Francisco, CA"
        description="Experienced full-stack developer with 6+ years building scalable web applications. Specialized in React, Node.js, and modern UI/UX design. I help startups and enterprises create beautiful, functional products that users love."
        skills={["React", "Node.js", "TypeScript", "Python", "UI/UX Design", "AWS"]}
        completedJobs={89}
        successRate={98}
        isOnline={true}
        onViewProfile={() => console.log('View profile clicked')}
        onInvite={() => console.log('Invite clicked')}
        onSave={() => console.log('Save clicked')}
      />
    </div>
  )
}