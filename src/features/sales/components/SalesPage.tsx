import {
  SalesCategoryChart,
  SalesPaymentChart,
  SalesPaymentMethodChart,
  SalesRevenueChart,
  SalesStatsDashboard,
  SalesTopProductsChart,
} from "@/features/sales";

function SalesPage() {
  return (
    <>
      <div className="space-y-6">
        <SalesStatsDashboard />
        <SalesRevenueChart />
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-6 my-6 xl:grid-cols-2 ">
        <SalesPaymentMethodChart />
        <SalesPaymentChart />
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
        <SalesCategoryChart />
        <SalesTopProductsChart />
      </div>
    </>
  );
}

export default SalesPage;
