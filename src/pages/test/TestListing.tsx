import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import SimpleFormField from "@/components/elements/SimpleFormField"
import DashboardPage from "@/layouts/DashboardPage"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"

export default function TestListing() {
  const intialTestValues = {
    selectedClass: "",
    title: "",
    description: "",
    date: "",
    duration: "",
    noOfQuestions: 1,
    attempts: false, //optional - number of attempts it retest allowed
  }
  const navigate = useNavigate()

  return (
    <div>
      <DashboardPage>
        <DashboardPageTitle
          title="Your Assessments"
          subTitle="Manage your tests."
          actionElement={
            <Link to="/add-test">
              <Button>Add Test</Button>
            </Link>
          }
        />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8"></div> */}
      </DashboardPage>
    </div>
  )
}
