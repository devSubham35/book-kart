interface AccountHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function AccountHeader({
  title,
  description,
  className = "",
}: AccountHeaderProps) {
  return (
    <div className={`pb-2 ${className}`}>
      <h1 className="text-xl font-bold">{title}</h1>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
