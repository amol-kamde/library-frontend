import { Link } from "react-router-dom";

interface Props {
  title: string;
  buttonText?: string;
  buttonLink?: string;
}

function PageHeader({ title, buttonText, buttonLink }: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="page-title mb-0">{title}</h2>

      {buttonText && buttonLink && (
        <Link to={buttonLink} className="btn btn-primary">
          {buttonText}
        </Link>
      )}
    </div>
  );
}

export default PageHeader;
