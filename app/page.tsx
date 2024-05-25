import Image from "next/image";
import { Details, columns } from "./columns";
import { DataTable } from "./data-tables";

async function getData(): Promise<Details[]> {
  return [
    {
      member_number: "M12345",
      created_at: "2023-10-04T12:30:00",
      name: "John Doe",
      email: "john.doe@example.com",
      phone_number: "+1234567890",
      gender: "Male",
      zone: "North",
      service_unit: "Technical Support",
      conference_shirt: "L",
      fee_payment: "Credit Card",
      paid: true,
    },
  ];
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-16">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="container">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
