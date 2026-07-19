function DatasetPreview({ profile }) {
  if (!profile || !profile.preview || profile.preview.length === 0) {
    return null;
  }

  const columns = Object.keys(profile.preview[0]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Dataset Preview
      </h2>

      <p className="text-gray-500 mb-4">
        Showing the first {profile.preview.length} rows of the dataset.
      </p>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-100 sticky top-0">
            <tr>
              <th className="border px-4 py-3 text-center">#</th>

              {columns.map((column) => (
                <th
                  key={column}
                  className="border px-4 py-3 text-left whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {profile.preview.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50"
              >
                <td className="border px-4 py-2 text-center font-medium">
                  {index + 1}
                </td>

                {columns.map((column) => (
                  <td
                    key={column}
                    className="border px-4 py-2 whitespace-nowrap"
                  >
                    {String(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DatasetPreview;