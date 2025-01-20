import { SlidersHorizontal, X } from "lucide-react"
import { Input } from "./components/ui/input"
import { useState } from "react"
import { Label } from "./components/ui/label"

const Orders = () => {
  const tableStyle = `px-3 py-5`
  const tableHeadingStyle = `p-3`

  const [searchItem, setsearchItem] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    mobile: "",
  })
  const [tempFilters, setTempFilters] = useState(filters)

  function handleIsOpen() {
    setIsOpen(!isOpen)
  }

  const orders = [
    {
      id: "SG123432345",
      customer: "Mukesh Arora",
      email: "mukesharora@gmail.com",
      mobile: "9876543212",
      date: "29 Mar, 2024",
      package: "0.04 kg",
      aws: "SG123432345",
    },
    {
      id: "SG123432346",
      customer: "Rahul Sharma",
      email: "rahulsharma@gmail.com",
      mobile: "8765432109",
      date: "30 Mar, 2024",
      package: "0.10 kg",
      aws: "SG123432346",
    },
    {
      id: "SG123432347",
      customer: "Anjali Mehta",
      email: "anjalimehta@gmail.com",
      mobile: "7654321098",
      date: "31 Mar, 2024",
      package: "0.05 kg",
      aws: "SG123432347",
    },
    {
      id: "SG123432348",
      customer: "Suresh Kumar",
      email: "sureshkumar@gmail.com",
      mobile: "6543210987",
      date: "01 Apr, 2024",
      package: "0.12 kg",
      aws: "SG123432348",
    },
  ]

  const searchOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchItem.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchItem.toLowerCase()) ||
      order.date.toLowerCase().includes(searchItem.toLowerCase()) ||
      order.package.toLowerCase().includes(searchItem.toLowerCase()) ||
      order.aws.toLowerCase().includes(searchItem.toLowerCase()),
  )

  const filteredOrders = orders.filter((order) => {
    const matchesName = filters.name ? order.customer.toLowerCase().includes(filters.name.toLowerCase()) : true
    const matchesEmail = filters.email ? order.email.toLowerCase().includes(filters.email.toLowerCase()) : true
    const matchesMobile = filters.mobile ? order.mobile.includes(filters.mobile) : true
    return matchesName && matchesEmail && matchesMobile
  })

  const activeFilters = Object.values(filters).filter((len) => len).length

  return (
    <div>
      <div className="flex mt-5">
        <Input
          type="search"
          className="w-80 ml-10"
          placeholder="Search Orders..."
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
        />
        <button
          className="px-5 h-10 py-1.5 border border-gray-400 rounded-lg ml-5 flex items-center gap-2"
          onClick={handleIsOpen}
        >
          <SlidersHorizontal className="size-4" />

          <span className="flex items-center gap-2">
            Filter{" "}
            {activeFilters > 0 && (
              <div className="bg-blue-600 text-white rounded-full h-5 w-5 text-sm">{activeFilters}</div>
            )}
          </span>
        </button>

        {activeFilters > 0 && (
          <div className="flex gap-2">
            {filters.name && (
              <p className="ml-2 text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1.5">
                {filters.name}
                <X
                  onClick={() => setFilters({ name: "", email: filters.email, mobile: filters.mobile })}
                  className="inline cursor-pointer ml-2"
                />
              </p>
            )}
            {filters.email && (
              <p className="ml-2 text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1.5">
                {filters.email}
                <X
                  onClick={() => setFilters({ name: filters.name, email: "", mobile: filters.mobile })}
                  className="inline cursor-pointer ml-2"
                />
              </p>
            )}
            {filters.mobile && (
              <p className="ml-2 text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1.5">
                {filters.mobile}
                <X
                  onClick={() => setFilters({ name: filters.name, email: filters.email, mobile: "" })}
                  className="inline cursor-pointer ml-2"
                />
              </p>
            )}
          </div>
        )}
      </div>
      {isOpen && (
        <FilterComponent
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          setFilters={setFilters}
          setIsOpen={setIsOpen}
        />
      )}

      <table className="w-11/12 mx-auto mt-5">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-400 text-sm">
            <th className={`${tableHeadingStyle}`}>
              <div>Order Id</div>
            </th>
            <th className={`${tableHeadingStyle}`}>Customer Details</th>
            <th className={`${tableHeadingStyle}`}>Order Date</th>
            <th className={`${tableHeadingStyle}`}>Package Details</th>
            <th className={`${tableHeadingStyle}`}>Status</th>
            <th className={`${tableHeadingStyle}`}>Last mile AWS</th>
          </tr>
        </thead>
        <tbody>
          {(searchItem ? searchOrders : filteredOrders).map((order, index) => (
            <tr key={index} className="border-2 border-gray-100 rounded-xl">
              <td className={`${tableStyle}`}>
                <span className="text-blue-500">{order.id}</span> - US
                <p className="text-xs text-gray-500">Ref no. 123-456-8987</p>
                <p className="text-xs text-gray-500">Invoice no. 123-456-8987</p>
              </td>

              <td>
                {order.customer}
                <p className="text-xs text-gray-500">{order.email}</p>
                <p className="text-xs text-gray-500">{order.mobile}</p>
              </td>

              <td className={`${tableStyle}`}>
                {order.date}
                <p className="text-xs text-gray-500">10:30 am</p>
              </td>
              <td className={`${tableStyle}`}>
                {order.package}
                <p className="text-xs text-gray-500">CSV-IV</p>
              </td>
              <td>
                <Badge />
              </td>
              <td>
                {order.aws}
                <p className="text-xs text-gray-500">SP-USPS</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Badge = () => {
  return <div className="text-green-600 text-xs rounded-full border border-green-600 p-1 w-3/4">Received</div>
}

const FilterComponent = ({
  tempFilters,
  setTempFilters,
  setFilters,
  setIsOpen,
}: {
  tempFilters: any
  setTempFilters: any
  setFilters: any
  setIsOpen: any
}) => {
  const handleFilterChange = (key: string, value: string) => {
    setTempFilters((prev: any) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    setFilters(tempFilters)
    setIsOpen(false)
  }

  return (
    <div className="w-80 max-h-max bg-white shadow-lg p-5 fixed right-96">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">Filters</p>
        <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
      </div>
      <hr />
      <FilterComponentField
        label="Customer Name"
        placeholder="Search by name..."
        value={tempFilters.name}
        onChange={(val: string) => handleFilterChange("name", val)}
      />
      <FilterComponentField
        label="Customer Email"
        placeholder="Search by email..."
        value={tempFilters.email}
        onChange={(val: string) => handleFilterChange("email", val)}
      />
      <FilterComponentField
        label="Customer Mobile"
        placeholder="Search by mobile..."
        value={tempFilters.mobile}
        onChange={(val: string) => handleFilterChange("mobile", val)}
      />
      <div className="flex justify-end gap-5 mt-8 w-full">
        <button
          className="text-blue-700 cursor-pointer"
          onClick={() => setTempFilters({ name: "", email: "", mobile: "" })}
        >
          Clear All
        </button>
        <button
          className="bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600 text-white px-5 py-2"
          onClick={applyFilters}
        >
          Apply
        </button>
      </div>
    </div>
  )
}

const FilterComponentField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (val: string) => void
}) => {
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <p className="text-blue-700 cursor-pointer" onClick={() => onChange("")}>
          Reset
        </p>
      </div>
      <Input
        className="mt-2"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Orders
