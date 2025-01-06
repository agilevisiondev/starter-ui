export default function Home() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Important Principles!</h2>
      <ul className="text-sm list-disc pl-6">
        <li>
          Mobile First Responsive Design (Designing for breakpoints ie. mobile,
          tablet, laptop, desktops)
        </li>
        <li>Code Reusablity and avoiding duplication</li>
        <li>
          Make small test-able changes rather than diving straight into a big
          task
        </li>
      </ul>
    </div>
  );
}
