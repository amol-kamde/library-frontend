interface Props {
  title: string;
  value: number;
}

function StatsCard({ title, value }: Props) {
  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body text-center">
        <h6 className="text-muted">{title}</h6>

        <h2 className="fw-bold">{value}</h2>
      </div>
    </div>
  );
}

export default StatsCard;
