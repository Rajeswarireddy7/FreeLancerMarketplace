import { useState } from 'react'
import JobModal from '../JobModal'
import { Button } from '@/components/ui/button'

export default function JobModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Job Posting Modal
      </Button>
      <JobModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onJobPosted={(jobData) => {
          console.log('Job posted:', jobData)
          setIsOpen(false)
        }}
      />
    </div>
  )
}