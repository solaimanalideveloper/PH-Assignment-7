const Loading = () => {
  return (
    <div className="container mx-auto max-w-5xl animate-pulse px-4 py-6 sm:py-8">
      <div className="mb-4 h-4 w-56 rounded bg-gray-200" />
      <div className="mb-6 h-40 rounded-xl bg-gray-200 sm:h-32" />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="h-20 rounded-lg bg-gray-200" />
        <div className="h-20 rounded-lg bg-gray-200" />
        <div className="h-20 rounded-lg bg-gray-200" />
      </div>
      <div className="h-80 rounded-xl bg-gray-200" />
    </div>
  );
};

export default Loading;
