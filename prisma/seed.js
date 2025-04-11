import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const shipments = [
    {
      operationNo: "OP-1003",
      status: "in_transit",
      shipper: "Ocean Freight Inc",
      cnee: "Fresh Foods Ltd",
      shipmentNumber: "EXP-4567",
      notify: "Liam Hart",
      terms: "FOB",
      origin: "Hamburg",
      destination: "Santos",
      etd: new Date("2025-04-18"),
      eta: new Date("2025-05-05"),
      mode: "sea",
      type: "fcl_20_std",
      operation: "expo",
      cargo: "general",
      weight: 2200,
      dimensions: "20x8x8.5 ft",
      declaredValue: 18000,
      carrier: "MSC",
      serviceProvider: "BlueWave Shipping",
      specialInstructions: "Temperature control required",
      freightCost: 4000,
      localExpenseCost: 1000,
      freightSale: 6000,
      localExpenseSale: 1400,
      profit: 2400,
      money: "eur",
      seller: "Carlos",
      commission: 200,
      transactionCode: "TXN-103345",
      paymentDate: new Date("2025-04-12"),
      documents: ["manifest.pdf", "invoice.pdf"],
    },
    {
      operationNo: "OP-1004",
      status: "processing",
      shipper: "Swift Couriers",
      cnee: "Tech World",
      shipmentNumber: "COU-7890",
      notify: "Emily Rose",
      terms: "DDP",
      origin: "Toronto",
      destination: "San Diego",
      etd: new Date("2025-04-20"),
      eta: new Date("2025-04-23"),
      mode: "courier",
      type: "lcl",
      operation: "expo",
      cargo: "others",
      weight: 50,
      dimensions: "1x1x1 ft",
      declaredValue: 3000,
      carrier: "DHL",
      serviceProvider: "QuickLine",
      specialInstructions: "Urgent delivery",
      freightCost: 150,
      localExpenseCost: 30,
      freightSale: 300,
      localExpenseSale: 50,
      profit: 170,
      money: "usd",
      seller: "John",
      commission: 50,
      transactionCode: "TXN-109876",
      paymentDate: new Date("2025-04-09"),
      documents: ["label.pdf", "receipt.pdf"],
    },
  ];

  for (const shipment of shipments) {
    const created = await prisma.shipment.create({ data: shipment });
    console.log("📦 Shipment created:", created.operationNo);
  }
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
