export type Education = {
  id: string
  school: string
  logo?: string
  website?: string
  level?: string
  degree?: string
  fieldOfStudy?: string
  period: {
    start: string
    end?: string
  }
  description?: string
  skills?: string[]
  isExpanded?: boolean
}
