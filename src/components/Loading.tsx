export default function Loading() {
  return (
    <>
      <div className="w-full h-20 animate-pulse bg-gray-200 rounded-md" />
      {[...Array(8)].map((element, index) => (
        <div
          key={index}
          className="w-full h-20 animate-pulse bg-gray-200 rounded-md mt-2"
        />
      ))}
    </>
  );
}
