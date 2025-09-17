import FeatureCard from "../FeatureCard.tsx";

interface FeatureData {
  title: string;
  features: string[];
}

const featureData: FeatureData[] = [
  {
    title: "Shopping and Browsing",
    features: [
      "Product listing & Detail pages",
      "Category filtering & Search (title, slug, price, range)",
      "Pagination for better browsing",
    ],
  },
  {
    title: "Authentication & User Experience",
    features: [
      "Simulated login & JWT authentication",
      "Create new user",
      "Edit profile info",
      "Persistent cart (localStorage)",
    ],
  },
  {
    title: "Cart System",
    features: [
      "Add/remove items",
      "Quantity control",
      "Clear cart",
      "Toast Notifications",
    ],
  },
  {
    title: "Admin & Role-based Access",
    features: [
      "Protected routes (Admin & Customer)",
      "Admin sidebar navigation",
      "Admin Dashboard",
    ],
  },
];

export default function TechFeatures() {
  return (
    <section className="mt-20">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
        Key Features
      </h2>
      <div className="mt-10">
        {featureData.map((data) => (
          <FeatureCard title={data.title} features={data.features} />
        ))}
      </div>
    </section>
  );
}
