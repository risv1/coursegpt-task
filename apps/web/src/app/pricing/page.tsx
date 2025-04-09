import React from "react";
import { FiCheck } from "react-icons/fi";
import Footer from "@/components/common/Footer";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with basic course creation",
    features: [
      "3 courses per month",
      "Basic AI lesson generation",
      "Simple course organization",
      "Standard templates",
      "Email support",
    ],
    cta: "Get Started",
    ctaLink: "/auth/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Enhanced tools for professional educators",
    features: [
      "Unlimited courses",
      "Advanced AI content generation",
      "Priority support",
      "Custom templates",
      "Analytics dashboard",
      "Collaboration tools",
      "Export to multiple formats",
    ],
    cta: "Start 14-day free trial",
    ctaLink: "/auth/register?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with specific requirements",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Custom AI training",
      "SSO authentication",
      "API access",
      "Compliance features",
      "SLA guarantees",
    ],
    cta: "Contact us",
    ctaLink: "/contact",
    highlighted: false,
  },
];

const PricingPage = () => {
  return (
    <>
      <div className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              Transparent <span className="text-red-400">Pricing</span>
            </h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Choose the plan that works best for your course creation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${
                  plan.highlighted
                    ? "border-red-400 shadow-lg"
                    : "border-neutral-200 dark:border-neutral-800"
                } bg-white dark:bg-neutral-900 flex flex-col h-full`}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {plan.name}
                  </h2>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2 mb-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                      >
                        <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.ctaLink}
                  className={`py-3 px-6 rounded-lg font-medium text-center transition-colors ${
                    plan.highlighted
                      ? "bg-red-400 hover:bg-red-500 text-white"
                      : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
              Need a custom solution?
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
              Contact our team to discuss your specific requirements and get a
              tailored plan for your organization.
            </p>
            <a
              href="/contact"
              className="inline-block py-3 px-6 rounded-lg font-medium bg-red-400 hover:bg-red-500 text-white transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
