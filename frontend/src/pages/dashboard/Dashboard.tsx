import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/common/StatsCard";
import { getDashboardStats } from "../../services/dashboardService";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    borrowedBooks: 0,
    availableBooks: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardStats();

      setStats(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <PageHeader title="Dashboard" />

      <div className="row g-4">
        <div className="col-md-3">
          <StatsCard title="Total Books" value={stats.totalBooks} />
        </div>

        <div className="col-md-3">
          <StatsCard title="Total Members" value={stats.totalMembers} />
        </div>

        <div className="col-md-3">
          <StatsCard title="Borrowed Books" value={stats.borrowedBooks} />
        </div>

        <div className="col-md-3">
          <StatsCard title="Available Books" value={stats.availableBooks} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
