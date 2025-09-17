import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaBook, FaLayerGroup, FaClipboardList, FaPenFancy, FaCheckCircle } from "react-icons/fa"

interface BookDetailsCardProps {
  subject: string
  course: string
  category: string
  author: string
  edition: string
  condition: string
}

const BookDetailsCard = ({
  subject,
  course,
  category,
  author,
  edition,
  condition,
}: BookDetailsCardProps) => {
  const details = [
    { label: "Subject/Title", value: subject, icon: <FaBook className="text-blue-500" /> },
    { label: "Course", value: course, icon: <FaClipboardList className="text-green-500" /> },
    { label: "Category", value: category, icon: <FaLayerGroup className="text-purple-500" /> },
    { label: "Author", value: author, icon: <FaPenFancy className="text-orange-500" /> },
    { label: "Edition", value: edition, icon: <FaBook className="text-teal-500" /> },
    { label: "Condition", value: condition, icon: <FaCheckCircle className="text-emerald-500" /> },
  ]

  return (
    <Card className="p-6 mt-6 rounded-2xl shadow-none border">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold">Book Details</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-2 rounded-lg transition"
            >
              <div className="text-lg">{item.icon}</div>
              <div>
                <p className="text-sm">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default BookDetailsCard
