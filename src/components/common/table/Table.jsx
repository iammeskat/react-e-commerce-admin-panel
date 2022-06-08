const Table = (props) => {
  const { columnHeader, columns, items, activePage, pageCount } = props;
  return (
    <table className="table-auto min-w-full divide-y font-medium text-gray-800 divide-gray-200">
      <thead className="sticky top-0 shadow-sm text-xs uppercase font-semibold text-left text-gray-500 bg-gray-50">
        <tr>
          <th className="px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap w-px">
            SL
          </th>

          {columnHeader.map((item, indx) => {
            return (
              <th
                key={indx}
                className="px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap"
              >
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item, indx) => (
          <tr key={"tr-" + indx}>
            <td className="px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap">
              {indx + (activePage - 1) * pageCount + 1}
            </td>
            {columns.map((column, indx) => (
              <td key={"td-" + indx}>{column.content(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
