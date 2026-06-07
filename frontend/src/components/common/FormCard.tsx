import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

function FormCard({
  title,
  children,
}: Props) {
  return (
    <div className="card shadow-sm border-0">

      <div className="card-body">

        <h4 className="page-title">
          {title}
        </h4>

        {children}

      </div>

    </div>
  );
}

export default FormCard;