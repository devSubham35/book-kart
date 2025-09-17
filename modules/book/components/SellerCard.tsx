import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SellerCardProps {
    name?: string;
    email?: string;
    location?: string;
    contactNo?: string;
    isVerified?: boolean;
}

export default function SellerCard({ name, email, location, isVerified, contactNo }: SellerCardProps) {

  return (
    <Card className="p-6 rounded-2xl shadow-none border">
      <CardContent className="p-0">
        <h2 className="font-semibold text-lg mb-4">Sold By</h2>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
            {name?.charAt(0)}
          </div>

          <div>
            <p className="text-base font-medium flex items-center gap-2">
              {name}
              {isVerified && (
                <span className="text-green-600 inline-flex items-center gap-1 text-sm font-normal">
                  <CheckCircle className="w-4 h-4" /> Verified
                </span>
              )}
            </p>
            <p className="text-sm mt-1">
              📍 {location}
            </p>
          </div>
        </div>

        <p className="text-sm mt-6">
          <span className="font-semibold mr-2">Contact</span> {contactNo}
        </p>
        <p className="text-sm mt-2">
          <span className="font-semibold mr-2">Email</span> {email}
        </p>
      </CardContent>
    </Card>
  )
}
