function DatasetHistory({ datasets }) {
  if (!datasets || datasets.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Uploaded Datasets
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left p-3">Dataset</th>
              <th className="text-center p-3">Rows</th>
              <th className="text-center p-3">Columns</th>
              <th className="text-center p-3">Type</th>
              <th className="text-center p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {datasets.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3">
                  {item.original_filename}
                </td>

                <td className="text-center">
                  {item.rows}
                </td>

                <td className="text-center">
                  {item.columns}
                </td>

                <td className="text-center uppercase">
                  {item.file_extension}
                </td>

                <td className="text-center">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DatasetHistory;