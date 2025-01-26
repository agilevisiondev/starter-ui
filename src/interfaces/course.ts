/**
 * @param class_id number
 * @param classLabel string
 * @param subject_id number
 * @param subjectName string
 * @param color string
 * @param course_id number
 * @param courseName string
 * @param courseLabel string
 * @param courseDescription string
 **/

export interface ICourse {
  class_id: number
  classLabel: string
  subject_id: number
  subjectName: string
  color: string
  course_id: number
  courseName: string
  courseLabel: string
  courseDescription?: string
}
