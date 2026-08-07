import React from 'react';
import { cn } from '../../utils/cn';

interface TableProps {
  headers: string[];
  rows: Array<Array<React.ReactNode>>;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ headers, rows, className }) => {
  return (
    <div className={cn('w-full overflow-x-auto border border-hairline rounded-cards bg-paper shadow-subtle', className)}>
      <table className="w-full text-left border-collapse font-geist">
        <thead>
          <tr className="border-b border-hairline bg-surface-alt">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-xs font-semibold text-mid-gray uppercase tracking-caption"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-canvas/50 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-3 text-xs text-ink">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
