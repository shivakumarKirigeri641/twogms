const getRandomNumber = require("./getRandomNumber");

const getServiceCheckLists = (count = 3) => {
  return [
    {
      item: "Engine Oil Replacement",
      description:
        "Drain old engine oil and refill with new oil suitable for bike model and usage.",
    },
    {
      item: "Oil Filter Check/Replacement",
      description:
        "Inspect oil filter for blockage or wear; replace if necessary.",
    },
    {
      item: "Air Filter Cleaning/Replacement",
      description:
        "Clean or replace air filter to ensure proper air-fuel mixture and engine performance.",
    },
    {
      item: "Spark Plug Inspection",
      description:
        "Check spark plug for carbon buildup, wear or damage; clean or replace if needed.",
    },
    {
      item: "Brake Inspection",
      description:
        "Check front and rear brakes (disc/pad/shoe); adjust or replace as needed for safety.",
    },
    {
      item: "Chain Lubrication & Adjustment",
      description:
        "Lubricate chain and adjust tension to optimal level for smooth ride and longevity.",
    },
    {
      item: "Clutch Adjustment",
      description:
        "Check clutch play and adjust to ensure proper engagement and disengagement.",
    },
    {
      item: "Throttle Adjustment",
      description:
        "Inspect throttle cable and adjust for smooth and responsive acceleration.",
    },
    {
      item: "Coolant Level Check",
      description:
        "Check coolant level in radiator (for liquid-cooled bikes) and top up if required.",
    },
    {
      item: "Battery Check",
      description:
        "Inspect battery voltage and terminals for corrosion; refill distilled water for lead-acid types.",
    },
    {
      item: "Tyre Inspection",
      description:
        "Check tyre wear, tread depth, and air pressure; inspect for cracks or punctures.",
    },
    {
      item: "Suspension Check",
      description:
        "Inspect front forks and rear shocks for leaks and damping performance.",
    },
    {
      item: "Electrical Check",
      description:
        "Inspect lights, horn, indicators, and wiring for faults or loose connections.",
    },
    {
      item: "Fuel System Check",
      description:
        "Inspect fuel lines and fuel filter for leaks or blockages; check for proper flow.",
    },
    {
      item: "Exhaust System Inspection",
      description:
        "Check for unusual sounds, carbon deposit, or damage in the exhaust system.",
    },
    {
      item: "General Cleaning",
      description:
        "Thorough external wash and polish; degrease engine area and clean hard-to-reach parts.",
    },
    {
      item: "Road Test",
      description:
        "Test ride the vehicle to ensure all systems are functioning properly after service.",
    },
  ];
};
module.exports = getServiceCheckLists;
