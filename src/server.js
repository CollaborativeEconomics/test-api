import Fastify from "fastify";
import cors from "@fastify/cors";
import { faker } from "@faker-js/faker";

const fastify = Fastify({ logger: true });

fastify.register(cors);

// Utility function to generate random solar credit data
const generateSolarCreditData = () => {
  const records = faker.number.int({ min: 1, max: 5 });
  return {
    total_count: records,
    count_exceeded: false,
    total_amount_retired: faker.number.float({ min: 10, max: 100, precision: 0.01 }),
    retirements: Array.from({ length: records }).map(() => ({
      issuance_date: faker.date.past().toISOString().split("T")[0],
      instrument_type: "Solar Credit",
      vintage_start: faker.date.past().toISOString().split("T")[0],
      vintage_end: faker.date.recent().toISOString().split("T")[0],
      total_vintage_quantity: faker.number.int({ min: 10000, max: 100000 }),
      vcs_id: faker.number.int({ min: 1000, max: 9999 }).toString(),
      vcs_name: "Solar Power Generation Project",
      vcs_category: "Renewable Energy",
      vcs_protocol: "SP001",
      additional_certifications: "LEED Gold",
      region: "North America",
      country: "USA",
      solar_credit_amount: faker.number.float({ min: 5, max: 50, precision: 0.01 }),
      serial_numbers: faker.string.uuid(),
      retirement_date: faker.date.past().toISOString().split("T")[0],
      retirement_beneficiary: `Solar Beneficiary ${faker.string.uuid()}`,
      certificate_id: faker.number.int({ min: 100000, max: 999999 }).toString(),
    })),
  };
};

// Mock test route
fastify.get("/api/test", async () => {
  return { message: "Hello test!" };
});

// Mock hooks route
fastify.get("/api/hooks", async (request) => {
  const trigger = request.query.triggerName;
  const orgId = request.query.orgId;
  if (orgId === "stellar" && trigger === "onceDaily") {
    return generateSolarCreditData();
  }
  return { message: "No matching hook found." };
});

// Mock solar credit quote
fastify.get("/api/solar-quote", async () => {
  return {
    solar_credit_amount: "1",
    total_cost: faker.number.float({ min: 10, max: 50, precision: 0.01 }).toString(),
    average_price: faker.number.float({ min: 10, max: 50, precision: 0.01 }).toString(),
  };
});

// Mock retirements endpoint
fastify.get("/api/registry/retirements", async (request) => {
  const address = request.query.for_address;
  const date = request.query.date_gte;
  const wrongAddress = address !== "GC53JCXZHW3SVNRE4CT6XFP46WX4ACFQU32P4PR3CU43OB7AKKMFXZ6Y";
  const wrongDate = Number(date) !== +new Date("2023-04-30");

  if (wrongAddress || wrongDate) {
    return { retirements: [] };
  }

  return generateSolarCreditData();
});

// Start the Fastify server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 