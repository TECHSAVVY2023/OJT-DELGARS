<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 overflow-auto">
        <div class="p-8">
          <AdminDashboardWelcome />
          <AdminDashboardNotificationCard />
          <AdminDashboardStatsCards />
          <AdminDashboardStockOverview />
          <AdminDashboardSummaryCards />
        </div>
      </div>
    </main>
  </div>
</template>
            