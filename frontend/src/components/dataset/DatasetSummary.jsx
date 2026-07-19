function DatasetSummary({ dataset, profile }) {
  if (!dataset || !profile) {
    return null;
  }

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} Bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Dataset Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Dataset Name</p>
          <h3 className="font-semibold">
            {dataset.original_filename}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Rows</p>
          <h3 className="font-semibold">
            {profile.shape.rows}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Columns</p>
          <h3 className="font-semibold">
            {profile.shape.columns}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Numerical Columns
          </p>
          <h3 className="font-semibold">
            {profile.numerical_columns.length}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Categorical Columns
          </p>
          <h3 className="font-semibold">
            {profile.categorical_columns.length}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Duplicate Rows
          </p>
          <h3 className="font-semibold">
            {profile.duplicate_rows}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Memory Usage
          </p>
          <h3 className="font-semibold">
            {formatBytes(profile.memory_usage)}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            File Type
          </p>
          <h3 className="font-semibold uppercase">
            {dataset.file_extension}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default DatasetSummary;