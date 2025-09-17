import checklist from "../assets/checklist.png";

export default function FeatureCard({
  title,
  features,
}: {
  title: string;
  features: string[];
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-3
    "
    >
      <h3 className="poppins-medium text-purple-600">{title}</h3>
      <ul className="mt-3 text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-2 items-start mt-1">
            <img src={checklist} alt="checkmark" className="w-3 mt-[2px]" />
            <p className="text-xs">{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
