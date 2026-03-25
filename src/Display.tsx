
interface DisplayProps {
  value: string;
}

const Display = ({ value }: DisplayProps) => <div className="display">{value}</div>;

export default Display;