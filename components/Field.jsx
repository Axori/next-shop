export const Field = ({label, children}) => {
  return (
    <label className="block my-2">
      <span className="block text-sm text-grey-600">{label}</span>
      {children}
    </label>
  );
};